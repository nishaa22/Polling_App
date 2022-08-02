import React, { useEffect } from "react";
import { Card, Box, CardContent, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePollOptionRequest,
  deletePollRequest,
  listPollRequest,
  viewPollRequest,
  voteRequest,
} from "../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ViewPolls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const view_polls = useSelector((state) => state.view_poll_state.data);
  const delete_poll_store = useSelector((state) => state.delete_poll_state);

  useEffect(() => {
    dispatch(viewPollRequest());
  }, []);
  const deletePollFunc = (_id) => {
    setOpen(true);

    dispatch(deletePollRequest({ _id }));
    if (delete_poll_store.isSuccess) {
      setTimeout(() => navigate("/admin"), 1000);
    }
  };
  const userType = localStorage.getItem("userType");
  const voteApi = (_id, option) => {
    dispatch(voteRequest({ _id, option }));
  };
  const editPoll = (_id) => {
    navigate(`/editpoll/${_id}`);
  };
  const deletePollOptionFunc = (_id, option) => {
    setOpen(true);
    dispatch(deletePollOptionRequest({ _id, option }));
  };
  const list_a_poll = (_id) => {
    dispatch(listPollRequest({ _id }));
    navigate(`/listpoll/${_id}`);
  };
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
  const delete_option_store = useSelector(
    (state) => state && state.delete_option_state
  );
  return (
    <>
      <Card className="flex flex-wrap justify-center">
        <></>
        {view_polls &&
          view_polls.data.map((data) => {
            return (
              <>
                <CardContent className="w-1/3 border-1 m-4 shadow-lg">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: "Bold" }}
                    className=" px-3"
                    gutterBottom
                  >
                    {data.title}
                  </Typography>

                  <hr />
                  {data.options.map((val) => {
                    return (
                      <>
                        <CardContent className="flex justify-between">
                          <Typography>{val.option}</Typography>
                          <Box className="flex justify-center">
                            <Button
                              variant="outlined"
                              className="shadow-md border-2 border-black text-black"
                              onClick={() => voteApi(data._id, val.option)}
                            >
                              vote:{val.vote}
                            </Button>
                            {userType === "Admin" ? (
                              <DeleteIcon
                                className="mt-1.5"
                                sx={{ color: "#e60000" }}
                                onClick={() =>
                                  deletePollOptionFunc(data._id, val.option)
                                }
                              />
                            ) : (
                              ""
                            )}
                           
                          </Box>
                        </CardContent>
                      </>
                    );
                  })}

                  {userType === "Guest" ? (
                    <Button
                      type="submit"
                      class="text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                      onClick={() => list_a_poll(data._id)}
                    >
                      View Poll
                    </Button>
                  ) : (
                    ""
                  )}
                  {userType === "Admin" ? (
                    <>
                      <Button
                        type="submit"
                        class="ml-4 text-white bg-gradient-to-r from-red-500 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2.5 py-2 text-center mr-2 mb-2"
                        onClick={() => deletePollFunc(data._id)}
                      >
                        Delete
                        <DeleteIcon sx={{ color: "white" }} />
                      </Button>

                      <Button
                        className="bg-primary text-white"
                        onClick={() => editPoll(data._id, data.title)}
                        type="submit"
                        class="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-2.5 py-2 text-center mr-2 mb-2"
                      >
                        Edit Poll <EditIcon sx={{ color: "white" }} />
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                  {delete_poll_store.isSuccess ? (
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
                            Poll Deleted Successfully!
                          </Alert>
                        </Snackbar>
                      </Stack>
                    </>
                  ) : (
                    ""
                  )}
                </CardContent>
              </>
            );
          })}
      </Card>
    </>
  );
};

export default ViewPolls;
