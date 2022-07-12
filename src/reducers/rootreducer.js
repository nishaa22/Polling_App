import login from "./login"
import signup from "./signup"
import { combineReducers } from "redux";

const rootreducer = combineReducers({
     api_state : signup,
     login_state : login
})
export default rootreducer