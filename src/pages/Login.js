import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1>Netflix</h1>

        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={handleLogin}>Sign In</button>

        <button
          className="guest-btn"
          onClick={() => navigate("/home", { replace: true })}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}