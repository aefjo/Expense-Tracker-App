import express, { Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import UserRoutes from './modules/user/user.route'
import AccountRoute from "./modules/account/account.route";
import TransactionsRoute from "./modules/transactions/transactions.route";
import CategoriesRoute from "./modules/category/category.route";
import ReportRoute from './modules/reports/reports.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', UserRoutes);
app.use("/api/accounts", AccountRoute);
app.use("/api/transactions", TransactionsRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/reports", ReportRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello Express + TypeScript 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});