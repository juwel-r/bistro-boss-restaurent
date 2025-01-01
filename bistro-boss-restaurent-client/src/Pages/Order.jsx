import { useState } from "react";
import bgImg from "../assets/shop/banner2.jpg";
import CommonCover from "../components/CommonCover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FoodCart from "../components/FoodCart";
import useMenu from "../Hooks/useMenu";
import { useParams } from "react-router-dom";

const Order = () => {
  const [menuItems] = useMenu();
  const dessertItems = menuItems.filter((item) => item.category === "dessert");
  const pizzaItems = menuItems.filter((item) => item.category === "pizza");
  const saladItems = menuItems.filter((item) => item.category === "salad");
  const soupItems = menuItems.filter((item) => item.category === "soup");
  const drinksItems = menuItems.filter((item) => item.category === "drinks");
  const categoryItems = [
    saladItems,
    pizzaItems,
    soupItems,
    dessertItems,
    drinksItems,
  ];

  const items = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialIndex = items.indexOf(category);
  console.log(initialIndex);

  const [tabIndex, setTabIndex] = useState(initialIndex);
  return (
    <div>
      <CommonCover
        img={bgImg}
        title="our shop"
        description={"Would you like to try a dish?"}
      ></CommonCover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex justify-center border-none mt-8">
          <Tab>SALAD</Tab>
          <Tab>PIZZA</Tab>
          <Tab>SOUP</Tab>
          <Tab>DESSERT</Tab>
          <Tab>DRINKS</Tab>
        </TabList>

        {categoryItems.map((category, index) => (
          <TabPanel key={index}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.map((item) => (
                <FoodCart key={item._id} item={item}></FoodCart>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default Order;
