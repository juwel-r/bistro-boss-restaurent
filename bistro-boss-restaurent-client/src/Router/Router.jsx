import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Layouts/Main/Home";
import OurMenu from "../Pages/OurMenu";
import Order from "../Pages/Order";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Private from "../Pages/Private/Private";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../Pages/Dashboard/Cart";

const router = createBrowserRouter([
  {
    element: <Main></Main>,
    path: "/",
    children: [
      {
        element: <Home></Home>,
        path: "/",
      },
      {
        element: <OurMenu></OurMenu>,
        path: "/menu",
      },
      {
        element: <Order></Order>,
        path: "/order/:category",
      },
      {
        element: <Login></Login>,
        path: "/login",
      },
      {
        element: <Register></Register>,
        path: "/register",
      },
      {
        element: <PrivateRoute><Private></Private></PrivateRoute>,
        path: "/private",
      },
    ],
  },
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      {
        path: "/dashboard/cart",
        element:<Cart></Cart>
      }
    ]
  }
]);
export default router;
