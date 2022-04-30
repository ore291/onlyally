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
  postFileRemoveSuccess,
  postFileRemoveFailure
} from "../slices/postSlice";

import {addNotification} from "../slices/notificationsSlice";


function* savePostAPI() {
  try {
    const inputData = yield select((state) => state.post.savePost.inputData);

    if (!inputData.content && !inputData.post_files) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(savePostFailure("Please fill the content"));
      yield put(addNotification({message: "Please fill the content", type:"error"}))
    } else {
      const response = yield api.postMethod({action:"posts_save_for_owner", object : inputData});
      if (response.data.success) {
        yield put(savePostSuccess(response.data.data));
        yield put(addNotification({message: response.data.message}))
        window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(savePostFailure(response.data.error));
        // yield put(checkLogoutStatus(response.data));
        yield put(addNotification({message: response.data.error, type:"error"}))
      }
    }
  } catch (error) {
    yield put(savePostFailure(error));
    yield put(addNotification({message: error.message, type:"error"}))
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
      // yield put(checkLogoutStatus(response.data));
      yield put(addNotification({message: response.data.error, type:"error"}))
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    yield put(addNotification({message: error.message, type:"error"}))
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
      // yield put(checkLogoutStatus(response.data));
      yield put(addNotification({message: response.data.error, type:"error"}))
    }
  } catch (error) {
    yield put(postFileUploadFailure(error));
    yield put(addNotification({message: error.message, type:"error"}))
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
      yield put(addNotification({message: response.data.error, type:"error"}))
    //   yield put(checkLogoutStatus(response.data));
    
    }
  } catch (error) {
    yield put(fetchSinglePostFailure(error));
    yield put(addNotification({message: error.message, type:"error"}))
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
      yield put(addNotification({message: response.data.error, type:"error"}))
    }
  } catch (error) {
    yield put(fetchPostCategoriesFailure(error));
    yield put(addNotification({message: error.message, type:"error"}))
  }
}

function* postFileRemoveAPI() {
  try {
    const inputData = yield select((state) => state.post.fileRemove.inputData);
    const response = yield api.postMethod({action:"post_files_remove",object: inputData});
    if (response.data.success) {
      yield put(postFileRemoveSuccess(response.data.data));
    } else {
      yield put(postFileRemoveFailure(response.data.error));
      yield put(addNotification({message: response.data.error, type:"error"}))
      // yield put(checkLogoutStatus(response.data));
      
    }
  } catch (error) {
    yield put(postFileRemoveFailure(error));
    yield put(addNotification({message: error.message, type:"error"}))
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
  yield all([yield takeLatest("post/postFileRemoveStart", postFileRemoveAPI)]);

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
