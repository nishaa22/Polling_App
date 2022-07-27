import { deletePollSuccess, deletePollError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* deletePoll(action) {
    const {_id}=action.payload;
    console.log(_id)
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BASE_URL}/delete_poll?id=${_id}`
    );
console.log(response)
    if (response && response.data) {
      yield put(deletePollSuccess({ response: response.data }));
    } else {
      yield put(deletePollError({ error: "Data not fetched" }));
    }
  } catch (error) {
    yield put(deletePollError({ error: "Data not fetched" }));
  }
}
export default deletePoll;
