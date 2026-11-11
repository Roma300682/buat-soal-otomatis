/**
 * Generator cadangan deterministik berbasis kaidah Kurikulum Merdeka & Pusmendik
 * yang aktif secara otomatis apabila seluruh kuota harian Free Tier Gemini API (HTTP 429) habis.
 * Mampu mengekstrak konsep dari Materi Pokok & Ringkasan Materi pengguna untuk menyusun hingga 50 butir soal.
 */

export function buildFallbackCurriculum(params: {
  mataPelajaran?: string;
  jenjangFase?: string;
  kelasSemester?: string;
  materiPokok: string;
  ringkasanMateri?: string;
}) {
  const mapel = params.mataPelajaran || 'Akuntansi & Keuangan Lembaga';
  const fase = params.jenjangFase || 'Fase F (Kelas 11-12 SMA/SMK)';
  const topik = params.materiPokok.trim();

  const capaianPembelajaran = `Pada akhir ${fase}, peserta didik mampu memahami, menerapkan, dan menganalisis konsep serta prosedur siklus ${mapel} yang berkaitan dengan ${topik} secara sistematis, menyusun pencatatan dokumen transaksi hingga pelaporan sesuai Standar Akuntansi Keuangan (SAK), serta mengevaluasi ketepatan data keuangan untuk pengambilan keputusan.`;

  const tujuanPembelajaran = [
    `1. Menjelaskan konsep dasar, karakteristik, akun-akun terkait, dan aturan saldo normal pada materi ${topik}.`,
    `2. Menerapkan prosedur pencatatan transaksi, perhitungan matematis/keuangan, dan penjurnalan pada ${topik}.`,
    `3. Menganalisis kasus transaksi kompleks, jurnal penyesuaian, serta ikhtisar pelaporan keuangan yang melibatkan ${topik}.`,
    `4. Mengevaluasi dampak kesalahan pencatatan dan memvalidasi kewajaran penyajian informasi akuntansi terkait ${topik}.`,
  ].join('\n');

  const alurTujuanPembelajaran = [
    `ATP 1 (L1 - C1/C2): Mengidentifikasi definisi, dokumen sumber, dan klasifikasi akun dalam ${topik}.`,
    `ATP 2 (L2 - C3): Menghitung nilai transaksi dan menerapkan pencatatan jurnal/buku besar pada ${topik}.`,
    `ATP 3 (L3 - C4): Menganalisis data penyesuaian akhir periode dan rekonsiliasi data pada ${topik}.`,
    `ATP 4 (L3 - C5): Mengevaluasi ketepatan laporan keuangan dan dampak salah saji pada ${topik}.`,
  ].join('\n');

  const ringkasanMateri =
    params.ringkasanMateri && params.ringkasanMateri.trim().length > 20
      ? params.ringkasanMateri
      : `Materi ${topik} pada mata pelajaran ${mapel} (${fase}) mencakup empat pilar utama:\n1) Pemahaman konsep dasar, pengakuan awal, dokumen sumber transaksi, serta mekanisme Debit dan Kredit sesuai saldo normal akun.\n2) Perhitungan kuantitatif nilai transaksi, potongan, beban, atau harga pokok sesuai metode akuntansi yang berlaku.\n3) Pencatatan sistematis ke dalam jurnal, pemindahbukuan ke buku besar/kartu pembantu, serta penyusunan ayat jurnal penyesuaian pada akhir periode.\n4) Analisis dan evaluasi dampak transaksi terhadap Laporan Laba Rugi, Laporan Perubahan Ekuitas, dan Laporan Posisi Keuangan (Neraca).`;

  return {
    capaianPembelajaran,
    tujuanPembelajaran,
    alurTujuanPembelajaran,
    ringkasanMateri,
  };
}

export function buildFallbackQuestions(config: any, jumlahSoal: number, jumlahOpsi: 4 | 5) {
  const mapel = config.mataPelajaran || 'Akuntansi & Keuangan Lembaga';
  const topik = config.materiPokok || 'Siklus Akuntansi dan Pelaporan Keuangan';
  const rawSummary = String(config.ringkasanMateri || topik);

  // Ekstrak kalimat atau poin konsep dari ringkasan materi pengguna
  const concepts = rawSummary
    .split(/[\n.;]+/)
    .map((s) => s.replace(/^[0-9\-*•()\s]+/, '').trim())
    .filter((s) => s.length >= 18);

  if (concepts.length === 0) {
    concepts.push(
      `Pengakuan dan pengukuran transaksi pada ${topik} wajib didasarkan pada bukti transaksi yang sah dan aturan saldo normal akun`,
      `Perhitungan nilai bersih dan penyesuaian akhir periode pada ${topik} menentukan keakuratan laba bersih perusahaan`,
      `Penyajian akun-akun terkait ${topik} pada laporan keuangan harus mematuhi prinsip keseimbangan Aset = Liabilitas + Ekuitas`,
      `Evaluasi pengendalian internal dan koreksi kesalahan pencatatan pada ${topik} mencegah salah saji material pada laporan keuangan`
    );
  }

  const countL1 = Math.round((jumlahSoal * (Number(config.proporsiL1) || 20)) / 100);
  const countL2 = Math.round((jumlahSoal * (Number(config.proporsiL2) || 40)) / 100);

  const labels = jumlahOpsi === 4 ? (['A', 'B', 'C', 'D'] as const) : (['A', 'B', 'C', 'D', 'E'] as const);

  const scenarioTemplates = [
    {
      aspect: 'Prinsip Pengakuan & Klasifikasi Akun',
      stimulusType: 'Ilustrasi Bukti Transaksi & Kebijakan Akuntansi',
      makeQuestion: (no: number, concept: string, lvl: 'L1' | 'L2' | 'L3') => {
        const nominal = (12 + (no % 15) * 4) * 1_000_000;
        const nominalFmt = `Rp${nominal.toLocaleString('id-ID')},00`;
        return {
          materiSpesifik: `${topik} — Klasifikasi & Pengakuan Transaksi (#${no})`,
          bentukStimulus: 'Ilustrasi Dokumen Transaksi Operasional',
          indikatorSoal: `Disajikan ilustrasi dokumen transaksi senilai ${nominalFmt} terkait ${topik}, peserta didik dapat menentukan prinsip pengakuan akun dan mekanisme Debit-Kredit dengan tepat.`,
          stimulus: `Pada bulan berjalan tahun 2026, bagian akuntansi PT Nusantara Jaya memverifikasi dokumen bukti transaksi senilai ${nominalFmt} yang berkaitan dengan ${topik}. Dalam pedoman kebijakan akuntansi perusahaan, ditegaskan bahwa: "${concept}."`,
          pokokSoal: `Berdasarkan kaidah akuntansi pada materi ${topik}, perlakuan pencatatan dan pengaruh transaksi senilai ${nominalFmt} tersebut terhadap posisi akun yang paling tepat adalah ....`,
          correctText: `Mencatat sesuai substansi ekonomi transaksi sebesar ${nominalFmt} dengan menerapkan aturan saldo normal Debit dan Kredit secara berimbang serta melampirkan dokumen sumber yang sah`,
          distractors: [
            {
              teks: `Menunda pencatatan transaksi sebesar ${nominalFmt} hingga akhir tahun buku karena belum dilakukan pemeriksaan fisik kas`,
              rasional: 'Miskonsepsi basis kas vs basis akrual: transaksi harus diakui saat terjadinya peristiwa ekonomi.',
            },
            {
              teks: `Mencatat seluruh nilai ${nominalFmt} langsung sebagai pengurang Modal Pemilik tanpa melalui akun buku besar terkait`,
              rasional: 'Melanggar prosedur penjurnalan sistematis dan klasifikasi akun buku besar.',
            },
            {
              teks: `Membalik posisi saldo normal Debit dan Kredit untuk memperbesar nilai laba kotor pada periode berjalan`,
              rasional: 'Kekeliruan memahami mekanisme saldo normal akun yang menyebabkan neraca saldo tidak valid.',
            },
            {
              teks: `Mengabaikan nilai dokumen pendukung dan hanya mencatat setengah dari nilai transaksi (${ `Rp${(nominal / 2).toLocaleString('id-ID')},00` })`,
              rasional: 'Melanggar prinsip pengukuran biaya historis (historical cost) dan objektivitas bukti transaksi.',
            },
          ],
          pembahasan: `Sesuai standar akuntansi pada materi ${topik}, setiap transaksi yang didukung bukti sah senilai ${nominalFmt} harus dicatat secara kronologis dan sistematis mengikuti keseimbangan Debit dan Kredit (${concept}).`,
        };
      },
    },
    {
      aspect: 'Perhitungan Kuantitatif & Penjurnalan',
      stimulusType: 'Data Keuangan & Perhitungan Akuntansi',
      makeQuestion: (no: number, concept: string, _lvl: 'L1' | 'L2' | 'L3') => {
        const saldoAwal = (20 + (no % 10) * 5) * 1_000_000;
        const mutasiTambah = (35 + (no % 8) * 5) * 1_000_000;
        const pengurang = (8 + (no % 6) * 2) * 1_000_000;
        const hasilBersih = saldoAwal + mutasiTambah - pengurang;

        const fmt = (n: number) => `Rp${n.toLocaleString('id-ID')},00`;

        return {
          materiSpesifik: `${topik} — Perhitungan Nilai Bersih & Penjurnalan (#${no})`,
          bentukStimulus: 'Data Kuantitatif Mutasi Akun Periode Berjalan',
          indikatorSoal: `Disajikan data kuantitatif saldo awal, penambahan, dan pengurangan/penyesuaian pada materi ${topik}, peserta didik dapat menghitung nilai bersih yang disajikan pada laporan keuangan dengan tepat.`,
          stimulus: `Berikut adalah rekapitulasi data pembukuan CV Mitra Mandiri terkait pengelolaan ${topik} pada akhir periode akuntansi:\n• Saldo awal tercatat: ${fmt(saldoAwal)}\n• Mutasi penambahan/transaksi periode berjalan: ${fmt(mutasiTambah)}\n• Komponen pengurang / penyesuaian / retur / penyusutan: ${fmt(pengurang)}\nCatatan pedoman teknis: ${concept}.`,
          pokokSoal: `Berdasarkan data pembukuan CV Mitra Mandiri tersebut, nilai bersih setelah penyesuaian yang harus disajikan dalam pelaporan ${topik} adalah sebesar ....`,
          correctText: `${fmt(hasilBersih)} (diperoleh dari saldo awal ${fmt(saldoAwal)} ditambah mutasi ${fmt(mutasiTambah)} dikurangi penyesuaian ${fmt(pengurang)})`,
          distractors: [
            {
              teks: `${fmt(saldoAwal + mutasiTambah + pengurang)} (menambahkan komponen pengurang ke dalam saldo total)`,
              rasional: `Jebakan salah hitung: menjumlahkan komponen pengurang/retur/penyesuaian (${fmt(pengurang)}) yang seharusnya dikurangkan.`,
            },
            {
              teks: `${fmt(saldoAwal + mutasiTambah)} (tanpa memperhitungkan komponen pengurang/penyesuaian akhir periode)`,
              rasional: `Lupa mengurangkan komponen penyesuaian sebesar ${fmt(pengurang)}.`,
            },
            {
              teks: `${fmt(mutasiTambah - pengurang)} (mengabaikan saldo awal periode sebesar ${fmt(saldoAwal)})`,
              rasional: 'Hanya menghitung mutasi periode berjalan tanpa memasukkan saldo awal akun.',
            },
            {
              teks: `${fmt(saldoAwal - mutasiTambah + pengurang)} (membalikkan rumus penambahan dan pengurangan)`,
              rasional: 'Kekeliruan menerapkan rumus dasar mutasi saldo akun akuntansi.',
            },
          ],
          pembahasan: `Perhitungan sistematis:\nSaldo Awal = ${fmt(saldoAwal)}\n(+) Mutasi Penambahan = ${fmt(mutasiTambah)}\n(-) Komponen Pengurang/Penyesuaian = (${fmt(pengurang)})\nNilai Bersih Akhir = ${fmt(hasilBersih)}.`,
        };
      },
    },
    {
      aspect: 'Analisis Ayat Jurnal Penyesuaian & Kertas Kerja',
      stimulusType: 'Data Neraca Saldo vs Data Penyesuaian Akhir Periode',
      makeQuestion: (no: number, concept: string, _lvl: 'L1' | 'L2' | 'L3') => {
        const tercatat = (18 + (no % 9) * 3) * 1_000_000;
        const sisaAktual = (6 + (no % 5) * 2) * 1_000_000;
        const selisihPenyesuaian = tercatat - sisaAktual;
        const fmt = (n: number) => `Rp${n.toLocaleString('id-ID')},00`;

        return {
          materiSpesifik: `${topik} — Analisis Jurnal Penyesuaian Akhir Periode (#${no})`,
          bentukStimulus: 'Perbandingan Data Neraca Saldo dan Hasil Pemeriksaan Akhir Periode',
          indikatorSoal: `Disajikan perbandingan antara saldo akun pada Neraca Saldo dan hasil verifikasi fisik/aktual akhir periode terkait ${topik}, peserta didik dapat menganalisis Ayat Jurnal Penyesuaian dan saldo Neraca Saldo Disesuaikan dengan tepat.`,
          stimulus: `Pada Neraca Saldo per 31 Desember 2026, akun yang berkaitan dengan ${topik} menunjukkan nilai tercatat sebesar ${fmt(tercatat)}. Setelah dilakukan verifikasi fisik dan perhitungan akrual pada akhir periode berdasarkan prinsip "${concept}", diketahui bahwa nilai yang masih tersisa (belum terpakai/nilai buku akhir) adalah sebesar ${fmt(sisaAktual)}.`,
          pokokSoal: `Analisis penyesuaian akhir periode per 31 Desember 2026 yang tepat untuk mencatat perubahan nilai pada ${topik} tersebut adalah ....`,
          correctText: `Mencatat Ayat Jurnal Penyesuaian sebesar nilai yang telah terpakai/terealisasi yaitu ${fmt(selisihPenyesuaian)}, sehingga saldo akun pada Neraca Saldo Disesuaikan mencerminkan nilai aktual ${fmt(sisaAktual)}`,
          distractors: [
            {
              teks: `Mencatat Ayat Jurnal Penyesuaian sebesar ${fmt(sisaAktual)} sehingga saldo akun pada Neraca Saldo Disesuaikan menjadi ${fmt(selisihPenyesuaian)}`,
              rasional: `Jebakan klasik: menjurnal angka sisa akhir (${fmt(sisaAktual)}) sebagai beban penyesuaian, padahal yang harus dijurnal adalah bagian yang terpakai (${fmt(selisihPenyesuaian)}).`,
            },
            {
              teks: `Mencatat Ayat Jurnal Penyesuaian sebesar penjumlahan kedua nilai yaitu ${fmt(tercatat + sisaAktual)} pada sisi Debit dan Kredit`,
              rasional: 'Keliru menjumlahkan saldo Neraca Saldo dengan nilai sisa akhir periode.',
            },
            {
              teks: `Tidak membuat Ayat Jurnal Penyesuaian karena saldo di Neraca Saldo (${fmt(tercatat)}) tidak boleh diubah hingga tahun berikutnya`,
              rasional: 'Melanggar prinsip penandingan biaya dan pendapatan (matching principle) pada akuntansi berbasis akrual.',
            },
            {
              teks: `Menghapus seluruh saldo ${fmt(tercatat)} ke akun Kas di Bank tanpa melalui akun beban/ikhtisar penyesuaian`,
              rasional: 'Miskonsepsi: penyesuaian akhir periode merupakan transaksi internal non-kas sehingga tidak melibatkan akun Kas.',
            },
          ],
          pembahasan: `Nilai tercatat di Neraca Saldo = ${fmt(tercatat)}. Nilai sisa aktual akhir periode = ${fmt(sisaAktual)}. Maka nilai yang harus disesuaikan (terpakai/terealisasi) adalah ${fmt(tercatat)} - ${fmt(sisaAktual)} = ${fmt(selisihPenyesuaian)}, sehingga saldo di Neraca Saldo Disesuaikan tepat menunjukkan ${fmt(sisaAktual)}.`,
        };
      },
    },
    {
      aspect: 'Evaluasi Dampak Salah Saji terhadap Laporan Keuangan',
      stimulusType: 'Studi Kasus Audit Internal & Evaluasi Laporan Keuangan',
      makeQuestion: (no: number, concept: string, _lvl: 'L1' | 'L2' | 'L3') => {
        const nilaiSalahSaji = (15 + (no % 7) * 5) * 1_000_000;
        const fmt = (n: number) => `Rp${n.toLocaleString('id-ID')},00`;

        return {
          materiSpesifik: `${topik} — Evaluasi Dampak Salah Saji Laporan Keuangan (#${no})`,
          bentukStimulus: 'Kasus Temuan Pemeriksaan Laporan Keuangan (Audit Review)',
          indikatorSoal: `Disajikan kasus kelalaian pencatatan beban/penyesuaian terkait ${topik} pada akhir periode, peserta didik dapat mengevaluasi dampaknya terhadap Laba Bersih, Aset, Liabilitas, dan Ekuitas dengan tepat.`,
          stimulus: `Dalam penelaahan laporan keuangan akhir tahun PT Graha Akuntansi terkait ${topik} (mengacu pada ketentuan: "${concept}"), ditemukan bahwa beban/pengurangan nilai sebesar ${fmt(nilaiSalahSaji)} yang seharusnya diakui pada periode berjalan belum dicatat oleh staf pembukuan hingga laporan keuangan disusun.`,
          pokokSoal: `Apabila kelalaian pencatatan sebesar ${fmt(nilaiSalahSaji)} tersebut tidak dikoreksi, evaluasi dampak yang terjadi terhadap Laporan Laba Rugi dan Laporan Posisi Keuangan periode berjalan adalah ....`,
          correctText: `Total Beban disajikan terlalu rendah (understated) sebesar ${fmt(nilaiSalahSaji)}, sehingga Laba Bersih dan Ekuitas Akhir disajikan terlalu tinggi (overstated) sebesar ${fmt(nilaiSalahSaji)}`,
          distractors: [
            {
              teks: `Total Beban disajikan terlalu tinggi (overstated) sebesar ${fmt(nilaiSalahSaji)}, sehingga Laba Bersih dan Ekuitas Akhir menjadi terlalu rendah (understated) sebesar ${fmt(nilaiSalahSaji)}`,
              rasional: 'Membalikkan efek belum dicatatnya beban: jika beban belum dicatat, total beban justru terlalu rendah, bukan terlalu tinggi.',
            },
            {
              teks: `Laba Bersih terlalu rendah (understated) sebesar ${fmt(nilaiSalahSaji)}, sedangkan Ekuitas Akhir terlalu tinggi (overstated) sebesar ${fmt(nilaiSalahSaji)}`,
              rasional: 'Tidak memahami hubungan langsung antara Laba Bersih di Laporan Laba Rugi dengan kenaikan Ekuitas Akhir di Neraca.',
            },
            {
              teks: `Laporan Laba Rugi dan Laporan Posisi Keuangan tetap wajar karena transaksi senilai ${fmt(nilaiSalahSaji)} bukan merupakan transaksi pengeluaran kas tunai`,
              rasional: 'Mengabaikan pengaruh pos akrual/penyesuaian terhadap kewajaran laba bersih dan posisi keuangan.',
            },
            {
              teks: `Saldo Kas di Bank pada Laporan Posisi Keuangan menjadi terlalu tinggi (overstated) sebesar dua kali lipat yaitu ${fmt(nilaiSalahSaji * 2)}`,
              rasional: 'Mencampuradukkan kesalahan penyesuaian beban akrual dengan saldo fisik akun Kas di Bank.',
            },
          ],
          pembahasan: `Ketika suatu beban atau pengurangan nilai sebesar ${fmt(nilaiSalahSaji)} belum dicatat, maka Total Beban pada Laporan Laba Rugi menjadi terlalu rendah (understated) sebesar ${fmt(nilaiSalahSaji)}. Akibatnya, Laba Bersih menjadi terlalu tinggi (overstated) sebesar ${fmt(nilaiSalahSaji)}, yang selanjutnya menyebabkan Ekuitas Akhir pada Laporan Posisi Keuangan juga overstated sebesar ${fmt(nilaiSalahSaji)}.`,
        };
      },
    },
  ];

  const derived = buildFallbackCurriculum({
    mataPelajaran: mapel,
    jenjangFase: config.jenjangFase,
    kelasSemester: config.kelasSemester,
    materiPokok: topik,
    ringkasanMateri: rawSummary,
  });

  const items = [];

  for (let i = 0; i < jumlahSoal; i++) {
    const nomor = i + 1;
    let levelKognitif: 'L1' | 'L2' | 'L3' = 'L3';
    let dimensiBloom = 'C4 - Menganalisis';
    let estimasiKesukaranAwal: 'Mudah' | 'Sedang' | 'Sukar' = 'Sukar';

    if (i < countL1) {
      levelKognitif = 'L1';
      dimensiBloom = i % 2 === 0 ? 'C1 - Mengingat' : 'C2 - Memahami';
      estimasiKesukaranAwal = 'Mudah';
    } else if (i < countL1 + countL2) {
      levelKognitif = 'L2';
      dimensiBloom = 'C3 - Menerapkan';
      estimasiKesukaranAwal = 'Sedang';
    } else {
      levelKognitif = 'L3';
      dimensiBloom = i % 2 === 0 ? 'C4 - Menganalisis' : 'C5 - Mengevaluasi';
      estimasiKesukaranAwal = 'Sukar';
    }

    const concept = concepts[i % concepts.length];
    const tplIdx =
      levelKognitif === 'L1'
        ? 0
        : levelKognitif === 'L2'
        ? i % 2 === 0
          ? 1
          : 2
        : i % 2 === 0
        ? 2
        : 3;
    const tpl = scenarioTemplates[tplIdx];
    const generated = tpl.makeQuestion(nomor, concept, levelKognitif);

    // Rotasi kunci jawaban secara merata di antara A, B, C, D, (E)
    const keyIdx = (i * 2 + 1) % labels.length;
    const kunciJawaban = labels[keyIdx];

    let distCursor = 0;
    const opsi = labels.map((lbl, idx) => {
      if (idx === keyIdx) {
        return {
          label: lbl,
          teks: generated.correctText,
          isKey: true,
          rasionalPengecoh: `Kunci Jawaban Benar: Sesuai dengan kaidah akuntansi dan perhitungan sistematis pada materi ${topik}.`,
        };
      } else {
        const d = generated.distractors[distCursor % generated.distractors.length];
        distCursor += 1;
        return {
          label: lbl,
          teks: d.teks,
          isKey: false,
          rasionalPengecoh: d.rasional,
        };
      }
    });

    items.push({
      nomor,
      cpRef: config.capaianPembelajaran || derived.capaianPembelajaran,
      tpRef:
        levelKognitif === 'L1'
          ? `TP 1: Memahami konsep dan klasifikasi akun pada ${topik}`
          : levelKognitif === 'L2'
          ? `TP 2: Menerapkan perhitungan dan penjurnalan transaksi pada ${topik}`
          : `TP 3: Menganalisis penyesuaian dan mengevaluasi pelaporan keuangan pada ${topik}`,
      atpRef: `ATP.${nomor}: ${tpl.aspect} (${levelKognitif} - ${dimensiBloom})`,
      materiSpesifik: generated.materiSpesifik,
      bentukStimulus: generated.bentukStimulus,
      indikatorSoal: generated.indikatorSoal,
      levelKognitif,
      dimensiBloom,
      stimulus: generated.stimulus,
      pokokSoal: generated.pokokSoal,
      kunciJawaban,
      pembahasan: generated.pembahasan,
      estimasiKesukaranAwal,
      opsi,
    });
  }

  return {
    derivedCP: config.capaianPembelajaran || derived.capaianPembelajaran,
    derivedTP: config.tujuanPembelajaran || derived.tujuanPembelajaran,
    derivedATP: config.alurTujuanPembelajaran || derived.alurTujuanPembelajaran,
    items,
  };
}
