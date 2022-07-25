import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
const AddNewPoll = () => {
     
  return (
    <div>
      <div className="w-1/5 mt-32 flex justify-center items-center mx-auto">
        <FormControl>
          {/* <h1 className="text-center mb-3">SignUp</h1> */}
          <form>
            <TextField
              fullWidth
              label="Title"
              type="text"
              //   onChange={(e) => handleRegisterData(e, "username")}
            />

            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 1"
              fullWidth
              variant="standard"
            />
            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 2"
              fullWidth
              variant="standard"
            />
            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 3"
              fullWidth
              variant="standard"
            />
            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 4"
              fullWidth
              variant="standard"
            />

            <Button
              className="my-3 w-full"
              variant="contained"
              type="submit"
              //   onClick={handleClick}
            >
              Add new poll
              {/* {.isLoading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Add new poll"
            )} */}
            </Button>
          </form>
        </FormControl>
      </div>
    </div>
  );
};

export default AddNewPoll;
