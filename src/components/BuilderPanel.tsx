import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Wand2,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { CurriculumConfig, FaseKurikulum, QuestionItem, WorkspaceTab } from '../types/assessment';
import { PRESET_MATERIALS } from '../data/presets';
import { buildFallbackCurriculum } from '../utils/serverFallbackGenerator';

interface BuilderPanelProps {
  config: CurriculumConfig;
  onChangeConfig: (updater: (prev: CurriculumConfig) => CurriculumConfig) => void;
  onSelectPreset: (presetId: string) => void;
  onDeriveCurriculum: () => Promise<void>;
  onGenerateQuestions: () => Promise<void>;
  isDeriving: boolean;
  isGenerating: boolean;
  generationStep: string;
  items: QuestionItem[];
  onNavigateTab: (tab: WorkspaceTab) => void;
}

const FASE_OPTIONS: FaseKurikulum[] = [
  'Fase A (Kelas 1-2 SD)',
  'Fase B (Kelas 3-4 SD)',
  'Fase C (Kelas 5-6 SD)',
  'Fase D (Kelas 7-9 SMP)',
  'Fase E (Kelas 10 SMA/SMK)',
  'Fase F (Kelas 11-12 SMA/SMK)',
  'Perguruan Tinggi / Umum',
];

export const BuilderPanel: React.FC<BuilderPanelProps> = ({
  config,
  onChangeConfig,
  onSelectPreset,
  onDeriveCurriculum,
  onGenerateQuestions,
  isDeriving,
  isGenerating,
  generationStep,
  items,
  onNavigateTab,
}) => {
  const [autoSyncCurriculum, setAutoSyncCurriculum] = useState(true);
  const [deriveSuccessNotice, setDeriveSuccessNotice] = useState<string | null>(null);
  const totalProporsi = config.proporsiL1 + config.proporsiL2 + config.proporsiL3;

  const adjustProportion = (level: 'proporsiL1' | 'proporsiL2' | 'proporsiL3', value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    onChangeConfig((prev) => {
      const next = { ...prev, [level]: clamped };
      const restKeys = (['proporsiL1', 'proporsiL2', 'proporsiL3'] as const).filter(
        (k) => k !== level
      );
      const remaining = Math.max(0, 100 - clamped);
      const currentOtherSum = prev[restKeys[0]] + prev[restKeys[1]];
      if (currentOtherSum === 0) {
        next[restKeys[0]] = Math.round(remaining / 2);
        next[restKeys[1]] = remaining - next[restKeys[0]];
      } else {
        next[restKeys[0]] = Math.round((prev[restKeys[0]] / currentOtherSum) * remaining);
        next[restKeys[1]] = remaining - next[restKeys[0]];
      }
      return next;
    });
  };

  const countL1 = Math.round((config.jumlahSoal * config.proporsiL1) / 100);
  const countL2 = Math.round((config.jumlahSoal * config.proporsiL2) / 100);
  const countL3 = Math.max(0, config.jumlahSoal - countL1 - countL2);

  const handleMateriPokokChange = (newMateri: string) => {
    setDeriveSuccessNotice(null);
    onChangeConfig((prev) => {
      if (!autoSyncCurriculum || !newMateri.trim()) {
        return { ...prev, materiPokok: newMateri };
      }
      const derived = buildFallbackCurriculum({
        mataPelajaran: prev.mataPelajaran,
        jenjangFase: prev.jenjangFase,
        kelasSemester: prev.kelasSemester,
        materiPokok: newMateri,
        ringkasanMateri: prev.ringkasanMateri,
      });
      return {
        ...prev,
        materiPokok: newMateri,
        capaianPembelajaran: derived.capaianPembelajaran,
        tujuanPembelajaran: derived.tujuanPembelajaran,
        alurTujuanPembelajaran: derived.alurTujuanPembelajaran,
      };
    });
  };

  const handleClickDerive = async () => {
    setDeriveSuccessNotice(null);
    await onDeriveCurriculum();
    setDeriveSuccessNotice(
      'Struktur CP, TP, ATP, dan Ringkasan Materi berhasil diturunkan otomatis dari Materi Pokok.'
    );
  };

  return (
    <div className="space-y-8">
      {/* Banner Pengantar & Katalog Elemen Kurikulum Akuntansi */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-sky-700 mb-1">
              Alur Penyusunan Sistematis · Kurikulum Merdeka Akuntansi &amp; Keuangan Lembaga (AKL)
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
              Susun Soal Pilihan Ganda, Kisi-Kisi &amp; Analisis Butir Hanya dari Materi Pokok
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Pilih elemen <strong>Kurikulum Akuntansi</strong> atau ketik langsung <strong>Materi Pokok</strong> Anda di bawah ini. AI akan otomatis menurunkan <strong>CP, TP, dan ATP</strong>, menyusun <strong>Kisi-Kisi ABCD</strong>, merakit <strong>Kartu Soal HOTS</strong> beserta rasional pengecoh, hingga menghitung <strong>Analisis Statistik Empiris ($P$, $D$, $r_{'{pbi}'}$, KR-20)</strong>.
            </p>
          </div>

          <div className="w-full lg:w-96 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kurikulum-akuntansi-select"
                className="text-xs font-bold text-slate-800"
              >
                Muat Materi Sesuai Kurikulum Akuntansi:
              </label>
              <button
                type="button"
                onClick={() => onSelectPreset('__BLANK__')}
                className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline cursor-pointer"
              >
                Kosongkan Form (Input Manual)
              </button>
            </div>
            <select
              id="kurikulum-akuntansi-select"
              value={
                PRESET_MATERIALS.find((p) => p.config.materiPokok === config.materiPokok)?.id ||
                '__CUSTOM__'
              }
              onChange={(e) => {
                if (e.target.value !== '__CUSTOM__') {
                  onSelectPreset(e.target.value);
                }
              }}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              <option value="__CUSTOM__">
                -- Materi Kustom / Input Manual Guru --
              </option>
              {PRESET_MATERIALS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.judulPreset}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Memuat CP, TP, ATP, Uraian Materi, Kisi-Kisi, dan Paket Soal sesuai elemen Kurikulum Merdeka Akuntansi.
            </p>
          </div>
        </div>

        {/* Ringkasan tahapan sistematis */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-5 text-xs text-slate-600">
          <div>
            <span className="font-semibold text-slate-900">01. Input Materi Pokok</span>
            <p className="mt-0.5 text-slate-500">
              Cukup isi topik atau bahan ajar akuntansi; CP, TP &amp; ATP diturunkan otomatis.
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">02. Matriks Kisi-Kisi ABCD</span>
            <p className="mt-0.5 text-slate-500">
              Pemetaan indikator butir soal ke Taksonomi Bloom (C1–C6) &amp; Level L1–L3.
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">03. Kartu Soal &amp; Rasional Opsi</span>
            <p className="mt-0.5 text-slate-500">
              Stimulus kasus/jurnal/neraca, pokok soal, dan analisis jebakan pengecoh.
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">04. Anates Statistik Empiris</span>
            <p className="mt-0.5 text-slate-500">
              Uji kesukaran ($P$), daya beda ($D$), validitas ($r_{'{pbi}'}$), &amp; reliabilitas KR-20.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Utama 2 Kolom: Kiri Input Materi & Kurikulum, Kanan Parameter & Eksekusi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri (7 kolom): Materi Pokok & Struktur Kurikulum Merdeka */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bagian 1: Identitas & Materi Pokok (Inti Masukan) */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  1. Identitas &amp; Materi Pokok Kurikulum Akuntansi
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih elemen kurikulum akuntansi atau ketik materi pokok secara mandiri
                </p>
              </div>
              <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mata Pelajaran / Kompetensi Keahlian
                </label>
                <input
                  type="text"
                  value={config.mataPelajaran}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({ ...prev, mataPelajaran: e.target.value }))
                  }
                  placeholder="Contoh: Praktikum Akuntansi Perusahaan Dagang, Akuntansi Keuangan, Akuntansi Biaya"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Fase / Jenjang Kurikulum Merdeka
                </label>
                <select
                  value={config.jenjangFase}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({
                      ...prev,
                      jenjangFase: e.target.value as FaseKurikulum,
                    }))
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                >
                  {FASE_OPTIONS.map((fase) => (
                    <option key={fase} value={fase}>
                      {fase}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Satuan Pendidikan / Sekolah
                </label>
                <input
                  type="text"
                  value={config.namaSekolah}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({ ...prev, namaSekolah: e.target.value }))
                  }
                  placeholder="Contoh: SMK Negeri 1 Akuntansi & Keuangan"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Kelas / Semester
                  </label>
                  <input
                    type="text"
                    value={config.kelasSemester}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({ ...prev, kelasSemester: e.target.value }))
                    }
                    placeholder="XI AKL / Ganjil"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Penyusun Soal
                  </label>
                  <input
                    type="text"
                    value={config.penyusun}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({ ...prev, penyusun: e.target.value }))
                    }
                    placeholder="Tim MGMP Akuntansi"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label className="block text-xs font-semibold text-slate-900">
                  Materi Pokok / Elemen Kompetensi Akuntansi <span className="text-red-600">*</span>
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoSyncCurriculum}
                    onChange={(e) => setAutoSyncCurriculum(e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-600"
                  />
                  <span>Turunkan CP, TP &amp; ATP otomatis saat materi diketik</span>
                </label>
              </div>
              <input
                type="text"
                value={config.materiPokok}
                onChange={(e) => handleMateriPokokChange(e.target.value)}
                placeholder="Ketik judul materi pokok akuntansi, contoh: Kas Kecil, Rekonsiliasi Bank, Piutang, HPP, Aset Tetap..."
                className="w-full px-3.5 py-2.5 text-sm font-medium bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Uraian Materi Pembelajaran / Teks Bahan Ajar (Opsional namun Direkomendasikan)
                </label>
                <span className="text-xs text-slate-500">
                  Tempelkan ringkasan bab, modul, atau artikel referensi
                </span>
              </div>
              <textarea
                rows={5}
                value={config.ringkasanMateri}
                onChange={(e) =>
                  onChangeConfig((prev) => ({ ...prev, ringkasanMateri: e.target.value }))
                }
                placeholder="Tempelkan poin-poin materi pembelajaran, rumus, atau wacana bahan ajar di sini. Jika dikosongkan, sistem akan mengembangkan konsep secara otomatis berdasarkan Materi Pokok di atas..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 leading-relaxed"
              />
            </div>
          </section>

          {/* Bagian 2: Struktur Kurikulum Merdeka (CP, TP, ATP) dengan Generator Otomatis */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  2. Struktur Kurikulum Merdeka (CP, TP &amp; ATP)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diturunkan otomatis dari Materi Pokok atau klik tombol di kanan untuk memperbarui
                </p>
              </div>
              <button
                type="button"
                onClick={handleClickDerive}
                disabled={isDeriving || !config.materiPokok.trim()}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isDeriving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Menurunkan CP, TP &amp; ATP...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Turunkan CP, TP &amp; ATP Otomatis dari Materi</span>
                  </>
                )}
              </button>
            </div>

            {deriveSuccessNotice && (
              <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{deriveSuccessNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDeriveSuccessNotice(null)}
                  className="text-emerald-700 hover:text-emerald-950 font-semibold"
                >
                  Tutup
                </button>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Capaian Pembelajaran (CP)
                </label>
                <textarea
                  rows={2}
                  value={config.capaianPembelajaran}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({ ...prev, capaianPembelajaran: e.target.value }))
                  }
                  placeholder="Kompetensi pembelajaran yang harus dicapai peserta didik pada akhir fase..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tujuan Pembelajaran (TP)
                </label>
                <textarea
                  rows={3}
                  value={config.tujuanPembelajaran}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({ ...prev, tujuanPembelajaran: e.target.value }))
                  }
                  placeholder="Kompetensi dan lingkup materi yang dituju dalam kegiatan pembelajaran..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alur Tujuan Pembelajaran (ATP) / Indikator Ketercapaian
                </label>
                <textarea
                  rows={3}
                  value={config.alurTujuanPembelajaran}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({ ...prev, alurTujuanPembelajaran: e.target.value }))
                  }
                  placeholder="Rangkaian tujuan pembelajaran yang tersusun secara sistematis dan logis dari awal hingga akhir fase..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Kolom Kanan (5 kolom): Konfigurasi Psikometri, Level Kognitif & Tombol Generate */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  3. Spesifikasi Butir Soal &amp; Proporsi Kognitif
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Atur jumlah soal, opsi jawaban, dan distribusi Taksonomi Bloom
                </p>
              </div>
              <Sliders className="w-5 h-5 text-slate-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Jumlah Butir Soal PG (Maks. 50)
                  </label>
                  <span className="text-[11px] font-mono tabular-nums text-sky-700 font-semibold">
                    1–50 Soal
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].includes(config.jumlahSoal) ? config.jumlahSoal : 'custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        onChangeConfig((prev) => ({
                          ...prev,
                          jumlahSoal: Number(e.target.value),
                        }));
                      }
                    }}
                    className="flex-1 px-3 py-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                  >
                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
                      <option key={num} value={num}>
                        {num} Butir Soal
                      </option>
                    ))}
                    {![5, 10, 15, 20, 25, 30, 35, 40, 45, 50].includes(config.jumlahSoal) && (
                      <option value="custom">{config.jumlahSoal} Butir (Kustom)</option>
                    )}
                  </select>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={config.jumlahSoal}
                    onChange={(e) => {
                      const val = Math.min(50, Math.max(1, Number(e.target.value) || 1));
                      onChangeConfig((prev) => ({ ...prev, jumlahSoal: val }));
                    }}
                    title="Ketik jumlah soal (1 s.d. 50)"
                    className="w-20 px-2.5 py-2 text-sm font-mono tabular-nums text-center bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Jumlah Opsi Jawaban
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => onChangeConfig((prev) => ({ ...prev, jumlahOpsi: 4 }))}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      config.jumlahOpsi === 4
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4 Opsi (A–D)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeConfig((prev) => ({ ...prev, jumlahOpsi: 5 }))}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      config.jumlahOpsi === 5
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    5 Opsi (A–E)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Durasi Simulasi Ujian (Menit)
                </label>
                <input
                  type="number"
                  min={5}
                  max={180}
                  value={config.waktuUjianMenit}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({
                      ...prev,
                      waktuUjianMenit: Math.max(5, Number(e.target.value) || 30),
                    }))
                  }
                  className="w-full px-3.5 py-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kriteria Ketuntasan (KKM)
                </label>
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={config.kkm}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({
                      ...prev,
                      kkm: Math.min(100, Math.max(50, Number(e.target.value) || 75)),
                    }))
                  }
                  className="w-full px-3.5 py-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>
            </div>

            {/* Sliders Proporsi Level Kognitif Pusmendik */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">
                  Proporsi Level Kognitif (Standar Pusmendik)
                </span>
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  Total: {totalProporsi}% ({config.jumlahSoal} Soal)
                </span>
              </div>

              {/* L1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="slider-l1" className="font-medium text-slate-700">
                    Level 1 — Pemahaman (C1 Mengingat &amp; C2 Memahami)
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {config.proporsiL1}% · {countL1} Soal
                  </span>
                </div>
                <input
                  id="slider-l1"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={config.proporsiL1}
                  onChange={(e) => adjustProportion('proporsiL1', Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* L2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="slider-l2" className="font-medium text-slate-700">
                    Level 2 — Penerapan / Aplikasi Kontekstual (C3)
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {config.proporsiL2}% · {countL2} Soal
                  </span>
                </div>
                <input
                  id="slider-l2"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={config.proporsiL2}
                  onChange={(e) => adjustProportion('proporsiL2', Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* L3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="slider-l3" className="font-medium text-slate-700">
                    Level 3 — Penalaran HOTS (C4 Analisis, C5 Evaluasi, C6 Kreasi)
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {config.proporsiL3}% · {countL3} Soal
                  </span>
                </div>
                <input
                  id="slider-l3"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={config.proporsiL3}
                  onChange={(e) => adjustProportion('proporsiL3', Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Tombol Eksekusi Utama */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onGenerateQuestions}
                disabled={isGenerating || !config.materiPokok.trim()}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{generationStep || 'Menyusun Paket Soal & Kisi-Kisi dengan AI...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Susun Soal Pilihan Ganda, Kisi-Kisi &amp; Analisis Butir (AI)</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500 mt-2">
                Menghasilkan {config.jumlahSoal} butir soal PG ({config.jumlahOpsi} opsi) beserta Kisi-Kisi ABCD, Kartu Soal, dan simulasi kohort siswa otomatis.
              </p>
            </div>
          </section>

          {/* Ringkasan Paket Soal Saat Ini & Navigasi Cepat */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Status Instrumen Terkini ({items.length} Butir Soal Aktif)
                </h3>
                <p className="text-xs text-slate-500">
                  Klik menu di bawah untuk memeriksa hasil penyusunan
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => onNavigateTab('kisi-kisi')}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Matriks Kisi-Kisi Penulisan Soal
                  </div>
                  <div className="text-xs text-slate-500">
                    Pemetaan CP, TP, ATP, Stimulus, &amp; Indikator ABCD ({items.length} nomor)
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('kartu-soal')}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Kartu Soal Pilihan Ganda &amp; Rasional Pengecoh
                  </div>
                  <div className="text-xs text-slate-500">
                    Format resmi Kemendikdasmen + analisis miskonsepsi opsi A–{config.jumlahOpsi === 4 ? 'D' : 'E'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('analisis-butir')}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Laboratorium Analisis Butir Soal Statistik Empiris
                  </div>
                  <div className="text-xs text-slate-500">
                    Indeks Kesukaran ($P$), Daya Pembeda ($D$), Validitas ($r_{'{pbi}'}$), &amp; Reliabilitas KR-20
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
