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
import Cart from "../Pages/Dashboard/User/Cart";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItem from "../Pages/Dashboard/Admin/AddItem";
import ManageItems from "../Pages/Dashboard/Admin/ManageItems";
import EditItem from "../Pages/Dashboard/Admin/EditItem";
import Payment from "../Pages/Dashboard/User/Payment";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory";
import UserHome from "../Pages/Dashboard/User/UserHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
  {
    element: <Main></Main>,
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
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
        element: (
          <PrivateRoute>
            <Private></Private>
          </PrivateRoute>
        ),
        path: "/private",
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      // <AdminRoute>
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "add-items",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "manage-items",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "edit-item/:id",
        element: (
          <AdminRoute>
            <EditItem></EditItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bistro-boss-restaurent-server-six.vercel.app/menu/${params.id}`
          ),
      },
    ],
  },
]);
export default router;
