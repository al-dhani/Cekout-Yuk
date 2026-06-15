import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ADMIN ONLY
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createProduct
);

export default router;