import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";

const PrivateRoute = () => {
  const isLogged = JSON.parse(localStorage.getItem("token"))
  return isLogged ? <Outlet /> : <Login />;
};

export default PrivateRoute;
