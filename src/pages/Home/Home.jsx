import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Navbar/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Posts from "../../components/Posts/Posts";
import ContactForm from "../../components/Contact/Contact"
import VideoSlide from "../../components/VideoSlide/VideoSlide";
import FacebookBtn from "../../components/FacebookBtn/FacebookBtn";
const Home = () => {
  const [category, setCategory] = useState("All");



  return (
    <div>
      <Header />
      <FacebookBtn />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <VideoSlide />
      <div className="yeyeye">
      <Posts/>
      <ContactForm />
      </div>


    </div>
  );
};

export default Home;
