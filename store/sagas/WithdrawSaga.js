import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  fetchWithDrawalsSuccess,
  fetchWithDrawalsFailure,
  sendWithDrawRequestSuccess,
  sendWithDrawRequestFailure,
  cancelWithDrawRequestSuccess,
  cancelWithDrawRequestFailure,
  fetchSingleWithDrawalsSuccess,
  fetchSingleWithDrawalsFailure,
  searchWithDrawalsSuccess,
  searchWithDrawalsFailure,
  fetchWithDrawalsStart,

  sendWithDrawRequestStart,
  cancelWithDrawRequestStart,
  fetchSingleWithDrawalsStart,
  searchWithDrawalsStart,
} from "../slices/withdrawSlice";

import {fetchWalletDetailsStart} from "../slices/walletSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* fetchWithDrawAPI(action) {
  try {
    const response = yield api.postMethod({ action: "withdrawals_index" });

    if (response.data.success) {
      yield put(fetchWithDrawalsSuccess(response.data.data));
    } else {
      yield put(fetchWithDrawalsFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchWithDrawalsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* sendWithDrawRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.withdraw.sendWithDraw.inputData
    );
    const response = yield api.postMethod({
      action: "withdrawals_send_request",
      object: inputData,
    });

    if (response.data.success) {
      yield put(sendWithDrawRequestSuccess(response.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      yield put(fetchWithDrawalsStart());
      yield put(fetchWalletDetailsStart());
    } else {
      yield put(sendWithDrawRequestFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(sendWithDrawRequestFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* cancelWithDrawRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.withdraw.cancelWithDraw.inputData
    );
    const response = yield api.postMethod({
      action: "withdrawals_cancel_request",
      object: inputData,
    });

    if (response.data.success) {
      yield put(cancelWithDrawRequestSuccess(response.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      yield put(fetchWithDrawalsStart());
    } else {
      yield put(cancelWithDrawRequestFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(cancelWithDrawRequestFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchSingleWithDrawAPI() {
  try {
    const inputData = yield select(
      (state) => state.withdraw.singleWithDraw.inputData
    );
    const response = yield api.postMethod({
      action: "withdrawals_view",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchSingleWithDrawalsSuccess(response.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(fetchSingleWithDrawalsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleWithDrawalsFailure(error));
    yield put(
      notify({
        message: error.message,
        status: "error",
      })
    );
  }
}

function* searchWithDrawAPI() {
  try {
    const inputData = yield select(
      (state) => state.withdraw.searchWithDraw.inputData
    );
    const response = yield api.postMethod({
      action: "withdrawals_search",
      object: inputData,
    });

    if (response.data.success) {
      yield put(searchWithDrawalsSuccess(response.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(searchWithDrawalsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(searchWithDrawalsFailure(error));

    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("withdraw/fetchWithDrawalsStart", fetchWithDrawAPI),
  ]);
  yield all([
    yield takeLatest(
      "withdraw/sendWithDrawRequestStart",
      sendWithDrawRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "withdraw/cancelWithDrawRequestStart",
      cancelWithDrawRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "withdraw/fetchSingleWithDrawalsStart",
      fetchSingleWithDrawAPI
    ),
  ]);
  yield all([
    yield takeLatest("withdraw/searchWithDrawalsStart", searchWithDrawAPI),
  ]);
}
