import {
  addNewPollSuccess,
  addNewPollError,
  viewPollRequest,
} from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
// import { BASE_URL } from "../config/baseUrl";
import {BASEURL} from "../baseUrl"
export function* addNewPoll(action) {
  const { title, options } = action.payload;
  let data;
  if (options.length > 1) {
    data = options.join("____");
  } else {
    data = options;
  }
  try {
    const response = yield call(
      axios.get,
      `${BASEURL.baseUrl}/add_poll?title=${title}&options=${data}`
    );
    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(addNewPollSuccess({ response: response.data }));
        yield put(viewPollRequest());
      } else {
        yield put(
          addNewPollError({
            error: "Data not fetched",
            message: response.data.data,
          })
        );
      }
    }
  } catch (error) {
    yield put(addNewPollError({ error: "Data not fetched" }));
  }
}
export default addNewPoll;
