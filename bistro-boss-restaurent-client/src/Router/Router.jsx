import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Layouts/Main/Home";

const router = createBrowserRouter([
  {
    element: <Main></Main>,
    path: "/",
    children: [
      {
        element: <Home></Home>,
        path: "/",
      },
    ],
  },
]);
export default router;
