import { addNewPollSuccess, addNewPollError, listUsersSuccess } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* addNewPoll(action) {
  const { title, opt1, opt2, opt3, opt4 } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BASE_URL}/add_poll?title=${title}&options=${opt1}____${opt2}____${opt3}____${opt4}`
    );
    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(addNewPollSuccess({ response: response.data }));
        // yield put(listUsersSuccess())
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
