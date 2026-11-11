import React, { useState } from 'react';
import {
  Users,
  Wand2,
  RefreshCw,
  Plus,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XOctagon,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CurriculumConfig,
  ItemEmpiricalStats,
  OptionLabel,
  QuestionItem,
  StudentResponse,
  TestEmpiricalSummary,
} from '../types/assessment';
import { scoreAndRankStudents } from '../utils/psychometrics';

interface EmpiricalAnalysisViewProps {
  config: CurriculumConfig;
  items: QuestionItem[];
  students: StudentResponse[];
  summary: TestEmpiricalSummary;
  onUpdateStudents: (next: StudentResponse[]) => void;
  onRegenerateCohort: (count: number) => void;
  onReviseItemWithAI: (item: QuestionItem, stats: ItemEmpiricalStats) => Promise<string | null>;
  revisingItemId: string | null;
}

export const EmpiricalAnalysisView: React.FC<EmpiricalAnalysisViewProps> = ({
  config,
  items,
  students,
  summary,
  onUpdateStudents,
  onRegenerateCohort,
  onReviseItemWithAI,
  revisingItemId,
}) => {
  const [subTab, setSubTab] = useState<'statistik-butir' | 'pengecoh' | 'matriks-siswa'>(
    'statistik-butir'
  );
  const [selectedQuestionIdForDistractor, setSelectedQuestionIdForDistractor] = useState<string>(
    items[0]?.id || ''
  );
  const [aiRevisionLog, setAiRevisionLog] = useState<Record<string, string>>({});
  const [csvImportError, setCsvImportError] = useState<string | null>(null);

  const optionLabels: OptionLabel[] =
    config.jumlahOpsi === 4 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];

  const rankedStudents = scoreAndRankStudents(items, students);
  const groupByStudentId: Record<string, { correctCount: number; score100: number; group: string }> =
    {};
  rankedStudents.forEach((r) => {
    groupByStudentId[r.student.id] = {
      correctCount: r.correctCount,
      score100: r.score100,
      group: r.group,
    };
  });

  const handleCellChange = (studentId: string, questionId: string, val: OptionLabel | '') => {
    const next = students.map((st) => {
      if (st.id !== studentId) return st;
      return {
        ...st,
        sumberData: 'Input Guru / CSV' as const,
        jawaban: {
          ...st.jawaban,
          [questionId]: val,
        },
      };
    });
    onUpdateStudents(next);
  };

  const handleAddStudentRow = () => {
    const idx = students.length + 1;
    const defaultAnswers: Record<string, OptionLabel | ''> = {};
    items.forEach((item) => {
      defaultAnswers[item.id] = item.kunciJawaban;
    });
    const newStudent: StudentResponse = {
      id: `manual-${Date.now()}`,
      nis: `2026${String(100 + idx).padStart(3, '0')}`,
      namaSiswa: `Siswa Baru ${idx}`,
      jawaban: defaultAnswers,
      sumberData: 'Input Guru / CSV',
    };
    onUpdateStudents([...students, newStudent]);
  };

  const handleDeleteStudentRow = (studentId: string) => {
    onUpdateStudents(students.filter((s) => s.id !== studentId));
  };

  const handleExportCSV = () => {
    const headers = [
      'No',
      'NIS',
      'Nama_Siswa',
      ...items.map((i) => `Soal_${i.nomor}(Kunci:${i.kunciJawaban})`),
      'Jumlah_Benar',
      'Nilai_Skala_100',
      'Kelompok_27_Persen',
    ];
    const rows = students.map((st, idx) => {
      const info = groupByStudentId[st.id] || { correctCount: 0, score100: 0, group: 'Tengah' };
      return [
        idx + 1,
        `"${st.nis}"`,
        `"${st.namaSiswa.replace(/"/g, '""')}"`,
        ...items.map((i) => st.jawaban[i.id] || ''),
        info.correctCount,
        info.score100,
        info.group,
      ].join(',');
    });
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Matriks_Skor_Siswa_${config.mataPelajaran.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = String(ev.target?.result || '');
        const lines = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        if (lines.length < 2) {
          setCsvImportError('File CSV minimal harus memiliki baris header dan 1 baris data siswa.');
          return;
        }
        const parsedStudents: StudentResponse[] = [];
        for (let r = 1; r < lines.length; r++) {
          const cols = lines[r].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
          if (cols.length < 3) continue;
          const nis = cols[1] || `2026${String(r).padStart(3, '0')}`;
          const namaSiswa = cols[2] || `Siswa ${r}`;
          const jawaban: Record<string, OptionLabel | ''> = {};
          items.forEach((item, qIdx) => {
            const rawAns = (cols[3 + qIdx] || '').toUpperCase();
            if (['A', 'B', 'C', 'D', 'E'].includes(rawAns)) {
              jawaban[item.id] = rawAns as OptionLabel;
            } else {
              jawaban[item.id] = '';
            }
          });
          parsedStudents.push({
            id: `csv-${Date.now()}-${r}`,
            nis,
            namaSiswa,
            jawaban,
            sumberData: 'Input Guru / CSV',
          });
        }
        if (parsedStudents.length > 0) {
          onUpdateStudents(parsedStudents);
        } else {
          setCsvImportError('Tidak ada baris jawaban siswa yang valid di dalam file CSV.');
        }
      } catch (err: any) {
        setCsvImportError(err?.message || 'Gagal membaca format CSV.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAIReviseClick = async (stat: ItemEmpiricalStats) => {
    const item = items.find((i) => i.id === stat.questionId);
    if (!item) return;
    const msg = await onReviseItemWithAI(item, stat);
    if (msg) {
      setAiRevisionLog((prev) => ({ ...prev, [item.id]: msg }));
    }
  };

  const activeDistractorStat =
    summary.butirStats.find((b) => b.questionId === selectedQuestionIdForDistractor) ||
    summary.butirStats[0];
  const activeDistractorItem =
    items.find((i) => i.id === activeDistractorStat?.questionId) || items[0];

  return (
    <div className="space-y-6">
      {/* Header & Ringkasan Statistik Tes (KR-20, Mean, SD, Keputusan Butir) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-sky-700">
              Classical Test Theory (CTT) · Standar Anates Pusmendik
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Laboratorium Analisis Butir Soal Statistik Empiris
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Responden: <strong className="font-mono tabular-nums">{summary.jumlahSiswa} Siswa</strong> (Kelompok Atas 27% = {summary.ukuranKelompokAtasBawah} siswa, Kelompok Bawah 27% = {summary.ukuranKelompokAtasBawah} siswa) · Nilai kritis $r_{'{tabel}'}$ ($\alpha=0.05$) ={' '}
              <strong className="font-mono tabular-nums">
                {summary.butirStats[0]?.rTabelAlpha05 ?? 0.361}
              </strong>
            </p>
          </div>

          {/* Generator Cepat Kohort Siswa */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 no-print">
            <span className="text-xs font-medium text-slate-500">Simulasi Kohort Cepat:</span>
            {[15, 30, 40].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => onRegenerateCohort(cnt)}
                className={`px-3 py-1.5 text-xs font-mono tabular-nums font-semibold rounded-lg border transition-colors ${
                  students.length === cnt
                    ? 'bg-sky-50 border-sky-600 text-sky-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cnt} Siswa
              </button>
            ))}
          </div>
        </div>

        {/* 4 Kolom Ringkasan Psikometri Tingkat Tes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 font-medium">
              Reliabilitas Instrumen (KR-20)
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {summary.reliabilitasKR20.toFixed(3)}
              </span>
              <span className="text-xs font-semibold text-sky-700">
                ({summary.kategoriReliabilitas})
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Konsistensi internal Kuder-Richardson 20 ($\ge 0.70$ Reliabel)
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 font-medium">
              Rata-Rata Skor &amp; Simpangan Baku
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-2xl font-bold text-slate-900">
                {summary.rataRataSkor.toFixed(1)}
              </span>
              <span className="text-xs text-slate-600">
                ± {summary.simpanganBakuSkor.toFixed(1)} (Rentang {summary.skorTerendah}–{summary.skorTertinggi})
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Ketuntasan KKM ({config.kkm}):{' '}
              <strong className="font-mono tabular-nums text-slate-800">
                {summary.persentaseTuntasKKM}%
              </strong>{' '}
              siswa tuntas
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 font-medium">
              Kualitas Butir: Diterima Ideal
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-2xl font-bold text-emerald-700">
                {summary.jumlahButirDiterima}
              </span>
              <span className="text-xs text-slate-600">
                dari {summary.jumlahButir} butir soal ({Math.round((summary.jumlahButirDiterima / Math.max(1, summary.jumlahButir)) * 100)}%)
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              ● VALID: Daya beda $D \ge 0.30$ &amp; seluruh pengecoh efektif
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 font-medium">
              Butir Perlu Revisi / Diganti
            </div>
            <div className="mt-1 flex items-baseline gap-3 font-mono tabular-nums">
              <span className="text-2xl font-bold text-amber-700">
                {summary.jumlahButirRevisi} Revisi
              </span>
              <span className="text-sm font-bold text-red-700">
                · {summary.jumlahButirDitolak} Gugur
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Gunakan tombol &ldquo;Perbaiki AI&rdquo; pada baris soal di bawah
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Navigasi 3 Panel Analisis */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setSubTab('statistik-butir')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              subTab === 'statistik-butir'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Tabel Indeks Kesukaran ($P$), Daya Beda ($D$) &amp; Validitas ($r_{'{pbi}'}$)
          </button>
          <button
            type="button"
            onClick={() => setSubTab('pengecoh')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              subTab === 'pengecoh'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Analisis Efektivitas Pengecoh (Opsi A–{config.jumlahOpsi === 4 ? 'D' : 'E'})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('matriks-siswa')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              subTab === 'matriks-siswa'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Matriks Input Skor &amp; Jawaban Siswa ({students.length} Siswa)
          </button>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap w-fit"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Matriks Skor (CSV)</span>
        </button>
      </div>

      {/* PANEL 1: TABEL STATISTIK INDEKS KESUKARAN, DAYA PEMBEDA, & VALIDITAS */}
      {subTab === 'statistik-butir' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Rekapitulasi Parameter Psikometri Per Butir Soal
              </h2>
              <p className="text-xs text-slate-500">
                Rumus: $P = B / N$ · $D = P_A - P_B$ (27% Atas vs 27% Bawah) · $r_{'{pbi}'} = ((M_p - M_t)/SD_t)\sqrt{'{p/q}'}$
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-700">
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-3">Sub-Materi &amp; Level</th>
                  <th className="py-3 px-3 text-center">Kunci</th>
                  <th className="py-3 px-3 text-right">Benar ($B/N$)</th>
                  <th className="py-3 px-3 text-right">Tingkat Kesukaran ($P$)</th>
                  <th className="py-3 px-3 text-right">Daya Pembeda ($D$)</th>
                  <th className="py-3 px-3 text-right">Validitas ($r_{'{pbi}'}$)</th>
                  <th className="py-3 px-3">Pengecoh Lemah</th>
                  <th className="py-3 px-4">Keputusan &amp; Tindak Lanjut</th>
                  <th className="py-3 px-4 text-right no-print">Perbaikan AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {summary.butirStats.map((stat) => {
                  const item = items.find((i) => i.id === stat.questionId);
                  if (!item) return null;
                  const isRevising = revisingItemId === item.id;

                  return (
                    <React.Fragment key={stat.questionId}>
                      <tr className="hover:bg-slate-50/80 align-top transition-colors">
                        <td className="py-3.5 px-3 text-center font-mono tabular-nums font-bold text-slate-900">
                          {String(stat.nomor).padStart(2, '0')}
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-slate-900">{item.materiSpesifik}</div>
                          <div className="text-slate-500">
                            {item.levelKognitif} · {item.dimensiBloom}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center font-mono tabular-nums font-bold text-slate-900">
                          {item.kunciJawaban}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-700">
                          {stat.jumlahBenar}/{stat.jumlahResponden}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="font-mono tabular-nums font-bold text-slate-900">
                            {stat.indeksKesukaran.toFixed(3)}
                          </div>
                          <div className="text-[11px] text-slate-500">{stat.kategoriKesukaran}</div>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="font-mono tabular-nums font-bold text-slate-900">
                            {stat.dayaPembeda.toFixed(3)}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {stat.kategoriDayaPembeda}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="font-mono tabular-nums font-bold text-slate-900">
                            {stat.korelasiPointBiserial.toFixed(3)}
                          </div>
                          <div
                            className={`text-[11px] font-semibold ${
                              stat.statusValiditas === 'Valid'
                                ? 'text-emerald-700'
                                : 'text-red-700'
                            }`}
                          >
                            {stat.statusValiditas === 'Valid' ? '● Valid' : '■ Tidak Valid'}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono tabular-nums">
                          {stat.pengecohTidakEfektif.length === 0 ? (
                            <span className="text-emerald-700 font-medium">Semua Efektif</span>
                          ) : (
                            <span className="text-amber-800 font-semibold">
                              Opsi {stat.pengecohTidakEfektif.join(', ')}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 space-y-1 max-w-xs">
                          <div className="flex items-center gap-1.5 font-semibold">
                            {stat.statusKeputusan === 'Diterima (Ideal)' && (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span>● DITERIMA (IDEAL)</span>
                              </span>
                            )}
                            {(stat.statusKeputusan === 'Revisi Pengecoh' ||
                              stat.statusKeputusan === 'Revisi Pokok Soal') && (
                              <span className="text-amber-700 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>▲ {stat.statusKeputusan.toUpperCase()}</span>
                              </span>
                            )}
                            {stat.statusKeputusan === 'Ditolak / Ganti Butir' && (
                              <span className="text-red-700 flex items-center gap-1">
                                <XOctagon className="w-3.5 h-3.5 shrink-0" />
                                <span>■ DITOLAK / GANTI</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {stat.catatanDiagnostik}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 text-right no-print">
                          <button
                            type="button"
                            disabled={isRevising}
                            onClick={() => handleAIReviseClick(stat)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                              stat.statusKeputusan === 'Diterima (Ideal)'
                                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                : 'bg-sky-600 border-sky-600 text-white hover:bg-sky-700'
                            }`}
                          >
                            {isRevising ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Merevisi...</span>
                              </>
                            ) : (
                              <>
                                <Wand2 className="w-3.5 h-3.5" />
                                <span>Perbaiki Butir (AI)</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>

                      {aiRevisionLog[item.id] && (
                        <tr className="bg-emerald-50/60">
                          <td colSpan={10} className="px-4 py-2.5 text-xs text-emerald-900">
                            <strong>Hasil Perbaikan AI (Soal #{item.nomor}):</strong>{' '}
                            {aiRevisionLog[item.id]}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PANEL 2: ANALISIS EFEKTIVITAS PENGECOH (DISTRACTOR ANALYSIS) */}
      {subTab === 'pengecoh' && activeDistractorStat && activeDistractorItem && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Analisis Distribusi &amp; Efektivitas Pengecoh Per Opsi (Soal Nomor {activeDistractorItem.nomor})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pengecoh yang baik dipilih oleh minimal 5% responden dan lebih banyak dipilih oleh Kelompok Bawah dibanding Kelompok Atas.
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-600 mr-1">Pilih Soal:</span>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedQuestionIdForDistractor(item.id)}
                  className={`w-8 h-8 rounded-lg font-mono tabular-nums text-xs font-bold transition-colors ${
                    activeDistractorItem.id === item.id
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.nomor}
                </button>
              ))}
            </div>
          </div>

          {/* Ringkasan Pokok Soal */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="text-xs text-slate-500">
              Materi: <strong>{activeDistractorItem.materiSpesifik}</strong> · Kunci Jawaban:{' '}
              <strong className="font-mono">{activeDistractorItem.kunciJawaban}</strong>
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {activeDistractorItem.nomor}. {activeDistractorItem.pokokSoal}
            </div>
          </div>

          {/* Tabel Distribusi Pemilih Opsi A-E */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-700">
                  <th className="py-3 px-4 w-16 text-center">Opsi</th>
                  <th className="py-3 px-4">Teks Pilihan Jawaban &amp; Rasional Miskonsepsi</th>
                  <th className="py-3 px-3 text-right">Kel. Atas ($U$)</th>
                  <th className="py-3 px-3 text-right">Kel. Tengah</th>
                  <th className="py-3 px-3 text-right">Kel. Bawah ($L$)</th>
                  <th className="py-3 px-3 text-right">Total Pemilih</th>
                  <th className="py-3 px-4">Proporsi &amp; Efektivitas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {activeDistractorStat.distribusiOpsi.map((dist) => {
                  const optData = activeDistractorItem.opsi.find((o) => o.label === dist.label);
                  const pct = Number((dist.proporsiPemilih * 100).toFixed(1));
                  return (
                    <tr
                      key={dist.label}
                      className={dist.isKey ? 'bg-emerald-50/40' : 'hover:bg-slate-50'}
                    >
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums font-bold text-sm">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${
                            dist.isKey
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-800 border border-slate-300'
                          }`}
                        >
                          {dist.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
                        <div className="font-medium text-slate-900">{optData?.teks}</div>
                        <div className="text-[11px] text-slate-500">
                          <strong>{dist.isKey ? 'Rasional Kunci: ' : 'Jebakan Pengecoh: '}</strong>
                          {optData?.rasionalPengecoh}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-800">
                        {dist.pemilihAtas}
                      </td>

                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-600">
                        {dist.pemilihTengah}
                      </td>

                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-800">
                        {dist.pemilihBawah}
                      </td>

                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {dist.totalPemilih} ({pct}%)
                      </td>

                      <td className="py-3.5 px-4 w-64 space-y-1.5">
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              dist.isKey
                                ? 'bg-emerald-600'
                                : dist.statusPengecoh === 'Berfungsi Baik'
                                ? 'bg-sky-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                        <div
                          className={`text-[11px] font-semibold ${
                            dist.isKey || dist.statusPengecoh === 'Berfungsi Baik'
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {dist.isKey ? '● KUNCI JAWABAN' : `▲ ${dist.statusPengecoh}`}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PANEL 3: MATRIKS INPUT SKOR & JAWABAN SISWA INTERAKTIF */}
      {subTab === 'matriks-siswa' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                <span>Matriks Jawaban &amp; Skor Siswa (Live Spreadsheet)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ubah huruf jawaban (A–{config.jumlahOpsi === 4 ? 'D' : 'E'}) langsung pada tabel di bawah; seluruh indeks $P$, $D$, $r_{'{pbi}'}$, dan KR-20 akan dihitung ulang seketika.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAddStudentRow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Baris Siswa</span>
              </button>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Impor CSV</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleImportCSV}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => onRegenerateCohort(students.length || 30)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Acak Ulang Simulasi</span>
              </button>
            </div>
          </div>

          {csvImportError && (
            <div className="px-6 py-3 bg-red-50 border-b border-red-200 text-xs text-red-800">
              {csvImportError}
            </div>
          )}

          <div className="overflow-x-auto max-h-[560px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 border-b border-slate-300 z-10 text-[11px] font-semibold text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 text-center w-10">No</th>
                  <th className="py-2.5 px-3 w-28">NIS</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Nama Peserta Didik</th>
                  {items.map((item) => (
                    <th
                      key={item.id}
                      className="py-2.5 px-2 text-center font-mono tabular-nums w-14"
                      title={`Soal ${item.nomor} — Kunci: ${item.kunciJawaban}`}
                    >
                      <div>S{item.nomor}</div>
                      <div className="text-[10px] text-emerald-700">({item.kunciJawaban})</div>
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right w-20">Benar</th>
                  <th className="py-2.5 px-3 text-right w-20">Nilai</th>
                  <th className="py-2.5 px-3 text-center w-24">Kelompok</th>
                  <th className="py-2.5 px-2 text-center w-12">Hapus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {students.map((st, idx) => {
                  const info = groupByStudentId[st.id] || {
                    correctCount: 0,
                    score100: 0,
                    group: 'Tengah',
                  };
                  return (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 text-center font-mono tabular-nums text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2 px-3 font-mono tabular-nums">
                        <input
                          type="text"
                          value={st.nis}
                          onChange={(e) => {
                            const next = [...students];
                            next[idx] = { ...st, nis: e.target.value };
                            onUpdateStudents(next);
                          }}
                          className="w-24 px-1.5 py-1 text-xs border border-transparent hover:border-slate-300 focus:border-sky-600 rounded bg-transparent focus:bg-white"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={st.namaSiswa}
                          onChange={(e) => {
                            const next = [...students];
                            next[idx] = { ...st, namaSiswa: e.target.value };
                            onUpdateStudents(next);
                          }}
                          className="w-full px-1.5 py-1 text-xs font-medium text-slate-900 border border-transparent hover:border-slate-300 focus:border-sky-600 rounded bg-transparent focus:bg-white"
                        />
                      </td>

                      {items.map((item) => {
                        const ans = st.jawaban[item.id] || '';
                        const isCorrect = ans === item.kunciJawaban;
                        return (
                          <td key={item.id} className="py-1.5 px-1.5 text-center">
                            <select
                              value={ans}
                              onChange={(e) =>
                                handleCellChange(
                                  st.id,
                                  item.id,
                                  e.target.value as OptionLabel | ''
                                )
                              }
                              className={`w-12 py-1 text-center font-mono tabular-nums font-bold text-xs rounded border cursor-pointer ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                  : 'bg-red-50/70 border-red-200 text-red-800'
                              }`}
                            >
                              <option value="">-</option>
                              {optionLabels.map((lbl) => (
                                <option key={lbl} value={lbl}>
                                  {lbl}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      })}

                      <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold text-slate-800">
                        {info.correctCount}/{items.length}
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {info.score100}
                      </td>
                      <td className="py-2 px-3 text-center text-[11px] font-semibold">
                        <span
                          className={
                            info.group === 'Atas'
                              ? 'text-emerald-700'
                              : info.group === 'Bawah'
                              ? 'text-amber-700'
                              : 'text-slate-500'
                          }
                        >
                          {info.group}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteStudentRow(st.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Hapus Baris Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
