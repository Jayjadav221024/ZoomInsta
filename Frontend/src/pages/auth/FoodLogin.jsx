import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Foodlogin = () => {
  const navigate = useNavigate();
  const handlesubmit = async  (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
    const response = await axios.post("https://zoominsta-1.onrender.com/auth/loginfoodpartner", {
      Email: email,
      Password: password,
    },{
      withCredentials: true,
    });
    console.log(response.data);
    navigate("/Create-food");
  };



  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <div className="auth-meta">
            <span className="auth-badge">Food Partner</span>
          </div>
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-subtitle">
            Sign in to manage your menu, orders, and availability from one dashboard.
          </p>
        </header>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="partner@example.com" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>

          <div className="auth-actions">
            <button type="submit" className="submit-button">
              Login as Partner
            </button>
          </div>
        </form>

        <footer className="auth-footer">
          New partner? <Link to="/food/register"><strong>Register as food partner.</strong></Link>
          <br />
          Looking for a regular account? <Link to="/user/register"><strong>Register as normal user.</strong></Link>
        </footer>
      </section>
    </main>
  );
};

export default Foodlogin;
