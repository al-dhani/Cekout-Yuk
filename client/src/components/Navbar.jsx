import { useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="tech-navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => navigate("/")} aria-label="Kembali ke beranda">
          <span className="brand-mark">E</span>
          <span>
            electro<span>nova</span>
          </span>
        </button>

        <div className="search-box">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari laptop, headset, smartphone..."
            aria-label="Cari produk"
          />
        </div>

        <div className="nav-actions">
          {!token && (
            <button className="ghost-button" onClick={() => navigate("/login")}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="m10 17 5-5-5-5M15 12H3" />
              </svg>
              Login
            </button>
          )}

          <button className="cart-button" onClick={() => navigate("/cart")}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart
          </button>

          {token && (
            <>
              <button className="icon-button" onClick={() => navigate("/account")} title="Akun Saya" aria-label="Akun Saya">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button className="icon-button" onClick={handleLogout} title="Logout" aria-label="Logout">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <path d="m10 17 5-5-5-5M15 12H3" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .tech-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 14px 32px;
          background: rgba(7, 17, 31, .82);
          border-bottom: 1px solid rgba(255,255,255,.10);
          backdrop-filter: blur(18px);
          box-shadow: 0 12px 34px rgba(0,0,0,.22);
        }
        .nav-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto minmax(220px, 1fr) auto;
          align-items: center;
          gap: 18px;
        }
        .brand,
        .ghost-button,
        .cart-button,
        .icon-button {
          font: inherit;
          cursor: pointer;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 0;
          padding: 0;
          color: #fff;
          background: transparent;
          font-size: 21px;
          font-weight: 950;
          letter-spacing: 0;
        }
        .brand span span { color: #67e8f9; }
        .brand-mark {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: #07111f;
          background: linear-gradient(135deg, #22d3ee, #2dd4bf 55%, #a3e635);
          box-shadow: 0 12px 30px rgba(34,211,238,.28);
        }
        .search-box {
          justify-self: center;
          width: min(100%, 520px);
          height: 46px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 15px;
          color: #93a4b8;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 14px;
          background: rgba(255,255,255,.08);
        }
        .search-box input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          color: #fff;
          background: transparent;
          font-size: 14px;
        }
        .search-box input::placeholder { color: #7f8ea3; }
        .nav-actions {
          display: flex;
          align-items: center;
          justify-content: end;
          gap: 10px;
        }
        .ghost-button,
        .cart-button,
        .icon-button {
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 850;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .ghost-button,
        .icon-button {
          border: 1px solid rgba(255,255,255,.15);
          color: #e2e8f0;
          background: rgba(255,255,255,.07);
        }
        .ghost-button { padding: 0 15px; }
        .cart-button {
          border: 0;
          padding: 0 17px;
          color: #04111f;
          background: #67e8f9;
          box-shadow: 0 12px 28px rgba(103,232,249,.24);
        }
        .icon-button { width: 42px; }
        .ghost-button:hover,
        .cart-button:hover,
        .icon-button:hover {
          transform: translateY(-1px);
        }
        @media (max-width: 820px) {
          .tech-navbar { padding: 12px 18px; }
          .nav-inner {
            grid-template-columns: 1fr auto;
            gap: 12px;
          }
          .search-box {
            grid-column: 1 / -1;
            grid-row: 2;
            width: 100%;
            order: 3;
          }
          .brand { font-size: 19px; }
          .ghost-button { display: none; }
        }
        @media (max-width: 460px) {
          .brand span:not(.brand-mark) { display: none; }
          .cart-button {
            width: 42px;
            padding: 0;
          }
          .cart-button svg { margin: 0; }
          .cart-button { font-size: 0; gap: 0; }
        }
      `}</style>
    </nav>
  );
}
