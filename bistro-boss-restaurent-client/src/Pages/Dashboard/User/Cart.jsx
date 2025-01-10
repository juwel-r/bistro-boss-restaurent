import React from "react";
import useCart from "../../../Hooks/useCart";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionHeader from "../../../components/SectionHeader";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosPublic = useAxiosPublic();

  const totalPrice = cart.reduce((a, c) => {
    return a + c.productPrice;
  }, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "400px",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axiosPublic.delete(`/carts/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              console.log(res);
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-10/12 mx-auto min-h-96  ">
      <SectionHeader
        heading={"wanna add more"}
        subHeading={"My Cart"}
      ></SectionHeader>
      <div className="flex justify-between items-start px-8 mt-8 pt-8 bg-white">
        <h1 className="text-3xl font-bold">Total Orders: {cart.length}</h1>
        <h1 className="text-3xl font-bold">Total Price: {totalPrice}</h1>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="bg-yellow-600 rounded-md p-2 ">Pay</button>
          </Link>
        ) : (
          <button disabled className="bg-gray-400 text-gray-600 rounded-md p-2 ">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto px-4 pt-6 bg-white">
        <table className="table">
          {/* head */}
          <thead className="bg-yellow-600">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.productName}</td>
                <td>${item.productPrice}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-sm text-red-600 text-xl"
                  >
                    <MdDelete></MdDelete>
                  </button>
                </th>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
