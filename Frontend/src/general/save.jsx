import React, { useEffect, useState } from "react";
import "../general/home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegCommentDots,
  FaBookmark,
  FaHome,
} from "react-icons/fa";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://zoominsta-1.onrender.com/food/save", {
        withCredentials: true,
      })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          Name: item.food.Name,
          Video: item.food.Video,
          description: item.food.description,
          likecount: item.food.likecount || 0,
          savesCount: item.food.savesCount || 0,
          comments: item.food.comments || [],
          foodpartner: item.food.foodpartner,
        }));

        setVideos(savedFoods);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  }, []);

  async function removeSaved(item) {
    try {
      const response = await axios.post(
        "https://zoominsta-1.onrender.com/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.save === false) {
        setVideos((prev) => prev.filter((v) => v._id !== item._id));
      }
    } catch (error) {
      console.log("SAVE ERROR:", error.response?.data || error.message);
    }
  }

  return (
    <div className="reel-page">
      <div className="reel-container">
        {videos.length === 0 && (
          <div className="empty-state">No saved videos yet.</div>
        )}

        {videos.map((item) => {
          const partnerId = item.foodpartner?._id || item.foodpartner;

          return (
            <section className="reel-item" key={item._id}>
              <video
                className="reel-video"
                src={item.Video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />

              <div className="reel-actions">
                <div className="action-btn-wrap">
                  <button className="action-btn">
                    <FaHeart />
                  </button>
                  <span>{item.likecount || 0}</span>
                </div>

                <div className="action-btn-wrap">
                  <button className="action-btn">
                    <FaRegCommentDots />
                  </button>
                  <span>{item.comments?.length || 0}</span>
                </div>

                <div className="action-btn-wrap">
                  <button
                    className="action-btn saved-active"
                    onClick={() => removeSaved(item)}
                  >
                    <FaBookmark />
                  </button>
                  <span>{item.savesCount || 0}</span>
                </div>
              </div>

              <div className="reel-overlay">
                <div>
                  <h2 className="reel-title">{item.Name}</h2>
                  <p className="reel-description">{item.description}</p>
                </div>

                <button
                  className="reel-button"
                  onClick={() => {
                    if (!partnerId) return;
                    navigate(`/foodpartner/${partnerId}`);
                  }}
                >
                  Visit Store
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/home")}>
          <FaHome />
          <span>Home</span>
        </button>

        <button className="nav-btn active" onClick={() => navigate("/saved")}>
          <FaBookmark />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );
};

export default Saved;