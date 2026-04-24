import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sistImage from "../assets/sist.jpeg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .login-root {
    min-height: 100vh;
    width: 100vw;
    background: #020817;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  .login-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }

  .login-root::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .login-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    width: 900px;
    max-width: 95vw;
    min-height: 520px;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 0 80px rgba(0,212,255,0.15), 0 0 200px rgba(0,212,255,0.05);
  }

  .login-brand {
    flex: 1;
    background: linear-gradient(160deg, #0d1626 0%, #050d1f 100%);
    border: 1px solid rgba(0,212,255,0.2);
    border-right: none;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .login-brand::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%);
  }

  .brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.3);
    padding: 6px 14px;
    border-radius: 2px;
    width: fit-content;
  }

  .badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00ff88;
    animation: blink 1.5s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px #00ff88; }
    50% { opacity: 0.3; box-shadow: none; }
  }

  .badge-text {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: #00d4ff;
    text-transform: uppercase;
  }

  .brand-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 0;
  }

  .brand-image {
    width: 180px;
    max-width: 100%;
    object-fit: contain;
    margin-bottom: 20px;
    filter: drop-shadow(0 0 20px rgba(0,212,255,0.25));
  }

  .brand-title {
    font-family: 'Orbitron', monospace;
    font-size: 26px;
    font-weight: 900;
    color: #fff;
    line-height: 1.2;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }

  .brand-title span {
    color: #00d4ff;
    display: block;
  }

  .brand-desc {
    font-size: 14px;
    color: #64748b;
    line-height: 1.7;
    max-width: 260px;
  }

  .brand-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-pill {
    background: rgba(0,212,255,0.05);
    border: 1px solid rgba(0,212,255,0.15);
    padding: 12px 14px;
    border-radius: 2px;
  }

  .stat-pill-num {
    font-family: 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #00d4ff;
  }

  .stat-pill-label {
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  .login-form-panel {
    width: 380px;
    background: #0a1225;
    border: 1px solid rgba(0,212,255,0.2);
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .login-form-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  }

  .form-header { margin-bottom: 36px; }

  .form-label-top {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 4px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .form-title {
    font-family: 'Orbitron', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }

  .form-subtitle {
    font-size: 13px;
    color: #64748b;
    margin-top: 6px;
  }

  .field-group { margin-bottom: 20px; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 8px;
  }

  .field-wrap { position: relative; }

  .field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
  }

  .field-input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 2px;
    color: #e2e8f0;
    font-size: 14px;
    outline: none;
  }

  .login-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(90deg, #0072ff, #00d4ff);
    border: none;
    border-radius: 2px;
    color: #000;
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    cursor: pointer;
    margin-top: 8px;
  }

  .divider {
    text-align: center;
    margin: 24px 0 20px;
    position: relative;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0,212,255,0.1);
  }

  .divider span {
    position: relative;
    background: #0a1225;
    padding: 0 12px;
    font-size: 11px;
    color: #334155;
  }

  .signup-link {
    text-align: center;
    font-size: 13px;
    color: #475569;
  }

  .signup-link a {
    color: #00d4ff;
    cursor: pointer;
    text-decoration: none;
  }

  .error-msg {
    background: rgba(255,45,85,0.1);
    border: 1px solid rgba(255,45,85,0.3);
    padding: 10px 14px;
    font-size: 12px;
    color: #ff2d55;
    margin-bottom: 16px;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    navigate("/surveillance");
  };

  return (
    <>
      <style>{styles}</style>

      <div className="login-root">
        <div className="login-wrapper">

          <div className="login-brand">
            <div className="brand-badge">
              <div className="badge-dot" />
              <span className="badge-text">System Online</span>
            </div>

            <div className="brand-main">
              <img src={sistImage} alt="SIST Logo" className="brand-image" />

              <h1 className="brand-title">
                AI Campus<span>Guard</span>
              </h1>

              <p className="brand-desc">
                Real-time violence detection & campus-wide threat monitoring system powered by advanced AI.
              </p>
            </div>

            <div className="brand-stats">
              <div className="stat-pill">
                <div className="stat-pill-num">4</div>
                <div className="stat-pill-label">Live Cameras</div>
              </div>

              <div className="stat-pill">
                <div className="stat-pill-num">24/7</div>
                <div className="stat-pill-label">Monitoring</div>
              </div>

              <div className="stat-pill">
                <div className="stat-pill-num">99%</div>
                <div className="stat-pill-label">Uptime</div>
              </div>

              <div className="stat-pill">
                <div className="stat-pill-num">&lt;2s</div>
                <div className="stat-pill-label">Alert Speed</div>
              </div>
            </div>
          </div>

          <div className="login-form-panel">
            <div className="form-header">
              <div className="form-label-top">Secure Access</div>
              <h2 className="form-title">Officer Login</h2>
              <p className="form-subtitle">
                Enter your credentials to access the control center
              </p>
            </div>

            {error && <div className="error-msg">⚠ {error}</div>}

            <form onSubmit={handleLogin}>
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className="field-wrap">
                  <span className="field-icon">📧</span>
                  <input
                    className="field-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <span className="field-icon">🔒</span>
                  <input
                    className="field-input"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              <button className="login-btn" type="submit">
                Access System →
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <p className="signup-link">
              New officer?{" "}
              <a onClick={() => navigate("/signup")}>Create account</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}