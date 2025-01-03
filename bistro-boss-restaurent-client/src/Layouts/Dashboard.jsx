import React from "react";
import {
  FaCartArrowDown,
  FaHome,
  FaList,
  FaShopify,
  FaStar,
  FaWallet,
} from "react-icons/fa";
import { FaCalendar, FaListUl } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMailOpenSharp, IoMailSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-72 bg-yellow-600 min-h-screen px-8 pt-8">    
        <h1 className="text-2xl font-bold">BISTRO BOSS</h1>
        <p className="mb-8">RESTAURENT</p>
<div className="space-y-2">
        <NavLink to="/" className="flex items-center gap-2"><FaHome></FaHome> User Home</NavLink>
        <NavLink to="/dashboard/reservation" className="flex items-center gap-2"><FaCalendar></FaCalendar> Reservation</NavLink>
        <NavLink to="/dashboard/payment" className="flex items-center gap-2"><FaWallet></FaWallet> Payment</NavLink>
        <NavLink to="/dashboard/cart" className="flex items-center gap-2"><FaCartArrowDown></FaCartArrowDown> My Cart</NavLink>
        <NavLink to="/dashboard/review" className="flex items-center gap-2"><FaStar></FaStar> Add Review</NavLink>
        <NavLink to="/dashboard/booking" className="flex items-center gap-2"><FaList></FaList> My Booking</NavLink>
</div>
<div className="divider"></div>
<div className="space-y-2">
        <NavLink to="/" className="flex items-center gap-2"><MdHome></MdHome> User Home</NavLink>
        <NavLink to="/menu" className="flex items-center gap-2"><GiHamburgerMenu /> Menu</NavLink>
        <NavLink to="/order/salad" className="flex items-center gap-2"><FaShopify />Shop</NavLink>
        <NavLink to="/contact" className="flex items-center gap-2"><IoMailOpenSharp /> Contact</NavLink>
</div>
      </div>
      <div className="w-full flex-1   bg-gray-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
