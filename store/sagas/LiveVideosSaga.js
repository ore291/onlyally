import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  videoCallBroadcastFailure,
  videoCallBroadcastSuccess,
  fetchLiveVideosSuccess,
  fetchLiveVideosFailure,
  fetchLiveVideosHistorySuccess,
  fetchLiveVideosHistoryFailure,
  fetchSingleLiveVideosSuccess,
  fetchSingleLiveVideosFailure,
  joinLiveVideosSuccess,
  joinLiveVideosFailure,
  liveVideosPaymentByPaystackFailure,
  liveVideosPaymentByPaystackSuccess,
  liveVideosViewerUpdateSuccess,
  liveVideosViewerUpdateFailure,
  liveVideosEndSuccess,
  liveVideosEndFailure,
  liveVideosPaymentByWalletSuccess,
  liveVideosPaymentByWalletFailure,
} from "../slices/liveVideoSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* liveVideoSaveAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.saveLiveVideo.inputData
    );
    const response = yield api.postMethod({
      action: "live_videos_broadcast_start",
      object: inputData,
    });
    if (response.data.success) {
      yield put(videoCallBroadcastSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign(
        window.location.origin +
          "/join/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(videoCallBroadcastFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(videoCallBroadcastFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* liveVideosAPI() {
  try {
    const skipCount = yield select((state) => state.liveVideo.liveVideos.skip);
    const response = yield api.postMethod({
      action: "live_videos",
      object: {
        skip: skipCount,
      },
    });
    if (response.data.success) {
      yield put(fetchLiveVideosSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosFailure(response.data.error));

      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchLiveVideosFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* liveVideosHistoryAPI() {
  try {
    const skipCount = yield select(
      (state) => state.liveVideo.liveVideosHistory.skip
    );
    const response = yield api.postMethod({
      action: "live_videos_owner_list",
      object: {
        skip: skipCount,
      },
    });
    console.log(response)
    if (response.data.success) {
      yield put(fetchLiveVideosHistorySuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosHistoryFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchLiveVideosHistoryFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchSingleLiveVideoAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.singleLiveVideo.inputData
    );
    const response = yield api.postMethod({
      action: "live_videos_view",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchSingleLiveVideosSuccess(response.data.data));
    } else {
      yield put(fetchSingleLiveVideosFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleLiveVideosFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

// function* liveStripeAPI() {
//   try {
//     const inputData = yield select(
//       (state) => state.liveVideo.liveStripe.inputData
//     );
//     const response = yield api.postMethod(
//       "live_videos_payment_by_card",
//       inputData
//     );
//     if (response.data.success) {
//       yield put(livePaymentStripeSuccess(response.data.data));
//       const notificationMessage = getSuccessNotificationMessage(
//         response.data.message
//       );
//       yield put(notify(notificationMessage));
//       window.location.assign(
//         window.location.origin +
//           "/live-video/" +
//           response.data.data.live_video_unique_id
//       );
//     } else {
//       yield put(livePaymentStripeFailure(response.data.error));
//       const notificationMessage = getErrorNotificationMessage(
//         response.data.error
//       );
//       yield put(errorLogoutCheck(response.data));
//       yield put(notify(notificationMessage));
//     }
//   } catch (error) {
//     yield put(livePaymentStripeFailure(error));
//     const notificationMessage = getErrorNotificationMessage(error.message);
//     yield put(notify(notificationMessage));
//   }
// }

function* livePaystackAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.livePaystack.inputData
    );
    const response = yield api.postMethod({
      action: "live_videos_payment_by_paypal",
      object: inputData,
    });
    if (response.data.success) {
      yield put(liveVideosPaymentByPaystackSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success"}));

      window.location.assign(
        window.location.origin +
          "/live/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(liveVideosPaymentByPaystackFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(liveVideosPaymentByPaystackFailure(error));
    yield put(notify({ message : error.message, status: "error"}));
  }
}

function* liveViewerUpdateAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveViewerUpdate.inputData
    );
    const response = yield api.postMethod({ action :
      "live_videos_viewer_update", object : 
      inputData
    });
    if (response.data.success) {
      yield put(liveVideosViewerUpdateSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(notify(notificationMessage));
    } else {
      yield put(liveVideosViewerUpdateFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(liveVideosViewerUpdateFailure(error));
    yield put(notify({ message : error.message, status: "error"}));
  }
}

function* liveEndAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveEnd.inputData
    );
    const response = yield api.postMethod({ action :
      "live_videos_broadcast_stop", object :
      inputData }
    );
    if (response.data.success) {
      yield put(liveVideosEndSuccess(response.data.data));
      yield put(notify({ message : response.data.message, status: "success"}));

      window.location.assign(window.location.origin + "/live");
    } else {
      yield put(liveVideosEndFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(liveVideosEndFailure(error));
    yield put(notify({ message : error.message, status: "error"}));
  }
}

function* liveWalletAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveWallet.inputData
    );
    const response = yield api.postMethod(
    {action :
      "live_videos_payment_by_wallet", object :
      inputData}
    );
    if (response.data.success) {
      yield put(liveVideosPaymentByWalletSuccess(response.data.data));
      yield put(notify({message : response.data.message, status: "success"}));
      window.location.assign(
        window.location.origin +
          "/live/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(liveVideosPaymentByWalletFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(liveVideosPaymentByWalletFailure(error));
    yield put(notify({message : error.message, status: "error"}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("liveVideo/videoCallBroadcastStart", liveVideoSaveAPI)]);
  yield all([yield takeLatest("liveVideo/fetchLiveVideosStart", liveVideosAPI)]);
  yield all([
    yield takeLatest("liveVideo/fetchLiveVideosHistoryStart", liveVideosHistoryAPI),
  ]);
  // yield all([yield takeLatest(JOIN_LIVE_VIDEOS_START, joinLiveVideosAPI)]);
  yield all([
    yield takeLatest("liveVideo/fetchSingleLiveVideosStart", fetchSingleLiveVideoAPI),
  ]);

  yield all([
    yield takeLatest("liveVideo/liveVideosPaymentByPaystackStart", livePaystackAPI),
  ]);
  yield all([
    yield takeLatest("liveVideo/liveVideosViewerUpdateStart", liveViewerUpdateAPI),
  ]);
  yield all([yield takeLatest("liveVideo/liveVideosEndStart", liveEndAPI)]);
  yield all([
    yield takeLatest("liveVideo/liveVideosPaymentByWalletStart", liveWalletAPI),
  ]);
}
