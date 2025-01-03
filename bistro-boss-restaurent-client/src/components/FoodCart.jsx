import React from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const FoodCart = ({ item }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, name, recipe, price, image } = item;
  const axiosSecure = useAxiosSecure();
  const cartItem = {
    menuId : _id,
    customer : userInfo?.email
  }

  const handleAddToCart = (product) => {
    if (userInfo?.email) {
      axiosSecure.post('/carts', cartItem).then(res=>{
        console.log(res.data)
      })
      // TODO: if  user logged in then allow to add cart
    } else {
      Swal.fire({
        title: "Please Login?",
        text: "You need to login to Add to Cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
    console.log(product);
  };
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt="Caesar Salad"
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-black text-white text-sm font-semibold py-1 px-2 rounded">
          {price}
        </span>
      </div>
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-2">{recipe}</p>
        <button
          onClick={() => handleAddToCart(item)}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded shadow"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
export default FoodCart;
