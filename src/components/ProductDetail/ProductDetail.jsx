import React from "react";
import "./ProductDetail.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useState } from "react";
import { assets } from "../../assets/assets";

const ProducPopUp = ({
  setShowPopup,
  id,
  name,
  description,
  image,
  quantity,
  category,
  price,
}) => {
    const [count, setCount] = useState(1);

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isKeyFeature, setIsKeyFeature] = useState(false);

    const toggleKeyFeature = () => setIsKeyFeature(!isKeyFeature);
    const toggleDescription = () => setIsDescriptionOpen(!isDescriptionOpen);
    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count > 1 ? count - 1 : 1); // Không cho giá trị âm

  const { url , addToCart } = useContext(StoreContext);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {}
        <img
          id="btn-close"
          src={assets.close}
          onClick={() => setShowPopup(false)}
          alt=""
        />
        {}
        <div className="img-containeR">
          <img
            src={url + "/images/" + image}
            alt={name}
            className="product-image"
          />
        </div>
        <div className="context-containeR">
          <h2>{name}</h2>
          <img id="ratingStar" src={assets.rating_starts} alt="" />
          <div className="priceCheck">
            <p>Price:</p>
            <p>$ {price}</p>
          </div>
          <div className="quantitychecK">
            <p>Quantity:</p>
            <button className="countBtn" onClick={decrease}>-</button>
            <span>{count}</span>
            <button className="countBtn" onClick={increase}>+</button>
          </div>

          <div className="inputCheck">
            <input className="inputCheckreal" type="radio" defaultChecked />
            <p>In stock , ready to ship</p>
          </div>
          <button id="btnAddtoCart" onClick={()=> addToCart(id)}>Add To Cart</button>
          <div className="categoryField">
            <p>Category: </p>
            <p>{category}</p>
          </div>
          <hr />
          <div className="description-container">
            <div className="description-header" onClick={toggleDescription}>
              <p id="descriptionP" >Description</p>
              <img src={assets.arrow_down} className={`arrow ${isDescriptionOpen ? "open" : ""}`} alt="" />
            </div>
            {isDescriptionOpen && <p className="description-text">{description}</p>}
          </div>
          <hr />
          <div className="keyfeatura-container">
            <div className="keyfeatura-header" onClick={toggleKeyFeature}>
              <p id="descriptionP" >Key Features</p>
              <img src={assets.arrow_down} className={`arrow ${isKeyFeature ? "open" : ""}`} alt="" />
            </div>
            {isKeyFeature && <p className="keyfeatura-text">THIS PRODUCT SHIPS FREE TO CONTINENTAL USA. A SAVINGS OF OVER $75!

Please Note: There is no restocking fee for this item. However, customers interested in a return for a refund must pay for the return shipping costs. </p>}
          </div>
          <div className="imgShaer">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducPopUp;
