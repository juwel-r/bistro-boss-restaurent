
import useAuth from "../../../Hooks/useAuth";

const AdminHome = () => {
  const { userInfo } = useAuth()
  return <div>
    <h1 className="text-3xl font-bold">
      Hi {userInfo?.displayName}, Welcome Back! (Admin )
    </h1>
  </div>;
};


export default AdminHome;