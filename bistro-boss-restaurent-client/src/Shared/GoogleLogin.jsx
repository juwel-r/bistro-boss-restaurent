import React from "react";
import useAuth from "../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    loginWithGoogle().then((result) => {
      const user = {
        name: result.user.displayName,
        email: result.user.email,
      };
      axiosPublic.post(`/user?email=${user.email}`, user).then((result) => {
        navigate(redirect);
      });
    });
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn w-10/12 mx-auto mb-6 flex gap-2 items-center"
      >
        <FcGoogle /> Continue With Google
      </button>
    </div>
  );
};

export default GoogleLogin;
