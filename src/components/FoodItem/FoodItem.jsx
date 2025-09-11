import React, { useContext, useState, useEffect } from "react";
import "./FoodItem.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import ProducPopUp from "../ProductDetail/ProductDetail";

const FoodItem = ({ id, name, image, description, price , isTrending}) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const getItemDetail = async (itemId) => {
    try {
      const response = await axios.get(`${url}/api/food/${itemId}`);
      setProductDetail(response.data.data);
      setShowPopup(true);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
    }
  };
  const handleSearchClick = async () => {
    await getItemDetail(id);
  };

  return (
    <div>
      {showPopup && productDetail && (
        <ProducPopUp
          setShowPopup={setShowPopup}
          id={productDetail.id}
          name={productDetail.name}
          image={productDetail.image}
          quantity={productDetail.quantity}
          description={productDetail.description}
          price={productDetail.price}
          category={productDetail.category}
        />
      )}
      <div className="food-item">
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={url + "/images/" + image}
            alt={name}
          />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              title="Add to Cart"
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p data-name={name}>{name}</p>
            <div id="imgsearchandheart">
              <img
                id="imgHeart"
                src={assets.search_icon}
                onClick={handleSearchClick}
                alt=""
              />
              <img
                id="imgHeart"
                onClick={toggleFavorite}
                src={isFavorite ? assets.red_heart : assets.heart}
                style={{ cursor: "pointer" }}
                alt="favorite"
              />
            </div>
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">$ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
