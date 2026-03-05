import express from "express";
import {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getMyCart);
router.put("/update/:id", verifyToken, updateCartItem);
router.delete("/remove/:id", verifyToken, removeCartItem);

export default router;