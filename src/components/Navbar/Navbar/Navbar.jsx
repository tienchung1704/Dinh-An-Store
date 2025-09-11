import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const { getTotalCartAmount, token, setToken, user, setUser } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      setToken("");
      navigate("/");
    }, 0);
  };
  return (
    <div className="navbar">
      <Link to="/">
        <h2 id="navbarText1">Cattie Store</h2>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/product"
          onClick={() => setMenu("product")}
          className={menu === "product" ? "active" : ""}
        >
          Product
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#posts"
          onClick={() => setMenu("posts")}
          className={menu === "posts" ? "active" : ""}
        >
          Posts
        </a>
        <a
          href="#contact"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </a>
      </ul>
      <div className="navbar-right">
        {!token ? (
          <>
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          </>
        ) : (
          <>
            <div className="navbar-search-icon">
              <div className="userName">
                <p>
                  {user !== "" ? (
                    <div className="userNamerR">
                      <p id="userNamerRP">Welcome</p>
                      <Link to="/account"> , {user}</Link>
                    </div>
                  ) : (
                    ":( time out, please login again"
                  )}
                </p>
                <Link to="/cart">
                  <img src={assets.basket_icon} />
                </Link>
              </div>
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={() => navigate("/account")}>
                  <img src={assets.padlock} />
                  <p>Account Setting</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
