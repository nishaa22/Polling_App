import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addNewPollOptionRequest } from "../actions";

const AddNewPollOption = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const _id = params._id;
  const [newOpt, setNewOpt] = useState("");
  const addOption = () => {
    console.log("add", newOpt, params);
    dispatch(addNewPollOptionRequest({ _id, newOpt }));
    setNewOpt("")
  };
  return (
    <div>
      <Box className="flex justify-center mb-20">
        <TextField
          id="standard-basic"
          label="New Option"
          value={newOpt}
          variant="standard"
          onChange={(e) => setNewOpt(e.target.value)}
        />
        <Button
          type="submit"
          class="text-white bg-gradient-to-r from-cyan-500 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
          onClick={addOption}
        >
          Add Option
        </Button>
      </Box>
    </div>
  );
};

export default AddNewPollOption;
