import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";

import { notify } from "reapop";

import { errorLogoutCheck } from "../slices/errorSlice";

import {
  fetchWalletDetailsSuccess,
  fetchWalletDetailsFailure,
  addMoneyViaPaystackSuccess,
  addMoneyViaPaystackFailure,
  initializePaystackSuccess,
  initializePaystackFailure,
  setPaystackInfo
} from "../slices/walletSlice";

function* fetchWalletDetailsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.postMethod({
      action: "wallets_index",
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchWalletDetailsSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(fetchWalletDetailsFailure(response.data.error));
      yield put(
        createNotification({ message: response.data.error, status: "error" })
      );
    }
  } catch (error) {
    yield put(fetchWalletDetailsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* addMoneyViaPaystackAPI(action) {

  try {
    const response = yield api.postMethod({
      action: "fund_wallet_by_paystack/initialize",
      object: {
        amount: action.payload
      },
    });
    console.log(response);
    if (response.data.success) {
      yield put(initializePaystackSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      yield put(setPaystackInfo(response.data.data.user_wallet_payment_unique_id))
      // window.location.assign("/payment/wallet");
    } else {
      yield put(initializePaystackFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(initializePaystackFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}
// function* addMoneyViaPaystackAPI() {
//   try {
//     const inputData = yield select((state) => state.wallet.addMoneyInput.data);
//     const response = yield api.postMethod({
//       action: "wallets_add_money_by_paypal",
//       object: inputData,
//     });
//     console.log(response);
//     if (response.data.success) {
//       yield put(addMoneyViaPaystackSuccess(response.data.data));
//       yield put(notify({ message: response.data.message, status: "success" }));
//       window.location.assign("/payment/wallet");
//     } else {
//       yield put(addMoneyViaPaystackFailure(response.data.error));
//       yield put(notify({ message: response.data.error, status: "error" }));
//     }
//   } catch (error) {
//     yield put(addMoneyViaPaystackFailure(error));
//     yield put(notify({ message: error.message, status: "error" }));
//   }
// }

export default function* pageSaga() {
  yield all([
    yield takeLatest("wallet/fetchWalletDetailsStart", fetchWalletDetailsAPI),
    yield takeLatest("wallet/addMoneyViaPaystackStart", addMoneyViaPaystackAPI),
  ]);
}
