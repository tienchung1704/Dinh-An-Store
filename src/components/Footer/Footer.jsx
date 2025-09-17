import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p></p>
        </div>
        <div className="footer-content-center">
          <h2>Info</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-social-icons">
          <h2>Follow us</h2>
          <img src={assets.facebook_icon} />
          <img src={assets.twitter_icon} />
          <img src={assets.linkedin_icon} />
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>(+84) 346828046 Vie</li>
            <li>
              <img src={assets.gmail} alt="" />
              <a href="mailto:tien.chungloveu@gmail.com"> Email us</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">
       © Copyright 2021 Badminton World Federation. All rights reserved. The content of this website is the property of BWF or used under licence by BWF. No part may be copied, republished, stored, or otherwise republished or transmitted without the prior written permission of BWF. For further information, please refer to our
      </p>
    </div>
  );
};

export default Footer;
