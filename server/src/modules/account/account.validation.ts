import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, { message: "Nama akun/dompet tidak boleh kosong" }),
  // balance dibuat opsional, jika frontend tidak kirim, kita default ke 0
  balance: z.number().optional().default(0), 
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;