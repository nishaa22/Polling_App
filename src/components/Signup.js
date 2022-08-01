import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  Typography,
  FormControl,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Link,
  CircularProgress,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { signUpRequest } from "../actions/index";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Signup = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [registerUser, setRegisterUser] = React.useState({
    username: "",
    password: "",
    role: "Guest",
  });
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

  const handleUser = (value, type) => {
    setRegisterUser((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };
  const signup_store = useSelector((state) => state && state.api_state);
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (registerUser.username && registerUser.password && registerUser.role) {
      dispatch(signUpRequest({ ...registerUser }));
    }
  };
  const handleRegisterData = (e, key) => {
    setRegisterUser({ ...registerUser, [key]: e.target.value.trim() });
  };
  useEffect(() => {
    if (signup_store.isSuccess) {
      if (signup_store.data.error === 0) {
        setTimeout(() => navigate("/"), 1000);
      }
    }
  }, [signup_store]);

  const errorMsg = useSelector((state) => state && state.api_state.message);
  return (
    <div className="w-1/3 mt-32 flex justify-center items-center mx-auto">
      <FormControl>
        <h1 className="text-center mb-3">SignUp</h1>
        <form onSubmit={handleSignupSubmit}>
          <TextField
            fullWidth
            className="mb-3"
            label="Username"
            type="text"
            onChange={(e) => handleRegisterData(e, "username")}
          />

          <TextField
            fullWidth
            className="mb-3"
            label="Password"
            type="password"
            onChange={(e) => handleRegisterData(e, "password")}
          />

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
            <Select
              labelId="demo-simple--helper-label"
              value={registerUser.role}
              label="Role"
              defaultValue={MenuItem.Guest}
              onChange={(e) => handleUser(e.target.value, "role")}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Guest"}>Guest</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            class="w-full my-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleClick}
          >
            {signup_store.isLoading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              <Typography variant="h6">Sign Up</Typography>
            )}
          </Button>
          {signup_store.isError ? (
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
          {signup_store.isSuccess ? (
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
                    User Registered Successfully!
                  </Alert>
                </Snackbar>
              </Stack>
            </>
          ) : null}

          <Link href="/">{"Already A User? Login"}</Link>
        </form>
      </FormControl>
    </div>
  );
};

export default Signup;
