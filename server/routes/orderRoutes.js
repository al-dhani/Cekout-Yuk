import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", verifyToken, createOrder);
router.get("/my-orders", verifyToken, getMyOrders);

export default router;