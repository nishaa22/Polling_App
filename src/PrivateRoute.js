import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";

const PrivateRoute = () => {
  const isLogged = useSelector((state) => state && state.login_state.data);
  console.log(isLogged, "login dataaaaaaa");
  return isLogged ? <Outlet /> : <Login />;
};

export default PrivateRoute;
