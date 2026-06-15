import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const statusStyle = {
  pending:    { bg: "rgba(240,147,251,0.12)", color: "#f093fb", dot: "#f093fb" },
  processing: { bg: "rgba(56,178,232,0.12)",  color: "#38b2e8", dot: "#38b2e8" },
  shipped:    { bg: "rgba(250,166,26,0.12)",  color: "#f6a623", dot: "#f6a623" },
  completed:  { bg: "rgba(32,210,180,0.12)",  color: "#20d2b4", dot: "#20d2b4" },
  cancelled:  { bg: "rgba(245,87,108,0.12)",  color: "#f5576c", dot: "#f5576c" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("adminToken");

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) { console.log(err); }
  };

  const getOrderItems = async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
      setSelectedOrder(orderId);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { getOrders(); }, []);

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .orders-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f7f4 0%, #e8f4fb 50%, #f5f0ff 100%);
          padding: 32px 36px;
          flex: 1;
        }

        .orders-header { margin-bottom: 28px; }

        .orders-greeting { font-size: 13px; font-weight: 500; color: #20d2b4; letter-spacing: 0.3px; margin-bottom: 4px; }
        .orders-title { font-size: 30px; font-weight: 800; color: #0f1923; letter-spacing: -0.8px; line-height: 1.1; }
        .orders-subtitle { font-size: 14px; color: #7a9baa; margin-top: 4px; font-weight: 400; }

        .table-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          overflow: hidden;
          margin-bottom: 24px;
        }

        .table-card-header {
          padding: 20px 24px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .table-card-title { font-size: 15px; font-weight: 700; color: #0f1923; letter-spacing: -0.3px; }

        .table-count {
          font-size: 12px; font-weight: 600; color: #20d2b4;
          background: rgba(32,210,180,0.1); padding: 4px 12px; border-radius: 20px;
        }

        .orders-table { width: 100%; border-collapse: collapse; }

        .orders-table th {
          font-size: 11px; font-weight: 700; color: #92a8b5;
          text-transform: uppercase; letter-spacing: 0.6px;
          padding: 12px 20px; text-align: left;
          background: rgba(0,0,0,0.015);
        }

        .orders-table td {
          padding: 14px 20px; font-size: 13.5px; color: #2d4a5a;
          font-weight: 500; border-top: 1px solid rgba(0,0,0,0.04);
          vertical-align: middle;
        }

        .orders-table tr:hover td { background: rgba(32,210,180,0.03); }

        .order-id-badge {
          font-size: 12px; font-weight: 700; color: #b0c8d4;
          background: rgba(0,0,0,0.04); padding: 3px 8px; border-radius: 6px;
        }

        .order-code { font-weight: 700; color: #0f1923; font-size: 13px; }

        .user-cell { display: flex; align-items: center; gap: 8px; }

        .user-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #0f1923; flex-shrink: 0;
        }

        .user-email { font-size: 13px; color: #2d4a5a; font-weight: 500; }

        .price-text { font-weight: 700; color: #0f1923; }

        .status-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px;
        }

        .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        .date-text { font-size: 13px; color: #92a8b5; }

        .btn-view {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          padding: 6px 12px; border-radius: 8px; cursor: pointer; border: none;
          background: rgba(56,178,232,0.10); color: #38b2e8;
          transition: opacity 0.2s;
        }

        .btn-view.active { background: rgba(32,210,180,0.15); color: #20d2b4; }
        .btn-view:hover { opacity: 0.75; }

        /* Items Panel */
        .items-panel {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .items-panel-header {
          padding: 20px 24px 16px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          background: linear-gradient(135deg, rgba(32,210,180,0.04), rgba(56,178,232,0.04));
        }

        .items-panel-title {
          font-size: 15px; font-weight: 700; color: #0f1923;
          display: flex; align-items: center; gap: 8px;
        }

        .items-panel-title span {
          font-size: 12px; font-weight: 600; color: #20d2b4;
          background: rgba(32,210,180,0.1); padding: 3px 10px; border-radius: 20px;
        }

        .btn-close {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          padding: 5px 12px; border-radius: 8px; cursor: pointer; border: none;
          background: rgba(0,0,0,0.05); color: #7a9baa;
          transition: background 0.2s;
        }

        .btn-close:hover { background: rgba(0,0,0,0.09); }

        .empty-state { text-align: center; padding: 48px 24px; color: #b0c8d4; }
        .empty-state-icon { font-size: 40px; margin-bottom: 12px; }
        .empty-state-text { font-size: 14px; font-weight: 500; }
      `}</style>

      <div className="orders-root">
        {/* Header */}
        <div className="orders-header">
          <div className="orders-greeting">🧾 Manajemen Pesanan</div>
          <div className="orders-title">Orders</div>
          <div className="orders-subtitle">Pantau dan kelola semua transaksi pelanggan</div>
        </div>

        {/* Orders Table */}
        <div className="table-card">
          <div className="table-card-header">
            <span className="table-card-title">Daftar Pesanan</span>
            <span className="table-count">{orders.length} pesanan</span>
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kode Order</th>
                <th>Pelanggan</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <div className="empty-state-icon">📭</div>
                      <div className="empty-state-text">Belum ada pesanan masuk.</div>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const st = statusStyle[order.status?.toLowerCase()] || statusStyle.pending;
                  const initials = order.email?.charAt(0).toUpperCase() || "U";
                  return (
                    <tr key={order.id}>
                      <td><span className="order-id-badge">#{order.id}</span></td>
                      <td><span className="order-code">{order.order_code}</span></td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{initials}</div>
                          <span className="user-email">{order.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className="price-text">
                          Rp {Number(order.total_amount).toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td>
                        <span className="status-badge" style={{ background: st.bg, color: st.color }}>
                          <span className="status-dot" style={{ background: st.dot }} />
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className="date-text">
                          {new Date(order.created_at).toLocaleDateString("id-ID", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`btn-view ${selectedOrder === order.id ? "active" : ""}`}
                          onClick={() => selectedOrder === order.id
                            ? setSelectedOrder(null)
                            : getOrderItems(order.id)
                          }
                        >
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          {selectedOrder === order.id ? "Tutup" : "Lihat Item"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Order Items Panel */}
        {selectedOrder && (
          <div className="items-panel">
            <div className="items-panel-header">
              <div className="items-panel-title">
                Detail Item
                <span>Order #{selectedOrder}</span>
              </div>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>✕ Tutup</button>
            </div>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga Satuan</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700, color: "#0f1923" }}>{item.name}</td>
                    <td>Rp {Number(item.price).toLocaleString("id-ID")}</td>
                    <td>
                      <span style={{
                        background: "rgba(56,178,232,0.10)", color: "#38b2e8",
                        fontWeight: 700, fontSize: 12, padding: "3px 10px", borderRadius: 20
                      }}>
                        x{item.quantity}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: "#0f1923" }}>
                      Rp {(Number(item.price) * item.quantity).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}