import { useEffect, useState } from "react";

function Dashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/incidents")
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚨 AI Campus Safety Dashboard</h1>

      {incidents.length === 0 && <p>No incidents found</p>}

      {incidents.map((incident) => (
        <div
          key={incident.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            background: incident.violence_type !== "normal" ? "#ffe6e6" : "#e6ffe6"
          }}
        >
          <h3>📹 Video: {incident.video_name}</h3>
          <p><b>Violence Type:</b> {incident.violence_type}</p>
          <p><b>Confidence:</b> {incident.confidence}</p>
          <p><b>Motion Score:</b> {incident.motion_score}</p>
          <p><b>Pose Score:</b> {incident.pose_score}</p>
          <p><b>People Detected:</b> {incident.person_count}</p>
          <p><b>Time:</b> {new Date(incident.created_at).toLocaleString()}</p>

          {incident.evidence_clip && (
            <img
              src={`http://127.0.0.1:8000/${incident.evidence_clip}`}
              alt="Evidence"
              width="300"
              style={{ marginTop: "10px", borderRadius: "6px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
