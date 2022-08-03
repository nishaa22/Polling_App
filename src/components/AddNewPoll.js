import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { addNewPollRequest } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
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
const AddNewPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [addPoll, setAddPoll] = useState({
    title: "",
    options: [" "],
  });
  const handleAddNewPollData = (e, key) => {
    setAddPoll({ ...addPoll, [key]: e.target.value });
  };
  const handleAddPollSubmit = (e) => {
    e.preventDefault();
    if (addPoll.title && addPoll.options) {
      dispatch(addNewPollRequest({ ...addPoll }));
    }
  };
  const add_new_poll_store = useSelector((state) => state.add_new_poll_state);
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(true);
    setTimeout(() => navigate("/admin"), 1000);
  };
  useEffect(() => {
    if (add_new_poll_store.isSuccess) {
      setOpen(true);
      navigate("/admin");
    }
    return;
  }, [add_new_poll_store]);
  // useEffect(() => {
  //   // console.log("unmounted");
  //   dispatch(addNewPollRequest(false));
  // }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handlePollOptionData = (index, e) => {
    const updatedOptions = addPoll.options.map((val, elementIndex) => {
      if (elementIndex === index) {
        return e.target.value;
      } else {
        return val;
      }
    });
    setAddPoll((prev) => {
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };
  const addOptions = () => {
    setAddPoll((prev) => {
      return {
        ...prev,
        options: [...prev.options, " "],
      };
    });
  };

  const deleteOption = (index) => {
    const updatedOptions = addPoll.options.filter(
      (opt, elementIndex) => elementIndex !== index
    );
    setAddPoll((prev) => {
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  return (
    <div>
      <div className="w-1/3 mt-32 flex justify-center items-center mx-auto border-1 shadow-lg px-5 py-3">
        <FormControl>
          <form onSubmit={handleAddPollSubmit}>
            <TextField
              fullWidth
              required
              id="standard-basic"
              label="Title"
              type="text"
              variant="standard"
              onChange={(e) => handleAddNewPollData(e, "title")}
            />
            {addPoll.options.length <= 4 &&
              addPoll.options.map((opt, index) => {
                return (
                  <>
                    <Box className="flex justify-between">
                      <TextField
                        key="index"
                        id="standard-basic"
                        className="mt-3"
                        label="Option "
                        fullWidth
                        required
                        variant="standard"
                        value={opt.options}
                        onChange={(e) => handlePollOptionData(index, e)}
                      />
                      <Box className="mt-3 ml-5">
                        <IconButton className={classes.customHoverFocus}>
                          <DeleteIcon onClick={() => deleteOption(index)} />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                );
              })}
            {addPoll.options.length < 4 ? (
              <Button onClick={addOptions}>Add More Options</Button>
            ) : (
              ""
            )}
            <br />
            <Button
              type="submit"
              className="my-3 text-white bg-gradient-to-r from-cyan-500 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center mb-2"
              // onClick={handleClick}
            >
              {add_new_poll_store.isLoading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Add new poll"
              )}
            </Button>
            {/* {add_new_poll_store.isSuccess?handleSuccess():""} */}
            &nbsp; &nbsp;
            <Button
              type="submit"
              className="my-3 text-white bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            {add_new_poll_store.isSuccess ? (
              <>
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Poll Added Successfully!
                    </Alert>
                  </Snackbar>
                </Stack>
              </>
            ) : (
              ""
            )}
          </form>
        </FormControl>
      </div>
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

export default AddNewPoll;
