import login from "./login";
import signup from "./signup";
import { combineReducers } from "redux";
import viewPolls from "./viewPolls";
import addNewPoll from "./addNewPoll"
import listUsers from "./listUsers"
import deletePoll from "./deletePoll";
import vote from "./vote"
import editPoll from "../saga/editPoll";
import deletePollOption from "./deletePollOption";
import listPoll from "./listPoll";
import addNewPollOption from "./addNewPollOption";
const rootreducer = combineReducers({
  api_state: signup,
  login_state: login,
  view_poll_state: viewPolls,
  add_new_poll_state : addNewPoll,
  user_list_state : listUsers,
  delete_poll_state : deletePoll,
  vote_state : vote,
  update_poll_state :editPoll,
  delete_poll_option_state :deletePollOption,
  list_a_poll_state :listPoll,
  add_new_poll_option_state : addNewPollOption
});
export default rootreducer;
