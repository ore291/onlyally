import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";

var localStorage = require("localStorage");

import {
    deleteCommentFailure,
    deleteCommentSuccess,
    fetchCommentsFailure,
    fetchCommentsSuccess,
    saveCommentFailure,
    saveCommentSuccess,
    fetchCommentRepliesFailure,
    fetchCommentRepliesSuccess,
    saveCommentReplyFailure,
    saveCommentReplySuccess,
    fetchCommentsStart
  } from "../slices/commentsSlice";


  function* fetchCommentsAPI() {
    try {
      const inputData = yield select((state) => state.comments.comments.inputData);
      const response = yield api.postMethod("post_comments", inputData);
      if (response.data.success) {
        yield put(fetchCommentsSuccess(response.data.data));
      } else {
        yield put(fetchCommentsFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchCommentsFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }


  export default function* pageSaga() {
    yield all([yield takeLatest("comments/fetchCommentsStart", fetchCommentsAPI)]);
    // yield all([yield takeLatest(FETCH_COMMENT_REPLIES_START, fetchCommentRepliesAPI)]);
    // yield all([yield takeLatest(SAVE_COMMENT_START, saveCommentAPI)]);
    // yield all([yield takeLatest(SAVE_COMMENT_REPLY_START, saveCommentReplyAPI)]);
    // yield all([yield takeLatest(DELETE_COMMENT_START, deleteCommentAPI)]);
  }
  