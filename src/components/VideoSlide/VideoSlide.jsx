import React from "react";
import "./VideoSlide.css";
import { assets } from "../../assets/assets";
const VideoSlide = () =>{
    return (
        <div className="videoSlide">
          <video autoPlay loop muted className="background-video">
            <source src={assets.videocat} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          <div className="videoSlide-contents">
            <h2>Spoil Your Cat</h2>
            <p>Without spoiling your home decor</p>
            <button>Wathch now</button>
          </div>
        </div>
      );
}


export default VideoSlide;
