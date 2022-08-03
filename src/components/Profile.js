import React from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { Box } from "@mui/system";
import { Typography ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  var decoded = jwt_decode(token);
const navigate = useNavigate();
  return (
    <>
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
       <div className="flex justify-center mt-3">
        <Button
          type="button"
          class="text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 hover:bg-gradient-to-br
           focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg 
           text-sm px-5 py-2.5 text-center mr-2 mb-2"
           onClick={()=>navigate(-1)}
        >Go Back
        </Button>
      </div>
      </>
  );
};

export default Profile;
