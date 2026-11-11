import React, { useState } from 'react';
import { Printer, Download, FileSpreadsheet, FileJson } from 'lucide-react';
import {
  CurriculumConfig,
  QuestionItem,
  StudentResponse,
  TestEmpiricalSummary,
} from '../types/assessment';

interface ExportPrintViewProps {
  config: CurriculumConfig;
  items: QuestionItem[];
  students: StudentResponse[];
  summary: TestEmpiricalSummary;
}

type PrintDocumentType =
  | 'naskah-ujian'
  | 'kunci-pembahasan'
  | 'kisi-kisi-resmi'
  | 'laporan-anates';

export const ExportPrintView: React.FC<ExportPrintViewProps> = ({
  config,
  items,
  students,
  summary,
}) => {
  const [docType, setDocType] = useState<PrintDocumentType>('naskah-ujian');

  const handlePrintWindow = () => {
    window.print();
  };

  const handleExportProjectJSON = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      config,
      items,
      students,
      summary,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Paket_Soal_Anates_${config.mataPelajaran.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportItemAnalysisCSV = () => {
    const headers = [
      'Nomor_Soal',
      'Materi_Spesifik',
      'Level_Kognitif',
      'Dimensi_Bloom',
      'Kunci_Jawaban',
      'Jumlah_Benar',
      'Jumlah_Siswa',
      'Indeks_Kesukaran_P',
      'Kategori_Kesukaran',
      'Daya_Pembeda_D',
      'Kategori_Daya_Pembeda',
      'Korelasi_Point_Biserial_rpbi',
      'r_Tabel_005',
      'Status_Validitas',
      'Pengecoh_Tidak_Efektif',
      'Keputusan_Butir',
    ];
    const rows = summary.butirStats.map((st) => {
      const item = items.find((i) => i.id === st.questionId);
      return [
        st.nomor,
        `"${(item?.materiSpesifik || '').replace(/"/g, '""')}"`,
        item?.levelKognitif || '',
        `"${item?.dimensiBloom || ''}"`,
        item?.kunciJawaban || '',
        st.jumlahBenar,
        st.jumlahResponden,
        st.indeksKesukaran,
        `"${st.kategoriKesukaran}"`,
        st.dayaPembeda,
        `"${st.kategoriDayaPembeda}"`,
        st.korelasiPointBiserial,
        st.rTabelAlpha05,
        st.statusValiditas,
        `"${st.pengecohTidakEfektif.join('; ')}"`,
        `"${st.statusKeputusan}"`,
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Anates_Butir_${config.mataPelajaran.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel (No Print) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Pusat Cetak Dokumen Resmi &amp; Ekspor Data Asesmen
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih jenis dokumen di bawah ini lalu klik <strong>Cetak / Simpan PDF</strong> atau unduh laporan statistik CSV.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportItemAnalysisCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Unduh Tabel Anates (CSV)</span>
            </button>

            <button
              type="button"
              onClick={handleExportProjectJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Cadangkan Proyek (JSON)</span>
            </button>

            <button
              type="button"
              onClick={handlePrintWindow}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF Dokumen Ini</span>
            </button>
          </div>
        </div>

        {/* Pilihan Jenis Dokumen Cetak */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
          {(
            [
              ['naskah-ujian', '1. Naskah Soal Siswa (Siap Ujian)'],
              ['kunci-pembahasan', '2. Kunci Jawaban, Pembahasan & Rasional Opsi'],
              ['kisi-kisi-resmi', '3. Dokumen Kisi-Kisi Kurikulum Merdeka'],
              ['laporan-anates', '4. Laporan Resmi Analisis Butir Soal Empiris'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDocType(id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                docType === id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KANVAS DOKUMEN SIAP CETAK (Kertas Putih Akademik) */}
      <div className="bg-white border border-slate-300 rounded-xl p-8 sm:p-10 space-y-8 max-w-5xl mx-auto">
        {/* KOP SURAT / HEADER DOKUMEN RESMI */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            INSTRUMEN ASESMEN KURIKULUM MERDEKA · {config.namaSekolah}
          </div>
          <h2 className="text-xl font-bold text-slate-900 uppercase">
            {docType === 'naskah-ujian' && 'NASKAH SOAL PENILAIAN SUMATIF PILIHAN GANDA'}
            {docType === 'kunci-pembahasan' &&
              'PEDOMAN PENSKORAN, KUNCI JAWABAN & ANALISIS RASIONAL PENGECOH'}
            {docType === 'kisi-kisi-resmi' &&
              'MATRIKS KISI-KISI PENULISAN SOAL PILIHAN GANDA'}
            {docType === 'laporan-anates' &&
              'LAPORAN HASIL ANALISIS BUTIR SOAL STATISTIK EMPIRIS (CLASSICAL TEST THEORY)'}
          </h2>
          <div className="text-xs text-slate-700 pt-1">
            Mata Pelajaran: <strong>{config.mataPelajaran}</strong> · Fase/Kelas:{' '}
            <strong>
              {config.jenjangFase} ({config.kelasSemester})
            </strong>{' '}
            · Tahun Ajaran: <strong>{config.tahunAjaran}</strong> · Alokasi Waktu:{' '}
            <strong>{config.waktuUjianMenit} Menit</strong>
          </div>
        </div>

        {/* 1. DOKUMEN NASKAH SOAL SISWA */}
        {docType === 'naskah-ujian' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 border border-slate-300 text-xs">
              <div>Nama Peserta Didik : ........................................................</div>
              <div>Hari / Tanggal : ........................................................</div>
              <div>Nomor Induk / Kelas : ........................................................</div>
              <div>Materi Pokok : {config.materiPokok}</div>
            </div>

            <div className="text-xs text-slate-700 italic">
              Petunjuk: Pilihlah satu jawaban yang paling tepat di antara opsi yang tersedia!
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="space-y-2.5 print-break-inside-avoid">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                    {item.stimulus}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {item.nomor}. {item.pokokSoal}
                  </div>
                  <div className="space-y-1.5 pl-5 text-sm text-slate-800">
                    {item.opsi.map((opt) => (
                      <div key={opt.label} className="flex items-start gap-2.5">
                        <span className="font-mono font-semibold">{opt.label}.</span>
                        <span>{opt.teks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. DOKUMEN KUNCI JAWABAN & PEMBAHASAN */}
        {docType === 'kunci-pembahasan' && (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 border border-slate-300 rounded-lg space-y-3 text-xs print-break-inside-avoid"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-sm text-slate-900">
                    Butir Soal Nomor {item.nomor} ({item.levelKognitif} — {item.dimensiBloom})
                  </span>
                  <span className="font-mono font-bold text-sm text-emerald-700">
                    KUNCI JAWABAN: {item.kunciJawaban} (Skor: {item.skorMaksimal})
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-slate-700">Indikator ABCD: </span>
                  <span className="text-slate-600">{item.indikatorSoal}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-700">Pembahasan: </span>
                  <span className="text-slate-800">{item.pembahasan}</span>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="font-semibold text-slate-700">
                    Analisis Rasional Kunci &amp; Pengecoh:
                  </div>
                  {item.opsi.map((o) => (
                    <div key={o.label} className="text-slate-600">
                      <strong className="font-mono">[{o.label}]</strong> {o.rasionalPengecoh}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. DOKUMEN KISI-KISI RESMI */}
        {docType === 'kisi-kisi-resmi' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 border border-slate-300 space-y-1">
              <div>
                <strong>Capaian Pembelajaran (CP):</strong> {config.capaianPembelajaran}
              </div>
              <div>
                <strong>Tujuan Pembelajaran (TP):</strong> {config.tujuanPembelajaran}
              </div>
            </div>

            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-2 w-10 text-center">No</th>
                  <th className="border border-slate-400 p-2">Tujuan Pembelajaran &amp; ATP</th>
                  <th className="border border-slate-400 p-2">Materi &amp; Bentuk Stimulus</th>
                  <th className="border border-slate-400 p-2">Indikator Butir Soal (ABCD)</th>
                  <th className="border border-slate-400 p-2 w-28">Level / Bloom</th>
                  <th className="border border-slate-400 p-2 w-14 text-center">Kunci</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="align-top">
                    <td className="border border-slate-400 p-2 text-center font-mono font-bold">
                      {item.nomor}
                    </td>
                    <td className="border border-slate-400 p-2">
                      <div className="font-semibold">{item.tpRef}</div>
                      <div className="text-slate-600">{item.atpRef}</div>
                    </td>
                    <td className="border border-slate-400 p-2">
                      <div className="font-semibold">{item.materiSpesifik}</div>
                      <div className="text-slate-600">Stimulus: {item.bentukStimulus}</div>
                    </td>
                    <td className="border border-slate-400 p-2">{item.indikatorSoal}</td>
                    <td className="border border-slate-400 p-2">
                      <div>{item.levelKognitif}</div>
                      <div className="text-slate-600">{item.dimensiBloom}</div>
                    </td>
                    <td className="border border-slate-400 p-2 text-center font-mono font-bold">
                      {item.kunciJawaban}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. DOKUMEN LAPORAN ANALISIS BUTIR SOAL EMPIRIS */}
        {docType === 'laporan-anates' && (
          <div className="space-y-5 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border border-slate-300 font-mono tabular-nums">
              <div>
                <div className="text-slate-500">Jumlah Peserta ($N$)</div>
                <div className="text-base font-bold">{summary.jumlahSiswa} Siswa</div>
              </div>
              <div>
                <div className="text-slate-500">Reliabilitas KR-20</div>
                <div className="text-base font-bold">
                  {summary.reliabilitasKR20.toFixed(3)} ({summary.kategoriReliabilitas})
                </div>
              </div>
              <div>
                <div className="text-slate-500">Rata-Rata ± SD</div>
                <div className="text-base font-bold">
                  {summary.rataRataSkor} ± {summary.simpanganBakuSkor}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Status Butir Soal</div>
                <div className="text-base font-bold">
                  {summary.jumlahButirDiterima} Ideal / {summary.jumlahButirRevisi} Revisi /{' '}
                  {summary.jumlahButirDitolak} Gugur
                </div>
              </div>
            </div>

            <table className="w-full border-collapse border border-slate-400 text-xs font-mono tabular-nums">
              <thead>
                <tr className="bg-slate-100 font-sans">
                  <th className="border border-slate-400 p-2 text-center">No</th>
                  <th className="border border-slate-400 p-2 text-left">Materi Spesifik</th>
                  <th className="border border-slate-400 p-2 text-center">Kunci</th>
                  <th className="border border-slate-400 p-2 text-right">Indeks $P$</th>
                  <th className="border border-slate-400 p-2 text-left">Tafsiran $P$</th>
                  <th className="border border-slate-400 p-2 text-right">Daya Beda $D$</th>
                  <th className="border border-slate-400 p-2 text-right">$r_{'{pbi}'}$</th>
                  <th className="border border-slate-400 p-2 text-left">Validitas</th>
                  <th className="border border-slate-400 p-2 text-left">Keputusan Akhir</th>
                </tr>
              </thead>
              <tbody>
                {summary.butirStats.map((st) => {
                  const item = items.find((i) => i.id === st.questionId);
                  return (
                    <tr key={st.questionId}>
                      <td className="border border-slate-400 p-2 text-center font-bold">
                        {st.nomor}
                      </td>
                      <td className="border border-slate-400 p-2 font-sans">
                        {item?.materiSpesifik}
                      </td>
                      <td className="border border-slate-400 p-2 text-center font-bold">
                        {item?.kunciJawaban}
                      </td>
                      <td className="border border-slate-400 p-2 text-right">
                        {st.indeksKesukaran.toFixed(3)}
                      </td>
                      <td className="border border-slate-400 p-2 font-sans">
                        {st.kategoriKesukaran}
                      </td>
                      <td className="border border-slate-400 p-2 text-right">
                        {st.dayaPembeda.toFixed(3)}
                      </td>
                      <td className="border border-slate-400 p-2 text-right">
                        {st.korelasiPointBiserial.toFixed(3)}
                      </td>
                      <td className="border border-slate-400 p-2 font-sans">
                        {st.statusValiditas}
                      </td>
                      <td className="border border-slate-400 p-2 font-sans font-semibold">
                        {st.statusKeputusan}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Blok Tanda Tangan Penyusun */}
        <div className="pt-8 flex justify-end text-xs text-slate-800 print-break-inside-avoid">
          <div className="w-64 text-center space-y-14">
            <div>
              <div>Mengetahui / Penyusun Instrumen,</div>
              <div className="text-slate-500">{config.namaSekolah}</div>
            </div>
            <div className="font-bold underline">{config.penyusun}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
