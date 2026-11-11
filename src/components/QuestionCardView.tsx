import React, { useState } from 'react';
import {
  Wand2,
  Edit3,
  Check,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Printer,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  CurriculumConfig,
  ItemEmpiricalStats,
  OptionLabel,
  QuestionItem,
  WorkspaceTab,
} from '../types/assessment';

interface QuestionCardViewProps {
  config: CurriculumConfig;
  items: QuestionItem[];
  empiricalStatsMap: Record<string, ItemEmpiricalStats>;
  selectedQuestionId: string | null;
  onSelectQuestionId: (id: string) => void;
  onUpdateItem: (updated: QuestionItem) => void;
  onReviseWithAI: (item: QuestionItem) => Promise<string | null>;
  revisingItemId: string | null;
  onNavigateTab: (tab: WorkspaceTab) => void;
}

export const QuestionCardView: React.FC<QuestionCardViewProps> = ({
  config,
  items,
  empiricalStatsMap,
  selectedQuestionId,
  onSelectQuestionId,
  onUpdateItem,
  onReviseWithAI,
  revisingItemId,
  onNavigateTab,
}) => {
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [revisionNote, setRevisionNote] = useState<Record<string, string>>({});

  const activeItem =
    items.find((i) => i.id === selectedQuestionId) || items[0] || null;
  const activeIdx = activeItem ? items.findIndex((i) => i.id === activeItem.id) : 0;

  const handleTriggerAIRevision = async (item: QuestionItem) => {
    const summary = await onReviseWithAI(item);
    if (summary) {
      setRevisionNote((prev) => ({ ...prev, [item.id]: summary }));
    }
  };

  const handleSetKey = (item: QuestionItem, newKey: OptionLabel) => {
    const updatedOpsi = item.opsi.map((o) => ({
      ...o,
      isKey: o.label === newKey,
    }));
    onUpdateItem({
      ...item,
      kunciJawaban: newKey,
      opsi: updatedOpsi,
    });
  };

  const renderOfficialCard = (item: QuestionItem) => {
    const isEditing = editingItemId === item.id;
    const isRevising = revisingItemId === item.id;
    const emp = empiricalStatsMap[item.id];

    return (
      <div
        key={item.id}
        className="bg-white border border-slate-300 rounded-xl overflow-hidden print-break-inside-avoid"
      >
        {/* Top Action Bar Kartu Soal */}
        <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-mono tabular-nums font-bold text-slate-900">
              KARTU SOAL NOMOR {String(item.nomor).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>Level {item.levelKognitif} ({item.dimensiBloom})</span>
            <span aria-hidden="true">·</span>
            <span>Kunci: <strong>{item.kunciJawaban}</strong></span>
            {emp && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  P={emp.indeksKesukaran.toFixed(2)} / D={emp.dayaPembeda.toFixed(2)} ({emp.statusKeputusan})
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={() => setEditingItemId(isEditing ? null : item.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Selesai Sunting</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sunting Manual</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTriggerAIRevision(item)}
              disabled={isRevising}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {isRevising ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Merevisi Butir...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Pertajam Soal &amp; Pengecoh (AI)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notifikasi Hasil Revisi AI jika baru saja direvisi */}
        {revisionNote[item.id] && (
          <div className="px-6 py-3 bg-emerald-50/70 border-b border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 no-print">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Catatan Revisi Psikometri AI:</strong> {revisionNote[item.id]}
            </div>
          </div>
        )}

        {/* Format Tabel Resmi Kartu Soal Standar Pusmendik / Kemendikdasmen */}
        <div className="p-6 space-y-6">
          {/* Blok Identitas & Kisi-Kisi Kartu Soal */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-300 text-xs divide-y md:divide-y-0 md:divide-x divide-slate-300">
            <div className="divide-y divide-slate-200">
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Satuan Pendidikan</span>
                <span className="col-span-2 text-slate-900 font-medium">{config.namaSekolah}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Mata Pelajaran</span>
                <span className="col-span-2 text-slate-900 font-medium">
                  {config.mataPelajaran} ({config.jenjangFase})
                </span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Kelas / Semester</span>
                <span className="col-span-2 text-slate-900">{config.kelasSemester}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Materi Pokok</span>
                <span className="col-span-2 text-slate-900 font-medium">{item.materiSpesifik}</span>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Bentuk Soal</span>
                <span className="col-span-2 text-slate-900">
                  Pilihan Ganda ({item.opsi.length} Opsi)
                </span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Level Kognitif</span>
                <span className="col-span-2 text-slate-900 font-semibold">
                  {item.levelKognitif} — {item.dimensiBloom}
                </span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Bentuk Stimulus</span>
                <span className="col-span-2 text-slate-900">{item.bentukStimulus}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-slate-600">Kunci &amp; Skor</span>
                <span className="col-span-2 font-mono tabular-nums font-bold text-slate-900">
                  Kunci: {item.kunciJawaban} · Skor Maks: {item.skorMaksimal}
                </span>
              </div>
            </div>
          </div>

          {/* Blok CP / TP dan Indikator Soal ABCD */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-300 text-xs divide-y md:divide-y-0 md:divide-x divide-slate-300">
            <div className="p-3.5 space-y-1">
              <div className="font-semibold text-slate-700">
                Capaian Pembelajaran (CP) &amp; Tujuan Pembelajaran (TP):
              </div>
              <p className="text-slate-800 leading-relaxed">{item.tpRef}</p>
              <p className="text-slate-500">{item.atpRef}</p>
            </div>
            <div className="p-3.5 space-y-1">
              <div className="font-semibold text-slate-700">
                Rumusan Indikator Butir Soal (ABCD):
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={item.indikatorSoal}
                  onChange={(e) => onUpdateItem({ ...item, indikatorSoal: e.target.value })}
                  className="w-full p-2 text-xs border border-slate-300 rounded"
                />
              ) : (
                <p className="text-slate-800 leading-relaxed">{item.indikatorSoal}</p>
              )}
            </div>
          </div>

          {/* Blok Rumusan Butir Soal (Stimulus + Pokok Soal + Opsi A-E) */}
          <div className="border border-slate-300 p-5 space-y-4">
            <div className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
              RUMUSAN BUTIR SOAL
            </div>

            {/* Stimulus */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500">
                Wacana / Kasus / Data Stimulus:
              </div>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={item.stimulus}
                  onChange={(e) => onUpdateItem({ ...item, stimulus: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg"
                />
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {item.stimulus}
                </div>
              )}
            </div>

            {/* Pokok Soal (Stem) */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500">Pokok Soal (Stem):</div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={item.pokokSoal}
                  onChange={(e) => onUpdateItem({ ...item, pokokSoal: e.target.value })}
                  className="w-full p-2.5 text-sm font-medium border border-slate-300 rounded-lg"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {item.nomor}. {item.pokokSoal}
                </p>
              )}
            </div>

            {/* Pilihan Jawaban & Analisis Kualitatif + Empiris Pengecoh */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-semibold text-slate-500">
                Pilihan Jawaban &amp; Analisis Fungsi Pengecoh (Distractor Rationale):
              </div>

              <div className="space-y-2">
                {item.opsi.map((opt, optIdx) => {
                  const isKey = opt.label === item.kunciJawaban;
                  const empOpt = emp?.distribusiOpsi.find((d) => d.label === opt.label);

                  return (
                    <div
                      key={opt.label}
                      className={`p-3.5 rounded-lg border transition-colors ${
                        isKey
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => isEditing && handleSetKey(item, opt.label)}
                          className={`w-7 h-7 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                            isKey
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-800 border border-slate-300'
                          } ${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-sky-500' : ''}`}
                          title={isEditing ? 'Klik untuk jadikan Kunci Jawaban' : `Opsi ${opt.label}`}
                        >
                          {opt.label}
                        </button>

                        <div className="flex-1 space-y-1.5">
                          {isEditing ? (
                            <input
                              type="text"
                              value={opt.teks}
                              onChange={(e) => {
                                const nextOpsi = [...item.opsi];
                                nextOpsi[optIdx] = { ...opt, teks: e.target.value };
                                onUpdateItem({ ...item, opsi: nextOpsi });
                              }}
                              className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded"
                            />
                          ) : (
                            <div className="text-sm text-slate-900 font-medium leading-relaxed">
                              {opt.teks}
                            </div>
                          )}

                          {/* Rasional Pengecoh & Statistik Empiris Opsi */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
                            {isEditing ? (
                              <input
                                type="text"
                                value={opt.rasionalPengecoh}
                                onChange={(e) => {
                                  const nextOpsi = [...item.opsi];
                                  nextOpsi[optIdx] = {
                                    ...opt,
                                    rasionalPengecoh: e.target.value,
                                  };
                                  onUpdateItem({ ...item, opsi: nextOpsi });
                                }}
                                placeholder="Rasional kunci / pengecoh..."
                                className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                              />
                            ) : (
                              <div>
                                <span className="font-semibold text-slate-700">
                                  {isKey ? 'Rasional Kunci: ' : 'Jebakan / Rasional Pengecoh: '}
                                </span>
                                <span>{opt.rasionalPengecoh}</span>
                              </div>
                            )}

                            {empOpt && (
                              <div className="font-mono tabular-nums text-[11px] shrink-0 text-slate-500">
                                Pemilih: {empOpt.totalPemilih} siswa ({(empOpt.proporsiPemilih * 100).toFixed(0)}%) · Atas:{empOpt.pemilihAtas} / Bawah:{empOpt.pemilihBawah} ·{' '}
                                <span
                                  className={
                                    empOpt.statusPengecoh === 'Kunci Jawaban' ||
                                    empOpt.statusPengecoh === 'Berfungsi Baik'
                                      ? 'text-emerald-700 font-semibold'
                                      : 'text-amber-700 font-semibold'
                                  }
                                >
                                  {empOpt.statusPengecoh}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Blok Pembahasan & Pedoman Penskoran */}
          <div className="border border-slate-300 p-4 bg-slate-50/60 space-y-2 text-xs">
            <div className="font-bold text-slate-800">
              KUNCI JAWABAN ({item.kunciJawaban}) &amp; PEMBAHASAN AKADEMIK:
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={item.pembahasan}
                onChange={(e) => onUpdateItem({ ...item, pembahasan: e.target.value })}
                className="w-full p-2 text-xs bg-white border border-slate-300 rounded"
              />
            ) : (
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {item.pembahasan}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!activeItem) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h2 className="text-base font-bold text-slate-900">Belum Ada Kartu Soal</h2>
        <p className="text-xs text-slate-500">
          Silakan susun soal pilihan ganda terlebih dahulu melalui menu Penyusun &amp; Materi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar Navigasi Kartu Soal */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-600 mr-1">Pilih Nomor Soal:</span>
          {items.map((item) => {
            const isSelected = item.id === activeItem.id && viewMode === 'single';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setViewMode('single');
                  onSelectQuestionId(item.id);
                }}
                className={`w-8 h-8 rounded-lg font-mono tabular-nums text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.nomor}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'single'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Per Nomor
            </button>
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Kartu ({items.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('ekspor')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Kartu Soal</span>
          </button>
        </div>
      </div>

      {/* Konten Kartu Soal */}
      {viewMode === 'single' ? (
        <div className="space-y-4">
          {renderOfficialCard(activeItem)}

          {/* Navigasi Sebelumnya / Selanjutnya */}
          <div className="flex items-center justify-between no-print">
            <button
              type="button"
              disabled={activeIdx <= 0}
              onClick={() => onSelectQuestionId(items[activeIdx - 1].id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kartu Soal Sebelumnya</span>
            </button>

            <span className="text-xs font-mono tabular-nums text-slate-500">
              Menampilkan Kartu Soal {activeItem.nomor} dari {items.length}
            </span>

            <button
              type="button"
              disabled={activeIdx >= items.length - 1}
              onClick={() => onSelectQuestionId(items[activeIdx + 1].id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <span>Kartu Soal Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">{items.map((item) => renderOfficialCard(item))}</div>
      )}
    </div>
  );
};
