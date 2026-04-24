import { useEffect, useState } from "react";
import { demoHeatmapData } from "../data/demoHeatmapData";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .heat-root {
    min-height: 100vh;
    background: #020817;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
  }

  /* Background grid */
  .heat-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  /* ─── NAVBAR ─── */
  .heat-nav {
    height: 60px;
    background: rgba(10,18,37,0.95);
    border-bottom: 1px solid rgba(0,212,255,0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }

  .nav-logo span { color: #00d4ff; }

  .nav-back {
    padding: 7px 16px;
    background: transparent;
    border: 1px solid rgba(0,212,255,0.25);
    border-radius: 2px;
    color: #00d4ff;
    font-size: 11px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .nav-back:hover { background: rgba(0,212,255,0.08); }

  /* ─── PAGE HERO ─── */
  .heat-hero {
    position: relative;
    z-index: 1;
    padding: 40px 32px 24px;
    border-bottom: 1px solid rgba(0,212,255,0.08);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,45,85,0.1);
    border: 1px solid rgba(255,45,85,0.3);
    padding: 4px 12px;
    border-radius: 100px;
    margin-bottom: 14px;
  }

  .hero-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff2d55;
    box-shadow: 0 0 8px #ff2d55;
    animation: pulse-red 1s infinite;
  }

  @keyframes pulse-red {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .hero-badge-text {
    font-size: 11px;
    color: #ff2d55;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }

  .hero-title {
    font-family: 'Orbitron', monospace;
    font-size: 32px;
    font-weight: 900;
    color: #fff;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .hero-title span { color: #ff2d55; }

  .hero-sub {
    font-size: 14px;
    color: #64748b;
    max-width: 500px;
  }

  /* ─── SUMMARY STRIP ─── */
  .summary-strip {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border-bottom: 1px solid rgba(0,212,255,0.08);
  }

  .sum-cell {
    padding: 20px 32px;
    border-right: 1px solid rgba(0,212,255,0.08);
    transition: background 0.2s;
  }

  .sum-cell:last-child { border-right: none; }
  .sum-cell:hover { background: rgba(0,212,255,0.03); }

  .sum-label {
    font-size: 11px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 6px;
  }

  .sum-value {
    font-family: 'Orbitron', monospace;
    font-size: 28px;
    font-weight: 700;
    color: #00d4ff;
  }

  .sum-value.danger { color: #ff2d55; }
  .sum-value.warn { color: #ffaa00; }
  .sum-value.safe { color: #00ff88; }

  .sum-delta {
    font-size: 11px;
    color: #334155;
    margin-top: 4px;
  }

  /* ─── MAIN GRID ─── */
  .heat-main {
    position: relative;
    z-index: 1;
    padding: 28px 32px;
    flex: 1;
  }

  .heat-main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .section-label {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: #00d4ff;
    text-transform: uppercase;
  }

  .filter-tabs {
    display: flex;
    gap: 4px;
  }

  .filter-tab {
    padding: 5px 14px;
    font-size: 11px;
    border-radius: 2px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    color: #475569;
  }

  .filter-tab.active {
    border-color: rgba(0,212,255,0.3);
    color: #00d4ff;
    background: rgba(0,212,255,0.08);
  }

  .location-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  /* Location card */
  .loc-card {
    background: #0a1225;
    border-radius: 4px;
    border: 1px solid rgba(0,212,255,0.1);
    overflow: hidden;
    transition: all 0.3s;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loc-card:hover {
    border-color: rgba(0,212,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }

  .loc-card-top {
    padding: 18px 20px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .loc-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  .loc-type-tag {
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 3px;
  }

  .threat-badge {
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .threat-badge.high {
    background: rgba(255,45,85,0.15);
    border: 1px solid rgba(255,45,85,0.4);
    color: #ff2d55;
  }

  .threat-badge.medium {
    background: rgba(255,170,0,0.12);
    border: 1px solid rgba(255,170,0,0.3);
    color: #ffaa00;
  }

  .threat-badge.low {
    background: rgba(0,255,136,0.08);
    border: 1px solid rgba(0,255,136,0.25);
    color: #00ff88;
  }

  /* Confidence bar */
  .conf-bar-wrap {
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }

  .conf-bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #64748b;
    margin-bottom: 8px;
  }

  .conf-bar-label span:last-child {
    font-family: 'Orbitron', monospace;
    font-size: 13px;
  }

  .conf-bar-track {
    height: 4px;
    background: rgba(255,255,255,0.06);
    border-radius: 100px;
    overflow: hidden;
  }

  .conf-bar-fill {
    height: 100%;
    border-radius: 100px;
    transition: width 1s ease;
  }

  .conf-bar-fill.high { background: linear-gradient(90deg, #ff2d55, #ff6b8a); }
  .conf-bar-fill.medium { background: linear-gradient(90deg, #ffaa00, #ffcc44); }
  .conf-bar-fill.low { background: linear-gradient(90deg, #00d4ff, #00ff88); }

  /* Stats grid inside card */
  .loc-stats {
    padding: 14px 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .ls-item { text-align: center; }

  .ls-val {
    font-family: 'Orbitron', monospace;
    font-size: 16px;
    font-weight: 700;
    color: #e2e8f0;
  }

  .ls-label {
    font-size: 10px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  /* Card footer */
  .loc-card-footer {
    padding: 10px 20px;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-time {
    font-size: 11px;
    color: #334155;
  }

  .footer-type {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
  }

  /* Loading */
  .loading-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .loading-ring {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(0,212,255,0.15);
    border-top-color: #00d4ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    letter-spacing: 3px;
    color: #00d4ff;
    text-transform: uppercase;
  }
`;

function getIntensity(conf) {
  if (conf >= 0.7) return "high";
  if (conf >= 0.4) return "medium";
  return "low";
}

function getThreatLabel(level) {
  if (level === "high") return "High Threat";
  if (level === "medium") return "Moderate";
  return "Low Risk";
}

export default function HeatmapDashboard() {
  const [heatmap, setHeatmap] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:8000/analytics/heatmap")
      .then(r => r.json())
      .then(d => { setHeatmap(d); setLoading(false); })
      .catch(() => { setHeatmap(demoHeatmapData); setLoading(false); });
  }, []);

  const entries = Object.entries(heatmap).filter(([_, d]) => {
    if (filter === "all") return true;
    return getIntensity(d.avg_confidence) === filter;
  });

  const totalIncidents = Object.values(heatmap).reduce((s, d) => s + (d.count || 0), 0);
  const avgConf = Object.values(heatmap).length
    ? Object.values(heatmap).reduce((s, d) => s + d.avg_confidence, 0) / Object.values(heatmap).length
    : 0;
  const highZones = Object.values(heatmap).filter(d => getIntensity(d.avg_confidence) === "high").length;

  return (
    <>
      <style>{styles}</style>
      <div className="heat-root">

        {/* Navbar */}
        <nav className="heat-nav">
          <div className="nav-logo">🛡️ AI Campus<span>Guard</span></div>
          <button className="nav-back" onClick={() => window.location.href = "/surveillance"}>
            ← Back to Live Feed
          </button>
        </nav>

        {loading ? (
          <div className="loading-screen">
            <div className="loading-ring" />
            <div className="loading-text">Loading Threat Data</div>
          </div>
        ) : (
          <>
            {/* Hero */}
            <div className="heat-hero">
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                <span className="hero-badge-text">Threat Intelligence</span>
              </div>
              <h1 className="hero-title">Campus <span>Heatmap</span></h1>
              <p className="hero-sub">
                Real-time incident density mapping across all monitored zones. Updated automatically on each analysis.
              </p>
            </div>

            {/* Summary strip */}
            <div className="summary-strip">
              <div className="sum-cell">
                <div className="sum-label">Total Incidents</div>
                <div className="sum-value danger">{totalIncidents}</div>
                <div className="sum-delta">Across all zones</div>
              </div>
              <div className="sum-cell">
                <div className="sum-label">High-Risk Zones</div>
                <div className="sum-value warn">{highZones}</div>
                <div className="sum-delta">Require attention</div>
              </div>
              <div className="sum-cell">
                <div className="sum-label">Avg Confidence</div>
                <div className="sum-value">{(avgConf * 100).toFixed(0)}%</div>
                <div className="sum-delta">Detection accuracy</div>
              </div>
              <div className="sum-cell">
                <div className="sum-label">Zones Monitored</div>
                <div className="sum-value safe">{Object.keys(heatmap).length}</div>
                <div className="sum-delta">Active locations</div>
              </div>
            </div>

            {/* Main */}
            <div className="heat-main">
              <div className="heat-main-header">
                <span className="section-label">Zone Analysis</span>
                <div className="filter-tabs">
                  {["all", "high", "medium", "low"].map(f => (
                    <button
                      key={f}
                      className={`filter-tab ${filter === f ? "active" : ""}`}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="location-grid">
                {entries.length === 0 && (
                  <p style={{color:"#334155", fontSize:"14px"}}>No zones match this filter.</p>
                )}
                {entries.map(([loc, data], i) => {
                  const intensity = getIntensity(data.avg_confidence);
                  return (
                    <div
                      key={loc}
                      className="loc-card"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="loc-card-top">
                        <div>
                          <div className="loc-name">{loc}</div>
                          <div className="loc-type-tag">{data.top_type || "Unknown Type"}</div>
                        </div>
                        <div className={`threat-badge ${intensity}`}>
                          {getThreatLabel(intensity)}
                        </div>
                      </div>

                      <div className="conf-bar-wrap">
                        <div className="conf-bar-label">
                          <span>Threat Confidence</span>
                          <span className={intensity === "high" ? "danger" : intensity === "medium" ? "warn" : "safe"}
                            style={{
                              color: intensity === "high" ? "#ff2d55" : intensity === "medium" ? "#ffaa00" : "#00ff88",
                              fontFamily: "Orbitron, monospace"
                            }}>
                            {(data.avg_confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="conf-bar-track">
                          <div
                            className={`conf-bar-fill ${intensity}`}
                            style={{ width: `${data.avg_confidence * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="loc-stats">
                        <div className="ls-item">
                          <div className="ls-val">{data.count}</div>
                          <div className="ls-label">Incidents</div>
                        </div>
                        <div className="ls-item">
                          <div className="ls-val">{(data.avg_confidence * 100).toFixed(0)}%</div>
                          <div className="ls-label">Avg Conf</div>
                        </div>
                        <div className="ls-item">
                          <div className="ls-val" style={{fontSize:"12px", color: "#64748b"}}>
                            {data.last_incident ? new Date(data.last_incident).toLocaleDateString() : "N/A"}
                          </div>
                          <div className="ls-label">Last Event</div>
                        </div>
                      </div>

                      <div className="loc-card-footer">
                        <span className="footer-time">
                          🕒 {data.last_incident
                            ? new Date(data.last_incident).toLocaleString()
                            : "No data"}
                        </span>
                        <span className="footer-type">⚠ {data.top_type || "—"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}