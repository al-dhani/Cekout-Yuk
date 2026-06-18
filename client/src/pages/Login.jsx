import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      navigate("/");
      for (const item of guestCart) {
        await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            product_id: item.product_id,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          },
        );
      }
      localStorage.removeItem("guestCart");
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F7F8FA",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* BRAND */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#0D1B2A",
                letterSpacing: "-0.5px",
              }}
            >
              my<span style={{ color: "#00D4B1" }}>store</span>
            </span>
          </Link>
          <p style={{ color: "#9CA3AF", fontSize: "14px", marginTop: "8px" }}>
            Selamat datang kembali! 👋
          </p>
        </div>

        {/* CARD */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "36px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {error && (
            <div
              style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#DC2626",
                fontSize: "13px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>⚠️</span> {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* EMAIL */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                  letterSpacing: "0.4px",
                }}
              >
                EMAIL
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    color: "#9CA3AF",
                  }}
                >
                  ✉
                </span>
                <input
                  type="email"
                  placeholder="kamu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 14px 11px 40px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    background: "#fff",
                    boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00D4B1")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    letterSpacing: "0.4px",
                  }}
                >
                  PASSWORD
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: "12px",
                    color: "#00D4B1",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Lupa password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    color: "#9CA3AF",
                  }}
                >
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 44px 11px 40px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    background: "#fff",
                    boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00D4B1")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#9CA3AF",
                    padding: 0,
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                background: loading ? "#9CA3AF" : "#0D1B2A",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "4px",
                letterSpacing: "0.3px",
                transition: "background .2s",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.background = "#00D4B1";
                e.target.style.color = "#0D1B2A";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.background = "#0D1B2A";
                e.target.style.color = "#fff";
              }}
            >
              {loading ? "Masuk..." : "Masuk ke akun →"}
            </button>
          </form>

          {/* DIVIDER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
            <span
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
                whiteSpace: "nowrap",
              }}
            >
              atau masuk dengan
            </span>
            <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
          </div>

          {/* SOCIAL LOGIN */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "Google", icon: "🇬" },
              { label: "Apple", icon: "🍎" },
            ].map((s) => (
              <button
                key={s.label}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "10px",
                  background: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                  transition: "border-color .2s, background .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                  e.currentTarget.style.borderColor = "#D1D5DB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
            color: "#9CA3AF",
          }}
        >
          Belum punya akun?{" "}
          <Link
            to="/register"
            style={{
              color: "#00D4B1",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
