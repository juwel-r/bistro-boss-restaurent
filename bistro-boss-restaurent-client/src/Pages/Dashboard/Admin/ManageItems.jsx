import React from "react";
import useMenu from "../../../Hooks/useMenu";
import SectionHeader from "../../../components/SectionHeader";
import { FaEdit, FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageItems = () => {
  const [menuItems, loadingData, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  //need to ask that, if any element no imported but use in component, there now showing any error or error sign like red underline in vs code

  const handleDelete = (item) => {
    Swal.fire({
      title: `Delete "${item.name}"?`,
      text: "Are you sure to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/menu/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${item.name} has been deleted.`,
                icon: "success",
                width: "400px",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: `${err.response.data.message + " " + err.response.status}`,
              text: `${err}`,
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto min-h-96 mb-8">
      <SectionHeader
        heading="Manage Items"
        subHeading=" Update Everything "
      ></SectionHeader>
      <h1 className="text-3xl font-bold my-8">
        {" "}
        Total Users: {menuItems.length}
      </h1>
      <div className=" bg-white">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="bg-yellow-600">
                <th>#</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h16 object-cover"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Link to={`/dashboard/edit-item/${item._id}`}>
                      <button className="text-xl text-white bg-yellow-600 w-8 h-8 flex justify-center items-center rounded-sm">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-xl text-white bg-red-600 w-8 h-8 flex justify-center items-center rounded-sm"
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </td>
                  {/* <td className="text-white text-xl bg-red-500 btn">
                      <button><MdDelete /></button>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
