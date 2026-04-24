// ─── ReportModal.jsx ──────────────────────────────────────────────────────────

const reportStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  .rm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(8px);
    animation: rm-in 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }

  @keyframes rm-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .rm-box {
    background: #0a1225;
    border: 1px solid rgba(0,212,255,0.2);
    border-radius: 4px;
    width: 560px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 60px rgba(0,212,255,0.1);
    animation: rm-box-in 0.3s ease;
  }

  @keyframes rm-box-in {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Scrollbar */
  .rm-box::-webkit-scrollbar { width: 4px; }
  .rm-box::-webkit-scrollbar-track { background: transparent; }
  .rm-box::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.2); border-radius: 2px; }

  .rm-topbar {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(0,212,255,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: #0a1225;
    z-index: 10;
  }

  .rm-topbar-left {}

  .rm-toplabel {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .rm-title {
    font-family: 'Orbitron', monospace;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }

  .rm-close {
    width: 32px;
    height: 32px;
    border-radius: 2px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #64748b;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-family: monospace;
  }

  .rm-close:hover { background: rgba(255,45,85,0.1); color: #ff2d55; border-color: rgba(255,45,85,0.3); }

  /* Evidence image */
  .rm-evidence {
    margin: 20px 24px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(0,212,255,0.15);
    background: #050d1f;
    min-height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #334155;
    font-size: 13px;
  }

  .rm-evidence img {
    width: 100%;
    display: block;
  }

  /* Info grid */
  .rm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 0 24px 20px;
  }

  .rm-field {
    background: rgba(0,212,255,0.03);
    border: 1px solid rgba(0,212,255,0.08);
    border-radius: 2px;
    padding: 12px 14px;
  }

  .rm-field-label {
    font-size: 10px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 5px;
  }

  .rm-field-val {
    font-size: 14px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .rm-field-val.danger { color: #ff2d55; }

  /* Reasons */
  .rm-reasons {
    margin: 0 24px 20px;
    padding: 14px 16px;
    background: rgba(255,170,0,0.05);
    border: 1px solid rgba(255,170,0,0.15);
    border-radius: 2px;
  }

  .rm-reasons-label {
    font-size: 10px;
    color: #ffaa00;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }

  .rm-reasons-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .rm-reason-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #94a3b8;
  }

  .rm-reason-item::before {
    content: '';
    width: 4px;
    height: 4px;
    background: #ffaa00;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Actions */
  .rm-actions {
    padding: 16px 24px 24px;
    display: flex;
    gap: 10px;
  }

  .rm-btn {
    flex: 1;
    padding: 12px;
    border-radius: 2px;
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }

  .rm-btn.print {
    background: transparent;
    border: 1px solid rgba(0,212,255,0.3);
    color: #00d4ff;
  }

  .rm-btn.print:hover { background: rgba(0,212,255,0.08); }

  .rm-btn.close {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    color: #94a3b8;
  }

  .rm-btn.close:hover { background: rgba(255,255,255,0.1); }
`;

export default function ReportModal({ incident, onClose }) {
  const conf = typeof incident.confidence === "number"
    ? `${(incident.confidence * 100).toFixed(1)}%`
    : incident.confidence;

  return (
    <>
      <style>{reportStyles}</style>
      <div className="rm-overlay">
        <div className="rm-box">

          <div className="rm-topbar">
            <div className="rm-topbar-left">
              <div className="rm-toplabel">Incident Report</div>
              <div className="rm-title">📄 Analysis Summary</div>
            </div>
            <button className="rm-close" onClick={onClose}>✕</button>
          </div>

          {/* Evidence */}
          <div className="rm-evidence">
            {incident.evidence_image
              ? <img src={`http://localhost:8000${incident.evidence_image}`} alt="Evidence frame" />
              : <span>No evidence image available</span>
            }
          </div>

          {/* Fields */}
          <div className="rm-grid">
            <div className="rm-field">
              <div className="rm-field-label">📍 Location</div>
              <div className="rm-field-val">{incident.location}</div>
            </div>
            <div className="rm-field">
              <div className="rm-field-label">⚠ Violence Type</div>
              <div className="rm-field-val danger">{incident.violence_type}</div>
            </div>
            <div className="rm-field">
              <div className="rm-field-label">📊 Confidence</div>
              <div className="rm-field-val">{conf}</div>
            </div>
            <div className="rm-field">
              <div className="rm-field-label">🕒 Timestamp</div>
              <div className="rm-field-val" style={{fontSize:"12px"}}>{new Date().toLocaleString()}</div>
            </div>
          </div>

          {/* Reasons */}
          {incident.reasons && incident.reasons.length > 0 && (
            <div className="rm-reasons">
              <div className="rm-reasons-label">Detection Reasons</div>
              <div className="rm-reasons-list">
                {incident.reasons.map((r, i) => (
                  <div key={i} className="rm-reason-item">{r}</div>
                ))}
              </div>
            </div>
          )}

          <div className="rm-actions">
            <button className="rm-btn print" onClick={() => window.print()}>Print Report</button>
            <button className="rm-btn close" onClick={onClose}>Close</button>
          </div>

        </div>
      </div>
    </>
  );
}