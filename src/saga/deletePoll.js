import {
  deletePollSuccess,
  deletePollError,
  viewPollRequest,
} from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";

export function* deletePoll(action) {
  const { _id } = action.payload;
  try {
    const response = yield call(axios.get, `${BASE_URL}/delete_poll?id=${_id}`);
    if (response && response.data) {
      yield put(deletePollSuccess({ response: response.data }));
      yield put(viewPollRequest());
    } else {
      yield put(deletePollError({ error: "Data not fetched" }));
    }
  } catch (error) {
    yield put(deletePollError({ error: "Data not fetched" }));
  }
}
export default deletePoll;
