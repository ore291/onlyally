import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchVideoCallRequestsFailure,
  fetchVideoCallRequestsSuccess,
  saveVideoCallAmountFailure,
  saveVideoCallAmountSuccess,
  saveVideoCallRequestFailure,
  saveVideoCallRequestSuccess,
  videoCallRequestsAcceptFailure,
  videoCallRequestsAcceptSuccess,
  videoCallRequestsJoinFailure,
  videoCallRequestsJoinSuccess,
  videoCallRequestsPaymentPaystackFailure,
  videoCallRequestsPaymentPaystackSuccess,
  videoCallRequestsRejectFailure,
  videoCallRequestsRejectSuccess,
} from "../slices/videoCallSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* fetchVideoCallRequestsAPI() {
  try {
    const response = yield api.postMethod({ action: "video_call_requests" });
    if (response.data.success) {
      yield put(fetchVideoCallRequestsSuccess(response.data.data));
    } else {
      yield put(fetchVideoCallRequestsFailure(response.data.error));

      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchVideoCallRequestsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* saveVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.videocall.saveVideoCallRequest.inputData
    );

    if (!inputData.start_time && !inputData.model_id) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(saveVideoCallRequestFailure("Please fill the content"));

      yield put(
        notify({ message: "Please fill the content", status: "error" })
      );
    } else {
      const response = yield api.postMethod({
        action: "video_call_requests_save",
        object: inputData,
      });
      if (response.data.success) {
        yield put(saveVideoCallRequestSuccess(response.data.data));

        yield put(
          notify({ message: response.data.message, status: "success" })
        );
        // window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(saveVideoCallRequestFailure(response.data.error));
        yield put(notify({ message: response.data.error, status: "error" }));
      }
    }
  } catch (error) {
    yield put(saveVideoCallRequestFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* acceptVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.videoCall.acceptVideoCallRequest.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_accept",
      object: inputData,
    });
    if (response.data.success) {
      yield put(videoCallRequestsAcceptSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/profile");
    } else {
      yield put(videoCallRequestsAcceptFailure(response.data.error));

      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(videoCallRequestsAcceptFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* rejectVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.videoCall.rejectVideoCallRequest.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_reject",
      object: inputData,
    });
    if (response.data.success) {
      yield put(videoCallRequestsRejectSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/profile");
    } else {
      yield put(videoCallRequestsRejectFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(videoCallRequestsRejectFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* joinVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.videoCall.joinVideoCallRequest.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_requests_join",
      object: inputData,
    });
    if (response.data.success) {
      yield put(videoCallRequestsJoinSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/profile");
    } else {
      yield put(videoCallRequestsJoinFailure(response.data.error));

      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(videoCallRequestsJoinFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* PayPaystackAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.videoCall.videoCallRequestPayPaystack.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_payment_by_paypal",
      object: paymentInputData,
    });
    if (response.data.success) {
      yield put(videoCallRequestsPaymentPaystackSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/live/" + response.data.data.post.post_unique_id);
    } else {
      yield put(videoCallRequestsPaymentPaystackFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(videoCallRequestsPaymentPaystackFailure(error));

    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* saveVideoAmountAPI() {
  try {
    const inputData = yield select(
      (state) => state.videoCall.saveVideoCallAmount.inputData
    );
    const response = yield api.postMethod({
      action: "video_call_amount_update",
      object: inputData,
    });
    if (response.data.success) {
      yield put(saveVideoCallAmountSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      // window.location.assign("/post/" + response.data.data.post_unique_id);
    } else {
      yield put(saveVideoCallAmountFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(saveVideoCallAmountFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(
      "videoCall/fetchVideoCallRequestsStart",
      fetchVideoCallRequestsAPI
    ),
  ]);

  yield all([
    yield takeLatest(
      "videoCall/saveVideoCallRequestStart",
      saveVideoCallRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "videoCall/videoCallRequestsAcceptStart",
      acceptVideoCallRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "videoCall/videoCallRequestsRejectStart",
      rejectVideoCallRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "videoCall/videoCallRequestsJoinStart",
      joinVideoCallRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "videoCall/videoCallRequestsPaymentPaystackStart",
      PayPaystackAPI
    ),
  ]);
  yield all([
    yield takeLatest("videoCall/saveVideoCallAmountStart", saveVideoAmountAPI),
  ]);
}
