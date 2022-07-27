import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  fetchAllTransactionSuccess,
  fetchAllTransactionFailure,
  fetchAllTransactionStart,
  fetchSentPaymentTransactionSuccess,
  fetchSentPaymentTransactionFailure,
  fetchSentPaymentTransactionStart,
  fetchReceivedPaymentTransactionSuccess,
  fetchReceivedPaymentTransactionFailure,
  fetchReceivedPaymentTransactionStart,
  fetchDepositTransactionSuccess,
  fetchDepositTransactionFailure,
  fetchDepositTransactionStart,
} from "../slices/transactionSlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* fetchAllTransactionAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
      const response = yield api.postMethod({ action: "wallets_history", accessToken : accessToken});
    if (response.data.success) {
      yield put(fetchAllTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(fetchAllTransactionFailure(response.data.error));
      yield put(notify({message:response.data.error,status:"error"}));
    }
  } catch (error) {
      yield put(fetchAllTransactionFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchSentPaymentTransAPI(action) {
  try {
      const response = yield api.postMethod({
          action: "wallets_history_for_sent",
          
      });
    if (response.data.success) {
      yield put(fetchSentPaymentTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(fetchSentPaymentTransactionFailure(response.data.error));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchSentPaymentTransactionFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchReceivedPayTransAPI(action) {
  try {
      const response = yield api.postMethod({
          action: "wallets_history_for_received",
          
      });
    if (response.data.success) {
      yield put(fetchReceivedPaymentTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(fetchReceivedPaymentTransactionFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchReceivedPaymentTransactionFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchDepositTransactionAPI(action) {
  try {
      const response = yield api.postMethod({
          action: "wallets_history_for_add",
        
      });
    if (response.data.success) {
      yield put(fetchDepositTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(fetchDepositTransactionFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchDepositTransactionFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest('transaction/fetchAllTransactionStart', fetchAllTransactionAPI),
    yield takeLatest(
      'transaction/fetchSentPaymentTransactionStart',
      fetchSentPaymentTransAPI
    ),
    yield takeLatest(
      'transaction/fetchReceivedPaymentTransactionStart',
      fetchReceivedPayTransAPI
    ),
    yield takeLatest(
      'transaction/fetchDepositTransactionStart',
      fetchDepositTransactionAPI
    ),
  ]);
}