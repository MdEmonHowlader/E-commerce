import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(ShopContext);
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login with the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
