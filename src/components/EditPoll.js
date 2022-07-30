import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardContent, Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { editPollRequest, editPollSuccess } from "../actions";
import AddNewPollOption from "./AddNewPollOption";

const EditPoll = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(params, "params");
  const [newTitle, setNewTitle] = useState();
  const [show, setShow] = useState(false)
  // console.log(newTitle);
  const view_polls = useSelector((state) => state && state.view_poll_state.data);
  const update_poll_store = useSelector((state)=>state && state.update_poll_state);
  console.log(update_poll_store,"grfdsdax")
  // console.log(view_polls, "rbgtvfedcsx");
  const editTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleEdit = () => {
    // console.log("edit");
    dispatch(editPollRequest({ params, newTitle }));
    navigate("/admin");
  };
  const addNewOption=()=>{
console.log("add Option")
setShow(!show)
  }
  return (
    <>
      <Box className="flex  justify-center mt-10">
        {view_polls &&
          view_polls.data.map((data) => {
            if (data._id === params._id) {
              return (
                <>
                  <Box className="w-1/3 border-1 m-4 shadow-lg p-10">
                    <Typography className="flex justify-center py-2" variant="h5">
                      <b>Edit Poll Title</b>
                    </Typography>

                    <form onSubmit={handleEdit}>
                      <TextField
                        className="mb-3"
                        fullWidth
                        label="Title"
                        id="standard-basic"
                        variant="standard"
                        focused
                        defaultValue={data.title}
                        value={newTitle}
                        onChange={editTitle}
                      />
                      {data.options.map((val, index) => {
                        return (
                          <>
                            <Box className="flex justify-between">
                              <TextField
                                fullWidth
                                label="Option"
                                id="standard-basic"
                                variant="standard"
                                value={val.option}
                                className="mb-3"
                              />
                            </Box>
                          </>
                        );
                      })}

                      <Button
                        type="submit"
                        class="text-white bg-gradient-to-r from-cyan-500 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
                        onClick={handleEdit}
                      >
                        Update Poll
                      </Button>

                    </form>
                    <Button onClick={()=>addNewOption()}>{!show?"Add New Poll Option":"Delete New Poll Option"}</Button>
                  </Box>
                </>
              );
            }
          })}
      </Box>
      {show?<AddNewPollOption/>:""}

    </>
  );
};

export default EditPoll;
