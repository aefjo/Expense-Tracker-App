import { Router } from "express";
import categoryController from "./category.controller";

const router = Router();
router.get("/", categoryController.GET_ALL); // Endpoint: GET /api/categories

export default router;