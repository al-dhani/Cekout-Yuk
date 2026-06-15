import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);

const CATEGORIES = ["Semua", "Elektronik", "Fashion", "Makanan", "Kesehatan"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [addedIds, setAddedIds] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCheckout = (product) => navigate("/checkout", { state: product });

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAddedIds((prev) => ({ ...prev, [productId]: true }));
      setTimeout(
        () => setAddedIds((prev) => ({ ...prev, [productId]: false })),
        1500,
      );
    } catch (err) {
      console.log(err);
      alert("Gagal tambah ke cart");
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "Semua" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F8FA",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* TOP NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#0D1B2A",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        <span
          style={{
            color: "#00D4B1",
            fontWeight: 800,
            fontSize: "22px",
            letterSpacing: "-0.5px",
          }}
        >
          my<span style={{ color: "#fff" }}>store</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "14px",
                width: "200px",
              }}
            />
          </div>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "8px 18px",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Login
          </button>
          <button
            onClick={() => navigate("/cart")}
            style={{
              background: "#00D4B1",
              border: "none",
              borderRadius: "8px",
              padding: "8px 18px",
              color: "#0D1B2A",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Cart
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D1B2A 0%, #1A3050 100%)",
          padding: "60px 32px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(0,212,177,0.15)",
            color: "#00D4B1",
            fontSize: "13px",
            fontWeight: 600,
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "20px",
            border: "1px solid rgba(0,212,177,0.3)",
            letterSpacing: "0.5px",
          }}
        >
          ✦ PRODUK TERPILIH HARI INI
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            margin: "0 0 16px",
            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          Belanja Cerdas,
          <br />
          <span style={{ color: "#00D4B1" }}>Hidup Lebih Hemat</span>
        </h1>
        <p
          style={{
            color: "#9CA3AF",
            fontSize: "16px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          Ribuan produk berkualitas dengan harga terbaik, diantar langsung ke
          pintu rumahmu.
        </p>
      </div>

      {/* CATEGORY PILLS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "24px 32px 0",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              border: activeCategory === cat ? "none" : "1px solid #E5E7EB",
              background: activeCategory === cat ? "#0D1B2A" : "#fff",
              color: activeCategory === cat ? "#00D4B1" : "#6B7280",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: "24px 32px 60px" }}>
        {loading ? (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF" }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #E5E7EB",
                borderTopColor: "#00D4B1",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ fontSize: "14px" }}>Memuat produk...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF" }}
          >
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#374151" }}>
              Produk tidak ditemukan
            </p>
            <p style={{ fontSize: "14px" }}>
              Coba kata kunci atau kategori lain
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addToCart}
                onCheckout={handleCheckout}
                added={!!addedIds[p.id]}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
      `}</style>
    </div>
  );
}

function ProductCard({ product: p, onAddToCart, onCheckout, added }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #F3F4F6",
        boxShadow: hovered
          ? "0 8px 32px rgba(13,27,42,0.12)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* IMAGE */}
      <div
        style={{ position: "relative", overflow: "hidden", height: "200px" }}
      >
        <img
          src={p.image}
          alt={p.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
          }}
        />
        {p.badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "#EF4444",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "20px",
              letterSpacing: "0.3px",
            }}
          >
            {p.badge}
          </span>
        )}
        <button
          onClick={() => onAddToCart(p.id)}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            background: added ? "#00D4B1" : "rgba(255,255,255,0.95)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "all 0.2s",
            transform: added ? "scale(1.15)" : "scale(1)",
          }}
          title="Tambah ke cart"
        >
          {added ? (
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#0D1B2A"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {p.category && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#00A88D",
              background: "#E6FAF7",
              padding: "3px 10px",
              borderRadius: "20px",
              display: "inline-block",
              letterSpacing: "0.3px",
            }}
          >
            {p.category}
          </span>
        )}
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: "#111827",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#9CA3AF",
            lineHeight: "1.5",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {p.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          <div>
            {p.original_price && (
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#D1D5DB",
                  textDecoration: "line-through",
                }}
              >
                {formatRupiah(p.original_price)}
              </p>
            )}
            <p
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 800,
                color: "#0D1B2A",
              }}
            >
              {formatRupiah(p.price)}
            </p>
          </div>
          {p.rating && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="14" height="14" fill="#F5A623" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
              >
                {p.rating}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => onCheckout(p)}
          style={{
            marginTop: "8px",
            padding: "12px",
            background: "#0D1B2A",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            transition: "background 0.2s",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#00D4B1")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0D1B2A")}
        >
          Beli Sekarang →
        </button>
      </div>
    </div>
  );
}
