import * as XLSX from 'xlsx';
import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  PageBreak,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import {
  CurriculumConfig,
  QuestionItem,
  StudentResponse,
  TestEmpiricalSummary,
} from '../types/assessment';
import { scoreAndRankStudents } from './psychometrics';

export type ExportDocType =
  | 'naskah-ujian'
  | 'kunci-pembahasan'
  | 'kisi-kisi-resmi'
  | 'laporan-anates'
  | 'paket-lengkap';

function sanitizeFileName(raw: string): string {
  return (raw || 'EvaluasiAI')
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 60);
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Ekspor Lengkap Workbook Excel (.xlsx) dengan 5 Lembar Kerja (Sheet):
 * 1. Identitas & CP/TP/ATP
 * 2. Matriks Kisi-Kisi ABCD
 * 3. Bank Soal Pilihan Ganda & Rasional Pengecoh
 * 4. Analisis Butir Soal Empiris (P, D, rpbi, KR-20)
 * 5. Matriks Jawaban & Skor Siswa
 */
export function downloadAssessmentExcel(params: {
  config: CurriculumConfig;
  items: QuestionItem[];
  students: StudentResponse[];
  summary: TestEmpiricalSummary;
}) {
  const { config, items, students, summary } = params;
  const wb = XLSX.utils.book_new();

  // Sheet 1: Identitas & Kurikulum Merdeka
  const sheet1Data = [
    ['INSTRUMEN ASESMEN & ANALISIS BUTIR SOAL KURIKULUM MERDEKA'],
    [''],
    ['Satuan Pendidikan / Sekolah', config.namaSekolah],
    ['Mata Pelajaran', config.mataPelajaran],
    ['Jenjang / Fase', config.jenjangFase],
    ['Kelas / Semester', config.kelasSemester],
    ['Tahun Ajaran', config.tahunAjaran],
    ['Penyusun Soal', config.penyusun],
    ['Materi Pokok', config.materiPokok],
    ['Jumlah Soal', items.length],
    ['Jumlah Opsi', config.jumlahOpsi],
    ['Durasi Ujian (Menit)', config.waktuUjianMenit],
    ['KKM', config.kkm],
    [''],
    ['STRUKTUR KURIKULUM MERDEKA'],
    ['Capaian Pembelajaran (CP)', config.capaianPembelajaran],
    ['Tujuan Pembelajaran (TP)', config.tujuanPembelajaran],
    ['Alur Tujuan Pembelajaran (ATP)', config.alurTujuanPembelajaran],
    ['Uraian Materi Pembelajaran', config.ringkasanMateri],
    [''],
    ['RINGKASAN STATISTIK EMPIRIS TES'],
    ['Jumlah Peserta Uji Coba (N)', summary.jumlahSiswa],
    ['Reliabilitas Tes (KR-20)', Number(summary.reliabilitasKR20.toFixed(3))],
    ['Kategori Reliabilitas', summary.kategoriReliabilitas],
    ['Rata-Rata Skor (Skala 100)', summary.rataRataSkor],
    ['Simpangan Baku', summary.simpanganBakuSkor],
    ['Skor Tertinggi / Terendah', `${summary.skorTertinggi} / ${summary.skorTerendah}`],
    ['Persentase Ketuntasan (%)', `${summary.persentaseTuntasKKM}%`],
    ['Butir Diterima (Ideal)', summary.jumlahButirDiterima],
    ['Butir Perlu Revisi', summary.jumlahButirRevisi],
    ['Butir Ditolak / Gugur', summary.jumlahButirDitolak],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
  ws1['!cols'] = [{ wch: 32 }, { wch: 95 }];
  XLSX.utils.book_append_sheet(wb, ws1, '1_Identitas_CP_TP_ATP');

  // Sheet 2: Kisi-Kisi Penulisan Soal
  const kisiHeaders = [
    'No Soal',
    'Capaian Pembelajaran (CP)',
    'Tujuan Pembelajaran (TP)',
    'Alur Tujuan Pembelajaran (ATP)',
    'Materi Spesifik',
    'Bentuk Stimulus',
    'Indikator Butir Soal (ABCD)',
    'Level Kognitif',
    'Dimensi Bloom',
    'Estimasi Kesukaran',
    'Kunci Jawaban',
  ];
  const kisiRows = items.map((it) => [
    it.nomor,
    it.cpRef,
    it.tpRef,
    it.atpRef,
    it.materiSpesifik,
    it.bentukStimulus,
    it.indikatorSoal,
    it.levelKognitif,
    it.dimensiBloom,
    it.estimasiKesukaranAwal,
    it.kunciJawaban,
  ]);
  const ws2 = XLSX.utils.aoa_to_sheet([kisiHeaders, ...kisiRows]);
  ws2['!cols'] = [
    { wch: 8 },
    { wch: 38 },
    { wch: 36 },
    { wch: 36 },
    { wch: 30 },
    { wch: 24 },
    { wch: 48 },
    { wch: 14 },
    { wch: 20 },
    { wch: 18 },
    { wch: 14 },
  ];
  XLSX.utils.book_append_sheet(wb, ws2, '2_Kisi_Kisi_ABCD');

  // Sheet 3: Bank Soal Pilihan Ganda, Opsi & Rasional Pengecoh
  const soalHeaders = [
    'No Soal',
    'Level',
    'Dimensi Bloom',
    'Stimulus',
    'Pokok Soal',
    'Opsi A',
    'Opsi B',
    'Opsi C',
    'Opsi D',
    'Opsi E',
    'Kunci Jawaban',
    'Pembahasan',
    'Rasional Pengecoh A-E',
  ];
  const soalRows = items.map((it) => {
    const getOpsi = (lbl: string) => it.opsi.find((o) => o.label === lbl)?.teks || '';
    const rasionalText = it.opsi
      .map((o) => `[${o.label}${o.isKey ? ' - KUNCI' : ''}]: ${o.rasionalPengecoh}`)
      .join('\n');
    return [
      it.nomor,
      it.levelKognitif,
      it.dimensiBloom,
      it.stimulus,
      it.pokokSoal,
      getOpsi('A'),
      getOpsi('B'),
      getOpsi('C'),
      getOpsi('D'),
      getOpsi('E'),
      it.kunciJawaban,
      it.pembahasan,
      rasionalText,
    ];
  });
  const ws3 = XLSX.utils.aoa_to_sheet([soalHeaders, ...soalRows]);
  ws3['!cols'] = [
    { wch: 8 },
    { wch: 8 },
    { wch: 18 },
    { wch: 45 },
    { wch: 45 },
    { wch: 28 },
    { wch: 28 },
    { wch: 28 },
    { wch: 28 },
    { wch: 28 },
    { wch: 14 },
    { wch: 45 },
    { wch: 52 },
  ];
  XLSX.utils.book_append_sheet(wb, ws3, '3_Bank_Soal_PG');

  // Sheet 4: Analisis Butir Soal Statistik Empiris
  const anatesHeaders = [
    'No Soal',
    'Materi Spesifik',
    'Level',
    'Kunci',
    'Jml Benar',
    'Jml Siswa (N)',
    'Indeks Kesukaran (P)',
    'Tafsiran Kesukaran',
    'Daya Pembeda (D)',
    'Tafsiran Daya Beda',
    'Korelasi rpbi',
    'r Tabel (0.05)',
    'Status Validitas',
    'Pengecoh Tidak Efektif',
    'Keputusan Akhir',
    'Catatan Diagnostik',
  ];
  const anatesRows = summary.butirStats.map((st) => {
    const item = items.find((i) => i.id === st.questionId);
    return [
      st.nomor,
      item?.materiSpesifik || '',
      item?.levelKognitif || '',
      item?.kunciJawaban || '',
      st.jumlahBenar,
      st.jumlahResponden,
      Number(st.indeksKesukaran.toFixed(3)),
      st.kategoriKesukaran,
      Number(st.dayaPembeda.toFixed(3)),
      st.kategoriDayaPembeda,
      Number(st.korelasiPointBiserial.toFixed(3)),
      Number(st.rTabelAlpha05.toFixed(3)),
      st.statusValiditas,
      st.pengecohTidakEfektif.join(', ') || '-',
      st.statusKeputusan,
      st.catatanDiagnostik,
    ];
  });
  const ws4 = XLSX.utils.aoa_to_sheet([anatesHeaders, ...anatesRows]);
  ws4['!cols'] = [
    { wch: 8 },
    { wch: 36 },
    { wch: 8 },
    { wch: 8 },
    { wch: 11 },
    { wch: 12 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 22 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 20 },
    { wch: 16 },
    { wch: 52 },
  ];
  XLSX.utils.book_append_sheet(wb, ws4, '4_Analisis_Butir_Empiris');

  // Sheet 5: Matriks Jawaban & Skor Siswa
  const scoredStudents = scoreAndRankStudents(items, students);
  const siswaHeaders = [
    'No',
    'NIS',
    'Nama Peserta Didik',
    'Kelompok (27%)',
    'Skor Benar',
    'Nilai (0-100)',
    `Ketuntasan (KKM ${config.kkm})`,
    ...items.map((it) => `S${it.nomor} (${it.kunciJawaban})`),
  ];
  const siswaRows = scoredStudents.map((s, idx) => [
    idx + 1,
    s.student.nis,
    s.student.namaSiswa,
    s.group,
    s.correctCount,
    Number(s.score100.toFixed(1)),
    s.score100 >= config.kkm ? 'Tuntas' : 'Belum Tuntas',
    ...items.map((it) => s.student.jawaban[it.id] || '-'),
  ]);
  const ws5 = XLSX.utils.aoa_to_sheet([siswaHeaders, ...siswaRows]);
  ws5['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 28 },
    { wch: 16 },
    { wch: 12 },
    { wch: 14 },
    { wch: 20 },
    ...items.map(() => ({ wch: 8 })),
  ];
  XLSX.utils.book_append_sheet(wb, ws5, '5_Matriks_Skor_Siswa');

  const slug = sanitizeFileName(config.materiPokok || config.mataPelajaran);
  XLSX.writeFile(wb, `Paket_Soal_&_Anates_${slug}.xlsx`);
}

// Helper styling Word (.docx)
const TABLE_BORDER = {
  top: { style: BorderStyle.SINGLE, size: 4, color: '64748B' },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: '64748B' },
  left: { style: BorderStyle.SINGLE, size: 4, color: '64748B' },
  right: { style: BorderStyle.SINGLE, size: 4, color: '64748B' },
};

function makeCell(
  text: string,
  options?: {
    bold?: boolean;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
    shaded?: boolean;
    widthPct?: number;
    sizeHalfPt?: number;
  }
): TableCell {
  const lines = String(text || '').split(/\r?\n/);
  return new TableCell({
    borders: TABLE_BORDER,
    shading: options?.shaded
      ? { type: ShadingType.CLEAR, fill: 'F1F5F9' }
      : undefined,
    width: options?.widthPct
      ? { size: options.widthPct, type: WidthType.PERCENTAGE }
      : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: lines.map(
      (line) =>
        new Paragraph({
          alignment: options?.align || AlignmentType.LEFT,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: line,
              bold: Boolean(options?.bold),
              size: options?.sizeHalfPt || 20, // 10pt default
              font: 'Calibri',
            }),
          ],
        })
    ),
  });
}

function buildKopHeader(title: string, config: CurriculumConfig): Paragraph[] {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: `INSTRUMEN ASESMEN KURIKULUM MERDEKA · ${(config.namaSekolah || '').toUpperCase()}`,
          bold: true,
          size: 20,
          color: '475569',
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 28,
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 220 },
      border: {
        bottom: { style: BorderStyle.DOUBLE, size: 12, color: '0F172A' },
      },
      children: [
        new TextRun({
          text: `Mata Pelajaran: ${config.mataPelajaran}  |  Fase/Kelas: ${config.jenjangFase} (${config.kelasSemester})  |  Tahun Ajaran: ${config.tahunAjaran}  |  Waktu: ${config.waktuUjianMenit} Menit`,
          size: 20,
          font: 'Calibri',
        }),
      ],
    }),
  ];
}

function buildNaskahSection(config: CurriculumConfig, items: QuestionItem[]): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  children.push(...buildKopHeader('NASKAH SOAL PENILAIAN SUMATIF PILIHAN GANDA', config));

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Nama Peserta Didik : .................................................', { widthPct: 50 }),
            makeCell('Hari / Tanggal : .................................................', { widthPct: 50 }),
          ],
        }),
        new TableRow({
          children: [
            makeCell('Nomor Induk / Kelas : .................................................', { widthPct: 50 }),
            makeCell(`Materi Pokok : ${config.materiPokok}`, { widthPct: 50 }),
          ],
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { before: 180, after: 180 },
      children: [
        new TextRun({
          text: 'Petunjuk: Pilihlah satu jawaban yang paling tepat di antara opsi yang tersedia!',
          italics: true,
          size: 20,
          font: 'Calibri',
        }),
      ],
    })
  );

  for (const item of items) {
    if (item.stimulus.trim()) {
      for (const line of item.stimulus.split(/\r?\n/)) {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 40 },
            shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
            children: [
              new TextRun({
                text: line,
                size: 20,
                color: '334155',
                font: 'Calibri',
              }),
            ],
          })
        );
      }
    }

    children.push(
      new Paragraph({
        spacing: { before: 100, after: 80 },
        children: [
          new TextRun({
            text: `${item.nomor}. ${item.pokokSoal}`,
            bold: true,
            size: 22,
            font: 'Calibri',
          }),
        ],
      })
    );

    for (const opt of item.opsi) {
      children.push(
        new Paragraph({
          indent: { left: 420 },
          spacing: { after: 50 },
          children: [
            new TextRun({
              text: `${opt.label}. `,
              bold: true,
              size: 21,
              font: 'Calibri',
            }),
            new TextRun({
              text: opt.teks,
              size: 21,
              font: 'Calibri',
            }),
          ],
        })
      );
    }

    children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  }

  return children;
}

function buildKunciSection(config: CurriculumConfig, items: QuestionItem[]): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  children.push(
    ...buildKopHeader('KUNCI JAWABAN, PEMBAHASAN & RASIONAL PENGECOH', config)
  );

  for (const item of items) {
    children.push(
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({
            text: `Nomor ${item.nomor} (${item.levelKognitif} — ${item.dimensiBloom})   |   KUNCI: ${item.kunciJawaban}`,
            bold: true,
            size: 22,
            font: 'Calibri',
          }),
        ],
      })
    );
    children.push(
      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({ text: 'Indikator ABCD: ', bold: true, size: 20, font: 'Calibri' }),
          new TextRun({ text: item.indikatorSoal, size: 20, font: 'Calibri' }),
        ],
      })
    );
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: 'Pembahasan: ', bold: true, size: 20, font: 'Calibri' }),
          new TextRun({ text: item.pembahasan, size: 20, font: 'Calibri' }),
        ],
      })
    );
    for (const opt of item.opsi) {
      children.push(
        new Paragraph({
          indent: { left: 300 },
          spacing: { after: 35 },
          children: [
            new TextRun({
              text: `[${opt.label}${opt.isKey ? ' - KUNCI' : ''}] `,
              bold: true,
              size: 19,
              font: 'Calibri',
            }),
            new TextRun({
              text: opt.rasionalPengecoh,
              size: 19,
              color: '475569',
              font: 'Calibri',
            }),
          ],
        })
      );
    }
  }

  return children;
}

function buildKisiKisiSection(config: CurriculumConfig, items: QuestionItem[]): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  children.push(...buildKopHeader('MATRIKS KISI-KISI PENULISAN SOAL PILIHAN GANDA', config));

  children.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: 'Capaian Pembelajaran (CP): ', bold: true, size: 20, font: 'Calibri' }),
        new TextRun({ text: config.capaianPembelajaran, size: 20, font: 'Calibri' }),
      ],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({ text: 'Tujuan Pembelajaran (TP): ', bold: true, size: 20, font: 'Calibri' }),
        new TextRun({ text: config.tujuanPembelajaran, size: 20, font: 'Calibri' }),
      ],
    })
  );

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      makeCell('No', { bold: true, align: AlignmentType.CENTER, shaded: true, widthPct: 6, sizeHalfPt: 18 }),
      makeCell('TP & ATP', { bold: true, shaded: true, widthPct: 22, sizeHalfPt: 18 }),
      makeCell('Materi & Stimulus', { bold: true, shaded: true, widthPct: 22, sizeHalfPt: 18 }),
      makeCell('Indikator Soal (ABCD)', { bold: true, shaded: true, widthPct: 30, sizeHalfPt: 18 }),
      makeCell('Level / Bloom', { bold: true, shaded: true, widthPct: 13, sizeHalfPt: 18 }),
      makeCell('Kunci', { bold: true, align: AlignmentType.CENTER, shaded: true, widthPct: 7, sizeHalfPt: 18 }),
    ],
  });

  const dataRows = items.map(
    (it) =>
      new TableRow({
        children: [
          makeCell(String(it.nomor), { bold: true, align: AlignmentType.CENTER, widthPct: 6, sizeHalfPt: 18 }),
          makeCell(`${it.tpRef}\n${it.atpRef}`, { widthPct: 22, sizeHalfPt: 18 }),
          makeCell(`${it.materiSpesifik}\nStimulus: ${it.bentukStimulus}`, { widthPct: 22, sizeHalfPt: 18 }),
          makeCell(it.indikatorSoal, { widthPct: 30, sizeHalfPt: 18 }),
          makeCell(`${it.levelKognitif}\n${it.dimensiBloom}`, { widthPct: 13, sizeHalfPt: 18 }),
          makeCell(it.kunciJawaban, { bold: true, align: AlignmentType.CENTER, widthPct: 7, sizeHalfPt: 18 }),
        ],
      })
  );

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow, ...dataRows],
    })
  );

  return children;
}

function buildAnatesSection(
  config: CurriculumConfig,
  items: QuestionItem[],
  summary: TestEmpiricalSummary
): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  children.push(
    ...buildKopHeader('LAPORAN ANALISIS BUTIR SOAL STATISTIK EMPIRIS (CTT)', config)
  );

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell(`Jumlah Peserta (N): ${summary.jumlahSiswa} Siswa`, { bold: true, shaded: true, widthPct: 25, sizeHalfPt: 19 }),
            makeCell(`Reliabilitas KR-20: ${summary.reliabilitasKR20.toFixed(3)} (${summary.kategoriReliabilitas})`, { bold: true, shaded: true, widthPct: 25, sizeHalfPt: 19 }),
            makeCell(`Rata-Rata ± SD: ${summary.rataRataSkor} ± ${summary.simpanganBakuSkor}`, { bold: true, shaded: true, widthPct: 25, sizeHalfPt: 19 }),
            makeCell(`Status Butir: ${summary.jumlahButirDiterima} Ideal / ${summary.jumlahButirRevisi} Revisi / ${summary.jumlahButirDitolak} Gugur`, { bold: true, shaded: true, widthPct: 25, sizeHalfPt: 19 }),
          ],
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 140 }, children: [] })
  );

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      makeCell('No', { bold: true, align: AlignmentType.CENTER, shaded: true, widthPct: 6, sizeHalfPt: 18 }),
      makeCell('Materi Spesifik', { bold: true, shaded: true, widthPct: 26, sizeHalfPt: 18 }),
      makeCell('Kunci', { bold: true, align: AlignmentType.CENTER, shaded: true, widthPct: 7, sizeHalfPt: 18 }),
      makeCell('Indeks P', { bold: true, align: AlignmentType.RIGHT, shaded: true, widthPct: 10, sizeHalfPt: 18 }),
      makeCell('Tafsiran P', { bold: true, shaded: true, widthPct: 14, sizeHalfPt: 18 }),
      makeCell('Daya Beda D', { bold: true, align: AlignmentType.RIGHT, shaded: true, widthPct: 10, sizeHalfPt: 18 }),
      makeCell('rpbi', { bold: true, align: AlignmentType.RIGHT, shaded: true, widthPct: 9, sizeHalfPt: 18 }),
      makeCell('Keputusan', { bold: true, shaded: true, widthPct: 18, sizeHalfPt: 18 }),
    ],
  });

  const dataRows = summary.butirStats.map((st) => {
    const item = items.find((i) => i.id === st.questionId);
    return new TableRow({
      children: [
        makeCell(String(st.nomor), { bold: true, align: AlignmentType.CENTER, widthPct: 6, sizeHalfPt: 18 }),
        makeCell(item?.materiSpesifik || '', { widthPct: 26, sizeHalfPt: 18 }),
        makeCell(item?.kunciJawaban || '', { bold: true, align: AlignmentType.CENTER, widthPct: 7, sizeHalfPt: 18 }),
        makeCell(st.indeksKesukaran.toFixed(3), { align: AlignmentType.RIGHT, widthPct: 10, sizeHalfPt: 18 }),
        makeCell(st.kategoriKesukaran, { widthPct: 14, sizeHalfPt: 18 }),
        makeCell(st.dayaPembeda.toFixed(3), { align: AlignmentType.RIGHT, widthPct: 10, sizeHalfPt: 18 }),
        makeCell(st.korelasiPointBiserial.toFixed(3), { align: AlignmentType.RIGHT, widthPct: 9, sizeHalfPt: 18 }),
        makeCell(`${st.statusKeputusan} (${st.statusValiditas})`, { bold: true, widthPct: 18, sizeHalfPt: 18 }),
      ],
    });
  });

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow, ...dataRows],
    })
  );

  return children;
}

function buildSignatureBlock(config: CurriculumConfig): Paragraph[] {
  return [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 360, after: 40 },
      children: [
        new TextRun({
          text: 'Mengetahui / Penyusun Instrumen,',
          size: 20,
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 520 },
      children: [
        new TextRun({
          text: config.namaSekolah,
          size: 20,
          color: '64748B',
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: config.penyusun || 'Guru Mata Pelajaran',
          bold: true,
          underline: {},
          size: 20,
          font: 'Calibri',
        }),
      ],
    }),
  ];
}

/**
 * Ekspor Dokumen Microsoft Word (.docx)
 */
export async function downloadAssessmentWord(params: {
  config: CurriculumConfig;
  items: QuestionItem[];
  summary: TestEmpiricalSummary;
  docType: ExportDocType;
}) {
  const { config, items, summary, docType } = params;
  const children: (Paragraph | Table)[] = [];

  if (docType === 'naskah-ujian') {
    children.push(...buildNaskahSection(config, items));
  } else if (docType === 'kunci-pembahasan') {
    children.push(...buildKunciSection(config, items));
  } else if (docType === 'kisi-kisi-resmi') {
    children.push(...buildKisiKisiSection(config, items));
  } else if (docType === 'laporan-anates') {
    children.push(...buildAnatesSection(config, items, summary));
  } else {
    // Paket Lengkap: 4 dokumen resmi dipisah pemisah halaman
    children.push(...buildKisiKisiSection(config, items));
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(...buildNaskahSection(config, items));
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(...buildKunciSection(config, items));
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(...buildAnatesSection(config, items, summary));
  }

  children.push(...buildSignatureBlock(config));

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2cm
              right: 1134,
              bottom: 1134,
              left: 1134,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const labelMap: Record<ExportDocType, string> = {
    'naskah-ujian': 'Naskah_Soal',
    'kunci-pembahasan': 'Kunci_Pembahasan',
    'kisi-kisi-resmi': 'Kisi_Kisi_Kurikulum_Merdeka',
    'laporan-anates': 'Laporan_Anates_Empiris',
    'paket-lengkap': 'Paket_Lengkap_Asesmen',
  };
  const slug = sanitizeFileName(config.materiPokok || config.mataPelajaran);
  triggerBlobDownload(blob, `${labelMap[docType]}_${slug}.docx`);
}
