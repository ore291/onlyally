import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { signOut } from "next-auth/react"
const errorCode = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007];

import {notify} from 'reapop';

import errorLogoutCheck from "../slices/errorSlice";


function* logoutStatusCheck() {
    try {
      const inputData = yield select((state) => state.errorDetails.error);
      console.log("Error Check started", inputData);

      if (errorCode.indexOf(inputData.error_code) !== -1) {
        if (typeof window !== "undefined") {
        console.log("Error Check true");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userLoginStatus");
        localStorage.removeItem("user_picture");
        localStorage.removeItem("username");
        localStorage.removeItem("socket");
        localStorage.removeItem("user_cover");
        localStorage.removeItem("name");
        localStorage.removeItem("user_unique_id");
        localStorage.removeItem("is_document_verified");
        localStorage.removeItem("is_verified_badge");
        localStorage.removeItem("is_two_step_auth_enabled");
        localStorage.removeItem("is_content_creator");
        localStorage.removeItem("default_payment_method");
        localStorage.removeItem("emailId");
        localStorage.removeItem("total_followers");
        localStorage.removeItem("total_followings");
        localStorage.removeItem("is_subscription_enabled");

        }
        yield put(notify({message: inputData.error, status:"error"}));
        setTimeout(() => {
            signOut();
          }, 300);

       
      } else {
        console.log("Error Check false");
        //   const notificationMessage = getErrorNotificationMessage(
        //     response.data.error
        //   );
        //   yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      console.log("Error Check false", error);
    }
  }
  
  export default function* pageSaga() {
    yield all([yield takeLatest('errorDetails/errorLogoutCheck', logoutStatusCheck)]);
  }