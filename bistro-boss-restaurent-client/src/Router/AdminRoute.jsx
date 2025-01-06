import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useIsAdmin from "../Hooks/useIsAdmin";
import { HashLoader } from "react-spinners";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
  const { userInfo, loading } = useAuth();
  const [isAdmin, isPending] = useIsAdmin();
console.log(isPending)
  if (loading || isPending )
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
//   if (isAdmin) {
//     return Swal.fire({
//       title: "Access Forbidden!",
//       text: "Haven't permission to visit this page!",
//       icon: "error",
//     });
//   }
  if (userInfo && isAdmin) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
