import db from "../db/connection.js";


// ===============================
// ADD TO CART
// ===============================
export const addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Product & quantity wajib diisi" });
  }

  // Cek stock dulu
  db.query(
    "SELECT stock FROM products WHERE id = ?",
    [product_id],
    (err, productResult) => {
      if (err) return res.status(500).json(err);
      if (productResult.length === 0)
        return res.status(404).json({ message: "Produk tidak ditemukan" });

      const stock = productResult[0].stock;
      if (quantity > stock)
        return res.status(400).json({ message: "Stock tidak cukup" });

      // Cek apakah user sudah punya cart
      db.query(
        "SELECT * FROM carts WHERE user_id = ?",
        [userId],
        (err, cartResult) => {
          if (err) return res.status(500).json(err);

          if (cartResult.length === 0) {
            // Buat cart baru
            db.query(
              "INSERT INTO carts (user_id) VALUES (?)",
              [userId],
              (err, result) => {
                if (err) return res.status(500).json(err);

                const cartId = result.insertId;
                insertCartItem(cartId);
              }
            );
          } else {
            const cartId = cartResult[0].id;
            insertCartItem(cartId);
          }
        }
      );

      function insertCartItem(cartId) {
        // Cek apakah produk sudah ada di cart
        db.query(
          "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
          [cartId, product_id],
          (err, itemResult) => {
            if (err) return res.status(500).json(err);

            if (itemResult.length > 0) {
              // Kalau sudah ada → update quantity
              const newQty = itemResult[0].quantity + quantity;

              if (newQty > stock)
                return res
                  .status(400)
                  .json({ message: "Stock tidak cukup" });

              db.query(
                "UPDATE cart_items SET quantity=? WHERE id=?",
                [newQty, itemResult[0].id],
                (err) => {
                  if (err) return res.status(500).json(err);
                  res.json({ message: "Quantity berhasil ditambah 🔥" });
                }
              );
            } else {
              // Insert baru
              db.query(
                "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
                [cartId, product_id, quantity],
                (err) => {
                  if (err) return res.status(500).json(err);
                  res.json({ message: "Produk masuk ke cart 🔥" });
                }
              );
            }
          }
        );
      }
    }
  );
};



// ===============================
// GET MY CART
// ===============================
export const getMyCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      cart_items.id,
      products.name,
      products.price,
      cart_items.quantity,
      (products.price * cart_items.quantity) AS subtotal
    FROM carts
    JOIN cart_items ON carts.id = cart_items.cart_id
    JOIN products ON cart_items.product_id = products.id
    WHERE carts.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};



// ===============================
// UPDATE CART ITEM
// ===============================
export const updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity)
    return res.status(400).json({ message: "Quantity wajib diisi" });

  db.query(
    "UPDATE cart_items SET quantity=? WHERE id=?",
    [quantity, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Cart berhasil diupdate 🔥" });
    }
  );
};



// ===============================
// REMOVE CART ITEM
// ===============================
export const removeCartItem = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM cart_items WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item berhasil dihapus 🔥" });
  });
};