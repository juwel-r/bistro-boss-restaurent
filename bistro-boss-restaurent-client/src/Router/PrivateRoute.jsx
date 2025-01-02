import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { userInfo, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading)
    return (
      <div className="flex justify-center">
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
return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
