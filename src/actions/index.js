import { createAction } from "redux-actions";
import * as constant from "../constant";

export const signUpRequest = createAction(constant.SIGN_UP_REQUEST);
export const signUpSuccess = createAction(constant.SIGN_UP_SUCCESS);
export const signUpError = createAction(constant.SIGN_UP_ERROR);

export const logInRequest = createAction(constant.LOG_IN_REQUEST);
export const logInSuccess = createAction(constant.LOG_IN_SUCCESS);
export const logInError = createAction(constant.LOG_IN_ERROR);

export const viewPollRequest = createAction(constant.VIEW_POLL_REQUEST);
export const viewPollSuccess = createAction(constant.VIEW_POLL_SUCCESS);
export const viewPollError = createAction(constant.VIEW_POLL_ERROR);

export const addNewPollRequest = createAction(constant.ADD_NEW_POLL_REQUEST)
export const addNewPollSuccess = createAction(constant.ADD_NEW_POLL_SUCCESS)
export const addNewPollError = createAction(constant.ADD_NEW_POLL_ERROR)

export const deletePollRequest = createAction(constant.DELETE_POLL_REQUEST);
export const deletePollSuccess = createAction(constant.DELETE_POLL_SUCCESS);
export const deletePollError = createAction(constant.DELETE_POLL_ERROR);

export const listUsersRequest = createAction(constant.LIST_USERS_REQUEST);
export const listUsersSuccess = createAction(constant.LIST_USERS_SUCCESS);
export const listUsersError = createAction(constant.LIST_USERS_ERROR);

export const voteRequest = createAction(constant.VOTE_REQUEST);
export const voteSuccess = createAction(constant.VOTE_SUCCESS);
export const voteError = createAction(constant.VOTE_ERROR)

export const editPollRequest = createAction(constant.EDIT_POLL_REQUEST);
export const editPollSuccess = createAction(constant.EDIT_POLL_SUCCESS);
export const editPollError = createAction(constant.EDIT_POLL_ERROR);