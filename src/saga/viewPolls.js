import { viewPollSuccess, viewPollError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
// import { BASE_URL } from "../config/baseUrl";
import { BASEURL } from "../baseUrl";

export function* viewPolls(action) {
  try {
    const response = yield call(axios.get, `${BASEURL.baseUrl}/list_polls`);

    if (response && response.data) {
      yield put(viewPollSuccess({ response: response.data }));
    } else {
      yield put(viewPollError({ error: "Data not fetched" }));
    }
  } catch (error) {
    yield put(viewPollError({ error: "Data not fetched" }));
  }
}
export default viewPolls;
