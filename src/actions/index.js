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