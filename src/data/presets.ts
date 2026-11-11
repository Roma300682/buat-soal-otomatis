import { CurriculumConfig, QuestionItem } from '../types/assessment';

export interface PresetMaterial {
  id: string;
  judulPreset: string;
  kategori: string;
  config: CurriculumConfig;
  sampleItems: QuestionItem[];
}

export const PRESET_MATERIALS: PresetMaterial[] = [
  {
    id: 'akuntansi-perusahaan-dagang',
    judulPreset: 'Akuntansi Perusahaan Dagang, HPP & Penyesuaian (Fase F / Kelas XI)',
    kategori: 'Akuntansi & Keuangan Lembaga',
    config: {
      namaSekolah: 'SMK Negeri 1 Akuntansi & Keuangan',
      mataPelajaran: 'Praktikum Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
      jenjangFase: 'Fase F (Kelas 11-12 SMA/SMK)',
      kelasSemester: 'XI AKL / Ganjil',
      tahunAjaran: '2026/2027',
      penyusun: 'Tim MGMP Akuntansi & Keuangan Lembaga',
      materiPokok:
        'Siklus Akuntansi Perusahaan Dagang: Jurnal Khusus, Syarat Pembayaran, Perhitungan Harga Pokok Penjualan (HPP), dan Jurnal Penyesuaian Persediaan',
      ringkasanMateri: `1. Karakteristik Perusahaan Dagang & Syarat Pembayaran:
Perusahaan dagang membeli barang untuk dijual kembali tanpa mengubah bentuk. Transaksi dicatat menggunakan Jurnal Khusus: Jurnal Pembelian (pembelian kredit), Jurnal Pengeluaran Kas (pembayaran utang/tunai), Jurnal Penjualan (penjualan kredit), Jurnal Penerimaan Kas (pelunasan piutang/tunai), dan Jurnal Umum (retur pembelian/penjualan kredit).
Syarat pembayaran kredit meliputi: 2/10, n/30 (potongan 2% jika dilunasi dalam 10 hari sejak tanggal faktur, jatuh tempo 30 hari), EOM (End of Month), dan syarat penyerahan barang FOB Shipping Point (ongkos angkut ditanggung pembeli, menjadi Beban Angkut Pembelian / Freight-In) serta FOB Destination Point (ongkos angkut ditanggung penjual, menjadi Beban Angkut Penjualan / Freight-Out).

2. Sistem Pencatatan Persediaan (Periodik/Fisik vs Perpetual):
- Sistem Periodik (Fisik): Pembelian dicatat pada akun Pembelian; HPP baru dihitung di akhir periode setelah perhitungan fisik (stock opname).
- Sistem Perpetual: Setiap pembelian dan penjualan langsung memutakhirkan akun Persediaan Barang Dagang dan Harga Pokok Penjualan (HPP) secara terus-menerus.

3. Rumus Harga Pokok Penjualan (HPP / Cost of Goods Sold):
- Pembelian Bersih = (Pembelian + Beban Angkut Pembelian) - (Retur Pembelian + Potongan Pembelian)
- Barang Tersedia untuk Dijual (BTUD) = Persediaan Barang Dagang Awal + Pembelian Bersih
- Harga Pokok Penjualan (HPP) = BTUD - Persediaan Barang Dagang Akhir
- Laba Kotor (Gross Profit) = Penjualan Bersih - HPP

4. Jurnal Penyesuaian Persediaan Barang Dagang Akhir Periode (Metode Periodik):
- Pendekatan Ikhtisar Laba Rugi:
  (1) Menutup persediaan awal: (D) Ikhtisar Laba Rugi, (K) Persediaan Barang Dagang (Awal)
  (2) Mencatat persediaan akhir: (D) Persediaan Barang Dagang (Akhir), (K) Ikhtisar Laba Rugi
- Pendekatan Harga Pokok Penjualan (HPP):
  Menutup Persediaan Awal, Pembelian, dan Beban Angkut Pembelian ke sisi Debit HPP; serta menutup Persediaan Akhir, Retur Pembelian, dan Potongan Pembelian ke sisi Kredit HPP.`,
      capaianPembelajaran:
        'Pada akhir Fase F, peserta didik mampu menganalisis dokumen sumber dan dokumen pendukung pada perusahaan dagang, menerapkan pencatatan transaksi ke dalam jurnal khusus dan buku besar pembantu, menghitung Harga Pokok Penjualan (HPP), menyusun ayat jurnal penyesuaian, serta menyajikan laporan keuangan sesuai Standar Akuntansi Keuangan (SAK).',
      tujuanPembelajaran:
        '1. Mengidentifikasi syarat penyerahan barang (FOB) dan syarat pembayaran kredit (2/10, n/30) dalam pencatatan jurnal khusus.\n2. Menerapkan pencatatan transaksi pelunasan utang dan piutang dagang pada masa potongan ke dalam Jurnal Pengeluaran Kas dan Jurnal Penerimaan Kas.\n3. Menghitung nilai Pembelian Bersih, Barang Tersedia untuk Dijual (BTUD), Harga Pokok Penjualan (HPP), dan Laba Kotor dari data neraca saldo.\n4. Menganalisis ayat jurnal penyesuaian persediaan barang dagang dengan pendekatan Ikhtisar Laba Rugi dan pendekatan HPP serta mengevaluasi dampaknya terhadap Laporan Keuangan.',
      alurTujuanPembelajaran:
        'ATP 11.1: Membedakan pencatatan syarat FOB Shipping Point dan FOB Destination serta mekanisme jurnal khusus perusahaan dagang (L1 - C2).\nATP 11.2: Menghitung potongan tunai dan pelunasan faktur bersyarat 2/10, n/30 setelah dikurangi retur (L2 - C3).\nATP 11.3: Menerapkan rumus perhitungan Harga Pokok Penjualan (HPP) dan Laba Kotor pada data keuangan perusahaan dagang (L2 - C3).\nATP 11.4: Menganalisis jurnal penyesuaian persediaan barang dagang (pendekatan Ikhtisar L/R & HPP) serta mengevaluasi pengaruh kesalahan perhitungan persediaan akhir terhadap laba bersih (L3 - C4/C5).',
      jumlahSoal: 5,
      jumlahOpsi: 5,
      proporsiL1: 20,
      proporsiL2: 40,
      proporsiL3: 40,
      waktuUjianMenit: 35,
      kkm: 75,
    },
    sampleItems: [
      {
        id: 'akt-dagang-1',
        nomor: 1,
        cpRef: 'Memahami dokumen sumber, syarat penyerahan barang, dan pencatatan jurnal khusus perusahaan dagang.',
        tpRef: 'TP 1: Mengidentifikasi syarat penyerahan barang (FOB) dan syarat pembayaran kredit dalam jurnal khusus.',
        atpRef: 'ATP 11.1: Membedakan pencatatan syarat FOB Shipping Point dan FOB Destination (L1 - C2).',
        materiSpesifik: 'Syarat Penyerahan Barang (FOB Shipping Point vs FOB Destination)',
        bentukStimulus: 'Ilustrasi Dokumen Transaksi Faktur Pembelian',
        indikatorSoal:
          'Disajikan ilustrasi transaksi pembelian barang dagang secara kredit dengan syarat penyerahan FOB Shipping Point, peserta didik dapat menentukan pihak yang menanggung biaya angkut dan akun pencatatannya pada pembukuan pembeli dengan tepat.',
        levelKognitif: 'L1',
        dimensiBloom: 'C2 - Memahami',
        stimulus:
          'Pada tanggal 5 Oktober 2026, PD Nusantara Jaya (Jakarta) membeli barang dagang secara kredit dari PT Tekstil Makmur (Bandung) senilai Rp25.000.000,00 dengan syarat pembayaran 2/10, n/30 dan syarat penyerahan barang FOB (Free on Board) Shipping Point. Biaya pengiriman barang dari gudang penjual di Bandung hingga gudang pembeli di Jakarta sebesar Rp750.000,00 dibayar tunai.',
        pokokSoal:
          'Berdasarkan syarat penyerahan FOB Shipping Point tersebut, pernyataan yang tepat mengenai peralihan hak milik barang dan pencatatan biaya angkut pada pembukuan PD Nusantara Jaya (pembeli) adalah ....',
        kunciJawaban: 'B',
        pembahasan:
          'Pada syarat FOB Shipping Point (prangko gudang penjual), hak milik dan risiko atas barang beralih kepada pembeli sejak barang keluar dari gudang penjual dan dimuat ke perusahaan ekspedisi. Oleh karena itu, biaya pengiriman Rp750.000,00 menjadi tanggungan pembeli (PD Nusantara Jaya) dan dicatat di sisi Debit pada akun Beban Angkut Pembelian (Freight-In) yang nantinya menambah nilai Pembelian Bersih dalam perhitungan HPP.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: 'Hak milik barang beralih di gudang pembeli; biaya angkut ditanggung penjual dan dicatat sebagai Beban Angkut Penjualan',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi yang tertukar dengan definisi FOB Destination Point (prangko gudang pembeli).',
          },
          {
            label: 'B',
            teks: 'Hak milik barang beralih sejak barang keluar dari gudang penjual; biaya angkut ditanggung pembeli dan dicatat sebagai Beban Angkut Pembelian',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: FOB Shipping Point mengalihkan kepemilikan di titik pengiriman (gudang penjual) sehingga ongkos angkut menjadi Beban Angkut Pembelian bagi pembeli.',
          },
          {
            label: 'C',
            teks: 'Hak milik barang baru beralih setelah faktur dilunasi dalam 10 hari; biaya angkut dicatat sebagai pengurang Utang Dagang',
            isKey: false,
            rasionalPengecoh:
              'Mencampuradukkan syarat penyerahan barang (FOB) dengan syarat potongan pembayaran kredit (2/10, n/30).',
          },
          {
            label: 'D',
            teks: 'Biaya angkut Rp750.000,00 dicatat oleh pembeli pada akun Retur dan Potongan Pembelian di sisi Kredit',
            isKey: false,
            rasionalPengecoh:
              'Kekeliruan memahami sifat beban angkut pembelian yang menambah harga pokok pembelian, bukan mengurangi.',
          },
          {
            label: 'E',
            teks: 'Biaya angkut ditanggung bersama 50% oleh penjual dan 50% oleh pembeli serta dicatat pada Jurnal Pembelian',
            isKey: false,
            rasionalPengecoh:
              'Penalaran tidak berdasar standar akuntansi untuk termin FOB Shipping Point.',
          },
        ],
      },
      {
        id: 'akt-dagang-2',
        nomor: 2,
        cpRef: 'Menerapkan pencatatan transaksi pelunasan piutang/utang bersyarat ke dalam jurnal khusus.',
        tpRef: 'TP 2: Menerapkan pencatatan transaksi pelunasan utang dagang pada masa potongan setelah retur.',
        atpRef: 'ATP 11.2: Menghitung potongan pembelian dan kas yang dikeluarkan pada termin 2/10, n/30 (L2 - C3).',
        materiSpesifik: 'Perhitungan Potongan Pembelian (Termin 2/10, n/30) dan Jurnal Pengeluaran Kas',
        bentukStimulus: 'Kronologi Transaksi Pembelian Kredit, Retur, dan Pelunasan',
        indikatorSoal:
          'Disajikan kronologi transaksi pembelian barang dagang secara kredit dengan syarat 2/10, n/30 disertai transaksi retur pembelian sebelum pelunasan, peserta didik dapat menentukan ayat jurnal pada Jurnal Pengeluaran Kas saat pelunasan dalam masa potongan dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Berikut adalah transaksi UD Sinar Abadi (sistem periodik) dengan pemasok PT Indofood Makmur selama bulan November 2026:\n• 4 Nov 2026: Membeli barang dagang secara kredit Rp18.000.000,00 dengan syarat 2/10, n/30 (Faktur No. F-108).\n• 6 Nov 2026: Mengembalikan sebagian barang yang rusak (Nota Debit No. ND-12) senilai Rp3.000.000,00.\n• 13 Nov 2026: Melunasi seluruh sisa utang atas Faktur No. F-108 melalui Bukti Kas Keluar No. BKK-45.',
        pokokSoal:
          'Pencatatan yang tepat pada Jurnal Pengeluaran Kas UD Sinar Abadi untuk transaksi pelunasan tanggal 13 November 2026 adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          'Sisa utang dagang setelah retur = Rp18.000.000 - Rp3.000.000 = Rp15.000.000.\nKarena pelunasan dilakukan pada tanggal 13 Nov (9 hari sejak tanggal 4 Nov, masih dalam periode potongan 10 hari), UD Sinar Abadi memperoleh Potongan Pembelian sebesar 2% × Rp15.000.000 = Rp300.000.\nJumlah kas yang dibayarkan = Rp15.000.000 - Rp300.000 = Rp14.700.000.\nAyat jurnal pada Jurnal Pengeluaran Kas: (Debit) Utang Dagang Rp15.000.000; (Kredit) Kas Rp14.700.000; (Kredit) Potongan Pembelian Rp300.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'Debit Utang Dagang Rp18.000.000; Kredit Kas Rp17.640.000; Kredit Potongan Pembelian Rp360.000',
            isKey: false,
            rasionalPengecoh:
              'Lupa mengurangkan nilai Retur Pembelian Rp3.000.000 sebelum menghitung saldo utang dan potongan 2%.',
          },
          {
            label: 'B',
            teks: 'Debit Utang Dagang Rp15.000.000; Kredit Kas Rp14.640.000; Kredit Potongan Pembelian Rp360.000',
            isKey: false,
            rasionalPengecoh:
              'Menghitung potongan 2% dari nilai pembelian awal Rp18.000.000 (Rp360.000) padahal sebagian barang sudah diretur.',
          },
          {
            label: 'C',
            teks: 'Debit Utang Dagang Rp15.000.000; Kredit Kas Rp14.700.000; Kredit Potongan Pembelian Rp300.000',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Sisa utang Rp15.000.000 dikurangi potongan 2% (Rp300.000) sehingga kas keluar Rp14.700.000.',
          },
          {
            label: 'D',
            teks: 'Debit Utang Dagang Rp14.700.000; Debit Potongan Pembelian Rp300.000; Kredit Kas Rp15.000.000',
            isKey: false,
            rasionalPengecoh:
              'Keliru menempatkan posisi saldo normal Potongan Pembelian di sisi Debit dan nilai Kas yang dibayar.',
          },
          {
            label: 'E',
            teks: 'DebitUtang Dagang Rp15.000.000; Kredit Kas Rp15.000.000 (tanpa potongan karena melewati batas 10 hari)',
            isKey: false,
            rasionalPengecoh:
              'Salah menghitung selisih hari (4 Nov ke 13 Nov adalah 9 hari, masih berhak atas potongan 2/10).',
          },
        ],
      },
      {
        id: 'akt-dagang-3',
        nomor: 3,
        cpRef: 'Menghitung Harga Pokok Penjualan (HPP) dan menyajikan unsur Laporan Laba Rugi perusahaan dagang.',
        tpRef: 'TP 3: Menghitung nilai Pembelian Bersih, BTUD, HPP, dan Laba Kotor dari data neraca saldo.',
        atpRef: 'ATP 11.3: Menerapkan rumus perhitungan Harga Pokok Penjualan (HPP) pada data keuangan (L2 - C3).',
        materiSpesifik: 'Perhitungan Harga Pokok Penjualan (HPP) dan Laba Kotor',
        bentukStimulus: 'Tabel Sebagian Akun Neraca Saldo Disesuaikan PD Mitra Niaga',
        indikatorSoal:
          'Disajikan data saldo akun-akun persediaan, pembelian, penjualan, dan beban operasional suatu perusahaan dagang, peserta didik dapat menghitung besaran Harga Pokok Penjualan (HPP) dan Laba Kotor secara akurat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Berikut adalah kutipan data pembukuan PD Mitra Niaga per 31 Desember 2026:\n• Persediaan Barang Dagang (1 Januari 2026): Rp42.000.000,00\n• Penjualan Kotor: Rp215.000.000,00\n• Retur Penjualan & Potongan Penjualan: Rp15.000.000,00\n• Pembelian: Rp130.000.000,00\n• Beban Angkut Pembelian: Rp6.000.000,00\n• Beban Angkut Penjualan: Rp4.500.000,00\n• Retur Pembelian & Potongan Pembelian: Rp11.000.000,00\n• Persediaan Barang Dagang (31 Desember 2026): Rp37.000.000,00',
        pokokSoal:
          'Berdasarkan data keuangan PD Mitra Niaga di atas, besarnya Harga Pokok Penjualan (HPP) dan Laba Kotor (Gross Profit) tahun 2026 berturut-turut adalah ....',
        kunciJawaban: 'A',
        pembahasan:
          '1. Penjualan Bersih = Rp215.000.000 - Rp15.000.000 = Rp200.000.000.\n2. Pembelian Bersih = (Rp130.000.000 + Rp6.000.000) - Rp11.000.000 = Rp125.000.000 (Catatan: Beban Angkut Penjualan Rp4.500.000 adalah beban operasional penjualan, BUKAN komponen HPP).\n3. Barang Tersedia untuk Dijual (BTUD) = Rp42.000.000 + Rp125.000.000 = Rp167.000.000.\n4. Harga Pokok Penjualan (HPP) = Rp167.000.000 - Rp37.000.000 = Rp130.000.000.\n5. Laba Kotor = Penjualan Bersih - HPP = Rp200.000.000 - Rp130.000.000 = Rp70.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'HPP sebesar Rp130.000.000,00 dan Laba Kotor sebesar Rp70.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Pembelian bersih Rp125 juta + Persediaan awal Rp42 juta - Persediaan akhir Rp37 juta = HPP Rp130 juta; Laba Kotor = Rp200 juta - Rp130 juta = Rp70 juta.',
          },
          {
            label: 'B',
            teks: 'HPP sebesar Rp134.500.000,00 dan Laba Kotor sebesar Rp65.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan miskonsepsi memasukkan Beban Angkut Penjualan (Rp4.500.000) ke dalam perhitungan HPP.',
          },
          {
            label: 'C',
            teks: 'HPP sebesar Rp120.000.000,00 dan Laba Kotor sebesar Rp80.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru membalik Persediaan Awal (dikurangkan) dan Persediaan Akhir (ditambahkan) pada rumus HPP.',
          },
          {
            label: 'D',
            teks: 'HPP sebesar Rp130.000.000,00 dan Laba Kotor sebesar Rp85.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menghitung Laba Kotor langsung dari Penjualan Kotor (Rp215 juta) tanpa mengurangkan Retur & Potongan Penjualan (Rp15 juta).',
          },
          {
            label: 'E',
            teks: 'HPP sebesar Rp167.000.000,00 dan Laba Kotor sebesar Rp33.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menganggap nilai Barang Tersedia untuk Dijual (BTUD Rp167 juta) sebagai HPP tanpa dikurangi Persediaan Akhir.',
          },
        ],
      },
      {
        id: 'akt-dagang-4',
        nomor: 4,
        cpRef: 'Menyusun ayat jurnal penyesuaian dan kertas kerja (worksheet) perusahaan dagang.',
        tpRef: 'TP 4: Menganalisis ayat jurnal penyesuaian persediaan barang dagang dengan pendekatan Ikhtisar Laba Rugi.',
        atpRef: 'ATP 11.4: Menganalisis penyusunan jurnal penyesuaian persediaan dan mutasi Kertas Kerja (L3 - C4).',
        materiSpesifik: 'Jurnal Penyesuaian Persediaan Barang Dagang (Pendekatan Ikhtisar Laba Rugi)',
        bentukStimulus: 'Data Neraca Saldo dan Hasil Stock Opname Gudang Akhir Tahun',
        indikatorSoal:
          'Disajikan saldo akun Persediaan Barang Dagang di Neraca Saldo per 31 Desember dan nilai hasil perhitungan fisik (stock opname) akhir periode, peserta didik dapat menganalisis pasangan Ayat Jurnal Penyesuaian pendekatan Ikhtisar Laba Rugi beserta saldo bersih akun Ikhtisar Laba Rugi di Kertas Kerja dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'Pada Neraca Saldo PT Cahaya Niaga per 31 Desember 2026, akun Persediaan Barang Dagang menunjukkan saldo Debit sebesar Rp58.000.000,00. Berdasarkan berita acara perhitungan fisik (stock opname) di gudang pada tanggal 31 Desember 2026 sore, nilai barang dagang yang masih tersedia dan layak jual adalah sebesar Rp64.500.000,00. Perusahaan menyusun jurnal penyesuaian menggunakan pendekatan Ikhtisar Laba Rugi.',
        pokokSoal:
          'Analisis pencatatan Ayat Jurnal Penyesuaian (AJP) per 31 Desember 2026 dan penyajiannya pada kolom Penyesuaian di Kertas Kerja (Worksheet) yang tepat adalah ....',
        kunciJawaban: 'D',
        pembahasan:
          'Dalam pendekatan Ikhtisar Laba Rugi, dibuat dua jurnal penyesuaian:\n1) Menutup Persediaan Awal: (D) Ikhtisar Laba Rugi Rp58.000.000 | (K) Persediaan Barang Dagang Rp58.000.000.\n2) Mencatat Persediaan Akhir: (D) Persediaan Barang Dagang Rp64.500.000 | (K) Ikhtisar Laba Rugi Rp64.500.000.\nPada Kertas Kerja, baris akun Ikhtisar Laba Rugi ditulis secara utuh (tidak diselisihkan) yaitu Debit Rp58.000.000 dan Kredit Rp64.500.000, sedangkan saldo Persediaan Barang Dagang di kolom Neraca Saldo Disesuaikan menjadi Debit Rp64.500.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Mendebit Persediaan Barang Dagang Rp58.000.000 dan mengkredit Ikhtisar Laba Rugi Rp58.000.000 untuk menghapus persediaan awal',
            isKey: false,
            rasionalPengecoh:
              'Terbalik: untuk menghapus saldo awal Persediaan Barang Dagang (yang bersaldo normal Debit), akun Persediaan harus dikredit, bukan didebit.',
          },
          {
            label: 'B',
            teks: 'Hanya mencatat satu jurnal selisih kenaikan persediaan sebesar Rp6.500.000 pada Debit Ikhtisar Laba Rugi dan Kredit Persediaan Barang Dagang',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi mencampuradukkan penyesuaian persediaan metode periodik dengan koreksi selisih metode perpetual.',
          },
          {
            label: 'C',
            teks: 'Mendebit Harga Pokok Penjualan Rp64.500.000 dan mengkredit Persediaan Barang Dagang Rp64.500.000 untuk memunculkan persediaan akhir',
            isKey: false,
            rasionalPengecoh:
              'Mencampuradukkan pendekatan Ikhtisar Laba Rugi dengan pendekatan HPP serta terbalik posisi debit/kredit persediaan akhir.',
          },
          {
            label: 'D',
            teks: 'Mendebit Ikhtisar Laba Rugi Rp58.000.000 (Kredit Persediaan Awal Rp58.000.000) serta mendebit Persediaan Akhir Rp64.500.000 (Kredit Ikhtisar Laba Rugi Rp64.500.000)',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Sesuai standar AJP pendekatan Ikhtisar Laba Rugi (menutup persediaan awal di kredit dan memunculkan persediaan akhir di debit).',
          },
          {
            label: 'E',
            teks: 'Pada kolom Neraca Saldo Disesuaikan, saldo akun Persediaan Barang Dagang disajikan sebesar Rp122.500.000 (penjumlahan saldo awal dan akhir)',
            isKey: false,
            rasionalPengecoh:
              'Keliru menjumlahkan persediaan awal dan akhir; padahal persediaan awal Rp58 juta sudah dikredit (nol) sehingga hanya tersisa persediaan akhir Rp64,5 juta.',
          },
        ],
      },
      {
        id: 'akt-dagang-5',
        nomor: 5,
        cpRef: 'Mengevaluasi kewajaran penyajian laporan keuangan perusahaan dagang sesuai SAK.',
        tpRef: 'TP 4: Mengevaluasi dampak kesalahan pencatatan persediaan akhir terhadap HPP, Laba Bersih, dan Ekuitas.',
        atpRef: 'ATP 11.4: Mengevaluasi pengaruh salah saji (overstatement/understatement) persediaan akhir terhadap Laporan Keuangan (L3 - C5).',
        materiSpesifik: 'Evaluasi Dampak Kesalahan Perhitungan Persediaan Akhir (Inventory Error Analysis)',
        bentukStimulus: 'Kasus Temuan Audit Internal atas Salah Saji Stock Opname Akhir Tahun',
        indikatorSoal:
          'Disajikan kasus kesalahan penghitungan fisik persediaan barang dagang akhir tahun yang tercatat terlalu tinggi (overstated), peserta didik dapat mengevaluasi dampak sistematis kesalahan tersebut terhadap Harga Pokok Penjualan, Laba Bersih, dan Laporan Posisi Keuangan tahun berjalan dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C5 - Mengevaluasi',
        stimulus:
          'Saat melakukan pemeriksaan laporan keuangan PT Semesta Ritel untuk tahun buku yang berakhir 31 Desember 2026, auditor internal menemukan bahwa sekelompok barang titipan (konsinyasi masuk / consignment-in) milik pemasok senilai Rp18.000.000,00 ikut dihitung dan dimasukkan sebagai milik perusahaan dalam nilai Persediaan Barang Dagang Akhir per 31 Desember 2026. Akibatnya, nilai Persediaan Akhir tahun 2026 disajikan terlalu tinggi (overstated) sebesar Rp18.000.000,00.',
        pokokSoal:
          'Apabila kesalahan tersebut belum dikoreksi, dampak yang terjadi pada Laporan Laba Rugi dan Laporan Posisi Keuangan PT Semesta Ritel tahun 2026 adalah ....',
        kunciJawaban: 'E',
        pembahasan:
          'Berdasarkan rumus HPP = BTUD - Persediaan Akhir:\nJika Persediaan Akhir terlalu tinggi (overstated) sebesar Rp18.000.000, maka pengurang BTUD menjadi terlalu besar sehingga Harga Pokok Penjualan (HPP) menjadi terlalu rendah (understated) sebesar Rp18.000.000.\nKarena HPP sebagai beban pokok terlalu rendah, maka Laba Kotor dan Laba Bersih tahun 2026 menjadi terlalu tinggi (overstated) sebesar Rp18.000.000.\nPada Laporan Posisi Keuangan (Neraca), Aset Lancar (Persediaan) dan Ekuitas (Laba Ditahan) sama-sama disajikan terlalu tinggi (overstated) sebesar Rp18.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Harga Pokok Penjualan terlalu tinggi (overstated) Rp18.000.000, sedangkan Laba Bersih dan Aset Lancar terlalu rendah (understated) Rp18.000.000',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan hubungan matematis antara Persediaan Akhir (pengurang) dan HPP.',
          },
          {
            label: 'B',
            teks: 'Harga Pokok Penjualan terlalu rendah (understated) Rp18.000.000, Laba Bersih terlalu rendah Rp18.000.000, dan Ekuitas Akhir tidak terpengaruh',
            isKey: false,
            rasionalPengecoh:
              'Gagal menelusuri bahwa penurunan HPP justru meningkatkan Laba Bersih dan saldo Ekuitas Akhir.',
          },
          {
            label: 'C',
            teks: 'Laba Bersih tetap akurat karena kesalahan pencatatan barang konsinyasi otomatis saling menghapus dengan akun Utang Dagang',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi: kesalahan hitung fisik (stock opname) tidak otomatis mencatat Utang Dagang.',
          },
          {
            label: 'D',
            teks: 'Harga Pokok Penjualan terlalu tinggi (overstated) Rp18.000.000, Laba Bersih terlalu tinggi Rp18.000.000, dan Liabilitas terlalu rendah Rp18.000.000',
            isKey: false,
            rasionalPengecoh:
              'Kontradiksi logika akuntansi: jika HPP naik, laba bersih tidak mungkin ikut naik.',
          },
          {
            label: 'E',
            teks: 'Harga Pokok Penjualan terlalu rendah (understated) Rp18.000.000, sedangkan Laba Bersih, Aset Lancar, dan Ekuitas Akhir masing-masing terlalu tinggi (overstated) Rp18.000.000',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Persediaan akhir overstated menurunkan HPP, sehingga mendongkrak Laba Bersih, Aset Lancar (Persediaan), dan Ekuitas secara semu sebesar Rp18.000.000.',
          },
        ],
      },
    ],
  },
  {
    id: 'akuntansi-perusahaan-jasa',
    judulPreset: 'Siklus Akuntansi Perusahaan Jasa & Persamaan Dasar (Fase E / Kelas X)',
    kategori: 'Dasar-Dasar Akuntansi',
    config: {
      namaSekolah: 'SMK Negeri 1 Akuntansi & Keuangan',
      mataPelajaran: 'Dasar-Dasar Akuntansi dan Keuangan Lembaga',
      jenjangFase: 'Fase E (Kelas 10 SMA/SMK)',
      kelasSemester: 'X AKL / Genap',
      tahunAjaran: '2026/2027',
      penyusun: 'Tim MGMP Akuntansi Dasar',
      materiPokok:
        'Persamaan Dasar Akuntansi, Mekanisme Debit-Kredit, Jurnal Umum, Buku Besar, dan Jurnal Penyesuaian Perusahaan Jasa',
      ringkasanMateri: `1. Persamaan Dasar Akuntansi (Accounting Equation):
Rumus fundamental: Aset = Liabilitas + Ekuitas.
Ekuitas dipengaruhi oleh: Setoran Modal Pemilik (+), Pendapatan Jasa (+), Beban Operasional (-), dan Pengambilan Pribadi / Prive (-).

2. Aturan Saldo Normal & Mekanisme Debit-Kredit:
- Aset (Harta): Bertambah di Debit, Berkurang di Kredit, Saldo Normal Debit.
- Liabilitas (Utang): Bertambah di Kredit, Berkurang di Debit, Saldo Normal Kredit.
- Ekuitas (Modal): Bertambah di Kredit, Berkurang di Debit, Saldo Normal Kredit.
- Prive (Drawing): Bertambah di Debit, Saldo Normal Debit.
- Pendapatan (Revenue): Bertambah di Kredit, Saldo Normal Kredit.
- Beban (Expense): Bertambah di Debit, Saldo Normal Debit.

3. Jurnal Penyesuaian (Adjusting Entries) Perusahaan Jasa:
- Pemakaian Perlengkapan (Supplies): (D) Beban Perlengkapan, (K) Perlengkapan sebesar nilai yang TERPAKAI.
- Beban Dibayar di Muka (Prepaid Expense):
  * Pendekatan Harta/Neraca (dicatat awal sebagai Aset): AJP mencatat bagian yang sudah terpakai/jatuh tempo -> (D) Beban ..., (K) ... Dibayar di Muka.
  * Pendekatan Beban/Laba Rugi (dicatat awal sebagai Beban): AJP mencatat bagian yang BELUM terpakai -> (D) ... Dibayar di Muka, (K) Beban ....
- Penyusutan Aset Tetap: (D) Beban Penyusutan ..., (K) Akumulasi Penyusutan ...
- Beban yang Masih Harus Dibayar (Accrued Expense): (D) Beban ..., (K) Utang ....`,
      capaianPembelajaran:
        'Pada akhir Fase E, peserta didik mampu memahami siklus akuntansi perusahaan jasa mulai dari analisis dokumen transaksi ke dalam Persamaan Dasar Akuntansi, pencatatan Jurnal Umum, pemindahbukuan (posting) ke Buku Besar, penyusunan Neraca Saldo, Jurnal Penyesuaian, hingga Laporan Keuangan perusahaan jasa.',
      tujuanPembelajaran:
        '1. Menjelaskan aturan saldo normal akun dan pengaruh transaksi keuangan terhadap keseimbangan Persamaan Dasar Akuntansi.\n2. Menerapkan pencatatan transaksi perusahaan jasa ke dalam Jurnal Umum dan Buku Besar.\n3. Menganalisis Ayat Jurnal Penyesuaian untuk perlengkapan, beban dibayar di muka (pendekatan neraca vs laba rugi), dan penyusutan aset tetap.',
      alurTujuanPembelajaran:
        'ATP 10.1: Mengidentifikasi pengaruh transaksi terhadap Aset, Liabilitas, dan Ekuitas pada Persamaan Dasar Akuntansi (L1 - C2).\nATP 10.2: Menerapkan mekanisme Debit dan Kredit dalam Jurnal Umum dan menghitung saldo akhir Buku Besar (L2 - C3).\nATP 10.3: Menganalisis Jurnal Penyesuaian beban dibayar di muka dengan pendekatan Harta dan pendekatan Beban (L3 - C4).',
      jumlahSoal: 5,
      jumlahOpsi: 5,
      proporsiL1: 20,
      proporsiL2: 40,
      proporsiL3: 40,
      waktuUjianMenit: 30,
      kkm: 75,
    },
    sampleItems: [
      {
        id: 'akt-jasa-1',
        nomor: 1,
        cpRef: 'Memahami keseimbangan Persamaan Dasar Akuntansi (Aset = Liabilitas + Ekuitas).',
        tpRef: 'TP 1: Menjelaskan pengaruh transaksi keuangan terhadap Persamaan Dasar Akuntansi.',
        atpRef: 'ATP 10.1: Mengidentifikasi perubahan Aset, Liabilitas, dan Ekuitas dari bukti transaksi (L1 - C2).',
        materiSpesifik: 'Analisis Transaksi terhadap Persamaan Dasar Akuntansi',
        bentukStimulus: 'Bukti Transaksi Pembelian Peralatan Sebagian Tunai dan Sebagian Kredit',
        indikatorSoal:
          'Disajikan transaksi pembelian peralatan kantor yang dibayar sebagian secara tunai dan sisanya secara kredit, peserta didik dapat menentukan pengaruh transaksi tersebut pada komponen Persamaan Dasar Akuntansi dengan tepat.',
        levelKognitif: 'L1',
        dimensiBloom: 'C2 - Memahami',
        stimulus:
          'Biro Konsultan Pajak "Artha Prima" membeli seperangkat komputer dan server jaringan seharga Rp32.000.000,00. Atas transaksi tersebut, perusahaan membayar uang muka secara tunai sebesar Rp12.000.000,00 dan sisanya sebesar Rp20.000.000,00 akan dilunasi bulan depan.',
        pokokSoal:
          'Pengaruh transaksi tersebut terhadap pencatatan Persamaan Dasar Akuntansi Biro Konsultan "Artha Prima" adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          'Transaksi pembelian peralatan secara campuran memengaruhi tiga akun:\n1) Aset berupa Peralatan bertambah (+) Rp32.000.000\n2) Aset berupa Kas berkurang (-) Rp12.000.000\n3) Liabilitas berupa Utang Usaha bertambah (+) Rp20.000.000\nKeseimbangan persamaan tetap terjaga: Perubahan bersih Aset (+Rp20.000.000) = Perubahan Liabilitas (+Rp20.000.000).',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: 'Aset (Peralatan) bertambah Rp32.000.000, Aset (Kas) berkurang Rp12.000.000, dan Ekuitas (Modal) bertambah Rp20.000.000',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi mencatat sisa tagihan kredit sebagai penambahan Modal, padahal merupakan Utang Usaha (Liabilitas).',
          },
          {
            label: 'B',
            teks: 'Aset (Peralatan) bertambah Rp20.000.000, Aset (Kas) berkurang Rp12.000.000, dan Liabilitas (Utang Usaha) bertambah Rp32.000.000',
            isKey: false,
            rasionalPengecoh:
              'Salah menempatkan nilai harga perolehan peralatan dengan nilai sisa utang.',
          },
          {
            label: 'C',
            teks: 'Aset (Peralatan) bertambah Rp32.000.000, Aset (Kas) berkurang Rp12.000.000, dan Liabilitas (Utang Usaha) bertambah Rp20.000.000',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Peralatan +Rp32 juta, Kas -Rp12 juta, dan Utang Usaha +Rp20 juta.',
          },
          {
            label: 'D',
            teks: 'Aset (Perlengkapan) bertambah Rp32.000.000, Liabilitas (Utang Usaha) berkurang Rp20.000.000, dan Ekuitas berkurang Rp12.000.000',
            isKey: false,
            rasionalPengecoh:
              'Tidak dapat membedakan akun Peralatan (aset tetap) dengan Perlengkapan (aset lancar habis pakai).',
          },
          {
            label: 'E',
            teks: 'Aset (Peralatan) bertambah Rp32.000.000 dan Liabilitas (Utang Usaha) bertambah Rp32.000.000 tanpa memengaruhi akun Kas',
            isKey: false,
            rasionalPengecoh:
              'Mengabaikan pembayaran uang muka tunai sebesar Rp12.000.000.',
          },
        ],
      },
      {
        id: 'akt-jasa-2',
        nomor: 2,
        cpRef: 'Menerapkan pencatatan Jurnal Umum dan pemindahbukuan Buku Besar.',
        tpRef: 'TP 2: Menerapkan pencatatan transaksi perusahaan jasa ke dalam Jurnal Umum.',
        atpRef: 'ATP 10.2: Menerapkan mekanisme Debit dan Kredit pada transaksi pendapatan jasa (L2 - C3).',
        materiSpesifik: 'Jurnal Umum Transaksi Penyelesaian Jasa (Tunai dan Piutang)',
        bentukStimulus: 'Faktur Penyelesaian Pekerjaan Jasa Desain Interior',
        indikatorSoal:
          'Disajikan bukti transaksi penyelesaian pekerjaan jasa yang pembayarannya diterima sebagian tunai dan sisanya berupa tagihan piutang, peserta didik dapat menentukan pencatatan Jurnal Umum dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Pada tanggal 18 Mei 2026, Studio Arsitek "Karya Mandiri" telah menyelesaikan pekerjaan desain gedung klien senilai total Rp45.000.000,00. Pada hari tersebut, klien baru menyerahkan pembayaran tunai sebesar Rp25.000.000,00 dan sisanya difakturkan untuk dilunasi pada bulan berikutnya.',
        pokokSoal:
          'Ayat Jurnal Umum yang tepat untuk mencatat transaksi tanggal 18 Mei 2026 pada pembukuan Studio Arsitek "Karya Mandiri" adalah ....',
        kunciJawaban: 'A',
        pembahasan:
          'Berdasarkan basis akrual (accrual basis), Pendapatan Jasa diakui penuh sebesar nilai pekerjaan yang telah diselesaikan (Rp45.000.000) di sisi Kredit. Penerimaan uang tunai menambah Kas di sisi Debit (Rp25.000.000), sedangkan sisa tagihan Rp20.000.000 menambah Piutang Usaha di sisi Debit.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: '(Debit) Kas Rp25.000.000 dan Piutang Usaha Rp20.000.000; (Kredit) Pendapatan Jasa Rp45.000.000',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Kas +Rp25 juta (D), Piutang Usaha +Rp20 juta (D), dan Pendapatan Jasa diakui penuh +Rp45 juta (K).',
          },
          {
            label: 'B',
            teks: '(Debit) Kas Rp25.000.000 dan Utang Usaha Rp20.000.000; (Kredit) Pendapatan Jasa Rp45.000.000',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi menggunakan akun Utang Usaha untuk tagihan kepada pelanggan (seharusnya Piutang Usaha).',
          },
          {
            label: 'C',
            teks: '(Debit) Kas Rp25.000.000; (Kredit) Pendapatan Jasa Rp25.000.000 dan Pendapatan Diterima di Muka Rp20.000.000',
            isKey: false,
            rasionalPengecoh:
              'Keliru menggunakan akun Pendapatan Diterima di Muka padahal jasa sudah selesai dikerjakan.',
          },
          {
            label: 'D',
            teks: '(Debit) Pendapatan Jasa Rp45.000.000; (Kredit) Kas Rp25.000.000 dan Piutang Usaha Rp20.000.000',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan aturan saldo normal Aset (Kas/Piutang) dan Pendapatan.',
          },
          {
            label: 'E',
            teks: '(Debit) Piutang Usaha Rp45.000.000; (Kredit) Kas Rp25.000.000 dan Modal Pemilik Rp20.000.000',
            isKey: false,
            rasionalPengecoh:
              'Salah memahami alur penerimaan kas dan pengakuan pendapatan.',
          },
        ],
      },
      {
        id: 'akt-jasa-3',
        nomor: 3,
        cpRef: 'Menyusun Ayat Jurnal Penyesuaian perusahaan jasa pada akhir periode.',
        tpRef: 'TP 3: Menganalisis Ayat Jurnal Penyesuaian untuk pemakaian perlengkapan.',
        atpRef: 'ATP 10.3: Menghitung nilai perlengkapan terpakai dan menyusun jurnal penyesuaiannya (L2 - C3).',
        materiSpesifik: 'Jurnal Penyesuaian Pemakaian Perlengkapan (Supplies)',
        bentukStimulus: 'Data Neraca Saldo dan Hasil Perhitungan Fisik Perlengkapan',
        indikatorSoal:
          'Disajikan saldo akun Perlengkapan pada Neraca Saldo dan nilai perlengkapan yang masih tersisa pada akhir periode, peserta didik dapat menentukan Ayat Jurnal Penyesuaian dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Pada Neraca Saldo Bengkel Mobil "Presisi Auto" per 31 Desember 2026, tercatat akun Perlengkapan Bengkel (oli, baut, kain lap) di sisi Debit sebesar Rp14.500.000,00. Setelah dilakukan pemeriksaan fisik di gudang pada tanggal 31 Desember 2026, nilai perlengkapan bengkel yang masih tersisa adalah sebesar Rp5.200.000,00.',
        pokokSoal:
          'Ayat Jurnal Penyesuaian yang harus dibuat oleh Bengkel Mobil "Presisi Auto" pada tanggal 31 Desember 2026 adalah ....',
        kunciJawaban: 'B',
        pembahasan:
          'Karena saat awal dicatat sebagai Aset (Perlengkapan Bengkel), maka jurnal penyesuaian mencatat nilai perlengkapan yang SUDAH TERPAKAI selama periode berjalan:\nPerlengkapan Terpakai = Saldo Awal - Sisa Akhir = Rp14.500.000 - Rp5.200.000 = Rp9.300.000.\nJurnal Penyesuaian: (Debit) Beban Perlengkapan Bengkel Rp9.300.000; (Kredit) Perlengkapan Bengkel Rp9.300.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: '(Debit) Beban Perlengkapan Bengkel Rp5.200.000,00; (Kredit) Perlengkapan Bengkel Rp5.200.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan klasik: langsung menggunakan angka sisa perlengkapan (Rp5,2 juta) tanpa mengurangkannya dari saldo Neraca Saldo.',
          },
          {
            label: 'B',
            teks: '(Debit) Beban Perlengkapan Bengkel Rp9.300.000,00; (Kredit) Perlengkapan Bengkel Rp9.300.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Mencatat jumlah yang terpakai selama setahun (Rp14.500.000 - Rp5.200.000 = Rp9.300.000).',
          },
          {
            label: 'C',
            teks: '(Debit) Perlengkapan Bengkel Rp9.300.000,00; (Kredit) Beban Perlengkapan Bengkel Rp9.300.000,00',
            isKey: false,
            rasionalPengecoh:
              'Nilai perhitungan sudah benar Rp9,3 juta tetapi posisi Debit dan Kredit terbalik.',
          },
          {
            label: 'D',
            teks: '(Debit) Beban Penyusutan Perlengkapan Rp9.300.000,00; (Kredit) Akumulasi Penyusutan Perlengkapan Rp9.300.000,00',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi menggunakan akun penyusutan/akumulasi penyusutan untuk aset lancar habis pakai (perlengkapan).',
          },
          {
            label: 'E',
            teks: '(Debit) Beban Perlengkapan Bengkel Rp19.700.000,00; (Kredit) Perlengkapan Bengkel Rp19.700.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru menjumlahkan saldo awal dengan nilai sisa perlengkapan.',
          },
        ],
      },
      {
        id: 'akt-jasa-4',
        nomor: 4,
        cpRef: 'Menganalisis Ayat Jurnal Penyesuaian beban dibayar di muka (Prepaid Expense).',
        tpRef: 'TP 3: Menganalisis AJP beban dibayar di muka dengan pendekatan Neraca vs Laba Rugi.',
        atpRef: 'ATP 10.3: Membandingkan jurnal penyesuaian Sewa Dibayar di Muka (Pendekatan Harta vs Pendekatan Beban) (L3 - C4).',
        materiSpesifik: 'Jurnal Penyesuaian Beban Sewa (Pendekatan Laba Rugi / Beban)',
        bentukStimulus: 'Kasus Pembayaran Sewa Gedung untuk 2 Tahun yang Dicatat dengan Pendekatan Beban',
        indikatorSoal:
          'Disajikan data pembayaran sewa ruko untuk masa 2 tahun yang pada saat transaksi awal dicatat pada akun Beban Sewa (pendekatan Laba Rugi), peserta didik dapat menganalisis Ayat Jurnal Penyesuaian pada akhir tahun pertama dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'Pada tanggal 1 September 2026, Klinik Kesehatan "Sehat Sentosa" membayar sewa gedung untuk masa 2 tahun (24 bulan) terhitung sejak 1 September 2026 sampai dengan 31 Agustus 2028 sebesar Rp48.000.000,00. Pada saat pembayaran tanggal 1 September 2026, akuntan mencatatnya dengan mendebit akun Beban Sewa dan mengkredit Kas sebesar Rp48.000.000,00.',
        pokokSoal:
          'Berdasarkan pencatatan awal tersebut, Ayat Jurnal Penyesuaian (AJP) yang tepat pada tanggal 31 Desember 2026 adalah ....',
        kunciJawaban: 'D',
        pembahasan:
          'Biaya sewa per bulan = Rp48.000.000 / 24 bulan = Rp2.000.000/bulan.\nMasa sewa yang sudah dijalani pada tahun 2026 (1 Sept s.d. 31 Des 2026) = 4 bulan (Rp8.000.000).\nMasa sewa yang BELUM dijalani (masih menjadi aset/sewa dibayar di muka per 31 Des 2026) = 24 - 4 = 20 bulan × Rp2.000.000 = Rp40.000.000.\nKarena saat awal dicatat sebagai Beban Sewa (Pendekatan Laba Rugi), maka AJP harus mengurangi Beban Sewa dan memunculkan Sewa Dibayar di Muka sebesar bagian yang BELUM terpakai (Rp40.000.000):\n(Debit) Sewa Dibayar di Muka Rp40.000.000; (Kredit) Beban Sewa Rp40.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: '(Debit) Beban Sewa Rp8.000.000,00; (Kredit) Sewa Dibayar di Muka Rp8.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan pendekatan Harta: jurnal ini hanya benar jika saat tanggal 1 September dicatat pada akun Sewa Dibayar di Muka.',
          },
          {
            label: 'B',
            teks: '(Debit) Sewa Dibayar di Muka Rp8.000.000,00; (Kredit) Beban Sewa Rp8.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Sudah benar menggunakan akun pendekatan Beban, tetapi nominalnya keliru menggunakan jumlah 4 bulan yang sudah terpakai (seharusnya 20 bulan yang belum terpakai).',
          },
          {
            label: 'C',
            teks: '(Debit) Beban Sewa Rp40.000.000,00; (Kredit) Sewa Dibayar di Muka Rp40.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Posisi Debit dan Kredit terbalik sehingga justru menambah Beban Sewa menjadi Rp88.000.000.',
          },
          {
            label: 'D',
            teks: '(Debit) Sewa Dibayar di Muka Rp40.000.000,00; (Kredit) Beban Sewa Rp40.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Pendekatan Beban menyesuaikan porsi yang belum dijalani (20/24 × Rp48 juta = Rp40 juta) sehingga saldo Beban Sewa tersisa Rp8 juta.',
          },
          {
            label: 'E',
            teks: '(Debit) Sewa Dibayar di Muka Rp32.000.000,00; (Kredit) Beban Sewa Rp32.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Salah menghitung jumlah bulan dari 1 September ke 31 Desember sebagai 8 bulan (seharusnya 4 bulan).',
          },
        ],
      },
      {
        id: 'akt-jasa-5',
        nomor: 5,
        cpRef: 'Menyusun Laporan Laba Rugi dan Laporan Perubahan Ekuitas perusahaan jasa.',
        tpRef: 'TP 3: Mengevaluasi hubungan Laba Bersih, Prive, dan Modal Akhir pada Laporan Perubahan Ekuitas.',
        atpRef: 'ATP 10.3: Menganalisis komponen Laporan Perubahan Ekuitas untuk menemukan nilai variabel yang belum diketahui (L3 - C4).',
        materiSpesifik: 'Hubungan Laporan Laba Rugi dan Laporan Perubahan Ekuitas (Capital Statement)',
        bentukStimulus: 'Data Kertas Kerja Parsial Perusahaan Jasa Ekspedisi',
        indikatorSoal:
          'Disajikan data Modal Awal, Modal Akhir, Prive, dan total Pendapatan Jasa suatu perusahaan jasa, peserta didik dapat menganalisis besarnya Laba Bersih dan total Beban Operasional periode tersebut dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'Laporan keuangan CV Kilat Ekspedisi untuk tahun yang berakhir 31 Desember 2026 menunjukkan informasi sebagai berikut:\n• Modal Pemilik per 1 Januari 2026: Rp150.000.000,00\n• Pengambilan Pribadi (Prive) selama tahun 2026: Rp15.000.000,00\n• Total Pendapatan Jasa selama tahun 2026: Rp128.000.000,00\n• Modal Pemilik per 31 Desember 2026: Rp183.000.000,00\n(Tidak ada setoran modal tambahan sepanjang tahun 2026).',
        pokokSoal:
          'Berdasarkan analisis Laporan Perubahan Ekuitas dan Laporan Laba Rugi, besarnya Laba Bersih dan Total Beban Operasional CV Kilat Ekspedisi tahun 2026 berturut-turut adalah ....',
        kunciJawaban: 'E',
        pembahasan:
          '1. Rumus Modal Akhir: Modal Akhir = Modal Awal + Laba Bersih - Prive\n   Rp183.000.000 = Rp150.000.000 + Laba Bersih - Rp15.000.000\n   Rp183.000.000 = Rp135.000.000 + Laba Bersih\n   Laba Bersih = Rp183.000.000 - Rp135.000.000 = Rp48.000.000.\n2. Rumus Laba Bersih: Laba Bersih = Total Pendapatan - Total Beban\n   Rp48.000.000 = Rp128.000.000 - Total Beban\n   Total Beban Operasional = Rp128.000.000 - Rp48.000.000 = Rp80.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Laba Bersih sebesar Rp33.000.000,00 dan Total Beban Operasional sebesar Rp95.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Hanya menghitung selisih Modal Akhir dan Modal Awal (Rp183 juta - Rp150 juta = Rp33 juta) tanpa memperhitungkan Prive Rp15 juta.',
          },
          {
            label: 'B',
            teks: 'Laba Bersih sebesar Rp18.000.000,00 dan Total Beban Operasional sebesar Rp110.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru mengurangkan Prive dari kenaikan modal (Rp33 juta - Rp15 juta = Rp18 juta) saat mencari Laba Bersih.',
          },
          {
            label: 'C',
            teks: 'Laba Bersih sebesar Rp48.000.000,00 dan Total Beban Operasional sebesar Rp95.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Laba bersih sudah benar Rp48 juta, tetapi salah memasukkan Prive sebagai komponen Beban Operasional.',
          },
          {
            label: 'D',
            teks: 'Laba Bersih sebesar Rp63.000.000,00 dan Total Beban Operasional sebesar Rp65.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menambahkan Prive dua kali dalam perhitungan perubahan ekuitas.',
          },
          {
            label: 'E',
            teks: 'Laba Bersih sebesar Rp48.000.000,00 dan Total Beban Operasional sebesar Rp80.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Kenaikan modal bersih Rp33 juta + Prive Rp15 juta = Laba Bersih Rp48 juta; Beban = Rp128 juta - Rp48 juta = Rp80 juta.',
          },
        ],
      },
    ],
  },
  {
    id: 'akuntansi-keuangan-aset-kas',
    judulPreset: 'Akuntansi Keuangan — Kas Kecil, Rekonsiliasi Bank & Aset Tetap (Fase F / Kelas XII)',
    kategori: 'Akuntansi Keuangan Menengah',
    config: {
      namaSekolah: 'SMK Negeri 1 Akuntansi & Keuangan',
      mataPelajaran: 'Akuntansi Keuangan',
      jenjangFase: 'Fase F (Kelas 11-12 SMA/SMK)',
      kelasSemester: 'XII AKL / Ganjil',
      tahunAjaran: '2026/2027',
      penyusun: 'Tim MGMP Akuntansi Keuangan',
      materiPokok:
        'Pengelolaan Dana Kas Kecil (Imprest & Fluctuating), Rekonsiliasi Bank, serta Penyusutan dan Penghentian Aset Tetap (PSAK 216)',
      ringkasanMateri: `1. Dana Kas Kecil (Petty Cash):
- Metode Dana Tetap (Imprest Fund System): Saat pengeluaran kas kecil, tidak langsung dijurnal (hanya mengumpulkan bukti). Jurnal baru dibuat saat pengisian kembali (replenishment) dengan mendebit akun-akun Beban dan mengkredit Kas di Bank. Saldo akun Kas Kecil selalu tetap kecuali ada kebijakan perubahan plafon.
- Metode Dana Tidak Tetap (Fluctuating Fund System): Setiap terjadi pengeluaran kas kecil langsung dijurnal: (D) Beban ..., (K) Kas Kecil. Saat pengisian kembali: (D) Kas Kecil, (K) Kas di Bank.

2. Rekonsiliasi Bank (Bank Reconciliation):
Menyesuaikan perbedaan antara Saldo Kas menurut Catatan Perusahaan dan Saldo menurut Rekening Koran Bank untuk mencari Saldo Kas yang Benar:
- Penyesuaian Catatan Perusahaan: (+) Penerimaan tagihan oleh bank, (+) Jasa giro/bunga bank, (-) Beban administrasi bank, (-) Cek kosong (NSF Check), (+/-) Koreksi kesalahan pencatatan perusahaan.
- Penyesuaian Catatan Bank: (+) Setoran dalam perjalanan (Deposit in Transit), (-) Cek yang masih beredar (Outstanding Check), (+/-) Koreksi kesalahan bank.

3. Penyusutan Aset Tetap (Depreciation - PSAK 216):
- Metode Garis Lurus (Straight-Line): Beban Penyusutan/tahun = (Harga Perolehan - Nilai Residu) / Umur Ekonomis.
- Metode Saldo Menurun Ganda (Double Declining Balance): Tarif = 2 × (100% / Umur Ekonomis); Beban Penyusutan = Tarif × Nilai Buku Awal Tahun (tanpa dikurangi residu di awal).
- Metode Jumlah Angka Tahun (Sum-of-the-Years'-Digits) & Metode Satuan Hasil Produksi.`,
      capaianPembelajaran:
        'Pada akhir Fase F, peserta didik mampu mengelola kartu piutang, kas kecil, rekonsiliasi bank, serta menerapkan akuntansi perolehan, penyusutan, dan pelepasan aset tetap sesuai Standar Akuntansi Keuangan.',
      tujuanPembelajaran:
        '1. Membedakan pencatatan transaksi Kas Kecil metode Dana Tetap (Imprest) dan Dana Tidak Tetap (Fluctuating).\n2. Menyusun laporan Rekonsiliasi Bank untuk menentukan saldo Kas di Bank yang sebenarnya beserta jurnal penyesuaiannya.\n3. Menghitung beban penyusutan dan nilai buku aset tetap menggunakan metode Garis Lurus dan Saldo Menurun Ganda serta menganalisis laba/rugi pelepasan aset tetap.',
      alurTujuanPembelajaran:
        'ATP 12.1: Mengidentifikasi perbedaan penjurnalan Kas Kecil metode Imprest dan Fluctuating (L1 - C2).\nATP 12.2: Menghitung saldo kas yang benar pada Rekonsiliasi Bank (Deposit in Transit, Outstanding Check, Jasa Giro) (L2 - C3).\nATP 12.3: Menganalisis beban penyusutan metode Saldo Menurun Ganda dan mengevaluasi laba/rugi penjualan aset tetap (L3 - C4/C5).',
      jumlahSoal: 5,
      jumlahOpsi: 5,
      proporsiL1: 20,
      proporsiL2: 40,
      proporsiL3: 40,
      waktuUjianMenit: 35,
      kkm: 75,
    },
    sampleItems: [
      {
        id: 'akt-keu-1',
        nomor: 1,
        cpRef: 'Memahami pengelolaan dan pencatatan Dana Kas Kecil.',
        tpRef: 'TP 1: Membedakan pencatatan Kas Kecil metode Imprest dan Fluctuating.',
        atpRef: 'ATP 12.1: Mengidentifikasi penjurnalan pengeluaran dan pengisian kembali Kas Kecil metode Imprest (L1 - C2).',
        materiSpesifik: 'Sistem Dana Kas Kecil Metode Imprest (Dana Tetap)',
        bentukStimulus: 'Kasus Pengeluaran dan Pengisian Kembali Dana Kas Kecil',
        indikatorSoal:
          'Disajikan kasus pengeluaran kas kecil untuk pembelian alat tulis kantor pada perusahaan yang menerapkan sistem Dana Tetap (Imprest Fund System), peserta didik dapat menentukan perlakuan akuntansi yang tepat pada tanggal pengeluaran dan tanggal pengisian kembali.',
        levelKognitif: 'L1',
        dimensiBloom: 'C2 - Memahami',
        stimulus:
          'PT Mega Distribusi menyelenggarakan kas kecil dengan sistem Dana Tetap (Imprest Fund System) senilai Rp5.000.000,00. Pada tanggal 12 Maret 2026, pemegang kas kecil mengeluarkan uang sebesar Rp650.000,00 untuk membeli alat tulis kantor dan meterai. Selanjutnya pada tanggal 25 Maret 2026 dilakukan pengisian kembali dana kas kecil.',
        pokokSoal:
          'Perlakuan pencatatan jurnal yang tepat pada pembukuan PT Mega Distribusi terkait transaksi tanggal 12 Maret 2026 dan 25 Maret 2026 adalah ....',
        kunciJawaban: 'A',
        pembahasan:
          'Pada metode Imprest (Dana Tetap), setiap kali terjadi pengeluaran kas kecil (12 Maret), pemegang kas kecil hanya mengarsipkan bukti pengeluaran kas kecil dan TIDAK membuat jurnal umum. Jurnal baru dicatat pada saat pengisian kembali (25 Maret) dengan mendebit Beban Perlengkapan Kantor Rp650.000 dan mengkredit Kas di Bank Rp650.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: 'Tanggal 12 Maret tidak dijurnal; tanggal 25 Maret dijurnal (Debit) Beban Perlengkapan Kantor Rp650.000 dan (Kredit) Kas di Bank Rp650.000',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Ciri khas Imprest Fund adalah tidak menjurnal saat pengeluaran dan langsung mendebit beban terhadap Kas di Bank saat pengisian kembali.',
          },
          {
            label: 'B',
            teks: 'Tanggal 12 Maret dijurnal (Debit) Beban Perlengkapan Kantor dan (Kredit) Kas Kecil; tanggal 25 Maret dijurnal (Debit) Kas Kecil dan (Kredit) Kas di Bank',
            isKey: false,
            rasionalPengecoh:
              'Jebakan miskonsepsi: ini adalah prosedur pencatatan untuk metode Fluctuating Fund (Dana Tidak Tetap).',
          },
          {
            label: 'C',
            teks: 'Tanggal 12 Maret dijurnal (Debit) Kas Kecil dan (Kredit) Kas di Bank; tanggal 25 Maret tidak dijurnal',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan waktu pencatatan dan salah menentukan akun saat pengeluaran.',
          },
          {
            label: 'D',
            teks: 'Tanggal 12 Maret tidak dijurnal; tanggal 25 Maret dijurnal (Debit) Kas Kecil Rp650.000 dan (Kredit) Kas di Bank Rp650.000',
            isKey: false,
            rasionalPengecoh:
              'Jika saat pengisian kembali mendebit Kas Kecil, maka saldo Kas Kecil akan bertambah terus dan beban tidak pernah diakui.',
          },
          {
            label: 'E',
            teks: 'Baik tanggal 12 Maret maupun 25 Maret tidak dijurnal karena kas kecil hanya dicatat pada akhir tahun buku',
            isKey: false,
            rasionalPengecoh:
              'Salah memahami prinsip pengisian kembali (replenishment) kas kecil.',
          },
        ],
      },
      {
        id: 'akt-keu-2',
        nomor: 2,
        cpRef: 'Menyusun Rekonsiliasi Bank dan menghitung saldo kas yang benar.',
        tpRef: 'TP 2: Menyusun laporan Rekonsiliasi Bank untuk menentukan saldo Kas di Bank yang sebenarnya.',
        atpRef: 'ATP 12.2: Menghitung saldo kas yang benar dari data perbedaan catatan perusahaan dan rekening koran (L2 - C3).',
        materiSpesifik: 'Perhitungan Saldo Kas yang Benar pada Rekonsiliasi Bank',
        bentukStimulus: 'Data Perbandingan Catatan Kas Perusahaan dan Rekening Koran Bank',
        indikatorSoal:
          'Disajikan data saldo Kas menurut catatan perusahaan, saldo menurut rekening koran bank, serta pos-pos rekonsiliasi (Deposit in Transit, Outstanding Check, Jasa Giro, dan Beban Administrasi Bank), peserta didik dapat menghitung Saldo Kas yang Benar dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Pada tanggal 31 Juli 2026, saldo akun Kas di Bank menurut catatan PT Nusantara Logistik adalah sebesar Rp64.200.000,00, sedangkan saldo menurut Rekening Koran Bank Mandiri adalah sebesar Rp67.500.000,00. Pemeriksaan menunjukkan penyebab perbedaan berikut:\n1. Setoran perusahaan tanggal 31 Juli sore sebesar Rp12.000.000,00 belum tampak pada rekening koran (Deposit in Transit).\n2. Cek yang dikeluarkan untuk membayar pemasok sebesar Rp14.500.000,00 belum dicairkan oleh pemegangnya (Outstanding Check).\n3. Bank telah mengkredit rekening perusahaan untuk Jasa Giro (bunga bank) sebesar Rp1.100.000,00 dan mendebit Beban Administrasi Bank sebesar Rp300.000,00.',
        pokokSoal:
          'Berdasarkan data rekonsiliasi bank tersebut, besarnya Saldo Kas di Bank yang Benar per 31 Juli 2026 adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          'Perhitungan dari kedua sisi akan menghasilkan nilai yang sama:\n• Sisi Catatan Perusahaan:\n  Saldo awal catatan = Rp64.200.000\n  (+) Jasa Giro = Rp1.100.000\n  (-) Beban Administrasi Bank = (Rp300.000)\n  Saldo Kas yang Benar = Rp65.000.000.\n• Sisi Rekening Koran Bank:\n  Saldo awal bank = Rp67.500.000\n  (+) Deposit in Transit = Rp12.000.000\n  (-) Outstanding Check = (Rp14.500.000)\n  Saldo Kas yang Benar = Rp65.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'Rp61.700.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru mengurangkan Deposit in Transit dan menambahkan Outstanding Check pada catatan perusahaan.',
          },
          {
            label: 'B',
            teks: 'Rp63.400.000,00',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan perlakuan Jasa Giro (dikurangkan) dan Beban Administrasi Bank (ditambahkan).',
          },
          {
            label: 'C',
            teks: 'Rp65.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Rp64.200.000 + Rp1.100.000 - Rp300.000 = Rp65.000.000 (sama dengan Rp67.500.000 + Rp12.000.000 - Rp14.500.000).',
          },
          {
            label: 'D',
            teks: 'Rp70.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menambahkan Outstanding Check pada saldo rekening koran bank.',
          },
          {
            label: 'E',
            teks: 'Rp79.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Hanya menambahkan Deposit in Transit ke saldo bank tanpa mengurangkan Outstanding Check.',
          },
        ],
      },
      {
        id: 'akt-keu-3',
        nomor: 3,
        cpRef: 'Menerapkan perhitungan penyusutan aset tetap sesuai SAK.',
        tpRef: 'TP 3: Menghitung beban penyusutan dan nilai buku aset tetap metode Saldo Menurun Ganda.',
        atpRef: 'ATP 12.3: Menghitung penyusutan tahun ke-2 dengan metode Double Declining Balance (L2 - C3).',
        materiSpesifik: 'Penyusutan Aset Tetap Metode Saldo Menurun Ganda (Double Declining Balance)',
        bentukStimulus: 'Data Perolehan Mesin Produksi',
        indikatorSoal:
          'Disajikan data harga perolehan mesin, estimasi nilai residu, dan umur ekonomis, peserta didik dapat menghitung beban penyusutan tahun kedua dan nilai buku akhir tahun kedua menggunakan metode Saldo Menurun Ganda dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Pada tanggal 2 Januari 2025, PT Grafika Utama membeli sebuah mesin cetak digital dengan harga perolehan Rp200.000.000,00. Mesin tersebut diperkirakan memiliki umur ekonomis 5 tahun dengan estimasi nilai residu (nilai sisa) sebesar Rp20.000.000,00. Perusahaan menerapkan metode penyusutan Saldo Menurun Ganda (Double Declining Balance Method).',
        pokokSoal:
          'Besarnya Beban Penyusutan Mesin untuk tahun 2026 (tahun ke-2) dan Nilai Buku Mesin per 31 Desember 2026 berturut-turut adalah ....',
        kunciJawaban: 'D',
        pembahasan:
          '1. Tarif Saldo Menurun Ganda = 2 × (100% / 5 tahun) = 40% per tahun.\n2. Pada metode Saldo Menurun Ganda, tarif dikalikan langsung dengan Nilai Buku Awal Tahun (tanpa dikurangi nilai residu terlebih dahulu):\n   • Penyusutan Tahun 2025 (Tahun 1) = 40% × Rp200.000.000 = Rp80.000.000.\n   • Nilai Buku per 31 Des 2025 = Rp200.000.000 - Rp80.000.000 = Rp120.000.000.\n3. Penyusutan Tahun 2026 (Tahun 2) = 40% × Rp120.000.000 = Rp48.000.000.\n4. Nilai Buku per 31 Des 2026 = Rp120.000.000 - Rp48.000.000 = Rp72.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'Beban Penyusutan Rp36.000.000,00 dan Nilai Buku Rp128.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan metode Garis Lurus ((200 juta - 20 juta) / 5 = Rp36 juta/tahun), bukan Saldo Menurun Ganda.',
          },
          {
            label: 'B',
            teks: 'Beban Penyusutan Rp43.200.000,00 dan Nilai Buku Rp64.800.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan klasik: mengurangkan nilai residu Rp20 juta di awal (40% × 180 juta = 72 juta di tahun 1; 40% × 108 juta = 43,2 juta di tahun 2).',
          },
          {
            label: 'C',
            teks: 'Beban Penyusutan Rp80.000.000,00 dan Nilai Buku Rp120.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Ini adalah angka penyusutan dan nilai buku untuk Tahun ke-1 (2025), bukan Tahun ke-2 (2026).',
          },
          {
            label: 'D',
            teks: 'Beban Penyusutan Rp48.000.000,00 dan Nilai Buku Rp72.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Tarif 40% × Nilai Buku awal tahun ke-2 (Rp120 juta) = Rp48 juta; Nilai buku akhir tahun ke-2 = Rp72 juta.',
          },
          {
            label: 'E',
            teks: 'Beban Penyusutan Rp48.000.000,00 dan Nilai Buku Rp152.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menghitung Nilai Buku tahun ke-2 dengan mengurangkan penyusutan tahun ke-2 saja dari harga perolehan awal.',
          },
        ],
      },
      {
        id: 'akt-keu-4',
        nomor: 4,
        cpRef: 'Menganalisis penghentian dan pelepasan aset tetap (penjualan/pertukaran).',
        tpRef: 'TP 3: Menganalisis laba/rugi pelepasan aset tetap beserta ayat jurnalnya.',
        atpRef: 'ATP 12.3: Menganalisis perhitungan laba/rugi penjualan kendaraan operasional sebelum akhir umur ekonomis (L3 - C4).',
        materiSpesifik: 'Pelepasan / Penjualan Aset Tetap dan Pengakuan Laba/Rugi',
        bentukStimulus: 'Kasus Penjualan Kendaraan Operasional di Tengah Tahun Buku',
        indikatorSoal:
          'Disajikan data harga perolehan kendaraan, akumulasi penyusutan awal tahun, tarif penyusutan garis lurus, serta harga jual tunai pada pertengahan tahun, peserta didik dapat menganalisis laba/rugi penjualan aset tetap dan ayat jurnalnya dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'PT Trans Niaga memiliki sebuah mobil boks yang dibeli pada tanggal 1 Januari 2023 dengan harga perolehan Rp240.000.000,00, masa manfaat 8 tahun, tanpa nilai residu, dan disusutkan dengan metode Garis Lurus. Pada tanggal 1 Juli 2026, mobil boks tersebut dijual secara tunai dengan harga Rp142.000.000,00.',
        pokokSoal:
          'Berdasarkan analisis akuntansi aset tetap, hasil pelepasan aset tetap dan pencatatan jurnal pada tanggal 1 Juli 2026 (setelah penyusutan berjalan 6 bulan tahun 2026 dicatat) adalah ....',
        kunciJawaban: 'B',
        pembahasan:
          '1. Penyusutan per tahun = Rp240.000.000 / 8 tahun = Rp30.000.000/tahun (atau Rp2.500.000/bulan).\n2. Masa pemakaian sejak 1 Januari 2023 s.d. 1 Juli 2026 = 3,5 tahun (42 bulan):\n   Total Akumulasi Penyusutan s.d. 1 Juli 2026 = 3,5 × Rp30.000.000 = Rp105.000.000.\n3. Nilai Buku (Carrying Amount) per 1 Juli 2026 = Rp240.000.000 - Rp105.000.000 = Rp135.000.000.\n4. Harga Jual Tunai = Rp142.000.000.\n5. Selisih = Harga Jual (Rp142.000.000) > Nilai Buku (Rp135.000.000) -> Laba Penjualan Aset Tetap sebesar Rp7.000.000.\nJurnal: (D) Kas Rp142.000.000, (D) Akumulasi Penyusutan Kendaraan Rp105.000.000; (K) Kendaraan Rp240.000.000, (K) Laba Penjualan Aset Tetap Rp7.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Rugi Penjualan Aset Tetap sebesar Rp8.000.000,00 karena Akumulasi Penyusutan tercatat Rp90.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Lupa memperhitungkan penyusutan 6 bulan berjalan di tahun 2026 (1 Jan s.d. 1 Juli 2026 sebesar Rp15.000.000).',
          },
          {
            label: 'B',
            teks: 'Laba Penjualan Aset Tetap sebesar Rp7.000.000,00 dengan menghapus Akumulasi Penyusutan di sisi Debit sebesar Rp105.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Akumulasi penyusutan 3,5 tahun = Rp105 juta, Nilai Buku = Rp135 juta, dijual Rp142 juta -> Laba Rp7 juta.',
          },
          {
            label: 'C',
            teks: 'Laba Penjualan Aset Tetap sebesar Rp22.000.000,00 karena Akumulasi Penyusutan dihitung selama 4 tahun penuh (Rp120.000.000,00)',
            isKey: false,
            rasionalPengecoh:
              'Menghitung penyusutan tahun 2026 selama 1 tahun penuh padahal kendaraan sudah dijual pada 1 Juli 2026.',
          },
          {
            label: 'D',
            teks: 'Rugi Penjualan Aset Tetap sebesar Rp7.000.000,00 yang dicatat di sisi Kredit',
            isKey: false,
            rasionalPengecoh:
              'Salah menafsirkan selisih Harga Jual di atas Nilai Buku sebagai kerugian.',
          },
          {
            label: 'E',
            teks: 'Rugi Penjualan Aset Tetap sebesar Rp98.000.000,00 dari selisih Harga Perolehan dan Harga Jual',
            isKey: false,
            rasionalPengecoh:
              'Membandingkan Harga Jual langsung dengan Harga Perolehan tanpa mengurangkan Akumulasi Penyusutan.',
          },
        ],
      },
      {
        id: 'akt-keu-5',
        nomor: 5,
        cpRef: 'Mengevaluasi kapitalisasi biaya perolehan dan pengeluaran setelah perolehan aset tetap.',
        tpRef: 'TP 3: Mengevaluasi pengeluaran modal (Capital Expenditure) vs pengeluaran pendapatan (Revenue Expenditure).',
        atpRef: 'ATP 12.3: Mengevaluasi dampak kesalahan pencatatan Capital Expenditure sebagai Revenue Expenditure terhadap laporan keuangan (L3 - C5).',
        materiSpesifik: 'Pengeluaran Modal (Capital Expenditure) vs Pengeluaran Pendapatan (Revenue Expenditure)',
        bentukStimulus: 'Kasus Overhaul Mesin Besar yang Menambah Umur Ekonomis',
        indikatorSoal:
          'Disajikan kasus pengeluaran kas dalam jumlah material untuk turun mesin (major overhaul) yang memperpanjang masa manfaat aset tetap namun keliru dicatat sebagai beban pemeliharaan rutin, peserta didik dapat mengevaluasi dampak kesalahan tersebut terhadap Laporan Keuangan dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C5 - Mengevaluasi',
        stimulus:
          'Pada awal Januari 2026, PT Industri Tekstil mengeluarkan biaya sebesar Rp90.000.000,00 untuk melakukan perombakan besar (major overhaul) pada mesin tenun utama yang terbukti meningkatkan kapasitas produksi dan memperpanjang umur ekonomis mesin selama 3 tahun. Sesuai PSAK 216, pengeluaran ini memenuhi kriteria Pengeluaran Modal (Capital Expenditure). Namun, staf akuntansi keliru mencatat seluruh pengeluaran Rp90.000.000,00 tersebut sebagai Beban Pemeliharaan dan Reparasi (Revenue Expenditure) tahun 2026.',
        pokokSoal:
          'Evaluasi yang tepat mengenai dampak kesalahan pencatatan tersebut terhadap Laporan Keuangan PT Industri Tekstil pada akhir tahun 2026 adalah ....',
        kunciJawaban: 'E',
        pembahasan:
          'Seharusnya pengeluaran Rp90.000.000 dikapitalisasi ke nilai Aset Tetap (Mesin) dan hanya disusutkan sebesar Rp90.000.000 / 3 tahun = Rp30.000.000 pada tahun 2026.\nKarena langsung dibebankan seluruhnya Rp90.000.000 sebagai Beban Pemeliharaan di tahun 2026:\n1) Total Beban tahun 2026 menjadi terlalu tinggi (overstated) sebesar Rp60.000.000 (Rp90 juta vs seharusnya penyusutan Rp30 juta).\n2) Akibatnya, Laba Bersih tahun 2026 dan Ekuitas Akhir menjadi terlalu rendah (understated) sebesar Rp60.000.000.\n3) Nilai Buku Aset Tetap di Laporan Posisi Keuangan per 31 Desember 2026 juga terlalu rendah (understated) sebesar Rp60.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Laba Bersih tahun 2026 terlalu tinggi (overstated) dan Nilai Buku Aset Tetap terlalu tinggi (overstated)',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan efek pembebanan langsung (membebankan sekaligus justru menekan laba tahun berjalan).',
          },
          {
            label: 'B',
            teks: 'Beban operasional tahun 2026 terlalu rendah (understated) sehingga pajak penghasilan badan yang dibayar menjadi terlalu besar',
            isKey: false,
            rasionalPengecoh:
              'Salah memahami bahwa pencatatan sebagai Revenue Expenditure justru memperbesar beban tahun berjalan.',
          },
          {
            label: 'C',
            teks: 'Tidak memengaruhi Laba Bersih maupun Ekuitas karena kas yang dikeluarkan sama-sama sebesar Rp90.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Mengacaukan laporan arus kas dengan pengakuan beban berbasis akrual pada Laporan Laba Rugi.',
          },
          {
            label: 'D',
            teks: 'Laba Bersih tahun 2026 terlalu rendah sebesar Rp90.000.000,00 karena aset tetap yang dikapitalisasi tidak boleh disusutkan',
            isKey: false,
            rasionalPengecoh:
              'Lupa bahwa jika dikapitalisasi, aset tersebut tetap mengalami penyusutan tahun berjalan sebesar Rp30.000.000.',
          },
          {
            label: 'E',
            teks: 'Beban tahun 2026 terlalu tinggi (overstated), sehingga Laba Bersih, Nilai Buku Aset Tetap, dan Ekuitas per 31 Desember 2026 menjadi terlalu rendah (understated) sebesar Rp60.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Selisih antara pembebanan penuh (Rp90 juta) dan beban penyusutan seharusnya (Rp30 juta) menyebabkan Laba Bersih dan Aset Bersih understated Rp60 juta.',
          },
        ],
      },
    ],
  },
  {
    id: 'akuntansi-biaya-manufaktur',
    judulPreset: 'Akuntansi Perusahaan Manufaktur & Harga Pokok Produksi (Fase F / Kelas XII)',
    kategori: 'Akuntansi Biaya & Manufaktur',
    config: {
      namaSekolah: 'SMK Negeri 1 Akuntansi & Keuangan',
      mataPelajaran: 'Praktikum Akuntansi Perusahaan Manufaktur & Akuntansi Biaya',
      jenjangFase: 'Fase F (Kelas 11-12 SMA/SMK)',
      kelasSemester: 'XII AKL / Genap',
      tahunAjaran: '2026/2027',
      penyusun: 'Tim MGMP Akuntansi Manufaktur',
      materiPokok:
        'Klasifikasi Biaya Produksi (BBB, BTKL, BOP), Perhitungan Harga Pokok Produksi (Cost of Goods Manufactured), dan Harga Pokok Pesanan (Job Order Costing)',
      ringkasanMateri: `1. Elemen Biaya Produksi Perusahaan Manufaktur:
- Biaya Bahan Baku Langsung / Direct Materials (BBB): Bahan utama yang membentuk bagian integral produk jadi.
- Biaya Tenaga Kerja Langsung / Direct Labor (BTKL): Upah pekerja pabrik yang terlibat langsung mengubah bahan baku menjadi produk jadi.
- Biaya Overhead Pabrik / Factory Overhead (BOP): Seluruh biaya produksi selain BBB dan BTKL (contoh: bahan penolong, tenaga kerja tidak langsung/mandor pabrik, penyusutan mesin pabrik, listrik & asuransi pabrik).
- Biaya Utama (Prime Cost) = BBB + BTKL.
- Biaya Konversi (Conversion Cost) = BTKL + BOP.

2. Rumus Laporan Harga Pokok Produksi (Cost of Goods Manufactured / COGM):
- Bahan Baku Terpakai = Persediaan Bahan Baku Awal + Pembelian Bahan Baku Bersih - Persediaan Bahan Baku Akhir.
- Total Biaya Produksi (Total Manufacturing Cost) = Bahan Baku Terpakai + BTKL + BOP Dibebankan.
- Harga Pokok Produksi (COGM) = Total Biaya Produksi + Persediaan Barang Dalam Proses (WIP) Awal - Persediaan Barang Dalam Proses (WIP) Akhir.
- Harga Pokok Penjualan Manufaktur (COGS) = Persediaan Produk Jadi Awal + Harga Pokok Produksi - Persediaan Produk Jadi Akhir.`,
      capaianPembelajaran:
        'Pada akhir Fase F, peserta didik mampu mengklasifikasikan elemen biaya produksi, menghitung pembebanan Biaya Overhead Pabrik (BOP), menyusun Laporan Harga Pokok Produksi (Cost of Goods Manufactured), serta menghitung laba kotor perusahaan manufaktur.',
      tujuanPembelajaran:
        '1. Mengklasifikasikan Biaya Utama (Prime Cost), Biaya Konversi (Conversion Cost), dan Beban Non-Produksi (Periode).\n2. Menghitung pemakaian bahan baku, Total Biaya Produksi, dan Harga Pokok Produksi (HPP/COGM).\n3. Menganalisis selisih BOP (Underapplied/Overapplied Overhead) dan dampaknya terhadap Harga Pokok Penjualan.',
      alurTujuanPembelajaran:
        'ATP 12.1: Membedakan komponen Biaya Utama, Biaya Konversi, dan Beban Operasional Non-Pabrik (L1 - C2).\nATP 12.2: Menghitung Harga Pokok Produksi dengan memperhitungkan persediaan Barang Dalam Proses (WIP) awal dan akhir (L2 - C3).\nATP 12.3: Menganalisis Kartu Harga Pokok Pesanan (Job Order Costing) dan selisih BOP (L3 - C4).',
      jumlahSoal: 5,
      jumlahOpsi: 5,
      proporsiL1: 20,
      proporsiL2: 40,
      proporsiL3: 40,
      waktuUjianMenit: 35,
      kkm: 75,
    },
    sampleItems: [
      {
        id: 'akt-mfg-1',
        nomor: 1,
        cpRef: 'Memahami klasifikasi elemen biaya produksi pada perusahaan manufaktur.',
        tpRef: 'TP 1: Mengklasifikasikan Biaya Utama (Prime Cost) dan Biaya Konversi (Conversion Cost).',
        atpRef: 'ATP 12.1: Membedakan komponen Biaya Utama, Biaya Konversi, dan Beban Periode (L1 - C2).',
        materiSpesifik: 'Klasifikasi Biaya Utama (Prime Cost) dan Biaya Konversi (Conversion Cost)',
        bentukStimulus: 'Daftar Biaya Pabrik Garmen dan Kantor Pemasaran',
        indikatorSoal:
          'Disajikan daftar rincian biaya yang dikeluarkan oleh perusahaan industri garmen, peserta didik dapat mengelompokkan dan menghitung besaran Biaya Utama (Prime Cost) dan Biaya Konversi (Conversion Cost) dengan tepat.',
        levelKognitif: 'L1',
        dimensiBloom: 'C2 - Memahami',
        stimulus:
          'PT Busana Nusantara (industri garmen) mencatat pengeluaran biaya selama bulan Oktober 2026 sebagai berikut:\n• Pemakaian kain katun (bahan baku utama): Rp85.000.000,00\n• Pemakaian benang jahit dan kancing (bahan penolong): Rp8.000.000,00\n• Upah tukang potong dan penjahit pabrik: Rp45.000.000,00\n• Gaji supervisor/mandor pabrik dan teknisi mesin: Rp12.000.000,00\n• Beban penyusutan mesin jahit dan listrik pabrik: Rp15.000.000,00\n• Beban gaji staf pemasaran dan iklan toko: Rp20.000.000,00',
        pokokSoal:
          'Berdasarkan klasifikasi akuntansi biaya, besarnya Biaya Utama (Prime Cost) dan Biaya Konversi (Conversion Cost) PT Busana Nusantara bulan Oktober 2026 berturut-turut adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          '1. BBB = Rp85.000.000.\n2. BTKL = Rp45.000.000.\n3. BOP = Bahan penolong (Rp8 juta) + Gaji mandor pabrik (Rp12 juta) + Penyusutan & listrik pabrik (Rp15 juta) = Rp35.000.000. (Catatan: Gaji pemasaran Rp20 juta adalah beban periode/komersial, bukan biaya produksi).\n• Biaya Utama (Prime Cost) = BBB + BTKL = Rp85.000.000 + Rp45.000.000 = Rp130.000.000.\n• Biaya Konversi (Conversion Cost) = BTKL + BOP = Rp45.000.000 + Rp35.000.000 = Rp80.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: 'Biaya Utama Rp93.000.000,00 dan Biaya Konversi Rp92.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Mencampuradukkan bahan penolong ke dalam BBB dan memasukkan beban pemasaran ke dalam BOP.',
          },
          {
            label: 'B',
            teks: 'Biaya Utama Rp130.000.000,00 dan Biaya Konversi Rp100.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan memasukkan beban gaji staf pemasaran dan iklan (Rp20 juta) ke dalam Biaya Konversi.',
          },
          {
            label: 'C',
            teks: 'Biaya Utama Rp130.000.000,00 dan Biaya Konversi Rp80.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Prime Cost = BBB (85 jt) + BTKL (45 jt) = 130 jt; Conversion Cost = BTKL (45 jt) + BOP (8+12+15 = 35 jt) = 80 jt.',
          },
          {
            label: 'D',
            teks: 'Biaya Utama Rp142.000.000,00 dan Biaya Konversi Rp68.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Memasukkan gaji mandor pabrik (tenaga kerja tidak langsung) sebagai BTKL.',
          },
          {
            label: 'E',
            teks: 'Biaya Utama Rp165.000.000,00 dan Biaya Konversi Rp35.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menganggap Biaya Utama sebagai total seluruh biaya produksi dan Biaya Konversi hanya BOP saja.',
          },
        ],
      },
      {
        id: 'akt-mfg-2',
        nomor: 2,
        cpRef: 'Menyusun Laporan Harga Pokok Produksi (Cost of Goods Manufactured).',
        tpRef: 'TP 2: Menghitung Total Biaya Produksi dan Harga Pokok Produksi (COGM).',
        atpRef: 'ATP 12.2: Menghitung Harga Pokok Produksi dengan data persediaan Barang Dalam Proses (WIP) (L2 - C3).',
        materiSpesifik: 'Perhitungan Harga Pokok Produksi (Cost of Goods Manufactured)',
        bentukStimulus: 'Data Persediaan dan Biaya Pabrik PT Mebel Jati Indah',
        indikatorSoal:
          'Disajikan data persediaan bahan baku, barang dalam proses, pembelian bahan baku, BTKL, dan BOP, peserta didik dapat menghitung besaran Harga Pokok Produksi periode berjalan dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Data akuntansi biaya PT Mebel Jati Indah untuk bulan November 2026 adalah sebagai berikut:\n• Persediaan Bahan Baku (1 Nov): Rp24.000.000,00 | (30 Nov): Rp19.000.000,00\n• Persediaan Barang Dalam Proses / WIP (1 Nov): Rp30.000.000,00 | (30 Nov): Rp22.000.000,00\n• Pembelian Bahan Baku Bersih selama bulan November: Rp75.000.000,00\n• Biaya Tenaga Kerja Langsung (BTKL): Rp50.000.000,00\n• Total Biaya Overhead Pabrik (BOP): Rp40.000.000,00',
        pokokSoal:
          'Berdasarkan data di atas, besarnya Harga Pokok Produksi (Cost of Goods Manufactured) PT Mebel Jati Indah pada bulan November 2026 adalah ....',
        kunciJawaban: 'D',
        pembahasan:
          '1. Pemakaian Bahan Baku = Persediaan Awal + Pembelian Bersih - Persediaan Akhir\n   = Rp24.000.000 + Rp75.000.000 - Rp19.000.000 = Rp80.000.000.\n2. Total Biaya Produksi = BBB (Rp80.000.000) + BTKL (Rp50.000.000) + BOP (Rp40.000.000) = Rp170.000.000.\n3. Harga Pokok Produksi (COGM) = Total Biaya Produksi + WIP Awal - WIP Akhir\n   = Rp170.000.000 + Rp30.000.000 - Rp22.000.000 = Rp178.000.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'Rp162.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru mengurangkan WIP Awal (Rp30 juta) dan menambahkan WIP Akhir (Rp22 juta).',
          },
          {
            label: 'B',
            teks: 'Rp170.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Berhenti pada angka Total Biaya Produksi (Rp170 juta) tanpa menyesuaikan perubahan Barang Dalam Proses (WIP).',
          },
          {
            label: 'C',
            teks: 'Rp173.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan angka Pembelian Bahan Baku (Rp75 juta) langsung sebagai BBB tanpa menyesuaikan selisih persediaan bahan baku.',
          },
          {
            label: 'D',
            teks: 'Rp178.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: BBB terpakai Rp80 juta + BTKL Rp50 juta + BOP Rp40 juta + WIP awal Rp30 juta - WIP akhir Rp22 juta = Rp178 juta.',
          },
          {
            label: 'E',
            teks: 'Rp200.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Lupa mengurangkan Persediaan Barang Dalam Proses (WIP) Akhir sebesar Rp22.000.000.',
          },
        ],
      },
      {
        id: 'akt-mfg-3',
        nomor: 3,
        cpRef: 'Menerapkan perhitungan Harga Pokok Pesanan (Job Order Costing).',
        tpRef: 'TP 3: Menghitung pembebanan BOP berdasarkan tarif ditentukan di muka dan harga pokok per unit pesanan.',
        atpRef: 'ATP 12.3: Menghitung tarif BOP berdasarkan jam mesin/BTKL pada Kartu Harga Pokok Pesanan (L2 - C3).',
        materiSpesifik: 'Metode Harga Pokok Pesanan (Job Order Costing) dan BOP Dibebankan',
        bentukStimulus: 'Kartu Harga Pokok Pesanan Seragam Sekolah (Pesanan No. JOB-105)',
        indikatorSoal:
          'Disajikan data anggaran BOP tahunan, dasar pembebanan biaya tenaga kerja langsung, serta realisasi biaya untuk satu pesanan khusus, peserta didik dapat menghitung harga pokok produksi per unit pesanan tersebut dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'PT Konveksi Prima menerapkan sistem Harga Pokok Pesanan (Job Order Costing) dan membebankan Biaya Overhead Pabrik (BOP) dengan tarif ditentukan di muka sebesar 75% dari Biaya Tenaga Kerja Langsung (BTKL). Pada bulan Agustus 2026, perusahaan menyelesaikan Pesanan No. JOB-105 sebanyak 500 stel seragam olahraga dengan rincian biaya aktual:\n• Biaya Bahan Baku Langsung: Rp22.500.000,00\n• Biaya Tenaga Kerja Langsung: Rp16.000.000,00\n• BOP Sesungguhnya seluruh pabrik bulan Agustus: Rp48.000.000,00',
        pokokSoal:
          'Harga pokok produksi per stel seragam untuk Pesanan No. JOB-105 adalah sebesar ....',
        kunciJawaban: 'B',
        pembahasan:
          'Dalam sistem Job Order Costing, BOP yang masuk ke Kartu Harga Pokok Pesanan adalah BOP Dibebankan (Applied Overhead), bukan BOP sesungguhnya seluruh pabrik:\n1. BBB = Rp22.500.000\n2. BTKL = Rp16.000.000\n3. BOP Dibebankan = 75% × Rp16.000.000 = Rp12.000.000\n4. Total Harga Pokok Pesanan JOB-105 = Rp22.500.000 + Rp16.000.000 + Rp12.000.000 = Rp50.500.000.\n5. Harga Pokok per stel (500 stel) = Rp50.500.000 / 500 = Rp101.000,00 per stel.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'Rp77.000,00 per stel',
            isKey: false,
            rasionalPengecoh:
              'Hanya menjumlahkan BBB dan BTKL (Rp38.500.000 / 500) tanpa membebankan BOP.',
          },
          {
            label: 'B',
            teks: 'Rp101.000,00 per stel',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: (Rp22,5 juta + Rp16 juta + Rp12 juta BOP dibebankan) / 500 stel = Rp101.000/stel.',
          },
          {
            label: 'C',
            teks: 'Rp108.750,00 per stel',
            isKey: false,
            rasionalPengecoh:
              'Keliru menghitung BOP Dibebankan sebesar 75% dari Biaya Bahan Baku (75% × Rp22,5 juta), bukan dari BTKL.',
          },
          {
            label: 'D',
            teks: 'Rp145.000,00 per stel',
            isKey: false,
            rasionalPengecoh:
              'Menghitung BOP Dibebankan sebesar 75% dari BOP Sesungguhnya seluruh pabrik (75% × Rp48 juta).',
          },
          {
            label: 'E',
            teks: 'Rp173.000,00 per stel',
            isKey: false,
            rasionalPengecoh:
              'Memasukkan seluruh BOP Sesungguhnya pabrik (Rp48 juta) ke dalam satu pesanan JOB-105.',
          },
        ],
      },
      {
        id: 'akt-mfg-4',
        nomor: 4,
        cpRef: 'Menganalisis selisih Biaya Overhead Pabrik (Underapplied / Overapplied BOP).',
        tpRef: 'TP 3: Menganalisis selisih BOP dan jurnal penutupannya ke Harga Pokok Penjualan.',
        atpRef: 'ATP 12.3: Menganalisis BOP Kurang/Lebih Dibebankan (Under/Overapplied) dan penyesuaian HPP (L3 - C4).',
        materiSpesifik: 'Analisis Selisih BOP (Underapplied vs Overapplied Overhead)',
        bentukStimulus: 'Data Anggaran dan Realisasi Jam Mesin serta BOP Tahunan',
        indikatorSoal:
          'Disajikan data anggaran BOP, estimasi jam mesin, realisasi jam mesin aktual, dan BOP sesungguhnya yang terjadi, peserta didik dapat menganalisis status pembebanan BOP (kurang/lebih dibebankan) dan dampaknya terhadap Harga Pokok Penjualan dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'Pada awal tahun 2026, PT Baja Perkasa menetapkan anggaran Biaya Overhead Pabrik (BOP) sebesar Rp360.000.000,00 dengan taksiran aktivitas normal sebanyak 18.000 jam mesin. Sepanjang tahun 2026, pabrik beroperasi selama 19.200 jam mesin aktual dan total BOP Sesungguhnya yang dikeluarkan berjumlah Rp391.500.000,00. Selisih BOP ditutup langsung ke akun Harga Pokok Penjualan (HPP).',
        pokokSoal:
          'Berdasarkan analisis biaya overhead pabrik tersebut, simpulan mengenai selisih BOP tahun 2026 dan jurnal penutupannya terhadap HPP adalah ....',
        kunciJawaban: 'A',
        pembahasan:
          '1. Tarif BOP per jam mesin = Rp360.000.000 / 18.000 jam = Rp20.000 per jam mesin.\n2. BOP Dibebankan (Applied BOP) tahun 2026 = 19.200 jam aktual × Rp20.000 = Rp384.000.000.\n3. BOP Sesungguhnya (Actual BOP) = Rp391.500.000.\n4. Karena BOP Dibebankan (Rp384.000.000) < BOP Sesungguhnya (Rp391.500.000), maka terjadi BOP Kurang Dibebankan (Underapplied Overhead) sebesar Rp7.500.000.\n5. Karena biaya yang dibebankan ke produk selama ini kurang Rp7.500.000 dari biaya sebenarnya, maka penutupannya MENAMBAH (Mendebit) Harga Pokok Penjualan sebesar Rp7.500.000 dan Mengkredit Selisih BOP Rp7.500.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Terjadi BOP Kurang Dibebankan (Underapplied) sebesar Rp7.500.000,00 yang ditutup dengan mendebit Harga Pokok Penjualan Rp7.500.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Applied BOP Rp384 juta < Actual BOP Rp391,5 juta (Underapplied Rp7,5 juta), sehingga HPP didebit (bertambah) Rp7,5 juta.',
          },
          {
            label: 'B',
            teks: 'Terjadi BOP Lebih Dibebankan (Overapplied) sebesar Rp7.500.000,00 yang ditutup dengan mengkredit Harga Pokok Penjualan Rp7.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Salah menafsirkan kondisi Actual > Applied sebagai Overapplied.',
          },
          {
            label: 'C',
            teks: 'Terjadi BOP Kurang Dibebankan (Underapplied) sebesar Rp31.500.000,00 dari selisih BOP Sesungguhnya dan Anggaran BOP awal',
            isKey: false,
            rasionalPengecoh:
              'Membandingkan BOP Sesungguhnya dengan Anggaran Statis (Rp360 juta), bukan dengan BOP Dibebankan pada jam aktual (Rp384 juta).',
          },
          {
            label: 'D',
            teks: 'Terjadi BOP Kurang Dibebankan (Underapplied) sebesar Rp7.500.000,00 yang ditutup dengan mengkredit Harga Pokok Penjualan Rp7.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Nominal dan istilah Underapplied sudah benar, tetapi salah mengkredit HPP (seharusnya didebit karena beban sesungguhnya lebih besar).',
          },
          {
            label: 'E',
            teks: 'Terjadi BOP Lebih Dibebankan (Overapplied) sebesar Rp24.000.000,00 karena jam mesin aktual melebihi taksiran sebesar 1.200 jam',
            isKey: false,
            rasionalPengecoh:
              'Hanya menghitung selisih volume jam mesin (1.200 jam × Rp20.000) tanpa melihat BOP Sesungguhnya.',
          },
        ],
      },
      {
        id: 'akt-mfg-5',
        nomor: 5,
        cpRef: 'Mengevaluasi Laporan Laba Rugi dan Harga Pokok Penjualan perusahaan manufaktur.',
        tpRef: 'TP 2: Mengevaluasi keterkaitan Harga Pokok Produksi, Persediaan Produk Jadi, dan Laba Kotor.',
        atpRef: 'ATP 12.3: Mengevaluasi strategi harga jual dan Laba Kotor dari data mutasi Produk Jadi (L3 - C5).',
        materiSpesifik: 'Evaluasi Harga Pokok Penjualan (COGS) dan Margin Laba Kotor Manufaktur',
        bentukStimulus: 'Data Produksi, Persediaan Produk Jadi, dan Target Margin Laba Kotor',
        indikatorSoal:
          'Disajikan data Harga Pokok Produksi, kuantitas produksi, persediaan produk jadi awal dan akhir (menggunakan metode rata-rata/FIFO), serta target persentase margin laba kotor, peserta didik dapat mengevaluasi nilai Harga Pokok Penjualan dan total nilai penjualan yang harus dicapai dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C5 - Mengevaluasi',
        stimulus:
          'Pada kuartal IV tahun 2026, PT Elektronik Nusantara memiliki Persediaan Produk Jadi Awal senilai Rp45.000.000,00. Selama kuartal tersebut, pabrik berhasil menyelesaikan produk baru dengan total Harga Pokok Produksi (COGM) sebesar Rp255.000.000,00. Pada akhir kuartal IV, nilai Persediaan Produk Jadi Akhir yang belum terjual di gudang tercatat sebesar Rp60.000.000,00. Manajemen menetapkan kebijakan bahwa perusahaan harus mencapai Margin Laba Kotor (Gross Profit Margin) sebesar 25% dari nilai Penjualan Bersih.',
        pokokSoal:
          'Agar target Margin Laba Kotor 25% dari Penjualan Bersih tersebut tercapai, maka besarnya Harga Pokok Penjualan (HPP) dan nilai Penjualan Bersih minimum yang harus dibukukan PT Elektronik Nusantara adalah ....',
        kunciJawaban: 'E',
        pembahasan:
          '1. Barang Tersedia untuk Dijual = Produk Jadi Awal + Harga Pokok Produksi\n   = Rp45.000.000 + Rp255.000.000 = Rp300.000.000.\n2. Harga Pokok Penjualan (HPP / COGS) = Rp300.000.000 - Produk Jadi Akhir (Rp60.000.000) = Rp240.000.000.\n3. Jika Margin Laba Kotor = 25% dari Penjualan Bersih, maka rasio HPP terhadap Penjualan Bersih adalah (100% - 25%) = 75% dari Penjualan Bersih.\n4. Penjualan Bersih = HPP / 0,75 = Rp240.000.000 / 0,75 = Rp320.000.000.\n   (Bukti: Laba Kotor = Rp320.000.000 - Rp240.000.000 = Rp80.000.000, yang merupakan 25% dari Rp320.000.000).',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'HPP sebesar Rp240.000.000,00 dan Penjualan Bersih sebesar Rp300.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan klasik: menghitung harga jual dengan menambahkan markup 25% dari HPP (125% × Rp240 juta = Rp300 juta), padahal target 25% adalah Gross Profit Margin dari Penjualan (bukan Markup on Cost).',
          },
          {
            label: 'B',
            teks: 'HPP sebesar Rp270.000.000,00 dan Penjualan Bersih sebesar Rp360.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru membalik Persediaan Produk Jadi Awal (dikurangkan) dan Produk Jadi Akhir (ditambahkan) saat menghitung HPP.',
          },
          {
            label: 'C',
            teks: 'HPP sebesar Rp255.000.000,00 dan Penjualan Bersih sebesar Rp340.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menyamakan Harga Pokok Produksi (Rp255 juta) langsung sebagai Harga Pokok Penjualan tanpa menyesuaikan perubahan persediaan produk jadi.',
          },
          {
            label: 'D',
            teks: 'HPP sebesar Rp300.000.000,00 dan Penjualan Bersih sebesar Rp400.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Lupa mengurangkan Persediaan Produk Jadi Akhir sebesar Rp60.000.000 dari Barang Tersedia untuk Dijual.',
          },
          {
            label: 'E',
            teks: 'HPP sebesar Rp240.000.000,00 dan Penjualan Bersih sebesar Rp320.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: HPP = 45 jt + 255 jt - 60 jt = Rp240 juta; Penjualan Bersih = Rp240 juta / (1 - 0,25) = Rp320 juta.',
          },
        ],
      },
    ],
  },
  {
    id: 'akuntansi-perpajakan',
    judulPreset: 'Administrasi Pajak — PPh Pasal 21, PPh Final UMKM & PPN (Fase F / Kelas XI-XII)',
    kategori: 'Perpajakan',
    config: {
      namaSekolah: 'SMK Negeri 1 Akuntansi & Keuangan',
      mataPelajaran: 'Administrasi Pajak (Perpajakan)',
      jenjangFase: 'Fase F (Kelas 11-12 SMA/SMK)',
      kelasSemester: 'XI AKL / Genap',
      tahunAjaran: '2026/2027',
      penyusun: 'Tim MGMP Perpajakan & Akuntansi',
      materiPokok:
        'Perhitungan Pajak Penghasilan (PPh) Pasal 21 Pegawai Tetap, PPh Final PP 55 Tahun 2022 (UMKM), serta Mekanisme Pajak Pertambahan Nilai (PPN Masukan & PPN Keluaran)',
      ringkasanMateri: `1. Pajak Penghasilan Pasal 21 (PPh Pasal 21) & PTKP:
- Penghasilan Bruto = Gaji Pokok + Tunjangan Tetap + Premi JKK/JKM yang dibayar pemberi kerja.
- Pengurang Penghasilan Bruto: Biaya Jabatan (5% dari penghasilan bruto, maksimal Rp500.000/bulan atau Rp6.000.000/tahun) serta Iuran Pensiun/JHT yang dibayar sendiri oleh pegawai.
- Penghasilan Tidak Kena Pajak (PTKP) setahun:
  * Wajib Pajak Orang Pribadi (TK/0): Rp54.000.000
  * Tambahan WP Kawin (K): Rp4.500.000
  * Tambahan per tanggungan keluarga sedarah/semenda (maksimal 3 orang): Rp4.500.000 per orang.
- Tarif Pasal 17 UU HPP (Lapisan PKP Tahunan):
  * Lapis 1 (Rp0 s.d. Rp60.000.000): 5%
  * Lapis 2 (>Rp60.000.000 s.d. Rp250.000.000): 15%

2. PPh Final UMKM (PP No. 55 Tahun 2022):
- Tarif 0,5% dari peredaran bruto (omzet) bulanan bagi WP Badan/Orang Pribadi dengan omzet <= Rp4,8 miliar setahun.
- Khusus WP Orang Pribadi UMKM: bagian peredaran bruto sampai dengan Rp500.000.000 dalam 1 tahun pajak TIDAK dikenai PPh Final 0,5%.

3. Pajak Pertambahan Nilai (PPN - Tarif 11%):
- PPN Keluaran (Output Tax): Dipungut oleh Pengusaha Kena Pajak (PKP) saat menjual Barang/Jasa Kena Pajak (dicatat di sisi Kredit).
- PPN Masukan (Input Tax): Dibayar oleh PKP saat membeli Barang/Jasa Kena Pajak yang dapat dikreditkan (dicatat di sisi Debit).
- Selisih: Jika PPN Keluaran > PPN Masukan -> PPN Kurang Bayar (disetor ke kas negara). Jika PPN Keluaran < PPN Masukan -> PPN Lebih Bayar (dikompensasi/direstitusi).`,
      capaianPembelajaran:
        'Pada akhir Fase F, peserta didik mampu memahami ketentuan umum dan tata cara perpajakan (KUP), menghitung Pajak Penghasilan (PPh) Pasal 21, PPh Final UMKM, serta menghitung dan mencatat Pajak Pertambahan Nilai (PPN Keluaran dan PPN Masukan) dalam pembukuan akuntansi.',
      tujuanPembelajaran:
        '1. Menentukan besaran Penghasilan Tidak Kena Pajak (PTKP) dan Penghasilan Kena Pajak (PKP) Wajib Pajak Orang Pribadi.\n2. Menghitung PPh Pasal 21 terutang pegawai tetap sesuai lapisan tarif UU HPP.\n3. Menganalisis perhitungan dan penjurnalan PPN Keluaran, PPN Masukan, serta PPh Final UMKM berdasarkan batas omzet bebas pajak.',
      alurTujuanPembelajaran:
        'ATP 11.1: Menentukan status dan nilai PTKP (TK/0, K/0 s.d. K/3) sesuai ketentuan perpajakan (L1 - C2).\nATP 11.2: Menghitung PPh Pasal 21 tahunan dan bulanan pegawai tetap beserta Biaya Jabatan (L2 - C3).\nATP 11.3: Menganalisis mekanisme pengkreditan PPN Masukan terhadap PPN Keluaran serta perhitungan PPh Final UMKM (L3 - C4).',
      jumlahSoal: 5,
      jumlahOpsi: 5,
      proporsiL1: 20,
      proporsiL2: 40,
      proporsiL3: 40,
      waktuUjianMenit: 35,
      kkm: 75,
    },
    sampleItems: [
      {
        id: 'akt-pajak-1',
        nomor: 1,
        cpRef: 'Memahami penentuan status Penghasilan Tidak Kena Pajak (PTKP) Wajib Pajak Orang Pribadi.',
        tpRef: 'TP 1: Menentukan besaran PTKP Wajib Pajak Orang Pribadi sesuai status tanggungan.',
        atpRef: 'ATP 11.1: Menentukan status dan nilai PTKP sesuai ketentuan UU HPP (L1 - C2).',
        materiSpesifik: 'Penentuan Status dan Nilai Penghasilan Tidak Kena Pajak (PTKP)',
        bentukStimulus: 'Data Keluarga Wajib Pajak Orang Pribadi pada Awal Tahun Pajak',
        indikatorSoal:
          'Disajikan data status perkawinan dan anggota keluarga yang menjadi tanggungan Wajib Pajak pada awal tahun pajak, peserta didik dapat menentukan kode status PTKP dan jumlah PTKP setahun dengan tepat.',
        levelKognitif: 'L1',
        dimensiBloom: 'C2 - Memahami',
        stimulus:
          'Bapak Hendra bekerja sebagai manajer akuntansi di PT Sinar Mas. Berdasarkan kondisi per 1 Januari 2026, Bapak Hendra berstatus menikah (istri tidak bekerja/tidak memiliki penghasilan) dan tinggal bersama 2 orang anak kandung yang masih sekolah, 1 orang ibu mertua yang sudah pensiun dan tidak berpenghasilan, serta 1 orang adik kandung yang masih kuliah.',
        pokokSoal:
          'Berdasarkan ketentuan perpajakan yang berlaku di Indonesia, status PTKP dan besarnya nilai PTKP setahun untuk Bapak Hendra pada tahun pajak 2026 adalah ....',
        kunciJawaban: 'D',
        pembahasan:
          'Anggota keluarga yang dapat menjadi tanggungan PTKP adalah keluarga sedarah dan keluarga semenda dalam garis keturunan lurus (orang tua, mertua, anak kandung/anak angkat) maksimal 3 orang.\nAdik kandung merupakan garis keturunan ke samping sehingga TIDAK dapat masuk tanggungan PTKP.\nDengan demikian tanggungan yang memenuhi syarat adalah 2 anak kandung + 1 ibu mertua = 3 tanggungan (Status K/3).\nNilai PTKP K/3 = WP Sendiri (Rp54.000.000) + Status Kawin (Rp4.500.000) + 3 Tanggungan (3 × Rp4.500.000 = Rp13.500.000) = Rp72.000.000,00.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: 'Status K/2 dengan nilai PTKP setahun sebesar Rp67.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menganggap ibu mertua tidak termasuk keluarga semenda garis lurus yang berhak menjadi tanggungan.',
          },
          {
            label: 'B',
            teks: 'Status K/4 dengan nilai PTKP setahun sebesar Rp76.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Memasukkan adik kandung dan melampaui batas maksimal 3 orang tanggungan.',
          },
          {
            label: 'C',
            teks: 'Status TK/3 dengan nilai PTKP setahun sebesar Rp67.500.000,00',
            isKey: false,
            rasionalPengecoh:
              'Lupa menambahkan komponen status Kawin (Rp4.500.000).',
          },
          {
            label: 'D',
            teks: 'Status K/3 dengan nilai PTKP setahun sebesar Rp72.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: 2 anak kandung + 1 ibu mertua = 3 tanggungan (K/3); adik kandung tidak dihitung -> Rp54 jt + Rp4,5 jt + Rp13,5 jt = Rp72 juta.',
          },
          {
            label: 'E',
            teks: 'Status K/I/3 dengan nilai PTKP setahun sebesar Rp126.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Status K/I/3 hanya berlaku apabila penghasilan istri digabung dengan penghasilan suami, sedangkan pada soal istri tidak bekerja.',
          },
        ],
      },
      {
        id: 'akt-pajak-2',
        nomor: 2,
        cpRef: 'Menghitung PPh Pasal 21 pegawai tetap sesuai tarif progresif Pasal 17 UU HPP.',
        tpRef: 'TP 2: Menghitung PPh Pasal 21 terutang pegawai tetap beserta pengurang Biaya Jabatan.',
        atpRef: 'ATP 11.2: Menghitung PKP dan PPh Pasal 21 terutang pegawai tetap (L2 - C3).',
        materiSpesifik: 'Perhitungan PPh Pasal 21 Pegawai Tetap dan Batas Maksimum Biaya Jabatan',
        bentukStimulus: 'Slip Gaji dan Komponen Pengurang Penghasilan Pegawai Tetap',
        indikatorSoal:
          'Disajikan data gaji bulanan, tunjangan tetap, iuran pensiun yang dibayar pegawai, serta status PTKP seorang pegawai tetap, peserta didik dapat menghitung Penghasilan Kena Pajak (PKP) dan PPh Pasal 21 terutang setahun dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Saudara Raka (berstatus belum menikah dan tanpa tanggungan / TK/0, memiliki NPWP) bekerja sebagai pegawai tetap di PT Artha Digital sejak Januari 2026. Setiap bulan ia menerima Gaji Pokok sebesar Rp11.000.000,00 dan Tunjangan Tetap sebesar Rp1.000.000,00. Saudara Raka membayar iuran pensiun/JHT sendiri sebesar Rp200.000,00 per bulan.',
        pokokSoal:
          'Berdasarkan perhitungan tahunan PPh Pasal 21 sesuai lapisan tarif UU HPP, besarnya Penghasilan Kena Pajak (PKP) setahun dan PPh Pasal 21 terutang setahun untuk Saudara Raka adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          '1. Penghasilan Bruto sebulan = Rp11.000.000 + Rp1.000.000 = Rp12.000.000.\n2. Pengurang sebulan:\n   • Biaya Jabatan = 5% × Rp12.000.000 = Rp600.000 -> Namun sesuai ketentuan, batas maksimum Biaya Jabatan adalah Rp500.000/bulan.\n   • Iuran Pensiun = Rp200.000/bulan.\n   • Total Pengurang sebulan = Rp500.000 + Rp200.000 = Rp700.000.\n3. Penghasilan Neto sebulan = Rp12.000.000 - Rp700.000 = Rp11.300.000.\n4. Penghasilan Neto setahun = 12 × Rp11.300.000 = Rp135.600.000.\n5. PTKP (TK/0) = Rp54.000.000.\n6. Penghasilan Kena Pajak (PKP) setahun = Rp135.600.000 - Rp54.000.000 = Rp81.600.000.\n7. PPh Pasal 21 Terutang setahun (UU HPP):\n   • Lapis 1 (5% × Rp60.000.000) = Rp3.000.000\n   • Lapis 2 (15% × Rp21.600.000) = Rp3.240.000\n   • Total PPh Pasal 21 setahun = Rp6.240.000,00.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'PKP Rp80.400.000,00 dan PPh Pasal 21 setahun Rp6.060.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan klasik: mengurangkan Biaya Jabatan sebesar 5% penuh (Rp600.000/bulan) tanpa memperhatikan plafon maksimum Rp500.000/bulan.',
          },
          {
            label: 'B',
            teks: 'PKP Rp81.600.000,00 dan PPh Pasal 21 setahun Rp7.240.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan batas lapisan pertama UU lama (Rp50.000.000) padahal dalam UU HPP lapisan tarif 5% berlaku sampai dengan Rp60.000.000.',
          },
          {
            label: 'C',
            teks: 'PKP Rp81.600.000,00 dan PPh Pasal 21 setahun Rp6.240.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Neto setahun Rp135,6 juta - PTKP Rp54 juta = PKP Rp81,6 juta; PPh = (5% × 60 jt) + (15% × 21,6 jt) = Rp6.240.000.',
          },
          {
            label: 'D',
            teks: 'PKP Rp81.600.000,00 dan PPh Pasal 21 setahun Rp4.080.000,00',
            isKey: false,
            rasionalPengecoh:
              'Mengalikan seluruh PKP Rp81.600.000 dengan tarif tunggal 5%.',
          },
          {
            label: 'E',
            teks: 'PKP Rp84.000.000,00 dan PPh Pasal 21 setahun Rp6.600.000,00',
            isKey: false,
            rasionalPengecoh:
              'Lupa mengurangkan iuran pensiun yang dibayar sendiri oleh pegawai sebesar Rp2.400.000 setahun.',
          },
        ],
      },
      {
        id: 'akt-pajak-3',
        nomor: 3,
        cpRef: 'Menerapkan perhitungan dan pencatatan PPN Keluaran dan PPN Masukan.',
        tpRef: 'TP 3: Menganalisis perhitungan dan penjurnalan PPN Keluaran dan PPN Masukan.',
        atpRef: 'ATP 11.3: Menghitung PPN Kurang/Lebih Bayar dan mencatat jurnal penutupannya (L2 - C3).',
        materiSpesifik: 'Mekanisme Pengkreditan PPN Masukan terhadap PPN Keluaran (Tarif 11%)',
        bentukStimulus: 'Rekapitulasi Faktur Pajak Keluaran dan Faktur Pajak Masukan PKP',
        indikatorSoal:
          'Disajikan data penjualan dan pembelian kena pajak suatu Pengusaha Kena Pajak (PKP) selama satu Masa Pajak, peserta didik dapat menghitung PPN Kurang/Lebih Bayar dan menentukan jurnal akuntansinya dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'PT Prima Elektronik telah dikukuhkan sebagai Pengusaha Kena Pajak (PKP). Selama Masa Pajak Oktober 2026, perusahaan mencatat transaksi sebagai berikut (harga belum termasuk PPN 11%):\n• Total penyerahan/penjualan Barang Kena Pajak (BKP) dengan Faktur Pajak Keluaran: Rp400.000.000,00\n• Total pembelian BKP untuk kegiatan usaha dengan Faktur Pajak Masukan yang dapat dikreditkan: Rp280.000.000,00',
        pokokSoal:
          'Berdasarkan mekanisme pengkreditan PPN, perhitungan dan ayat jurnal pengakuan utang/piutang PPN pada akhir Masa Pajak Oktober 2026 yang tepat adalah ....',
        kunciJawaban: 'B',
        pembahasan:
          '1. PPN Keluaran (bersaldo Kredit) = 11% × Rp400.000.000 = Rp44.000.000.\n2. PPN Masukan (bersaldo Debit) = 11% × Rp280.000.000 = Rp30.800.000.\n3. Karena PPN Keluaran (Rp44.000.000) > PPN Masukan (Rp30.800.000), maka terdapat PPN Kurang Bayar (Utang PPN) sebesar Rp13.200.000.\n4. Jurnal pengkreditan/penutupan akhir bulan:\n   (Debit) PPN Keluaran Rp44.000.000\n   (Kredit) PPN Masukan Rp30.800.000\n   (Kredit) Utang PPN (PPN Kurang Bayar) Rp13.200.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: 'PPN Lebih Bayar Rp13.200.000; dijurnal (Debit) Piutang PPN Rp13.200.000 dan PPN Keluaran Rp30.800.000, (Kredit) PPN Masukan Rp44.000.000',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan konsep PPN Keluaran (atas penjualan) dan PPN Masukan (atas pembelian).',
          },
          {
            label: 'B',
            teks: 'PPN Kurang Bayar Rp13.200.000; dijurnal (Debit) PPN Keluaran Rp44.000.000, (Kredit) PPN Masukan Rp30.800.000 dan Utang PPN Rp13.200.000',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: PPN Keluaran Rp44 juta ditutup di Debit, PPN Masukan Rp30,8 juta ditutup di Kredit, dan selisihnya Rp13,2 juta diakui sebagai Utang PPN di Kredit.',
          },
          {
            label: 'C',
            teks: 'PPN Kurang Bayar Rp12.000.000; dijurnal (Debit) PPN Keluaran Rp40.000.000, (Kredit) PPN Masukan Rp28.000.000 dan Utang PPN Rp12.000.000',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan tarif PPN lama 10% (seharusnya 11%).',
          },
          {
            label: 'D',
            teks: 'PPN Kurang Bayar Rp13.200.000; dijurnal (Debit) PPN Masukan Rp30.800.000 dan Beban PPN Rp13.200.000, (Kredit) PPN Keluaran Rp44.000.000',
            isKey: false,
            rasionalPengecoh:
              'Posisi Debit/Kredit penutupan akun PPN Keluaran dan PPN Masukan terbalik.',
          },
          {
            label: 'E',
            teks: 'PPN Kurang Bayar Rp44.000.000 karena PPN Masukan atas pembelian barang dagang tidak pernah boleh dikreditkan',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi: PPN Masukan yang berhubungan langsung dengan kegiatan usaha PKP dapat dikreditkan.',
          },
        ],
      },
      {
        id: 'akt-pajak-4',
        nomor: 4,
        cpRef: 'Menganalisis perhitungan PPh Final UMKM sesuai PP No. 55 Tahun 2022.',
        tpRef: 'TP 3: Menganalisis perhitungan PPh Final UMKM Orang Pribadi dengan batas peredaran bruto tidak kena pajak Rp500 juta.',
        atpRef: 'ATP 11.3: Menganalisis omzet kumulatif WP Orang Pribadi UMKM dan PPh Final 0,5% (L3 - C4).',
        materiSpesifik: 'PPh Final UMKM Orang Pribadi (Batas Omzet Tidak Kena Pajak Rp500 Juta)',
        bentukStimulus: 'Tabel Peredaran Bruto Bulanan Wajib Pajak Orang Pribadi UMKM',
        indikatorSoal:
          'Disajikan tabel peredaran bruto (omzet) kumulatif seorang Wajib Pajak Orang Pribadi UMKM dari bulan Januari hingga Juni, peserta didik dapat menganalisis besarnya PPh Final 0,5% yang wajib disetor pada bulan saat omzet kumulatif mulai melampaui Rp500.000.000 dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'Ibu Kartika merupakan Wajib Pajak Orang Pribadi pemilik usaha toko bahan kue yang memanfaatkan tarif PPh Final UMKM 0,5% sesuai PP Nomor 55 Tahun 2022. Rincian peredaran bruto (omzet) usaha Ibu Kartika pada semester I tahun 2026 adalah sebagai berikut:\n• Januari 2026: Rp90.000.000,00\n• Februari 2026: Rp110.000.000,00\n• Maret 2026: Rp120.000.000,00\n• April 2026: Rp130.000.000,00\n• Mei 2026: Rp110.000.000,00\n• Juni 2026: Rp140.000.000,00',
        pokokSoal:
          'Berdasarkan ketentuan batas peredaran bruto tidak kena pajak Rp500.000.000,00 bagi Wajib Pajak Orang Pribadi UMKM, besarnya PPh Final yang harus disetor Ibu Kartika untuk Masa Pajak Mei 2026 dan Masa Pajak Juni 2026 berturut-turut adalah ....',
        kunciJawaban: 'A',
        pembahasan:
          '1. Omzet kumulatif Januari s.d. April 2026 = Rp90 jt + Rp110 jt + Rp120 jt + Rp130 jt = Rp450.000.000 (masih di bawah Rp500 juta -> PPh Final Rp0).\n2. Pada bulan Mei 2026 (omzet Rp110.000.000), omzet kumulatif menjadi Rp450.000.000 + Rp110.000.000 = Rp560.000.000.\n   Bagian yang melampaui Rp500.000.000 pada bulan Mei = Rp560.000.000 - Rp500.000.000 = Rp60.000.000.\n   Maka PPh Final bulan Mei 2026 = 0,5% × Rp60.000.000 = Rp300.000,00.\n3. Pada bulan Juni 2026 (omzet Rp140.000.000), karena kuota bebas pajak Rp500 juta sudah habis di bulan Mei, maka seluruh omzet bulan Juni dikenai tarif 0,5%:\n   PPh Final bulan Juni 2026 = 0,5% × Rp140.000.000 = Rp700.000,00.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Masa Pajak Mei sebesar Rp300.000,00 dan Masa Pajak Juni sebesar Rp700.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Pada bulan Mei omzet kumulatif Rp560 juta sehingga yang kena pajak Rp60 juta × 0,5% = Rp300.000; pada bulan Juni Rp140 juta × 0,5% = Rp700.000.',
          },
          {
            label: 'B',
            teks: 'Masa Pajak Mei sebesar Rp550.000,00 dan Masa Pajak Juni sebesar Rp700.000,00',
            isKey: false,
            rasionalPengecoh:
              'Jebakan menghitung PPh Mei dari seluruh omzet bulan Mei (0,5% × Rp110 juta) tanpa memotong sisa kuota bebas pajak Rp50 juta.',
          },
          {
            label: 'C',
            teks: 'Masa Pajak Mei sebesar Rp2.800.000,00 dan Masa Pajak Juni sebesar Rp700.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menghitung pajak bulan Mei dari total omzet kumulatif Rp560.000.000 secara surut.',
          },
          {
            label: 'D',
            teks: 'Masa Pajak Mei sebesar Rp0,00 dan Masa Pajak Juni sebesar Rp1.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Salah menjumlahkan omzet kumulatif Januari–Mei.',
          },
          {
            label: 'E',
            teks: 'Masa Pajak Mei sebesar Rp600.000,00 dan Masa Pajak Juni sebesar Rp1.400.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan tarif PPh Final lama 1% (seharusnya 0,5%).',
          },
        ],
      },
      {
        id: 'akt-pajak-5',
        nomor: 5,
        cpRef: 'Mengevaluasi rekonsiliasi fiskal antara Laba Komersial dan Laba Fiskal.',
        tpRef: 'TP 3: Mengevaluasi Koreksi Fiskal Positif dan Koreksi Fiskal Negatif dalam perhitungan PPh Badan.',
        atpRef: 'ATP 11.3: Mengevaluasi biaya yang tidak boleh dikurangkan (Non-Deductible Expense) pada Rekonsiliasi Fiskal (L3 - C5).',
        materiSpesifik: 'Rekonsiliasi Fiskal (Koreksi Fiskal Positif vs Negatif)',
        bentukStimulus: 'Data Laporan Laba Rugi Komersial dan Temuan Biaya Non-Deductible',
        indikatorSoal:
          'Disajikan data Laba Bersih Komersial sebelum pajak beserta beberapa pos beban dan penghasilan yang memerlukan koreksi fiskal sesuai UU PPh, peserta didik dapat mengevaluasi jenis koreksi fiskal dan menghitung Laba Neto Fiskal dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C5 - Mengevaluasi',
        stimulus:
          'PT Nusantara Karya mencatat Laba Bersih Komersial sebelum pajak untuk tahun buku 2026 sebesar Rp650.000.000,00. Dalam penyusunan Rekonsiliasi Fiskal untuk SPT Tahunan PPh Badan, ditemukan pos-pos berikut yang sudah masuk dalam perhitungan laba komersial:\n1. Beban sanksi administrasi dan denda keterlambatan pajak sebesar Rp15.000.000,00.\n2. Beban sumbangan perayaan ulang tahun kota (bukan sumbangan bencana nasional) sebesar Rp25.000.000,00.\n3. Pendapatan jasa giro (bunga bank) yang telah dipotong PPh Final Pasal 4 ayat (2) sebesar Rp18.000.000,00.',
        pokokSoal:
          'Berdasarkan evaluasi ketentuan perpajakan (Pasal 4 ayat 2 dan Pasal 9 UU PPh), penyesuaian rekonsiliasi fiskal dan besarnya Penghasilan Neto Fiskal PT Nusantara Karya tahun 2026 adalah ....',
        kunciJawaban: 'E',
        pembahasan:
          '1. Beban denda pajak (Rp15.000.000) dan sumbangan tidak memenuhi syarat (Rp25.000.000) merupakan Non-Deductible Expense (Pasal 9 UU PPh). Karena beban tersebut tidak boleh mengurangi penghasilan secara fiskal, maka dilakukan Koreksi Fiskal Positif (menambah laba fiskal) sebesar Rp15.000.000 + Rp25.000.000 = +Rp40.000.000.\n2. Pendapatan jasa giro (Rp18.000.000) sudah dikenakan PPh Final, sehingga tidak boleh digabungkan lagi dalam penghasilan kena pajak tarif umum -> dilakukan Koreksi Fiskal Negatif (mengurangi laba fiskal) sebesar -Rp18.000.000.\n3. Penghasilan Neto Fiskal = Rp650.000.000 + Rp40.000.000 - Rp18.000.000 = Rp672.000.000,00.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Koreksi Fiskal Negatif Rp40.000.000 dan Koreksi Fiskal Positif Rp18.000.000; Penghasilan Neto Fiskal Rp628.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Membalikkan pengertian Koreksi Fiskal Positif dan Koreksi Fiskal Negatif.',
          },
          {
            label: 'B',
            teks: 'Koreksi Fiskal Positif sebesar Rp58.000.000 atas ketiga pos tersebut; Penghasilan Neto Fiskal Rp708.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Keliru melakukan koreksi positif atas pendapatan jasa giro yang sudah dikenai PPh Final.',
          },
          {
            label: 'C',
            teks: 'Koreksi Fiskal Positif Rp25.000.000 dan Koreksi Fiskal Negatif Rp33.000.000; Penghasilan Neto Fiskal Rp642.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Menganggap denda pajak boleh menjadi pengurang penghasilan bruto (deductible expense).',
          },
          {
            label: 'D',
            teks: 'Koreksi Fiskal Positif Rp40.000.000 tanpa mengoreksi pendapatan jasa giro; Penghasilan Neto Fiskal Rp690.000.000,00',
            isKey: false,
            rasionalPengecoh:
              'Lupa mengeluarkan penghasilan bunga bank yang telah dikenai PPh Final Pasal 4 ayat (2).',
          },
          {
            label: 'E',
            teks: 'Koreksi Fiskal Positif Rp40.000.000 (denda pajak & sumbangan) dan Koreksi Fiskal Negatif Rp18.000.000 (jasa giro); Penghasilan Neto Fiskal Rp672.000.000,00',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Laba komersial Rp650 juta + Koreksi Positif Rp40 juta - Koreksi Negatif Rp18 juta = Rp672 juta.',
          },
        ],
      },
    ],
  },
  {
    id: 'komputer-akuntansi-spreadsheet',
    judulPreset: 'Komputer Akuntansi & Aplikasi Pengolah Angka / Spreadsheet (Fase E-F)',
    kategori: 'Komputer Akuntansi & Teknologi Keuangan',
    config: {
      namaSekolah: 'SMK Negeri 1 Akuntansi & Keuangan',
      mataPelajaran: 'Komputer Akuntansi & Aplikasi Pengolah Angka (Spreadsheet)',
      jenjangFase: 'Fase F (Kelas 11-12 SMA/SMK)',
      kelasSemester: 'XI AKL / Ganjil',
      tahunAjaran: '2026/2027',
      penyusun: 'Tim MGMP Komputer Akuntansi',
      materiPokok:
        'Otomatisasi Siklus Akuntansi pada Spreadsheet (Fungsi Logika IF, VLOOKUP, SUMIF, SLN/DDB) dan Pengaturan Linked Accounts pada Aplikasi Komputer Akuntansi',
      ringkasanMateri: `1. Rumus Spreadsheet untuk Siklus Akuntansi:
- VLOOKUP: =VLOOKUP(lookup_value; table_array; col_index_num; FALSE) digunakan pada Jurnal Umum dan Buku Besar untuk mengambil Nama Akun atau Saldo Normal secara otomatis dari tabel Daftar Akun (Chart of Accounts).
- SUMIF / SUMIFS: =SUMIF(range_kode_akun; kriteria_kode; sum_range_debit) digunakan untuk merekapitulasi mutasi Debit dan Kredit dari Jurnal Umum ke Neraca Saldo (Trial Balance) secara otomatis.
- Fungsi Penyusutan Aset Tetap:
  * =SLN(cost; salvage; life) untuk penyusutan metode Garis Lurus (Straight-Line).
  * =DDB(cost; salvage; life; period) untuk penyusutan metode Saldo Menurun Ganda (Double Declining Balance).
  * =SYD(cost; salvage; life; period) untuk metode Jumlah Angka Tahun.

2. Pengaturan Linked Accounts & Tax Codes pada Aplikasi Komputer Akuntansi (MYOB / Accurate):
- Accounts & Banking Linked Accounts: Historical Balancing (penyeimbang saldo awal), Electronic Clearing Account, Undeposited Funds.
- Sales Linked Accounts: Asset Account for Tracking Receivables (Piutang Dagang / Trade Debtors), Bank Account for Customer Receipts, Income Account for Freight (Pendapatan Angkut), Expense or Cost of Sales Account for Discounts (Potongan Penjualan).
- Purchases Linked Accounts: Liability Account for Tracking Payables (Utang Dagang / Trade Creditors), Expense or Cost of Sales Account for Freight (Beban Angkut Pembelian), Account for Item Receipts Without Bills.`,
      capaianPembelajaran:
        'Pada akhir Fase F, peserta didik mampu mengoperasikan aplikasi pengolah angka (spreadsheet) dan program komputer akuntansi untuk mengotomatisasi siklus akuntansi perusahaan jasa dan dagang secara akurat.',
      tujuanPembelajaran:
        '1. Menerapkan fungsi VLOOKUP, IF bersarang, dan SUMIF dalam pembuatan Jurnal Umum, Buku Besar, dan Neraca Saldo otomatis di spreadsheet.\n2. Menggunakan fungsi finansial penyusutan (SLN, SYD, DDB) pada tabel daftar aset tetap.\n3. Menganalisis pengaturan Daftar Akun (Header vs Detail), Linked Accounts, dan Kode Pajak (PPN) pada aplikasi komputer akuntansi.',
      alurTujuanPembelajaran:
        'ATP 11.1: Mengidentifikasi struktur argumen fungsi VLOOKUP dan fungsi finansial penyusutan SLN/DDB (L1 - C2).\nATP 11.2: Menerapkan kombinasi rumus IF dan SUMIF untuk menghitung saldo normal akun pada Neraca Saldo spreadsheet (L2 - C3).\nATP 11.3: Menganalisis konfigurasi Sales & Purchases Linked Accounts serta penyebab ketidakseimbangan Historical Balancing pada aplikasi komputer akuntansi (L3 - C4).',
      jumlahSoal: 5,
      jumlahOpsi: 5,
      proporsiL1: 20,
      proporsiL2: 40,
      proporsiL3: 40,
      waktuUjianMenit: 30,
      kkm: 75,
    },
    sampleItems: [
      {
        id: 'akt-komp-1',
        nomor: 1,
        cpRef: 'Memahami fungsi finansial penyusutan aset tetap pada aplikasi pengolah angka (spreadsheet).',
        tpRef: 'TP 2: Menggunakan fungsi finansial penyusutan (SLN, SYD, DDB) pada tabel daftar aset tetap.',
        atpRef: 'ATP 11.1: Mengidentifikasi sintaks fungsi penyusutan SLN, SYD, dan DDB (L1 - C2).',
        materiSpesifik: 'Fungsi Finansial Penyusutan Aset Tetap pada Spreadsheet (SLN, SYD, DDB)',
        bentukStimulus: 'Tabel Daftar Aset Tetap pada Lembar Kerja Spreadsheet',
        indikatorSoal:
          'Disajikan struktur sel tabel daftar aset tetap pada aplikasi spreadsheet yang memuat Harga Perolehan, Nilai Residu, Umur Ekonomis, dan Tahun Penyusutan, peserta didik dapat menentukan sintaks rumus fungsi penyusutan metode Jumlah Angka Tahun (Sum-of-the-Years-Digits) dengan tepat.',
        levelKognitif: 'L1',
        dimensiBloom: 'C2 - Memahami',
        stimulus:
          'Pada lembar kerja daftar aset tetap di aplikasi pengolah angka (Spreadsheet), data sebuah kendaraan operasional ditempatkan pada sel-sel berikut:\n• Sel C5: Harga Perolehan (Rp180.000.000)\n• Sel D5: Nilai Residu / Salvage (Rp30.000.000)\n• Sel E5: Umur Ekonomis / Life (5 tahun)\n• Sel F5: Periode tahun penyusutan yang dihitung (Tahun ke-2)',
        pokokSoal:
          'Penulisan rumus fungsi finansial pada sel G5 yang tepat untuk menghitung beban penyusutan tahun ke-2 menggunakan metode Jumlah Angka Tahun (Sum-of-the-Years\'-Digits) adalah ....',
        kunciJawaban: 'B',
        pembahasan:
          'Dalam aplikasi pengolah angka (Excel/Calc/Sheets), sintaks resmi metode Jumlah Angka Tahun adalah =SYD(cost; salvage; life; per), di mana cost = Harga Perolehan (C5), salvage = Nilai Residu (D5), life = Umur Ekonomis (E5), dan per = Periode tahun yang dihitung (F5). Fungsi SLN digunakan untuk Garis Lurus dan DDB untuk Saldo Menurun Ganda.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Mudah',
        opsi: [
          {
            label: 'A',
            teks: '=SLN(C5; D5; E5; F5)',
            isKey: false,
            rasionalPengecoh:
              'SLN adalah fungsi metode Garis Lurus (Straight-Line) dan hanya memiliki 3 argumen tanpa argumen periode.',
          },
          {
            label: 'B',
            teks: '=SYD(C5; D5; E5; F5)',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: SYD(cost; salvage; life; per) menghitung penyusutan metode Jumlah Angka Tahun secara tepat.',
          },
          {
            label: 'C',
            teks: '=DDB(C5; E5; D5; F5)',
            isKey: false,
            rasionalPengecoh:
              'DDB adalah fungsi metode Saldo Menurun Ganda dan urutan argumen salvage serta life terbalik.',
          },
          {
            label: 'D',
            teks: '=PMT(C5; D5; E5; F5)',
            isKey: false,
            rasionalPengecoh:
              'PMT adalah fungsi untuk menghitung angsuran pinjaman/anuitas, bukan penyusutan aset tetap.',
          },
          {
            label: 'E',
            teks: '=SYD(C5; E5; F5; D5)',
            isKey: false,
            rasionalPengecoh:
              'Urutan parameter fungsi SYD salah (menempatkan umur ekonomis sebagai nilai residu).',
          },
        ],
      },
      {
        id: 'akt-komp-2',
        nomor: 2,
        cpRef: 'Menerapkan rumus otomatisasi Neraca Saldo dari Jurnal Umum di spreadsheet.',
        tpRef: 'TP 1: Menerapkan kombinasi fungsi IF dan SUMIF dalam pembuatan Neraca Saldo otomatis.',
        atpRef: 'ATP 11.2: Menyusun formula IF dan SUMIF untuk menghitung saldo akhir Debit pada Neraca Saldo (L2 - C3).',
        materiSpesifik: 'Formula Otomatisasi Neraca Saldo dengan Kombinasi IF dan SUMIF',
        bentukStimulus: 'Struktur Kolom Sheet Jurnal Umum dan Sheet Neraca Saldo',
        indikatorSoal:
          'Disajikan tata letak rentang sel pada sheet Jurnal Umum dan sheet Neraca Saldo, peserta didik dapat menentukan formula kombinasi fungsi logika IF dan SUMIF untuk menampilkan saldo Debit akun pada Neraca Saldo dengan tepat.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Seorang siswa merancang buku kerja siklus akuntansi otomatis di spreadsheet dengan struktur berikut:\n• Sheet `Jurnal_Umum` memiliki Kolom B (`$B$5:$B$100`) berisi Kode Akun, Kolom E (`$E$5:$E$100`) berisi nominal Debit, dan Kolom F (`$F$5:$F$100`) berisi nominal Kredit.\n• Sheet `Neraca_Saldo` memiliki Kolom A (mulai sel `A6`) berisi Kode Akun, Kolom C (`C6`) untuk Saldo Debit, dan Kolom D (`D6`) untuk Saldo Kredit.',
        pokokSoal:
          'Formula yang tepat diketikkan pada sel `C6` (Kolom Saldo Debit di Sheet `Neraca_Saldo`) agar menampilkan selisih positif jika total mutasi Debit lebih besar daripada total mutasi Kredit, atau menampilkan 0 jika sebaliknya, adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          'Total mutasi Debit untuk kode akun A6 dihitung dengan `SUMIF(Jurnal_Umum!$B$5:$B$100; A6; Jurnal_Umum!$E$5:$E$100)`.\nTotal mutasi Kredit untuk kode akun A6 dihitung dengan `SUMIF(Jurnal_Umum!$B$5:$B$100; A6; Jurnal_Umum!$F$5:$F$100)`.\nJika Total Debit > Total Kredit, maka sel C6 menampilkan (Total Debit - Total Kredit), selain itu menampilkan 0.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: '=VLOOKUP(A6; Jurnal_Umum!$B$5:$F$100; 4; FALSE)',
            isKey: false,
            rasionalPengecoh:
              'VLOOKUP hanya mengambil nilai baris pertama yang ditemukan dan tidak menjumlahkan seluruh transaksi akun yang sama.',
          },
          {
            label: 'B',
            teks: '=SUMIF(Jurnal_Umum!$E$5:$E$100; A6; Jurnal_Umum!$B$5:$B$100)',
            isKey: false,
            rasionalPengecoh:
              'Terbalik menempatkan range kriteria (kode akun) dengan sum_range (nominal debit) serta belum mengurangkan mutasi kredit.',
          },
          {
            label: 'C',
            teks: '=IF(SUMIF(Jurnal_Umum!$B$5:$B$100;A6;Jurnal_Umum!$E$5:$E$100)>SUMIF(Jurnal_Umum!$B$5:$B$100;A6;Jurnal_Umum!$F$5:$F$100); SUMIF(Jurnal_Umum!$B$5:$B$100;A6;Jurnal_Umum!$E$5:$E$100)-SUMIF(Jurnal_Umum!$B$5:$B$100;A6;Jurnal_Umum!$F$5:$F$100); 0)',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Membandingkan akumulasi mutasi Debit dan Kredit akun A6 menggunakan SUMIF dan menampilkan selisihnya jika bersaldo Debit.',
          },
          {
            label: 'D',
            teks: '=IF(A6>0; SUM(Jurnal_Umum!$E$5:$E$100)-SUM(Jurnal_Umum!$F$5:$F$100); 0)',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan fungsi SUM biasa sehingga menjumlahkan seluruh akun sekaligus tanpa memfilter per kode akun A6.',
          },
          {
            label: 'E',
            teks: '=COUNTIF(Jurnal_Umum!$B$5:$B$100; A6) - COUNTIF(Jurnal_Umum!$F$5:$F$100; A6)',
            isKey: false,
            rasionalPengecoh:
              'COUNTIF hanya menghitung banyaknya frekuensi kemunculan baris transaksi, bukan menjumlahkan nilai rupiahnya.',
          },
        ],
      },
      {
        id: 'akt-komp-3',
        nomor: 3,
        cpRef: 'Menerapkan pengaturan Linked Accounts pada aplikasi komputer akuntansi.',
        tpRef: 'TP 3: Menganalisis pengaturan Sales & Purchases Linked Accounts.',
        atpRef: 'ATP 11.3: Menentukan pemasangan akun pada Sales Linked Accounts (L2 - C3).',
        materiSpesifik: 'Konfigurasi Sales Linked Accounts pada Aplikasi Komputer Akuntansi',
        bentukStimulus: 'Tampilan Jendela Setup Sales Linked Accounts',
        indikatorSoal:
          'Disajikan skenario perusahaan dagang yang memberikan potongan tunai penjualan (Sales Discount) dan memungut biaya pengiriman dari pelanggan, peserta didik dapat menentukan pengaturan akun yang tepat pada jendela Sales Linked Accounts.',
        levelKognitif: 'L2',
        dimensiBloom: 'C3 - Menerapkan',
        stimulus:
          'Pada saat melakukan pengaturan awal database perusahaan dagang di aplikasi komputer akuntansi (seperti MYOB Accounting / Accurate), pengguna membuka menu Setup -> Linked Accounts -> Sales Accounts dan mencentang opsi:\n1. "I charge freight on sales"\n2. "I track deposits collected from customers"\n3. "I give discounts for early payment"',
        pokokSoal:
          'Pasangan akun yang tepat untuk dihubungkan pada ketiga kolom isian yang muncul dari centangan di atas berturut-turut adalah ....',
        kunciJawaban: 'D',
        pembahasan:
          '1. "I charge freight on sales" (memungut ongkos angkut atas penjualan) dihubungkan ke akun Pendapatan Angkut / Freight Collected (kelompok Income/Cost of Sales).\n2. "I track deposits collected from customers" (mencatat uang muka dari pelanggan) dihubungkan ke akun Utang Uang Muka Penjualan / Customer Deposits (kelompok Liability).\n3. "I give discounts for early payment" (memberikan potongan pelunasan dipercepat kepada pelanggan) dihubungkan ke akun Potongan Penjualan / Sales Discounts.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sedang',
        opsi: [
          {
            label: 'A',
            teks: '(1) Freight Paid, (2) Accounts Receivable, (3) Purchase Discounts',
            isKey: false,
            rasionalPengecoh:
              'Freight Paid dan Purchase Discounts adalah akun untuk Purchases Linked Accounts (pembelian), bukan Sales Linked Accounts.',
          },
          {
            label: 'B',
            teks: '(1) Sales Revenue, (2) Cash in Bank, (3) Bad Debt Expense',
            isKey: false,
            rasionalPengecoh:
              'Salah menghubungkan uang muka pelanggan ke Cash in Bank dan potongan penjualan ke beban piutang tak tertagih.',
          },
          {
            label: 'C',
            teks: '(1) Late Fees Collected, (2) Prepaid Rent, (3) Sales Returns',
            isKey: false,
            rasionalPengecoh:
              'Menghubungkan ongkos angkut ke denda keterlambatan dan uang muka pelanggan ke sewa dibayar di muka.',
          },
          {
            label: 'D',
            teks: '(1) Freight Collected (Pendapatan Angkut), (2) Customer Deposits (Uang Muka Pelanggan), (3) Sales Discounts (Potongan Penjualan)',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Sesuai fungsi masing-masing linked account pada modul Sales.',
          },
          {
            label: 'E',
            teks: '(1) Historical Balancing, (2) Undeposited Funds, (3) Retained Earnings',
            isKey: false,
            rasionalPengecoh:
              'Menggunakan akun sistem dari Banking/Equity Linked Accounts.',
          },
        ],
      },
      {
        id: 'akt-komp-4',
        nomor: 4,
        cpRef: 'Menganalisis penginputan Saldo Awal Neraca (Account Opening Balances) pada komputer akuntansi.',
        tpRef: 'TP 3: Menganalisis penyebab munculnya saldo pada akun Historical Balancing saat input saldo awal.',
        atpRef: 'ATP 11.3: Menganalisis perlakuan akun kontra (Contra Account) sehingga Historical Balancing bernilai Rp0 (L3 - C4).',
        materiSpesifik: 'Analisis Akun Kontra (Contra Account) dan Historical Balancing pada Saldo Awal',
        bentukStimulus: 'Kasus Ketidakseimbangan Jendela Account Opening Balances',
        indikatorSoal:
          'Disajikan kasus munculnya angka ketidakseimbangan pada baris "Amount left to be allocated" (Historical Balancing) saat menginput Neraca Saldo Awal ke aplikasi komputer akuntansi, peserta didik dapat menganalisis penyebab kesalahan penginputan akun kontra dan cara memperbaikinya dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C4 - Menganalisis',
        stimulus:
          'Seorang staf akuntansi sedang memasukkan daftar Neraca Saldo Awal per 1 Desember 2026 (yang di kertas soal sudah seimbang antara total Debit dan Kredit) ke dalam jendela Setup -> Balances -> Account Opening Balances. Di dalam daftar tersebut terdapat akun Cadangan Kerugian Piutang (Allowance for Doubtful Debts) sebesar Rp4.000.000,00, Akumulasi Penyusutan Peralatan sebesar Rp16.000.000,00, dan Prive Pemilik sebesar Rp5.000.000,00. Seluruh angka diketik sebagai bilangan positif biasa. Akibatnya, pada bagian bawah jendela muncul "Amount left to be allocated" sebesar Rp50.000.000,00.',
        pokokSoal:
          'Berdasarkan analisis mekanisme akun kontra (contra account) pada aplikasi komputer akuntansi, penyebab munculnya selisih Rp50.000.000,00 tersebut dan langkah koreksi yang tepat adalah ....',
        kunciJawaban: 'A',
        pembahasan:
          'Pada aplikasi komputer akuntansi (seperti MYOB), seluruh akun bertipe Asset secara default dianggap bersaldo Debit, dan seluruh akun bertipe Equity dianggap bersaldo Kredit.\nAkun Cadangan Kerugian Piutang (Rp4 juta) dan Akumulasi Penyusutan Peralatan (Rp16 juta) berada di kelompok Asset tetapi bersaldo normal Kredit (Contra Asset), sedangkan Prive Pemilik (Rp5 juta) berada di kelompok Equity tetapi bersaldo normal Debit (Contra Equity).\nTotal ketiga akun kontra = Rp4.000.000 + Rp16.000.000 + Rp5.000.000 = Rp25.000.000.\nKarena diketik positif (salah sisi), maka menimbulkan selisih ganda 2 × Rp25.000.000 = Rp50.000.000. Solusinya adalah menginput ketiga akun kontra tersebut dengan tanda minus (-).',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Ketiga akun tersebut merupakan akun kontra (total Rp25.000.000) yang diketik positif sehingga menimbulkan selisih dua kali lipat (Rp50.000.000); solusinya ketik tanda minus (-) di depan angka ketiga akun tersebut',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Akun kontra bernilai total Rp25 juta yang salah tanda menyebabkan selisih 2 × Rp25 juta = Rp50 juta; harus diketik negatif (-).',
          },
          {
            label: 'B',
            teks: 'Mengubah tipe akun Cadangan Kerugian Piutang dan Akumulasi Penyusutan menjadi kelompok Liability (Utang) serta Prive menjadi kelompok Expense (Beban)',
            isKey: false,
            rasionalPengecoh:
              'Merusak struktur klasifikasi laporan posisi keuangan karena akumulasi penyusutan bukan liabilitas.',
          },
          {
            label: 'C',
            teks: 'Menghapus akun Cadangan Kerugian Piutang, Akumulasi Penyusutan, dan Prive karena aplikasi komputer akuntansi tidak mengizinkan akun kontra',
            isKey: false,
            rasionalPengecoh:
              'Miskonsepsi: aplikasi komputer akuntansi sangat mendukung akun kontra dengan pemberian tanda negatif.',
          },
          {
            label: 'D',
            teks: 'Membuat Jurnal Umum penyesuaian untuk memindahkan saldo Rp50.000.000,00 dari akun Historical Balancing ke akun Laba Ditahan (Retained Earnings)',
            isKey: false,
            rasionalPengecoh:
              'Memindahkan ke Laba Ditahan tanpa memperbaiki tanda minus pada akun kontra akan membuat nilai Aset dan Ekuitas salah saji Rp25.000.000.',
          },
          {
            label: 'E',
            teks: 'Memberikan tanda minus (-) pada akun Kas dan Piutang Dagang agar nilai "Amount left to be allocated" turun menjadi Rp0,00',
            isKey: false,
            rasionalPengecoh:
              'Kas dan Piutang Dagang adalah aset normal (bukan akun kontra) sehingga tidak boleh diberi tanda minus.',
          },
        ],
      },
      {
        id: 'akt-komp-5',
        nomor: 5,
        cpRef: 'Mengevaluasi rekonsiliasi saldo Buku Besar Umum dan Buku Besar Pembantu (Subsidiary Ledger) di komputer akuntansi.',
        tpRef: 'TP 3: Mengevaluasi penyebab munculnya Out of Balance pada Receivables/Payables Reconciliation.',
        atpRef: 'ATP 11.3: Mengevaluasi prosedur input transaksi penjualan/pembelian agar kartu piutang/utang sinkron dengan buku besar (L3 - C5).',
        materiSpesifik: 'Evaluasi Rekonsiliasi Buku Besar Piutang/Utang dengan Kartu Pembantu (Subsidiary Ledger)',
        bentukStimulus: 'Kasus Temuan Out of Balance pada Company Data Auditor',
        indikatorSoal:
          'Disajikan kasus ketidaksamaan (Out of Balance) antara saldo akun Piutang Dagang di Buku Besar Umum dan total daftar saldo Kartu Piutang Pelanggan pada pemeriksaan Company Data Auditor, peserta didik dapat mengevaluasi penyebab teknis kesalahan penginputan dan langkah perbaikannya dengan tepat.',
        levelKognitif: 'L3',
        dimensiBloom: 'C5 - Mengevaluasi',
        stimulus:
          'Saat menjalankan fitur Company Data Auditor (Reconciliation Review) pada akhir bulan di aplikasi komputer akuntansi, muncul tanda peringatan (tanda tanya merah) pada baris "Reconcile Invoices with linked Receivables Account":\n• Total of Invoices (Total Kartu Piutang Pelanggan): Rp85.000.000,00\n• Linked Receivables Account Balance (Saldo Buku Besar Piutang Dagang): Rp92.500.000,00\n• Out of Balance Amount: Rp7.500.000,00',
        pokokSoal:
          'Berdasarkan evaluasi alur modul pada aplikasi komputer akuntansi, penyebab yang paling tepat atas munculnya selisih Out of Balance sebesar Rp7.500.000,00 tersebut adalah ....',
        kunciJawaban: 'C',
        pembahasan:
          'Pada aplikasi komputer akuntansi terintegrasi, transaksi yang berkaitan dengan Piutang Dagang pelanggan WAJIB diinput melalui modul Sales (Enter Sales / Receive Payments) agar memperbarui Kartu Piutang Pelanggan (Subsidiary Ledger) sekaligus Buku Besar Piutang Dagang.\nApabila pengguna menginput transaksi yang mendebit akun Piutang Dagang sebesar Rp7.500.000 melalui menu Record Journal Entry (Jurnal Umum), maka saldo Buku Besar Piutang Dagang bertambah Rp7.500.000 (menjadi Rp92.500.000), tetapi tidak terhubung ke Kartu Pelanggan mana pun (Total of Invoices tetap Rp85.000.000), sehingga terjadi Out of Balance Rp7.500.000.',
        skorMaksimal: 1,
        estimasiKesukaranAwal: 'Sukar',
        opsi: [
          {
            label: 'A',
            teks: 'Terdapat pelunasan piutang dari pelanggan sebesar Rp7.500.000,00 yang diinput melalui menu Sales -> Receive Payments',
            isKey: false,
            rasionalPengecoh:
              'Input melalui Receive Payments memperbarui kartu piutang dan buku besar secara sinkron sehingga tidak pernah menimbulkan Out of Balance.',
          },
          {
            label: 'B',
            teks: 'Pengguna belum melakukan proses Tutup Buku Akhir Tahun (Start a New Financial Year)',
            isKey: false,
            rasionalPengecoh:
              'Tutup buku tahunan tidak menyebabkan selisih antara buku besar dan kartu pembantu.',
          },
          {
            label: 'C',
            teks: 'Terdapat jurnal yang mendebit akun Piutang Dagang sebesar Rp7.500.000,00 yang diinput secara manual melalui menu Accounts -> Record Journal Entry, sehingga tidak tercatat pada Kartu Piutang Pelanggan',
            isKey: true,
            rasionalPengecoh:
              'Kunci Jawaban Benar: Menjurnal akun kontrol Piutang Dagang via Record Journal Entry hanya mengubah Buku Besar Umum tanpa memutakhirkan Kartu Piutang (Subsidiary Ledger).',
          },
          {
            label: 'D',
            teks: 'Tarif kode pajak PPN (N-T dan PPN) belum dihubungkan dengan akun Tax Collected dan Tax Paid',
            isKey: false,
            rasionalPengecoh:
              'Pengaturan kode pajak memengaruhi akun utang/piutang pajak, bukan sinkronisasi antara kartu piutang dan akun kontrol piutang.',
          },
          {
            label: 'E',
            teks: 'Terdapat penjualan tunai sebesar Rp7.500.000,00 yang dicatat melalui menu Banking -> Receive Money',
            isKey: false,
            rasionalPengecoh:
              'Penjualan tunai di Receive Money yang langsung mengkredit penjualan tidak mengubah saldo buku besar Piutang Dagang.',
          },
        ],
      },
    ],
  },
];

