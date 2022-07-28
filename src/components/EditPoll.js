import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {CardContent,Button,Typography,Box} from "@mui/material";

const EditPoll = () => {
  const params = useParams();
  console.log(params, "params");
  const view_polls = useSelector((state) => state.view_poll_state.data);
  console.log(view_polls, "rbgtvfedcsx");
  const handleEdit=()=>{
    console.log("edit")
  }
  return (
    <>
      <Box className="flex  justify-center mt-20">
        {view_polls &&
          view_polls.data.map((data) => {
          if (data._id === params._id) {
            return (
              <>
                <CardContent className="w-1/3 border-1 m-4 shadow-lg">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: "Bold" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.title}
                    <hr />
                    {data.options.map((val) => {
                      
                      return (
                        <>
                          <CardContent className="flex justify-between">
                            <Typography>{val.option}</Typography>
                           
                          </CardContent>
                        </>
                      );
                    })}
                  </Typography>
                  <Button variant="contained" onClick={handleEdit}>Edit Poll</Button>
                </CardContent>
              </>
            );}
          })}
      </Box>
    </>
  );
};

export default EditPoll;
