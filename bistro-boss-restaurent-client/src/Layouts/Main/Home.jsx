import React from "react";
import Banner from "../../Pages/Home/Banner";
import CategorySlider from "../../Pages/Home/CategorySlider";
import Notice from "../../Pages/Home/Notice";
import PopularMenu from "../../Pages/Home/PopularMenu";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CategorySlider></CategorySlider>
      <Notice></Notice>
      <PopularMenu></PopularMenu>
    </div>
  );
};

export default Home;
