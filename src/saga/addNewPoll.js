import { addNewPollSuccess, addNewPollError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* addNewPoll(action) {
  const { title,opt1,opt2,opt3,opt4 } = action.payload;
  console.log(action.payload,"saga payload")
  try {
    const response = yield call(
      axios.get,
      `https://secure-refuge-14993.herokuapp.com/add_poll?title=${title}&options=${opt1}____${opt2}____${opt3}____${opt4}`
    );
    // console.log(response, "login saga response....");
    if (response && response.data) {
      if (response.data.error === 0) {
        // console.log("signup saga");
        yield put(addNewPollSuccess({ response: response.data }));
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
