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
  * *Desktop (>=1024px)*: Pembagian proporsional 32% kolom identitas rata kiri dan 65% grid 4-kolom sitemap terdistribusi simetris (`Tentang Kami` rata kiri, `Media` & `Event` terpusat, `Aplikasi Publik` rata kanan).
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
