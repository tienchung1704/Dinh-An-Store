import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const trendingFood = food_list.filter(item => item.isTrending === 1);
  return (
    <div className="food-display" id="food-display">
      <h2>Our Trending :3</h2>
      <div className="food-display-list">
        {trendingFood.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                isTrending={item.isTrending}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
