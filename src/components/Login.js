import React from "react";
import {
  FormControl,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest } from "../actions/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });
  const login_store = useSelector((state) => state && state.login_state);
  const handleLoginSubmit = (e) => {
    console.log("login button clicked");
    e.preventDefault();
    if (loginUser.username && loginUser.password) {
      dispatch(logInRequest({ ...loginUser }));
    }
  };
  
  const handleLoginData = (e, key) => {
    setLoginUser({ ...loginUser, [key]: e.target.value.trim() });
  };

  useEffect(() => {
     if (login_store.isSuccess) {
       if (login_store.data.error === 0) {
         navigate("/dashboard");
       }
     }
   }, [login_store]);

  return (
    <div className="w-1/3 mt-36 flex justify-center items-center mx-auto">
      <FormControl>
         <h1 className="text-center mb-3">Login</h1>

        <form onSubmit={handleLoginSubmit} >
          <TextField
            fullWidth
            type="text"
            className="mb-2"
            label="Username"
            onChange={(e) => handleLoginData(e, "username")}
          />
          <TextField
            fullWidth
            type="password"
            className="mb-2"
            label="Password"
            onChange={(e) => handleLoginData(e, "password")}
          />
          <Button className="my-2 w-full" variant="contained" type="submit">
            {login_store.isLoading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Log In"
            )}
          </Button>
          <Link to="#" underline="always">
            {"Forgotten Password?"}
          </Link>
          <hr/>
          <Link href="/register">
                  {"SIGNUP"}
                </Link>
        </form>
      </FormControl>
    </div>
  );
};

export default Login;
