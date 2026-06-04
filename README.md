# 💰 HematIn - Expense Tracker App

HematIn adalah aplikasi manajemen keuangan personal berbasis web yang dirancang untuk membantu pengguna mencatat pemasukan, melacak pengeluaran harian, serta menganalisis struktur alokasi dana secara real-time melalui visualisasi data yang modern.

Proyek ini dibangun menggunakan arsitektur terpisah (*decoupled architecture*) yang memisahkan sisi Frontend dan Backend.

---

## 🛠️ Tech Stack & Arsitektur

Aplikasi ini dibagi menjadi dua repositori internal (Monorepo/Split Folders):

### 1. Frontend (`/client`)
* **Framework:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS & Shadcn UI Components
* **Authentication:** Clerk Auth
* **Icons:** Lucide React

### 2. Backend (`/server`)
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript / JavaScript (Node.js)

---

## 🚀 Panduan Instalasi & Cara Menjalankan

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi HematIn di komputer lokal Anda.

### Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
* [Node.js](https://nodejs.org/) (Versi 18 ke atas direkomendasikan)
* NPM (Otomatis terinstal bersama Node.js) atau Yarn

---

### Langkah 1: Clone Repositori
Buka terminal Anda, lalu jalankan perintah berikut:
```bash
git clone [https://github.com/username_kamu/expense-tracker-app.git](https://github.com/username_kamu/expense-tracker-app.git)
cd expense-tracker-app
```


### Langkah 2: Konfigurasi & Jalankan Backend Server (/server)
1. Masuk ke dalam folder server:
cd server

2. Instal semua dependencies backend:
npm install

3. Buat file .env di dalam folder server ini dan lengkapi variabel lingkungan yang dibutuhkan (misalnya koneksi database, port, jwt secret, dll). Contoh:
PORT=5000
DATABASE_URL=isi_dengan_url_database_anda

4. Jalankan server Express:
npm run dev
Server backend sekarang berjalan di http://localhost:5000 (atau port sesuai .env).



Langkah 3: Konfigurasi & Jalankan Frontend Client (/client)
1. Buka terminal baru, lalu masuk ke folder client dari folder utama:
cd client

2. Instal semua dependencies frontend:
npm install

3. Buat file .env.local di dalam folder client ini untuk mengaktifkan fitur autentikasi Clerk dan menghubungkan ke API backend:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=http://localhost:5000

4. Jalankan aplikasi Next.js dalam mode development:
npm run dev
Buka browser Anda dan akses halaman: http://localhost:3000




📈 Fitur Utama Aplikasi
- Autentikasi Aman: Login dan registrasi menggunakan sistem integrasi Clerk.
- Dashboard Finansial Melayang: Menampilkan total saldo terkonsolidasi dari seluruh dompet aktif.
- Multi-Wallet Management: Pengguna bisa membuat banyak dompet terpisah (Cash, Bank BCA, E-Wallet, dll) dan melacak mutasinya sendiri-sendiri.
- Analisis Pengeluaran Premium: Laporan persentase distribusi anggaran masuk dan keluar dengan progress bar visual gradasi warna yang interaktif.
