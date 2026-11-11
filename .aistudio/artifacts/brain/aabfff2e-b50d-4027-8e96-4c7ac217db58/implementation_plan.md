# EvaluasiAI — Studio Penyusunan Soal Pilihan Ganda & Analisis Butir Soal Kurikulum Merdeka

Aplikasi web terpadu bagi pendidik dan penyusun asesmen untuk menghasilkan paket soal pilihan ganda yang sistematis hanya dengan memasukkan Materi Pokok serta parameter Kurikulum Merdeka (CP, TP, ATP), lengkap dengan dokumen Kisi-Kisi, Kartu Soal resmi, Mode Simulasi Ujian, dan mesin Analisis Butir Soal Statistik Empiris (Classical Test Theory).

### User Review & Critical Decisions

> [!IMPORTANT]
> Rencana arsitektur dan fitur di bawah ini telah disesuaikan sepenuhnya dengan pilihan yang Anda konfirmasi pada tahap klarifikasi. Silakan tinjau alur kerja dan rumus psikometri yang akan diimplementasikan sebelum pembangunan kode dimulai.

- **Confirmed Decision 1 — Analisis Statistik Empiris Lengkap dengan Input Skor Siswa**: Aplikasi menyertakan **Laboratorium Analisis Butir Soal (Anates Empiris & Kualitatif)** yang menghitung secara otomatis:
  - **Tingkat Kesukaran ($P$)**: Proporsi siswa yang menjawab benar ($P = B / JS$) beserta klasifikasi (*Terlalu Sukar*, *Sukar*, *Sedang / Ideal*, *Mudah*, *Terlalu Mudah*).
  - **Daya Pembeda ($D$ & $r_{pbi}$)**: Indeks diskriminasi metode kelompok Atas–Bawah 27% ($D = P_A - P_B$) serta koefisien korelasi *Point-Biserial* ($r_{pbi}$) untuk menguji validitas empiris tiap butir soal.
  - **Efektivitas Pengecoh (*Distractor Analysis*)**: Distribusi pemilih opsi A, B, C, D, E pada kelompok atas vs. bawah serta status keberfungsian tiap pengecoh (*Berfungsi Baik* jika dipilih $\ge 5\%$ responden terutama kelompok bawah, atau *Perlu Revisi / Diganti*).
  - **Reliabilitas Tes (KR-20)**: Koefisien konsistensi internal *Kuder-Richardson 20* untuk keseluruhan paket soal beserta rekomendasi tindak lanjut otomatis (*Terima*, *Revisi Pengecoh*, *Revisi Pokok Soal*, atau *Buang/Ganti*) yang dapat diperbaiki langsung dengan bantuan AI (*One-Click AI Item Revision*).
- **Confirmed Decision 2 — Input Sistematis Berbasis Kurikulum Merdeka (CP, TP, dan ATP)**: Formulir penyusunan memandu pengguna memasukkan **Identitas Mata Pelajaran & Fase (A–F)**, **Capaian Pembelajaran (CP)**, **Tujuan Pembelajaran (TP)**, **Alur Tujuan Pembelajaran (ATP) / Indikator Soal**, serta **Materi Pokok / Teks Bacaan**. Tersedia pula fitur **Auto-urunkan TP & ATP dari Materi Pokok** (jika guru hanya menempelkan teks materi, AI otomatis merumuskan CP, TP, ATP, dan indikator soal terlebih dahulu) serta **Preset Materi Contoh** agar pengguna dapat langsung menguji sistem.
- **Confirmed Decision 3 — Output Kisi-Kisi, Kartu Soal Resmi, Mode Simulasi, & Cetak/Ekspor**: Paket soal yang dihasilkan otomatis terpetakan ke dalam **Tabel Matriks Kisi-Kisi Soal**, **Kartu Soal Standar Kemendikdasmen** (lengkap dengan rumusan butir, stimulus, kunci, pedoman penskoran, dan rasional opsi), **Mode Simulasi Ujian Interaktif**, serta fitur **Cetak PDF / Ekspor CSV & Dokumen Siap Cetak**.

---

### 1. Overview & Core Concept

- **What It Does**: Mengotomatisasi alur kerja penyusunan instrumen asesmen pendidikan mulai dari pembedahan materi pokok menjadi kisi-kisi terstruktur, pembuatan soal pilihan ganda berstandar HOTS/LOTS sesuai Taksonomi Bloom Revisi (C1–C6), simulasi pengerjaan soal, hingga pengolahan data jawaban siswa menjadi laporan analisis butir soal empiris.
- **Target Audience / Persona**: Guru sekolah (SD/SMP/SMA/SMK), dosen, tim pengembang kurikulum, dan mahasiswa pendidikan yang membutuhkan instrumen tes yang valid secara teoretis maupun empiris tanpa harus mengolah rumus psikometri secara manual di spreadsheet yang rumit.
- **Key Value**: Mengubah satu input materi pokok menjadi rangkaian dokumen asesmen lengkap (Kisi-Kisi $\to$ Kartu Soal $\to$ Naskah Ujian $\to$ Analisis Butir Empiris & Perbaikan Butir AI) dalam hitungan detik dengan akurasi psikometri terstandar.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Tahap 1 — Input Materi Pokok & Kurikulum Merdeka**: Pengguna memilih Fase/Jenjang, memasukkan Materi Pokok (atau memilih dari *Template Materi Siap Pakai*), dan mengisi/mengenerate otomatis CP, TP, serta ATP. Pengguna mengatur jumlah soal, jumlah opsi (4 opsi A–D atau 5 opsi A–E), serta proporsi distribusi kognitif Bloom (L1 Pemahaman C1–C2, L2 Penerapan C3, L3 Penalaran HOTS C4–C6).
  2. **Tahap 2 — Matriks Kisi-Kisi & Kartu Soal Resmi**: Setelah AI menyusun paket soal, pengguna dapat memeriksa **Tabel Kisi-Kisi** (CP, TP, ATP, Materi, Bentuk Stimulus, Indikator Butir Soal, Level Kognitif, Nomor Soal) dan beralih ke tampilan **Kartu Soal Pilihan Ganda** (format tabel berbingkai resmi berisi identitas, stimulus, pokok soal, opsi A–E, kunci jawaban, pembahasan, dan analisis rasional tiap pengecoh).
  3. **Tahap 3 — Mode Simulasi Ujian Interaktif**: Pengguna dapat menjalankan simulasi pengerjaan ujian layaknya siswa (dengan *timer*, navigasi nomor soal, penanda ragu-ragu, dan skor instan). Hasil simulasi dapat langsung ditambahkan sebagai baris responden baru di tabel analisis empiris.
  4. **Tahap 4 — Laboratorium Analisis Butir Soal Empiris**: Pengguna melihat matriks jawaban siswa (tersedia fitur: *Input Manual / Edit Tabel*, *Impor CSV*, atau *Generate Simulasi 30 Siswa Realistis* untuk pengujian cepat). Sistem menampilkan tabel metrik psikometri lengkap ($P$, $D$, $r_{pbi}$, tabel $r$-kritis, KR-20, distribusi pengecoh A–E) dan tombol **"Revisi Butir Otomatis dengan AI"** untuk butir soal yang terdeteksi *Gugur* atau memiliki *Pengecoh Tidak Berfungsi*.
  5. **Tahap 5 — Pusat Ekspor & Cetak Dokumen**: Pengguna memilih mode cetak/unduh: *Naskah Soal Siswa (Tanpa Kunci)*, *Kunci Jawaban & Pembahasan*, *Tabel Kisi-Kisi*, *Kumpulan Kartu Soal Resmi*, atau *Laporan Analisis Butir Soal (CSV / Cetak Laporan)*.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: **Academic Precision & Editorial Assessment Workbench** — memadukan ketegasan tipografi dokumen akademik resmi dengan kejelasan visual laboratorium analitik modern.
  - *Color Palette & Mood* (Disiplin 60-30-10):
    - **60% Dominant Neutral Canvas**: Alabaster terang yang bersih (`#F8FAFC`) untuk area kerja utama dan kertas dokumen putih murni (`#FFFFFF`) untuk pratinjau Kartu Soal dan Kisi-Kisi agar nyaman dibaca dan siap cetak.
    - **30% Structural Surfaces**: Permukaan panel abu-abu dingin (`#F1F5F9`), garis batas *hairline* tipis (`#E2E8F0`), dan teks utama *deep slate* (`#0F172A`) dengan teks sekunder (`#475569`).
    - **10% Semantic Focal Accents**: Biru Akademik / Cobalt (`#0284C7`) untuk aksi utama dan navigasi aktif; indikator status psikometri selalu memasangkan warna dengan simbol & label teks eksplisit (bebas *hue-only signaling*):
      - `● VALID / BAIK`: Emerald (`#059669`) — Butir soal memenuhi kriteria daya beda ($D \ge 0.30$) dan kesukaran proporsional ($0.30 \le P \le 0.70$).
      - `▲ REVISI PENGECOH`: Amber (`#D97706`) — Butir soal cukup baik namun terdapat opsi pengecoh yang dipilih $< 5\%$ siswa.
      - `■ GUGUR / PERLU DIGANTI`: Crimson (`#DC2626`) — Daya beda rendah/negatif ($D < 0.20$) atau soal terlalu mudah/sukar ekstrem.
  - *Typography & Hierarchy* (Aturan 2+1 Font):
    - **Display & Headings**: `Plus Jakarta Sans` (SemiBold/Bold) untuk judul halaman, header bagian, dan struktur navigasi.
    - **Body & Soal**: `Public Sans` (Regular/Medium) untuk keterbacaan tinggi pada naskah stimulus soal, pembahasan, dan tabel kisi-kisi.
    - **Psychometric Metrics & Data Tables**: `IBM Plex Mono` dengan `tabular-nums` (`font-variant-numeric: tabular-nums`) untuk seluruh angka indeks $P$, $D$, $r_{pbi}$, KR-20, skor siswa, dan matriks distribusi opsi A–E agar titik desimal sejajar sempurna secara vertikal.
  - *Component Styling & Layout*:
    - Mematuhi **Top Bar Contract** satu baris 3 zona: Wordmark aplikasi di kiri, 5 tautan navigasi ruang kerja satu baris di tengah (`Penyusun & Materi`, `Kisi-Kisi`, `Kartu Soal`, `Simulasi Ujian`, `Analisis Butir`), dan 1 tombol aksi utama (`Cetak & Ekspor`) di kanan.
    - **Zero-Pill Metadata Discipline**: Metadata soal (seperti `Nomor 01 · Level L3 (C4 Analisis) · Indeks Kesukaran Sedang`) ditampilkan sebagai teks bersih dengan pemisah tipografis `·` tanpa pembungkus kapsul/pill warna-warni yang berlebihan.
    - **Single-Elevation Depth**: Permukaan tabel dan kartu menggunakan batas *hairline* `1px solid` tanpa menumpuk kartu di dalam kartu atau *border-left* tebal.

- **Interactive Feedback & Motion**:
  - Transisi antar-tab dan interaksi tombol berlangsung cepat ($\le 150\text{ms}$) menggunakan properti kompositor (`opacity`, `transform`).
  - Saat proses penyusunan soal AI berlangsung, antarmuka menampilkan indikator tahapan terstruktur (*Menganalisis Materi Pokok & CP/TP $\to$ Menyusun Kisi-Kisi Indikator $\to$ Merakit Pokok Soal & Pengecoh $\to$ Memvalidasi Rasional Opsi*) beserta *skeleton* tabel presisi.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Arsitektur Ekstraksi Kurikulum Merdeka Dua Arah (Materi Pokok $\leftrightarrow$ CP/TP/ATP)**
  - *Chosen Approach*: Pengguna dapat mengisi CP, TP, dan ATP secara lengkap **atau** cukup menempelkan Materi Pokok/Teks Bacaan lalu menekan tombol *"Ekstrak CP, TP & ATP Otomatis dari Materi"*.
  - *Why*: Memenuhi permintaan awal pengguna (*"hanya cukup dengan memasukkan materi pembelajaran atau materi pokok"*) sekaligus mengakomodasi kebutuhan struktur resmi **Kurikulum Merdeka (CP, TP, ATP)** tanpa memaksa guru mengetik dokumen kurikulum panjang dari nol.
  - *Alternatives Considered*: Mewajibkan pengisian seluruh kolom CP/TP/ATP secara manual sebelum tombol buat soal aktif — ditolak karena menghambat kecepatan kerja guru yang hanya memiliki ringkasan materi pokok.

- **Decision 2: Mesin Psikometri Hibrida (Kalkulasi Statistik Deterministik di Klien + Diagnostik & Revisi Butir via Server-Side Gemini API)**
  - *Chosen Approach*: Seluruh rumus statistik empiris ($P$, $D$, $r_{pbi}$, simpangan baku, KR-20, dan persentase pemilih opsi A–E) dihitung secara deterministik dengan fungsi matematika TypeScript yang presisi, sedangkan pembuatan soal awal, rasional pengecoh, dan fitur *"Perbaiki Butir Soal dengan AI"* diproses melalui *endpoint* server Express (`/api/assessment/*`) menggunakan `@google/genai` (`gemini-3.8-flash` dengan `responseSchema` JSON terketat).
  - *Why*: Menjamin perhitungan statistik butir soal 100% akurat secara matematis dan instan saat guru mengubah skor siswa di tabel (tanpa latensi API atau risiko halusinasi angka oleh LLM), sementara kekuatan penalaran Gemini difokuskan pada kualitas bahasa soal, kesesuaian indikator ATP, dan perbaikan pengecoh yang lemah.
  - *Alternatives Considered*: Meminta AI menghitung statistik skor siswa melalui prompt — ditolak karena lambat dan rawan kesalahan pembulatan statistik.

- **Decision 3: Generator Kohort Responden Simulasi & Integrasi Mode Ujian**
  - *Chosen Approach*: Menyediakan 3 cara pengisian data skor siswa pada menu Analisis Butir Soal: (1) Generator Kohort Simulasi Realistis (15, 30, atau 40 siswa) dengan satu klik, (2) Input/Edit langsung pada matriks grid interaktif atau unggah CSV jawaban siswa nyata, dan (3) Pengiriman otomatis dari **Mode Simulasi Ujian**.
  - *Why*: Guru sering kali ingin langsung melihat dan menguji tabel analisis butir soal sesaat setelah soal dibuat (sebelum diujikan di kelas nyata), namun tetap membutuhkan kemampuan memasukkan data jawaban siswa sesungguhnya setelah ujian berlangsung.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                   TOP BAR CONTRACT (3 Zones: Brand | 5 Nav Tabs | Export CTA)        │
└──────────────────────────────────────────┬───────────────────────────────────────────┘
                                           │
        ┌──────────────────────────────────┼──────────────────────────────────┐
        ▼                                  ▼                                  ▼
┌───────────────────────┐      ┌────────────────────────┐      ┌───────────────────────┐
│  1. STUDIO PENYUSUN   │      │ 2. DOKUMEN KURIKULUM   │      │ 3. SIMULASI & ANATES  │
│  (Input & Konfigurasi)│      │ (Kisi-Kisi & Kartu)    │      │ (Ujian & Psikometri)  │
├───────────────────────┤      ├────────────────────────┤      ├───────────────────────┤
│ • Form Identitas Mapel│      │ • Tabel Matriks        │      │ • Mode Simulasi Ujian │
│   & Fase (A - F)      │      │   Kisi-Kisi (CP/TP/ATP,│      │   Interaktif (Timer,  │
│ • Input Materi Pokok  │      │   Indikator, Bloom)    │      │   Navigasi, Skor)     │
│   & Generator CP/TP   │      │ • Kartu Soal Resmi     │      │ • Matriks Input Skor  │
│ • Distribusi Kognitif │      │   Kemendikdasmen       │      │   Siswa (Grid / CSV / │
│   (L1/L2/L3 & C1-C6)  │      │   (Stimulus, Opsi A-E, │      │   Kohort Simulasi)    │
│ • Editor Soal Manual  │      │   Rasional Pengecoh)   │      │ • Mesin Statistik CTT │
│   & AI Regenerator    │      │ • Panel Cetak & Ekspor │      │   (P, D, rpbi, KR-20) │
└───────────┬───────────┘      └───────────┬────────────┘      └───────────┬───────────┘
            │                              │                               │
            └──────────────────────────────┼───────────────────────────────┘
                                           ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                     CENTRAL ASSESSMENT & PSYCHOMETRIC STATE STORE                    │
│  • AssessmentPackage (Metadata Kurikulum Merdeka, CP, TP, ATP, Materi Pokok)         │
│  • QuestionItem[] (Stimulus, Stem, Options A-E, Key, Rationale, Bloom, Indicator)    │
│  • StudentResponseRow[] (Nama/ID Siswa, Array Jawaban A-E, Skor Total, Kelompok)     │
│  • EmpiricalAnalysisReport (KR-20, Mean, SD, Per-Item P, D, rpbi, Distractor Stats)  │
└──────────────────────────────────────────┬───────────────────────────────────────────┘
                                           │ HTTP JSON (/api/assessment/*)
                                           ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                       EXPRESS SERVER PROXY (@google/genai SDK)                       │
│  • POST /api/assessment/derive-curriculum : Ekstrak CP, TP, ATP dari Materi Pokok    │
│  • POST /api/assessment/generate-items    : Buat Kisi-Kisi + Soal PG + Rasional Opsi │
│  • POST /api/assessment/revise-item       : Perbaiki Pokok Soal / Pengecoh Lemah     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - `CurriculumConfig`: Menyimpan `mataPelajaran`, `jenjangFase` (`Fase A` s.d. `Fase F` / Umum), `kelasSemester`, `materiPokok` (teks materi utama), `capaianPembelajaran` (CP), `tujuanPembelajaran` (TP), `alurTujuanPembelajaran` (ATP), `jumlahSoal`, `jumlahOpsi` (4 atau 5), dan proporsi level kognitif (`L1_Pemahaman`, `L2_Penerapan`, `L3_Penalaran`).
  - `QuestionItem`: Representasi sistematis tiap butir soal yang mencakup `id`, `nomor`, `tpRef`, `atpRef`, `materiSpesifik`, `indikatorSoal` (berformat ABCD: *Audience, Behavior, Condition, Degree*), `levelKognitif` (`L1` | `L2` | `L3`), `dimensiBloom` (`C1` s.d. `C6`), `stimulus` (wacana/kasus/data tabel), `pokokSoal` (*stem*), `opsi` (daftar objek `{ label: 'A'|'B'|'C'|'D'|'E', teks: string, isKey: boolean, rasionalPengecoh: string }`), `pembahasan`, dan `estimasiKesukaranAwal`.
  - `StudentResponse`: Menyimpan `id`, `namaSiswa`, dan peta jawaban `{ [questionId]: 'A' | 'B' | 'C' | 'D' | 'E' }` untuk diolah oleh mesin statistik.
  - `ItemEmpiricalStats`: Hasil perhitungan otomatis untuk setiap soal:
    - `indeksKesukaran` ($P \in [0, 1]$) & `kategoriKesukaran`
    - `dayaPembeda` ($D \in [-1, 1]$) & `kategoriDayaPembeda`
    - `korelasiPointBiserial` ($r_{pbi}$) & `statusValiditas` (membandingkan $r_{pbi}$ terhadap $r_{\text{tabel}}$ pada $\alpha = 0.05$)
    - `distribusiOpsi`: Rincian per opsi (A–E) berisi jumlah pemilih kelompok atas, kelompok bawah, persentase total pemilih, dan status efektivitas pengecoh (`Efektif` jika dipilih $\ge 5\%$ siswa, `Tidak Efektif` jika $< 5\%$, atau `Menyesatkan` jika kelompok atas memilih pengecoh lebih banyak daripada kelompok bawah).
    - `rekomendasiButir`: Keputusan akhir (`Diterima`, `Revisi Pengecoh`, `Revisi Pokok Soal`, `Ditolak / Ganti Butir`).

- **Interactive Component & State Mapping**:
  - **Generator CP/TP/ATP Otomatis**: Tombol di panel input memvalidasi keberadaan `materiPokok`, memanggil `/api/assessment/derive-curriculum`, dan mengisi otomatis kolom CP, TP, dan ATP yang tetap dapat disunting pengguna.
  - **Penyusun Paket Soal Sistematis**: Memanggil `/api/assessment/generate-items` dengan skema JSON ketat, memperbarui daftar `QuestionItem[]`, sekaligus membangkitkan data awal kohort simulasi siswa agar tab Analisis Butir Soal langsung menyajikan perhitungan hidup.
  - **Editor Kartu Soal & Kisi-Kisi**: Setiap sel pada Kartu Soal dan Kisi-Kisi dapat disunting langsung secara *inline* oleh guru jika ingin menyesuaikan redaksi kalimat atau opsi jawaban.
  - **Interaksi Tabel Analisis Empiris**: Mengklik sel jawaban siswa (`A`–`E`) pada matriks akan langsung menghitung ulang skor total, mengurutkan kelompok Atas–Bawah (27%), serta memperbarui nilai $P$, $D$, $r_{pbi}$, dan reliabilitas KR-20 secara *real-time*.
  - **Perbaikan Butir Soal Berbantuan AI (*Targeted Item Revision*)**: Pada baris soal yang berstatus `Revisi Pengecoh` atau `Ditolak`, tombol *"Perbaiki Butir dengan AI"* mengirimkan data statistik empiris (misal: *"Opsi C dipilih oleh 0% siswa dan daya pembeda D = 0.12"*) ke `/api/assessment/revise-item` sehingga AI mengganti pengecoh yang tidak berfungsi dengan pengecoh baru yang lebih masuk akal (*plausible distractor*).

- **Key Sequences & Integrations**:
  - Seluruh pemanggilan SDK `@google/genai` dilakukan di sisi server Express menggunakan model `'gemini-3.8-flash'` dengan `httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }` dan `responseMimeType: "application/json"` beserta `responseSchema` terstruktur.
  - Penyimpanan lokal (`localStorage`) menjaga agar paket soal, struktur CP/TP/ATP, dan matriks skor siswa tidak hilang ketika halaman dimuat ulang, ditambah fitur ekspor/impor JSON proyek dan ekspor CSV matriks analisis.
