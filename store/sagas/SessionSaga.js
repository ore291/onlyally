import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  fetchSessionManagementListSuccess,
  fetchSessionManagementListFailure,
  deleteAllLoginSessionSuccess,
  deleteAllLoginSessionFailure,
  deleteSingleLoginSessionSuccess,
  deleteSingleLoginSessionFailure,
} from "../slices/sessionSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* fetchSessionListAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "login_session_index",
      object: action.payload,
    });
    if (response.data.success) {
      yield put(fetchSessionManagementListSuccess(response.data.data));
    } else {
      yield put(fetchSessionManagementListFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSessionManagementListFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteSingleLoginSessionAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "login_session_delete",
      object: action.payload,
    });
    if (response.data.success) {
      yield put(deleteSingleLoginSessionSuccess(response.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(deleteSingleLoginSessionFailure(response.data.error));

      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(deleteSingleLoginSessionFailure(error));

    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteAllLoginSessionAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "login_session_delete_all",
      object: action.payload,
    });
    if (response.data.success) {
      yield put(deleteAllLoginSessionSuccess(response.data));

      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(deleteAllLoginSessionFailure(response.data.error));

      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(deleteAllLoginSessionFailure(error));

    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(
      "session/fetchSessionManagementListStart",
      fetchSessionListAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "session/deleteSingleLoginSessionStart",
      deleteSingleLoginSessionAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "session/deleteAllLoginSessionStart",
      deleteAllLoginSessionAPI
    ),
  ]);
}
