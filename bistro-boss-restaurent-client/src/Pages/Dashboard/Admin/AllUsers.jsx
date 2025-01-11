import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import SectionHeader from "../../../components/SectionHeader";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  //   const [users, setUsers] = useState([])
  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Sure to Make Admin?`,
      html: `<span style="color:green;">${user.name}</span> will be Admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin!",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/user/${user._id}`)
          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                html: `<span style="font-size:32px"><span style="color:green;">${user.name}</span> Added as Admin!</span> `,
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: `${err.response.data.message + " " + err.response.status}`,
              text: `${err}`,
              icon: "error",
              width: "400px",
            });
          });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: `Are you Delete "${user.name}"?`,
      text: "You won't be able to user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/user/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
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
    <div className="w-10/12 mx-auto min-h-96 ">
      <SectionHeader
        heading="Manage All Users"
        subHeading=" Manage "
      ></SectionHeader>
      <h1 className="text-3xl font-bold my-8"> Total Users: {users.length}</h1>
      <div className=" bg-white">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="bg-yellow-600">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.roll === "admin" ? (
                      <span className="font-bold">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-xl text-white bg-yellow-600 w-8 h-8 flex justify-center items-center rounded-sm"
                      >
                        {" "}
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
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

export default AllUsers;
