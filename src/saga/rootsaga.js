import { fork, all, takeLatest } from "redux-saga/effects";
import { login } from "./login";
import { signup } from "./signup";
import * as action from "../constant";
import viewPolls from "./viewPolls";
import addNewPoll from "./addNewPoll";

function* signupBind() {
  yield takeLatest(action.SIGN_UP_REQUEST, signup);
}

function* loginBind() {
  yield takeLatest(action.LOG_IN_REQUEST, login);
}

function* viewPollBind() {
  yield takeLatest(action.VIEW_POLL_REQUEST, viewPolls);
}

function* addNewPollBind() {
  yield takeLatest(action.ADD_NEW_POLL_REQUEST, addNewPoll);
}
export default function* rootsaga() {
  yield all([fork(signupBind), fork(loginBind), fork(viewPollBind),fork(addNewPollBind)]);
}
