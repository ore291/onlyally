import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";

import {notify} from 'reapop';

import {errorLogoutCheck} from '../slices/errorSlice';

import {
    fetchWalletDetailsSuccess,
    fetchWalletDetailsFailure,
    addMoneyViaCardSuccess,
    addMoneyViaCardFailure
} from '../slices/walletSlice';

function* fetchWalletDetailsAPI() {
    try {
      const response = yield api.postMethod({action :"wallets_index"});
      if (response.data.success) {
        yield put(fetchWalletDetailsSuccess(response.data.data));
        // Do nothing
      } else {
        yield put(errorLogoutCheck(response.data));
        yield put(fetchWalletDetailsFailure(response.data.error));
        yield put(createNotification({message: response.data.error, type: "error"}));
      }
    } catch (error) {
      yield put(fetchWalletDetailsFailure(error));
      yield put(notify({message: error.response.data.error, type: "error"}))
    }
  }
  
  function* addMoneyViaCardAPI() {
    try {
      const inputData = yield select((state) => state.wallet.addMoneyInput.data);
      const response = yield api.postMethod(
        {action :"wallets_add_money_by_stripe",
        object : inputData}
      );
      if (response.data.success) {
        yield put(addMoneyViaCardSuccess(response.data.data));
        yield put(notify({message: response.data.message, type: "success"}))
        window.location.assign("/wallet");
      } else {
        yield put(addMoneyViaCardFailure(response.data.error));
        yield put(notify({message: response.data.error, type: "error"}))
      }
    } catch (error) {
      yield put(addMoneyViaCardFailure(error));
      yield put(notify({message: error.response.data.error, type: "error"}))
    }
  }
  

  export default function* pageSaga() {
    yield all([
      yield takeLatest('wallet/fetchWalletDetailsStart', fetchWalletDetailsAPI),  
      yield takeLatest('wallet/addMoneyViaCardStart', addMoneyViaCardAPI),
     
    ]);
  }