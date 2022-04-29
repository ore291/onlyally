import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";



import {
  fetchSinglePostSuccess,
  fetchSinglePostFailure,
  fetchPostCategoriesSuccess,
  fetchPostCategoriesFailure,
  savePostSuccess,
  savePostFailure,
  postFileUploadSuccess,
  postFileUploadFailure,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../slices/postSlice";


function* savePostAPI() {
  try {
    const inputData = yield select((state) => state.post.savePost.inputData);

    if (!inputData.content && !inputData.post_files) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(savePostFailure("Please fill the content"));
      // const notificationMessage = getErrorNotificationMessage(
      //   "Please fill the content"
      // );
      // yield put(createNotification(notificationMessage));
    } else {
      const response = yield api.postMethod({action:"posts_save_for_owner", object : inputData});
      if (response.data.success) {
        yield put(savePostSuccess(response.data.data));
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
        window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(savePostFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(savePostFailure(error));
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}

function* fetchPostsAPI() {
  try {
    const inputData = yield select((state) => state.post.posts.inputData);
    const response = yield api.postMethod({action:"posts_for_owner",object:inputData });
    if (response.data.success) {
      yield put(fetchPostsSuccess(response.data.data));
    } else {
      yield put(fetchPostsFailure(response.data.error));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      // yield put(checkLogoutStatus(response.data));
      // yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}

function* postFileUploadAPI() {
  try {
    const inputData = yield select((state) => state.post.fileUpload.inputData);
    const response = yield api.postMethod({action:"post_files_upload", object : inputData});
    if (response.data.success) {
      yield put(postFileUploadSuccess(response.data.data));
    } else {
      yield put(postFileUploadFailure(response.data.error));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      // yield put(checkLogoutStatus(response.data));
      // yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(postFileUploadFailure(error));
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}


function* fetchSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod(
     {action: 'posts_view_for_others', object: inputData}
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

function* fetchPostCategories() {
  try {
    const inputData = yield select(
      (state) => state.post.postCategories.inputData
    );
    const response = yield api.postMethod({action :"post_categories_list", object : inputData});
    if (response.data.success) {
      yield put(fetchPostCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchPostCategoriesFailure(response.data.error));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      // yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostCategoriesFailure(error));
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}


export default function* pageSaga() {
  yield all([yield takeLatest("post/savePostStart", savePostAPI)]);
  yield all([yield takeLatest("post/fetchPostsStart", fetchPostsAPI)]);
  // yield all([yield takeLatest(FETCH_EXPLORE_START, fetchExploreAPI)]);
  yield all([
    yield takeLatest("post/fetchSinglePostStart", fetchSinglePostAPI),
  ]);
  // yield all([yield takeLatest(DELETE_POST_START, deletePostAPI)]);
  // yield all([yield takeLatest(CHANGE_POST_STATUS_START, changePostStatusAPI)]);
  yield all([yield takeLatest("post/postFileUploadStart", postFileUploadAPI)]);
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
  yield all([
    yield takeLatest("post/fetchPostCategoriesStart", fetchPostCategories),
  ]);
  // yield all([yield takeLatest(FETCH_REPORT_REASON_START, fetchReportReason)]);
}
