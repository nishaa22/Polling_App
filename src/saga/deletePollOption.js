import {
  deletePollOptionSuccess,
  deletePollOptionError,
  viewPollRequest,
} from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";

export function* deletePollOption(action) {
  const { _id, option } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `${BASE_URL}/delete_poll_option?id=${_id}&option_text=${option}`
    );
    if (response && response.data) {
      yield put(deletePollOptionSuccess({ response: response.data }));
      yield put(viewPollRequest());
    } else {
      yield put(deletePollOptionError({ error: "Data not fetched" }));
    }
  } catch (error) {
    yield put(deletePollOptionError({ error: "Data not fetched" }));
  }
}
export default deletePollOption;
