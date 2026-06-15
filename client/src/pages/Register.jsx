import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const getPasswordStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabel = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"];
const strengthColor = ["", "#EF4444", "#F59E0B", "#10B981", "#00D4B1"];

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) { setError("Kamu harus menyetujui syarat & ketentuan."); return; }
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px 11px 40px",
    border: "1.5px solid #E5E7EB", borderRadius: "10px",
    fontSize: "14px", color: "#111827", outline: "none",
    background: "#fff", boxSizing: "border-box", transition: "border-color .2s"
  };

  const fieldFocus = (e) => e.target.style.borderColor = "#00D4B1";
  const fieldBlur = (e) => e.target.style.borderColor = "#E5E7EB";

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#F7F8FA", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px"
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* BRAND */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#0D1B2A", letterSpacing: "-0.5px" }}>
              my<span style={{ color: "#00D4B1" }}>store</span>
            </span>
          </Link>
          <p style={{ color: "#9CA3AF", fontSize: "14px", marginTop: "8px" }}>
            Buat akun gratis dan mulai belanja!
          </p>
        </div>

        {/* CARD */}
        <div style={{
          background: "#fff", borderRadius: "20px", padding: "36px",
          border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
        }}>
          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: "10px", padding: "12px 16px",
              color: "#DC2626", fontSize: "13px", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px"
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* NAME */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px", letterSpacing: "0.4px" }}>
                NAMA LENGKAP
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#9CA3AF" }}>👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama lengkap kamu"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px", letterSpacing: "0.4px" }}>
                EMAIL
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#9CA3AF" }}>✉</span>
                <input
                  type="email"
                  name="email"
                  placeholder="kamu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                />
              </div>
            </div>

            {/* PASSWORD + STRENGTH */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px", letterSpacing: "0.4px" }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#9CA3AF" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  style={{ ...inputStyle, paddingRight: "44px" }}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", fontSize: "16px", color: "#9CA3AF", padding: 0
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {/* STRENGTH METER */}
              {formData.password && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{
                        flex: 1, height: "3px", borderRadius: "2px",
                        background: i <= strength ? strengthColor[strength] : "#E5E7EB",
                        transition: "background .3s"
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "11px", color: strengthColor[strength], fontWeight: 600 }}>
                    Kekuatan: {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            {/* TERMS */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginTop: "2px", accentColor: "#00D4B1", width: "16px", height: "16px", cursor: "pointer" }}
              />
              <label htmlFor="agree" style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.5", cursor: "pointer" }}>
                Saya setuju dengan{" "}
                <Link to="/terms" style={{ color: "#00D4B1", fontWeight: 600, textDecoration: "none" }}>Syarat & Ketentuan</Link>
                {" "}dan{" "}
                <Link to="/privacy" style={{ color: "#00D4B1", fontWeight: 600, textDecoration: "none" }}>Kebijakan Privasi</Link>
                {" "}MyStore.
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px",
                background: loading ? "#9CA3AF" : "#0D1B2A",
                color: "#fff", border: "none", borderRadius: "10px",
                fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.3px", transition: "background .2s"
              }}
              onMouseEnter={(e) => { if (!loading) { e.target.style.background = "#00D4B1"; e.target.style.color = "#0D1B2A"; } }}
              onMouseLeave={(e) => { if (!loading) { e.target.style.background = "#0D1B2A"; e.target.style.color = "#fff"; } }}
            >
              {loading ? "Membuat akun..." : "Buat akun gratis →"}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#9CA3AF" }}>
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#00D4B1", fontWeight: 700, textDecoration: "none" }}>
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}