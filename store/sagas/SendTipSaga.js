import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  sendTipByWalletFailure,
  sendTipByWalletSuccess,
  sendTipByPaystackFailure,
  sendTipBypPaystackSuccess
} from "../slices/sendTipSlice";


import { errorLogoutCheck } from "../slices/errorSlice";

function* sendTipPaystackAPI() {
  try {
    const inputData = yield select((state) => state.tips.tipPaystack.inputData);
    const response = yield api.postMethod({action : "tips_payment_by_paypal",object : inputData});
    if (response.data.success) {
      yield put(sendTipBypPaystackSuccess(response.data.data));
      yield put(notify({message : response.data.message, status : 'success'}));
    } else {
      yield put(sendTipByPaystackFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message : response.data.error, status : 'error'}));
    }
  } catch (error) {
    yield put(sendTipByPaystackFailure(error));
    yield put(notify({message : error.message, status : 'error'}));
  }
}


function* sendTipWalletAPI() {
  try {
    const inputData = yield select((state) => state.tips.tipWallet.inputData);
    const response = yield api.postMethod({action : "tips_payment_by_wallet", object : inputData});
    if (response.data.success) {
      yield put(sendTipByWalletSuccess(response.data.data));
      yield put(notify({message : response.data.message, status: "success"}));
    } else {
      yield put(sendTipByWalletFailure(response.data.error));
      yield put(notify({message : response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(sendTipByWalletFailure(error));
    yield put(notify({message : error.message, status: "error"}));
  }
}


export default function* pageSaga() {
  yield all([yield takeLatest('tips/sendTipByPaystackStart', sendTipPaystackAPI)]);
  yield all([yield takeLatest('tips/sendTipByWalletStart', sendTipWalletAPI)]);
}
