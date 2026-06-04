import { Request, Response } from "express";
import { db } from "../../config/db";
import { categories } from "../../config/schema";

export class CategoryController {
  GET_ALL = async (req: Request, res: Response) => {
    try {
      const allCategories = await db.select().from(categories);
      return res.status(200).json({
        success: true,
        message: "Get categories successful",
        data: allCategories,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
}
export default new CategoryController();