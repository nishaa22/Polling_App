import React, { useEffect, useState } from "react";
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
  const [editpoll, setEditPoll] = useState({
    title: "",
    options: [],
  });

  const [show, setShow] = useState(false);

  const view_polls = useSelector(
    (state) => state && state.view_poll_state.data
  );

  useEffect(() => {
    if (view_polls?.data.length > 0 && params?._id) {
      const editablePoll = view_polls?.data.filter(
        (val) => val._id === params._id
      );
      setEditPoll((prev) => {
        return {
          ...prev,
          title: editablePoll[0].title,
          options: editablePoll[0].options,
        };
      });
    }
  }, [view_polls, params]);
  const updatePollTitle = (e) => {
    setEditPoll((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const handleEdit = () => {
    dispatch(editPollRequest([params, editpoll.title]));
    navigate("/admin");
  };

  const addNewOption = () => {
    setShow(!show);
  };

  return (
    <>
      <Box className="flex  justify-center mt-10">
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
              value={editpoll.title}
              onChange={updatePollTitle}
            />
            {view_polls &&
              view_polls.data.map((data) => {
                if (data._id === params._id) {
                  return (
                    <>
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
                        class="text-white bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
                        onClick={handleEdit}
                      >
                        Update Poll
                      </Button>
                    </>
                  );
                }
              })}
          </form>
          <Button onClick={() => addNewOption()}>
            {!show ? "Add New Poll Option" : "Delete New Poll Option"}
          </Button>
        </Box>
      </Box>
      {show ? <AddNewPollOption /> : ""}
      <div className="flex justify-center mt-3">
        <Button
          type="button"
          class="text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 hover:bg-gradient-to-br
           focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg 
           text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default EditPoll;
