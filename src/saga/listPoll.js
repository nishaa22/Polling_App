import {
  listPollSuccess,
  listPollError,
  viewPollRequest,
} from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
//  import { BASE_URL } from "../config/baseUrl";
import { BASEURL } from "../baseUrl";

export function* listPoll(action) {
  const { _id } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `${BASEURL.baseUrl}/list_poll?id=${_id}`
    );
    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(listPollSuccess({ response: response.data }));
      } else {
        yield put(
          listPollError({
            error: "Data not fetched",
            message: response.data.data,
          })
        );
      }
    }
  } catch (error) {
    yield put(listPollError({ error: "Data not fetched" }));
  }
}
export default listPoll;
