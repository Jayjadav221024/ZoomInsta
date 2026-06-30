import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isFoodPartner, setIsFoodPartner] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/foodpartner/me", {
        withCredentials: true,
      })
      .then(() => {
        setIsFoodPartner(true);
      })
      .catch(() => {
        setIsFoodPartner(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/foodpartner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodItems || []);
      })
      .catch((error) => {
        console.error("Error fetching food partner profile:", error);
      });
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <section className="profile-card">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <div className="profile-info">
            <div className="profile-pill">{profile.Name}</div>
            <div className="profile-pill">{profile.address}</div>
            <div className="profile-pill">{profile.phone}</div>
          </div>

          {isFoodPartner && (
            <button
              className="add-food-btn"
              onClick={() => navigate("/Create-food")}
            >
              +
            </button>
          )}
        </div>

        <div className="profile-stats">
          <div className="stat-block">
            <span className="stat-label">Total meals</span>
            <strong className="stat-value">{videos.length}</strong>
          </div>

          <div className="stat-block">
            <span className="stat-label">Customer serve</span>
            <strong className="stat-value">15K</strong>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        {videos.map((v) => (
          <div key={v._id} className="video-card">
            <video
              src={v.Video}
              muted
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Profile;