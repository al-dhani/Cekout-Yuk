import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num || 0);

const CATEGORIES = ["Semua", "Elektronik", "Smartphone", "Laptop", "Audio", "Gaming", "Aksesoris"];

const HERO_STATS = [
  { value: "24 Jam", label: "pengiriman cepat" },
  { value: "100%", label: "produk bergaransi" },
  { value: "0%", label: "cicilan tertentu" },
];

const TECH_FEATURES = [
  "Garansi resmi",
  "Kurasi flagship",
  "Checkout aman",
  "Support after-sales",
];

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

  const featuredProduct = useMemo(() => products?.[0], [products]);

  const handleCheckout = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Silakan login terlebih dahulu untuk membeli produk");
      navigate("/login");
      return;
    }

    navigate("/checkout", { state: product });
  };

  const handleProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existing = guestCart.find((item) => item.product_id === productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        guestCart.push({ product_id: productId, quantity: 1 });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      flashAdded(productId);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      flashAdded(productId);
    } catch (err) {
      console.log(err);
    }
  };

  const flashAdded = (productId) => {
    setAddedIds((prev) => ({ ...prev, [productId]: true }));

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const filtered = products.filter((p) => {
    const keyword = search.trim().toLowerCase();
    const matchSearch =
      !keyword ||
      p.name?.toLowerCase().includes(keyword) ||
      p.description?.toLowerCase().includes(keyword) ||
      p.category?.toLowerCase().includes(keyword);
    const matchCat = activeCategory === "Semua" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="tech-store-shell">
      <Navbar search={search} setSearch={setSearch} />

      <main>
        <section className="tech-hero">
          <div className="hero-grid-bg" />
          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-kicker">NEW TECH DROP 2026</div>
              <h1>
                Upgrade perangkatmu dengan elektronik pilihan yang siap kerja,
                main, dan berkarya.
              </h1>
              <p>
                Temukan gadget, audio, laptop, gaming gear, dan aksesoris terbaik
                dengan tampilan toko yang cepat, modern, dan nyaman digunakan.
              </p>

              <div className="hero-actions">
                <button onClick={() => document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })}>
                  Belanja Sekarang
                </button>
                <button className="secondary" onClick={() => setActiveCategory("Elektronik")}>
                  Lihat Elektronik
                </button>
              </div>

              <div className="hero-stats">
                {HERO_STATS.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-showcase" aria-label="Produk unggulan">
              <div className="showcase-orbit one" />
              <div className="showcase-orbit two" />
              <div className="device-card main-device">
                <div className="device-toolbar">
                  <span />
                  <span />
                  <span />
                </div>
                {featuredProduct?.image ? (
                  <img src={featuredProduct.image} alt={featuredProduct.name} />
                ) : (
                  <div className="device-placeholder">
                    <svg width="96" height="96" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="12" rx="2" />
                      <path d="M8 20h8M12 16v4" />
                    </svg>
                    <span>Smart Device</span>
                  </div>
                )}
                <div className="device-info">
                  <span>Featured Deal</span>
                  <strong>{featuredProduct?.name || "Premium Tech Bundle"}</strong>
                  <p>{formatRupiah(featuredProduct?.price || 2499000)}</p>
                </div>
              </div>

              <div className="floating-chip chip-a">Fast Charge</div>
              <div className="floating-chip chip-b">AI Ready</div>
              <div className="floating-chip chip-c">Pro Audio</div>
            </div>
          </div>
        </section>

        <section className="feature-strip">
          {TECH_FEATURES.map((feature) => (
            <div key={feature}>
              <span />
              {feature}
            </div>
          ))}
        </section>

        <section id="produk" className="product-section">
          <div className="section-heading">
            <div>
              <span>Katalog Elektronik</span>
              <h2>Produk pilihan untuk setup modern</h2>
            </div>
            <p>{filtered.length} produk tersedia</p>
          </div>

          <div className="category-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "active" : ""}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="loader" />
              <p>Memuat produk terbaik...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <h3>Produk tidak ditemukan</h3>
              <p>Coba kata kunci atau kategori lain.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={addToCart}
                  onCheckout={handleCheckout}
                  onDetail={handleProductDetail}
                  added={!!addedIds[p.id]}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style>{`
        * { box-sizing: border-box; }
        .tech-store-shell {
          min-height: 100vh;
          color: #0f172a;
          background:
            radial-gradient(circle at top left, rgba(20, 184, 166, 0.16), transparent 30%),
            linear-gradient(180deg, #07111f 0%, #0f172a 42%, #f6f8fb 42%, #eef2f7 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .tech-hero {
          position: relative;
          overflow: hidden;
          min-height: 640px;
          padding: 72px 32px 96px;
          color: #fff;
        }
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, #000 0%, transparent 86%);
          opacity: .7;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
          gap: 56px;
          align-items: center;
        }
        .hero-kicker {
          width: fit-content;
          margin-bottom: 18px;
          padding: 8px 14px;
          border: 1px solid rgba(45, 212, 191, .35);
          border-radius: 999px;
          background: rgba(20, 184, 166, .13);
          color: #67e8f9;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
        }
        .hero-copy h1 {
          max-width: 760px;
          margin: 0;
          font-size: clamp(38px, 6vw, 76px);
          line-height: .98;
          letter-spacing: 0;
        }
        .hero-copy p {
          max-width: 600px;
          margin: 22px 0 0;
          color: #b7c4d8;
          font-size: 17px;
          line-height: 1.75;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }
        .hero-actions button,
        .product-card button,
        .category-row button {
          font: inherit;
        }
        .hero-actions button {
          border: 0;
          border-radius: 12px;
          padding: 14px 22px;
          color: #04111f;
          background: linear-gradient(135deg, #22d3ee, #2dd4bf 55%, #a3e635);
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 18px 46px rgba(34, 211, 238, .28);
        }
        .hero-actions .secondary {
          color: #e2e8f0;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.16);
          box-shadow: none;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          max-width: 620px;
          margin-top: 44px;
        }
        .hero-stats div {
          padding: 18px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 14px;
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(12px);
        }
        .hero-stats strong,
        .hero-stats span {
          display: block;
        }
        .hero-stats strong {
          font-size: 24px;
          color: #f8fafc;
        }
        .hero-stats span {
          margin-top: 4px;
          color: #94a3b8;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .hero-showcase {
          position: relative;
          min-height: 500px;
          display: grid;
          place-items: center;
        }
        .showcase-orbit {
          position: absolute;
          border: 1px solid rgba(103, 232, 249, .28);
          border-radius: 999px;
          animation: float 5s ease-in-out infinite;
        }
        .showcase-orbit.one { width: 420px; height: 420px; }
        .showcase-orbit.two { width: 310px; height: 310px; animation-delay: -1.5s; }
        .device-card {
          position: relative;
          width: min(390px, 100%);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 28px;
          background: linear-gradient(160deg, rgba(255,255,255,.20), rgba(255,255,255,.06));
          box-shadow: 0 30px 90px rgba(0,0,0,.36);
          backdrop-filter: blur(18px);
        }
        .device-toolbar {
          display: flex;
          gap: 7px;
          padding: 16px 18px;
        }
        .device-toolbar span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #67e8f9;
        }
        .device-toolbar span:nth-child(2) { background: #bef264; }
        .device-toolbar span:nth-child(3) { background: #fb7185; }
        .main-device img,
        .device-placeholder {
          width: calc(100% - 36px);
          height: 280px;
          margin: 0 18px;
          border-radius: 20px;
          object-fit: cover;
          background: #0f172a;
        }
        .device-placeholder {
          display: grid;
          place-items: center;
          align-content: center;
          color: #67e8f9;
          gap: 12px;
        }
        .device-info {
          padding: 20px 22px 24px;
        }
        .device-info span {
          color: #67e8f9;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .device-info strong {
          display: block;
          margin-top: 8px;
          color: #fff;
          font-size: 22px;
          line-height: 1.2;
        }
        .device-info p {
          margin: 10px 0 0;
          color: #bef264;
          font-size: 18px;
          font-weight: 900;
        }
        .floating-chip {
          position: absolute;
          padding: 10px 14px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 999px;
          background: rgba(2, 6, 23, .72);
          color: #e2e8f0;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 14px 40px rgba(0,0,0,.28);
        }
        .chip-a { top: 76px; right: 36px; }
        .chip-b { left: 24px; top: 225px; }
        .chip-c { right: 0; bottom: 94px; }
        .feature-strip {
          max-width: 1180px;
          margin: -54px auto 0;
          padding: 0 32px;
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .feature-strip div {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 78px;
          padding: 18px;
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 16px;
          background: rgba(255,255,255,.9);
          color: #0f172a;
          font-weight: 800;
          box-shadow: 0 18px 50px rgba(15, 23, 42, .10);
        }
        .feature-strip span {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #14b8a6;
          box-shadow: 0 0 0 7px rgba(20, 184, 166, .12);
          flex: 0 0 auto;
        }
        .product-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 32px 84px;
        }
        .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 24px;
        }
        .section-heading span {
          color: #0f766e;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .section-heading h2 {
          margin: 8px 0 0;
          color: #0f172a;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08;
        }
        .section-heading p {
          margin: 0;
          color: #64748b;
          font-weight: 700;
          white-space: nowrap;
        }
        .category-row {
          display: flex;
          gap: 10px;
          margin-bottom: 26px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .category-row button {
          flex: 0 0 auto;
          border: 1px solid #dbe3ef;
          border-radius: 999px;
          padding: 10px 18px;
          color: #475569;
          background: rgba(255,255,255,.86);
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: .2s ease;
        }
        .category-row button.active,
        .category-row button:hover {
          border-color: #0f172a;
          color: #fff;
          background: #0f172a;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 14px 40px rgba(15, 23, 42, .08);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .product-card:hover {
          border-color: rgba(20, 184, 166, .45);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(15, 23, 42, .14);
        }
        .product-media {
          position: relative;
          height: 225px;
          background: linear-gradient(135deg, #e2e8f0, #f8fafc);
          overflow: hidden;
        }
        .product-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: transform .35s ease;
        }
        .product-card:hover .product-media img { transform: scale(1.06); }
        .product-badge,
        .category-badge {
          position: absolute;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .04em;
        }
        .product-badge {
          top: 13px;
          left: 13px;
          padding: 7px 10px;
          color: #fff;
          background: #f43f5e;
        }
        .cart-float {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 14px;
          color: #0f172a;
          background: rgba(255,255,255,.92);
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(15, 23, 42, .14);
          transition: .2s ease;
        }
        .cart-float.added {
          color: #fff;
          background: #14b8a6;
          transform: scale(1.08);
        }
        .product-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
          padding: 17px;
        }
        .category-badge {
          position: static;
          width: fit-content;
          padding: 5px 10px;
          color: #0f766e;
          background: #ccfbf1;
        }
        .product-body h3 {
          margin: 0;
          color: #0f172a;
          font-size: 17px;
          line-height: 1.35;
          cursor: pointer;
        }
        .product-body p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }
        .clamp {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .meta-row,
        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #475569;
          font-size: 12px;
          font-weight: 800;
        }
        .price-row {
          margin-top: auto;
          padding-top: 8px;
        }
        .old-price {
          display: block;
          color: #94a3b8;
          font-size: 12px;
          text-decoration: line-through;
        }
        .price {
          display: block;
          color: #0f172a;
          font-size: 20px;
          font-weight: 950;
        }
        .buy-button {
          width: 100%;
          margin-top: 8px;
          border: 0;
          border-radius: 12px;
          padding: 13px;
          color: #fff;
          background: linear-gradient(135deg, #0f172a, #164e63);
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .buy-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, .20);
        }
        .empty-state {
          display: grid;
          place-items: center;
          min-height: 260px;
          text-align: center;
          color: #64748b;
          border: 1px dashed #cbd5e1;
          border-radius: 20px;
          background: rgba(255,255,255,.62);
        }
        .empty-state h3 { margin: 0 0 8px; color: #0f172a; }
        .empty-state p { margin: 0; }
        .loader {
          width: 44px;
          height: 44px;
          margin-bottom: 12px;
          border: 3px solid #dbe3ef;
          border-top-color: #14b8a6;
          border-radius: 50%;
          animation: spin .8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 50% { transform: translateY(-16px) scale(1.02); } }
        @media (max-width: 900px) {
          .tech-hero { padding-top: 46px; }
          .hero-content { grid-template-columns: 1fr; gap: 38px; }
          .hero-showcase { min-height: 430px; }
          .feature-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .section-heading { align-items: start; flex-direction: column; }
        }
        @media (max-width: 620px) {
          .tech-hero, .product-section, .feature-strip { padding-left: 18px; padding-right: 18px; }
          .hero-copy h1 { font-size: 38px; }
          .hero-stats { grid-template-columns: 1fr; }
          .hero-showcase { min-height: 360px; }
          .showcase-orbit.one { width: 320px; height: 320px; }
          .showcase-orbit.two { width: 240px; height: 240px; }
          .main-device img, .device-placeholder { height: 220px; }
          .floating-chip { display: none; }
          .feature-strip { grid-template-columns: 1fr; margin-top: -34px; }
          .product-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product: p, onAddToCart, onCheckout, onDetail, added }) {
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={p.image} alt={p.name} onClick={() => onDetail(p.id)} />
        {p.badge && <span className="product-badge">{p.badge}</span>}
        <button
          className={`cart-float ${added ? "added" : ""}`}
          onClick={() => onAddToCart(p.id)}
          title="Tambah ke cart"
          aria-label="Tambah ke cart"
        >
          {added ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
          )}
        </button>
      </div>

      <div className="product-body">
        <div className="meta-row">
          {p.category && <span className="category-badge">{p.category}</span>}
          <span className="meta-pill">
            <svg width="14" height="14" fill="#f59e0b" viewBox="0 0 24 24">
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
            </svg>
            {p.rating || "4.8"}
          </span>
        </div>

        <h3 onClick={() => onDetail(p.id)}>{p.name}</h3>
        <p className="clamp">{p.description || "Perangkat elektronik pilihan dengan performa stabil dan desain modern."}</p>

        <div className="price-row">
          <div>
            {p.original_price && <span className="old-price">{formatRupiah(p.original_price)}</span>}
            <span className="price">{formatRupiah(p.price)}</span>
          </div>
        </div>

        <button className="buy-button" onClick={() => onCheckout(p)}>
          Beli Sekarang
        </button>
      </div>
    </article>
  );
}
