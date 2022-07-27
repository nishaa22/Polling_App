import { signUpSuccess, signUpError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* signup(action) {
  const { username, password, role } = action.payload;
  try {
    let response = yield call(
      axios.get,
      `https://secure-refuge-14993.herokuapp.com/add_user?username=${username}&password=${password}&role=${role}`
    );
     console.log(response,"response");

    if (response && response.data) {
      if (response.data.error === 0) {
        // console.log("signup saga");
        yield put(signUpSuccess({ response: response.data }));
        // localStorage.setItem("token", response.data.token)
      } else {
        yield put(
          signUpError({
            error: "Data not fetched",
            message: response.data.message,
          })
        );
      }
    }
  } catch (error) {
    yield put(signUpError({ error: "Data not fetched" }));
  }
}
export default signup;
