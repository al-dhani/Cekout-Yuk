import db from "../db/connection.js";

// CREATE
export const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nama kategori wajib diisi" });
  }

  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({ message: "Kategori berhasil dibuat 🔥" });
    }
  );
};

// GET ALL
export const getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// UPDATE
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query(
    "UPDATE categories SET name=? WHERE id=?",
    [name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Kategori berhasil diupdate 🔥" });
    }
  );
};

// DELETE
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categories WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Kategori berhasil dihapus 🔥" });
  });
};