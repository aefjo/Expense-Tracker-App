import { Request, Response } from "express";
import { db } from "../../config/db";
import { transactions, users } from "../../config/schema";
import { eq } from "drizzle-orm";

interface AuthenticatedRequest extends Request {
  auth?: {
    userId?: string;
  };
}

export class ReportsController {
  GET_SUMMARY = async (req: AuthenticatedRequest, res: Response) => {
    try {
      let activeUserId: number | null = null;

      // Ambil User ID dari Clerk Token / Fallback User pertama
      const clerkUserId = req.auth?.userId;
      if (clerkUserId) {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, clerkUserId)).limit(1);
        if (dbUser.length > 0) activeUserId = dbUser[0].id;
      }

      if (!activeUserId) {
        const fallbackUser = await db.select().from(users).limit(1);
        if (fallbackUser.length === 0) {
          return res.status(200).json({ success: true, data: { totalIncome: 0, totalExpense: 0, netSavings: 0, categoryBreakdown: [] } });
        }
        activeUserId = fallbackUser[0].id;
      }

      // Ambil seluruh riwayat transaksi milik user tersebut
      const allTransactions = await db.query.transactions.findMany({
        where: eq(transactions.userId, activeUserId),
        with: {
          category: { columns: { name: true } }
        }
      });

      let totalIncome = 0;
      let totalExpense = 0;
      const categoryMap: Record<number, { name: string; type: 'income' | 'expense'; total: number }> = {};

      // Iterasi untuk menjumlahkan total income, expense, dan per kategori
      allTransactions.forEach((tx) => {
        const amount = parseFloat(tx.amount);
        const categoryId = tx.categoryId;
        const categoryName = tx.category?.name || "Lainnya";

        if (tx.types === 'income') {
          totalIncome += amount;
        } else {
          totalExpense += amount;
        }

        if (!categoryMap[categoryId]) {
          categoryMap[categoryId] = { name: categoryName, type: tx.types, total: 0 };
        }
        categoryMap[categoryId].total += amount;
      });

      const netSavings = totalIncome - totalExpense;

      // Format struktur breakdown kategori dan hitung persentasenya
      const categoryBreakdown = Object.keys(categoryMap).map((id) => {
        const catId = Number(id);
        const item = categoryMap[catId];
        const baseTotal = item.type === 'income' ? totalIncome : totalExpense;
        const percentage = baseTotal > 0 ? Math.round((item.total / baseTotal) * 100) : 0;

        return {
          categoryId: catId,
          categoryName: item.name,
          type: item.type,
          totalAmount: item.total,
          percentage: percentage
        };
      });

      // Urutkan kategori dari nominal pengeluaran/pemasukan terbesar
      categoryBreakdown.sort((a, b) => b.totalAmount - a.totalAmount);

      return res.status(200).json({
        success: true,
        data: {
          totalIncome,
          totalExpense,
          netSavings,
          categoryBreakdown
        }
      });

    } catch (error) {
      console.error("❌ Error GET_SUMMARY Backend:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
}