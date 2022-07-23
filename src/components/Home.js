import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  FormControl,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormHelperText,
  Link,
  CircularProgress,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest, signUpRequest } from "../actions/index";
import { useNavigate } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  let navigate = useNavigate();

  const theme = useTheme();
  const dispatch = useDispatch();
  const [registerUser, setRegisterUser] = React.useState({
    username: "",
    password: "",
    role: "",
  });
  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });
  const [value, setValue] = React.useState(0);

  const handleUser = (value, type) => {
    setRegisterUser((prev) => {
      return {
        ...prev,
        [type]: value
      }
    })
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const signup_store = useSelector((state) => state && state.api_state)
  const login_store = useSelector((state) => state && state.login_state);

  const handleLoginSubmit = (e) => {
    console.log("login button clicked")
    e.preventDefault();
    if (loginUser.username && loginUser.password) {
      dispatch(logInRequest({ ...loginUser }));
    }
  };
  const handleSignupSubmit = (e) => {
    console.log("signup button clicked")
    e.preventDefault();
    if (registerUser.username && registerUser.password && registerUser.role) {
      dispatch(signUpRequest({ ...registerUser }));
    }
  };
  const handleRegisterData = (e, key) => {
    setRegisterUser({ ...registerUser, [key]: e.target.value });
  };
  const handleLoginData = (e, key) => {
    setLoginUser({ ...loginUser, [key]: e.target.value });
  };

  React.useEffect(() => {
    if (login_store.isSuccess) {
      if (login_store.data.error === 0) {
        navigate("/dashboard")
      }
    }
  }, [login_store])

  return (
    <div className="mt-5 absolute left-[30%]">
      <h1 className="text-center mb-3 text-sky-800">Polling App</h1>
      <Box sx={{ bgcolor: "background.paper", width: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Log In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >

          <TabPanel value={value} index={0} dir={theme.direction}>
            <FormControl className="w-full">
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  fullWidth
                  className="mb-2"
                  helperText="Please enter your username"
                  id="demo-helper-text-misaligned"
                  label="Username"
                  onChange={(e) => handleLoginData(e, "username")}

                />
                <TextField
                  fullWidth
                  className="mb-2"
                  helperText="Please enter your password"
                  id="demo-helper-text-misaligned"
                  label="Password"
                  onChange={(e) => handleLoginData(e, "password")}

                />
                <Button className="my-2 w-full" variant="contained" type="submit">
                  {login_store.isLoading ? <CircularProgress sx={{ 'color': 'white' }} /> : "Log In"}
                </Button>
                <Link to="#" underline="always">
                  {"Forgotten Password?"}
                </Link>
              </form>
            </FormControl>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FormControl className="w-full">
              <form onSubmit={handleSignupSubmit}>
                <TextField
                  fullWidth
                  className="mb-2"
                  helperText="Please enter your username"
                  id="demo-helper-text-misaligned"
                  label="Username"
                  onChange={(e) => handleRegisterData(e, "username")}

                />

                <TextField
                  fullWidth
                  className="mb-2"
                  helperText="Please enter your password"
                  id="demo-helper-text-misaligned"
                  label="Password"
                  onChange={(e) => handleRegisterData(e, "password")}

                />

                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={registerUser.role}
                    label="Role"
                    onChange={(e) => handleUser(e.target.value, 'role')}
                  //   onChange={(e) => handleRegisterData(e, "role")}

                  >
                    
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"guest"}>Guest</MenuItem>
                  </Select>

                  <FormHelperText>Please select your role</FormHelperText>
                </FormControl>
                <Button className="my-2 w-full" variant="contained" type="submit">
                  {signup_store.isLoading ? <CircularProgress sx={{ 'color': 'white' }} /> : "Sign Up"}
                </Button>
              </form>
            </FormControl>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
