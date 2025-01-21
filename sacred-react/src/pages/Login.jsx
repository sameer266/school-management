import React from 'react';
import '../style/pages_css/login.css'; // Import the scoped CSS

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome Back</h1>
          <p>Please login to your account</p>
          <div className="input-group">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>
          <button className="login-btn">Login</button>
          <div className="footer-text">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
