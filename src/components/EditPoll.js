import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardContent, Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { editPollRequest } from "../actions";

const EditPoll = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(params, "params");
  const [newTitle, setNewTitle] = useState();
  // console.log(newTitle);
  const view_polls = useSelector((state) => state.view_poll_state.data);
  // console.log(view_polls, "rbgtvfedcsx");
  const editTitle = (e) => {
    setNewTitle(e.target.value );
  };
  const handleEdit = () => {
    // console.log("edit");
    dispatch(editPollRequest({ params, newTitle }));
    navigate("/admin");
  };

  return (
    <>
      <Box className="flex  justify-center mt-20">
        {view_polls &&
          view_polls.data.map((data) => {
            if (data._id === params._id) {
              return (
                <>
                  <Box className="w-1/3 border-1 m-4 shadow-lg p-10">
                    <form onSubmit={handleEdit}>
                      <TextField
                        className="mb-3"
                        fullWidth
                        id="standard-basic"
                        type="text"
                        variant="standard"
                        defaultValue={data.title}
                        value={newTitle}
                        onChange={editTitle}
                      />
                      {data.options.map((val) => {
                        return (
                          <>
                            <Box className="flex justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                type="text"
                                variant="standard"
                                value={val.option}
                                className="mb-3"
                              />
                            </Box>
                          </>
                        );
                      })}
                      
                      
                      <Button type="button" class="text-white bg-gradient-to-r from-cyan-500 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
                        onClick={handleEdit}
                      
                      >Update Poll</Button>

                    </form>
                  </Box>
                </>
              );
            }
          })}
      </Box>
    </>
  );
};

export default EditPoll;
{
  /* <Box className="flex  justify-center mt-20">
{view_polls &&
  view_polls.data.map((data) => {
  if (data._id === params._id) {
    return (
      <>
        <Box className="w-1/3 border-1 m-4 shadow-lg">
          <TextField
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
                    <TextField>{val.option}</TextField>
                   
                  </CardContent>
                </>
              );
            })}
          </TextField>
          <Button variant="contained" onClick={handleEdit}>Update Poll</Button>
        </Box>
      </>
    );}
  })}
</Box> */
}
