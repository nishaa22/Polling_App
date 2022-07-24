import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { viewPollRequest } from "../actions";

const ViewPolls = () => {
  const dispatch = useDispatch();
  const view_polls = useSelector((state) => state.view_poll_state.data);
  // console.log(view_polls, "viewPoll data");
  const handleViewPoll = () => {
    dispatch(viewPollRequest());
  };
  return (
    <>
      <Button onClick={handleViewPoll}>View Poll</Button>
      <Card className="flex flex-wrap justify-center">
        {view_polls &&
          view_polls.data.map((data) => {
            // console.log(val, "val---------");
            return (
              <>
                <CardContent className="w-1/4 border-1 m-4 shadow-lg">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: "Bold" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.title}
                    <hr />
                    {data.options.map((val) => {
                      //   console.log(val, "options------");
                      //   console.log(val.option,"option names")
                      return (
                        <>
                          <CardContent className="flex">
                            <Typography>{val.option}</Typography>
                          </CardContent>
                        </>
                      );
                    })}
                  </Typography>
                </CardContent>
              </>
            );
          })}
      </Card>
    </>
  );
};

export default ViewPolls;
