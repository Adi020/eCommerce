import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useSelector((store) => store.userInfo);
  if (token) {
    return <Outlet />;
  } else return <Navigate to={"/login"} />;
};
export default ProtectedRoute;
