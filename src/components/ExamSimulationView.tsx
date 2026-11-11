import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';
import {
  CurriculumConfig,
  OptionLabel,
  QuestionItem,
  StudentResponse,
  WorkspaceTab,
} from '../types/assessment';

interface ExamSimulationViewProps {
  config: CurriculumConfig;
  items: QuestionItem[];
  onAppendStudentResponse: (newResponse: StudentResponse) => void;
  onNavigateTab: (tab: WorkspaceTab) => void;
}

export const ExamSimulationView: React.FC<ExamSimulationViewProps> = ({
  config,
  items,
  onAppendStudentResponse,
  onNavigateTab,
}) => {
  const [studentName, setStudentName] = useState('Peserta Simulasi Mandiri');
  const [studentNis, setStudentNis] = useState('2026999');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionLabel | ''>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasPushedToAnalysis, setHasPushedToAnalysis] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const totalAllowedSeconds = (config.waktuUjianMenit || 30) * 60;
  const remainingSeconds = Math.max(0, totalAllowedSeconds - elapsedSeconds);
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  const currentItem = items[currentIdx] || items[0];
  const answeredCount = items.filter((i) => Boolean(answers[i.id])).length;

  const handleSelectOption = (questionId: string, label: OptionLabel) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  };

  const handleToggleFlag = (questionId: string) => {
    if (isSubmitted) return;
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleResetExam = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setHasPushedToAnalysis(false);
    setCurrentIdx(0);
    setElapsedSeconds(0);
  };

  const correctCount = items.filter((item) => answers[item.id] === item.kunciJawaban).length;
  const finalScore = items.length > 0 ? Number(((correctCount / items.length) * 100).toFixed(1)) : 0;
  const isPassed = finalScore >= config.kkm;

  const handleSendToEmpiricalTable = () => {
    if (hasPushedToAnalysis) return;
    const newResp: StudentResponse = {
      id: `sim-${Date.now()}`,
      nis: studentNis || '2026999',
      namaSiswa: studentName.trim() || 'Peserta Simulasi Mandiri',
      jawaban: { ...answers },
      waktuSelesaiDetik: elapsedSeconds,
      sumberData: 'Simulasi Mandiri',
    };
    onAppendStudentResponse(newResp);
    setHasPushedToAnalysis(true);
  };

  if (!currentItem) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <p className="text-sm text-slate-600">Belum ada butir soal untuk disimulasikan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Bar Simulasi Ujian */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500">
            Uji Coba Instrumen Interaktif (Computer-Based Test Preview)
          </p>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Simulasi Ujian: {config.mataPelajaran} — {config.materiPokok}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-600">Nama Peserta:</label>
            <input
              type="text"
              value={studentName}
              disabled={isSubmitted}
              onChange={(e) => setStudentName(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 text-white rounded-lg font-mono tabular-nums text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>
              Sisa Waktu: {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>

          {isSubmitted && (
            <button
              type="button"
              onClick={handleResetExam}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Simulasi</span>
            </button>
          )}
        </div>
      </div>

      {/* Ringkasan Skor jika sudah disubmit */}
      {isSubmitted && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-sky-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Hasil Simulasi Ujian — {studentName}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Menjawab benar {correctCount} dari {items.length} butir soal · KKM: {config.kkm} · Status:{' '}
                  <strong className={isPassed ? 'text-emerald-700' : 'text-red-700'}>
                    {isPassed ? '● TUNTAS (MELAMPAUI KKM)' : '▲ BELUM TUNTAS'}
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-right font-mono tabular-nums">
                <div className="text-[11px] text-slate-500">Nilai Akhir</div>
                <div className="text-2xl font-bold text-slate-900">{finalScore}</div>
              </div>

              <button
                type="button"
                onClick={handleSendToEmpiricalTable}
                disabled={hasPushedToAnalysis}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                {hasPushedToAnalysis ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tersimpan di Tabel Analisis Empiris</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Masukkan Hasil Ini ke Analisis Butir Soal</span>
                  </>
                )}
              </button>

              {hasPushedToAnalysis && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('analisis-butir')}
                  className="px-3.5 py-2.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors whitespace-nowrap"
                >
                  Lihat Perubahan Statistik &rarr;
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Klik nomor soal di bawah untuk meninjau kunci jawaban, pembahasan akademik, dan rasional tiap pengecoh.
          </p>
        </div>
      )}

      {/* Layout 2 Zona: Kiri Canvas Soal (8 Kolom), Kanan Peta Navigasi Nomor (4 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kiri: Lembar Soal Interaktif */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-mono tabular-nums font-bold text-sm text-slate-900">
                SOAL NOMOR {String(currentItem.nomor).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>Level {currentItem.levelKognitif} ({currentItem.dimensiBloom})</span>
              <span aria-hidden="true">·</span>
              <span>{currentItem.materiSpesifik}</span>
            </div>

            {!isSubmitted && (
              <button
                type="button"
                onClick={() => handleToggleFlag(currentItem.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  flagged[currentItem.id]
                    ? 'bg-amber-50 border-amber-400 text-amber-800'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flagged[currentItem.id] ? 'Ditandai Ragu-Ragu' : 'Tandai Ragu-Ragu'}</span>
              </button>
            )}
          </div>

          {/* Stimulus */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed whitespace-pre-line">
            {currentItem.stimulus}
          </div>

          {/* Pokok Soal */}
          <div className="text-base font-semibold text-slate-900 leading-relaxed">
            {currentItem.pokokSoal}
          </div>

          {/* Opsi Jawaban */}
          <div className="space-y-3">
            {currentItem.opsi.map((opt) => {
              const selected = answers[currentItem.id] === opt.label;
              const isKey = opt.label === currentItem.kunciJawaban;

              let borderStyle = 'border-slate-200 bg-white hover:bg-slate-50';
              if (!isSubmitted && selected) {
                borderStyle = 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-600';
              } else if (isSubmitted) {
                if (isKey) {
                  borderStyle = 'border-emerald-500 bg-emerald-50/60';
                } else if (selected && !isKey) {
                  borderStyle = 'border-red-400 bg-red-50/60';
                }
              }

              return (
                <button
                  key={opt.label}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(currentItem.id, opt.label)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors flex items-start gap-3.5 cursor-pointer ${borderStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      !isSubmitted && selected
                        ? 'bg-sky-600 text-white'
                        : isSubmitted && isKey
                        ? 'bg-emerald-600 text-white'
                        : isSubmitted && selected && !isKey
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </span>

                  <div className="flex-1 space-y-1.5">
                    <div className="text-sm font-medium text-slate-900 leading-relaxed">
                      {opt.teks}
                    </div>

                    {isSubmitted && (
                      <div className="text-xs text-slate-600 pt-1.5 border-t border-slate-200/70">
                        <strong className={isKey ? 'text-emerald-800' : 'text-slate-700'}>
                          {isKey ? '✓ Kunci Jawaban: ' : 'Analisis Pengecoh: '}
                        </strong>
                        {opt.rasionalPengecoh}
                      </div>
                    )}
                  </div>

                  {isSubmitted && isKey && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && selected && !isKey && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pembahasan saat sudah submit */}
          {isSubmitted && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
              <div className="font-bold text-slate-900">
                Pembahasan Butir Soal Nomor {currentItem.nomor}:
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {currentItem.pembahasan}
              </p>
            </div>
          )}

          {/* Navigasi Bawah */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              disabled={currentIdx <= 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Soal Sebelumnya</span>
            </button>

            <span className="text-xs font-mono tabular-nums text-slate-500">
              Nomor {currentIdx + 1} / {items.length}
            </span>

            {currentIdx < items.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.min(items.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span>Soal Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : !isSubmitted ? (
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesaikan &amp; Periksa Skor</span>
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-700">Simulasi Selesai</span>
            )}
          </div>
        </div>

        {/* Kanan: Panel Navigasi Nomor Soal & Status */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Navigasi Nomor Soal</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Terjawab: <strong className="font-mono tabular-nums">{answeredCount}/{items.length}</strong> butir soal
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {items.map((item, idx) => {
              const ans = answers[item.id];
              const isFlag = flagged[item.id];
              const isCurrent = idx === currentIdx;
              const isCorrect = isSubmitted && ans === item.kunciJawaban;

              let btnClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
              if (isSubmitted) {
                btnClass = isCorrect
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-red-600 text-white border-red-600';
              } else if (isFlag) {
                btnClass = 'bg-amber-100 text-amber-900 border-amber-400';
              } else if (ans) {
                btnClass = 'bg-sky-600 text-white border-sky-600';
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-11 rounded-lg border font-mono tabular-nums text-xs font-bold flex flex-col items-center justify-center transition-all ${btnClass} ${
                    isCurrent ? 'ring-2 ring-slate-900 ring-offset-1' : ''
                  }`}
                >
                  <span>{item.nomor}</span>
                  <span className="text-[10px] opacity-90">{ans || '-'}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Sudah Dijawab</span>
              <span className="font-mono tabular-nums font-semibold text-slate-900">
                {answeredCount} Soal
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Belum Dijawab</span>
              <span className="font-mono tabular-nums font-semibold text-slate-900">
                {items.length - answeredCount} Soal
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ditandai Ragu-Ragu</span>
              <span className="font-mono tabular-nums font-semibold text-amber-700">
                {Object.values(flagged).filter(Boolean).length} Soal
              </span>
            </div>
          </div>

          {!isSubmitted && (
            <button
              type="button"
              onClick={() => setIsSubmitted(true)}
              className="w-full py-3 text-xs font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Kumpulkan Lembar Jawaban &amp; Lihat Analisis
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
