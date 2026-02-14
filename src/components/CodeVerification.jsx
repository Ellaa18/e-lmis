import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/code.css";
import { supabase } from "../supabase";

export default function CodeVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // new state for delay
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true); // start loading / delay

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("code", fullCode)
      .single();

    if (!data || error) {
      setError("No user found with this code.");
      setLoading(false); // stop loading
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(data));

    // Delay navigation by 1 second
    setTimeout(() => {
      navigate("/profile");
      setLoading(false);
    }, 1000);
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
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              maxLength="1"
              onInput={(e) => handleChange(e.target.value, index)}
              autoComplete="one-time-code"
              disabled={loading} // disable inputs while waiting
            />
          ))}
        </div>
        {error && <p className="error-text">{error}</p>}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading} // disable button while waiting
        >
          {loading ? "Verifying (wait for a second)..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
