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
  postFileRemoveFailure,
  fetchExploreSuccess,
  fetchExploreFailure,
  ppvPaymentWalletSuccess,
  ppvPaymentWalletFailure,
  ppvPaymentPaystackSuccess,
  ppvPaymentPaystackFailure,
  fetchReportPostsStart,
  fetchReportReasonStart,
  fetchReportReasonFailure,
  fetchReportReasonSuccess,
  saveReportPostStart,
  saveReportPostFailure,
  saveReportPostSuccess,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} from "../slices/postSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

import { notify } from "reapop";

function* savePostAPI() {
  try {
    const inputData = yield select((state) => state.post.savePost.inputData);

    if (!inputData.content && !inputData.post_files) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(savePostFailure("Please fill the content"));
      yield put(
        notify({ message: "Please fill the content", status: "error" })
      );
    } else {
      const response = yield api.postMethod({
        action: "posts_save_for_owner",
        object: inputData,
      });
      if (response.data.success) {
        yield put(savePostSuccess(response.data.data));
        yield put(
          notify({ message: response.data.message, status: "success" })
        );
        window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(savePostFailure(response.data.error));
        // yield put(checkLogoutStatus(response.data));
        yield put(notify({ message: response.data.error, status: "error" }));
      }
    }
  } catch (error) {
    yield put(savePostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchPostsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const inputData = yield select((state) => state.post.posts.inputData);
    const response = yield api.postMethod({
      action: "posts_for_owner",
      object: inputData,
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchPostsSuccess(response.data.data));
    } else {
      yield put(fetchPostsFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* postFileUploadAPI() {
  try {
    const inputData = yield select((state) => state.post.fileUpload.inputData);
    const response = yield api.postMethod({
      action: "post_files_upload",
      object: inputData,
    });
    if (response.data.success) {
      yield put(postFileUploadSuccess(response.data.data));
    } else {
      yield put(postFileUploadFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(postFileUploadFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod({
      action: "posts_view_for_others",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchSinglePostSuccess(response.data.data));
    } else {
      yield put(fetchSinglePostFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
      yield put(errorLogoutCheck(response.data));
    }
  } catch (error) {
    yield put(fetchSinglePostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchPostCategories() {
  try {
    const inputData = yield select(
      (state) => state.post.postCategories.inputData
    );
    const response = yield api.postMethod({
      action: "post_categories_list",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchPostCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchPostCategoriesFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchPostCategoriesFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* postFileRemoveAPI() {
  try {
    const inputData = yield select((state) => state.post.fileRemove.inputData);
    const response = yield api.postMethod({
      action: "post_files_remove",
      object: inputData,
    });
    if (response.data.success) {
      yield put(postFileRemoveSuccess(response.data.data));
    } else {
      yield put(postFileRemoveFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
      yield put(errorLogoutCheck(response.data));
    }
  } catch (error) {
    yield put(postFileRemoveFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchExploreAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const inputData = yield select(
      (state) => state.post.explorePosts.inputData
    );
    const response = yield api.postMethod({
      action: "explore",
      object: inputData,
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchExploreSuccess(response.data.data));
    } else {
      yield put(fetchExploreFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchExploreFailure(error.message));
    yield put(postFileRemoveFailure(error.message));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* PPVPaymentPaystackAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayPaystack.inputData
    );
    const response = yield api.postMethod({
      action: "posts_payment_by_paypal",
      object: paymentInputData,
    });
    if (response.data.success) {
      yield put(ppvPaymentPaystackSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(ppvPaymentPaystackFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(ppvPaymentPaystackFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* PPVPaymentWalletAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayWallet.inputData
    );
    const response = yield api.postMethod({
      action: "posts_payment_by_wallet",
      object: paymentInputData,
    });

    if (response.data.success) {
      yield put(ppvPaymentWalletSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(ppvPaymentWalletFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(ppvPaymentWalletFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deletePostAPI() {
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod({
      action: "posts_delete_for_owner",
      object: inputData,
    });
    if (response.data.success) {
      yield put(deletePostSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/profile");
    } else {
      yield put(deletePostFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(deletePostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchReportReason() {
  try {
    const response = yield api.postMethod({ action: "report_reasons_index" });
    if (response.data.success) {
      yield put(fetchReportReasonSuccess(response.data));
    } else {
      yield put(fetchReportReasonFailure(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchReportReasonFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}
function* saveReportPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.saveReportPost.inputData
    );
    const response = yield api.postMethod({
      action: "report_posts_save",
      object: inputData,
    });
    if (response.data.success) {
      yield put(saveReportPostSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(saveReportPostFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(saveReportPostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("post/savePostStart", savePostAPI)]);
  yield all([yield takeLatest("post/fetchPostsStart", fetchPostsAPI)]);
  yield all([yield takeLatest("post/fetchExploreStart", fetchExploreAPI)]);
  yield all([
    yield takeLatest("post/fetchSinglePostStart", fetchSinglePostAPI),
  ]);
  yield all([yield takeLatest("post/deletePostStart", deletePostAPI)]);
  // yield all([yield takeLatest(CHANGE_POST_STATUS_START, changePostStatusAPI)]);
  yield all([yield takeLatest("post/postFileUploadStart", postFileUploadAPI)]);
  yield all([yield takeLatest("post/postFileRemoveStart", postFileRemoveAPI)]);

  yield all([
    yield takeLatest("post/ppvPaymentWalletStart", PPVPaymentWalletAPI),
  ]);
  yield all([yield takeLatest("post/saveReportPostStart", saveReportPostAPI)]);
  yield all([yield takeLatest("post/fetchReportPostsStart", fetchPostsAPI)]);
  yield all([
    yield takeLatest("post/ppvPaymentPaystackStart", PPVPaymentPaystackAPI),
  ]);

  yield all([
    yield takeLatest("post/fetchPostCategoriesStart", fetchPostCategories),
  ]);
  yield all([
    yield takeLatest("post/fetchReportReasonStart", fetchReportReason),
  ]);
}
