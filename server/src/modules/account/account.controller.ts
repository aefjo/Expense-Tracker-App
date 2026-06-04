import { Request, Response } from "express";
import { db } from "../../config/db";
import { accounts, users, transactions } from "../../config/schema";
import { eq } from "drizzle-orm";
import { createAccountSchema } from "./account.validation";

export class AccountController {
  // 1. MEMBUAT AKUN/DOMPET BARU
  CREATE = async (req: Request, res: Response) => {
    try {
      const validatedData = createAccountSchema.parse(req.body);
      
      // TODO: Ganti angka '1' ini dengan ID User asli yang didapat dari token/session Clerk kamu nanti
      const mockUserId = 1; 

      const [newAccount] = await db
        .insert(accounts)
        .values({
          userId: mockUserId,
          name: validatedData.name,
          // Drizzle decimal menerima string agar presisi nilainya terjaga
          balance: validatedData.balance.toString(), 
        })
        .returning();

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: newAccount,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation Error", error: error.errors });
      }
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  // 2. MENDAPATKAN SEMUA DOMPET MILIK USER TERTENTU
  GET_ALL = async (req: Request, res: Response) => {
    try {
      // TODO: Ganti dengan ID User dari Clerk
      const mockUserId = 1; 

      const userAccounts = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, mockUserId));

      return res.status(200).json({
        success: true,
        message: "Get accounts successful",
        data: userAccounts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  GET_ACCOUNT_TRANSACTIONS = async (req: Request, res: Response) => {
    try {
      const accountId = Number(req.params.id);

      // Ambil transaksi yang hanya sesuai dengan ID Dompet tersebut
      const history = await db.query.transactions.findMany({
        where: eq(transactions.accountId, accountId),
        orderBy: (transactions, { desc }) => [desc(transactions.transactionDate)],
        with: {
          category: {
            columns: { name: true }
          }
        }
      });

      return res.status(200).json({
        success: true,
        message: "Berhasil mengambil mutasi dompet",
        data: history,
      });
    } catch (error) {
      console.error("❌ Error GET_ACCOUNT_TRANSACTIONS Backend:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default new AccountController();