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
    // console.log("login button clicked");
    e.preventDefault();
    if (loginUser.username && loginUser.password) {
      dispatch(logInRequest({ ...loginUser }));
    }
  };

  const handleLoginData = (e, key) => {
    setLoginUser({ ...loginUser, [key]: e.target.value.trim() });
  };
const userType = localStorage.getItem("userType")
  useEffect(() => {
    if (login_store.isSuccess) {
      if (login_store.data.error === 0 ) {
        if (userType === "Guest") {
          setTimeout(() => navigate("/guest"), 1000);
        } else {
          setTimeout(() => navigate("/admin"), 1000);
        }
      }
     
    }
  }, [login_store]);
  // console.log(login_store.isLoading, "loginLoading");
  // console.log(login_store.isSuccess, "loginSuccess");
  // console.log(login_store.isError, "loginError");
  // console.log(errorMsg, "error message");
  // console.log(process.env,"fgdgdfg")
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
            className="my-2 w-full"
            variant="contained"
            type="submit"
            onClick={handleClick}
          >
            {login_store.isLoading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Log In"
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
          ) : (
            null
            // console.log("login successful error")
          )}
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
          ) : (null
            // console.log("error")
          )}
          <Link to="#" underline="always">
            {"Forgotten Password?"}
          </Link>
          <hr />
          <Link href="/register">{"SIGNUP"}</Link>
        </form>
      </FormControl>
    </div>
  );
};

export default Login;
