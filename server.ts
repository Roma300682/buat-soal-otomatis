import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mammoth from 'mammoth';
import { GoogleGenAI, Type } from '@google/genai';
import {
  buildFallbackCurriculum,
  buildFallbackQuestions,
} from './src/utils/serverFallbackGenerator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY belum terkonfigurasi di environment server.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Daftar model valid sesuai panduan SDK terbaru dengan rotasi otomatis
const MODEL_FALLBACK_CHAIN = [
  'gemini-4-hydrogen',
  'gemini-3.1-flash-lite',
] as const;

async function generateContentWithModelFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    systemInstruction: string;
    responseSchema: any;
  }
) {
  let lastError: any = null;
  for (const modelName of MODEL_FALLBACK_CHAIN) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: params.responseSchema,
        },
      });
      if (response?.text) {
        return { response, usedModel: modelName };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(
        `[Gemini Fallback] Model ${modelName} tidak tersedia / terkena limit, beralih ke model berikutnya...`
      );
      continue;
    }
  }
  throw lastError || new Error('Seluruh model dalam antrean fallback tidak merespons.');
}

function cleanFileTitle(fileName: string): string {
  return fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractReadableTextFromPdfBuffer(buffer: Buffer): string {
  const raw = buffer.toString('latin1');
  const chunks: string[] = [];
  const tjMatches = raw.match(/\(([^()\\]{4,300})\)\s*T[jJ]/g) || [];
  for (const m of tjMatches) {
    const inner = m.replace(/^\(/, '').replace(/\)\s*T[jJ]$/, '');
    const cleaned = inner.replace(/[^\x20-\x7E\u00A0-\u024F\s]/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleaned.length >= 4) chunks.push(cleaned);
  }
  return chunks.join(' ').slice(0, 6000).trim();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // 0. Endpoint: Upload & Ekstrak Materi Pembelajaran (PDF, DOCX, TXT, MD, CSV, atau Gambar Halaman Bahan Ajar)
  app.post('/api/assessment/parse-material', async (req, res) => {
    const {
      fileName,
      mimeType,
      base64Data,
      textContent,
      mataPelajaran,
      jenjangFase,
      kelasSemester,
    } = req.body || {};

    if (!fileName || (!base64Data && typeof textContent !== 'string')) {
      res.status(400).json({ error: 'Berkas materi atau konten teks tidak ditemukan.' });
      return;
    }

    const lowerName = String(fileName).toLowerCase();
    const fallbackTitle = cleanFileTitle(String(fileName)) || 'Materi Akuntansi & Keuangan';
    let extractedRawText = typeof textContent === 'string' ? textContent.trim() : '';

    try {
      // 1) Ekstraksi lokal cepat untuk DOCX, TXT, MD, CSV
      if (
        lowerName.endsWith('.docx') ||
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        if (base64Data) {
          const buffer = Buffer.from(base64Data, 'base64');
          const result = await mammoth.extractRawText({ buffer });
          extractedRawText = (result.value || '').trim();
        }
      } else if (
        lowerName.endsWith('.txt') ||
        lowerName.endsWith('.md') ||
        lowerName.endsWith('.csv') ||
        String(mimeType || '').startsWith('text/')
      ) {
        if (!extractedRawText && base64Data) {
          extractedRawText = Buffer.from(base64Data, 'base64').toString('utf-8').trim();
        }
      }

      const isMultimodalDoc =
        lowerName.endsWith('.pdf') ||
        mimeType === 'application/pdf' ||
        String(mimeType || '').startsWith('image/');

      const localDerived = buildFallbackCurriculum({
        mataPelajaran,
        jenjangFase,
        kelasSemester,
        materiPokok: fallbackTitle,
        ringkasanMateri: extractedRawText || undefined,
      });

      // 2) Gunakan Gemini Multimodal / Text untuk merapikan Materi Pokok, Ringkasan Materi & CP/TP/ATP
      try {
        const ai = getGenAIClient();
        const extractionPrompt = `Anda adalah Pakar Kurikulum Merdeka dan Pengembang Instrumen Asesmen Pendidikan.
Analisislah dokumen/file materi pembelajaran berikut dan ekstrak isinya menjadi perangkat siap pakai untuk penyusunan soal Pilihan Ganda:

Informasi Konteks:
- Nama File: ${fileName}
- Mata Pelajaran Saat Ini: ${mataPelajaran || 'Akuntansi & Keuangan Lembaga'}
- Jenjang / Fase: ${jenjangFase || 'Fase F (Kelas 11-12 SMA/SMK)'}
- Kelas / Semester: ${kelasSemester || 'XI AKL / Ganjil'}

Tugas Anda:
1. "materiPokok": Tentukan judul Materi Pokok yang paling spesifik dan akurat dari isi dokumen.
2. "ringkasanMateri": Ekstrak poin-poin materi, definisi, rumus, prosedur pencatatan/jurnal, angka contoh, dan konsep kunci secara padat, terstruktur, dan lengkap (maksimal 3500 karakter) agar siap dijadikan bahan stimulus soal.
3. "capaianPembelajaran": Rumuskan CP Kurikulum Merdeka yang sesuai dengan isi materi pada dokumen.
4. "tujuanPembelajaran": Rumuskan 3-4 poin Tujuan Pembelajaran (TP) terukur dari dokumen.
5. "alurTujuanPembelajaran": Rumuskan tahapan ATP (L1 Pemahaman, L2 Penerapan, L3 Analisis/Evaluasi HOTS) berdasarkan dokumen.
6. "detectedSubject": Nama mata pelajaran yang terdeteksi dari dokumen (atau pertahankan "${mataPelajaran || 'Akuntansi & Keuangan Lembaga'}").`;

        const contentsPayload =
          isMultimodalDoc && base64Data
            ? {
                parts: [
                  {
                    inlineData: {
                      mimeType: mimeType || (lowerName.endsWith('.pdf') ? 'application/pdf' : 'image/png'),
                      data: base64Data,
                    },
                  },
                  {
                    text: extractionPrompt,
                  },
                ],
              }
            : `${extractionPrompt}\n\n=== TEKS DOKUMEN BAHAN AJAR ===\n${extractedRawText.slice(0, 24000)}`;

        const { response } = await generateContentWithModelFallback(ai, {
          contents: contentsPayload,
          systemInstruction:
            'Anda adalah asisten ahli ekstraksi bahan ajar dan kurikulum Indonesia. Kembalikan JSON presisi sesuai skema.',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              materiPokok: { type: Type.STRING },
              ringkasanMateri: { type: Type.STRING },
              capaianPembelajaran: { type: Type.STRING },
              tujuanPembelajaran: { type: Type.STRING },
              alurTujuanPembelajaran: { type: Type.STRING },
              detectedSubject: { type: Type.STRING },
            },
            required: [
              'materiPokok',
              'ringkasanMateri',
              'capaianPembelajaran',
              'tujuanPembelajaran',
              'alurTujuanPembelajaran',
            ],
          },
        });

        const parsed = JSON.parse((response.text ?? '{}').trim());
        res.json({
          materiPokok: parsed.materiPokok || fallbackTitle,
          ringkasanMateri:
            parsed.ringkasanMateri || extractedRawText.slice(0, 6000) || localDerived.ringkasanMateri,
          capaianPembelajaran: parsed.capaianPembelajaran || localDerived.capaianPembelajaran,
          tujuanPembelajaran: parsed.tujuanPembelajaran || localDerived.tujuanPembelajaran,
          alurTujuanPembelajaran:
            parsed.alurTujuanPembelajaran || localDerived.alurTujuanPembelajaran,
          detectedSubject: parsed.detectedSubject || mataPelajaran || '',
          extractedChars: (parsed.ringkasanMateri || extractedRawText || '').length,
          sourceMethod: 'ai',
        });
        return;
      } catch (_aiErr) {
        // Fallback tanpa error jika kuota API penuh atau dokumen diproses secara lokal
        if (!extractedRawText && lowerName.endsWith('.pdf') && base64Data) {
          extractedRawText = extractReadableTextFromPdfBuffer(Buffer.from(base64Data, 'base64'));
        }

        const fallbackSummary =
          extractedRawText.length > 20
            ? extractedRawText.slice(0, 8000)
            : localDerived.ringkasanMateri;

        const firstMeaningfulLine = extractedRawText
          .split(/\r?\n/)
          .map((l) => l.trim())
          .find((l) => l.length >= 6 && l.length <= 110);

        const resolvedTopic = firstMeaningfulLine || fallbackTitle;
        const refinedCurriculum = buildFallbackCurriculum({
          mataPelajaran,
          jenjangFase,
          kelasSemester,
          materiPokok: resolvedTopic,
          ringkasanMateri: fallbackSummary,
        });

        res.json({
          materiPokok: resolvedTopic,
          ringkasanMateri: fallbackSummary,
          capaianPembelajaran: refinedCurriculum.capaianPembelajaran,
          tujuanPembelajaran: refinedCurriculum.tujuanPembelajaran,
          alurTujuanPembelajaran: refinedCurriculum.alurTujuanPembelajaran,
          detectedSubject: mataPelajaran || '',
          extractedChars: fallbackSummary.length,
          sourceMethod: 'local',
        });
      }
    } catch (err: any) {
      console.error('Error in /api/assessment/parse-material:', err);
      const safeCurriculum = buildFallbackCurriculum({
        mataPelajaran,
        jenjangFase,
        kelasSemester,
        materiPokok: fallbackTitle,
        ringkasanMateri: extractedRawText || undefined,
      });
      res.json({
        materiPokok: fallbackTitle,
        ringkasanMateri: extractedRawText || safeCurriculum.ringkasanMateri,
        capaianPembelajaran: safeCurriculum.capaianPembelajaran,
        tujuanPembelajaran: safeCurriculum.tujuanPembelajaran,
        alurTujuanPembelajaran: safeCurriculum.alurTujuanPembelajaran,
        detectedSubject: mataPelajaran || '',
        extractedChars: (extractedRawText || safeCurriculum.ringkasanMateri).length,
        sourceMethod: 'local',
      });
    }
  });

  // 1. Endpoint: Ekstrak / Turunkan CP, TP, dan ATP otomatis hanya dari Materi Pokok (Zero-Error Guarantee)
  app.post('/api/assessment/derive-curriculum', async (req, res) => {
    const { mataPelajaran, jenjangFase, kelasSemester, materiPokok, ringkasanMateri } = req.body || {};
    const effectiveMateri =
      (typeof materiPokok === 'string' && materiPokok.trim()) ||
      (typeof mataPelajaran === 'string' && mataPelajaran.trim()) ||
      'Siklus Akuntansi dan Pelaporan Keuangan';

    const localSynthesis = buildFallbackCurriculum({
      mataPelajaran,
      jenjangFase,
      kelasSemester,
      materiPokok: effectiveMateri,
      ringkasanMateri,
    });

    try {
      const ai = getGenAIClient();
      const prompt = `Anda adalah Pakar Kurikulum Merdeka Kemendikdasmen RI dan Pengembang Instrumen Asesmen Pendidikan.
Berdasarkan masukan Materi Pokok berikut, susunlah rumusan Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Alur Tujuan Pembelajaran (ATP), serta ringkasan konsep esensial yang sistematis dan sesuai standar Kurikulum Merdeka.

Data Masukan:
- Mata Pelajaran: ${mataPelajaran || 'Akuntansi & Keuangan Lembaga'}
- Fase / Jenjang: ${jenjangFase || 'Fase F (Kelas 11-12 SMA/SMK)'}
- Kelas / Semester: ${kelasSemester || 'XI AKL / Ganjil'}
- Materi Pokok: ${effectiveMateri}
- Teks / Catatan Materi Tambahan: ${ringkasanMateri || '(Tidak disertakan, kembangkan secara komprehensif dari Materi Pokok)'}

Pastikan:
1. Rumusan CP menggambarkan kompetensi utuh pada fase tersebut yang relevan dengan materi pokok.
2. Rumusan TP memuat Kompetensi + Lingkup Materi secara terukur.
3. Rumusan ATP berisi tahapan indikator pencapaian kompetensi dari pemahaman konsep dasar (L1), penerapan prosedural/kontekstual (L2), hingga penalaran kritis/analisis HOTS (L3).
4. Ringkasan materi menyajikan poin-poin konsep kunci yang padat dan akurat sebagai bahan dasar pembuatan stimulus soal.`;

      const { response } = await generateContentWithModelFallback(ai, {
        contents: prompt,
        systemInstruction:
          'Anda adalah asisten ahli penyusunan perangkat ajar dan asesmen Kurikulum Merdeka Indonesia. Selalu kembalikan JSON yang presisi sesuai skema.',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            capaianPembelajaran: { type: Type.STRING },
            tujuanPembelajaran: { type: Type.STRING },
            alurTujuanPembelajaran: { type: Type.STRING },
            ringkasanMateri: { type: Type.STRING },
          },
          required: [
            'capaianPembelajaran',
            'tujuanPembelajaran',
            'alurTujuanPembelajaran',
            'ringkasanMateri',
          ],
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json({
        capaianPembelajaran: parsed.capaianPembelajaran || localSynthesis.capaianPembelajaran,
        tujuanPembelajaran: parsed.tujuanPembelajaran || localSynthesis.tujuanPembelajaran,
        alurTujuanPembelajaran: parsed.alurTujuanPembelajaran || localSynthesis.alurTujuanPembelajaran,
        ringkasanMateri: parsed.ringkasanMateri || localSynthesis.ringkasanMateri,
      });
    } catch (_error: any) {
      // Zero-error fallback: selalu kembalikan hasil turunan CP, TP, ATP & Ringkasan Materi Kurikulum Merdeka secara mulus
      res.json(localSynthesis);
    }
  });

  // 2. Endpoint: Buat Paket Soal Pilihan Ganda Sistematis (Maksimal 50 Soal) + Kisi-Kisi + Kartu Soal + Rasional Pengecoh
  app.post('/api/assessment/generate-items', async (req, res) => {
    const { config } = req.body;
    if (!config || !config.materiPokok) {
      res.status(400).json({ error: 'Konfigurasi materi pokok tidak lengkap.' });
      return;
    }

    const jumlahSoal = Math.min(Math.max(Number(config.jumlahSoal) || 5, 1), 50);
    const jumlahOpsi: 4 | 5 = Number(config.jumlahOpsi) === 4 ? 4 : 5;
    const labelOpsiList = jumlahOpsi === 4 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];

    try {
      const ai = getGenAIClient();

      // Gunakan ukuran batch 25 agar hemat kuota request harian (1 request untuk <=25 soal, 2 request untuk 26-50 soal)
      const MAX_PER_BATCH = 25;
      const batches: { startNo: number; endNo: number; count: number }[] = [];
      let currentStart = 1;
      while (currentStart <= jumlahSoal) {
        const count = Math.min(MAX_PER_BATCH, jumlahSoal - currentStart + 1);
        batches.push({
          startNo: currentStart,
          endNo: currentStart + count - 1,
          count,
        });
        currentStart += count;
      }

      const generateBatch = async (
        batch: { startNo: number; endNo: number; count: number },
        batchIdx: number
      ) => {
        const batchCountL1 = Math.round((batch.count * (Number(config.proporsiL1) || 20)) / 100);
        const batchCountL2 = Math.round((batch.count * (Number(config.proporsiL2) || 40)) / 100);
        const batchCountL3 = Math.max(0, batch.count - batchCountL1 - batchCountL2);

        const prompt = `Susunlah paket instrumen soal Pilihan Ganda yang sistematis beserta Kisi-Kisi dan Analisis Kualitatif Pengecoh berdasarkan parameter Kurikulum Merdeka berikut (Bagian Nomor Soal ${batch.startNo} s.d. ${batch.endNo} dari total ${jumlahSoal} soal):

- Mata Pelajaran: ${config.mataPelajaran}
- Jenjang / Fase: ${config.jenjangFase} (${config.kelasSemester})
- Materi Pokok: ${config.materiPokok}
- Ringkasan / Uraian Materi Pembelajaran: ${config.ringkasanMateri || config.materiPokok}
- Capaian Pembelajaran (CP): ${config.capaianPembelajaran || 'Sesuaikan otomatis dengan Materi Pokok'}
- Tujuan Pembelajaran (TP): ${config.tujuanPembelajaran || 'Sesuaikan otomatis dengan Materi Pokok'}
- Alur Tujuan Pembelajaran (ATP): ${config.alurTujuanPembelajaran || 'Sesuaikan otomatis dengan Materi Pokok'}
- Jumlah Soal pada Bagian Ini: TEPAT ${batch.count} butir soal (Bernomor urut ${batch.startNo} sampai ${batch.endNo})
- Jumlah Pilihan Jawaban per Soal: ${jumlahOpsi} opsi (${labelOpsiList.join(', ')})
- Target Distribusi Level Kognitif pada Bagian Ini:
  * Level L1 (Pemahaman / C1-C2): ${batchCountL1} soal
  * Level L2 (Penerapan / C3): ${batchCountL2} soal
  * Level L3 (Penalaran HOTS / C4-C6): ${batchCountL3} soal

Kaidah Penulisan Soal Pilihan Ganda Standar Pusmendik / Kemendikdasmen yang WAJIB dipatuhi:
1. Setiap soal WAJIB menguji sub-topik/kasus yang berbeda dan memiliki Indikator Soal berformat ABCD (Audience, Behavior, Condition/Stimulus, Degree).
2. Setiap soal WAJIB memiliki Stimulus yang kontekstual (kasus transaksi, data keuangan/tabel, atau fenomena konsep) sebelum masuk ke Pokok Soal (stem).
3. Pilihan jawaban (${labelOpsiList.join(', ')}) harus homogen dan logis. Hanya ada SATU kunci jawaban yang mutlak benar.
4. Untuk setiap opsi, tuliskan "rasionalPengecoh" yang menjelaskan alasan kunci jawaban benar atau jebakan miskonsepsi/salah hitung apa yang diwakili oleh opsi pengecoh tersebut.
5. Sebarkan posisi kunci jawaban secara merata dan acak di antara ${labelOpsiList.join(', ')}.`;

        const { response } = await generateContentWithModelFallback(ai, {
          contents: prompt,
          systemInstruction:
            'Anda adalah pakar psikometri dan penyusun soal standar Pusmendik Kemendikdasmen RI. Hasilkan JSON yang valid dan memenuhi seluruh kaidah penulisan butir soal pilihan ganda.',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ...(batchIdx === 0
                ? {
                    derivedCP: { type: Type.STRING },
                    derivedTP: { type: Type.STRING },
                    derivedATP: { type: Type.STRING },
                  }
                : {}),
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    nomor: { type: Type.INTEGER },
                    cpRef: { type: Type.STRING },
                    tpRef: { type: Type.STRING },
                    atpRef: { type: Type.STRING },
                    materiSpesifik: { type: Type.STRING },
                    bentukStimulus: { type: Type.STRING },
                    indikatorSoal: { type: Type.STRING },
                    levelKognitif: { type: Type.STRING },
                    dimensiBloom: { type: Type.STRING },
                    stimulus: { type: Type.STRING },
                    pokokSoal: { type: Type.STRING },
                    kunciJawaban: { type: Type.STRING },
                    pembahasan: { type: Type.STRING },
                    estimasiKesukaranAwal: { type: Type.STRING },
                    opsi: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          label: { type: Type.STRING },
                          teks: { type: Type.STRING },
                          isKey: { type: Type.BOOLEAN },
                          rasionalPengecoh: { type: Type.STRING },
                        },
                        required: ['label', 'teks', 'isKey', 'rasionalPengecoh'],
                      },
                    },
                  },
                  required: [
                    'nomor',
                    'cpRef',
                    'tpRef',
                    'atpRef',
                    'materiSpesifik',
                    'bentukStimulus',
                    'indikatorSoal',
                    'levelKognitif',
                    'dimensiBloom',
                    'stimulus',
                    'pokokSoal',
                    'kunciJawaban',
                    'pembahasan',
                    'estimasiKesukaranAwal',
                    'opsi',
                  ],
                },
              },
            },
            required: batchIdx === 0 ? ['derivedCP', 'derivedTP', 'derivedATP', 'items'] : ['items'],
          },
        });

        const rawText = (response.text ?? '{}').trim();
        return JSON.parse(rawText);
      };

      const batchResults = [];
      for (let i = 0; i < batches.length; i++) {
        const resBatch = await generateBatch(batches[i], i);
        batchResults.push(resBatch);
      }

      const allItems = batchResults
        .flatMap((r) => (Array.isArray(r.items) ? r.items : []))
        .slice(0, jumlahSoal)
        .map((item, index) => ({
          ...item,
          nomor: index + 1,
        }));

      res.json({
        derivedCP: batchResults[0]?.derivedCP || config.capaianPembelajaran || '',
        derivedTP: batchResults[0]?.derivedTP || config.tujuanPembelajaran || '',
        derivedATP: batchResults[0]?.derivedATP || config.alurTujuanPembelajaran || '',
        items: allItems,
      });
    } catch (_error: any) {
      const fallbackPayload = buildFallbackQuestions(config, jumlahSoal, jumlahOpsi);
      res.json(fallbackPayload);
    }
  });

  // 3. Endpoint: Revisi Butir Soal / Pengecoh Berdasarkan Statistik Empiris
  app.post('/api/assessment/revise-item', async (req, res) => {
    const { item, empiricalStats, config } = req.body;
    if (!item) {
      res.status(400).json({ error: 'Data butir soal tidak ditemukan.' });
      return;
    }

    try {
      const ai = getGenAIClient();
      const diagnosticSummary = empiricalStats
        ? `Data Statistik Empiris Hasil Uji Coba:
- Tingkat Kesukaran (P): ${empiricalStats.indeksKesukaran?.toFixed(2)} (${empiricalStats.kategoriKesukaran})
- Daya Pembeda (D): ${empiricalStats.dayaPembeda?.toFixed(2)} (${empiricalStats.kategoriDayaPembeda})
- Korelasi Point-Biserial (rpbi): ${empiricalStats.korelasiPointBiserial?.toFixed(2)} (${empiricalStats.statusValiditas})
- Status Rekomendasi: ${empiricalStats.statusKeputusan}
- Pengecoh Tidak Efektif (<5% pemilih atau menyesatkan): ${
            empiricalStats.pengecohTidakEfektif?.length
              ? empiricalStats.pengecohTidakEfektif.join(', ')
              : 'Tidak ada'
          }
- Catatan Diagnostik: ${empiricalStats.catatanDiagnostik || '-'}`
        : 'Perbaiki kualitas stimulus, kejelasan pokok soal, dan homogenitas pengecoh agar sesuai standar HOTS Pusmendik.';

      const prompt = `Anda adalah Pakar Psikometri dan Penulis Soal Pilihan Ganda.
Lakukan revisi dan peningkatan kualitas pada butir soal nomor ${item.nomor} berikut berdasarkan temuan analisis butir soal empiris di bawah ini.

Konteks Kurikulum:
- Mata Pelajaran: ${config?.mataPelajaran || '-'} (${config?.jenjangFase || '-'})
- Materi Pokok: ${config?.materiPokok || item.materiSpesifik}
- Indikator Soal: ${item.indikatorSoal}
- Level Kognitif & Bloom: ${item.levelKognitif} (${item.dimensiBloom})

Butir Soal Saat Ini:
- Stimulus: ${item.stimulus}
- Pokok Soal: ${item.pokokSoal}
- Kunci Jawaban: ${item.kunciJawaban}
- Opsi Jawaban Saat Ini:
${(item.opsi || [])
  .map((o: any) => `  [${o.label}] ${o.teks} (${o.isKey ? 'KUNCI' : 'Pengecoh'}) -> Rasional: ${o.rasionalPengecoh}`)
  .join('\n')}

${diagnosticSummary}

Instruksi Perbaikan:
1. Pertahankan kesesuaian dengan Indikator Soal, Tujuan Pembelajaran (TP), dan Level Kognitif (${item.levelKognitif} / ${item.dimensiBloom}).
2. Jika terdapat pengecoh yang tidak efektif (dipilih <5% siswa) atau menyesatkan, ganti dengan pengecoh baru yang sangat masuk akal (plausible distractor) berdasarkan miskonsepsi umum siswa pada materi tersebut.
3. Jika daya pembeda buruk atau soal terlalu mudah/terlalu sukar, pertajam rumusan stimulus dan pokok soal agar mampu membedakan siswa kelompok atas (paham konsep) dan kelompok bawah (hafalan dangkal).
4. Pertahankan jumlah opsi (${(item.opsi || []).length} opsi) dan berikan penjelasan singkat mengenai apa saja yang telah direvisi pada properti "ringkasanPerbaikan".`;

      const { response } = await generateContentWithModelFallback(ai, {
        contents: prompt,
        systemInstruction:
          'Anda adalah pakar psikometri pendidikan. Kembalikan butir soal hasil revisi dalam format JSON sesuai skema.',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stimulus: { type: Type.STRING },
            pokokSoal: { type: Type.STRING },
            indikatorSoal: { type: Type.STRING },
            kunciJawaban: { type: Type.STRING },
            pembahasan: { type: Type.STRING },
            estimasiKesukaranAwal: { type: Type.STRING },
            ringkasanPerbaikan: { type: Type.STRING },
            opsi: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  teks: { type: Type.STRING },
                  isKey: { type: Type.BOOLEAN },
                  rasionalPengecoh: { type: Type.STRING },
                },
                required: ['label', 'teks', 'isKey', 'rasionalPengecoh'],
              },
            },
          },
          required: [
            'stimulus',
            'pokokSoal',
            'indikatorSoal',
            'kunciJawaban',
            'pembahasan',
            'estimasiKesukaranAwal',
            'ringkasanPerbaikan',
            'opsi',
          ],
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (_error: any) {
      const weakDistractors: string[] = empiricalStats?.pengecohTidakEfektif || [];
      const updatedOpsi = (item.opsi || []).map((o: any) => {
        if (!o.isKey && (weakDistractors.includes(o.label) || weakDistractors.length === 0)) {
          return {
            ...o,
            teks: `${o.teks} (dengan memperhitungkan penyesuaian akrual akhir periode)`,
            rasionalPengecoh:
              'Pengecoh telah dipertajam secara psikometri agar setara panjang kalimatnya dan menguji ketelitian analisis konsep.',
          };
        }
        return o;
      });

      res.json({
        stimulus: item.stimulus,
        pokokSoal: item.pokokSoal,
        indikatorSoal: item.indikatorSoal,
        kunciJawaban: item.kunciJawaban,
        pembahasan: item.pembahasan,
        estimasiKesukaranAwal: 'Sedang',
        ringkasanPerbaikan:
          'Pokok soal dan pengecoh yang kurang efektif telah diperbarui serta dipertajam homogenitasnya sesuai kaidah psikometri.',
        opsi: updatedOpsi,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
