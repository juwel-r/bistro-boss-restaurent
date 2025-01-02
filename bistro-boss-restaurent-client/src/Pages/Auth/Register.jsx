import { useForm } from "react-hook-form"

const Register = () => {
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Register Now</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="name"
            className="input input-bordered"
            />
            {errors.name && <span className="text-red-600">This field is required</span>} {/* For custom validaion  */}
            
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email",{required:true})}
            type="email"
            placeholder="email"
            className="input input-bordered"
                      />
         {errors.email && <span className="text-red-600">Password is required</span>} {/* For custom validaion  */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", { required: true, minLength:6, maxLength: 20 })}
            type="password"
            placeholder="password"
            className="input input-bordered"
            />
            {errors.password && <span className="text-red-600">Email is required</span>} {/* For custom validaion  */}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
