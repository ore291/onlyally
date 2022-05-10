import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from "../slices/AlertSlice";

function* fetchNotificationAPI() {
  try {
    const inputData = yield select(
      (state) => state.alert.notification.inputData
    );
    const response = yield api.postMethod({
      action: "bell_notifications_index",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchNotificationsSuccess(response.data.data));
    } else {
      yield put(fetchNotificationsFailure(response.data.error));
      yield put(notify({message:  response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(fetchNotificationsFailure(error));
    yield put(notify({message: error.message, status: "error"}));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("alert/fetchNotificationsStart", fetchNotificationAPI),
  ]);
}
