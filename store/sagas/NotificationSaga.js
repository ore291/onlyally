import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
    fetchNotificationsStart,
    fetchNotificationsSuccess,
    fetchNotificationsFailure
} from "../slices/notificationSlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* fetchNotificationAPI() {
  try {
    const inputData = yield select(
      (state) => state.notification.notification.inputData
    );
      const response = yield api.postMethod(
          {
              action: "bell_notifications_index",
              object: inputData
          }
    );
    if (response.data.success) {
      yield put(fetchNotificationsSuccess(response.data.data));
    } else {
      yield put(fetchNotificationsFailure(response.data.error));
      
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchNotificationsFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("notification/fetchNotificationsStart", fetchNotificationAPI),
  ]);
}