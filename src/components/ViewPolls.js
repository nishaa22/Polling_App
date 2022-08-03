import React, { useEffect } from "react";
import {
  Card,
  Box,
  CardContent,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
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
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "red", color: "white" },
  },
}));
const ViewPolls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isDisabled, setIsDisabled]=React.useState(false);
  const [id,setId]=React.useState();
  const [deleteId, setDeleteId] = React.useState();

  // console.log(deleteId, "fgdgssfdfsdf");
  const view_polls_loader = useSelector((state) => state.view_poll_state);
  // console.log(view_polls_loader);
  const view_polls = useSelector((state) => state.view_poll_state.data);
  const delete_poll_store = useSelector((state) => state.delete_poll_state);

  useEffect(() => {
    dispatch(viewPollRequest());
  }, []);
  const deletePollFunc = (_id) => {
    setId(_id);
    setOpen(true);
    // console.log(_id);

    dispatch(deletePollRequest({ _id }));
    if (delete_poll_store.isSuccess) {
      setTimeout(() => navigate("/admin"), 1000);
    }
  };
  const userType = localStorage.getItem("userType");
  // console.log(userType);
  const voteApi = (_id, option) => {
    // setIsDisabled(!isDisabled)
    dispatch(voteRequest({ _id, option }));
  };
  const editPoll = (_id) => {
    navigate(`/editpoll/${_id}`);
  };
  const deletePollOptionFunc = (_id, option) => {
    console.log(_id)
    setId(_id)
    setOpen(true);
    dispatch(deletePollOptionRequest({ _id, option }));
  };
  const list_a_poll = (_id) => {
    console.log("vote")
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
console.log(delete_option_store);
  const classes = useStyles();
  return (
    <>
      <Card className="flex flex-wrap justify-center">
        {view_polls &&
          view_polls.data.map((data) => {
            return (
              <>
                <CardContent className="w-1/3 border-1 m-4 shadow-lg">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: "Bold" }}
                    className="flex justify-between px-3"
                    gutterBottom
                  >
                    {data.title}
                    {delete_option_store.isLoading && data._id === id ? (
                      <CircularProgress size={30} />
                    ) : (
                      ""
                    )}
                  </Typography>

                  <hr />
                  {data.options.map((val) => {
                    return (
                      <>
                        <CardContent className="flex justify-between">
                          <Typography>{val.option}</Typography>
                          <Box className="flex justify-between">
                            <Button
                              // disabled={isDisabled}
                              variant="outlined"
                              className="shadow-md border-2 border-black text-black px-4"
                              onClick={() => voteApi(data._id, val.option)}
                            >
                              vote:{val.vote}
                            </Button>

                            {userType === "Admin" ? (
                              <Box className="ml-4">
                                <IconButton
                                  className={classes.customHoverFocus}
                                >
                                  <DeleteIcon
                                    onClick={() =>
                                      deletePollOptionFunc(data._id, val.option)
                                    }
                                  />
                                </IconButton>
                              </Box>
                            ) : (
                              ""
                            )}
                          </Box>
                        </CardContent>
                      </>
                    );
                  })}

                  {userType === "guest" ? (
                    <Button
                      // disabled="true"
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
                        {delete_poll_store.isLoading && data._id === id ? (
                          <CircularProgress
                            size={30}
                            sx={{ color: "white", marginTop: "10px" }}
                          />
                        ) : (
                          "Delete"
                        )}

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
      {view_polls_loader.isLoading ? <LinearProgress color="inherit" /> : ""}
    </>
  );
};

export default ViewPolls;
