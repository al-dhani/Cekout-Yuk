import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.9"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.5"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.5"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path
          d="M20 7H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 12v4M10 14h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect
          x="9"
          y="3"
          width="6"
          height="4"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 12h6M9 16h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M3 21v-1a6 6 0 016-6h0a6 6 0 016 6v1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M16 3.13a4 4 0 010 7.75M21 21v-1a4 4 0 00-3-3.85"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .sidebar-root {
        font-family: 'Plus Jakarta Sans', sans-serif;
        width: 240px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: linear-gradient(160deg, #0f1923 0%, #12232e 60%, #0a1a28 100%);
        display: flex;
        flex-direction: column;
        padding: 0;
        overflow: hidden;
        flex-shrink: 0;
      }

        .sidebar-root::before {
          content: '';
          position: absolute;
          top: -80px;
          left: -60px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(32,210,180,0.13) 0%, transparent 70%);
          pointer-events: none;
        }

        .sidebar-root::after {
          content: '';
          position: absolute;
          bottom: 60px;
          right: -60px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(99,179,237,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        .sidebar-logo {
          padding: 28px 24px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-logo-mark {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(32,210,180,0.35);
          flex-shrink: 0;
        }

        .sidebar-logo-text {
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .sidebar-logo-text span {
          color: #20d2b4;
        }

        .sidebar-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin: 0 16px 16px;
        }

        .sidebar-section-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 0 24px 10px;
        }

        .sidebar-nav {
          padding: 0 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255,255,255,0.45);
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        .sidebar-link:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.06);
        }

        .sidebar-link.active {
          background: linear-gradient(120deg, rgba(32,210,180,0.18), rgba(56,178,232,0.12));
          color: #fff;
          font-weight: 600;
          box-shadow: inset 0 0 0 1px rgba(32,210,180,0.18);
        }

        .sidebar-link.active .sidebar-icon {
          color: #20d2b4;
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: linear-gradient(180deg, #20d2b4, #38b2e8);
          border-radius: 0 4px 4px 0;
        }

        .sidebar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: color 0.2s;
        }

        .sidebar-badge {
          margin-left: auto;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          color: #0f1923;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 7px;
          border-radius: 20px;
          min-width: 20px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 16px 12px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: auto;
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          transition: background 0.2s;
        }

        .sidebar-user:hover {
          background: rgba(255,255,255,0.07);
        }

        .sidebar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #0f1923;
          flex-shrink: 0;
        }

        .sidebar-user-info {
          flex: 1;
          min-width: 0;
        }

        .sidebar-user-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-user-role {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
        }
      `}</style>

      <div className="sidebar-root">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h10M4 18h13"
                stroke="#0f1923"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="sidebar-logo-text">
            Cekout<span>Yuk</span>
          </span>
        </div>

        <div className="sidebar-divider" />

        {/* Nav */}
        <div className="sidebar-section-label">Main Menu</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar-link${isActive ? " active" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
                {item.label === "Orders" && (
                  <span className="sidebar-badge">3</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-role">Super Admin</div>
            </div>
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
