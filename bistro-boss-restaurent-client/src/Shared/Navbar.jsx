import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userInfo, logOut } = useContext(AuthContext);
  const menuList = (
    <>
      <NavLink className="pr-2" to="/">
        Home
      </NavLink>
      <NavLink className="pr-2" to="/menu">
        Our Menu
      </NavLink>
      <NavLink className="pr-2" to="/order/salad">
        Our Shop
      </NavLink>
      <NavLink className="pr-2" to="/login">
        Login
      </NavLink>
      <NavLink className="pr-2" to="/all-dish">
        All Dish
      </NavLink>
      <NavLink className="pr-2" to="/private">
       Private
      </NavLink>
    </>
  );
  const handleLogOut = () => {
    Swal.fire({
      title: "Log Out!",
      text: "Are you sure to Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "You have logged out!.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="navbar backdrop-blur-sm fixed z-50 bg-white/30 max-w-screen-xl text-black ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="text-lg menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menuList}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{menuList}</ul>
      </div>
      <div className="navbar-end">
        {userInfo ? (
<div className="flex  items-center gap-2">
  <p className="border rounded-md px-2 py-1">{userInfo.displayName}</p>
<button onClick={handleLogOut} className="btn btn-outline btn-sm">
            Logout
          </button>
</div>
        ) : (
          <Link to="/login">
            <button className="btn text-lg btn-outline btn-sm">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
