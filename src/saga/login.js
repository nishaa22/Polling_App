import { logInSuccess, logInError } from "../actions/index"
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* login(action) {

    const { username, password } = action.payload;
    try {
        const response = yield call(
            axios.get, `https://secure-refuge-14993.herokuapp.com/login?username=${username}&password=${password}`
        );


        if (response && response.data) {
            yield put(logInSuccess({ response: response.data }))
            localStorage.setItem("token", response.data.token)
        }
        else {
            yield put(logInError({ error: "Data not fetched" }))
        }
    }
    catch (error) {
        yield put(logInError({ error: "Data not fetched" }))

    }
}
export default login;