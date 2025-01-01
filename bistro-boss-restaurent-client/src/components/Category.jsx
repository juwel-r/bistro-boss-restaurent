import React from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";

const Category = ({menu, title}) => {
  return (
<>
<div className="grid sm:grid-cols-2 gap-6 m-8 w-10/12 mx-auto">
      {menu && menu.map((menu) => (
          <MenuItem key={menu._id} menu={menu}></MenuItem>
        ))}
    </div>
    <div className="flex justify-center">
        <Link to={`/order/${title}`}><button className="order-btn">ORDER YOUR FAVOURITE FOOD</button></Link>
      </div>
</>
  );
};

export default Category;
