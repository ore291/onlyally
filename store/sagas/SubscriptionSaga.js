import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchSubscriptionSuccess,
  fetchSubscriptionFailure,
  fetchMySubscriptionSuccess,
  fetchMySubscriptionFailure,
  fetchSingleSubscriptionSuccess,
  fetchSingleSubscriptionFailure,
  subscriptionPaymentWalletSuccess,
  subscriptionPaymentWalletFailure,
  subscriptionPaymentPaystackSuccess,
  subscriptionPaymentPaystackFailure,
  subscriptionAutoRenewalSuccess,
  subscriptionAutoRenewalFailure,
} from "../slices/subscriptionSlice";

function* getSubscriptionAPI() {
  try {
    const response = yield api.postMethod({ action: "subscriptions_index" });
    yield put(fetchSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSubscriptionFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* getMySubscriptionAPI() {
  try {
    const response = yield api.postMethod({ action: "subscriptions_history" });
    yield put(fetchMySubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchMySubscriptionFailure(error.message));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* getSingleSubscriptionAPI() {
  try {
    const subscriptionInputData = yield select(
      (state) => state.subscriptions.singleSubInputData.data
    );
    console.log("subsc", subscriptionInputData);
    const response = yield api.postMethod({
      action: "subscriptions_view",
      object: subscriptionInputData,
    });
    yield put(fetchSingleSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleSubscriptionFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* subscriptionPaymentPayStackAPI() {
    try {
      const subscriptionDetails = yield select(
        (state) => state.subscriptions.subPayPaystack.inputData
      );
      const response = yield api.postMethod(
        {action:
        "user_subscriptions_payment_by_stripe",
        object :
        subscriptionDetails
        });
      if (response.data.success) {
        yield put(subscriptionPaymentPaystackSuccess(response.data.data));
        yield put(notify({ message: response.data.message, status: "success" }));
        localStorage.setItem(
          "total_followers",
          JSON.stringify(response.data.data.total_followers)
        );
        localStorage.setItem(
          "total_followings",
          JSON.stringify(response.data.data.total_followings)
        );
        window.location.assign(`/profile/${subscriptionDetails.user_unique_id}`);
      } else {
        yield put(subscriptionPaymentPaystackFailure(response.data.error));
        yield put(notify({ message: response.data.error, status: "error" }));;
      }
    } catch (error) {
      yield put(subscriptionPaymentPaystackFailure(error));
      yield put(notify({ message: error.message, status: "error" }));
    }
  }
  
  
  
  function* subscriptionPaymentWalletAPI() {
    try {
      const subscriptionDetails = yield select(
        (state) => state.subscriptions.subPayWallet.inputData
      );
      const response = yield api.postMethod(
          {action :
        "user_subscriptions_payment_by_wallet", object :
        subscriptionDetails }
      );
  
      if (response.data.success) {
        yield put(subscriptionPaymentWalletSuccess(response.data.data));
        yield put(notify({ message: response.data.message, status: "success" }));
        localStorage.setItem(
          "total_followers",
          JSON.stringify(response.data.data.total_followers)
        );
        localStorage.setItem(
          "total_followings",
          JSON.stringify(response.data.data.total_followings)
        );
        window.location.assign(`${subscriptionDetails.user_unique_id}`);
      } else {
        yield put(subscriptionPaymentWalletFailure(response.data.error));
        yield put(notify({ message: response.data.error, status: "error" }));
      }
    } catch (error) {
      yield put(subscriptionPaymentWalletFailure(error));
      yield put(notify({ message: error.message, status: "error" }));
    }
  }
  
  function* subscriptionAutoRenewalAPI() {
    try {
      const subscriptionDetails = yield select(
        (state) => state.subscriptions.subscriptionRenew.inputData
      );
      const response = yield api.postMethod({
        action :
        "subscriptions_autorenewal_status", object :
        subscriptionDetails
      });
      yield put(subscriptionAutoRenewalSuccess(response.data.data));
      if (response.data.success) {
        yield put(notify({ message: response.data.message, status: "error" }));
        yield put(subscriptionAutoRenewalFailure(response.data.error));
      } else {
        yield put(notify({ message: response.data.error, status: "error" }));
      }
    } catch (error) {
      yield put(subscriptionAutoRenewalFailure(error));
      yield put(notify({ message: error.message, status: "error" }));
    }
  }
  

  

export default function* pageSaga() {
  yield all([yield takeLatest('subscriptions/fetchSubscriptionStart', getSubscriptionAPI)]);
  yield all([
    yield takeLatest('subscriptions/fetchMySubscriptionStart', getMySubscriptionAPI),
  ]);
  yield all([
    yield takeLatest('subscriptions/fetchSingleSubscriptionStart', getSingleSubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(
      'subscriptions/subscriptionPaymentPaystackStart',
      subscriptionPaymentPayStackAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      'subscriptions/subscriptionPaymentWalletStart',
      subscriptionPaymentWalletAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      'subscriptions/subscriptionAutoRenewalStart',
      subscriptionAutoRenewalAPI
    ),
  ]);
  // yield all([
  //   yield takeLatest(
  //     SUBSCRIPTION_PAYMENT_PAYPAL_START,
  //     subscriptionPaymentPaypalAPI
  //   ),
  // ]);
  // yield all([
  //   yield takeLatest(
  //     SUBSCRIPTION_PAYMENT_CCBILL_START,
  //     subscriptionPaymentCCBillAPI
  //   ),
  // ]);
  // yield all([
  //   yield takeLatest(
  //     SUBSCRIPTION_PAYMENT_COINPAYMENT_START,
  //     subscriptionPaymentCoinPaymentAPI
  //   ),
  // ]);
}
