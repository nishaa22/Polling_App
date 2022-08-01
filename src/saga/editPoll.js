import {
     editPollSuccess,
     editPollError,
     viewPollRequest,
   } from "../actions/index";
   import { put, call } from "@redux-saga/core/effects";
   import axios from "axios";
   import { BASE_URL } from "../config/baseUrl";
   
   export function* editPoll(action) {
     const [ params, title ] = action.payload;
     console.log(title, "new Title");
     try {
       const response = yield call(
         axios.get,
         `${BASE_URL}/update_poll_title?id=${params._id}&title=${title}`
       );
       console.log("update poll response", response);
       if (response && response.data) {
         if (response.data.error === 0) {
           yield put(editPollSuccess({ response: response.data }));
          //  yield put(viewPollRequest());
         } else {
           yield put(
             editPollError({
               error: "Data not fetched",
               message: response.data.data,
             })
           );
         }
       }
     } catch (error) {
       yield put(editPollError({ error: "Data not fetched" }));
     }
   }
   export default editPoll;
   