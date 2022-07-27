import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import {addNewPollRequest} from "../actions/index"
import { useDispatch, useSelector} from "react-redux";
const AddNewPoll = () => {
  const dispatch = useDispatch();
     const [addPoll, setAddPoll]= useState({
       title:"",
       opt1:"",
       opt2:"",
       opt3:"",
       opt4:"",
     })
     const handleAddNewPollData =(e,key)=>{
       setAddPoll({...addPoll,[key]:e.target.value})
     }
     const handleAddPollSubmit=(e)=>{
       e.preventDefault();
       if(addPoll.title&&addPoll.opt1&&addPoll.opt2&&addPoll.opt3&&addPoll.opt4){
       dispatch(addNewPollRequest({...addPoll}))
       }
     }
     const add_new_poll_store = useSelector((state)=>state.add_new_poll_state);
     console.log(add_new_poll_store,"add new poll store...")
     console.log(addPoll,"add poll data")
  return (
    <div>
      <div className="w-1/5 mt-32 flex justify-center items-center mx-auto">
        <FormControl>
          {/* <h1 className="text-center mb-3">SignUp</h1> */}
          <form onSubmit={handleAddPollSubmit}>
            <TextField
              fullWidth
              label="Title"
              type="text"
              onChange={(e)=>handleAddNewPollData(e,"title")}
              //   onChange={(e) => handleRegisterData(e, "username")}
            />

            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 1"
              fullWidth
              variant="standard"
              onChange={(e)=>handleAddNewPollData(e,"opt1")}

            />
            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 2"
              fullWidth
              variant="standard"
              onChange={(e)=>handleAddNewPollData(e,"opt2")}

            />
            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 3"
              fullWidth
              variant="standard"
              onChange={(e)=>handleAddNewPollData(e,"opt3")}

            />
            <TextField
              id="standard-basic"
              className="mt-3"
              label="Option 4"
              fullWidth
              variant="standard"
              onChange={(e)=>handleAddNewPollData(e,"opt4")}

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
