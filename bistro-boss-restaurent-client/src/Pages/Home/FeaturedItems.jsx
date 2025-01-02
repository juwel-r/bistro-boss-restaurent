import React from "react";
import SectionHeader from "../../components/SectionHeader";
import featuredImg from "../../assets/home/featured.jpg";

const FeaturedItems = () => {
  return (
    <div
      style={{ backgroundImage: `url(${featuredImg})` }}
      className="p-10 pt-2 text-white bg-fixed bg-center mt-8 bg-cover"
    >
      <SectionHeader
        heading={"Featured Items"}
        subHeading={"Check It Out"}
      ></SectionHeader>
      <section className="md:flex gap-4 items-center justify-center w-full bg-slate-400 bg-opacity-50">
        <img className="sm:w-1/2" src={featuredImg} alt="Featured" />
        <div className="flex-1"> 
          <h1 className="uppercase font-semibold">
            December 14, 2024 <br />
            Try Featured Items of This week
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
            sequi quisquam sit sed fugit consequuntur velit dicta, quos
            inventore, similique fuga mollitia quidem voluptate minus error qui
            facilis voluptas expedita dolore vitae illum dolor cupiditate quis?
            Accusantium, ipsa rerum qui facilis eius iste. Itaque voluptates
            dignissimos optio, veniam quas doloribus?
          </p>
          <button className="btn btn-outline bg-black text-white">Order Now</button>
        </div>
      </section>
    </div>
  );
};

export default FeaturedItems;
