import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const isLogged = JSON.parse(localStorage.getItem("token"));
    if (!isLogged) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
