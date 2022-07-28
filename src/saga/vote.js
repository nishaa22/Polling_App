import { voteSuccess, voteError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";

export function* vote(action) {
  const { _id, option } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `${BASE_URL}/do_vote?id=${_id}&option_text=${option}`
    );
    console.log(response, "vote api response.");
    if (response && response.data) {
      if (response.data.error===0) {
        yield put(voteSuccess({ response: response.data }));
      } else {
        yield put(voteError({ error: "Data not fetched" }));
      }
    }
  } catch (error) {
    yield put(voteError({ error: "Data not fetched" }));
  }
}
export default vote;
