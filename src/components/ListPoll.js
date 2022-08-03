import { Button, Box, CardContent, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

const ListPoll = () => {
  const params = useParams();
  const navigate = useNavigate();
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
    </div>
  );
};

export default ListPoll;
