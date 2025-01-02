import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import Footer from "../../Shared/Footer";

const Main = () => {
  const location= useLocation()
  const noFooterHeader = location.pathname.includes("login") ||location.pathname.includes("register")
  return (
    <div>
      {noFooterHeader || <Navbar></Navbar>}
      <div className="pt-16 min-h-[calc(100vh-252px)]">
        <Outlet></Outlet>
      </div>
     {noFooterHeader || <Footer></Footer>}
    </div>
  );
};

export default Main;
