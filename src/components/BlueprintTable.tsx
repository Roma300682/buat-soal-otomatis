import React, { useState } from 'react';
import { Search, Edit3, Check, Printer, ArrowUpRight } from 'lucide-react';
import {
  BloomDimension,
  CognitiveLevel,
  CurriculumConfig,
  QuestionItem,
  WorkspaceTab,
} from '../types/assessment';

interface BlueprintTableProps {
  config: CurriculumConfig;
  items: QuestionItem[];
  onUpdateItem: (updated: QuestionItem) => void;
  onNavigateToCard: (questionId: string) => void;
  onNavigateTab: (tab: WorkspaceTab) => void;
}

const BLOOM_OPTIONS: BloomDimension[] = [
  'C1 - Mengingat',
  'C2 - Memahami',
  'C3 - Menerapkan',
  'C4 - Menganalisis',
  'C5 - Mengevaluasi',
  'C6 - Mencipta',
];

export const BlueprintTable: React.FC<BlueprintTableProps> = ({
  config,
  items,
  onUpdateItem,
  onNavigateToCard,
  onNavigateTab,
}) => {
  const [filterLevel, setFilterLevel] = useState<'ALL' | CognitiveLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    if (filterLevel !== 'ALL' && item.levelKognitif !== filterLevel) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.materiSpesifik.toLowerCase().includes(q) ||
      item.indikatorSoal.toLowerCase().includes(q) ||
      item.tpRef.toLowerCase().includes(q) ||
      item.bentukStimulus.toLowerCase().includes(q)
    );
  });

  const countL1 = items.filter((i) => i.levelKognitif === 'L1').length;
  const countL2 = items.filter((i) => i.levelKognitif === 'L2').length;
  const countL3 = items.filter((i) => i.levelKognitif === 'L3').length;

  return (
    <div className="space-y-6">
      {/* Header & Ringkasan Kisi-Kisi */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <p className="text-xs text-slate-500">
              Dokumen Perencanaan Asesmen · {config.namaSekolah} · Tahun Ajaran {config.tahunAjaran}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Matriks Kisi-Kisi Penulisan Soal Pilihan Ganda (Kurikulum Merdeka)
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Mata Pelajaran: <strong>{config.mataPelajaran}</strong> · {config.jenjangFase} · Kelas/Sem: {config.kelasSemester} · Materi Pokok: <strong>{config.materiPokok}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 no-print">
            <button
              type="button"
              onClick={() => onNavigateTab('ekspor')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Ekspor Kisi-Kisi</span>
            </button>
          </div>
        </div>

        {/* Ringkasan CP, TP, dan Sebaran Level */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 text-xs">
          <div className="lg:col-span-8 space-y-2">
            <div>
              <span className="font-semibold text-slate-900">Capaian Pembelajaran (CP): </span>
              <span className="text-slate-600">{config.capaianPembelajaran || '-'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Tujuan Pembelajaran (TP): </span>
              <span className="text-slate-600 whitespace-pre-line">{config.tujuanPembelajaran || '-'}</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
            <div className="text-xs font-semibold text-slate-800 mb-2">
              Rekapitulasi Distribusi Level Kognitif
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono tabular-nums text-center">
              <div className="bg-white border border-slate-200 rounded p-2">
                <div className="text-slate-500 text-[11px]">L1 (C1-C2)</div>
                <div className="text-base font-bold text-slate-900">{countL1}</div>
              </div>
              <div className="bg-white border border-slate-200 rounded p-2">
                <div className="text-slate-500 text-[11px]">L2 (C3)</div>
                <div className="text-base font-bold text-slate-900">{countL2}</div>
              </div>
              <div className="bg-white border border-slate-200 rounded p-2">
                <div className="text-slate-500 text-[11px]">L3 HOTS</div>
                <div className="text-base font-bold text-sky-700">{countL3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Filter & Pencarian */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit">
          {(['ALL', 'L1', 'L2', 'L3'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filterLevel === lvl
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl === 'ALL'
                ? `Semua Level (${items.length})`
                : lvl === 'L1'
                ? `L1 Pemahaman (${countL1})`
                : lvl === 'L2'
                ? `L2 Penerapan (${countL2})`
                : `L3 Penalaran HOTS (${countL3})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari indikator, sub-materi, stimulus..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
      </div>

      {/* Tabel Matriks Kisi-Kisi */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-700">
                <th className="py-3 px-3 w-12 text-center">No</th>
                <th className="py-3 px-4 w-56">Tujuan Pembelajaran (TP) &amp; ATP</th>
                <th className="py-3 px-4 w-48">Materi Spesifik &amp; Bentuk Stimulus</th>
                <th className="py-3 px-4">Indikator Butir Soal (Format ABCD)</th>
                <th className="py-3 px-3 w-36">Level &amp; Taksonomi Bloom</th>
                <th className="py-3 px-3 w-20 text-center">Kunci</th>
                <th className="py-3 px-3 w-28 text-right no-print">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredItems.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 align-top transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono tabular-nums font-bold text-slate-900">
                      {String(item.nomor).padStart(2, '0')}
                    </td>

                    <td className="py-3.5 px-4 space-y-1.5">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={item.tpRef}
                            onChange={(e) => onUpdateItem({ ...item, tpRef: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                            placeholder="Referensi TP"
                          />
                          <input
                            type="text"
                            value={item.atpRef}
                            onChange={(e) => onUpdateItem({ ...item, atpRef: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                            placeholder="Referensi ATP"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="font-medium text-slate-900">{item.tpRef}</div>
                          <div className="text-slate-500">{item.atpRef}</div>
                        </>
                      )}
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={item.materiSpesifik}
                            onChange={(e) =>
                              onUpdateItem({ ...item, materiSpesifik: e.target.value })
                            }
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                            placeholder="Materi Spesifik"
                          />
                          <input
                            type="text"
                            value={item.bentukStimulus}
                            onChange={(e) =>
                              onUpdateItem({ ...item, bentukStimulus: e.target.value })
                            }
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                            placeholder="Bentuk Stimulus"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="font-semibold text-slate-900">{item.materiSpesifik}</div>
                          <div className="text-slate-500">Stimulus: {item.bentukStimulus}</div>
                        </>
                      )}
                    </td>

                    <td className="py-3.5 px-4 leading-relaxed text-slate-800">
                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={item.indikatorSoal}
                          onChange={(e) =>
                            onUpdateItem({ ...item, indikatorSoal: e.target.value })
                          }
                          className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded"
                        />
                      ) : (
                        item.indikatorSoal
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      {isEditing ? (
                        <div className="space-y-2">
                          <select
                            value={item.levelKognitif}
                            onChange={(e) =>
                              onUpdateItem({
                                ...item,
                                levelKognitif: e.target.value as CognitiveLevel,
                              })
                            }
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                          >
                            <option value="L1">L1 (Pemahaman)</option>
                            <option value="L2">L2 (Penerapan)</option>
                            <option value="L3">L3 (Penalaran HOTS)</option>
                          </select>
                          <select
                            value={item.dimensiBloom}
                            onChange={(e) =>
                              onUpdateItem({
                                ...item,
                                dimensiBloom: e.target.value as BloomDimension,
                              })
                            }
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                          >
                            {BLOOM_OPTIONS.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <div className="font-semibold text-slate-900">
                            Level {item.levelKognitif}
                          </div>
                          <div className="text-slate-600">{item.dimensiBloom}</div>
                          <div className="text-slate-400">
                            Est: {item.estimasiKesukaranAwal}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono tabular-nums font-bold text-slate-900">
                      {item.kunciJawaban}
                    </td>

                    <td className="py-3.5 px-3 text-right no-print">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingId(isEditing ? null : item.id)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title={isEditing ? 'Simpan Perubahan' : 'Sunting Baris Kisi-Kisi'}
                        >
                          {isEditing ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Edit3 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigateToCard(item.id)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-sky-700 hover:bg-sky-50 rounded-md transition-colors whitespace-nowrap"
                          title="Buka Kartu Soal Nomor Ini"
                        >
                          <span>Kartu</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                    Tidak ada butir kisi-kisi yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
