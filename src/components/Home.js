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
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest, signUpRequest } from "../actions/index";

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const [role, setRole] = React.useState("");

  const handleUser = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [registerUser, setRegisterUser] = React.useState({
    username: "",
    password: "",
    role: "",
  });
  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginUser.username && loginUser.password) {
      dispatch(logInRequest({ ...loginUser }));
    }
  };
  const handleSignupSubmit = (e) => {
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
            <Tab label="Sign Up" {...a11yProps(0)} />
            <Tab label="Log In" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
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

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={role}
                    label="Role"
                    onChange={handleUser}
                //   onChange={(e) => handleRegisterData(e, "username")}
                    
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                  <FormHelperText>Please select your role</FormHelperText>
                </FormControl>
                <Button className="my-2" variant="contained">
                  Sign Up
                </Button>
              </form>
            </FormControl>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
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
                <Button className="my-2" variant="contained">
                  Log In
                </Button>
                <Link to="#" underline="always">
                  {"Forgotten Password?"}
                </Link>
              </form>
            </FormControl>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
