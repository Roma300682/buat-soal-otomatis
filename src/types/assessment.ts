export type OptionLabel = 'A' | 'B' | 'C' | 'D' | 'E';

export type CognitiveLevel = 'L1' | 'L2' | 'L3';

export type BloomDimension =
  | 'C1 - Mengingat'
  | 'C2 - Memahami'
  | 'C3 - Menerapkan'
  | 'C4 - Menganalisis'
  | 'C5 - Mengevaluasi'
  | 'C6 - Mencipta';

export type FaseKurikulum =
  | 'Fase A (Kelas 1-2 SD)'
  | 'Fase B (Kelas 3-4 SD)'
  | 'Fase C (Kelas 5-6 SD)'
  | 'Fase D (Kelas 7-9 SMP)'
  | 'Fase E (Kelas 10 SMA/SMK)'
  | 'Fase F (Kelas 11-12 SMA/SMK)'
  | 'Perguruan Tinggi / Umum';

export interface CurriculumConfig {
  namaSekolah: string;
  mataPelajaran: string;
  jenjangFase: FaseKurikulum;
  kelasSemester: string;
  tahunAjaran: string;
  penyusun: string;
  materiPokok: string;
  ringkasanMateri: string;
  capaianPembelajaran: string; // CP
  tujuanPembelajaran: string; // TP
  alurTujuanPembelajaran: string; // ATP
  jumlahSoal: number;
  jumlahOpsi: 4 | 5;
  proporsiL1: number; // % Pemahaman (C1-C2)
  proporsiL2: number; // % Penerapan (C3)
  proporsiL3: number; // % Penalaran HOTS (C4-C6)
  waktuUjianMenit: number;
  kkm: number;
}

export interface QuestionOption {
  label: OptionLabel;
  teks: string;
  isKey: boolean;
  rasionalPengecoh: string; // Penjelasan mengapa opsi ini benar (jika kunci) atau jebakan konseptual apa yang diuji (jika pengecoh)
}

export interface QuestionItem {
  id: string;
  nomor: number;
  cpRef: string;
  tpRef: string;
  atpRef: string;
  materiSpesifik: string;
  bentukStimulus: string; // Contoh: "Wacana Kontekstual", "Data Tabel Pengamatan", "Studi Kasus Analitis"
  indikatorSoal: string; // Rumusan ABCD (Audience, Behavior, Condition, Degree)
  levelKognitif: CognitiveLevel;
  dimensiBloom: BloomDimension;
  stimulus: string; // Teks pengantar / kasus / tabel sebelum pokok soal
  pokokSoal: string; // Stem pertanyaan
  opsi: QuestionOption[];
  kunciJawaban: OptionLabel;
  pembahasan: string;
  skorMaksimal: number;
  estimasiKesukaranAwal: 'Mudah' | 'Sedang' | 'Sukar';
}

export interface StudentResponse {
  id: string;
  nis: string;
  namaSiswa: string;
  jawaban: Record<string, OptionLabel | ''>; // key: question.id
  waktuSelesaiDetik?: number;
  sumberData: 'Simulasi Kohort' | 'Simulasi Mandiri' | 'Input Guru / CSV';
}

export interface DistractorEmpiricalStat {
  label: OptionLabel;
  isKey: boolean;
  pemilihAtas: number;
  pemilihBawah: number;
  pemilihTengah: number;
  totalPemilih: number;
  proporsiPemilih: number; // 0..1
  indeksPengecoh: number; // (Bawah - Atas) / n_kelompok untuk pengecoh
  statusPengecoh: 'Kunci Jawaban' | 'Berfungsi Baik' | 'Kurang Diminati (<5%)' | 'Menyesatkan (Atas > Bawah)';
}

export interface ItemEmpiricalStats {
  questionId: string;
  nomor: number;
  jumlahBenar: number;
  jumlahResponden: number;
  proporsiAtasBenar: number; // PA
  proporsiBawahBenar: number; // PB
  indeksKesukaran: number; // P = B / JS (0.00 - 1.00)
  kategoriKesukaran: 'Terlalu Sukar' | 'Sukar' | 'Sedang (Ideal)' | 'Mudah' | 'Terlalu Mudah';
  dayaPembeda: number; // D = PA - PB (-1.00 - 1.00)
  kategoriDayaPembeda: 'Sangat Baik' | 'Baik' | 'Cukup (Perlu Perbaikan)' | 'Buruk' | 'Sangat Buruk (Negatif)';
  korelasiPointBiserial: number; // rpbi
  rTabelAlpha05: number;
  statusValiditas: 'Valid' | 'Tidak Valid';
  variansButir: number; // p * q
  distribusiOpsi: DistractorEmpiricalStat[];
  pengecohTidakEfektif: OptionLabel[];
  statusKeputusan: 'Diterima (Ideal)' | 'Revisi Pengecoh' | 'Revisi Pokok Soal' | 'Ditolak / Ganti Butir';
  catatanDiagnostik: string;
}

export interface TestEmpiricalSummary {
  jumlahSiswa: number;
  jumlahButir: number;
  ukuranKelompokAtasBawah: number;
  rataRataSkor: number; // Skala 0-100
  rataRataBenar: number;
  simpanganBakuSkor: number;
  skorTertinggi: number;
  skorTerendah: number;
  reliabilitasKR20: number;
  kategoriReliabilitas: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Rendah' | 'Sangat Rendah';
  persentaseTuntasKKM: number;
  jumlahButirDiterima: number;
  jumlahButirRevisi: number;
  jumlahButirDitolak: number;
  butirStats: ItemEmpiricalStats[];
}

export type WorkspaceTab =
  | 'penyusun'
  | 'kisi-kisi'
  | 'kartu-soal'
  | 'simulasi'
  | 'analisis-butir'
  | 'ekspor';
