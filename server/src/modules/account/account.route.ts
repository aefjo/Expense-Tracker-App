import { Router } from "express";
import accountController from "./account.controller";

const router = Router();

// Endpoint: POST /api/accounts (Buat akun)
router.post("/", accountController.CREATE);

// Endpoint: GET /api/accounts (Ambil semua akun user)
router.get("/", accountController.GET_ALL);

router.get("/:id/transactions", accountController.GET_ACCOUNT_TRANSACTIONS);

export default router;