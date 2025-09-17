import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Navbar/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Posts from "../../components/Posts/Posts";
import ContactForm from "../../components/Contact/Contact";
import VideoSlide from "../../components/VideoSlide/VideoSlide";
import TheBrand from "../../components/TheBrand/TheBrand";
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <VideoSlide />
      {/* <Header /> */}
      <TheBrand />

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <div className="yeyeye">
        <Posts />
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
