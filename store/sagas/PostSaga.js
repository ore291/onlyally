import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";



import {
  fetchSinglePostStart,
  fetchSinglePostSuccess,
  fetchSinglePostFailure,
} from "../slices/postSlice";

function* fetchSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod(
     'posts_view_for_others', null, null, inputData
    );
    if (response.data.success) {
      yield put(fetchSinglePostSuccess(response.data.data));
    } else {
      yield put(fetchSinglePostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
    //   yield put(checkLogoutStatus(response.data));
    //   yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSinglePostFailure(error));
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  // yield all([yield takeLatest(SAVE_POST_START, savePostAPI)]);
  // yield all([yield takeLatest(FETCH_POSTS_START, fetchPostsAPI)]);
  // yield all([yield takeLatest(FETCH_EXPLORE_START, fetchExploreAPI)]);
  yield all([
    yield takeLatest("post/fetchSinglePostStart", fetchSinglePostAPI),
  ]);
  // yield all([yield takeLatest(DELETE_POST_START, deletePostAPI)]);
  // yield all([yield takeLatest(CHANGE_POST_STATUS_START, changePostStatusAPI)]);
  // yield all([yield takeLatest(POST_FILE_UPLOAD_START, postFileUploadAPI)]);
  // yield all([yield takeLatest(POST_FILE_REMOVE_START, postFileRemoveAPI)]);

  // yield all([yield takeLatest(PPV_PAYMENT_STRIPE_START, PPVPaymentStripeAPI)]);
  // yield all([yield takeLatest(PPV_PAYMENT_WALLET_START, PPVPaymentWalletAPI)]);
  // yield all([yield takeLatest(SAVE_REPORT_POST_START, saveReportPostAPI)]);
  // yield all([yield takeLatest(FETCH_REPORT_POSTS_START, fetchPostsAPI)]);
  // yield all([yield takeLatest(PPV_PAYMENT_PAYPAL_START, PPVPaymentPaypalAPI)]);
  // yield all([yield takeLatest(PPV_PAYMENT_CCBILL_START, PPVPaymentCCBillAPI)]);
  // yield all([
  //   yield takeLatest(PPV_PAYMENT_COINPAYMENT_START, PPVPaymentCoinPaymentAPI),
  // ]);
  // yield all([
  //   yield takeLatest(FETCH_POST_CATEGORIES_START, fetchPostCategories),
  // ]);
  // yield all([yield takeLatest(FETCH_REPORT_REASON_START, fetchReportReason)]);
}
