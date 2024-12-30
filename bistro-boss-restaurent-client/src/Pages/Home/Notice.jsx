import bg from "../../assets/home/chef-service.jpg";
const Notice = () => {
  return (
    <div className="mt-12 relative w-full">
      <img src={bg} alt="" />
      <div className="w-[70%] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white text-black text-center p-8 sm:p-16
      ">
        <h1 className="text-4xl mb-4">Bistro Boss</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, libero accusamus laborum deserunt ratione dolor
          officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
          nihil iusto ducimus incidunt quibusdam nemo.
        </p>
      </div>
    </div>
  );
};

export default Notice;
