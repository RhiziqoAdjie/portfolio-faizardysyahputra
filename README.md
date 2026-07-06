# Civil Engineer Portfolio — Website Portofolio Teknik Sipil

Website portofolio profesional bertema **struktur & kerangka bangunan (blueprint)**, dibangun dengan:

- **Next.js 14** (React, App Router) — framework front-end
- **Tailwind CSS** — styling, dengan palet warna & motif custom bertema teknik sipil
- **JavaScript** (bukan TypeScript, sesuai permintaan)
- **Node.js API Routes** (bawaan Next.js) sebagai backend ringan — tidak perlu server terpisah seperti Laravel, tetapi tetap menyediakan REST API sungguhan (`/api/...`) untuk mengelola data
- **Panel Admin bawaan** — agar pemilik website (non-IT) bisa menambah/mengubah/menghapus Project, Experience, dan Certificate tanpa menyentuh kode sama sekali

> Catatan soal Laravel: proyek ini **tidak** memakai Laravel. Backend dibuat memakai API Routes Next.js (Node.js) supaya semuanya jadi **satu aplikasi** yang mudah dijalankan, di-deploy, dan dirawat oleh satu orang tanpa perlu mengelola dua server berbeda (Laravel + Next.js). Jika suatu saat Anda benar-benar butuh Laravel (misal karena tim sudah punya backend Laravel), lihat bagian **"Migrasi ke Laravel (opsional)"** di bawah.

---

## 1. Fitur

- ✅ Halaman: **Home, About, Projects, Experience, Certificates**
- ✅ Ganti bahasa **Indonesia ⇄ English** (tersimpan di browser, termasuk konten dinamis seperti judul & deskripsi project)
- ✅ Ganti tema **Gelap (Dark) ⇄ Terang (Light)** dengan palet warna & motif garis blueprint/kerangka bangunan yang berbeda di tiap tema (tersimpan di browser)
- ✅ Desain modern, aesthetic, dengan motif grid blueprint tipis, garis truss/rangka, dan sudut "drafting mark" di setiap kartu
- ✅ **Panel Admin** (`/admin`) dengan login password untuk:
  - Mengubah data Profil (nama, foto, bio, kontak, skill)
  - Tambah / Ubah / Hapus **Project**
  - Tambah / Ubah / Hapus **Experience** (pekerjaan & pendidikan)
  - Tambah / Ubah / Hapus **Certificate**
  - Upload gambar langsung dari form (tanpa perlu FTP / akses server)
- ✅ Semua data disimpan sebagai file JSON di folder `/data`, mudah dibackup, dan tetap bisa diedit lewat panel admin

---

## 2. Struktur Folder Penting

```
portfolio-website/
├── data/                     # Semua konten website (JSON) — diubah otomatis oleh panel admin
│   ├── profile.json
│   ├── projects.json
│   ├── experience.json
│   └── certificates.json
├── public/uploads/           # Gambar yang diupload lewat panel admin
├── src/
│   ├── app/                  # Halaman & API routes (Next.js App Router)
│   │   ├── page.js           # Halaman Home
│   │   ├── about/            # Halaman About
│   │   ├── projects/         # Halaman Projects
│   │   ├── experience/       # Halaman Experience
│   │   ├── certificates/     # Halaman Certificates
│   │   ├── admin/            # Halaman login & dashboard admin
│   │   └── api/               # REST API (profile, projects, experience, certificates, auth, upload)
│   ├── components/           # Komponen UI (Navbar, Card, Toggle tema/bahasa, dll)
│   ├── context/               # React Context untuk tema & bahasa
│   └── lib/                   # Helper (translations, penyimpanan data, autentikasi)
├── .env.example               # Contoh isi file .env
├── package.json
└── tailwind.config.js         # Palet warna & motif tema
```

---

## 3. Cara Menjalankan di Komputer Sendiri (Development)

**Prasyarat:** sudah terinstal [Node.js](https://nodejs.org) versi 18 ke atas.

1. Ekstrak folder zip ini, lalu buka terminal di dalam folder `portfolio-website`.
2. Install semua dependency:
   ```bash
   npm install
   ```
3. Salin file `.env.example` menjadi `.env`, lalu ganti nilai berikut:
   ```
   ADMIN_PASSWORD=password-anda-sendiri
   SESSION_SECRET=string-acak-yang-panjang
   ```
4. Jalankan aplikasi dalam mode development:
   ```bash
   npm run dev
   ```
5. Buka browser ke `http://localhost:3000` untuk melihat website, dan `http://localhost:3000/admin` untuk login ke panel admin (gunakan password dari `ADMIN_PASSWORD`).

---

## 4. Cara Mengupdate Konten (Untuk Pengguna Non-IT)

Anda **tidak perlu membuka kode sama sekali**. Semua bisa dilakukan lewat panel admin:

1. Buka `https://domain-anda.com/admin` (atau `http://localhost:3000/admin` saat development).
2. Masukkan password admin.
3. Di Dashboard, pilih menu yang ingin diubah:
   - **Profile** — nama, foto, bio (Inggris & Indonesia), kontak, link sosial media, dan daftar skill.
   - **Projects** — tombol "+ Add New" untuk menambah project baru, tombol "Edit"/"Delete" pada tiap project yang sudah ada.
   - **Experience** — sama seperti Projects, untuk riwayat pekerjaan/pendidikan.
   - **Certificates** — sama seperti Projects, untuk sertifikat.
4. Untuk gambar (foto profil, foto project, foto sertifikat), klik tombol **"Upload Image"**, pilih file dari komputer/HP Anda — gambar otomatis tersimpan dan langsung terpasang.
5. Klik **"Save Changes"**. Perubahan langsung tampil di website tanpa perlu deploy ulang.

Semua teks (judul & deskripsi) punya dua kolom: **English** dan **Indonesian** — isi keduanya supaya tombol ganti bahasa di website berfungsi dengan baik.

---

## 5. Cara Deploy ke Internet (Hosting)

Karena panel admin ini menyimpan data & gambar langsung ke **file di server** (folder `/data` dan `/public/uploads`), pilih salah satu opsi berikut:

### Opsi A — VPS / Server Sendiri (Direkomendasikan, paling sesuai fitur admin ini)
Cocok untuk: DigitalOcean, Contabo, Niagahoster VPS, AWS EC2, dll.

```bash
npm install
npm run build
npm run start   # atau gunakan pm2 agar tetap berjalan: pm2 start npm --name portfolio -- start
```
Gunakan Nginx sebagai reverse proxy dan pasang SSL (Let's Encrypt/Certbot) agar bisa diakses dengan HTTPS.

### Opsi B — Platform seperti Railway / Render / Fly.io
Platform ini mendukung Node.js server dengan disk yang persisten (tidak hilang tiap deploy), jadi folder `/data` dan `/public/uploads` tetap aman. Ikuti dokumentasi masing-masing platform untuk "Deploy Node.js app" dan pastikan mengaktifkan **persistent volume/disk**.

### ⚠️ Tidak disarankan: Vercel / Netlify (Serverless)
Next.js paling sering di-deploy ke Vercel, **namun** pada Vercel, filesystem bersifat *read-only* (kecuali folder sementara `/tmp` yang akan hilang tiap deploy). Ini berarti:
- Perubahan lewat panel admin **tidak akan tersimpan permanen** di Vercel.
- Jika Anda tetap ingin pakai Vercel, Anda perlu mengganti penyimpanan data dari file JSON ke database eksternal (misalnya Supabase, PlanetScale, MongoDB Atlas, atau Firebase). Ini butuh sedikit perubahan kode di `src/lib/dataStore.js` dan `src/app/api/upload/route.js` — silakan minta bantuan developer bila diperlukan.

---

## 6. Mengganti Password Admin

Ubah nilai `ADMIN_PASSWORD` di file `.env`, lalu restart aplikasi (`npm run start` ulang, atau restart service di hosting Anda).

---

## 7. Kustomisasi Warna & Tema

Semua warna diatur terpusat di `tailwind.config.js` bagian `theme.extend.colors`:

- **Tema Terang ("blueprint paper")**: `paper`, `ink`, `steel`, `rust`, dll.
- **Tema Gelap ("night blueprint")**: `blueprint`, `cyanLine`, `electric`, `amberSafety`, dll.

Ganti kode warna (hex) di sana untuk menyesuaikan branding pribadi Anda, tanpa perlu mengubah komponen lain.

---

## 8. Migrasi ke Laravel (opsional, untuk developer)

Jika ke depannya proyek berkembang dan Anda ingin backend terpisah menggunakan **Laravel** (misalnya tim sudah punya infrastruktur Laravel, butuh database relasional besar, atau ingin backend dipakai bersama aplikasi lain):

1. Buat project Laravel baru sebagai REST API (`laravel new portfolio-api`), lalu buat model & migration untuk `Project`, `Experience`, `Certificate`, dan `Profile` (mirror struktur field dari file JSON di `/data`).
2. Buat Controller + route API (`routes/api.php`) dengan endpoint yang sama persis polanya dengan yang ada di `src/app/api/*/route.js` saat ini (GET list, POST create, PUT update, DELETE).
3. Di sisi Next.js, ganti pemanggilan `fetch("/api/projects")` dkk. (di halaman & komponen admin) menjadi `fetch("https://api-laravel-anda.com/api/projects")`.
4. Pindahkan logika autentikasi admin ke Laravel Sanctum/Passport, lalu sesuaikan `src/lib/auth.js` dan halaman login admin agar memanggil endpoint Laravel.
5. Upload gambar diarahkan ke endpoint upload Laravel (storage disk Laravel) menggantikan `src/app/api/upload/route.js`.

Next.js akan tetap berjalan sebagai front-end murni, sementara Laravel menjadi backend/API terpisah — arsitektur umum "headless" yang banyak dipakai di industri.

---

## 9. Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Framework Front-end | Next.js 14 (React 18, App Router) |
| Styling | Tailwind CSS |
| Bahasa | JavaScript (JSX) |
| Backend | Next.js API Routes (Node.js) |
| Penyimpanan data | File JSON (mudah di-migrasi ke database bila perlu) |
| Autentikasi Admin | Session cookie ber-signature (HMAC SHA-256, tanpa dependency tambahan) |

---

Selamat menggunakan! Jika ingin menambahkan menu/section baru (misalnya "Testimonials" atau "Blog"), struktur di atas dirancang agar mudah ditiru: cukup buat folder halaman baru di `src/app/`, file data JSON baru di `data/`, dan API route baru di `src/app/api/`, lalu tambahkan menu di `src/components/Navbar.js`.
