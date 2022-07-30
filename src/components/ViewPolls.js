import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { deletePollRequest, viewPollRequest, voteRequest } from "../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";
const ViewPolls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const view_polls = useSelector((state) => state.view_poll_state.data);
  const delete_poll_store = useSelector((state) => state.delete_poll_state);
  // console.log(delete_poll_store,view_polls.data, "hbgvfd");
  // console.log(view_polls.isLoading, "viewPoll data");
  // const handleViewPoll = () => {
  //   dispatch(viewPollRequest());
  // };
  useEffect(() => {
    dispatch(viewPollRequest());
  }, []);
  const deletePollFunc = (_id) => {
    // console.log(_id,"id")
    dispatch(deletePollRequest({ _id }));
    if (delete_poll_store.isSuccess) {
      navigate("/admin");
    }
  };
  const userType = localStorage.getItem("userType");
  const voteApi = (_id, option) => {
    console.log(_id, option, "id.....");
    dispatch(voteRequest({ _id, option }));
  };
  const editPoll = (_id, title) => {
    console.log("edit poll clicked", _id, title);
    navigate(`/editpoll/${_id}`);
  };
  return (
    <>
      {/* <Button onClick={handleViewPoll}>View Poll</Button> */}
      <Card className="flex flex-wrap justify-center">
        {view_polls &&
          view_polls.data.map((data) => {
            // console.log(val, "val---------");
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
                      // console.log(data._id, val.option,"vote api............");
                      //   console.log(val, "options------");
                      //   console.log(val.option,"option names")
                      return (
                        <>
                          <CardContent className="flex justify-between">
                            <Typography>{val.option}</Typography>
                            <Button
                              variant="outlined"
                              className="shadow-md border-2 border-black text-black"
                              onClick={() => voteApi(data._id, val.option)}
                            >
                              vote:{val.vote}
                            </Button>
                          </CardContent>
                        </>
                      );
                    })}
                  </Typography>
                  {userType === "Admin" ? (
                    <>
                      <Button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-500 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                        onClick={() => deletePollFunc(data._id)}
                      >
                        {/* {delete_poll_store.isLoading  ? (
                        <CircularProgress sx={{ color: "white" }} />
                      ) : (
                        ""
                      )} */}
                        Delete
                        <DeleteIcon sx={{ color: "white" }} />
                      </Button>
                      <Button
                        className="bg-primary text-white"
                        onClick={() => editPoll(data._id, data.title)}
                        type="button"
                        class="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                      >
                        Edit Poll <EditIcon sx={{ color: "white" }} />
                      </Button>
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
