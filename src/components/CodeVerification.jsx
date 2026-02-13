import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/code.css";

export default function CodeVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for page navigation

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
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
      // Save matched user to localStorage to show on profile page
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
              id={`code-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
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
