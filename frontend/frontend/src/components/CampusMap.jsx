export default function CampusMap({ heatmap }) {
  const locations = {
    "Main Gate": { x: "22%", y: "60%" },
    "Library": { x: "48%", y: "42%" },
    "Canteen": { x: "62%", y: "68%" },
    "Auditorium": { x: "78%", y: "36%" }
  };

  return (
    <div className="campus-map">
      <img src="/campus_map.jpg" className="map-img" />

      {Object.entries(locations).map(([loc, pos]) => {
        const info = heatmap[loc];
        const intensity = info ? Math.min(info.avg_confidence * 1.2, 1) : 0.2;

        return (
          <div
            key={loc}
            className="heat-zone"
            style={{
              left: pos.x,
              top: pos.y,
              background: `rgba(255,0,0,${intensity})`
            }}
          >
            <strong>{loc}</strong>
            {info && (
              <>
                <div>{info.count} incidents</div>
                <div>{info.top_type}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
