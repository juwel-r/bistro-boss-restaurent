import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import MenuItem from "../../components/MenuItem";
import useMenu from "../../Hooks/useMenu";

const PopularMenu = () => {
  const [menuItems] = useMenu();
  const popularItems = menuItems.filter((item) => item.category === "popular");

  return (
    <div>
      <SectionHeader
        heading={"Popular Menu"}
        subHeading={"Check It Out"}
      ></SectionHeader>
      <div className="grid sm:grid-cols-2 gap-6">
        {popularItems &&
          popularItems.map((menu) => (
            <MenuItem key={menu._id} menu={menu}></MenuItem>
          ))}
      </div>
    </div>
  );
};

export default PopularMenu;
