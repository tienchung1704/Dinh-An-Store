import React from "react";
import "./VideoSlide.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
const VideoSlide = () => {
  return (
    <div className="videoSlide">
      <video autoPlay loop muted className="background-video">
        <source src={assets.videocat} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
      <div className="videoSlide-contents">
        <h2>Explore our store</h2>
        <p>Without spoiling your home decor</p>
        <button>
          {" "}
          <Link to="/product">Watch now</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default VideoSlide;
