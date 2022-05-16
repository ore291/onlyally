import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  chatAssetFileUploadSuccess,
  chatAssetFileUploadFailure,
  chatAssetPaymentPaystackSuccess,
  chatAssetPaymentPaystackFailure,
  chatAssetPaymentWalletSuccess,
  chatAssetPaymentWalletFailure,
} from "../slices/chatAssetSlice";

import { errorLogoutCheck } from "../slices/errorSlice";
import { fetchChatMessageStart } from "../slices/chatSlice";

function* chatAssetFileUploadAPI() {
  try {
    const inputData = yield select(
      (state) => state.chatAsset.chatAssetInputData.inputData
    );
    const response = yield api.postMethod({action :"chat_assets_save", object : inputData});
    if (response.data.success) {
      console.log(response.data.data);
      yield put(chatAssetFileUploadSuccess(response.data.data));
    } else {
      yield put(chatAssetFileUploadFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(chatAssetFileUploadFailure(error));
    yield put(notify({message: error.message, status:"error"}));
  }
}

function* chatAssetPaymentPaystackAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.chatAsset.chatAssetPayStripe.inputData
    );
    const response = yield api.postMethod(
     { action :  "chat_assets_payment_by_stripe",
      object : paymentInputData }
    );
    if (response.data.success) {
      console.log(response.data.data);
      yield put(chatAssetPaymentPaystackSuccess(response.data.data));
      yield put(notify({message: response.data.message , status: 'success'}));
      yield put(
        fetchChatMessageStart({
          to_user_id: response.data.data.chat_message.to_user_id,
          from_user_id: response.data.data.chat_message.from_user_id,
        })
      );
    } else {
      yield put(chatAssetPaymentPaystackFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(chatAssetPaymentPaystackFailure(error));
    yield put(notify({message: error.message, status:"error"}));
  }
}


function* chatAssetPaymentWalletAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.chatAsset.chatAssetPayWallet.inputData
    );
    const response = yield api.postMethod({
     action :  "chat_assets_payment_by_wallet",
      object : paymentInputData}
    );

    if (response.data.success) {
      yield put(chatAssetPaymentWalletSuccess(response.data.data));
      yield put(notify({message: response.data.message , status: 'success'}));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(chatAssetPaymentWalletFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error , status: "error"}));
    }
  } catch (error) {
    yield put(chatAssetPaymentWalletFailure(error));
    yield put(notify({message: error.message, status:"error"}));
  }
}
export default function* pageSaga() {
  yield all([
    yield takeLatest("chatAsset/chatAssetFileUploadStart", chatAssetFileUploadAPI),
  ]);
  yield all([
    yield takeLatest(
      "chatAsset/chatAssetPaymentPaystackStart",
      chatAssetPaymentPaystackAPI
    ),
  ]);
}
