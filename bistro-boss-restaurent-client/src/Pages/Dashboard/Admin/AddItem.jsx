import React from "react";
import SectionHeader from "../../../components/SectionHeader";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const AddItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
        //by default on axios headers:{"content-type":"application/json"}///but for send image or any file it  should be "Content-Type": "multipart/form-data"
      },
    });
    if (res.data.success) {
      const menu = {
        name: data.name,
        category: data.category,
        recipe: data.recipe,
        image: res.data.data.display_url,
        price: parseFloat(data.price),
      };

      const menuRes = await axiosSecure.post("/menu", menu);
      if (menuRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} has benn added to menu`,
          showConfirmButton: false,
          timer: 1500,
          width: "400px",
        });
      }
    }
    // console.log(res.data.data.display_url);
    // console.log(data);
  };

  return (
    <div className="">
      <SectionHeader
        heading={"Add item"}
        subHeading={"What's new?"}
      ></SectionHeader>
      <div className="bg-white w-10/12 mx-auto p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="form-control col-span-2">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="input input-bordered rounded-none"
            />
          </div>
          <select
            defaultValue={"null"}
            {...register("category", { required: true })}
            className="select select-bordered w-full rounded-none"
          >
            <option disabled value="null">
              Select Category
            </option>
            <option value={"salad"}>Salad</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="dessert">Desert</option>
            <option value="drinks">Drinks</option>
          </select>

          <div className="form-control">
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              className="input input-bordered rounded-none"
            />
          </div>

          <textarea
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered col-span-2 rounded-none"
            placeholder="Recipe Details"
          ></textarea>

          {/* upload photo */}
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-1/2 col-span-2 rounded-none"
          />
          {/* submit */}
          <div className="form-control">
            <button className="btn w-36 btn-neutral rounded-none">
              Add Item <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
