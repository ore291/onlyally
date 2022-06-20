import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  requestCallSuccess,
  requestCallFailure,
  acceptCallSuccess,
  acceptCallFailure,
  rejectCallSuccess,
  rejectCallFailure,
  endVideoCallSuccess,
  endVideoCallFailure,
  callRequestSentUserSuccess,
  callRequestSentUserFailure,
  callHistoryUserSuccess,
  callHistoryUserFailure,
  callHistoryModelSuccess,
  callHistoryModelFailure,
  callRequestReceivedModelFailure,
  callRequestReceivedModelSuccess,
  fetchSingleVideoCallFailure,
  fetchSingleVideoCallSuccess,
  acceptAudioCallFailure,
  acceptAudioCallSuccess,
  audioCallHistoryUserSuccess,
  audioCallHistoryUserFailure,
  rejectAudioCallFailure,
  rejectAudioCallSuccess,
  requestAudioCallSuccess,
  requestAudioCallFailure,
  payAudioCallByPaystackSuccess,
  payAudioCallByPaystackFailure,
  fetchSingleAudioCallSuccess,
  fetchSingleAudioCallFailure,
  endAudioCallSuccess,
  endAudioCallFailure,
  joinAudioCallSuccess,
  joinAudioCallFailure,
  joinVideoCallFailure,
  joinVideoCallSuccess,
  videoCallPaymentByWalletSuccess,
  videoCallPaymentByWalletFailure,
  audioCallPaymentByWalletFailure,
  audioCallPaymentByWalletSuccess,
} from "../slices/privateCallSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* saveRequestCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.requestCall.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_save",
      object: inputData,
    });
    if (response.data.success) {
      yield put(requestCallSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));

      window.location.assign("/video-calls-sent");
    } else {
      yield put(requestCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(requestCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* acceptCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.acceptCall.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_accept",
      object: inputData,
    });
    if (response.data.success) {
      yield put(acceptCallSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.reload();
    } else {
      yield put(acceptCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(acceptCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* rejectCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.rejectCall.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_reject",
      object: inputData,
    });
    if (response.data.success) {
      yield put(rejectCallSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(rejectCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(rejectCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* payByPaystackApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.payByPaystack.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_payment_by_paypal",
      object: inputData,
    });
    if (response.data.success) {
      yield put(payByPaystackSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(payByPaystackFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(payByPaystackFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* joinCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.joinVideoCall.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_join",
      object: inputData,
    });
    if (response.data.success) {
      yield put(joinVideoCallSuccess(response.data.data));
    } else {
      yield put(joinVideoCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(joinVideoCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* endVideoCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.endVideoCall.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_end",
      object: inputData,
    });
    if (response.data.success) {
      yield put(endVideoCallSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.reload();
    } else {
      yield put(endVideoCallFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(endVideoCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* callRequestSentUserApi() {
  try {
    const response = yield api.postMethod({ action: "video_call_requests" });
    if (response.data.success) {
      yield put(callRequestSentUserSuccess(response.data.data));
    } else {
      yield put(callRequestSentUserFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(callRequestSentUserFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* callHistoryUserApi() {
  try {
    const response = yield api.postMethod({
      action: "user_video_call_history",
    });
    if (response.data.success) {
      yield put(callHistoryUserSuccess(response.data.data));
    } else {
      yield put(callHistoryUserFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(callHistoryUserFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* callHistoryModelApi() {
  try {
    const response = yield api.postMethod("model_video_call_history");
    if (response.data.success) {
      yield put(callHistoryModelSuccess(response.data.data));
    } else {
      yield put(callHistoryModelFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(errorLogoutCheck(response.data));
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(callHistoryModelFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* callRequestReceivedModelApi() {
  try {
    const response = yield api.postMethod({
      action: "model_video_call_requests",
    });
    if (response.data.success) {
      yield put(callRequestReceivedModelSuccess(response.data.data));
    } else {
      yield put(callRequestReceivedModelFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(callRequestReceivedModelFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchSingleVideoCallAPI() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.singleVideoCall.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_view",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchSingleVideoCallSuccess(response.data.data));
    } else {
      yield put(fetchSingleVideoCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleVideoCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* acceptAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.acceptAudioCall.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_requests_accept",
      object: inputData,
    });
    if (response.data.success) {
      yield put(acceptAudioCallSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));

      window.location.reload();
    } else {
      yield put(acceptAudioCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(acceptAudioCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* audioCallHistoryUserApi() {
  try {
    const response = yield api.postMethod({
      action: "user_audio_call_history",
    });
    if (response.data.success) {
      yield put(audioCallHistoryUserSuccess(response.data.data));
    } else {
      yield put(audioCallHistoryUserFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(audioCallHistoryUserFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* rejectAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.rejectAudioCall.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_requests_reject",
      object: inputData,
    });
    if (response.data.success) {
      yield put(rejectAudioCallSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(rejectAudioCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(rejectAudioCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* saveRequestAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.requestAudioCall.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_requests_save",
      object: inputData,
    });
    if (response.data.success) {
      yield put(requestAudioCallSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));

      window.location.assign("/audio-calls-history");
    } else {
      yield put(requestAudioCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(requestCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

// function* payAudioCallByStripeApi() {
//   try {
//     const inputData = yield select(
//       (state) => state.privateCall.payAudioCallByStripe.inputData
//     );
//     const response = yield api.postMethod(
//       "audio_call_payment_by_stripe",
//       inputData
//     );
//     if (response.data.success) {
//       yield put(payAudioCallByStripeSuccess(response.data.data));
//       const notificationMessage = getSuccessNotificationMessage(
//         response.data.message
//       );
//       yield put(notify(notificationMessage));
//       window.location.assign("/audio-calls-sent");
//     } else {
//       yield put(payAudioCallByStripeFailure(response.data.error));
//       const notificationMessage = getErrorNotificationMessage(
//         response.data.error
//       );
//       yield put(errorLogoutCheck(response.data));
//       yield put(notify(notificationMessage));
//     }
//   } catch (error) {
//     yield put(payAudioCallByStripeFailure(error));
//     yield put(notify({ message: error.message, status: "error" }));
//   }
// }

function* payAudioCallByPaystackApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.payAudioCallByPaystack.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_payment_by_paypal",
      object: inputData,
    });
    if (response.data.success) {
      yield put(payAudioCallByPaystackSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/audio-calls-sent");
    } else {
      yield put(payAudioCallByPaystackFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(payAudioCallByPaystackFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchSingleAudioCallAPI() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.singleAudioCall.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_requests_view",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchSingleAudioCallSuccess(response.data.data));
    } else {
      yield put(fetchSingleAudioCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleAudioCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* endAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.endAudioCall.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_requests_end",
      object: inputData,
    });
    if (response.data.success) {
      yield put(endAudioCallSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(endAudioCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(endAudioCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* joinAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.joinAudioCall.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_requests_join",
      object: inputData,
    });
    if (response.data.success) {
      yield put(joinAudioCallSuccess(response.data.data));
    } else {
      yield put(joinAudioCallFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(joinAudioCallFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* videoCallPayByWalletApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.videoCallPayByWallet.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_payment_by_wallet",
      object: inputData,
    });
    if (response.data.success) {
      yield put(videoCallPaymentByWalletSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/video-calls-history");
    } else {
      yield put(videoCallPayByWalletFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(videoCallPaymentByWalletFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* audioCallPayByWalletApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.audioCallPayByWallet.inputData
    );
    const response = yield api.postMethod({
      action: "audio_call_payment_by_wallet",
      object: inputData,
    });
    if (response.data.success) {
      yield put(audioCallPaymentByWalletSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/audio-calls-history");
    } else {
      yield put(audioCallPaymentByWalletFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(audioCallPaymentByWalletFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("privateCall/requestCallStart", saveRequestCallApi),
  ]);
  yield all([yield takeLatest("privateCall/acceptCallStart", acceptCallApi)]);
  yield all([yield takeLatest("privateCall/rejectCallStart", rejectCallApi)]);
  yield all([
    yield takeLatest("privateCall/payByPaystackStart", payByPaystackApi),
  ]);
  yield all([yield takeLatest("privateCall/joinVideoCallStart", joinCallApi)]);
  yield all([
    yield takeLatest("privateCall/endVideoCallStart", endVideoCallApi),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/callRequestSentUserStart",
      callRequestSentUserApi
    ),
  ]);
  yield all([
    yield takeLatest("privateCall/callHistoryUserStart", callHistoryUserApi),
  ]);
  yield all([
    yield takeLatest("privateCall/callHistoryModelStart", callHistoryModelApi),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/fetchSingleVideoCallStart",
      fetchSingleVideoCallAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/callRequestReceivedModelStart",
      callRequestReceivedModelApi
    ),
  ]);
  yield all([
    yield takeLatest("privateCall/acceptAudioCallStart", acceptAudioCallApi),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/audioCallHistoryUserStart",
      audioCallHistoryUserApi
    ),
  ]);
  yield all([
    yield takeLatest("privateCall/rejectAudioCallStart", rejectAudioCallApi),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/requestAudioCallStart",
      saveRequestAudioCallApi
    ),
  ]);

  yield all([
    yield takeLatest(
      "privateCall/payAudioCallByPaystackStart",
      payAudioCallByPaystackApi
    ),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/fetchSingleAudioCallStart",
      fetchSingleAudioCallAPI
    ),
  ]);
  yield all([
    yield takeLatest("privateCall/endAudioCallStart", endAudioCallApi),
  ]);
  yield all([
    yield takeLatest("privateCall/joinVideoCallStart", joinAudioCallApi),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/videoCallPaymentByWalletStart",
      videoCallPayByWalletApi
    ),
  ]);
  yield all([
    yield takeLatest(
      "privateCall/audioCallPaymentByWalletStart",
      audioCallPayByWalletApi
    ),
  ]);
}
