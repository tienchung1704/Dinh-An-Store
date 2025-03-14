import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Product.css";
import { assets } from "../../assets/assets";
import { menu_list } from "../../assets/assets";
import ProductItem from "../../components/ProductItem/ProductItem";

const ProductDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [isKeyFeature, setIsKeyFeature] = useState(false);
  const [minValue, setMinValue] = useState(999);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = food_list.filter(
    (item) =>
      item.price <= minValue &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );
  return (
    <div className="food-display" id="food-display">
      <div className="aText">
        <a href="/">Home</a>
        <p>/</p>
        <a href="/">Collection</a>
      </div>

      <h3>Our Collection</h3>
      <hr />
      <div id="sidebarProduct">
        <div id="sideBar">
          <div className="keyfeatura-header">
            <div id="asasas23">
              <p className="descriptionP12">Category</p>
              {menu_list.map((item, index) => {
                return (
                  <div key={item.menu_name} className="cateconta">
                    <p
                      id="catename"
                      className={
                        selectedCategory === item.menu_name ? "active" : ""
                      }
                      onClick={() => setSelectedCategory(item.menu_name)}
                      key={index}
                    >
                      {item.menu_name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div id="asasas">
              <p id="descriptionP">Price</p>
              <img
                src={assets.arrow_down}
                className={`arrow ${isKeyFeature ? "open" : ""}`}
                alt=""
              />
            </div>

            {
              <div id="inputRang">
                <span htmlFor="priceRange">$ 0</span>
                <input
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  min={0}
                  max={999}
                  name="priceRange"
                  id="priceRange"
                  type="range"
                />
                <span htmlFor="priceRange">${minValue}</span>
              </div>
            }
          </div>
        </div>
        <div className="food-display-list">
          {filteredProducts.map((item, index) => {
            return (
              <ProductItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                isTrending={item.isTrending}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
