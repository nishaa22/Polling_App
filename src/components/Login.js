import React from "react";
import {
  FormControl,
  TextField,
  Button,
  Link,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logInFulfill, logInRequest } from "../actions/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMsg = useSelector((state) => state && state.login_state.message);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });
  const login_store = useSelector((state) => state && state.login_state);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginUser.username && loginUser.password) {
      dispatch(logInRequest({ ...loginUser }));
    }
  };

  const handleLoginData = (e, key) => {
    setLoginUser({ ...loginUser, [key]: e.target.value.trim() });
  };

  useEffect(() => {
    if (localStorage.getItem("userType")) {
      const userType = localStorage.getItem("userType");
      if (userType === "Guest") {
        setTimeout(() => navigate("/guest"), 500);
      } else {
        setTimeout(() => navigate("/admin"), 500);
      }
    }
  }, [login_store.isSuccess]);

  return (
    <div className="w-1/3 mt-32 flex justify-center items-center mx-auto">
      <FormControl>
        <h1 className="text-center mb-3">Login</h1>

        <form onSubmit={handleLoginSubmit}>
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
          <Button
            type="submit"
            class="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleClick}
          >
            {login_store.isLoading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              <Typography variant="h6">Log In</Typography>
            )}
          </Button>

          {login_store.isSuccess ? (
            <>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Logged In Successfully!
                  </Alert>
                </Snackbar>
              </Stack>
            </>
          ) : null}
          {login_store.isError ? (
            <>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {errorMsg}
                  </Alert>
                </Snackbar>
              </Stack>
            </>
          ) : null}

          <Link href="/register">{"New User? Create an Account"}</Link>
        </form>
      </FormControl>
    </div>
  );
};

export default Login;
