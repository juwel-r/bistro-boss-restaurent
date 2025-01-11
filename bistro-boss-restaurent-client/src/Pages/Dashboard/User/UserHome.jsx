import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { userInfo } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold">Hi {userInfo?.displayName}, Welcome Back!</h1>
    </div>
  );
};

export default UserHome;
