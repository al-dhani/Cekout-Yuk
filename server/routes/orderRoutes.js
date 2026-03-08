import express from "express";
import { createOrder, getMyOrders, getAllOrders } from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", verifyToken, createOrder);
router.get("/my-orders", verifyToken, getMyOrders);

// ADMIN
router.get("/", verifyToken, isAdmin, getAllOrders);

export default router;