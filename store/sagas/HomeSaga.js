import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";

var localStorage = require("localStorage");

import {
  fetchHomePostsStart,
  fetchHomePostsSuccess,
  fetchHomePostsFailure,
} from "../slices/homeSlice";

function* fetchHomePostAPI(action) {
  var accessToken = action.payload.accessToken;
  var userId = action.payload.userId;

  try {
    const skipCount = yield select((state) => state.home.homePost.skip);

    const response = yield api.postMethod("home", accessToken, userId, {
      skip: skipCount,
    });
    console.log(response);
    if (response.data.success) {
      yield put(fetchHomePostsSuccess(response.data.data));
      if (response.data.data.user) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "total_followers",
            response.data.data.user.total_followers
              ? response.data.data.user.total_followers
              : 0
          );
          localStorage.setItem(
            "total_followings",
            response.data.data.user.total_followings
              ? response.data.data.user.total_followings
              : 0
          );
          localStorage.setItem(
            "is_subscription_enabled",
            response.data.data.user.is_subscription_enabled
          );
          localStorage.setItem("user_picture", response.data.data.user.picture);
          localStorage.setItem("user_cover", response.data.data.user.cover);
          localStorage.setItem("name", response.data.data.user.name);
          localStorage.setItem("username", response.data.data.user.username);
          localStorage.setItem(
            "user_unique_id",
            response.data.data.user.user_unique_id
          );
          localStorage.setItem(
            "is_document_verified",
            response.data.data.user.is_document_verified
          );
        }
      }
    } else {
        yield put(fetchHomePostsFailure(response.data.error));
      //   const notificationMessage = getErrorNotificationMessage(
      //     response.data.error
      //   );
      //   yield put(checkLogoutStatus(response.data));
      //   yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    console.log(error)
        yield put(fetchHomePostsFailure(error));
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("home/fetchHomePostsStart", fetchHomePostAPI)]);
}
