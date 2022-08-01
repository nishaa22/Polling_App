import { TextField, Box, CardContent, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import React from "react";

const ListPoll = () => {
  const params = useParams();

  const view_polls = useSelector((state) => state.view_poll_state.data);

  return (
    <div>
      <Box className="flex  justify-center mt-20">
        {view_polls &&
          view_polls.data.map((data) => {
            if (data._id === params._id) {
              return (
                <>
                  <Card className="w-1/3 border-1 m-4 shadow-lg p-3">
                    <Typography
                      sx={{ fontSize: 18, fontWeight: "Bold" }}
                      gutterBottom
                      className="px-4"
                    >
                      {data.title}
                    </Typography>

                    {data.options.map((val) => {
                      return (
                        <>
                          <CardContent className="flex justify-between p-3 ml-4">
                            <Typography>{val.option}</Typography>
                            <Typography>vote : {val.vote}</Typography>
                          </CardContent>
                        </>
                      );
                    })}
                  </Card>
                </>
              );
            }
          })}
      </Box>
    </div>
  );
};

export default ListPoll;
