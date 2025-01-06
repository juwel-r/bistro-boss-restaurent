import { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import GoogleLogin from "../../Shared/GoogleLogin";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { login, userInfo } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/";

  if (userInfo?.email) {
    return <Navigate to="/"></Navigate>;
  }

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleCaptchaValidate = (e) => {
    const value = e.target.value;
    if (validateCaptcha(value) === true) {
      console.log("captcha matched");
      setDisabled(false);
    } else {
      setDisabled(true);

      console.log(value, "not matched");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
    login(email, password)
      .then((result) => {
        navigate(redirect);
        Swal.fire({
          title: `Logged in Successful!`,
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
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className="hero-content ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <Link className="text-xl my-4 px-4" to="/">
            <button>{"<"} Back to Home</button>
          </Link>
          <h1 className="text-center text-2xl sm:text-4xl mt-4 font-bold">
            Login Here
          </h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleCaptchaValidate}
                type="text"
                placeholder="Type the captcha"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              {/* TODO: Re- */}
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="px-6 pb-8">
            Don't have an Account! <Link to="/register">Register</Link> now.
          </p>
          <div className="divider">Or</div>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </>
  );
};

export default Login;
