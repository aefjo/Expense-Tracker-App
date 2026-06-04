import { Router } from "express";
import { ReportsController } from "./reports.controller";

const router = Router();
const controller = new ReportsController();

router.get("/summary", controller.GET_SUMMARY);

export default router;