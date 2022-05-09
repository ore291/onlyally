import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";

import {
  fetchCardDetailsSuccess,
  fetchCardDetailsFailure,
  deleteCardSuccess,
  deleteCardFailure,
  selectDefaultCardSuccess,
  selectDefaultCardFailure,
  fetchCardDetailsStart,
} from "../slices/cardsSlice";

import api from "../../Environment";

import { notify } from "reapop";

import { errorLogoutCheck } from "../slices/errorSlice";

function* getCardDetailsAPI() {
  try {
    const response = yield api.postMethod({ action: "cards_list" });

    if (response.data.success) {
      yield put(fetchCardDetailsSuccess(response.data.data));
    } else {
      yield put(fetchCardDetailsFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status :"error" }));
    }
  } catch (error) {
    yield put(fetchCardDetailsFailure(error));
    yield put(notify({ message: error.message, status :"error" }));
  }
}

function* deleteCardAPI() {
  try {
    const deleteCard = yield select((state) => state.cards.deleteCard.data);
    const response = yield api.postMethod({
      action: "cards_delete",
      object: deleteCard,
    });
    yield put(deleteCardSuccess(response.data.data));
    if (response.data.success) {
      yield put(notify({ message: response.data.message, status :"error" }));
      yield put(fetchCardDetailsStart());
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status :"error" }));
    }
  } catch (error) {
    yield put(deleteCardFailure(error));
    yield put(notify({ message: error.message, status :"error" }));
  }
}

function* selectDefaultCardAPI() {
  try {
    const selectDefaultCard = yield select(
      (state) => state.cards.selectDefaultCard.inputData
    );
    const response = yield api.postMethod({
      action: "cards_default",
      object: selectDefaultCard,
    });
    yield put(selectDefaultCardSuccess(response.data.data));
    if (response.data.success) {
      yield put(notify({ message: response.data.message, status :"success" }));
      yield put(fetchCardDetailsStart());
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status :"error" }));
    }
  } catch (error) {
    yield put(selectDefaultCardFailure(error));
    yield put(notify({ message: error.message, status :"error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("cards/fetchCardDetailsStart", getCardDetailsAPI),
  ]);
  yield all([yield takeLatest("cards/deleteCardStart", deleteCardAPI)]);
  yield all([
    yield takeLatest("cards/selectDefaultCardStart", selectDefaultCardAPI),
  ]);
}
