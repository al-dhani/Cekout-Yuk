import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  const getCart = async () => {
    // =========================
    // GUEST CART
    // =========================
    if (!token) {
      const guestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];

      const formattedCart = guestCart.map((item, index) => ({
        id: index,
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      setCart(formattedCart);
      return;
    }

    // =========================
    // USER LOGIN CART
    // =========================
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const removeItem = async (id) => {

    // =========================
    // GUEST REMOVE
    // =========================
    if (!token) {

      const guestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];

      const updatedCart =
        guestCart.filter((_, index) => index !== id);

      localStorage.setItem(
        "guestCart",
        JSON.stringify(updatedCart)
      );

      const formattedCart = updatedCart.map((item, index) => ({
        id: index,
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      setCart(formattedCart);

      return;
    }

    // =========================
    // USER LOGIN REMOVE
    // =========================
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Cart masih kosong 🛒</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{item.name}</h3>

                <p>
                  Harga: Rp{" "}
                  {Number(item.price).toLocaleString("id-ID")}
                </p>

                <p>Qty: {item.quantity}</p>

                <p>
                  Subtotal: Rp{" "}
                  {Number(item.subtotal).toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>
          ))}

          <h2>
            Total: Rp{" "}
            {Number(total).toLocaleString("id-ID")}
          </h2>
        </div>
      )}
    </div>
  );
}