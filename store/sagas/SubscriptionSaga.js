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
      yield put(notify({ message: response.data.error, type: "error" }));
    }
  } catch (error) {
    yield put(fetchSubscriptionFailure(error));
    yield put(notify({ message: error.message, type: "error" }));
  }
}

function* getMySubscriptionAPI() {
  try {
    const response = yield api.postMethod({ action: "subscriptions_history" });
    yield put(fetchMySubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      yield put(notify({ message: response.data.error, type: "error" }));
    }
  } catch (error) {
    yield put(fetchMySubscriptionFailure(error.message));
    yield put(notify({ message: error.message, type: "error" }));
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
      yield put(notify({ message: response.data.error, type: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleSubscriptionFailure(error));
    yield put(notify({ message: error.message, type: "error" }));
  }
}

function* subscriptionPaymentStripeAPI() {
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
        yield put(notify({ message: response.data.message, type: "success" }));
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
        yield put(notify({ message: response.data.error, type: "error" }));;
      }
    } catch (error) {
      yield put(subscriptionPaymentPaystackFailure(error));
      yield put(notify({ message: error.message, type: "error" }));
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
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        localStorage.setItem(
          "total_followers",
          JSON.stringify(response.data.data.total_followers)
        );
        localStorage.setItem(
          "total_followings",
          JSON.stringify(response.data.data.total_followings)
        );
        window.location.assign(`${subscriptioDetails.user_unique_id}`);
      } else {
        yield put(subscriptionPaymentWalletFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(subscriptionPaymentWalletFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }
  
  function* subscriptionAutoRenewalAPI() {
    try {
      const subscriptioDetails = yield select(
        (state) => state.subscriptions.subscriptionRenew.inputData
      );
      const response = yield api.postMethod(
        "subscriptions_autorenewal_status",
        subscriptioDetails
      );
      yield put(subscriptionAutoRenewalSuccess(response.data.data));
      if (response.data.success) {
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        yield put(subscriptionAutoRenewalFailure(response.data.error));
      } else {
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(subscriptionAutoRenewalFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }
  
  function* subscriptionPaymentCCBillAPI() {
    try {
      const subscriptioDetails = yield select(
        (state) => state.subscriptions.subPayCCBill.inputData
      );
      const response = yield api.postMethod(
        "user_subscriptions_payment_by_ccbill",
        subscriptioDetails
      );
      if (response.data.success) {
        yield put(subscriptionPaymentCCBillSuccess(response.data.data));
        window.location.assign(`${response.data.data.redirect_web_url}`);
      } else {
        yield put(subscriptionPaymentCCBillFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(subscriptionPaymentCCBillFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }
  

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SUBSCRIPTION_START, getSubscriptionAPI)]);
  yield all([
    yield takeLatest(FETCH_MY_SUBSCRIPTION_START, getMySubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_SUBSCRIPTION_START, getSingleSubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_STRIPE_START,
      subscriptionPaymentStripeAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_WALLET_START,
      subscriptionPaymentWalletAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_AUTO_RENEWAL_START,
      subscriptionAutoRenewalAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_PAYPAL_START,
      subscriptionPaymentPaypalAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_CCBILL_START,
      subscriptionPaymentCCBillAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_COINPAYMENT_START,
      subscriptionPaymentCoinPaymentAPI
    ),
  ]);
}
