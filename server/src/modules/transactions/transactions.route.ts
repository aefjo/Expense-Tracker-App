import { Router } from "express";
import { TransactionsController } from "./transactions.controller";

const router = Router();
const controller = new TransactionsController();

// Mengarahkan langsung ke fungsi di controller
router.post("/", controller.CREATE);
router.get("/", controller.GET_ALL);

export default router;