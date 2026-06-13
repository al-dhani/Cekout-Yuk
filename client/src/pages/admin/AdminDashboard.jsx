import AdminLayout from "../../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    products: 0,
    orders: 0,
    users: 0,
    payments: 120,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [salesSummary, setSalesSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const productsRes = await axios.get(
          "http://localhost:5000/api/products",
        );

        const ordersRes = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersRes = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStatsData({
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          users: usersRes.data.length,
          payments: 120,
        });

        // ambil 5 order terbaru
        setRecentOrders(ordersRes.data.slice(0, 5));
        const orders = ordersRes.data;

        const completed = orders.filter((o) => o.status === "Completed").length;
        const processing = orders.filter(
          (o) => o.status === "Processing",
        ).length;
        const pending = orders.filter((o) => o.status === "Pending").length;

        const total = orders.length || 1;

        const summary = [
          {
            label: "Selesai",
            pct: Math.round((completed / total) * 100),
            color: "#20d2b4",
          },
          {
            label: "Diproses",
            pct: Math.round((processing / total) * 100),
            color: "#38b2e8",
          },
          {
            label: "Pending",
            pct: Math.round((pending / total) * 100),
            color: "#f093fb",
          },
        ];

        setSalesSummary(summary);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: statsData.products,
      change: "+12%",
      positive: true,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
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
        </svg>
      ),
      gradient: "linear-gradient(135deg, #20d2b4 0%, #38b2e8 100%)",
      glow: "rgba(32,210,180,0.25)",
    },
    {
      label: "Total Orders",
      value: statsData.orders,
      change: "+8%",
      positive: true,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
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
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      glow: "rgba(240,147,251,0.25)",
    },
    {
      label: "Total Users",
      value: statsData.users,
      change: "+21%",
      positive: true,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
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
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glow: "rgba(79,172,254,0.25)",
    },
    {
      label: "Payments",
      value: statsData.payments,
      change: "-2%",
      positive: false,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      glow: "rgba(250,112,154,0.25)",
    },
  ];

  const statusStyle = {
    Completed: {
      bg: "rgba(32,210,180,0.12)",
      color: "#20d2b4",
      dot: "#20d2b4",
    },
    Processing: {
      bg: "rgba(56,178,232,0.12)",
      color: "#38b2e8",
      dot: "#38b2e8",
    },
    Shipped: { bg: "rgba(250,166,26,0.12)", color: "#f6a623", dot: "#f6a623" },
    Pending: { bg: "rgba(240,147,251,0.12)", color: "#f093fb", dot: "#f093fb" },
  };
  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .dash-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f7f4 0%, #e8f4fb 50%, #f5f0ff 100%);
          padding: 32px 36px;
          flex: 1;
        }

        .dash-header { margin-bottom: 32px; }

        .dash-greeting {
          font-size: 13px;
          font-weight: 500;
          color: #20d2b4;
          letter-spacing: 0.3px;
          margin-bottom: 4px;
        }

        .dash-title {
          font-size: 30px;
          font-weight: 800;
          color: #0f1923;
          letter-spacing: -0.8px;
          line-height: 1.1;
        }

        .dash-subtitle {
          font-size: 14px;
          color: #7a9baa;
          margin-top: 4px;
          font-weight: 400;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        }

        .stat-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #fff;
          flex-shrink: 0;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #92a8b5;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #0f1923;
          letter-spacing: -1px;
          line-height: 1;
          margin-bottom: 10px;
        }

        .stat-change {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 20px;
        }

        .stat-change.up { background: rgba(32,210,180,0.10); color: #20d2b4; }
        .stat-change.down { background: rgba(245,87,108,0.10); color: #f5576c; }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 20px;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          overflow: hidden;
        }

        .card-header {
          padding: 22px 24px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .card-title { font-size: 16px; font-weight: 700; color: #0f1923; letter-spacing: -0.3px; }

        .card-action {
          font-size: 12px;
          font-weight: 600;
          color: #20d2b4;
          cursor: pointer;
          text-decoration: none;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(32,210,180,0.09);
          transition: background 0.2s;
        }

        .card-action:hover { background: rgba(32,210,180,0.18); }

        table { width: 100%; border-collapse: collapse; }

        th {
          font-size: 11px;
          font-weight: 700;
          color: #92a8b5;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 12px 24px;
          text-align: left;
          background: rgba(0,0,0,0.015);
        }

        td {
          padding: 14px 24px;
          font-size: 13.5px;
          color: #2d4a5a;
          font-weight: 500;
          border-top: 1px solid rgba(0,0,0,0.04);
        }

        tr:hover td { background: rgba(32,210,180,0.03); }

        .order-id { font-weight: 700; color: #0f1923; font-size: 13px; }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        .right-panel { display: flex; flex-direction: column; gap: 18px; }

        .summary-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          padding: 22px 22px;
        }

        .summary-title { font-size: 15px; font-weight: 700; color: #0f1923; margin-bottom: 18px; letter-spacing: -0.3px; }

        .summary-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .summary-row:last-child { margin-bottom: 0; }

        .summary-label { font-size: 13px; color: #7a9baa; font-weight: 500; display: flex; align-items: center; gap: 8px; }
        .summary-dot { width: 8px; height: 8px; border-radius: 50%; }
        .summary-value { font-size: 14px; font-weight: 700; color: #0f1923; }

        .progress-bar-wrap { background: rgba(0,0,0,0.05); border-radius: 20px; height: 6px; overflow: hidden; margin-top: 4px; }
        .progress-bar-fill { height: 100%; border-radius: 20px; transition: width 0.6s ease; }

        .promo-banner {
          border-radius: 20px;
          padding: 24px 22px;
          background: linear-gradient(135deg, #0f1923 0%, #12323e 100%);
          position: relative;
          overflow: hidden;
        }

        .promo-banner::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, rgba(32,210,180,0.25), transparent 70%);
          pointer-events: none;
        }

        .promo-label { font-size: 10px; font-weight: 700; letter-spacing: 1.2px; color: #20d2b4; text-transform: uppercase; margin-bottom: 8px; }
        .promo-title { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.25; margin-bottom: 16px; letter-spacing: -0.3px; }

        .promo-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          color: #0f1923;
          font-size: 12px;
          font-weight: 700;
          padding: 9px 16px;
          border-radius: 10px;
          cursor: pointer;
          border: none;
          letter-spacing: 0.2px;
          transition: opacity 0.2s;
        }

        .promo-btn:hover { opacity: 0.88; }

        @media (max-width: 1100px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .bottom-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-root">
        <div className="dash-header">
          <div className="dash-greeting">👋 Selamat datang kembali, Admin!</div>
          <div className="dash-title">Dashboard</div>
          <div className="dash-subtitle">
            Pantau performa toko kamu hari ini
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div
                className="stat-icon-wrap"
                style={{
                  background: s.gradient,
                  boxShadow: `0 6px 18px ${s.glow}`,
                }}
              >
                {s.icon}
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <span className={`stat-change ${s.positive ? "up" : "down"}`}>
                {s.positive ? "▲" : "▼"} {s.change}{" "}
                <span style={{ fontWeight: 400, opacity: 0.7 }}>bulan ini</span>
              </span>
            </div>
          ))}
        </div>

        <div className="bottom-grid">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Pesanan Terbaru</span>
              <a className="card-action">Lihat Semua →</a>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pelanggan</th>
                  <th>Produk</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      Belum ada pesanan
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((o, i) => {
                    const s = statusStyle[o.status] || statusStyle["Pending"];

                    return (
                      <tr key={i}>
                        <td>
                          <span className="order-id">{o.id}</span>
                        </td>

                        <td>{o.email}</td>

                        <td style={{ color: "#92a8b5", fontSize: "13px" }}>
                          {o.order_code}
                        </td>

                        <td style={{ fontWeight: 700, color: "#0f1923" }}>
                          Rp {o.total_amount}
                        </td>

                        <td>
                          <span
                            className="status-badge"
                            style={{ background: s.bg, color: s.color }}
                          >
                            <span
                              className="status-dot"
                              style={{ background: s.dot }}
                            />
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="right-panel">
            <div className="summary-card">
              <div className="summary-title">Ringkasan Penjualan</div>
              {salesSummary.map((r, i) => (
                <div key={i}>
                  <div className="summary-row">
                    <span className="summary-label">
                      <span
                        className="summary-dot"
                        style={{ background: r.color }}
                      />
                      {r.label}
                    </span>
                    <span className="summary-value">{r.pct}%</span>
                  </div>
                  <div
                    className="progress-bar-wrap"
                    style={{ marginBottom: 14 }}
                  >
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${r.pct}%`, background: r.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="promo-banner">
              <div className="promo-label">🔔 Jangan Lupa</div>
              <div className="promo-title">
                Perbarui stok produk untuk minggu depan
              </div>
              <button className="promo-btn">
                Kelola Produk
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
