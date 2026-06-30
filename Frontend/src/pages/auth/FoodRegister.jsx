import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodRegister = () => {
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const businessname = e.target.businessname.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const password = e.target.password.value;
    console.log(businessname, email, password);
  
    const response = await axios.post("http://localhost:3000/auth/Registerfoodpartner", {
      // Name: businessname,
      Email: email,
      Contactname: businessname,
      phone: phone,
      address: address,
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
          <h1 className="auth-title">Partner onboarding</h1>
          <p className="auth-subtitle">
            Register your food partner profile and start receiving new orders quickly.
          </p>
        </header>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-field">
            <label htmlFor="businessname">Business name</label>
            <input id="businessname" type="text" placeholder="Enter your business name" />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" type="tel" placeholder="+1 555 123 4567" />
          </div>

          <div className="form-field">
            <label htmlFor="address">Address</label>
            <input id="address" type="text" placeholder="123 Market St, City" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="partner@example.com" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Create a password" />
          </div>

          <div className="auth-actions">
            <button type="submit" className="submit-button">
              Register as Partner
            </button>
          </div>
        </form>

        <footer className="auth-footer">
          Already a partner? <Link to="/food/login"><strong>Login to manage orders.</strong></Link>
          <br />
          Need a user account? <Link to="/user/register"><strong>Register as normal user.</strong></Link>
        </footer>
      </section>
    </main>
  );
};
export default FoodRegister;
