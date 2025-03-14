import React from "react";
import "./Header.css";
import { assets } from "../../../assets/assets";
import { useState, useEffect } from "react";

const images = [assets.header_img, assets.header_img2];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="header">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide-image ${
              index === currentSlide ? "visible" : "hidden"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <div className="header-contents">
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div className="slide-controls">
        <button className="slide-btn" onClick={nextSlide}>
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button className="slide-btn" onClick={nextSlide}>
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>{" "}
    </div>
  );
};

export default Header;
