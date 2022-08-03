import { listUsersSuccess, listUsersError } from "../actions/index";
import { put, call } from "@redux-saga/core/effects";
import axios from "axios";
// import { BASE_URL } from "../config/baseUrl";
import { BASEURL } from "../baseUrl";

export function* listUsers(action) {
  try {

    const response = yield call(axios.get, `${BASEURL.baseUrl}/list_users`);
    console.log(response, "CCCCCCCccc");

    if (response && response.data) {
      if (response.data.error === 0) {
        yield put(listUsersSuccess({ response: response.data }));
      } else {
        yield put(listUsersError({ error: "Data not fetched" }));
      }
    }
  } catch (error) {
    console.log(error, "CCCCCCCccc");

    yield put(listUsersError({ error: "Data not fetched" }));
  }
}
export default listUsers;
