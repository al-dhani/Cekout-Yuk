import db from "../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, "customer"],
          (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({ message: "User berhasil dibuat" });
          },
        );
      },
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(400).json({ message: "Email tidak ditemukan" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Password salah" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({
        message: "Login berhasil",
        token,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      });
    },
  );
};

export const getAllUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, role FROM users",
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    }
  );
};
