import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const Fullname = e.target.FullName.value;
    const email = e.target.Email.value;
    const password = e.target.Password.value;
    console.log(Fullname, email, password);
    const response = await axios.post("https://zoominsta-1.onrender.com/auth/register", {
      FullName: Fullname,
      Email: email,
      Password: password,
    },{
      withCredentials: true,
    });
    console.log(response.data);
    navigate("/home");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <div className="auth-meta">
            <span className="auth-badge">User</span>
          </div>
          <h1 className="auth-title">Create your user account</h1>
          <p className="auth-subtitle">
            Start ordering from nearby restaurants with a clean and calm signup
            flow.
          </p>
        </header>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-field">
            <label htmlFor="FullName">Full name</label>
            <input
              id="FullName"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="Email">Email address</label>
            <input id="Email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-field">
            <label htmlFor="Password">Password</label>
            <input
              id="Password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="submit-button">
              Register as User
            </button>
          </div>
        </form>

        <footer className="auth-footer">
          Already have an account?{" "}
          <Link to="/">
            <strong>Login as user.</strong>
          </Link>
          <br />
          Want to partner?{" "}
          <Link to="/food/register">
            <strong>Register as food partner.</strong>
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default UserRegister;
