import login from "./login";
import signup from "./signup";
import { combineReducers } from "redux";
import viewPolls from "./viewPolls";
import addNewPoll from "./addNewPoll"

const rootreducer = combineReducers({
  api_state: signup,
  login_state: login,
  view_poll_state: viewPolls,
  add_new_poll_state : addNewPoll
});
export default rootreducer;
