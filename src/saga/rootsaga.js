import { fork, all, takeLatest } from "redux-saga/effects";
import {login} from "./login"
import {signup} from "./signup"
import * as action from "../constant"

function* signupBind(){
     yield takeLatest(action.SIGN_UP_REQUEST, signup)
}

function* loginBind(){
     yield takeLatest(action.LOG_IN_REQUEST, login)
}

export default function* rootsaga(){
     yield all([fork(signupBind),fork(loginBind)])
}