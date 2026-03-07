import db from "../db/connection.js";

export const createOrder = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT carts.id as cart_id, cart_items.product_id, cart_items.quantity, products.price
     FROM carts
     JOIN cart_items ON carts.id = cart_items.cart_id
     JOIN products ON cart_items.product_id = products.id
     WHERE carts.user_id = ?`,
    [userId],
    (err, cartItems) => {
      if (err) return res.status(500).json(err);

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart kosong" });
      }

      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });

      const orderCode = "ORD-" + Date.now();

      db.query(
        "INSERT INTO orders (user_id, order_code, total_amount) VALUES (?, ?, ?)",
        [userId, orderCode, total],
        (err, result) => {
          if (err) return res.status(500).json(err);

          const orderId = result.insertId;

          const values = cartItems.map((item) => [
            orderId,
            item.product_id,
            item.quantity,
            item.price,
          ]);

          db.query(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
            [values],
            (err) => {
              if (err) return res.status(500).json(err);

              const cartId = cartItems[0].cart_id;

              db.query(
                "DELETE FROM cart_items WHERE cart_id = ?",
                [cartId],
                (err) => {
                  if (err) return res.status(500).json(err);

                  db.query(
                    "DELETE FROM carts WHERE id = ?",
                    [cartId],
                    (err) => {
                      if (err) return res.status(500).json(err);

                      res.json({
                        message: "Order berhasil dibuat",
                        order_code: orderCode,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

export const getMyOrders = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    }
  );
};