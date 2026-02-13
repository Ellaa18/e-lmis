import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/code.css";

export default function CodeVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus next input on mobile and desktop
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find((user) => user.code === fullCode);

    if (matchedUser) {
      setError("");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      navigate("/profile"); // redirect to Profile Page
    } else {
      setError("No user found with this code.");
    }
  };

  return (
    <div className="verify-wrapper">
      <h2 className="verify-page-title">Enter Your 6-Digit Code</h2>
      <div className="verify-card">
        <div className="verify-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"        // show number keyboard on mobile
              pattern="[0-9]*"
              value={digit}
              maxLength="1"
              onInput={(e) => handleChange(e.target.value, index)} // use onInput for mobile
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
