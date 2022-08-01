import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addNewPollOptionRequest } from "../actions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const AddNewPollOption = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const _id = params._id;
  const [newOpt, setNewOpt] = useState("");
  const addOption = () => {
    setOpen(true);
    console.log("add", newOpt, params);
    dispatch(addNewPollOptionRequest({ _id, newOpt }));
    setNewOpt("");
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
  const add_new_poll_option_store = useSelector(
    (state) => state && state.add_new_poll_option_state
  );
  return (
    <Box className="flex justify-center mb-20 ">
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
      {add_new_poll_option_store.isSuccess ? (
        <>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Poll Option Added Successfully!
              </Alert>
            </Snackbar>
          </Stack>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AddNewPollOption;
