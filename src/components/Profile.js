import React from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  var decoded = jwt_decode(token);

  return (
    <div>
      <Box className="flex justify-center mt-28">
        <Box className="w-1/2 border-2 shadow-lg p-4">
          <Typography className="flex justify-center" variant="h6">
            <b>YOUR PROFILE</b>
          </Typography>
          <hr />
          <Typography className="flex justify-center p-2">
            <b>ID : </b>
            {decoded._id}
          </Typography>
          <Typography className="flex justify-center p-2">
            <b>USERNAME : </b>
            {decoded.username}
          </Typography>
          <Typography className="flex justify-center p-2">
            <b>ROLE : </b>
            {decoded.role}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
