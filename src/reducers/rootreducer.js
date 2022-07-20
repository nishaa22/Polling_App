import login from "./login"
import signup from "./signup"
import { combineReducers } from "redux";
import viewPolls from "./viewPolls";

const rootreducer = combineReducers({
     api_state : signup,
     login_state : login,
     view_poll_state : viewPolls
})
export default rootreducer