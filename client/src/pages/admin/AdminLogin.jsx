import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ============================================================
// GANTI nilai ini untuk pilih opsi tampilan:
// "A" = Glassmorphism teal-blue (matching dashboard, ada background landscape)
// "B" = Dark premium (matching sidebar)
// ============================================================
const THEME = "A";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login gagal. Periksa email dan password kamu.");
    } finally {
      setLoading(false);
    }
  };

  return THEME === "A" ? <ThemeA {...{ email, setEmail, password, setPassword, showPass, setShowPass, loading, handleLogin }} />
                       : <ThemeB {...{ email, setEmail, password, setPassword, showPass, setShowPass, loading, handleLogin }} />;
}

/* ─────────────────────────────────────────
   OPSI A — Glassmorphism + Background Landscape
   Warna: Teal-blue matching dashboard
───────────────────────────────────────── */
function ThemeA({ email, setEmail, password, setPassword, showPass, setShowPass, loading, handleLogin }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .la-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #b8d8ea;
        }

        /* SVG Landscape Background */
        .la-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        /* Floating blobs for extra depth */
        .la-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          animation: blobFloat 8s ease-in-out infinite;
          z-index: 1;
        }

        .la-blob-1 { width: 340px; height: 340px; background: #20d2b4; top: -80px; left: -80px; animation-delay: 0s; }
        .la-blob-2 { width: 260px; height: 260px; background: #38b2e8; bottom: -60px; right: -60px; animation-delay: 3s; }
        .la-blob-3 { width: 180px; height: 180px; background: #a8edea; top: 40%; left: 60%; animation-delay: 5s; }

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        /* Glass Card */
        .la-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1.5px solid rgba(255, 255, 255, 0.45);
          border-radius: 28px;
          padding: 44px 40px 40px;
          box-shadow: 0 16px 60px rgba(15, 25, 35, 0.18), 0 2px 8px rgba(255,255,255,0.2) inset;
          animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .la-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .la-logo-mark {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(32,210,180,0.4);
        }

        .la-logo-text {
          font-size: 18px; font-weight: 800; color: #0f1923; letter-spacing: -0.3px;
        }

        .la-logo-text span { color: #20d2b4; }

        .la-title {
          font-size: 24px; font-weight: 800; color: #0f1923;
          letter-spacing: -0.6px; text-align: center; margin-bottom: 4px;
          margin-top: 20px;
        }

        .la-subtitle {
          font-size: 13px; color: rgba(15,25,35,0.5); text-align: center;
          margin-bottom: 28px; font-weight: 400;
        }

        .la-group { margin-bottom: 16px; }

        .la-label {
          font-size: 11px; font-weight: 700; color: rgba(15,25,35,0.55);
          text-transform: uppercase; letter-spacing: 0.7px; display: block; margin-bottom: 7px;
        }

        .la-input-wrap { position: relative; }

        .la-input {
          font-family: 'Plus Jakarta Sans', sans-serif;
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.45);
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 12px;
          padding: 12px 44px 12px 16px;
          font-size: 14px; font-weight: 500; color: #0f1923;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .la-input::placeholder { color: rgba(15,25,35,0.35); }

        .la-input:focus {
          border-color: #20d2b4;
          background: rgba(255,255,255,0.65);
          box-shadow: 0 0 0 3px rgba(32,210,180,0.18);
        }

        .la-input-icon {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(15,25,35,0.35); display: flex; align-items: center;
          cursor: pointer;
          transition: color 0.2s;
        }

        .la-input-icon:hover { color: #20d2b4; }

        .la-forgot {
          text-align: right; margin-top: 6px;
          font-size: 12px; font-weight: 600; color: #20d2b4;
          cursor: pointer; text-decoration: none;
        }

        .la-forgot:hover { opacity: 0.75; }

        .la-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #20d2b4 0%, #38b2e8 100%);
          color: #0f1923; font-size: 14px; font-weight: 700;
          border: none; border-radius: 12px; cursor: pointer;
          margin-top: 24px;
          box-shadow: 0 6px 20px rgba(32,210,180,0.35);
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.1px;
        }

        .la-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .la-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .la-register {
          text-align: center; margin-top: 20px;
          font-size: 13px; color: rgba(15,25,35,0.5); font-weight: 400;
        }

        .la-register a { font-weight: 700; color: #0f1923; text-decoration: none; margin-left: 4px; }
        .la-register a:hover { color: #20d2b4; }
      `}</style>

      <div className="la-root">
        {/* SVG Landscape Background */}
        <svg className="la-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8e8f5"/>
              <stop offset="60%" stopColor="#b0d8f0"/>
              <stop offset="100%" stopColor="#9ecde8"/>
            </linearGradient>
            <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ab8d8"/>
              <stop offset="100%" stopColor="#5a9bbf"/>
            </linearGradient>
            <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a96b8"/>
              <stop offset="100%" stopColor="#3a7a9e"/>
            </linearGradient>
            <linearGradient id="m3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a789a"/>
              <stop offset="100%" stopColor="#1e5a7a"/>
            </linearGradient>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f2a3a"/>
              <stop offset="100%" stopColor="#08161f"/>
            </linearGradient>
          </defs>
          {/* Sky */}
          <rect width="1440" height="900" fill="url(#sky)"/>
          {/* Sun */}
          <circle cx="720" cy="200" r="90" fill="rgba(255,255,255,0.7)"/>
          <circle cx="720" cy="200" r="65" fill="rgba(255,255,255,0.9)"/>
          {/* Clouds */}
          <ellipse cx="300" cy="160" rx="120" ry="40" fill="rgba(255,255,255,0.6)"/>
          <ellipse cx="360" cy="145" rx="80" ry="35" fill="rgba(255,255,255,0.7)"/>
          <ellipse cx="1100" cy="130" rx="140" ry="45" fill="rgba(255,255,255,0.55)"/>
          <ellipse cx="1060" cy="115" rx="90" ry="35" fill="rgba(255,255,255,0.65)"/>
          <ellipse cx="600" cy="100" rx="80" ry="28" fill="rgba(255,255,255,0.5)"/>
          {/* Far mountains */}
          <path d="M0 520 L180 320 L360 480 L540 280 L720 420 L900 260 L1080 400 L1260 300 L1440 440 L1440 900 L0 900Z" fill="url(#m1)" opacity="0.7"/>
          {/* Mid mountains */}
          <path d="M0 620 L200 420 L400 560 L600 380 L800 520 L1000 360 L1200 500 L1440 400 L1440 900 L0 900Z" fill="url(#m2)" opacity="0.8"/>
          {/* Near mountains */}
          <path d="M0 700 L160 540 L320 640 L500 480 L680 600 L860 460 L1040 580 L1220 500 L1440 560 L1440 900 L0 900Z" fill="url(#m3)"/>
          {/* Foreground trees left */}
          <path d="M-20 900 L40 680 L100 900Z" fill="url(#fg)"/>
          <path d="M30 900 L80 720 L130 900Z" fill="url(#fg)" opacity="0.8"/>
          <path d="M70 900 L110 760 L150 900Z" fill="url(#fg)" opacity="0.6"/>
          {/* Foreground trees right */}
          <path d="M1300 900 L1360 680 L1420 900Z" fill="url(#fg)"/>
          <path d="M1330 900 L1380 720 L1440 900Z" fill="url(#fg)" opacity="0.8"/>
          <path d="M1280 900 L1320 760 L1380 900Z" fill="url(#fg)" opacity="0.6"/>
          {/* Birds */}
          <path d="M220 280 Q225 275 230 280 Q235 275 240 280" stroke="#1a3a4a" strokeWidth="2" fill="none" opacity="0.6"/>
          <path d="M260 260 Q265 255 270 260 Q275 255 280 260" stroke="#1a3a4a" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M1150 220 Q1155 215 1160 220 Q1165 215 1170 220" stroke="#1a3a4a" strokeWidth="2" fill="none" opacity="0.6"/>
          <path d="M1190 240 Q1195 235 1200 240 Q1205 235 1210 240" stroke="#1a3a4a" strokeWidth="2" fill="none" opacity="0.45"/>
        </svg>

        {/* Blobs */}
        <div className="la-blob la-blob-1" />
        <div className="la-blob la-blob-2" />
        <div className="la-blob la-blob-3" />

        {/* Card */}
        <div className="la-card">
          <div className="la-logo">
            <div className="la-logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h13" stroke="#0f1923" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="la-logo-text">Cekout<span>Yuk</span></span>
          </div>

          <div className="la-title">Selamat Datang 👋</div>
          <div className="la-subtitle">Masuk ke panel admin kamu</div>

          <form onSubmit={handleLogin}>
            <div className="la-group">
              <label className="la-label">Email</label>
              <div className="la-input-wrap">
                <input
                  className="la-input"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="la-input-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="la-group">
              <label className="la-label">Password</label>
              <div className="la-input-wrap">
                <input
                  className="la-input"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="la-input-icon" onClick={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  )}
                </span>
              </div>
              <a className="la-forgot">Lupa Password?</a>
            </div>

            <button className="la-btn" type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   OPSI B — Dark Premium (matching sidebar)
   Warna: Dark #0f1923 matching sidebar admin
───────────────────────────────────────── */
function ThemeB({ email, setEmail, password, setPassword, showPass, setShowPass, loading, handleLogin }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .lb-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #0f1923 0%, #12232e 60%, #0a1a28 100%);
          position: relative;
          overflow: hidden;
        }

        .lb-root::before {
          content: '';
          position: absolute;
          top: -120px; left: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(32,210,180,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .lb-root::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -100px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(99,179,237,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Animated grid lines */
        .lb-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(32,210,180,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(32,210,180,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .lb-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 28px;
          padding: 44px 40px 40px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
          animation: cardInB 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardInB {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lb-logo {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-bottom: 6px;
        }

        .lb-logo-mark {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(32,210,180,0.35);
        }

        .lb-logo-text { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.3px; }
        .lb-logo-text span { color: #20d2b4; }

        .lb-title {
          font-size: 24px; font-weight: 800; color: #fff;
          letter-spacing: -0.6px; text-align: center;
          margin-top: 22px; margin-bottom: 4px;
        }

        .lb-subtitle {
          font-size: 13px; color: rgba(255,255,255,0.35);
          text-align: center; margin-bottom: 30px; font-weight: 400;
        }

        .lb-group { margin-bottom: 16px; }

        .lb-label {
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.7px; display: block; margin-bottom: 7px;
        }

        .lb-input-wrap { position: relative; }

        .lb-input {
          font-family: 'Plus Jakarta Sans', sans-serif;
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 44px 12px 16px;
          font-size: 14px; font-weight: 500; color: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .lb-input::placeholder { color: rgba(255,255,255,0.2); }

        .lb-input:focus {
          border-color: #20d2b4;
          background: rgba(32,210,180,0.07);
          box-shadow: 0 0 0 3px rgba(32,210,180,0.15);
        }

        .lb-input-icon {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.25); display: flex; align-items: center;
          cursor: pointer; transition: color 0.2s;
        }

        .lb-input-icon:hover { color: #20d2b4; }

        .lb-forgot {
          display: block; text-align: right; margin-top: 6px;
          font-size: 12px; font-weight: 600; color: #20d2b4;
          cursor: pointer; text-decoration: none; opacity: 0.8;
        }

        .lb-forgot:hover { opacity: 1; }

        .lb-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #20d2b4 0%, #38b2e8 100%);
          color: #0f1923; font-size: 14px; font-weight: 700;
          border: none; border-radius: 12px; cursor: pointer;
          margin-top: 24px;
          box-shadow: 0 6px 20px rgba(32,210,180,0.3);
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.1px;
        }

        .lb-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .lb-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .lb-register {
          text-align: center; margin-top: 20px;
          font-size: 13px; color: rgba(255,255,255,0.3); font-weight: 400;
        }

        .lb-register a {
          font-weight: 700; color: rgba(255,255,255,0.7);
          text-decoration: none; margin-left: 4px;
          transition: color 0.2s;
        }

        .lb-register a:hover { color: #20d2b4; }
      `}</style>

      <div className="lb-root">
        <div className="lb-grid" />

        <div className="lb-card">
          <div className="lb-logo">
            <div className="lb-logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h13" stroke="#0f1923" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="lb-logo-text">Cekout<span>Yuk</span></span>
          </div>

          <div className="lb-title">Selamat Datang 👋</div>
          <div className="lb-subtitle">Masuk ke panel admin kamu</div>

          <form onSubmit={handleLogin}>
            <div className="lb-group">
              <label className="lb-label">Email</label>
              <div className="lb-input-wrap">
                <input
                  className="lb-input"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="lb-input-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="lb-group">
              <label className="lb-label">Password</label>
              <div className="lb-input-wrap">
                <input
                  className="lb-input"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="lb-input-icon" onClick={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  )}
                </span>
              </div>
              <a className="lb-forgot">Lupa Password?</a>
            </div>

            <button className="lb-btn" type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
            </button>
          </form>

          <div className="lb-register">
            Belum punya akun?<a href="#">Daftar</a>
          </div>
        </div>
      </div>
    </>
  );
}