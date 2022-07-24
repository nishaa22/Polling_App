import { logInSuccess, logInError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* login(action) {
  const { username, password } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `https://secure-refuge-14993.herokuapp.com/login?username=${username}&password=${password}`
    );

    // console.log(response, "login saga response....");
    console.log(response.data.data);
    if (response && response.data) {
      if (response.data.error === 0) {
        // console.log("signup saga");
        yield put(logInSuccess({ response: response.data }));
      } else {
        yield put(
          logInError({
            error: "Data not fetched",
            message: response.data.data,
          })
        );
      }
    }
  } catch (error) {
    yield put(logInError({ error: "Data not fetched" }));
  }
}
export default login;
