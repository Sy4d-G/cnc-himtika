# Create and Compete (CnC) — HIMTIKA UNSIKA

> **Official Technology Incubation, Project Mentorship & Curated National Competition Platform**  
> Himpunan Mahasiswa Teknik Informatika (HIMTIKA), Fakultas Ilmu Komputer, Universitas Singaperbangsa Karawang.

---

## 🌟 Ringkasan Proyek

**Create and Compete (CnC)** adalah platform web interaktif mandiri (*single-page application*) yang dibangun untuk memfasilitasi pembinaan mahasiswa Informatika UNSIKA dalam rekayasa proyek teknologi, pendataan delegasi berprestasi, dan kurasi kompetisi teknologi tingkat nasional hingga internasional.

Situs web ini dirancang dengan standar visual **Aesthetic Cyber-Dark / High-Tech Titanium Void** yang menggabungkan Three.js WebGL 3D, kartu remi kasino 3D interaktif, generator petir fraktal plasma 2D, slider dokumentasi proyek bento responsif, serta portal formulir minat dan bakat beresolusi tinggi.

---

## ✨ Fitur Utama

### 1. Hero Stage Mahkota Cyber 3D (*The Creation of Adam*)
* **Three.js WebGL Engine**: Mahkota cyber 3D titanium emas PBR (*Physically-Based Rendering*) dengan cincin orbit ganda, kristal melayang anti-gravitasi, dan pencahayaan dinamis.
* **Komposisi Klasik Digital**: Dibingkai tangan Adam & God dalam bentuk stippled point-cloud digital beresolusi tinggi dan disengat secara ritmis oleh generator petir fraktal plasma 2D bergantian kiri-kanan.
* **Mode Mobile Bersih**: Pada layar ponsel (`< 768px`), tangan dan petir dinonaktifkan otomatis agar baterai hemat dan panggung mahkota tampil minimalis terpusat.

### 2. Arsitektur Performa Ringan (*Zero-Quality-Loss Performance*)
* **IntersectionObserver Render Engine**: Loop rendering Three.js dan petir fraktal otomatis dijeda (`0% CPU & GPU idle`) saat pengguna menggulir ke section bawah, dan langsung aktif kembali di 60 FPS saat kembali ke Hero.
* **Per-Card RAF Throttling**: Efek hover spotlight dan tilt 3D kartu menggunakan `requestAnimationFrame` terisolasi pada kartu yang aktif saja, mengeliminasi ribuan reflow DOM yang tidak perlu.
* **Next-Gen WebP**: Seluruh aset gambar dikompresi ke WebP 95% dengan fallback `<picture>` untuk efisiensi transfer data hingga 88% lebih hemat.
* **Nol Pergeseran Tata Letak (CLS = 0)**: Dimensi rasio eksplisit `width` dan `height` disematkan pada seluruh elemen gambar.

### 3. Modul Mengenal CnC
* Kurikulum resmi pembinaan 5 pilar (Software Engineering, UI/UX, AI/Data Science, Cyber Security, dan IoT).
* Rincian alur seleksi tim, pendampingan dosen pembimbing, penyusunan proposal hibah, dan pameran prototipe.

### 4. Dokumentasi Projek Mahasiswa (Bento Carousel Slider)
* **Slide 01**: *Smart Medical Waste Sorter* — Pemilah Limbah Medis Berbahaya Otomatis FASILKOM UNSIKA (Pameran 2026).
* **Slide 02**: *Flood Early Alert System* — Sistem IoT Mitigasi Banjir Karawang Terintegrasi Bot Notifikasi.
* Dilengkapi modal lightbox foto interaktif resolusi tinggi dan tombol navigasi slider sejajar setinggi `h-11` (44px).

### 5. Katalog 40 Kompetisi Terkurasi (3D Cyber Poker Cards)
* Berisi 40 ajang kompetisi mahasiswa aktif yang dikurasi langsung dari analisis riil postingan akun resmi Instagram `@cnc_himtika`.
* **Deck Slider System**: Membagi 40 kartu ke dalam 4 tampilan slide (10 kartu per view) dengan status pendaftaran aktual dan rincian hadiah konkret.
* **Grid Multi-Tier Adaptif**:
  * Smartphone (< 640px): 1 kolom
  * Tablet (640-991px): 2 kolom
  * Laptop Kecil (992-1199px): 3 kolom
  * Laptop Standar (1200-1399px): 4 kolom
  * Desktop Besar (>= 1400px): 5 kolom simetris
* **Filter Multi-Row Wrapped**: Seluruh 5 kategori lomba (`Semua (40)`, `UI/UX Design (16)`, `Web & Mobile (27)`, `AI & Data (12)`, `Cyber & IoT (10)`) langsung terlihat utuh dan dapat disentuh di layar ponsel tanpa terpotong.

### 6. Portal Formulir Minat & Bakat
* Integrasi QR Code statis beresolusi tinggi menuju link resmi `https://bit.ly/MinatBakatCnC`.
* Kartu kontak narahubung resmi dan saluran langsung WhatsApp koordinator pembinaan.

### 7. Footer Identitas Terpusat
* Emblem CnC hijau bercahaya berukuran proporsional yang tegak lurus sejajar secara simetris di atas logo TikTok dan deretan 5 ikon media sosial resmi.
* Direktori tautan ekosistem HIMTIKA UNSIKA (Tentang Kami, Media, Event, dan Aplikasi Publik).

---

## 📁 Struktur Direktori

```text
cnc-himtika/
├── index.html                   # Berkas markup utama (bebas komentar, terstruktur)
├── README.md                    # Dokumentasi arsitektur dan panduan proyek
├── .gitignore                   # Konfigurasi pengabaian berkas Git
├── vercel.json                  # Konfigurasi header dan caching untuk Vercel
├── netlify.toml                 # Konfigurasi header dan caching untuk Netlify
├── _headers                     # Konfigurasi header Cloudflare Pages
├── .htaccess                    # Aturan kompresi Gzip dan browser cache Apache
├── robots.txt                   # Kebijakan crawler mesin pencari
├── sitemap.xml                  # Peta situs resmi untuk pengindeksan SEO
└── assets/
    ├── css/
    │   └── style.css            # Seluruh aturan gaya kustom (animasi, poker card, bento)
    ├── js/
    │   └── main.js              # Logika Three.js, petir fraktal, slider, filter, dan modal
    └── images/
        ├── logo-cnc-website.png
        ├── logo-cnc-website.webp
        ├── adam_hand_left_smooth.png
        ├── adam_hand_left_smooth.webp
        ├── god_hand_right_smooth.png
        ├── god_hand_right_smooth.webp
        ├── cnc-logo-footer.svg
        ├── img-himtika.webp
        ├── qr-minat-bakat-cnc.png
        ├── qr-minat-bakat-cnc.webp
        ├── projek-smart-waste/
        │   ├── smart-waste-01.jpg (.webp)
        │   └── ...
        └── projek-flood-alert/
            ├── flood-alert-01.jpg (.webp)
            └── ...
```

---

## 🛠️ Palet Warna Resmi

| Peran | Hex Code | Deskripsi Visual |
|---|---|---|
| **Void Base** | `#03110A` - `#071A11` | Latar belakang hitam obsidian kehijauan pekat |
| **Emerald Green** | `#00674F` | Warna identitas resmi HIMTIKA UNSIKA |
| **Neon Lime** | `#2CFF05` | Aksen tombol primer, status pendaftaran aktif, dan kilau cahaya |
| **Gold / Amber** | `#EFBF04` | Badge nominal hadiah juara, aksen emas kartu poker dan mahkota |
| **Olive Green** | `#636B2F` | Garis pembatas hairline kartu bento dan pembagi section |

---

## 🚀 Panduan Menjalankan Secara Lokal

Website ini berarsitektur murni **HTML5, Vanilla CSS3, dan Vanilla JavaScript (ES6+)** tanpa ketergantungan build tool yang rumit:

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/Sy4d-G/cnc-himtika.git
   cd cnc-himtika
   ```

2. **Jalankan via Local Server**:
   Anda dapat menggunakan ekstensi *Live Server* di VS Code atau menjalankan server lokal instan via Python:
   ```bash
   # Menggunakan Python 3
   python -m http.server 8000
   ```
   Buka peramban di `http://localhost:8000`.

---

## 🌐 Panduan Deployment

Karena seluruh aset berstatus statis, situs ini dapat langsung di-deploy secara instan ke berbagai penyedia hosting:

* **Vercel**: Cukup impor repositori Git ini. Berkas `vercel.json` akan otomatis mengaktifkan *Cache-Control* 1 tahun untuk aset statis dan *must-revalidate* untuk HTML.
* **Netlify**: Impor repositori atau tarik folder ke antarmuka Netlify Drop. Berkas `netlify.toml` telah siap pakai.
* **Cloudflare Pages**: Hubungkan repositori Git dengan build command kosong dan output directory `.`. Berkas `_headers` akan mengatur *security headers* secara otomatis.
* **GitHub Pages**: Buka *Settings* → *Pages*, pilih branch `main` dan direktori `/ (root)`.
* **cPanel / Apache**: Unggah seluruh isi repositori ke folder `public_html`. Berkas `.htaccess` akan mengaktifkan kompresi Gzip dan *browser caching*.

---

## 👤 Pengembang & Hak Cipta

* **Penyelenggara**: Create and Compete (CnC) HIMTIKA UNSIKA
* **Fakultas**: Fakultas Ilmu Komputer, Universitas Singaperbangsa Karawang
* **Lead Developer & Designer**: Mohammed Ali Irsyad G. ([@Sy4d-G](https://github.com/Sy4d-G))
* **Lisensi**: Hak cipta dilindungi oleh undang-undang. Diotorisasi dan diawasi oleh Himpunan Mahasiswa Teknik Informatika (HIMTIKA) UNSIKA 2026/2027.
