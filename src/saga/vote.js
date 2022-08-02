import { voteSuccess, voteError, viewPollRequest } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
// import { BASE_URL } from "../config/baseUrl";
import { BASEURL } from "../baseUrl";

export function* vote(action) {
  const { _id, option } = action.payload;
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = yield call(
      axios.get,
      `${BASEURL.baseUrl}/do_vote?id=${_id}&option_text=${option}`,
      {
        headers: {
          access_token: `${token}`,
        },
      }
    );
    console.log(response, "vote api response.");
    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(voteSuccess({ response: response.data }));
        yield put(viewPollRequest());
      } else {
        yield put(voteError({ error: "Data not fetched" }));
      }
    }
  } catch (error) {
    yield put(voteError({ error: "Data not fetched" }));
  }
}
export default vote;
