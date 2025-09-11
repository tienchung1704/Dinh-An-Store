import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Product.css";
import { assets } from "../../assets/assets";
import { menu_list } from "../../assets/assets";
import ProductItem from "../../components/ProductItem/ProductItem";

const ProductDisplay = ({ category,setCategory }) => {
  const { food_list } = useContext(StoreContext);
  const [minValue, setMinValue] = useState(99);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = food_list.filter(
    (item) =>
      item.price <= minValue &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="food-display" id="food-display">
      <div className="hearder">
        <div className="aText">
          <a href="/">Home</a>
          <p>/</p>
          <a href="/">Collection</a>
        </div>
        <div className="btExt">
          <p>Featured Items</p>
        </div>
        <div className="input-wrapper">
          <button className="icon">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M22 22L20 20"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            name="text"
            className="input"
            placeholder="search.."
          />
        </div>
      </div>

      <h3>Our Collection</h3>
      <hr />
      <div id="sidebarProduct">
        <div id="sideBar">
          <div className="keyfeatura-header">
            <div id="asasas23">
              <p
                className="descriptionP12"
                onClick={() => {
                  setSelectedCategory("All");
                }}
              >
                All
              </p>
              {menu_list.map((item) => {
                return (
                  <div>
                    <div key={item.menu_name} className="cateconta">
                      <p
                        id="catename"
                        className={`cateconta ${selectedCategory === item.menu_name ? "active" : ""}`}
                        onClick={() => {
                          const newCategory = item.menu_name;
                          setCategory((prev) => (prev === newCategory ? "All" : newCategory));
                          setSelectedCategory((prev) => (prev === newCategory ? "All" : newCategory));
                          setCurrentPage(1);
                        }}
                      >
                        {item.menu_name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="asasas">
              <p id="descriptionP">Price</p>

            </div>

            <div id="inputRang">
              <span>$ 0</span>
              <input
                value={minValue}
                onChange={(e) => {
                  setMinValue(Number(e.target.value));
                  setCurrentPage(1); 
                }}
                min={0}
                max={99}
                type="range"
              />
              <span>${minValue}</span>
            </div>
          </div>
        </div>

        <div className="food-display-list">
          {paginatedProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              name={item.name.length > 9 ? item.name.substring(0,9) + "..." : item.name}
              description={
                item.description.length > 20
                  ? item.description.substring(0, 20) + "..."
                  : item.description
              }
              price={item.price}
              isTrending={item.isTrending}
              image={item.image}
            />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
