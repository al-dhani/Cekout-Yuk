import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Selamat datang admin 🔥",
    user: req.user
  });
});

// route ambil semua user
router.get("/users", verifyToken, isAdmin, getAllUsers);

export default router;