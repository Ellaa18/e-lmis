import "../styles/video.css";

export default function VideoSection() {
  return (
    <section className="video-section">
      {/* Title above the container */}
      <h2 className="section-title">How to Register on E-LMIS</h2>

      {/* Video inside container */}
      <div className="video-container">
        <video controls>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Register button below video */}
      <div className="register-btn-container">
        <a href="/register" className="register-btn">
          Register
        </a>
      </div>
    </section>
  );
}
