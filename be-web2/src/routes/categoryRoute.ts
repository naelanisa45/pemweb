import express from "express";
import { 
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
 } from "../controllers/categoryController.js"

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;