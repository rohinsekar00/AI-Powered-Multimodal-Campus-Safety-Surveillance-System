import { useEffect, useRef } from "react";
import alertSound from "../assets/alarm.mp3.wav";

const alertStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ao-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .ao-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 4px solid #ff2d55;
    animation: flashBorder 1s infinite;
    pointer-events: none;
  }

  @keyframes flashBorder {
    0%,100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  .ao-box {
    width: 520px;
    max-width: 92vw;
    background: #0a1225;
    border: 1px solid rgba(255,45,85,0.45);
    border-radius: 10px;
    overflow: hidden;
    box-shadow:
      0 0 60px rgba(255,45,85,0.35),
      0 0 120px rgba(255,45,85,0.15);
    animation: popIn 0.25s ease;
    font-family: 'DM Sans', sans-serif;
  }

  @keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .ao-header {
    background: linear-gradient(90deg, #ff2d55, #ff4d6d);
    padding: 18px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ao-icon {
    font-size: 28px;
    animation: shake 0.5s infinite;
  }

  @keyframes shake {
    0%,100% { transform: rotate(0deg); }
    25% { transform: rotate(-8deg); }
    75% { transform: rotate(8deg); }
  }

  .ao-title {
    font-family: 'Orbitron', monospace;
    font-size: 18px;
    font-weight: 900;
    color: white;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .ao-subtitle {
    font-size: 12px;
    color: rgba(255,255,255,0.8);
    margin-top: 3px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .ao-body {
    padding: 22px;
  }

  .ao-row {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .ao-row:last-child {
    border-bottom: none;
  }

  .ao-label {
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .ao-value {
    font-size: 14px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .ao-danger {
    color: #ff2d55;
  }

  .ao-actions {
    padding: 0 22px 22px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .ao-btn {
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.2s ease;
  }

  .ao-btn.view {
    background: linear-gradient(90deg, #00d4ff, #0072ff);
    color: black;
  }

  .ao-btn.view:hover {
    box-shadow: 0 0 20px rgba(0,212,255,0.35);
  }

  .ao-btn.dismiss {
    background: transparent;
    border: 1px solid rgba(255,45,85,0.35);
    color: #ff2d55;
  }

  .ao-btn.dismiss:hover {
    background: rgba(255,45,85,0.08);
  }
`;

export default function AlertOverlay({ incident, onClose, onView }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(alertSound);
    audioRef.current.loop = true;
    audioRef.current.volume = 1.0;

    audioRef.current.play().catch((err) => {
      console.log("Autoplay blocked by browser:", err);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleDismiss = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  };

  return (
    <>
      <style>{alertStyles}</style>

      <div className="ao-overlay">
        <div className="ao-box">
          <div className="ao-header">
            <div className="ao-icon">🚨</div>
            <div>
              <div className="ao-title">Violence Detected</div>
              <div className="ao-subtitle">Immediate Action Required</div>
            </div>
          </div>

          <div className="ao-body">
            <div className="ao-row">
              <span className="ao-label">Location</span>
              <span className="ao-value">{incident.location}</span>
            </div>

            <div className="ao-row">
              <span className="ao-label">Incident Type</span>
              <span className="ao-value ao-danger">
                {incident.violence_type}
              </span>
            </div>

            <div className="ao-row">
              <span className="ao-label">Confidence</span>
              <span className="ao-value">
                {typeof incident.confidence === "number"
                  ? `${(incident.confidence * 100).toFixed(1)}%`
                  : incident.confidence}
              </span>
            </div>

            <div className="ao-row">
              <span className="ao-label">Detected At</span>
              <span className="ao-value">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="ao-actions">
            <button className="ao-btn view" onClick={onView}>
              View Full Report
            </button>

            <button className="ao-btn dismiss" onClick={handleDismiss}>
              Dismiss Alert
            </button>
          </div>
        </div>
      </div>
    </>
  );
}