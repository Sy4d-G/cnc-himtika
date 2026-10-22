# Dokumentasi Arsitektur & Panduan Pengembang (Developer Guide)
## Create and Compete (CnC) — HIMTIKA UNSIKA

> Dokumen ini adalah panduan teknis komprehensif untuk memahami seluruh arsitektur, aliran logika, komponen antarmuka, dan tata cara pengembangan fitur baru pada website **Create and Compete (CnC) HIMTIKA UNSIKA**.  
> Karena seluruh komentar kode (*inline comments*) pada berkas HTML, CSS, dan JavaScript telah dibersihkan demi efisiensi ukuran berkas dan performa parsing browser, dokumen ini berfungsi sebagai referensi utama bagi pengembang.

---

## 1. Ikhtisar & Filosofi Arsitektur

Platform web ini dibangun sebagai **Single-Page Application (SPA) Statis Murni** yang menggabungkan estetika *High-Tech Cyber-Dark* dengan performa tinggi:
* **Nol Build Tools / Zero Bundler Overhead**: Tidak memerlukan proses `npm run build`, Webpack, atau Vite untuk dijalankan. Kode dapat langsung dibuka di peramban web atau disajikan via server statis apa pun.
* **Separasi Kode Terstruktur**: Pemisahan tegas antara struktur markup (`index.html`), logika sistem interaktif (`assets/js/main.js`), gaya kustom (`assets/css/style.css`), dan aset visual terkompresi (`assets/images/`).
* **Zero-Quality-Loss Performance**: Menjaga animasi 3D WebGL Three.js dan efek kasino tetap memukau tanpa mengorbankan masa pakai baterai perangkat seluler maupun kelancaran scrolling pada laptop standar (*120Hz smooth scrolling*).

---

## 2. Struktur Direktori Proyek

```text
cnc-himtika/
├── index.html                   # Berkas markup HTML5 utama (tanpa inline CSS/JS, 0 komentar)
├── dokumentasi.md               # Dokumentasi teknis & panduan alur sistem ini
├── .gitignore                   # Konfigurasi pengabaian berkas OS, cache, dan IDE
├── vercel.json                  # Konfigurasi caching statis & security headers Vercel
├── netlify.toml                 # Konfigurasi immutable assets & header Netlify
├── _headers                     # Konfigurasi header Cloudflare Pages
├── .htaccess                    # Aturan kompresi Gzip & cache browser Apache/cPanel
├── robots.txt                   # Pengaturan crawler mesin pencari
├── sitemap.xml                  # Peta situs resmi pengindeksan SEO Google
└── assets/
    ├── css/
    │   └── style.css            # Aturan CSS kustom (poker card, bento, animasi)
    ├── js/
    │   └── main.js              # Logika Three.js, petir fraktal, slider, filter, dan modal
    └── images/
        ├── logo-cnc-website.png / .webp       # Logo identitas navbar
        ├── adam_hand_left_smooth.png / .webp  # Tangan kiri digital Adam
        ├── god_hand_right_smooth.png / .webp  # Tangan kanan digital God
        ├── cnc-logo-footer.svg                # Vektor emblem murni terpusat (tanpa teks)
        ├── img-himtika.webp                   # Logo resmi HIMTIKA footer
        ├── qr-minat-bakat-cnc.png / .webp     # QR code portal minat bakat
        ├── projek-smart-waste/                # Foto dokumentasi Projek 01 (JPG + WebP)
        └── projek-flood-alert/                # Foto dokumentasi Projek 02 (JPG + WebP)
```

---

## 3. Arsitektur Struktur HTML (`index.html`)

Halaman web terbagi atas 5 section utama berurutan yang dapat diakses langsung melalui *smooth scroll deep link*:

### A. `#beranda` (Hero Stage 3D)
* **Navbar (`#navbar`)**: Navigasi responsif *fixed* dengan efek kaca (*glassmorphism*), lencana status aktif, menu tautan, tombol aksi pendaftaran (*CTA*), dan tombol navigasi mobile (`#mobile-menu-btn`).
* **Panggung Kreasi (`#creation-stage`)**: Wadah relatif dengan efek *glow* hijau. Memuat:
  * Pembungkus tangan kiri Adam (`#adam-hand-img`) dengan animasi melayang.
  * Pembungkus tangan kanan God (`#god-hand-img`) dengan animasi melayang.
  * Kanvas WebGL Mahkota Cyber 3D (`#crown-3d-wrapper` dan `#crown-canvas`).
  * Elemen cahaya latar belakang mahkota (`#crown-backlight-aura`).
  * Kanvas simulasi petir fraktal 2D (`#lightning-canvas`).
* **Kluster Tombol Aksi Hero**: Tombol langsung menuju katalog lomba, formulir minat bakat, dan informasi program.

### B. `#tentang-cnc` (Mengenal Program CnC)
* **Arsitektur Editorial Terbuka (Anti Card Fatigue)**: Menghilangkan kejenuhan komponen kartu berulang (*card overload*) dengan menerapkan variasi tata letak editorial:
  * *Definisi Program*: Format editorial 2-kolom dengan garis aksen hijau neon (`border-l-2`) dan statistik terbuka.
  * *2 Jalur Utama*: Showcase karya fisik dan pembinaan kompetisi IT terintegrasi visual foto mesin asli.
  * *Tema Resmi 2026*: Pernyataan tematik terbuka berbingkai hairline horizontal dengan tag domain teknologi.
  * *Alur Tahapan Seleksi*: Garis waktu proses terhubung (*connected process timeline*) 5 langkah terurut tanpa kotak kaku.
  * *Keuntungan Program*: Grid 4 kolom terbuka minimalis tanpa pembatas kartu.

### C. `#dokumen` (Dokumentasi Projek Nyata FASILKOM)
* Mengadopsi arsitektur **Bento 2-Kolom Carousel Slider**:
  * Slide 01: *Smart Medical Waste Sorter* (Pameran 2026).
  * Slide 02: *Flood Early Alert System* (Mitigasi Banjir Karawang).
* Komponen navigasi slider: tombol panah kiri `comp-btn-prev`, indikator counter `PROJEK 01 / 02`, dan panah kanan `comp-btn-next` yang dikunci sejajar setinggi `h-11` (44px).
* Galeri grid foto dengan trigger modal lightbox (`openPhotoModal`).

### D. `#lomba` (Katalog 40 Kompetisi Terkurasi)
* **Bilah Filter Kategori (`#category-tabs-track`)**: Menggunakan layout responsif multi-row wrapped di ponsel sehingga ke-5 kategori (`Semua`, `UI/UX`, `Web & Mobile`, `AI & Data`, `Cyber & IoT`) tampil utuh tanpa terpotong.
* **Stage Kartu Poker (`#comp-slider-stage`)**: Carousel slider kartu remi kasino 3D yang membagi 40 kartu menjadi 8 tampilan slide deck (masing-masing 5 kartu dalam formasi 1 baris simetris).
* **Bilah Paginasi Bawah**: Tombol dock pemilih deck instan (`Deck 01`, `Deck 02`, `Deck 03`, `Deck 04`) dengan tombol detail yang dikunci di garis dasar (*mt-auto baseline*).

### E. `#minat-bakat` (Portal Pendataan Delegasi)
* Wadah kartu QR Code statis beresolusi tinggi dengan tautan langsung `https://bit.ly/MinatBakatCnC`.
* Panduan terpadu terintegrasi (6 Pilar Divisi dalam bentuk pill badges fleksibel, 3 Tahapan Delegasi dalam bentuk vertical timeline terhubung, dan baris narahubung resmi terpusat tanpa penumpukan kartu ganda).

### F. `footer` (Identitas & Ekosistem Kampus — Standar IT Bootcamp HIMTIKA)
* **Tata Letak Ideal Mengacu IT Bootcamp HIMTIKA**:
  * Mengadopsi arsitektur hierarki resmi HIMTIKA (`site-footer`, `footer-main-row`, `footer-brand-col`, `footer-grid-col`, `footer-bottom`).
  * *Mobile*: Kolom identitas (emblem, alamat, dan 5 media sosial) terpusat, dengan grid 2-kolom sitemap terorganisir rapi di mana teks tautan rata kiri terhadap judul grupnya.
  * *Desktop (>=1024px)*: Pembagian proporsional 32% kolom identitas (dengan penyesuaian posisi logo CnC digeser halus ke kanan/`margin-left: 28px` agar lebih seimbang dan terpusat di atas blok alamat) dan 65% grid 4-kolom sitemap terdistribusi simetris (`Tentang Kami` rata kiri, `Media` & `Event` terpusat, `Aplikasi Publik` rata kanan).
  * *Footer Bottom*: Baris atribusi resmi lisensi dan lencana `HIMTIKA 2026` dengan logo gear crest terpusat.

---

## 4. Sistem Desain & Aturan CSS (`assets/css/style.css`)

### A. Palet Warna Resmi (*Design Tokens*)
* `Base Canvas`: `#03110A` - `#071A11` (Hitam Obsidian Kehijauan Pekat).
* `Brand Emerald`: `#00674F` (Warna identitas resmi HIMTIKA UNSIKA).
* `Brand Neon`: `#2CFF05` (CTA primer, aksen kartu aktif, status pulse).
* `Brand Gold / Amber`: `#EFBF04` (Lencana nominal hadiah, aksen mahkota dan kartu).
* `Brand Olive`: `#636B2F` (Garis batas hairline 1px kartu bento dan pembagi section).

### B. Spesifikasi Kartu Remi Kasino 3D (`.poker-card`)
* Memiliki rasio kartu remi kasino mewah dengan garis batas ganda *guilloche pattern* (`.poker-inner-frame`).
* Efek kilau spekular holografik dinamis (`.poker-glare`) yang bereaksi terhadap posisi kursor.
* Watermark simbol kartu (Spade/Club/Diamond/Heart) semi-transparan di latar belakang.
* Struktur flex-column dengan `mt-auto` pada tombol aksi bawah, memastikan tombol "Lihat Detail Lomba" selalu rata sejajar pada kartu-kartu yang bersisian.

### C. Animasi Kunci (*Keyframes*)
* `@keyframes floatLeftHand` & `@keyframes floatRightHand`: Gerakan mengambang halus tangan Adam & God dengan tempo 6.5 detik.
* `@keyframes neonBorderPulse`: Denyut cahaya neon hijau halus pada elemen aktif.
* `@keyframes arrivalHighlight`: Kilau kedatangan emas selama 1.8 detik saat menu "Info Lomba" diklik dari navbar.

---

## 5. Mesin Logika JavaScript (`assets/js/main.js`)

Berkas `assets/js/main.js` mengelola seluruh komputasi grafis dan interaktivitas halaman web:

### A. Three.js WebGL Mahkota Cyber 3D (`init3DCyberCrown`)
* **Inisialisasi & Geometri**:
  * PBR Material dengan sifat metalik (`metalness: 0.85`, `roughness: 0.25`).
  * Basis oktagonal emas dengan celah emisi hijau neon.
  * Pilar prisma vertikal berseling kristal intan anti-gravitasi (`floatingCrystals`).
  * Cincin halo orbital ganda yang berputar berlawanan arah (`haloRing` & `tickRing`).
* **Interaktivitas Pengguna**:
  * Mendukung rotasi kustom (*drag-to-rotate*) dengan redaman fisik halus (*damping*).
  * Hover bobbing mengikuti fungsi gelombang sinus `Math.sin(elapsed * 1.4)`.

### B. Generator Petir Fraktal Plasma 2D (`initHyperRealisticLightning`)
* Beroperasi pada kanvas 2D `#lightning-canvas`.
* Menggunakan algoritma *Midpoint Displacement* rekursif untuk menghasilkan cabang petir fraktal acak bertegangan tinggi.
* Siklus bergantian: menyengat mahkota dari tangan kiri Adam selama fase pertama, lalu jeda, dan menyengat dari tangan kanan God pada fase berikutnya.
* Dioptimalkan mati total pada layar smartphone (`window.innerWidth < 768`).

### C. Penghemat Daya Otomatis (`IntersectionObserver` & `visibilitychange`)
* Memantau panggung pahlawan (`#creation-stage`).
* Variabel global `_isHeroInView` beralih ke `false` saat pengguna menggulir ke bawah:
  * Loop `requestAnimationFrame` Three.js dibatalkan (`cancelAnimationFrame`).
  * Loop kalkulasi kanvas petir dihentikan.
  * **Penggunaan CPU & GPU untuk rendering seketika turun ke 0.0%**.
* Begitu pengguna menggulir kembali ke atas atau kembali dari tab lain, fungsi `_resumeCrownAnim()` dan `_resumeLightningAnim()` menyalakan kembali animasi di 60 FPS tanpa jeda waktu.

### D. Penanganan Tilt 3D Kartu (`handlePokerTilt` & `resetPokerTilt`)
* Dibungkus dalam `requestAnimationFrame` untuk mencegah reflow DOM berulang saat kursor bergerak cepat.
* Menggunakan kalkulasi sudut `rotateX` dan `rotateY` berbasis bounding rect kartu.
* Secara otomatis dinonaktifkan pada perangkat layar sentuh (`(hover: none)`).

### E. Mesin Slider Katalog Kompetisi (`initCompetitionsSlider`)
* Mengelompokkan kartu yang aktif menjadi slide-slide berisi maksimal 5 kartu (`setupCompetitionSlides`).
* Mendukung navigasi tombol dock deck (`Deck 01`, `Deck 02`, `Deck 03`, `Deck 04`) serta tombol panah atas/samping.
* Mendukung deep-link URL hash `#deck1`, `#deck2`, `#deck3`, `#deck4`.

### F. Filter Kategori Lomba (`filterCompetitions`)
* Mengambil atribut `data-category` pada kartu lomba.
* Mendukung 5 filter: `semua`, `uiux`, `web`, `ai`, dan `cyber`.
* Saat kategori dipilih, sistem menyaring kartu yang cocok, membangun ulang pagination slide, dan menjalankan animasi pembagian kartu kasino beruntun (*sequential dealing*).

### G. Lightbox Modal Foto Projek (`openPhotoModal` & `closePhotoModal`)
* Menampilkan pratinjau foto resolusi tinggi dalam wadah modal gelap berbingkai hairline hijau dengan judul, deskripsi proyek, dan kategori teknis.
* Dapat ditutup dengan tombol silang [X], klik di area luar modal, atau tombol `Escape` pada keyboard.

### H. Smooth Scroll Engine
* Menangani seluruh klik tautan anchor (`a[href^="#"]`).
* Menggunakan formula *quintic ease-in-out* dengan durasi 1.050ms untuk transisi yang elegan dan sinematik.
* Jika targetnya adalah `#lomba`, sistem secara otomatis memicu efek kilau emas kedatangan (*arrival highlight*).

---

* **Sistem Ikon Profesional Standar Iconify (Anti-AI Slop)**:
  * Mengeliminasi 100% penggunaan emoji unicode yang sering diasosiasikan dengan template AI (*AI slop*).
  * Seluruh ikon tombol, tag fitur, domain teknologi, kartu keuntungan (*Benefits*), dan kanal media sosial mengadopsi SVG murni berbasis pustaka resmi **Iconify (Lucide Icons & Simple Icons)** untuk ketajaman visual, skalabilitas responsif, dan konsistensi stroke `2px`.

---

* **Refinement UI/UX Menyeluruh Berdasarkan Riset Pengguna & Tim RnD**:
  * **3 Kartu Visi Utama CnC (Standar HIMFO)**: Menggantikan blok teks definisi statis yang padat dengan 3 kartu modular berlatar foto riil mahasiswa (Inkubasi Riil, Mentor Ahli, Prestasi Lomba). Di mobile, kartu dapat digeser secara horizontal (*horizontal swipe carousel*) dengan indikator `Geser kartu ⇄`.
  * **Tata Letak 2x2 Grid untuk Keuntungan (Benefits)**: Menata 4 pilar keuntungan ke dalam format grid 2x2 di layar smartphone (dan 4 kolom di desktop) untuk menghilangkan kelelahan gulir vertikal (*scroll fatigue*).
  * **Galeri Dokumentasi Foto Horizontal**:
  * **Sinkronisasi Galeri Horizontal Projek 02 (Flood Early Alert System)**:
    * Mengubah tata letak foto Projek 02 yang sebelumnya menumpuk vertikal (`grid-cols-1`) di mobile menjadi *horizontal swipeable gallery* (`flex overflow-x-auto gap-3 pb-3 snap-x scrollbar-none`) identik dengan Projek 01, sehingga kedua foto berjajar ke samping dan judul serta penjelasan teknis tetap langsung terlihat di layar tanpa terdorong ke bawah. Mengubah galeri 5 foto projek menjadi slider horizontal yang ringkas di mobile, memangkas badge menjadi `DOKUMENTASI · 5 FOTO` (bebas patah baris), dan memastikan nama serta deskripsi teknis projek langsung terlihat (*above the fold*).
  * **Optimalisasi Kontrol Katalog Lomba**: Menghapus tombol geser atas ganda yang membingungkan, menyelaraskan tab kategori ke dalam satu baris geser horizontal, menyorot pegangan Instagram `@cnc_himtika ↗` dengan lencana interaktif, serta mengganti tombol "Deck" yang tebal dengan navigasi angka minimalis `1` s.d. `8` berapit panah `<` dan `>`.
  * **6 Pilar Divisi Peminatan Visual**: Menata 6 pilar divisi ke dalam grid 2-kolom responsif dengan ikon vektor Iconify (Software Eng, UI/UX, Data Science & AI, Competitive Programming, Cybersecurity, IoT & Hardware).

---

* **Perombakan Spacing Global & Diferensiasi Bab (Chapter Differentiation)**:
  * **Ruang Bernapas Vertikal Luas (Generous Spacing)**: Melipatgandakan padding section dari 48px-64px menjadi **80px s.d. 160px** (`py-20 sm:py-28 lg:py-32 xl:py-40`) untuk menghilangkan rasa sesak (*cramped visual fatigue*) dan memberikan jeda visual yang elegan antar segmen halaman ala standar Apple Keynote / Linear.
  * **Lencana Kicker Bab Resmi (Chapter Badges)**: Menambahkan lencana penanda bab di setiap awal section untuk memandu alur mental pengguna:
    * `CHAPTER 01 · TENTANG PROGRAM`
    * `CHAPTER 02 · PAMERAN & REKAYASA`
    * `CHAPTER 03 · DEK LOMBA TERKURASI`
    * `CHAPTER 04 · REGISTRASI & DELEGASI`
  * **Pemisah Garis Horizon Penuh (Full-Bleed Hairline Borders)**: Memperluas kontainer `<section>` menjadi `w-full` penuh dengan pembatas garis tipis horizontal (`border-b border-white/10` dan `border-[#2CFF05]/25`), memastikan setiap section memiliki batas visual yang tegas dari ujung ke ujung layar.
  * **Pemberian Tonal Latar Bergradasi (Atmospheric Depth)**: Setiap section memiliki karakter pencahayaan latar bertingkat (dari obsidian pekat `#03110A`, ke gradasi hijau zamrud halus pada Katalog Lomba, hingga slate institusional pada registrasi).

---

* **Aset Visual Dekoratif & Animasi Atmosferik Menyeluruh (Anti-Flat Polish)**:
  * **Sistem Partikel Kuantum 3D WebGL (*Cyber Dust Particles*)**: Menambahkan 120 partikel debu kuantum bercahaya (neon green `#2CFF05`, gold `#EFBF04`, dan emerald `#00674F`) di dalam scene Three.js Hero. Partikel melayang mengorbit secara volumetrik di sekitar Mahkota Cyber 3D dan tangan Adam/God dengan *additive blending* ringan tanpa membebani GPU.
  * **Aset Vektor Watermark Cyberpunk Tematik (SVG Murni)**:
    * *Chapter 01 (Tentang Program)*: Watermark skematik sirkuit mikroprosesor (*Cyber Circuit Schematic*) dengan jalur bus data dan node terminal.
    * *Chapter 02 (Dokumentasi Projek)*: Watermark retikel radar telemetri & osiloskop frekuensi (*Oscilloscope Reticle*).
    * *Chapter 03 (Katalog Lomba)*: Watermark konstelasi kartu remi geometris (*Spades, Hearts, Clubs, Diamonds Wireframe*) di belakang panggung dek 3D.
    * *Chapter 04 (Minat & Bakat)*: Watermark matriks heksagonal jaringan saraf (*Hexagonal Neural Matrix*).
  * **Pendaran Aurora Ambient (*Soft Mesh Glow Orbs*)**: Menginjeksikan pencahayaan ambient radial difus (`blur-[128px]` s.d. `blur-[140px]`) di latar belakang setiap bab, menghidupkan kanvas hitam menjadi atmosfer bercahaya organik.
  * **Braket Sudut HUD Siber (*Cyber Corner Brackets*) & Garis Shimmer**: Penambahan aksen sudut tech siku-siku pada kartu pilar dan kartu QR serta garis sinar pendar horizontal (`shimmer-divider`) yang bergerak menyapu batas horizon antar bab.

---

* **Penyelarasan Teks Alur & Mentoring Dosen**:
  * **Tahap 02 (Penjodohan Tim & Dosen)**: Memperbarui deskripsi alur pendaftaran menjadi *"Peserta dihubungkan ke rekan satu tim serta dicarikan dosen pembimbing ahli FASILKOM"* (menghilangkan batasan 'lintas semester' agar formasi tim lebih fleksibel).
  * **Inkubasi & Mentoring**: Mengoreksi deskripsi pilar mentoring menjadi *"Pendampingan pembuatan proposal kompetisi bersama dosen ahli FASILKOM"* (memperjelas bahwa peran bimbingan dosen difokuskan pada pendampingan proposal karya tulis/solusi inovasi kompetisi).

---

* **Penukaran Foto Kartu Visi Sesuai Arahan RnD & Responsivitas Khusus Tablet / iPad (768px - 1024px)**:
  * **Penukaran Foto Kartu Visi CnC (Card 02 & Card 03)**:
    * *Kartu 02 (02 · MENTOR AHLI / Bimbingan Dosen & Kurasi)*: Menggunakan foto konsultasi/bimbingan tatap muka dosen pembimbing dengan mahasiswa di laboratorium (`flood-alert-01.webp` / `flood-alert-01.jpg`).
    * *Kartu 03 (03 · PRESTASI LOMBA / Penyaluran Delegasi Nasional)*: Menggunakan foto tim delegasi mahasiswa berprestasi yang memegang prototipe/trofi perangkat keras (`smart-waste-04.webp` / `smart-waste-04.jpg`).
    * *Harmonisasi Aksi Footer Kartu*: Menyeragamkan panah navigasi pada kartu 02 menjadi `Lihat Alur →` serta menyematkan `gap-2` dan `shrink-0` agar label kiri dan tautan kanan tidak bertabrakan pada kartu sempit.
  * **Optimalisasi Responsif iPad & Tablet Portrait (768px - 834px)**:
    * *Footer Navigasi 2x2 Simetris*: Mengubah `.footer-links-grid` pada breakpoint `640px` dan `768px` menjadi grid seimbang 2-kolom x 2-baris (`repeat(2, 1fr)` dengan `gap: 36px 52px`), mengeliminasi total anomali kolom tunggal menggantung (*orphaned column* pada Aplikasi Publik).
    * *6 Pilar Divisi Peminatan*: Mengadopsi `grid-cols-2 md:grid-cols-3 lg:grid-cols-3` sehingga membentuk matriks simetris 3-kolom x 2-baris pada iPad/tablet portrait.
    * *Alur Tahapan 5 Langkah*: Menyelaraskan kontainer tahapan menjadi `md:grid-cols-5` untuk menghadirkan garis waktu horizontal (*connected pipeline*) terpadu di layar tablet.
    * *Kontainer Kartu Visi*: Menyesuaikan celah grid (`gap-4 sm:gap-4 lg:gap-6`) dan bantalan dalam (`p-4 sm:p-4.5 lg:p-5`) serta melonggarkan batas baris deskripsi (`line-clamp-3 sm:line-clamp-2 lg:line-clamp-3`) agar kalimat tersaji utuh tanpa terpotong di tengah kata.

---

* **Penyederhanaan Tipografi Kicker Bab & Lencana Tema (*Frameless Editorial Kickers*)**:
  * **Penghilangan Kotak Penutup (*Border & Capsule Removal*)**: Menghilangkan seluruh kotak pembungkus (*pill capsule border & background*) pada penanda bab resmi:
    * `• CHAPTER 01 · TENTANG PROGRAM`
    * `★ TEMA RESMI TAHUN 2026`
    * `• CHAPTER 02 · PAMERAN & REKAYASA`
    * `• CHAPTER 03 · DEK LOMBA TERKURASI`
    * `• CHAPTER 04 · REGISTRASI & DELEGASI`
    * `• KODE QR RESMI INSTAGRAM @CNC_HIMTIKA`
  * **Estetika Editorial Bersih**: Kicker kini tampil sebagai teks teknis murni (*clean monospaced kicker*) berwarna aksen hijau neon (`#2CFF05`) dan kuning emas (`#EFBF04`) dengan titik indikator pulsasi, menciptakan tata letak modern yang lapang dan terbebas dari kesan *badge overload*.

---

* **Penghilangan Kotak Penanda Dokumentasi & Nomor Projek (`#dokumen`)**:
  * **Penyelarasan Desain Tanpa Bingkai (*Frameless Typography*)**: Menghilangkan kotak kapsul (*pill container*) pada penanda galeri foto dan nomor projek:
    * `DOKUMENTASI · 5 FOTO` (Projek 01)
    * `PROJEK 01 · Computer Vision & IoT`
    * `DOKUMENTASI · 2 FOTO` (Projek 02)
    * `PROJEK 02 · IoT & Disaster Early Warning`
  * **Estetika Minimalis & Terpadu**: Elemen kini tampil sebagai teks monospace murni dengan bobot *font-bold* dan spasi aksara *tracking-wider* tanpa garis tepi maupun latar belakang kotak, konsisten dengan seluruh penanda bab pada halaman.

---

* **Penghilangan Kotak Status Kartu Lomba 3D & Tag Kata Kunci Visi (*Frameless Card Badges*)**:
  * **Top Bar Kartu Kompetisi 3D (40 Lomba)**:
    * Menghilangkan kotak persegi rank (`w-8 h-8 rounded-lg bg-[#00674F]/50 border`) dan kotak kapsul status pendaftaran (`px-2.5 py-1 rounded-full border`).
    * Ditransformasikan menjadi tipografi monospaced presisi tinggi: `{Rank} / ● {Status}` (misal `A♠ / ● CLOSED`, `K♦ / ● BATCH 2 OPEN`, `J♥ / ● SELESAI`) dengan titik status bercahaya (*glowing status dot*) dan warna semantik sesuai bidang.
  * **Tag Kata Kunci 3 Kartu Visi (`#tentang-cnc`)**:
    * Menghilangkan kotak pembungkus border (`rounded-md border`) pada tag tahapan (`Proposal · Fabrikasi · Pameran`, `Dosen Ahli · Sharing Alumni · Validasi`, `40+ Lomba · Poin SKPI · Sertifikat`).
    * Ditata sebagai deretan teks teknis bersih berpemisah titik tengah (`·`) yang anggun dan bebas dari kesan *badge fatigue*.

---

* **Penghilangan Titik Indikator / Bullets di Samping Teks (*Dot-Free Clean Typography*)**:
  * **Status Bilah Atas Kartu Kompetisi (40 Lomba)**: Menghilangkan titik lingkaran berwarna (*status indicator dot*) di samping status pendaftaran (`CLOSED`, `BATCH 2 OPEN`, `SELESAI`, `OPEN REG`). Teks status kini tampil bersih: `{Rank} / {Status}` (misal `A♠ / CLOSED`, `K♦ / BATCH 2 OPEN`, `J♥ / SELESAI`).
  * **Penanda Kicker Bab & Header Sub-Section**: Menghilangkan titik lingkaran pembuka (*leading bullets*) pada:
    * `CHAPTER 01 · TENTANG PROGRAM`
    * `3 PILAR UTAMA CNC`
    * `CHAPTER 02 · PAMERAN & REKAYASA`
    * `CHAPTER 03 · DEK LOMBA TERKURASI`
    * `PILIH KATEGORI LOMBA (5)`
    * `CHAPTER 04 · REGISTRASI & DELEGASI`
    * `KODE QR RESMI INSTAGRAM @CNC_HIMTIKA`
  * **Label Thumbnail Kartu Visi Program**: Menghilangkan titik lingkaran di samping judul thumbnail foto:
    * `Hardware, IoT & Software`
    * `Dosen FASILKOM UNSIKA`
    * `Kompetisi & Poin SKPI`
  * **Tampilan Minimalis Monospace**: Seluruh judul dan tag status kini berfokus pada tipografi monospace murni tanpa ornamen titik bulat.

---

* **Penghilangan Kotak Tombol pada Tautan Inline Instagram (`#lomba`)**:
  * **Tautan `@cnc_himtika ↗` Tanpa Kotak**: Menghilangkan kotak tombol kapsul (`border border-[#2CFF05]/40 bg-[#00674F]/40 px-2.5 py-0.5 rounded-lg`) pada teks paragraf pengantar Chapter 03.
  * **Tipografi Bersih Beraksen Neon**: Teks `@cnc_himtika ↗` kini tampil menyatu secara alami (*clean inline hyperlink*) dengan warna hijau neon (`#2CFF05`), font monospace tebal, dan efek garis bawah saat disorot (*hover:underline*), selaras dengan gaya editorial seluruh halaman.

---

### G. Responsivitas Khusus & Penyesuaian Antarmuka Mobile
* **Mobile Hamburger Navigation Drawer (`#mobile-menu`)**:
  * Menggunakan tata letak tetap (`fixed top-[75px] left-0 w-full h-[calc(100vh-75px)]`) dengan latar belakang gradien obsidian pekat murni (`#04140d` ke `#03110a`, `z-index: 100`).
  * Mencegah total masalah tembus pandang atau tabrakan teks (*zero collision*) dengan elemen halaman di belakangnya.
  * Dilengkapi pengunci gulir otomatis pada `body` saat menu dibuka (`overflow-hidden`).
  * Setiap tautan navigasi dilengkapi nomor indeks monospace (`01` s.d. `05`) dan tombol aksi pendaftaran (*CTA*) terpisah di bagian bawah.
* **Penyelarasan Footer Mobile Seimbang**:
  * Mengatur susunan kolom sitemap pada layar smartphone menjadi tata letak simetris terpusat (`text-center sm:text-left` dan `justify-items-center sm:justify-items-start`) untuk mengeliminasi ketimpangan visual ke sisi kiri (*terlalu kiri*).
* **Integrasi Visual & Reduksi Teks (*Anti Wall-of-Text*)**:
  * Mengintegrasikan foto prototipe mesin fisik nyata (`smart-waste-01.webp`) pada kartu Program Pengembangan Projek dan sesi inkubasi hardware IoT (`flood-alert-01.webp`) pada kartu Program Penyaluran Lomba.
  * Membatasi seluruh deskripsi fitur maksimal 2 baris (*line-clamp-2*) serta menggantikan teks paragraf panjang dengan chip tag visual ringkas.
  * Menambahkan lencana ikon visual pada 4 kartu manfaat (*Benefits*) dan menyematkan foto showcase mesin (`smart-waste-04.webp`) pada spanduk sensus projek mahasiswa.

---

## 6. Panduan Pengembang (Cara Menambah & Memodifikasi Konten)

### A. Cara Menambahkan Kompetisi Baru ke Katalog
1. Buka berkas `index.html`.
2. Cari kontainer pool kompetisi `#all-competitions-pool`.
3. Salin salah satu elemen `<div class="comp-card poker-card-wrap ...">` dan sesuaikan atributnya:
   * `data-card="NOMOR_KARTU"`
   * `data-category="software uiux web ai cyber"` (pilih kategori yang relevan dipisah spasi).
4. Ubah teks lambang kartu sudut (misal `[A♠]`, `[K♦]`), status lencana (`BATCH OPEN` / `CLOSED`), nama lomba, nama penyelenggara, nominal total hadiah, dan daftar divisi lomba.
5. Buka berkas `assets/js/main.js`, cari objek `COMP_DETAILS`.
6. Tambahkan entri detail untuk nomor kartu tersebut:
   ```javascript
   "41": {
     title: "NAMA KOMPETISI",
     organizer: "Nama Penyelenggara / Universitas",
     badge: "BATCH 1 OPEN",
     badgeClass: "border-[#2CFF05]/40 text-[#2CFF05] bg-[#2CFF05]/10",
     timeline: "1 Mei - 30 Juni 2026",
     level: "Nasional (Mahasiswa D3/D4/S1)",
     prize: "Rp 20.000.000",
     divisions: ["UI/UX Design", "Web Development", "Data Analytics"],
     requirements: "Mahasiswa aktif perguruan tinggi negeri/swasta di seluruh Indonesia.",
     guidebook: "https://bit.ly/GuidebookLombaContoh",
     registration: "https://bit.ly/DaftarLombaContoh"
   }
   ```
7. Perbarui angka counter kategori pada tombol filter di `index.html` (misal `Semua (41)`).

### B. Cara Menambahkan Slide Dokumentasi Projek Baru
1. Buka `index.html`, cari kontainer slide `#dokumen-slider`.
2. Gandakan elemen slide `<div class="dokumen-slide ...">`.
3. Sesuaikan struktur Bento 2-kolom:
   * Kolom Kiri: Narasi teknis (Latar Belakang & Masalah serta Mekanisme Kerja & Arsitektur).
   * Kolom Kanan: Galeri foto dengan tombol pemanggil modal `onclick="openPhotoModal('assets/images/...', 'Judul', 'Deskripsi', 'Kategori')"`
4. Buka `assets/js/main.js`, fungsi `initProjectSlider` akan otomatis menghitung jumlah total slide yang tersedia tanpa perlu mengubah kode JS.

### C. Cara Mengubah Aset Gambar
1. Tempatkan berkas gambar asli di `assets/images/` atau subfolder terkait (`projek-smart-waste/` atau `projek-flood-alert/`).
2. Selalu sediakan versi **WebP** di samping versi JPG/PNG untuk menjamin kecepatan unduhan browser modern.
3. Gunakan tag `<picture>` pada HTML:
   ```html
   <picture>
     <source srcset="assets/images/nama-foto.webp" type="image/webp">
     <img src="assets/images/nama-foto.jpg" alt="Deskripsi" width="800" height="600" loading="lazy" decoding="async">
   </picture>
   ```

---

## 7. Konfigurasi Deployment Statis

Proyek ini telah dilengkapi berkas konfigurasi hosting produksi bawaan:
* **`vercel.json`**: Mengaktifkan *Cache-Control* 1 tahun untuk seluruh aset gambar, SVG, dan WebP, serta *must-revalidate* untuk `index.html` agar pembaruan konten langsung terbaca seketika oleh pengunjung.
* **`netlify.toml`**: Standar konfigurasi header kompresi dan keamanan untuk deployment Netlify.
* **`_headers`**: Header otomatis untuk Cloudflare Pages.
* **`.htaccess`**: Modul kompresi Apache `mod_deflate` (Gzip) dan `mod_expires` untuk deployment cPanel hosting biasa.
* **`robots.txt` & `sitemap.xml`**: Standar SEO resmi agar seluruh tautan terindeks sempurna di mesin pencari Google.

---

## 8. Lisensi & Hak Pengembang

* **Organisasi**: Create and Compete (CnC) — Himpunan Mahasiswa Teknik Informatika (HIMTIKA) UNSIKA 2026/2027.
* **Fakultas**: Fakultas Ilmu Komputer, Universitas Singaperbangsa Karawang.
* **Lead Developer & UI/UX Architect**: Mohammed Ali Irsyad G. ([@Sy4d-G](https://github.com/Sy4d-G))
* **Email Kontak**: irsyadnetwork@gmail.com / irsyad@unsika.ac.id
