import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserState } from "../../../context/UserContext";

const ProtectedRouteAdminOnly: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { user } = UserState();
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  if (user.role === "user") {
    return <Navigate to={"/notFound"} state={{ from: location }} replace />;
  }

  return children;
};

export { ProtectedRouteAdminOnly };
