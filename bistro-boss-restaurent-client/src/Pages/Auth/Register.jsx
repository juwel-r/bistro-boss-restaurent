import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register: createUser,
    updateUserProfile,
    logOut,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile({ displayName: data.name, photoURL: data.photoURL })
          .then(() => {
            logOut();
            Swal.fire({
              title: `New Account Created Successfully!`,
              showClass: {
                popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
              },
              hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
              },
            });

            navigate("/login");
          })
          .catch((err) => {
            Swal.fire({
              title: `${err}`,
              showClass: {
                popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
              },
              hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
              },
            });
          });
      })
      .catch((err) => {
        Swal.fire({
          title: `${err}`,
          showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
          },
          hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
          },
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet>
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
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}{" "}
            {/* For custom validaion  */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              {...register("photoURL", { required: true })}
              type="url"
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}{" "}
            {/* For custom validaion  */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}{" "}
            {/* For custom validaion  */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}/,
              })}
              type="password"
              placeholder="password"
              className="input input-bordered"
            />
            {/* Form error validation for each error  // or custom validaion*/}
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-600 text-sm">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p role="alert" className="text-red-600 text-sm">
                Password must be 6 character{" "}
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p role="alert" className="text-red-600 text-sm">
                Password must be less than 20 character{" "}
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p role="alert" className="text-red-600 text-sm">
                Password must have one uppercase, one lowercase, one number and
                one character{" "}
              </p>
            )}

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
        <p className="px-6 pb-8">
          Already have an Account! <Link to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
