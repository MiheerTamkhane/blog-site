import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const authToken = localStorage.getItem("token");
  const location = useLocation();

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export { PrivateRoutes };
