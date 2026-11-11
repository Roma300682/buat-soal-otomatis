import {
  DistractorEmpiricalStat,
  ItemEmpiricalStats,
  OptionLabel,
  QuestionItem,
  StudentResponse,
  TestEmpiricalSummary,
} from '../types/assessment';

/**
 * Nilai kritis r Product-Moment / Point-Biserial pada taraf signifikansi alpha = 0.05 (uji dua arah)
 * berdasarkan derajat bebas df = N - 2.
 */
export function getCriticalRTable05(n: number): number {
  if (n <= 3) return 0.997;
  const df = n - 2;
  const table: Record<number, number> = {
    1: 0.997,
    2: 0.95,
    3: 0.878,
    4: 0.811,
    5: 0.754,
    6: 0.707,
    7: 0.666,
    8: 0.632,
    9: 0.602,
    10: 0.576,
    11: 0.553,
    12: 0.532,
    13: 0.514,
    14: 0.497,
    15: 0.482,
    16: 0.468,
    17: 0.456,
    18: 0.444,
    19: 0.433,
    20: 0.423,
    22: 0.404,
    24: 0.388,
    25: 0.381,
    26: 0.374,
    28: 0.361,
    30: 0.349,
    35: 0.325,
    40: 0.304,
    45: 0.288,
    50: 0.273,
    60: 0.25,
    70: 0.232,
    80: 0.217,
    90: 0.205,
    100: 0.195,
  };
  if (table[df]) return table[df];
  // Aproksimasi t-student pada alpha=0.05 (t ≈ 1.96) -> r = t / sqrt(df + t^2)
  const t = 1.98;
  return Number((t / Math.sqrt(df + t * t)).toFixed(3));
}

export function classifyDifficulty(p: number): ItemEmpiricalStats['kategoriKesukaran'] {
  if (p < 0.15) return 'Terlalu Sukar';
  if (p < 0.30) return 'Sukar';
  if (p <= 0.70) return 'Sedang (Ideal)';
  if (p <= 0.85) return 'Mudah';
  return 'Terlalu Mudah';
}

export function classifyDiscrimination(d: number): ItemEmpiricalStats['kategoriDayaPembeda'] {
  if (d < 0) return 'Sangat Buruk (Negatif)';
  if (d < 0.20) return 'Buruk';
  if (d < 0.30) return 'Cukup (Perlu Perbaikan)';
  if (d < 0.40) return 'Baik';
  return 'Sangat Baik';
}

export function classifyReliability(kr20: number): TestEmpiricalSummary['kategoriReliabilitas'] {
  if (kr20 >= 0.80) return 'Sangat Tinggi';
  if (kr20 >= 0.70) return 'Tinggi';
  if (kr20 >= 0.50) return 'Sedang';
  if (kr20 >= 0.30) return 'Rendah';
  return 'Sangat Rendah';
}

export interface ScoredStudent {
  student: StudentResponse;
  correctCount: number;
  score100: number;
  group: 'Atas' | 'Tengah' | 'Bawah';
}

export function scoreAndRankStudents(
  items: QuestionItem[],
  students: StudentResponse[]
): ScoredStudent[] {
  const k = items.length || 1;
  const raw = students.map((student) => {
    let correctCount = 0;
    for (const item of items) {
      const ans = student.jawaban[item.id];
      if (ans && ans === item.kunciJawaban) {
        correctCount += 1;
      }
    }
    const score100 = Number(((correctCount / k) * 100).toFixed(1));
    return { student, correctCount, score100, group: 'Tengah' as ScoredStudent['group'] };
  });

  // Urutkan dari skor tertinggi ke terendah
  const sorted = [...raw].sort((a, b) => {
    if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
    return a.student.namaSiswa.localeCompare(b.student.namaSiswa);
  });

  const n = sorted.length;
  // Metode Kelley 27% untuk kelompok Atas dan Bawah (minimal 1 jika n >= 2)
  const groupSize = n >= 10 ? Math.max(2, Math.round(n * 0.27)) : Math.max(1, Math.floor(n / 2));

  sorted.forEach((entry, idx) => {
    if (idx < groupSize) {
      entry.group = 'Atas';
    } else if (idx >= n - groupSize) {
      entry.group = 'Bawah';
    } else {
      entry.group = 'Tengah';
    }
  });

  // Kembalikan sesuai urutan asli dengan atribut group yang sudah terisi, atau urutan ranking
  return sorted;
}

/**
 * Menghitung Analisis Butir Soal Statistik Empiris Lengkap (Classical Test Theory):
 * - Indeks Kesukaran (P)
 * - Daya Pembeda (D = PA - PB)
 * - Korelasi Point-Biserial (rpbi)
 * - Efektivitas Pengecoh (Distractor Analysis per opsi A-E)
 * - Reliabilitas Tes KR-20
 */
export function computeEmpiricalAnalysis(
  items: QuestionItem[],
  students: StudentResponse[],
  kkm = 75
): TestEmpiricalSummary {
  const n = students.length;
  const k = items.length;

  if (n === 0 || k === 0) {
    return {
      jumlahSiswa: n,
      jumlahButir: k,
      ukuranKelompokAtasBawah: 0,
      rataRataSkor: 0,
      rataRataBenar: 0,
      simpanganBakuSkor: 0,
      skorTertinggi: 0,
      skorTerendah: 0,
      reliabilitasKR20: 0,
      kategoriReliabilitas: 'Sangat Rendah',
      persentaseTuntasKKM: 0,
      jumlahButirDiterima: 0,
      jumlahButirRevisi: 0,
      jumlahButirDitolak: 0,
      butirStats: [],
    };
  }

  const ranked = scoreAndRankStudents(items, students);
  const upperGroup = ranked.filter((r) => r.group === 'Atas');
  const lowerGroup = ranked.filter((r) => r.group === 'Bawah');
  const middleGroup = ranked.filter((r) => r.group === 'Tengah');
  const groupSize = upperGroup.length || 1;

  // Statistik skor total (jumlah benar X_i dan nilai skala 100)
  const totalCorrects = ranked.map((r) => r.correctCount);
  const scores100 = ranked.map((r) => r.score100);

  const meanCorrect = totalCorrects.reduce((acc, v) => acc + v, 0) / n;
  const meanScore100 = scores100.reduce((acc, v) => acc + v, 0) / n;

  // Varians populasi skor benar (untuk rumus KR-20 dan rpbi)
  const varianceCorrect =
    totalCorrects.reduce((acc, x) => acc + Math.pow(x - meanCorrect, 2), 0) / n;
  const sdCorrect = Math.sqrt(varianceCorrect);

  const varianceScore100 =
    scores100.reduce((acc, x) => acc + Math.pow(x - meanScore100, 2), 0) / n;
  const sdScore100 = Math.sqrt(varianceScore100);

  const rTabel = getCriticalRTable05(n);

  let sumPQ = 0;
  let jumlahButirDiterima = 0;
  let jumlahButirRevisi = 0;
  let jumlahButirDitolak = 0;

  const butirStats: ItemEmpiricalStats[] = items.map((item) => {
    const benarList = ranked.filter((r) => r.student.jawaban[item.id] === item.kunciJawaban);
    const salahList = ranked.filter((r) => r.student.jawaban[item.id] !== item.kunciJawaban);

    const jumlahBenar = benarList.length;
    const p = jumlahBenar / n;
    const q = 1 - p;
    const pq = p * q;
    sumPQ += pq;

    const atasBenar = upperGroup.filter(
      (r) => r.student.jawaban[item.id] === item.kunciJawaban
    ).length;
    const bawahBenar = lowerGroup.filter(
      (r) => r.student.jawaban[item.id] === item.kunciJawaban
    ).length;

    const pA = atasBenar / groupSize;
    const pB = bawahBenar / (lowerGroup.length || 1);
    const dayaPembeda = pA - pB;

    // Korelasi Point-Biserial: rpbi = ((Mp - Mt) / SDt) * sqrt(p / q)
    let rpbi = 0;
    if (sdCorrect > 0 && p > 0 && q > 0 && benarList.length > 0 && salahList.length > 0) {
      const mp = benarList.reduce((acc, r) => acc + r.correctCount, 0) / benarList.length;
      rpbi = ((mp - meanCorrect) / sdCorrect) * Math.sqrt(p / q);
      rpbi = Math.max(-1, Math.min(1, rpbi));
    }

    const statusValiditas: ItemEmpiricalStats['statusValiditas'] =
      rpbi >= rTabel ? 'Valid' : 'Tidak Valid';

    // Analisis Efektivitas Pengecoh per opsi
    const pengecohTidakEfektif: OptionLabel[] = [];
    const distribusiOpsi: DistractorEmpiricalStat[] = item.opsi.map((opt) => {
      const pemilihAtas = upperGroup.filter(
        (r) => r.student.jawaban[item.id] === opt.label
      ).length;
      const pemilihBawah = lowerGroup.filter(
        (r) => r.student.jawaban[item.id] === opt.label
      ).length;
      const pemilihTengah = middleGroup.filter(
        (r) => r.student.jawaban[item.id] === opt.label
      ).length;
      const totalPemilih = pemilihAtas + pemilihBawah + pemilihTengah;
      const proporsiPemilih = totalPemilih / n;
      const indeksPengecoh = (pemilihBawah - pemilihAtas) / groupSize;

      let statusPengecoh: DistractorEmpiricalStat['statusPengecoh'] = 'Berfungsi Baik';
      if (opt.label === item.kunciJawaban || opt.isKey) {
        statusPengecoh = 'Kunci Jawaban';
      } else if (proporsiPemilih < 0.05) {
        statusPengecoh = 'Kurang Diminati (<5%)';
        pengecohTidakEfektif.push(opt.label);
      } else if (pemilihAtas > pemilihBawah && pemilihAtas >= 2) {
        statusPengecoh = 'Menyesatkan (Atas > Bawah)';
        pengecohTidakEfektif.push(opt.label);
      }

      return {
        label: opt.label,
        isKey: opt.label === item.kunciJawaban || opt.isKey,
        pemilihAtas,
        pemilihBawah,
        pemilihTengah,
        totalPemilih,
        proporsiPemilih: Number(proporsiPemilih.toFixed(3)),
        indeksPengecoh: Number(indeksPengecoh.toFixed(3)),
        statusPengecoh,
      };
    });

    const kategoriKesukaran = classifyDifficulty(p);
    const kategoriDayaPembeda = classifyDiscrimination(dayaPembeda);

    // Penentuan Keputusan & Diagnostik Butir Soal
    let statusKeputusan: ItemEmpiricalStats['statusKeputusan'] = 'Diterima (Ideal)';
    const notes: string[] = [];

    if (dayaPembeda < 0.15 || rpbi < 0.10) {
      statusKeputusan = 'Ditolak / Ganti Butir';
      jumlahButirDitolak += 1;
      if (dayaPembeda < 0) {
        notes.push(
          'Daya pembeda bernilai negatif (kelompok bawah lebih banyak menjawab benar dibanding kelompok atas). Periksa kembali kunci jawaban atau keambiguan pokok soal.'
        );
      } else {
        notes.push(
          'Daya pembeda sangat rendah sehingga butir soal tidak mampu membedakan siswa yang menguasai materi dan yang belum.'
        );
      }
    } else if (dayaPembeda < 0.30 || p < 0.20 || p > 0.85) {
      statusKeputusan = 'Revisi Pokok Soal';
      jumlahButirRevisi += 1;
      if (p > 0.85) {
        notes.push('Soal terlalu mudah (dijawab benar oleh >85% siswa); tingkatkan kompleksitas stimulus atau pengecoh.');
      } else if (p < 0.20) {
        notes.push('Soal terlalu sukar (dijawab benar oleh <20% siswa); perjelas petunjuk pada pokok soal.');
      } else {
        notes.push('Daya pembeda berada pada kategori cukup (0.20–0.29); pertajam rumusan pokok soal.');
      }
    } else if (pengecohTidakEfektif.length > 0) {
      statusKeputusan = 'Revisi Pengecoh';
      jumlahButirRevisi += 1;
      notes.push(
        `Daya pembeda dan tingkat kesukaran sudah baik, namun pengecoh [${pengecohTidakEfektif.join(
          ', '
        )}] belum berfungsi efektif (<5% pemilih atau mengecoh kelompok atas).`
      );
    } else {
      statusKeputusan = 'Diterima (Ideal)';
      jumlahButirDiterima += 1;
      notes.push(
        'Butir soal memenuhi seluruh kriteria psikometri: tingkat kesukaran proporsional, daya pembeda tinggi, valid secara empiris, dan seluruh pengecoh berfungsi efektif.'
      );
    }

    return {
      questionId: item.id,
      nomor: item.nomor,
      jumlahBenar,
      jumlahResponden: n,
      proporsiAtasBenar: Number(pA.toFixed(3)),
      proporsiBawahBenar: Number(pB.toFixed(3)),
      indeksKesukaran: Number(p.toFixed(3)),
      kategoriKesukaran,
      dayaPembeda: Number(dayaPembeda.toFixed(3)),
      kategoriDayaPembeda,
      korelasiPointBiserial: Number(rpbi.toFixed(3)),
      rTabelAlpha05: rTabel,
      statusValiditas,
      variansButir: Number(pq.toFixed(3)),
      distribusiOpsi,
      pengecohTidakEfektif,
      statusKeputusan,
      catatanDiagnostik: notes.join(' '),
    };
  });

  // Rumus Kuder-Richardson 20 (KR-20): r_11 = (k / (k - 1)) * (1 - (sum(p*q) / varianceCorrect))
  let kr20 = 0;
  if (k > 1 && varianceCorrect > 0) {
    kr20 = (k / (k - 1)) * (1 - sumPQ / varianceCorrect);
    kr20 = Math.max(0, Math.min(1, kr20));
  }

  const tuntasCount = scores100.filter((s) => s >= kkm).length;

  return {
    jumlahSiswa: n,
    jumlahButir: k,
    ukuranKelompokAtasBawah: groupSize,
    rataRataSkor: Number(meanScore100.toFixed(1)),
    rataRataBenar: Number(meanCorrect.toFixed(2)),
    simpanganBakuSkor: Number(sdScore100.toFixed(2)),
    skorTertinggi: Number(Math.max(...scores100).toFixed(1)),
    skorTerendah: Number(Math.min(...scores100).toFixed(1)),
    reliabilitasKR20: Number(kr20.toFixed(3)),
    kategoriReliabilitas: classifyReliability(kr20),
    persentaseTuntasKKM: Number(((tuntasCount / n) * 100).toFixed(1)),
    jumlahButirDiterima,
    jumlahButirRevisi,
    jumlahButirDitolak,
    butirStats,
  };
}

const INDONESIAN_STUDENT_NAMES = [
  'Aditya Pratama',
  'Aisyah Putri Ramadhani',
  'Bagas Satrio Wibowo',
  'Citra Kirana Maharani',
  'Daffa Rizky Maulana',
  'Dewi Sartika Ningrum',
  'Eka Putra Wijaya',
  'Farhan Akbar Hidayat',
  'Gita Nabila Azzahra',
  'Hafiz Rahman Hakim',
  'Indah Permata Sari',
  'Joko Susilo Nugroho',
  'Kartika Sari Dewi',
  'Lutfi Hakim Syahputra',
  'Maya Sofia Anggraini',
  'Nabilah Nur Azizah',
  'Oki Setiawan Putra',
  'Putri Ayu Lestari',
  'Qori Sandria Pratama',
  'Rafi Ahmad Fauzan',
  'Salsa Bila Кhairunnisa',
  'Taufik Hidayatullah',
  'Ulfa Rahmawati',
  'Vino Bastian Saputra',
  'Wulan Guritno Putri',
  'Yoga Pratama Kusuma',
  'Zahra Amalia Putri',
  'Arif Budiman Santoso',
  'Bunga Citra Lestari',
  'Chandra Wijaya Kusuma',
  'Dina Mariana Putri',
  'Erlangga Satria Yudha',
  'Fajar Sadboy Pratama',
  'Galih Ginanjar Putra',
  'Hana Saraswati Dewi',
  'Irfan Bachdim Putra',
  'Jessica Mila Agnesia',
  'Kevin Sanjaya Sukamuljo',
  'Lesti Kejora Putri',
  'Muhammad Rizky Billar',
];

/**
 * Generator Kohort Simulasi Siswa Realistis berbasis model psikometri IRT 2-Parameter (2PL)
 * sehingga menghasilkan variasi butir soal yang realistis (sebagian besar baik/valid,
 * namun ada 1-2 butir dengan pengecoh kurang diminati atau perlu direvisi untuk didemonstrasikan).
 */
export function generateRealisticCohortResponses(
  items: QuestionItem[],
  studentCount = 30,
  seedOffset = 0
): StudentResponse[] {
  // Pseudo-random deterministik ringan agar konsisten namun bervariasi saat tombol ditekan ulang
  let seed = 1337 + seedOffset * 97 + items.length * 31;
  const nextRand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const responses: StudentResponse[] = [];

  for (let i = 0; i < studentCount; i++) {
    // Kemampuan siswa theta_i terdistribusi dari tinggi (+2.0) ke rendah (-1.8)
    const normalizedRank = 1 - i / Math.max(1, studentCount - 1);
    const theta = (normalizedRank - 0.45) * 3.4 + (nextRand() - 0.5) * 0.6;

    const jawaban: Record<string, OptionLabel | ''> = {};

    items.forEach((item, qIdx) => {
      // Tingkat kesukaran parameter b_j berdasarkan level kognitif & estimasi awal
      let b = 0.0;
      if (item.estimasiKesukaranAwal === 'Mudah' || item.levelKognitif === 'L1') {
        b = -0.7;
      } else if (item.estimasiKesukaranAwal === 'Sukar' || item.levelKognitif === 'L3') {
        b = 0.45;
      }

      // Daya beda parameter a_j: buat hampir semua soal memiliki a tinggi (1.4 - 1.9),
      // kecuali soal terakhir jika jumlah soal >= 5 diberi daya beda agak rendah agar fitur "Revisi AI" bisa diuji
      const isWeakDemoItem = items.length >= 4 && qIdx === items.length - 1 && seedOffset === 0;
      const a = isWeakDemoItem ? 0.35 : 1.55;

      const probCorrect = 1 / (1 + Math.exp(-a * (theta - b)));
      const r = nextRand();

      if (r < probCorrect) {
        jawaban[item.id] = item.kunciJawaban;
      } else {
        // Pilih pengecoh
        const distractors = item.opsi.filter((o) => o.label !== item.kunciJawaban);
        if (distractors.length > 0) {
          // Pada soal ke-2 (qIdx === 1), buat pengecoh terakhir jarang dipilih agar terdeteksi "Revisi Pengecoh"
          if (qIdx === 1 && distractors.length >= 3 && seedOffset === 0) {
            const activeDistractors = distractors.slice(0, distractors.length - 1);
            const pickIdx = Math.floor(nextRand() * activeDistractors.length);
            jawaban[item.id] = activeDistractors[pickIdx].label;
          } else {
            const pickIdx = Math.floor(nextRand() * distractors.length);
            jawaban[item.id] = distractors[pickIdx].label;
          }
        } else {
          jawaban[item.id] = item.kunciJawaban;
        }
      }
    });

    const nama =
      INDONESIAN_STUDENT_NAMES[i % INDONESIAN_STUDENT_NAMES.length] +
      (i >= INDONESIAN_STUDENT_NAMES.length ? ` (${Math.floor(i / INDONESIAN_STUDENT_NAMES.length) + 1})` : '');

    responses.push({
      id: `resp-${i + 1}`,
      nis: `2026${String(101 + i).padStart(3, '0')}`,
      namaSiswa: nama,
      jawaban,
      waktuSelesaiDetik: 1200 + Math.floor(nextRand() * 900),
      sumberData: 'Simulasi Kohort',
    });
  }

  return responses;
}
