import React from "react";
import { Helmet } from "react-helmet-async";
import CommonCover from "../components/CommonCover";
import img from "../assets/menu/banner3.jpg";
import dessert from "../assets/menu/dessert-bg.jpeg";
import pizza from "../assets/menu/pizza-bg.jpg";
import salad from "../assets/menu/salad-bg.jpg";
import soup from "../assets/menu/soup-bg.jpg";
import PopularMenu from "./Home/PopularMenu";
import useMenu from "../Hooks/useMenu";
import MenuItem from "../components/MenuItem";
import "./menu.css";
import SectionHeader from "../components/SectionHeader";
import Category from "../components/Category";

const OurMenu = () => {
  const [menuItems] = useMenu();
  const offeredItems = menuItems.filter((item) => item.category === "offered");
  const dessertItems = menuItems.filter((item) => item.category === "dessert");
  const pizzaItems = menuItems.filter((item) => item.category === "pizza");
  const saladItems = menuItems.filter((item) => item.category === "salad");
  const soupItems = menuItems.filter((item) => item.category === "soup");
  
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu </title>
      </Helmet>
      <CommonCover
        img={img}
        title="our menu"
        description="WOULD YOU LIKE TO TRY DIFFERENT A DISH?"
      ></CommonCover>

      {/* Offered Items */}
      <SectionHeader
        heading="Today Offer"
        subHeading={"Explore Today's Offer"}
      ></SectionHeader>
      <Category menu={offeredItems} title={"offered"}></Category>

      {/* Dessert Menu */}
      <CommonCover
        img={dessert}
        title="dessert"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex beatae repudiandae nobis accusamus facilis, ab tempore suscipit quis voluptatem aut!"
      ></CommonCover>

      <Category menu={dessertItems} title={"dessert"}></Category>

      {/* Pizza Menu */}
      <CommonCover
        img={pizza}
        title="pizza"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex beatae repudiandae nobis accusamus facilis, ab tempore suscipit quis voluptatem aut!"
      ></CommonCover>

      <Category menu={pizzaItems} title={"pizza"}></Category>

      {/* Salad Menu */}
      <CommonCover
        img={salad}
        title="salad"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex beatae repudiandae nobis accusamus facilis, ab tempore suscipit quis voluptatem aut!"
      ></CommonCover>

      <Category menu={saladItems} title={"salad"}></Category>

      {/* Soup Menu */}
      <CommonCover
        img={soup}
        title="soup"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex beatae repudiandae nobis accusamus facilis, ab tempore suscipit quis voluptatem aut!"
      ></CommonCover>

      <Category menu={soupItems} title={"soup"}></Category>
    </div>
  );
};

export default OurMenu;
