import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import ChangePassword from "./pages/Password/Password";
import MyOrder123 from "./pages/MyOrder123/MyOrder123";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDisplay from "./pages/Product/Product";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrder123 />} />
          <Route path="/account" element={<ChangePassword />} />
          <Route path="/product" element={<ProductDisplay />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
