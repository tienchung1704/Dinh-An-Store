import React from "react";
import "./TheBrand.css";
import { assets } from "../../assets/assets";

const TheBrand = () => {
  const images = [
    assets.item1,
    assets.item2,
    assets.item3,
    assets.item4,
    assets.item5,
    assets.item6,
  ];

  return (
    <div className="thebrand">
      <h1>The brand</h1>
      <div id="wrapper">
        <div className="slider">
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              className="item"
              alt={`brand-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheBrand;
