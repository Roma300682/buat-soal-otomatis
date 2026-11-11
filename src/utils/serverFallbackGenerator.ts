/**
 * Mesin Penyusun Kurikulum Merdeka (CP, TP, ATP) & Generator Butir Soal Pilihan Ganda Sistematis.
 * Menjamin penurunan CP, TP, ATP, Ringkasan Materi, Kisi-Kisi ABCD, dan Paket Soal (1–50 soal)
 * berjalan 100% bebas error baik secara mandiri maupun sebagai pendamping Gemini AI.
 */

interface TopicKnowledgeTemplate {
  keywords: RegExp;
  subTopics: string[];
  cpFocus: string;
  tpItems: string[];
  atpItems: string[];
  summaryText: string;
}

const ACCOUNTING_TOPIC_TEMPLATES: TopicKnowledgeTemplate[] = [
  {
    keywords: /kas kecil|petty cash|imprest|fluktuasi/i,
    subTopics: [
      'Pembentukan Dana Kas Kecil & Dokumen Bukti Kas Kecil (BKK/BPKK)',
      'Pencatatan Sistem Dana Tetap (Imprest Fund System)',
      'Pencatatan Sistem Dana Berfluktuasi (Fluctuating Fund System)',
      'Perhitungan Selisih Kas Kecil (Cash Short and Over) & Jurnal Penyesuaian Akhir Periode',
    ],
    cpFocus:
      'mengelola administrasi dana kas kecil (petty cash), membedakan metode pencatatan dana tetap (imprest fund system) dan metode fluktuasi (fluctuating fund system), melakukan pemeriksaan fisik kas kecil (cash opname), serta menyusun jurnal penyesuaian selisih kas kecil secara akurat',
    tpItems: [
      '1. Mengidentifikasi karakteristik, tujuan pembentukan, dokumen mutasi, dan prosedur pengendalian internal dana kas kecil (petty cash).',
      '2. Menerapkan pencatatan transaksi pembentukan, pengeluaran, dan pengisian kembali (replenishment) kas kecil menggunakan Metode Dana Tetap (Imprest) dan Metode Fluktuasi.',
      '3. Menganalisis penyebab terjadinya selisih kas kecil (kas lebih/kurang) berdasarkan berita acara pemeriksaan fisik kas (cash opname).',
      '4. Mengevaluasi dampak transaksi kas kecil yang belum diisi kembali pada akhir periode melalui penyusunan Ayat Jurnal Penyesuaian.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Memahami fungsi dana kas kecil, kelengkapan bukti pengeluaran kas kecil, serta perbedaan prinsip metode Imprest dan Fluktuasi.',
      'ATP 2 (L2 - C3): Mencatat transaksi pembentukan, pemakaian, dan pengisian kembali kas kecil ke dalam buku kas kecil dan jurnal umum.',
      'ATP 3 (L3 - C4): Menganalisis selisih antara saldo buku kas kecil dan perhitungan fisik uang tunai (cash opname) ke dalam akun Selisih Kas.',
      'ATP 4 (L3 - C5): Mengevaluasi penyajian saldo kas kecil pada Laporan Posisi Keuangan dan membuat jurnal penyesuaian akhir periode pada metode Imprest.',
    ],
    summaryText:
      'Dana Kas Kecil (Petty Cash) adalah uang tunai yang disediakan perusahaan untuk membayar pengeluaran operasional yang jumlahnya relatif kecil dan tidak ekonomis bila dibayar dengan cek. Terdapat dua metode pencatatan:\n1) Metode Dana Tetap (Imprest Fund System): saat pengeluaran kas kecil tidak langsung dijurnal (hanya diarsipkan buktinya); penjurnalan beban dilakukan saat pengisian kembali (mendebit akun Beban-beban dan mengkredit Kas di Bank). Saldo akun Kas Kecil selalu tetap kecuali ada perubahan kebijakan plafon.\n2) Metode Fluktuasi (Fluctuating Fund System): setiap terjadi pengeluaran langsung dijurnal dengan mendebit akun Beban dan mengkredit Kas Kecil, sehingga saldo buku besar Kas Kecil berubah-ubah sesuai mutasi.\n3) Pemeriksaan fisik (cash opname): jika kas fisik > saldo buku terjadi Selisih Kas Lebih (kredit), jika kas fisik < saldo buku terjadi Selisih Kas Kurang (debit).',
  },
  {
    keywords: /rekonsiliasi bank|kas di bank|rekening koran|outstanding check|deposit in transit/i,
    subTopics: [
      'Identifikasi Item Rekonsiliasi Bank (Setoran dalam Perjalanan & Cek Beredar)',
      'Analisis Jasa Giro, Beban Administrasi Bank, dan Cek Kosong (NSF Check)',
      'Penyusunan Laporan Rekonsiliasi Bank Saldo Benar (2 Kolom & 4 Kolom)',
      'Penyusunan Ayat Jurnal Penyesuaian Hasil Rekonsiliasi Bank',
    ],
    cpFocus:
      'menganalisis perbedaan antara catatan Kas di Bank menurut perusahaan dan Rekening Koran bank, menyusun laporan rekonsiliasi bank untuk menentukan saldo kas yang benar, serta mencatat ayat jurnal penyesuaian yang diperlukan',
    tpItems: [
      '1. Mengidentifikasi faktor-faktor penyebab perbedaan saldo kas menurut catatan perusahaan dan saldo menurut rekening koran bank.',
      '2. Menghitung saldo kas yang benar (adjusted cash balance) melalui penyusunan tabel Rekonsiliasi Bank.',
      '3. Menganalisis perlakuan item rekonsiliasi seperti deposit in transit, outstanding check, inkaso bank, NSF check, dan koreksi kesalahan pencatatan.',
      '4. Menyusun Ayat Jurnal Penyesuaian untuk memutakhirkan saldo akun Kas di Bank pada buku besar perusahaan.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Mengidentifikasi pengertian dan komponen rekonsiliasi bank (setoran dalam perjalanan, cek beredar, nota debit/kredit bank).',
      'ATP 2 (L2 - C3): Menghitung penyesuaian saldo kas sisi bank dan sisi perusahaan hingga mencapai saldo kas yang benar.',
      'ATP 3 (L3 - C4): Menganalisis dampak kesalahan pencatatan nominal cek oleh pemegang buku maupun pihak bank.',
      'ATP 4 (L3 - C5): Mengevaluasi hasil rekonsiliasi bank dan menyusun jurnal penyesuaian hanya untuk pos-pos yang memengaruhi catatan perusahaan.',
    ],
    summaryText:
      'Rekonsiliasi Bank adalah prosedur pengendalian internal untuk mencocokkan saldo akun Kas di Bank menurut catatan perusahaan dengan saldo menurut Rekening Koran bank.\n• Penyesuaian pada sisi Saldo Bank: (+) Setoran dalam perjalanan (Deposit in Transit), (-) Cek yang masih beredar (Outstanding Check), (+/-) Koreksi kesalahan bank.\n• Penyesuaian pada sisi Saldo Perusahaan: (+) Penerimaan tagihan/inkaso oleh bank & Pendapatan Jasa Giro/Bunga Bank, (-) Beban Administrasi Bank & Cek Kosong (NSF Check), (+/-) Koreksi kesalahan pencatatan perusahaan.\n• Hanya item penyesuaian pada sisi catatan perusahaan yang wajib dibuatkan Ayat Jurnal Penyesuaian.',
  },
  {
    keywords: /piutang|receivable|cadangan kerugian|penghapusan piutang|aging schedule|wesel tagih/i,
    subTopics: [
      'Pengakuan & Mutasi Piutang Usaha serta Kartu Piutang',
      'Penghapusan Piutang Metode Langsung (Direct Write-Off) vs Metode Cadangan (Allowance)',
      'Analisis Umur Piutang (Aging Schedule) & Estimasi Cadangan Kerugian Piutang',
      'Penyajian Nilai Realisasi Bersih (Net Realizable Value) Piutang di Neraca',
    ],
    cpFocus:
      'mengelola kartu piutang, melakukan pencatatan mutasi piutang usaha dan wesel tagih, menghitung taksiran kerugian piutang tak tertagih dengan metode langsung maupun metode cadangan (analisis umur piutang), serta menyajikan nilai realisasi bersih piutang di Laporan Posisi Keuangan',
    tpItems: [
      '1. Menjelaskan klasifikasi piutang, prosedur pencatatan kartu piutang, serta konfirmasi saldo piutang pelanggan.',
      '2. Menerapkan penjurnalan penghapusan piutang tak tertagih dan penerimaan kembali piutang yang telah dihapus dengan Metode Langsung dan Metode Cadangan.',
      '3. Menganalisis daftar umur piutang (aging schedule) untuk menentukan beban kerugian piutang dan saldo akhir Cadangan Kerugian Piutang (CKP).',
      '4. Mengevaluasi nilai realisasi bersih (Net Realizable Value) piutang usaha pada Laporan Posisi Keuangan.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Membedakan karakteristik Metode Penghapusan Langsung dan Metode Cadangan (Allowance Method) pada akuntansi piutang.',
      'ATP 2 (L2 - C3): Mencatat transaksi penghapusan piutang dan pemulihan piutang yang telah dihapus ke dalam jurnal umum.',
      'ATP 3 (L3 - C4): Menganalisis tabel umur piutang dan pengaruh saldo awal CKP (debit/kredit) terhadap besarnya penyesuaian Beban Kerugian Piutang.',
      'ATP 4 (L3 - C5): Mengevaluasi kewajaran penyajian Piutang Bersih (Net Realizable Value) dan dampaknya terhadap laba bersih perusahaan.',
    ],
    summaryText:
      'Akuntansi Piutang Usaha mengatur pengakuan, pengukuran, dan penilaian tagihan perusahaan kepada pelanggan:\n1) Metode Langsung (Direct Write-Off): kerugian baru diakui saat piutang benar-benar dipastikan tidak tertagih (Debit: Beban Kerugian Piutang, Kredit: Piutang Usaha).\n2) Metode Cadangan (Allowance Method): akhir periode dilakukan taksiran kerugian (Debit: Beban Kerugian Piutang, Kredit: Cadangan Kerugian Piutang / CKP).\n3) Pendekatan Neraca (Analisis Umur Piutang): nilai hasil perhitungan Aging Schedule merupakan target saldo akhir CKP, sehingga nilai jurnal penyesuaian harus memperhitungkan saldo CKP sebelum penyesuaian.\n4) Nilai Realisasi Bersih (NRV) = Saldo Piutang Usaha dikurangi Saldo Akhir Cadangan Kerugian Piutang.',
  },
  {
    keywords: /persediaan|inventory|fifo|lifo|average|rata-rata tertimbang|kartu persediaan|perpetual|periodik/i,
    subTopics: [
      'Sistem Pencatatan Persediaan Fisik (Periodik) vs Perpetual',
      'Perhitungan Nilai Persediaan Metode FIFO (MPKP)',
      'Perhitungan Nilai Persediaan Metode Rata-Rata Tertimbang (Weighted Average)',
      'Evaluasi Dampak Metode Penilaian Persediaan terhadap HPP dan Laba Kotor',
    ],
    cpFocus:
      'menerapkan pencatatan persediaan barang dagang dengan sistem periodik dan perpetual, menghitung harga pokok penjualan (HPP) dan nilai persediaan akhir menggunakan metode FIFO dan Rata-Rata Tertimbang, serta mengevaluasi dampaknya terhadap laporan keuangan',
    tpItems: [
      '1. Membedakan mekanisme pencatatan transaksi pembelian, retur, dan penjualan barang dagang antara Sistem Periodik (Fisik) dan Sistem Perpetual.',
      '2. Menghitung nilai Harga Pokok Penjualan (HPP) dan Persediaan Akhir pada Kartu Persediaan menggunakan metode FIFO (MPKP) dan Rata-Rata Tertimbang (Average).',
      '3. Menganalisis penyesuaian nilai persediaan berdasarkan prinsip nilai terendah antara biaya perolehan dan nilai realisasi bersih (LCNRV).',
      '4. Mengevaluasi pengaruh pemilihan metode penilaian persediaan terhadap Laba Kotor dan Pajak Penghasilan pada kondisi inflasi.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Mengidentifikasi perbedaan jurnal transaksi barang dagang pada sistem pencatatan Fisik (Periodik) dan Perpetual.',
      'ATP 2 (L2 - C3): Menyusun kartu persediaan barang dagang dan menghitung HPP dengan metode FIFO serta Rata-Rata Tertimbang.',
      'ATP 3 (L3 - C4): Menganalisis selisih fisik persediaan (stock opname) dan menyusun ayat jurnal penyesuaian persediaan.',
      'ATP 4 (L3 - C5): Mengevaluasi perbandingan Laba Kotor dan nilai persediaan akhir di Neraca antara metode FIFO dan Rata-Rata.',
    ],
    summaryText:
      'Akuntansi Persediaan mengatur pencatatan dan penilaian barang dagang:\n• Sistem Periodik (Fisik): mutasi pembelian dicatat ke akun Pembelian; HPP baru dihitung di akhir periode setelah stock opname.\n• Sistem Perpetual: setiap pembelian dan penjualan langsung memutakhirkan akun Persediaan Barang Dagang dan Harga Pokok Penjualan pada Kartu Persediaan.\n• Metode FIFO (First-In First-Out / MPKP): barang yang pertama masuk diasumsikan pertama keluar (dijual), sehingga persediaan akhir dinilai berdasarkan harga pembelian terbaru.\n• Metode Rata-Rata (Average): harga pokok per unit dihitung kembali berdasarkan rata-rata tertimbang biaya perolehan barang yang tersedia untuk dijual.',
  },
  {
    keywords: /aset tetap|aktiva tetap|penyusutan|depresiasi|garis lurus|saldo menurun|jumlah angka tahun|pelepasan aset/i,
    subTopics: [
      'Penentuan Harga Perolehan Aset Tetap (Historical Cost)',
      'Perhitungan Beban Penyusutan Metode Garis Lurus & Saldo Menurun Ganda',
      'Perhitungan Penyusutan Metode Jumlah Angka Tahun & Satuan Hasil Produksi',
      'Analisis Penghentian, Penjualan, dan Pertukaran Aset Tetap',
    ],
    cpFocus:
      'menentukan harga perolehan aset tetap, menghitung beban penyusutan dengan berbagai metode sesuai SAK, mencatat pengeluaran modal (capital expenditure) dan pengeluaran pendapatan (revenue expenditure), serta menganalisis laba/rugi pelepasan atau pertukaran aset tetap',
    tpItems: [
      '1. Menentukan komponen biaya yang dikapitalisasi ke dalam Harga Perolehan Aset Tetap serta membedakan pengeluaran modal dan pengeluaran pendapatan.',
      '2. Menghitung beban penyusutan tahunan dan penyusutan parsial menggunakan metode Garis Lurus, Saldo Menurun Ganda, Jumlah Angka Tahun, dan Unit Produksi.',
      '3. Menganalisis nilai buku aset tetap (Book Value) dan menyusun jurnal penyesuaian beban penyusutan akhir periode.',
      '4. Mengevaluasi laba atau rugi atas penjualan, penghentian, maupun pertukaran aset tetap.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Mengidentifikasi karakteristik aset tetap, komponen harga perolehan, serta perbedaan Capital Expenditure dan Revenue Expenditure.',
      'ATP 2 (L2 - C3): Menghitung beban penyusutan dan akumulasi penyusutan aset tetap dengan berbagai metode depresiasi.',
      'ATP 3 (L3 - C4): Menganalisis akumulasi penyusutan dan nilai buku aset tetap pada saat terjadi penjualan atau pertukaran aset.',
      'ATP 4 (L3 - C5): Mengevaluasi ketepatan pencatatan laba/rugi pelepasan aset tetap dan penyajiannya pada Laporan Posisi Keuangan.',
    ],
    summaryText:
      'Akuntansi Aset Tetap mencakup pengakuan harga perolehan, alokasi penyusutan, dan penghentian pengakuan:\n1) Harga Perolehan mencakup harga beli ditambah seluruh biaya yang dapat diatribusikan langsung (biaya angkut, instalasi, bea masuk, uji coba) hingga aset siap digunakan.\n2) Metode Garis Lurus: Penyusutan = (Harga Perolehan - Nilai Residu) / Umur Ekonomis.\n3) Metode Saldo Menurun Ganda: Tarif = 2 x (100% / Umur Ekonomis) dikalikan Nilai Buku Awal Tahun (tanpa dikurangi residu di awal).\n4) Nilai Buku = Harga Perolehan - Akumulasi Penyusutan. Saat aset dijual, selisih antara harga jual bersih dengan Nilai Buku diakui sebagai Laba/Rugi Pelepasan Aset Tetap.',
  },
  {
    keywords: /harga pokok produksi|akuntansi biaya|manufaktur|biaya bahan baku|biaya tenaga kerja|overhead pabrik|bop|harga pokok pesanan|harga pokok proses/i,
    subTopics: [
      'Klasifikasi Biaya Produksi (BBB, BTKL, dan BOP) & Biaya Non-Produksi',
      'Perhitungan Pemakaian Bahan Baku & Pembebanan BOP Tarif Ditentukan di Muka',
      'Penyusunan Laporan Harga Pokok Produksi (Cost of Goods Manufactured)',
      'Evaluasi Kartu Harga Pokok Pesanan (Job Order Costing) & Laba Kotor Industri',
    ],
    cpFocus:
      'mengklasifikasikan elemen biaya produksi pada perusahaan manufaktur, menghitung biaya bahan baku, tenaga kerja langsung, dan overhead pabrik, menyusun Kartu Harga Pokok Pesanan serta Laporan Harga Pokok Produksi, hingga mengevaluasi efisiensi biaya produksi',
    tpItems: [
      '1. Mengklasifikasikan Biaya Bahan Baku (BBB), Biaya Tenaga Kerja Langsung (BTKL), dan Biaya Overhead Pabrik (BOP) serta membedakan Biaya Utama (Prime Cost) dan Biaya Konversi (Conversion Cost).',
      '2. Menghitung total biaya produksi periode berjalan dan membebankan BOP berdasarkan tarif yang ditentukan di muka.',
      '3. Menganalisis mutasi Persediaan Barang Dalam Proses (WIP) awal dan akhir untuk menyusun Laporan Harga Pokok Produksi.',
      '4. Mengevaluasi selisih BOP (under/over-applied overhead) dan menghitung Harga Pokok Penjualan pada perusahaan manufaktur.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Mengklasifikasikan unsur biaya produksi langsung/tidak langsung, Prime Cost, dan Conversion Cost.',
      'ATP 2 (L2 - C3): Menghitung pemakaian bahan baku, pembebanan BOP, dan total biaya produksi pada Kartu Harga Pokok Pesanan.',
      'ATP 3 (L3 - C4): Menganalisis Laporan Harga Pokok Produksi dengan memperhitungkan Barang Dalam Proses (BDP) awal dan akhir.',
      'ATP 4 (L3 - C5): Mengevaluasi selisih BOP sesungguhnya dengan BOP dibebankan serta dampaknya terhadap Harga Pokok Penjualan.',
    ],
    summaryText:
      'Akuntansi Biaya & Manufaktur mengolah tiga komponen biaya produksi:\n1) Biaya Utama (Prime Cost) = Biaya Bahan Baku (BBB) + Biaya Tenaga Kerja Langsung (BTKL).\n2) Biaya Konversi (Conversion Cost) = BTKL + Biaya Overhead Pabrik (BOP).\n3) Total Biaya Produksi = Pemakaian BBB + BTKL + BOP Dibebankan.\n4) Harga Pokok Produksi (Cost of Goods Manufactured) = Total Biaya Produksi + Persediaan BDP Awal - Persediaan BDP Akhir.\n5) Harga Pokok Penjualan Manufaktur = Persediaan Produk Jadi Awal + Harga Pokok Produksi - Persediaan Produk Jadi Akhir.',
  },
  {
    keywords: /pajak|pph|ppn|npwp|spt|faktur pajak|pkp|ptkp|perpajakan/i,
    subTopics: [
      'Ketentuan Umum Perpajakan (KUP) & Perhitungan Penghasilan Tidak Kena Pajak (PTKP)',
      'Perhitungan PPh Pasal 21 Pegawai Tetap & Tarif Progresif Pasal 17 UU HPP',
      'Mekanisme PPN Masukan vs PPN Keluaran serta Faktur Pajak PKP',
      'Rekonsiliasi Fiskal (Koreksi Fiskal Positif & Negatif) PPh Badan',
    ],
    cpFocus:
      'memahami ketentuan umum perpajakan di Indonesia, menghitung Pajak Penghasilan (PPh Pasal 21 dan PPh Badan) serta Pajak Pertambahan Nilai (PPN), menyusun jurnal perpajakan, dan menganalisis koreksi fiskal positif serta negatif',
    tpItems: [
      '1. Menjelaskan hak dan kewajiban Wajib Pajak, tarif PTKP, serta tarif progresif Pajak Penghasilan sesuai UU Harmonisasi Peraturan Perpajakan (UU HPP).',
      '2. Menghitung PPh Pasal 21 terutang atas penghasilan pegawai tetap dengan memperhitungkan biaya jabatan, iuran pensiun, dan status PTKP.',
      '3. Menganalisis mekanisme pengkreditan Pajak Masukan terhadap Pajak Keluaran untuk menentukan PPN Kurang Bayar atau Lebih Bayar.',
      '4. Mengevaluasi laporan laba rugi komersial melalui rekonsiliasi fiskal (koreksi positif dan negatif) untuk menghitung Penghasilan Kena Pajak Badan.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Mengidentifikasi subjek/objek pajak, besaran PTKP, dan lapisan tarif progresif PPh.',
      'ATP 2 (L2 - C3): Menghitung Penghasilan Kena Pajak (PKP) dan PPh Pasal 21 terutang serta menjurnal pemotongan pajak.',
      'ATP 3 (L3 - C4): Menganalisis selisih PPN Keluaran dan PPN Masukan serta perlakuan Faktur Pajak.',
      'ATP 4 (L3 - C5): Mengevaluasi koreksi fiskal positif dan negatif pada rekonsiliasi laba komersial menjadi laba fiskal.',
    ],
    summaryText:
      'Administrasi Perpajakan mencakup perhitungan, pemotongan, penyetoran, dan pelaporan pajak:\n• PTKP Wajib Pajak Orang Pribadi: Rp54.000.000/tahun untuk WP sendiri, tambahan Rp4.500.000 untuk status kawin, dan Rp4.500.000 per tanggungan (maksimal 3 tanggungan). Biaya Jabatan = 5% dari penghasilan bruto (maksimal Rp6.000.000/tahun).\n• Tarif PPh OP (Pasal 17 UU HPP): 0–60 juta = 5%; >60–250 juta = 15%; >250–500 juta = 25%; >500 juta–5 miliar = 30%; >5 miliar = 35%.\n• Mekanisme PPN: Jika PPN Keluaran > PPN Masukan maka terjadi PPN Kurang Bayar yang wajib disetor ke kas negara; jika PPN Keluaran < PPN Masukan terjadi PPN Lebih Bayar (dikompensasi/direstitusi).\n• Rekonsiliasi Fiskal: Koreksi Fiskal Positif menambah laba fiskal (beban yang tidak diakui pajak), sedangkan Koreksi Fiskal Negatif mengurangi laba fiskal.',
  },
  {
    keywords: /perusahaan dagang|jurnal khusus|hpp|harga pokok penjualan|syarat pembayaran|potongan pembelian|potongan penjualan/i,
    subTopics: [
      'Pencatatan Dokumen Transaksi Dagang ke Jurnal Khusus (Pembelian, Penjualan, JKM, JKK)',
      'Perhitungan Potongan Tunai (Termin 2/10, n/30) & Syarat Penyerahan Barang (FOB)',
      'Perhitungan Harga Pokok Penjualan (HPP) & Laba Kotor Perusahaan Dagang',
      'Analisis Jurnal Penyesuaian Persediaan (Metode Ikhtisar Laba Rugi vs Metode HPP)',
    ],
    cpFocus:
      'menganalisis siklus akuntansi perusahaan dagang mulai dari pencatatan dokumen transaksi ke dalam jurnal khusus dan buku besar pembantu, menghitung Harga Pokok Penjualan (HPP), menyusun ayat jurnal penyesuaian persediaan, hingga menyajikan laporan keuangan perusahaan dagang',
    tpItems: [
      '1. Mengidentifikasi karakteristik perusahaan dagang, syarat pembayaran (termin kredit), syarat penyerahan barang (FOB Shipping Point & Destination), dan jenis jurnal khusus.',
      '2. Menerapkan pencatatan transaksi ke dalam Jurnal Pembelian, Jurnal Penjualan, Jurnal Penerimaan Kas, Jurnal Pengeluaran Kas, serta Buku Besar Pembantu.',
      '3. Menghitung Harga Pokok Penjualan (HPP), Penjualan Bersih, dan Laba Kotor dari data keuangan perusahaan dagang.',
      '4. Menganalisis Ayat Jurnal Penyesuaian persediaan barang dagang dengan pendekatan Ikhtisar Laba Rugi maupun pendekatan HPP serta mengevaluasi kewajaran laporan keuangan.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Memahami syarat penyerahan barang, termin pembayaran kredit, dan pemetaan transaksi ke dalam 5 jenis jurnal.',
      'ATP 2 (L2 - C3): Menghitung nilai pelunasan piutang/utang dalam masa potongan dan menghitung Harga Pokok Penjualan (HPP).',
      'ATP 3 (L3 - C4): Menganalisis jurnal penyesuaian persediaan barang dagang dan pengisian kolom Kertas Kerja (Worksheet).',
      'ATP 4 (L3 - C5): Mengevaluasi dampak kesalahan perhitungan persediaan akhir terhadap HPP, Laba Bersih, dan Ekuitas.',
    ],
    summaryText:
      'Siklus Akuntansi Perusahaan Dagang memiliki karakteristik utama berupa aktivitas pembelian dan penjualan barang dagang tanpa mengubah bentuk barang:\n1) Jurnal Khusus terdiri dari Jurnal Pembelian (pembelian kredit), Jurnal Penjualan (penjualan kredit), Jurnal Penerimaan Kas (JKM), Jurnal Pengeluaran Kas (JKK), dan Jurnal Umum (retur/penyesuaian).\n2) Rumus Pembelian Bersih = Pembelian + Beban Angkut Pembelian - (Retur Pembelian + Potongan Pembelian).\n3) Rumus Barang Tersedia Untuk Dijual (BTUD) = Persediaan Awal + Pembelian Bersih.\n4) Rumus Harga Pokok Penjualan (HPP) = BTUD - Persediaan Akhir.\n5) Laba Kotor = Penjualan Bersih - HPP.',
  },
  {
    keywords: /perusahaan jasa|persamaan dasar|jurnal umum|buku besar|neraca saldo|jurnal penyesuaian|kertas kerja|jurnal penutup/i,
    subTopics: [
      'Analisis Bukti Transaksi & Keseimbangan Persamaan Dasar Akuntansi (A = L + E)',
      'Pencatatan Jurnal Umum & Pemindahbukuan (Posting) ke Buku Besar',
      'Penyusunan Ayat Jurnal Penyesuaian (Beban Dibayar di Muka, Perlengkapan, Akrual)',
      'Penyusunan Laporan Keuangan, Jurnal Penutup, dan Neraca Saldo Setelah Penutupan',
    ],
    cpFocus:
      'menerapkan siklus akuntansi perusahaan jasa secara utuh mulai dari analisis dokumen transaksi ke dalam persamaan dasar akuntansi dan jurnal umum, posting ke buku besar, penyusunan neraca saldo, jurnal penyesuaian, kertas kerja, hingga penyajian laporan keuangan dan jurnal penutup',
    tpItems: [
      '1. Menjelaskan aturan saldo normal akun (Aset, Liabilitas, Ekuitas, Pendapatan, dan Beban) serta menganalisis dampak transaksi terhadap Persamaan Dasar Akuntansi.',
      '2. Menerapkan prosedur penjurnalan transaksi operasional perusahaan jasa ke dalam Jurnal Umum dan pemindahbukuan (posting) ke Buku Besar.',
      '3. Menganalisis data penyesuaian akhir periode (pemakaian perlengkapan, beban dibayar di muka, penyusutan aset tetap, pendapatan/beban akrual) ke dalam Ayat Jurnal Penyesuaian.',
      '4. Mengevaluasi penyusunan Laporan Laba Rugi, Laporan Perubahan Ekuitas, Laporan Posisi Keuangan, serta Jurnal Penutup.',
    ],
    atpItems: [
      'ATP 1 (L1 - C1/C2): Mengidentifikasi bukti transaksi, klasifikasi akun riil dan nominal, serta mekanisme saldo normal Debit-Kredit.',
      'ATP 2 (L2 - C3): Mencatat transaksi ke dalam Jurnal Umum, memposting ke Buku Besar, dan menyusun Neraca Saldo.',
      'ATP 3 (L3 - C4): Menganalisis Ayat Jurnal Penyesuaian dengan pendekatan Neraca (Harta/Utang) maupun pendekatan Laba Rugi (Beban/Pendapatan).',
      'ATP 4 (L3 - C5): Mengevaluasi dampak kesalahan pencatatan penyesuaian terhadap laporan keuangan dan menyusun Jurnal Penutup.',
    ],
    summaryText:
      'Siklus Akuntansi Perusahaan Jasa berlandaskan pada persamaan dasar Aset = Liabilitas + Ekuitas:\n1) Aturan Saldo Normal: Aset & Beban bertambah di Debit (saldo normal Debit); Liabilitas, Ekuitas, & Pendapatan bertambah di Kredit (saldo normal Kredit).\n2) Jurnal Penyesuaian Beban Dibayar di Muka: jika saat bayar dicatat sebagai Harta (Sewa Dibayar di Muka), maka penyesuaiannya sebesar yang TELAH TERPAKAI; jika saat bayar dicatat sebagai Beban (Beban Sewa), maka penyesuaiannya sebesar yang BELUM TERPAKAI.\n3) Jurnal Penutup menutup akun nominal (Pendapatan, Beban, Ikhtisar Laba Rugi, dan Prive) sehingga pada Neraca Saldo Setelah Penutupan hanya tersisa akun-akun riil (Aset, Liabilitas, dan Modal Akhir).',
  },
];

export function buildFallbackCurriculum(params: {
  mataPelajaran?: string;
  jenjangFase?: string;
  kelasSemester?: string;
  materiPokok: string;
  ringkasanMateri?: string;
}) {
  const mapel = (params.mataPelajaran || 'Akuntansi & Keuangan Lembaga').trim();
  const fase = (params.jenjangFase || 'Fase F (Kelas 11-12 SMA/SMK)').trim();
  const topik = (params.materiPokok || 'Siklus Akuntansi dan Pelaporan Keuangan').trim();
  const userSummary = (params.ringkasanMateri || '').trim();

  // Cari kecocokan dengan basis pengetahuan Kurikulum Akuntansi spesifik
  const combinedSearch = `${topik} ${mapel} ${userSummary}`;
  const matchedTemplate = ACCOUNTING_TOPIC_TEMPLATES.find((tpl) =>
    tpl.keywords.test(combinedSearch)
  );

  if (matchedTemplate) {
    const capaianPembelajaran = `Pada akhir ${fase} mata pelajaran ${mapel}, peserta didik mampu ${matchedTemplate.cpFocus} pada lingkup materi "${topik}" secara teliti, sistematis, dan sesuai dengan Standar Akuntansi Keuangan (SAK).`;
    const tujuanPembelajaran = matchedTemplate.tpItems.join('\n');
    const alurTujuanPembelajaran = matchedTemplate.atpItems.join('\n');
    const ringkasanMateri =
      userSummary.length > 30 ? userSummary : matchedTemplate.summaryText;

    return {
      capaianPembelajaran,
      tujuanPembelajaran,
      alurTujuanPembelajaran,
      ringkasanMateri,
    };
  }

  // Ekstraksi sub-konsep cerdas dari judul Materi Pokok atau Uraian Materi yang diketik guru
  const subPoints = userSummary
    .split(/[\n.;]+/)
    .map((s) => s.replace(/^[0-9\-*•()\s]+/, '').trim())
    .filter((s) => s.length >= 12);

  const sub1 = subPoints[0] || `konsep dasar, definisi, dan klasifikasi komponen pada ${topik}`;
  const sub2 = subPoints[1] || `prosedur perhitungan dan penerapan pencatatan sistematis pada ${topik}`;
  const sub3 = subPoints[2] || `analisis kasus kontekstual dan penyesuaian data pada ${topik}`;
  const sub4 = subPoints[3] || `evaluasi ketepatan pelaporan dan pengambilan keputusan terkait ${topik}`;

  const capaianPembelajaran = `Pada akhir ${fase} mata pelajaran ${mapel}, peserta didik mampu memahami, menerapkan, menganalisis, dan mengevaluasi konsep serta prosedur "${topik}" secara sistematis, mengolah data/informasi berdasarkan kaidah keilmuan ${mapel}, serta menyajikan hasil analisis secara akurat dan bertanggung jawab.`;

  const tujuanPembelajaran = [
    `1. Menjelaskan ${sub1} sesuai kaidah pada mata pelajaran ${mapel}.`,
    `2. Menerapkan ${sub2} berdasarkan data atau kasus operasional yang disajikan.`,
    `3. Menganalisis ${sub3} secara kritis dan sistematis.`,
    `4. Mengevaluasi ${sub4} untuk memvalidasi kebenaran kesimpulan atau pelaporan.`,
  ].join('\n');

  const alurTujuanPembelajaran = [
    `ATP 1 (L1 - C1/C2 Pemahaman): Mengidentifikasi prinsip dasar, dokumen/komponen utama, dan konsep esensial pada ${topik}.`,
    `ATP 2 (L2 - C3 Penerapan): Menerapkan rumus, prosedur teknis, dan langkah penyelesaian kasus standar pada ${topik}.`,
    `ATP 3 (L3 - C4 Analisis HOTS): Menganalisis hubungan antar-data, rekonsiliasi/penyesuaian, dan pemecahan masalah kompleks pada ${topik}.`,
    `ATP 4 (L3 - C5 Evaluasi HOTS): Mengevaluasi dampak kesalahan prosedur dan memvalidasi ketepatan hasil akhir pada ${topik}.`,
  ].join('\n');

  const ringkasanMateri =
    userSummary.length > 25
      ? userSummary
      : `Ringkasan Materi Esensial — ${topik} (${mapel} · ${fase}):\n1) Konsep Dasar & Pengakuan Awal: Mencakup ruang lingkup, prinsip dasar, bukti pendukung, serta klasifikasi elemen utama dalam ${topik}.\n2) Prosedur Penerapan & Perhitungan: Langkah sistematis pengolahan data kuantitatif maupun pencatatan prosedural pada ${topik}.\n3) Analisis & Penyesuaian Data: Telaah kritis terhadap perubahan nilai, rekonsiliasi data, dan penyesuaian akhir periode terkait ${topik}.\n4) Evaluasi & Pelaporan: Pemeriksaan kewajaran penyajian informasi dan analisis dampak kesalahan pencatatan pada ${topik}.`;

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
  const derived = buildFallbackCurriculum({
    mataPelajaran: mapel,
    jenjangFase: config.jenjangFase,
    kelasSemester: config.kelasSemester,
    materiPokok: topik,
    ringkasanMateri: config.ringkasanMateri,
  });

  const rawSummary = String(config.ringkasanMateri || derived.ringkasanMateri || topik);

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
      makeQuestion: (no: number, concept: string) => {
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
              teks: `Mengabaikan nilai dokumen pendukung dan hanya mencatat setengah dari nilai transaksi (${`Rp${(nominal / 2).toLocaleString('id-ID')},00`})`,
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
      makeQuestion: (no: number, concept: string) => {
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
      makeQuestion: (no: number, concept: string) => {
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
      makeQuestion: (no: number, concept: string) => {
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
    const generated = tpl.makeQuestion(nomor, concept);

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
