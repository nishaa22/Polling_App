import { viewPollSuccess, viewPollError } from "../actions/index"
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* viewPolls(action) {
    try {
        const response = yield call(
            axios.get, `https://secure-refuge-14993.herokuapp.com/list_polls`
        );


        if (response && response.data) {
            yield put(viewPollSuccess({ response: response.data }))
            // localStorage.setItem("token",response.data.token)
        }
        else {
            yield put(viewPollError({ error: "Data not fetched" }))
        }
    }
    catch (error) {
        yield put(viewPollError({ error: "Data not fetched" }))

    }
}
export default viewPolls;