import { useEffect, useState } from "react";
import "../style/pages_css/login.css"; // Import the scoped CSS
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { Login_Api } from "../api_Data/basicAuth";
import { login } from "../authUtils/redux_store/authSlice"; // Adjust the import path if needed
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const dispatch = useDispatch(); // Initialize dispatch
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_type = useSelector((state) => state.auth.user_type);
  const navigate = useNavigate();

  // ====== Check if the user is authenticated and navigate ======
  useEffect(() => {
    if (isAuthenticated) {
      if (user_type === "1") {
        navigate("/adminHod-dashboard");
      } else if (user_type === "2") {
        navigate("/staff-dashboard");
      } else if (user_type === "3") {
        navigate("/student-dashboard");
      }
    }
  }, [isAuthenticated, navigate, user_type]);

  // ====== Login function ======
  const handlelogin = async () => {
    if (!email || !password) {
      alert("Please enter both username and password");
      return;
    }

    setLoading(true); // Show loader
    const response = await Login_Api(email, password);

    if (response?.success) {
      console.log("Login success");

      // Save to localStorage
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", response.user);
      localStorage.setItem("user_type", response.user_type);

      // Update Redux store state immediately
      dispatch(
        login({
          user: response.user,
          user_type: response.user_type,
        })
      );

      // Navigate immediately after dispatch
      if (response.user_type === "1") {
        navigate("/adminHod-dashboard");
      } else if (response.user_type === "2") {
        navigate("/staff-dashboard");
      } else if (response.user_type === "3") {
        navigate("/student-dashboard");
      }
    } else {
      alert("Login failed, please check your credentials.");
    }

    setLoading(false); // Hide loader
  };

  return (
    <>
      <div className="login-page">
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div className="login-container">
            <div className="login-box">
              <h1>Welcome Back</h1>
              <p>Please login to your account</p>

              <div className="input-group">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required
                />
              </div>

              <button className="login-btn" onClick={handlelogin}>
                Login
              </button>

              <div className="footer-text">
                Forget Password? <a href="/forget">Forget</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
