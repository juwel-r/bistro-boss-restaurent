import React from "react";
import SectionHeader from "../../../components/SectionHeader";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const AddItem = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
              className="input input-bordered"
            />
          </div>
          <select
            defaultValue={"null"}
            {...register("category", { required: true })}
            className="select select-bordered w-full "
          >
            <option disabled value="null">
              Select Category
            </option>
            <option>Salad</option>
            <option>Pizza</option>
            <option>Soup</option>
            <option>Desert</option>
            <option>Drinks</option>
          </select>

          <div className="form-control">
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              className="input input-bordered"
            />
          </div>

          <textarea
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered col-span-2 "
            placeholder="Recipe Details"
          ></textarea>

          {/* upload photo */}
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-1/2 col-span-2"
          />
          {/* submit */}
          <div className="form-control">
            <button className="btn w-36 btn-neutral">
              Add Item <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
