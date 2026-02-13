import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/verify");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  const nextSlide = () => {
    if (!user.documents || user.documents.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % user.documents.length);
  };

  const prevSlide = () => {
    if (!user.documents || user.documents.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + user.documents.length) % user.documents.length);
  };

  return (
    <div className="profile-wrapper">

      {/* BIG SLIDER AT TOP */}
      {user.documents && user.documents.length > 0 && (
        <div className="top-slider">
          <button className="arrow left" onClick={prevSlide}>
            &#10094;
          </button>

          <img
            src={user.documents[currentSlide]}
            alt="document"
            className="top-slide-image"
          />

          <button className="arrow right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      )}

      {/* PROFILE CONTENT */}
      <div className="profile-content">

        {user.photo && (
          <img src={user.photo} alt="Profile" className="profile-avatar" />
        )}

        <h2 className="profile-name">{user.name}</h2>

        <div className={`big-status ${
          user.status === "Accepted"
            ? "accepted"
            : user.status === "Declined"
            ? "declined"
            : "pending"
        }`}>
          {user.status}
        </div>

        <div className="profile-details">
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <button className="exit-btn" onClick={() => navigate("/verify")}>
          Exit
        </button>
      </div>
    </div>
  );
}
