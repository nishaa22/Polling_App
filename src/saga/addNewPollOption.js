import {
     addNewPollOptionSuccess,
     addNewPollOptionError,
     viewPollRequest,
   } from "../actions/index";
   import { put, call } from "@redux-saga/core/effects";
   import axios from "axios";
   import { BASE_URL } from "../config/baseUrl";
   
   export function* addNewPollOption(action) {
     const { _id,newOpt} = action.payload;
     try {
       const response = yield call(
         axios.get,
         `${BASE_URL}/add_new_option?id=${_id}&option_text=${newOpt}`
       );
       if (response && response.data) {
         if (response.data.error === 0) {
           yield put(addNewPollOptionSuccess({ response: response.data }));
           yield put(viewPollRequest());
         } else {
           yield put(
             addNewPollOptionError({
               error: "Data not fetched",
               message: response.data.data,
             })
           );
         }
       }
     } catch (error) {
       yield put(addNewPollOptionError({ error: "Data not fetched" }));
     }
   }
   export default addNewPollOption;
   