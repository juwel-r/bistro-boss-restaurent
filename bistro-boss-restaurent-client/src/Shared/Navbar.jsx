import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../Hooks/useCart";
import useIsAdmin from "../Hooks/useIsAdmin";

const Navbar = () => {
  const { userInfo, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useIsAdmin();
  const menuList = (
    <>
      <NavLink className="px-2" to="/">
        Home
      </NavLink>
      <NavLink className="px-2" to="/menu">
        Our Menu
      </NavLink>
      <NavLink className="px-2" to="/order/salad">
        Our Shop
      </NavLink>
      {userInfo && isAdmin && (
        <Link className="px-2" to="/dashboard/admin-home">
          Dashboard
        </Link>
      )}
      {userInfo && !isAdmin && (
        <Link className="px-2" to="/dashboard/user-home">
          Dashboard
        </Link>
      )}
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
            title: "Logged Out!",
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-[1] mt-3 w-52 p-2 shadow"
          >
            {menuList}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">{menuList}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/dashboard/cart" className="text-white">
          <p className=" md:p-3 border-2 bg-pink-600 rounded-full relative mr-4 text-lg">
            <FiShoppingCart />
            <span className="text-pink-600 text-sm font-bold text-center absolute -top-2 -right-1 bg-white rounded-full h-6 w-6  flex justify-center items-center border border-pink-600">
              {cart.length}
            </span>
          </p>
        </Link>
        {userInfo ? (
          <div className="flex  items-center gap-2">
            {/* <p className="border rounded-md px-2 py-1">
              {userInfo.displayName}
            </p> */}
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
