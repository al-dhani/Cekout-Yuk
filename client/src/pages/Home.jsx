import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckout = (product) => {
    navigate("/checkout", { state: product });
  };

  const addToCart = async (productId) => {
    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product_id: productId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Produk masuk ke cart 🛒");

    } catch (err) {
      console.log(err);
      alert("Gagal tambah ke cart");
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Welcome to MyStore</h1>
      <p>Tempat belanja produk terbaik</p>

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >

        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
            }}
          >

            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h3 style={{ marginTop: "10px" }}>{p.name}</h3>

            <p style={{ color: "#666", fontSize: "14px" }}>
              {p.description}
            </p>

            <p
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                color: "#0f1923",
              }}
            >
              Rp {p.price}
            </p>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>

              {/* BUTTON CART */}
              <button
                onClick={() => addToCart(p.id)}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#0f1923",
                  border: "none",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
              >
                🛒
              </button>

              {/* BUTTON CHECKOUT */}
              <button
                onClick={() => handleCheckout(p)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#20d2b4",
                  border: "none",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Checkout
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}