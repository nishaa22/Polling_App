import { fork, all, takeLatest } from "redux-saga/effects";
import { login } from "./login";
import { signup } from "./signup";
import * as action from "../constant";
import { viewPolls } from "./viewPolls";
import { addNewPoll } from "./addNewPoll";
import { deletePoll } from "./deletePoll";
import { listUsers } from "./listUsers";
import { vote } from "./vote";
function* signupSaga() {
  yield takeLatest(action.SIGN_UP_REQUEST, signup);
}

function* loginSaga() {
  yield takeLatest(action.LOG_IN_REQUEST, login);
}

function* viewPollSaga() {
  yield takeLatest(action.VIEW_POLL_REQUEST, viewPolls);
}

function* addNewPollSaga() {
  yield takeLatest(action.ADD_NEW_POLL_REQUEST, addNewPoll);
}

function* deletePollSaga() {
  yield takeLatest(action.DELETE_POLL_REQUEST, deletePoll);
}

function* listUsersSaga() {
  yield takeLatest(action.LIST_USERS_REQUEST, listUsers);
}

function* voteSaga() {
  yield takeLatest(action.VOTE_REQUEST, vote);
}

export default function* rootsaga() {
  yield all([
    fork(signupSaga),
    fork(loginSaga),
    fork(viewPollSaga),
    fork(addNewPollSaga),
    fork(deletePollSaga),
    fork(listUsersSaga),
    fork(voteSaga),
  ]);
}
