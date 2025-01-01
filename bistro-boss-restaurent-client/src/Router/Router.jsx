import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Layouts/Main/Home";
import OurMenu from "../Pages/OurMenu";
import Order from "../Pages/Order";

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
      }
    ],
  },
]);
export default router;
