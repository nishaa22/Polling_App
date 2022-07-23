import { signUpSuccess, signUpError } from "../actions/index"
import { put, call } from "@redux-saga/core/effects";
import axios from "axios"

export function* signup(action) {
    const { username, password, role } = action.payload;
    try {
        let response = yield call(
            axios.get, `https://secure-refuge-14993.herokuapp.com/add_user?username=${username}&password=${password}&role=${role}`
        );
console.log(response.data.message,"saga signup@@@@@@@@@@@@@")

        if (response && response.data) {
            console.log("signup saga")
            yield put(signUpSuccess({ response: response.data }))

            localStorage.setItem("Registered user", JSON.stringify(response))

        }
        else {
            yield put(signUpError({ message: response.data.message }))
        }
    }
    catch (error) {
        yield put(signUpError({ error: "data not fetched" }))
    }
}
export default signup;