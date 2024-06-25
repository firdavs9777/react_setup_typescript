import { Outlet, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

// Admin Route set for the router
const AdminRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;