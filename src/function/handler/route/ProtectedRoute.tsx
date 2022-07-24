import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserState } from "../../../context/UserContext";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = UserState();
  const location = useLocation();

  console.log("masuk");

  if (!user) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  return children;
};

export { RequireAuth };
