import "../styles/map.css";

export default function MapSection() {
  return (
    <section className="map-section">
      {/* Title above the map */}
      <h2 className="section-title">Basic Employment Statistics</h2>

      {/* Map image inside container */}
      <div className="map-container">
        <img src="/map.jpg" alt="Employment Map" />
      </div>
    </section>
  );
}
