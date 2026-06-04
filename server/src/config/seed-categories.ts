import { db } from "./db";
import { categories } from "./schema";

const defaultCategories = [
  // Tipe: Expense (Pengeluaran)
  { name: "Makanan & Minuman", description: "expense" },
  { name: "Transportasi", description: "expense" },
  { name: "Belanja & Hiburan", description: "expense" },
  { name: "Tagihan & Utilitas", description: "expense" },
  { name: "Kesehatan & Medis", description: "expense" },
  
  // Tipe: Income (Pemasukan)
  { name: "Gaji Utama (Payslips)", description: "income" },
  { name: "Investasi & Saham", description: "income" },
  { name: "Uang Saku / Hiburan", description: "income" },
  { name: "Sampingan (Freelance)", description: "income" },
];

export const seedCategories = async () => {
  try {
    console.log("⏳ Sedang memasukkan data kategori ke database...");
    
    // Memasukkan data kategori standar
    await db.insert(categories).values(defaultCategories);
    
    console.log("✅ Data kategori berhasil dimasukkan!");
  } catch (error) {
    console.error("❌ Gagal seeding kategori:", error);
  }
};


// ... kode defaultCategories dan fungsi seedCategories yang kemarin ...

// TAMBAHKAN BARIS INI DI PALING BAWAH FILE:
seedCategories().then(() => {
  console.log("👋 Proses selesai, keluar dari script.");
  process.exit(0);
}).catch((err) => {
  console.error("❌ Terjadi error:", err);
  process.exit(1);
});
// Panggil fungsi ini sekali saja (bisa kamu jalankan lewat index.ts saat server pertama start, lalu matikan lagi jika sudah masuk ke DB)