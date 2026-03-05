import db from "../db/connection.js";

// CREATE PRODUCT (ADMIN)
export const createProduct = (req, res) => {
  const { category_id, name, description, price, stock, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name & Price wajib diisi" });
  }

  const sql = `
    INSERT INTO products (category_id, name, description, price, stock, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [category_id, name, description, price, stock || 0, image],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({ message: "Produk berhasil dibuat 🔥" });
    }
  );
};

// GET ALL PRODUCTS (PUBLIC)
export const getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// GET PRODUCT BY ID (PUBLIC)
export const getProductById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(result[0]);
  });
};

// UPDATE PRODUCT (ADMIN)
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, price, stock, image } = req.body;

  const sql = `
    UPDATE products
    SET category_id=?, name=?, description=?, price=?, stock=?, image=?
    WHERE id=?
  `;

  db.query(
    sql,
    [category_id, name, description, price, stock, image, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Produk berhasil diupdate 🔥" });
    }
  );
};

// DELETE PRODUCT (ADMIN)
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Produk berhasil dihapus 🔥" });
  });
};