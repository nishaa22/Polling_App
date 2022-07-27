import { signUpSuccess, signUpError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";

export function* signup(action) {
  const { username, password, role } = action.payload;
  try {
    let response = yield call(
      axios.get,
      `${process.env.REACT_APP_BASE_URL}/add_user?username=${username}&password=${password}&role=${role}`
    );

    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(signUpSuccess({ response: response.data }));
        localStorage.setItem("role", response.data.data.role);
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
