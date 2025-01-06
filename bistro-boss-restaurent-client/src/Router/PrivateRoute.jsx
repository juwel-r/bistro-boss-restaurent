import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { userInfo, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading)
    return (
      <div className="flex justify-center mt-8">
        <HashLoader
        color="#066aff"
        cssOverride={{}}
        loading
        speedMultiplier={2}
      />
      </div>
    );
  if (userInfo) {
    return children;
  }
return <Navigate state={{from:location}} to="/login"></Navigate>;
};

export default PrivateRoute;
