import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllCategories);

// ADMIN ONLY
router.post("/", verifyToken, isAdmin, createCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;