import { useState, useEffect, useRef } from "react";
import AlertOverlay from "../components/AlertOverlay";
import ReportModal from "../components/ReportModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .surv-root {
    min-height: 100vh;
    width: 100vw;
    background: #020817;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ─── TOP NAVBAR ─── */
  .surv-nav {
    height: 60px;
    background: rgba(10,18,37,0.95);
    border-bottom: 1px solid rgba(0,212,255,0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
    position: relative;
    z-index: 100;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo-icon { font-size: 22px; }

  .nav-logo-text {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
  }

  .nav-logo-text span { color: #00d4ff; }

  .nav-center {
    display: flex;
    gap: 4px;
  }

  .nav-tab {
    padding: 7px 18px;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    background: transparent;
    color: #64748b;
  }

  .nav-tab:hover { color: #00d4ff; }

  .nav-tab.active {
    background: rgba(0,212,255,0.1);
    border: 1px solid rgba(0,212,255,0.3);
    color: #00d4ff;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .status-live {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: #00ff88;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .status-live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ff88;
    box-shadow: 0 0 10px #00ff88;
    animation: pulse-green 1.5s infinite;
  }

  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .nav-logout {
    padding: 7px 16px;
    background: transparent;
    border: 1px solid rgba(255,45,85,0.3);
    border-radius: 2px;
    color: #ff2d55;
    font-size: 11px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .nav-logout:hover { background: rgba(255,45,85,0.1); }

  /* ─── MAIN LAYOUT ─── */
  .surv-body {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 320px;
    grid-template-rows: 1fr;
    overflow: hidden;
  }

  /* ─── LEFT: CAMERAS ─── */
  .cam-area {
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .cam-area-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .section-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: #00d4ff;
    text-transform: uppercase;
  }

  .cam-count {
    font-size: 12px;
    color: #475569;
  }

  .cam-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    flex: 1;
  }

  .cam-card {
    border-radius: 4px;
    border: 1px solid rgba(0,212,255,0.15);
    overflow: hidden;
    background: #0a1225;
    position: relative;
    transition: border-color 0.2s;
    aspect-ratio: 16/10;
  }

  .cam-card:hover { border-color: rgba(0,212,255,0.4); }

  .cam-card video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #050d1f;
  }

  /* Offline placeholder */
  .cam-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #050d1f, #0a1225);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 160px;
  }

  .cam-offline-icon { font-size: 32px; opacity: 0.3; }

  .cam-offline-text {
    font-size: 11px;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* Scanline effect */
  .cam-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.04) 2px,
      rgba(0,0,0,0.04) 4px
    );
    pointer-events: none;
  }

  .cam-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 10px;
    background: linear-gradient(0deg, rgba(2,8,23,0.9) 0%, transparent 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
  }

  .cam-name {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #e2e8f0;
  }

  .cam-status {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    color: #00ff88;
  }

  .cam-status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00ff88;
    animation: pulse-green 1.5s infinite;
  }

  .cam-top-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
    background: linear-gradient(180deg, rgba(2,8,23,0.8) 0%, transparent 100%);
  }

  .cam-rec {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    color: #ff2d55;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .cam-rec-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff2d55;
    box-shadow: 0 0 8px #ff2d55;
    animation: pulse-red 1s infinite;
  }

  @keyframes pulse-red {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .cam-time {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    color: rgba(255,255,255,0.6);
  }

  /* ─── RIGHT SIDEBAR ─── */
  .surv-sidebar {
    background: #0a1225;
    border-left: 1px solid rgba(0,212,255,0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .sidebar-section {
    border-bottom: 1px solid rgba(0,212,255,0.08);
    padding: 20px;
  }

  .sidebar-section:last-child { border-bottom: none; flex: 1; overflow-y: auto; }

  .sidebar-label {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  /* Upload zone */
  .upload-zone {
    border: 1px dashed rgba(0,212,255,0.25);
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    background: rgba(0,212,255,0.02);
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .upload-zone:hover {
    border-color: rgba(0,212,255,0.5);
    background: rgba(0,212,255,0.05);
  }

  .upload-zone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .upload-icon { font-size: 28px; margin-bottom: 8px; }

  .upload-text {
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.5;
  }

  .upload-text strong { color: #00d4ff; }

  .loc-select {
    width: 100%;
    padding: 10px 12px;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 2px;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    cursor: pointer;
    margin-bottom: 12px;
  }

  .loc-select option { background: #0a1225; }

  .analyze-btn {
    width: 100%;
    padding: 11px;
    background: linear-gradient(90deg, #0072ff, #00d4ff);
    border: none;
    border-radius: 2px;
    color: #000;
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }

  .analyze-btn:hover { box-shadow: 0 4px 20px rgba(0,212,255,0.4); }
  .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Status message */
  .status-card {
    padding: 10px 14px;
    border-radius: 2px;
    font-size: 12px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-card.success {
    background: rgba(0,255,136,0.08);
    border: 1px solid rgba(0,255,136,0.25);
    color: #00ff88;
  }

  .status-card.error {
    background: rgba(255,45,85,0.08);
    border: 1px solid rgba(255,45,85,0.25);
    color: #ff2d55;
  }

  .status-card.loading {
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.25);
    color: #00d4ff;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0,212,255,0.2);
    border-top-color: #00d4ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Quick stats */
  .quick-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .qs-card {
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.1);
    border-radius: 2px;
    padding: 12px;
    text-align: center;
  }

  .qs-num {
    font-family: 'Orbitron', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #00d4ff;
  }

  .qs-label {
    font-size: 10px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  /* Alert log */
  .alert-log-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .log-item {
    display: flex;
    gap: 10px;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.05);
    background: rgba(255,255,255,0.02);
    align-items: flex-start;
  }

  .log-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
  }

  .log-dot.high { background: #ff2d55; box-shadow: 0 0 8px #ff2d55; }
  .log-dot.med { background: #ffaa00; box-shadow: 0 0 8px #ffaa00; }
  .log-dot.low { background: #00d4ff; box-shadow: 0 0 8px #00d4ff; }

  .log-text { flex: 1; }

  .log-type {
    font-size: 12px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .log-meta {
    font-size: 10px;
    color: #475569;
    margin-top: 2px;
  }

  .heatmap-cta {
    padding: 11px;
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255,45,85,0.4);
    border-radius: 2px;
    color: #ff2d55;
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 12px;
  }

  .heatmap-cta:hover {
    background: rgba(255,45,85,0.1);
    box-shadow: 0 0 20px rgba(255,45,85,0.2);
  }

  .clock-display {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    color: #334155;
  }
`;

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span>{time.toLocaleTimeString()}</span>;
}

const feeds = [
  { name: "Main Gate", src: "/cctv/main_gate.mp4" },
  { name: "Auditorium", src: "/cctv/auditorium.mp4" },
  { name: "Canteen", src: "/cctv/canteen.mp4" },
  { name: "Library", src: "/cctv/library.mp4" },
];

const demoLog = [
  { type: "Fight Detected", loc: "Main Gate", time: "18:45", level: "high" },
  { type: "Crowd Aggression", loc: "Canteen", time: "13:10", level: "med" },
  { type: "Suspicious Movement", loc: "Auditorium", time: "11:05", level: "low" },
];

export default function Surveillance() {
  const [alertIncident, setAlertIncident] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState("Main Gate");
  const sirenRef = useRef(null);

  useEffect(() => {
    if (alertIncident && sirenRef.current) {
      sirenRef.current.play().catch(() => {});
    }
    return () => {
      if (sirenRef.current) { sirenRef.current.pause(); sirenRef.current.currentTime = 0; }
    };
  }, [alertIncident]);

  async function handleAnalyze() {
    if (!selectedFile) { setStatusMessage("Please select a video file first."); setStatusType("error"); return; }
    setLoading(true);
    setStatusMessage("Analyzing video feed...");
    setStatusType("loading");
    setAlertIncident(null);
    setShowReport(false);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("location", location);

    try {
      const res = await fetch("http://localhost:8000/analyze-video/", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Backend error");
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (data.message === "No violence detected") {
        setStatusMessage(`✓ No violence detected at ${data.location}`);
        setStatusType("success");
      } else if (data.violence_type) {
        setAlertIncident(data);
        setStatusMessage("");
      } else {
        setStatusMessage("Analysis completed.");
        setStatusType("success");
      }
    } catch {
      setStatusMessage("Connection error — check backend.");
      setStatusType("error");
    }
    setLoading(false);
  }

  return (
    <>
      <style>{styles}</style>
      <audio ref={sirenRef} loop><source src="/siren.mp3" type="audio/mpeg" /></audio>

      <div className="surv-root">
        {/* Navbar */}
        <nav className="surv-nav">
          <div className="nav-logo">
            <span className="nav-logo-icon">🛡️</span>
            <span className="nav-logo-text">AI Campus<span>Guard</span></span>
          </div>
          <div className="nav-center">
            <button className="nav-tab active">Live Feed</button>
            <button className="nav-tab" onClick={() => window.location.href = "/heatmap"}>Heatmap</button>
          </div>
          <div className="nav-right">
            <div className="status-live">
              <div className="status-live-dot" />
              <span>Live</span>
            </div>
            <span className="clock-display"><LiveClock /></span>
            <button className="nav-logout" onClick={() => window.location.href = "/"}>Logout</button>
          </div>
        </nav>

        {/* Body */}
        <div className="surv-body">

          {/* Camera Grid */}
          <div className="cam-area">
            <div className="cam-area-header">
              <span className="section-title">Live Camera Feeds</span>
              <span className="cam-count">{feeds.length} cameras active</span>
            </div>
            <div className="cam-grid">
              {feeds.map((cam) => (
                <div key={cam.name} className="cam-card">
                  <div className="cam-top-bar">
                    <div className="cam-rec">
                      <div className="cam-rec-dot" />
                      REC
                    </div>
                    <span className="cam-time"><LiveClock /></span>
                  </div>
                  <div className="cam-placeholder">
                    <div className="cam-offline-icon">📹</div>
                    <div className="cam-offline-text">Feed Offline</div>
                  </div>
                  <div className="cam-label">
                    <span className="cam-name">{cam.name}</span>
                    <div className="cam-status">
                      <div className="cam-status-dot" />
                      Online
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="surv-sidebar">

            {/* Quick stats */}
            <div className="sidebar-section">
              <div className="sidebar-label">System Status</div>
              <div className="quick-stats">
                <div className="qs-card">
                  <div className="qs-num">4</div>
                  <div className="qs-label">Cameras</div>
                </div>
                <div className="qs-card">
                  <div className="qs-num">13</div>
                  <div className="qs-label">Incidents</div>
                </div>
                <div className="qs-card">
                  <div className="qs-num">0</div>
                  <div className="qs-label">Active Alerts</div>
                </div>
                <div className="qs-card">
                  <div className="qs-num" style={{color:"#00ff88"}}>OK</div>
                  <div className="qs-label">System</div>
                </div>
              </div>
            </div>

            {/* Upload for analysis */}
            <div className="sidebar-section">
              <div className="sidebar-label">Video Analysis</div>

              <select
                className="loc-select"
                value={location}
                onChange={e => setLocation(e.target.value)}
              >
                <option>Main Gate</option>
                <option>Library</option>
                <option>Canteen</option>
                <option>Auditorium</option>
              </select>

              <div className="upload-zone">
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => setSelectedFile(e.target.files[0])}
                />
                <div className="upload-icon">🎬</div>
                <div className="upload-text">
                  {selectedFile
                    ? <><strong>{selectedFile.name}</strong><br />Ready to analyze</>
                    : <>Drop video or <strong>browse files</strong><br />MP4, MOV, AVI supported</>
                  }
                </div>
              </div>

              <button
                className="analyze-btn"
                style={{marginTop: "12px"}}
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Run AI Analysis →"}
              </button>

              {statusMessage && (
                <div className={`status-card ${statusType}`}>
                  {statusType === "loading" && <div className="spinner" />}
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>

            {/* Recent alerts log */}
            <div className="sidebar-section">
              <div className="sidebar-label">Recent Alerts</div>
              <div className="alert-log-list">
                {demoLog.map((item, i) => (
                  <div key={i} className="log-item">
                    <div className={`log-dot ${item.level}`} />
                    <div className="log-text">
                      <div className="log-type">{item.type}</div>
                      <div className="log-meta">{item.loc} · {item.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="heatmap-cta" onClick={() => window.location.href = "/heatmap"}>
                🔥 View Full Heatmap
              </button>
            </div>

          </aside>
        </div>
      </div>

      {alertIncident && !showReport && (
        <AlertOverlay
          incident={alertIncident}
          onClose={() => setAlertIncident(null)}
          onView={() => setShowReport(true)}
        />
      )}

      {showReport && alertIncident && (
        <ReportModal
          incident={alertIncident}
          onClose={() => { setShowReport(false); setAlertIncident(null); }}
        />
      )}
    </>
  );
}