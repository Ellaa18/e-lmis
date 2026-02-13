import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Navigate only if password is exactly 1234
  useEffect(() => {
    if (password === "1234") {
      navigate("/admin");
    }
  }, [password, navigate]);

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Left side */}
        <div className="footer-left">
          <img src="/logo.jpg" alt="Logo" className="footer-logo" />
          <p className="footer-description">
            The Ministry of Labour and Skills was established following the National Reform.
            The Ministry of Labour and Skills was founded with Proclamation No. 1263/2022,
            which oversees national job creation, skills development, and labor concerns.
          </p>
        </div>

        {/* Right side */}
        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p>Tel no: +251 116 671792</p>
          <p>Po Box: 25534</p>
          <p>Fax: +251 116 671568</p>
          <p>Address: Behind Lambert Ethiopian Technical and Vocational Institute</p>
          <p>Email: info@Mols.gov.et</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-menu">
          <a href="#">Menu</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Copyright</a>
        </div>

        <div className="footer-social">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>

        {/* Admin password input */}
        <input
          ref={inputRef}
          type="password"
          maxLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-password-input"
         
        />

        <div className="footer-copy">© 2025 All rights reserved.</div>
      </div>
    </footer>
  );
}
