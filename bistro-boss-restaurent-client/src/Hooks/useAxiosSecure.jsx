import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-restaurent-server-six.vercel.app/",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    //backend a request send ar somoy headers soho dite hobe and headers a modde jwt token add kore dite hobe,,, cookie or localStorage theke
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      //ekhane kono kaj nai... jodi backend a request korar por kono error khay tahole function ekhane asbena... next step a jabe..
      return response;
    },
    async (err) => {
      //response a jodi kono error khay tahole next a ekhane exicuting hobe
      const status = err.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      console.log("response error code is: ", err.response.status);
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
