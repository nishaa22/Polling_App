import { logInSuccess, logInError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import { BASE_URL } from "../config/baseUrl";
import { BASEURL } from "../baseUrl";
export function* login(action) {
  const { username, password } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `${BASEURL.baseUrl}/login?username=${username}&password=${password}`
    );
    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(logInSuccess({ response: response.data }));
        var token = response.data.token;
        var decoded = jwt_decode(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userType", decoded.role);
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
