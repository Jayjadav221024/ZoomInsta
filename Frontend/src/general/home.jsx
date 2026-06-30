import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegCommentDots,
  FaBookmark,
  FaHome,
} from "react-icons/fa";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://zoominsta-1.onrender.com/food", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setVideos(response.data.food || []);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  }, []);

  async function handlelike(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.like) {
        console.log("Video liked");

        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, likecount: (v.likecount || 0) + 1 }
              : v
          )
        );
      } else {
        console.log("Video unliked");

        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? {
                  ...v,
                  likecount: Math.max((v.likecount || 0) - 1, 0),
                }
              : v
          )
        );
      }
    } catch (error) {
      console.log("LIKE ERROR:", error.response?.data || error.message);
    }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.save) {
        console.log("Video saved");

        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: (v.savesCount || 0) + 1 }
              : v
          )
        );
      } else {
        console.log("Video unsaved");

        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? {
                  ...v,
                  savesCount: Math.max((v.savesCount || 0) - 1, 0),
                }
              : v
          )
        );
      }
    } catch (error) {
      console.log("SAVE ERROR:", error.response?.data || error.message);
    }
  }

  return (
    <div className="reel-page">
      <div className="reel-container">
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
                  <button
                    className="action-btn"
                    onClick={() => handlelike(item)}
                  >
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
                    className="action-btn"
                    onClick={() => saveVideo(item)}
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
                    if (!partnerId) {
                      console.log("Partner ID missing:", item);
                      return;
                    }

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
        <button className="nav-btn active" onClick={() => navigate("/home")}>
          <FaHome />
          <span>Home</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/save")}>
          <FaBookmark />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );
};

export default Home;