import React from "react";
import Banner from "../../Pages/Home/Banner";
import CategorySlider from "../../Pages/Home/CategorySlider";
import Notice from "../../Pages/Home/Notice";
import PopularMenu from "../../Pages/Home/PopularMenu";
import FeaturedItems from "../../Pages/Home/FeaturedItems";
import Reviews from "../../Pages/Home/Reviews";
import Profile from "../../Pages/Home/Profile";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
                  <Helmet>
                      <title>Bistro Boss | Home</title>
                  </Helmet>
      <Banner></Banner>
      <CategorySlider></CategorySlider>
      <Notice></Notice>
      <PopularMenu></PopularMenu>
      <FeaturedItems></FeaturedItems>
      <Reviews></Reviews>
      <Profile></Profile>
    </div>
  );
};

export default Home;
