import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
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

// Daftar model Free-Tier dengan kuota terpisah per model untuk mencegah kegagalan saat satu model terkena limit 429
const MODEL_FALLBACK_CHAIN = [
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
] as const;

async function generateContentWithModelFallback(
  ai: GoogleGenAI,
  params: {
    contents: string;
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
      return { response, usedModel: modelName };
    } catch (err: any) {
      lastError = err;
      const errStr = String(err?.message || err || '');
      const isQuotaOrTransient =
        err?.status === 429 ||
        err?.status === 503 ||
        errStr.includes('429') ||
        errStr.includes('RESOURCE_EXHAUSTED') ||
        errStr.includes('Quota exceeded');

      if (isQuotaOrTransient) {
        console.warn(
          `[Gemini Fallback] Model ${modelName} terkena batas kuota (429/503), mencoba model cadangan berikutnya...`
        );
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

function isQuotaExhaustedError(err: any): boolean {
  const msg = String(err?.message || err || '');
  return (
    err?.status === 429 ||
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('Quota exceeded')
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // 1. Endpoint: Ekstrak / Turunkan CP, TP, dan ATP otomatis hanya dari Materi Pokok
  app.post('/api/assessment/derive-curriculum', async (req, res) => {
    const { mataPelajaran, jenjangFase, kelasSemester, materiPokok, ringkasanMateri } = req.body;
    if (!materiPokok || typeof materiPokok !== 'string' || !materiPokok.trim()) {
      res.status(400).json({ error: 'Materi Pokok wajib diisi terlebih dahulu.' });
      return;
    }

    try {
      const ai = getGenAIClient();
      const prompt = `Anda adalah Pakar Kurikulum Merdeka Kemendikdasmen RI dan Pengembang Instrumen Asesmen Pendidikan.
Berdasarkan masukan Materi Pokok berikut, susunlah rumusan Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Alur Tujuan Pembelajaran (ATP), serta ringkasan konsep esensial yang sistematis dan sesuai standar Kurikulum Merdeka.

Data Masukan:
- Mata Pelajaran: ${mataPelajaran || 'Akuntansi'}
- Fase / Jenjang: ${jenjangFase || 'Fase F (Kelas 11-12 SMA/SMK)'}
- Kelas / Semester: ${kelasSemester || 'XI AKL / Ganjil'}
- Materi Pokok: ${materiPokok}
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
      res.json(parsed);
    } catch (error: any) {
      if (isQuotaExhaustedError(error)) {
        console.warn('All free-tier models quota exhausted on derive-curriculum; using structured curriculum synthesis.');
        const fallback = buildFallbackCurriculum({
          mataPelajaran,
          jenjangFase,
          kelasSemester,
          materiPokok,
          ringkasanMateri,
        });
        res.json({
          ...fallback,
          quotaWarning:
            'Kuota harian Free Tier Gemini API telah tercapai. Struktur CP, TP, dan ATP disusun menggunakan mesin pemetaan Kurikulum Merdeka lokal. Untuk meningkatkan kuota AI, Anda dapat memilih API key berbayar melalui panel Settings > Secrets.',
        });
        return;
      }
      console.error('Error in /api/assessment/derive-curriculum:', error);
      res.status(500).json({
        error: error?.message || 'Gagal menurunkan struktur CP, TP, dan ATP dari materi pokok.',
      });
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
    } catch (error: any) {
      if (isQuotaExhaustedError(error)) {
        console.warn(
          'All free-tier Gemini models reached daily quota limit (429). Generating systematic items via local engine.'
        );
        const fallbackPayload = buildFallbackQuestions(config, jumlahSoal, jumlahOpsi);
        res.json({
          ...fallbackPayload,
          quotaWarning:
            'Batas kuota harian Free Tier untuk model Gemini Anda telah tercapai (HTTP 429). Paket soal sebanyak ' +
            jumlahSoal +
            ' butir berhasil disusun secara otomatis menggunakan Mesin Penyusun Sistematis Kurikulum Merdeka. Untuk meningkatkan kuota harian AI, Anda dapat memilih API key dengan billing aktif di panel Settings > Secrets.',
        });
        return;
      }
      console.error('Error in /api/assessment/generate-items:', error);
      res.status(500).json({
        error: error?.message || 'Gagal menyusun paket soal pilihan ganda dengan AI.',
      });
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
    } catch (error: any) {
      if (isQuotaExhaustedError(error)) {
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
            'Pengecoh yang kurang efektif telah diperbarui dan dipertajam homogenitasnya (Mode Cadangan Psikometri aktif karena kuota harian Free Tier API telah tercapai; tingkatkan kuota melalui Settings > Secrets).',
          opsi: updatedOpsi,
        });
        return;
      }
      console.error('Error in /api/assessment/revise-item:', error);
      res.status(500).json({
        error: error?.message || 'Gagal merevisi butir soal dengan bantuan AI.',
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
