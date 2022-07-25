import { addNewPollSuccess, addNewPollError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* login(action) {
  const {  } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `https://secure-refuge-14993.herokuapp.com/add_poll?title=first%20polll&options=opt1____opt2____opt3____opt4`
    );

    // console.log(response, "login saga response....");
    console.log(response.data.data);
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
export default login;
