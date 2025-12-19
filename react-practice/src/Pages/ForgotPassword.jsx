import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      setPopupMsg(data.msg || "Failed to send OTP");
      setShowPopup(true);

      if (res.ok) {
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setPopupMsg("Unable to connect to server");
      setShowPopup(true);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-title">
          <span>FORGOT PASSWORD</span>
        </div>

        <input
          className="auth-input"
          type="email"
          placeholder="Enter registered email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="auth-button" type="submit">
          Send OTP
        </button>

        <p className="auth-footer">
          Back to <a href="/signin">Sign in</a>
        </p>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMsg}</p>
            <button
              className="popup-btn"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
