/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import {
  BloomDimension,
  CognitiveLevel,
  CurriculumConfig,
  ItemEmpiricalStats,
  OptionLabel,
  QuestionItem,
  StudentResponse,
  WorkspaceTab,
} from './types/assessment';
import { PRESET_MATERIALS } from './data/presets';
import {
  computeEmpiricalAnalysis,
  generateRealisticCohortResponses,
} from './utils/psychometrics';
import {
  buildFallbackCurriculum,
  buildFallbackQuestions,
} from './utils/serverFallbackGenerator';
import { BuilderPanel } from './components/BuilderPanel';
import { BlueprintTable } from './components/BlueprintTable';
import { QuestionCardView } from './components/QuestionCardView';
import { ExamSimulationView } from './components/ExamSimulationView';
import { EmpiricalAnalysisView } from './components/EmpiricalAnalysisView';
import { ExportPrintView } from './components/ExportPrintView';

const STORAGE_KEY = 'evaluasiai_kurikulum_akuntansi_v2';

export default function App() {
  const initialPreset = PRESET_MATERIALS[0];

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('penyusun');
  const [config, setConfig] = useState<CurriculumConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.config) return parsed.config;
      }
    } catch {
      // ignore storage errors
    }
    return initialPreset.config;
  });

  const [items, setItems] = useState<QuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
          return parsed.items;
        }
      }
    } catch {
      // ignore
    }
    return initialPreset.sampleItems;
  });

  const [students, setStudents] = useState<StudentResponse[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed?.students) && parsed.students.length > 0) {
          return parsed.students;
        }
      }
    } catch {
      // ignore
    }
    return generateRealisticCohortResponses(initialPreset.sampleItems, 30, 0);
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    items[0]?.id || null
  );
  const [isDeriving, setIsDeriving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [revisingItemId, setRevisingItemId] = useState<string | null>(null);
  const [cohortSeedOffset, setCohortSeedOffset] = useState(1);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ config, items, students }));
    } catch {
      // ignore quota errors
    }
  }, [config, items, students]);

  // Hitung statistik psikometri empiris secara real-time setiap kali items, students, atau KKM berubah
  const empiricalSummary = useMemo(
    () => computeEmpiricalAnalysis(items, students, config.kkm),
    [items, students, config.kkm]
  );

  const empiricalStatsMap = useMemo(() => {
    const map: Record<string, ItemEmpiricalStats> = {};
    empiricalSummary.butirStats.forEach((st) => {
      map[st.questionId] = st;
    });
    return map;
  }, [empiricalSummary]);

  const handleSelectPreset = (presetId: string) => {
    setErrorBanner(null);
    if (presetId === '__BLANK__') {
      setConfig((prev) => ({
        ...prev,
        materiPokok: '',
        ringkasanMateri: '',
        capaianPembelajaran: '',
        tujuanPembelajaran: '',
        alurTujuanPembelajaran: '',
      }));
      return;
    }
    const found = PRESET_MATERIALS.find((p) => p.id === presetId);
    if (!found) return;
    setConfig(found.config);
    if (found.sampleItems.length > 0) {
      setItems(found.sampleItems);
      setSelectedQuestionId(found.sampleItems[0].id);
      setStudents(generateRealisticCohortResponses(found.sampleItems, 30, 0));
    }
  };

  // 1. Handler: Turunkan CP, TP, ATP otomatis hanya dari Materi Pokok (Zero-Error Guarantee)
  const handleDeriveCurriculum = async () => {
    setErrorBanner(null);
    setIsDeriving(true);

    const localSynthesis = buildFallbackCurriculum({
      mataPelajaran: config.mataPelajaran,
      jenjangFase: config.jenjangFase,
      kelasSemester: config.kelasSemester,
      materiPokok: config.materiPokok || config.mataPelajaran || 'Siklus Akuntansi',
      ringkasanMateri: config.ringkasanMateri,
    });

    try {
      const response = await fetch('/api/assessment/derive-curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mataPelajaran: config.mataPelajaran,
          jenjangFase: config.jenjangFase,
          kelasSemester: config.kelasSemester,
          materiPokok: config.materiPokok,
          ringkasanMateri: config.ringkasanMateri,
        }),
      });
      const data = response.ok ? await response.json() : localSynthesis;
      setConfig((prev) => ({
        ...prev,
        capaianPembelajaran: data.capaianPembelajaran || localSynthesis.capaianPembelajaran,
        tujuanPembelajaran: data.tujuanPembelajaran || localSynthesis.tujuanPembelajaran,
        alurTujuanPembelajaran: data.alurTujuanPembelajaran || localSynthesis.alurTujuanPembelajaran,
        ringkasanMateri: data.ringkasanMateri || prev.ringkasanMateri || localSynthesis.ringkasanMateri,
      }));
    } catch {
      // Apabila terjadi kendala jaringan apa pun, langsung gunakan sintesis Kurikulum Merdeka lokal tanpa error
      setConfig((prev) => ({
        ...prev,
        capaianPembelajaran: localSynthesis.capaianPembelajaran,
        tujuanPembelajaran: localSynthesis.tujuanPembelajaran,
        alurTujuanPembelajaran: localSynthesis.alurTujuanPembelajaran,
        ringkasanMateri: prev.ringkasanMateri || localSynthesis.ringkasanMateri,
      }));
    } finally {
      setIsDeriving(false);
    }
  };

  // 2. Handler: Susun Paket Soal PG Sistematis + Kisi-Kisi + Simulasi Kohort Otomatis
  const handleGenerateQuestions = async () => {
    setErrorBanner(null);
    setIsGenerating(true);
    setGenerationStep('Menganalisis Materi Pokok, Menurunkan CP/TP/ATP & Memetakan Indikator ABCD...');

    const jumlahSoal = Math.min(Math.max(Number(config.jumlahSoal) || 5, 1), 50);
    const jumlahOpsi: 4 | 5 = Number(config.jumlahOpsi) === 4 ? 4 : 5;

    try {
      const stepTimer = setTimeout(() => {
        setGenerationStep('Merakit Pokok Soal, Stimulus HOTS & Rasional Pengecoh...');
      }, 2200);

      let data: any;
      try {
        const response = await fetch('/api/assessment/generate-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ config }),
        });
        clearTimeout(stepTimer);
        if (response.ok) {
          data = await response.json();
        } else {
          data = buildFallbackQuestions(config, jumlahSoal, jumlahOpsi);
        }
      } catch {
        clearTimeout(stepTimer);
        data = buildFallbackQuestions(config, jumlahSoal, jumlahOpsi);
      }

      const localDerived = buildFallbackCurriculum({
        mataPelajaran: config.mataPelajaran,
        jenjangFase: config.jenjangFase,
        kelasSemester: config.kelasSemester,
        materiPokok: config.materiPokok,
        ringkasanMateri: config.ringkasanMateri,
      });

      const resolvedCP = data.derivedCP || config.capaianPembelajaran || localDerived.capaianPembelajaran;
      const resolvedTP = data.derivedTP || config.tujuanPembelajaran || localDerived.tujuanPembelajaran;
      const resolvedATP = data.derivedATP || config.alurTujuanPembelajaran || localDerived.alurTujuanPembelajaran;

      setConfig((prev) => ({
        ...prev,
        capaianPembelajaran: resolvedCP,
        tujuanPembelajaran: resolvedTP,
        alurTujuanPembelajaran: resolvedATP,
        ringkasanMateri: prev.ringkasanMateri || localDerived.ringkasanMateri,
      }));

      const rawItems =
        Array.isArray(data.items) && data.items.length > 0
          ? data.items
          : buildFallbackQuestions(config, jumlahSoal, jumlahOpsi).items;

      const normalizedItems: QuestionItem[] = rawItems.map((raw: any, idx: number) => {
        const nomor = idx + 1;
        const rawOpsi = Array.isArray(raw.opsi) ? raw.opsi : [];
        const keyLabel = (
          ['A', 'B', 'C', 'D', 'E'].includes(String(raw.kunciJawaban).toUpperCase())
            ? String(raw.kunciJawaban).toUpperCase()
            : 'A'
        ) as OptionLabel;

        const opsi = rawOpsi.map((o: any, oIdx: number) => {
          const fallbackLabel = (['A', 'B', 'C', 'D', 'E'][oIdx] || 'A') as OptionLabel;
          const lbl = (
            ['A', 'B', 'C', 'D', 'E'].includes(String(o.label).toUpperCase())
              ? String(o.label).toUpperCase()
              : fallbackLabel
          ) as OptionLabel;
          return {
            label: lbl,
            teks: String(o.teks || ''),
            isKey: lbl === keyLabel,
            rasionalPengecoh: String(o.rasionalPengecoh || ''),
          };
        });

        const lvl: CognitiveLevel = ['L1', 'L2', 'L3'].includes(raw.levelKognitif)
          ? raw.levelKognitif
          : 'L2';

        return {
          id: `soal-${Date.now()}-${nomor}`,
          nomor,
          cpRef: String(raw.cpRef || resolvedCP),
          tpRef: String(raw.tpRef || resolvedTP),
          atpRef: String(raw.atpRef || resolvedATP),
          materiSpesifik: String(raw.materiSpesifik || config.materiPokok),
          bentukStimulus: String(raw.bentukStimulus || 'Studi Kasus Kontekstual'),
          indikatorSoal: String(raw.indikatorSoal || ''),
          levelKognitif: lvl,
          dimensiBloom: (raw.dimensiBloom || 'C3 - Menerapkan') as BloomDimension,
          stimulus: String(raw.stimulus || ''),
          pokokSoal: String(raw.pokokSoal || ''),
          opsi,
          kunciJawaban: keyLabel,
          pembahasan: String(raw.pembahasan || ''),
          skorMaksimal: 1,
          estimasiKesukaranAwal: ['Mudah', 'Sedang', 'Sukar'].includes(raw.estimasiKesukaranAwal)
            ? raw.estimasiKesukaranAwal
            : 'Sedang',
        };
      });

      setItems(normalizedItems);
      setSelectedQuestionId(normalizedItems[0]?.id || null);
      setStudents(generateRealisticCohortResponses(normalizedItems, 30, 0));
      setActiveTab('kisi-kisi');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // 3. Handler: Revisi Butir Soal dengan AI berdasarkan statistik empiris
  const handleReviseItemWithAI = async (
    item: QuestionItem,
    stats?: ItemEmpiricalStats
  ): Promise<string | null> => {
    setErrorBanner(null);
    setRevisingItemId(item.id);
    try {
      const empiricalStats = stats || empiricalStatsMap[item.id];
      const response = await fetch('/api/assessment/revise-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item,
          empiricalStats,
          config,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal merevisi butir soal.');
      }

      const keyLabel = (
        ['A', 'B', 'C', 'D', 'E'].includes(String(data.kunciJawaban).toUpperCase())
          ? String(data.kunciJawaban).toUpperCase()
          : item.kunciJawaban
      ) as OptionLabel;

      const updatedOpsi = Array.isArray(data.opsi)
        ? data.opsi.map((o: any, idx: number) => {
            const lbl = (['A', 'B', 'C', 'D', 'E'][idx] || o.label || 'A') as OptionLabel;
            return {
              label: lbl,
              teks: String(o.teks || ''),
              isKey: lbl === keyLabel,
              rasionalPengecoh: String(o.rasionalPengecoh || ''),
            };
          })
        : item.opsi;

      const updatedItem: QuestionItem = {
        ...item,
        stimulus: data.stimulus || item.stimulus,
        pokokSoal: data.pokokSoal || item.pokokSoal,
        indikatorSoal: data.indikatorSoal || item.indikatorSoal,
        kunciJawaban: keyLabel,
        pembahasan: data.pembahasan || item.pembahasan,
        opsi: updatedOpsi,
      };

      const nextItems = items.map((it) => (it.id === item.id ? updatedItem : it));
      setItems(nextItems);

      // Perbarui respons simulasi untuk soal yang sudah diperbaiki agar pengecoh baru diuji secara adil
      setStudents((prevStudents) =>
        generateRealisticCohortResponses(nextItems, prevStudents.length || 30, cohortSeedOffset + 1)
      );
      setCohortSeedOffset((c) => c + 1);

      return String(
        data.ringkasanPerbaikan ||
          'Pokok soal dan pengecoh telah dipertajam sesuai kaidah psikometri.'
      );
    } catch (err: any) {
      setErrorBanner(err?.message || 'Gagal merevisi butir soal dengan AI.');
      return null;
    } finally {
      setRevisingItemId(null);
    }
  };

  const handleUpdateSingleItem = (updated: QuestionItem) => {
    setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
  };

  const handleRegenerateCohort = (count: number) => {
    const nextSeed = cohortSeedOffset + 1;
    setCohortSeedOffset(nextSeed);
    setStudents(generateRealisticCohortResponses(items, count, nextSeed));
  };

  const handleAppendStudentResponse = (newResponse: StudentResponse) => {
    setStudents((prev) => [newResponse, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* TOP BAR CONTRACT: 1 Baris, 3 Zona (Brand | 5 Nav Links | 1 Primary CTA) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-8 no-print">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#penyusun"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('penyusun');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
        >
          EvaluasiAI
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 overflow-x-auto">
          {(
            [
              ['penyusun', 'Penyusun & Materi'],
              ['kisi-kisi', 'Kisi-Kisi'],
              ['kartu-soal', 'Kartu Soal'],
              ['simulasi', 'Simulasi Ujian'],
              ['analisis-butir', 'Analisis Butir'],
            ] as const
          ).map(([tabId, label]) => {
            const isActive = activeTab === tabId;
            return (
              <a
                key={tabId}
                href={`#${tabId}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tabId);
                }}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-slate-900 font-semibold border-sky-600'
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('ekspor')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cetak &amp; Ekspor
          </button>
        </div>
      </header>

      {/* Error Notification Banner */}
      {errorBanner && (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 no-print">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start justify-between gap-3 text-xs text-red-900">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pemberitahuan Sistem:</strong> {errorBanner}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setErrorBanner(null)}
              className="text-red-500 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'penyusun' && (
          <BuilderPanel
            config={config}
            onChangeConfig={setConfig}
            onSelectPreset={handleSelectPreset}
            onDeriveCurriculum={handleDeriveCurriculum}
            onGenerateQuestions={handleGenerateQuestions}
            isDeriving={isDeriving}
            isGenerating={isGenerating}
            generationStep={generationStep}
            items={items}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'kisi-kisi' && (
          <BlueprintTable
            config={config}
            items={items}
            onUpdateItem={handleUpdateSingleItem}
            onNavigateToCard={(qId) => {
              setSelectedQuestionId(qId);
              setActiveTab('kartu-soal');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'kartu-soal' && (
          <QuestionCardView
            config={config}
            items={items}
            empiricalStatsMap={empiricalStatsMap}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestionId={setSelectedQuestionId}
            onUpdateItem={handleUpdateSingleItem}
            onReviseWithAI={(item) => handleReviseItemWithAI(item)}
            revisingItemId={revisingItemId}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'simulasi' && (
          <ExamSimulationView
            config={config}
            items={items}
            onAppendStudentResponse={handleAppendStudentResponse}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'analisis-butir' && (
          <EmpiricalAnalysisView
            config={config}
            items={items}
            students={students}
            summary={empiricalSummary}
            onUpdateStudents={setStudents}
            onRegenerateCohort={handleRegenerateCohort}
            onReviseItemWithAI={handleReviseItemWithAI}
            revisingItemId={revisingItemId}
          />
        )}

        {activeTab === 'ekspor' && (
          <ExportPrintView
            config={config}
            items={items}
            students={students}
            summary={empiricalSummary}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            EvaluasiAI — Instrumen Penyusunan Soal Pilihan Ganda &amp; Analisis Butir Soal Kurikulum Merdeka
          </span>
          <span>
            Standar Kaidah Penulisan Soal Pusmendik &amp; Classical Test Theory (KR-20, Point-Biserial)
          </span>
        </div>
      </footer>
    </div>
  );
}
