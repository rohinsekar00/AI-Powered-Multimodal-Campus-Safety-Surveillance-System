import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }

  .signup-root {
    min-height: 100vh;
    width: 100vw;
    background: #020817;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .signup-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }

  .signup-card {
    position: relative;
    z-index: 10;
    width: 420px;
    max-width: 90vw;
    background: #0a1225;
    border: 1px solid rgba(0,212,255,0.2);
    border-radius: 4px;
    padding: 44px 40px;
    box-shadow: 0 0 80px rgba(0,212,255,0.08);
  }

  .signup-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  }

  .signup-top {
    text-align: center;
    margin-bottom: 32px;
  }

  .signup-icon { font-size: 40px; margin-bottom: 14px; }

  .signup-label {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 4px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .signup-title {
    font-family: 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }

  .signup-sub {
    font-size: 13px;
    color: #64748b;
    margin-top: 6px;
  }

  .field-group { margin-bottom: 18px; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 7px;
  }

  .field-wrap { position: relative; }

  .field-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    pointer-events: none;
  }

  .field-input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 2px;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
  }

  .field-input::placeholder { color: #334155; }

  .field-input:focus {
    border-color: rgba(0,212,255,0.5);
    background: rgba(0,212,255,0.07);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.07);
  }

  .signup-btn {
    width: 100%;
    padding: 13px;
    background: linear-gradient(90deg, #0072ff, #00d4ff);
    border: none;
    border-radius: 2px;
    color: #000;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.2s;
  }

  .signup-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(0,212,255,0.35);
  }

  .back-link {
    text-align: center;
    margin-top: 20px;
    font-size: 13px;
    color: #475569;
  }

  .back-link a {
    color: #00d4ff;
    cursor: pointer;
    font-weight: 600;
  }

  .back-link a:hover { opacity: 0.7; }

  .error-msg {
    background: rgba(255,45,85,0.08);
    border: 1px solid rgba(255,45,85,0.25);
    border-radius: 2px;
    padding: 9px 13px;
    font-size: 12px;
    color: #ff2d55;
    margin-bottom: 14px;
  }
`;

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("All fields are required."); return; }
    navigate("/");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-root">
        <div className="signup-card">
          <div className="signup-top">
            <div className="signup-icon">🛡️</div>
            <div className="signup-label">New Account</div>
            <h2 className="signup-title">Officer Registration</h2>
            <p className="signup-sub">Create your campus security account</p>
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}

          <form onSubmit={handleSignup}>
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <div className="field-wrap">
                <span className="field-icon">👤</span>
                <input className="field-input" type="text" placeholder="Officer John Doe"
                  value={name} onChange={e => { setName(e.target.value); setError(""); }} />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon">📧</span>
                <input className="field-input" type="email" placeholder="officer@campus.edu"
                  value={email} onChange={e => { setEmail(e.target.value); setError(""); }} />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">🔒</span>
                <input className="field-input" type="password" placeholder="••••••••••"
                  value={password} onChange={e => { setPassword(e.target.value); setError(""); }} />
              </div>
            </div>

            <button className="signup-btn" type="submit">Create Account →</button>
          </form>

          <p className="back-link">Already have an account? <a onClick={() => navigate("/")}>Sign in</a></p>
        </div>
      </div>
    </>
  );
}