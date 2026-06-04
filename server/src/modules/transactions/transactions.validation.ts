import { z } from "zod";

export const createTransactionSchema = z.object({
  accountId: z.number().int({ message: "ID Akun harus berupa angka bulat" }),
  categoryId: z.number().int({ message: "ID Kategori harus berupa angka bulat" }),
  amount: z.number().positive({ message: "Nominal transaksi harus lebih dari 0" }),
  types: z.enum(["income", "expense"], { message: "Tipe harus 'income' atau 'expense'" }),
  notes: z.string().optional().nullable(),
  transactionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { 
    message: "Format tanggal harus YYYY-MM-DD" 
  }), // Validasi string tanggal standar HTML5 date picker
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;