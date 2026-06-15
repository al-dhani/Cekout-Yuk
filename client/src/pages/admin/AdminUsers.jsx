import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const roleStyle = {
  admin: { bg: "rgba(240,147,251,0.12)", color: "#f093fb" },
  user:  { bg: "rgba(32,210,180,0.12)",  color: "#20d2b4" },
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        setUsers(res.data);
      } catch (err) { console.error(err); }
    };
    fetchUsers();
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  };

  const avatarColors = [
    "linear-gradient(135deg, #20d2b4, #38b2e8)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    "linear-gradient(135deg, #4facfe, #00f2fe)",
    "linear-gradient(135deg, #fa709a, #fee140)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  ];

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .users-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f7f4 0%, #e8f4fb 50%, #f5f0ff 100%);
          padding: 32px 36px;
          flex: 1;
        }

        .users-header { margin-bottom: 28px; }

        .users-greeting { font-size: 13px; font-weight: 500; color: #20d2b4; letter-spacing: 0.3px; margin-bottom: 4px; }
        .users-title { font-size: 30px; font-weight: 800; color: #0f1923; letter-spacing: -0.8px; line-height: 1.1; }
        .users-subtitle { font-size: 14px; color: #7a9baa; margin-top: 4px; font-weight: 400; }

        .table-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          overflow: hidden;
        }

        .table-card-header {
          padding: 20px 24px 16px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .table-card-title { font-size: 15px; font-weight: 700; color: #0f1923; letter-spacing: -0.3px; }

        .table-count {
          font-size: 12px; font-weight: 600; color: #20d2b4;
          background: rgba(32,210,180,0.1); padding: 4px 12px; border-radius: 20px;
        }

        .users-table { width: 100%; border-collapse: collapse; }

        .users-table th {
          font-size: 11px; font-weight: 700; color: #92a8b5;
          text-transform: uppercase; letter-spacing: 0.6px;
          padding: 12px 20px; text-align: left;
          background: rgba(0,0,0,0.015);
        }

        .users-table td {
          padding: 14px 20px; font-size: 13.5px; color: #2d4a5a;
          font-weight: 500; border-top: 1px solid rgba(0,0,0,0.04);
          vertical-align: middle;
        }

        .users-table tr:hover td { background: rgba(32,210,180,0.03); }

        .user-id-badge {
          font-size: 12px; font-weight: 700; color: #b0c8d4;
          background: rgba(0,0,0,0.04); padding: 3px 8px; border-radius: 6px;
        }

        .user-cell { display: flex; align-items: center; gap: 10px; }

        .user-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        .user-name { font-weight: 700; color: #0f1923; font-size: 14px; }
        .user-joined { font-size: 11px; color: #b0c8d4; font-weight: 400; margin-top: 1px; }

        .email-text { font-size: 13px; color: #5a8a9f; }

        .role-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px;
          text-transform: capitalize;
        }

        .role-dot { width: 6px; height: 6px; border-radius: 50%; }

        .empty-state { text-align: center; padding: 48px 24px; color: #b0c8d4; }
        .empty-state-icon { font-size: 40px; margin-bottom: 12px; }
        .empty-state-text { font-size: 14px; font-weight: 500; }
      `}</style>

      <div className="users-root">
        {/* Header */}
        <div className="users-header">
          <div className="users-greeting">👥 Manajemen Pengguna</div>
          <div className="users-title">Users</div>
          <div className="users-subtitle">Daftar semua pengguna yang terdaftar di platform</div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-card-header">
            <span className="table-card-title">Daftar Pengguna</span>
            <span className="table-count">{users.length} pengguna</span>
          </div>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pengguna</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <div className="empty-state">
                      <div className="empty-state-icon">👤</div>
                      <div className="empty-state-text">Belum ada pengguna terdaftar.</div>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, i) => {
                  const rs = roleStyle[user.role?.toLowerCase()] || roleStyle.user;
                  const color = avatarColors[i % avatarColors.length];
                  return (
                    <tr key={user.id}>
                      <td><span className="user-id-badge">#{user.id}</span></td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar" style={{ background: color }}>
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-joined">Member</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="email-text">{user.email}</span></td>
                      <td>
                        <span className="role-badge" style={{ background: rs.bg, color: rs.color }}>
                          <span className="role-dot" style={{ background: rs.color }} />
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}