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
    saveCommentRepliesFailure,
    saveCommentRepliesSuccess,
    fetchCommentsStart
  } from "../slices/commentsSlice";


  function* fetchCommentsAPI() {
    try {
      const inputData = yield select((state) => state.comments.comments.inputData);
      const response = yield api.postMethod("post_comments",null, null, inputData);
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

  function* saveCommentAPI() {
    try {
      const inputData = yield select(
        (state) => state.comments.saveComment.inputData
      );
      const response = yield api.postMethod("post_comments_save",null, null, inputData);
      if (response.data.success) {
        yield put(saveCommentSuccess(response.data.data));
        yield put(fetchCommentsStart(inputData))
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
      } else {
        yield put(saveCommentFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(saveCommentFailure(error));
      // const notificationMessage = getErrorNotificationMessage(error.message);
      // yield put(createNotification(notificationMessage));
    }
  }

  function* fetchCommentRepliesAPI() {
    try {
      const inputData = yield select((state) => state.comments.commentReplies.inputData);
      const response = yield api.postMethod("post_comment_replies",null, null, inputData);
      if (response.data.success) {
        yield put(fetchCommentRepliesSuccess(response.data.data));
      } else {
        yield put(fetchCommentRepliesFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchCommentRepliesFailure(error));
      // const notificationMessage = getErrorNotificationMessage(error.message);
      // yield put(createNotification(notificationMessage));
    }
  }
  
  function* saveCommentReplyAPI() {
    try {
      const inputData = yield select(
        (state) => state.comment.saveCommentReply.inputData
      );
      const response = yield api.postMethod("post_comments_replies_save", inputData);
      if (response.data.success) {
        yield put(saveCommentRepliesSuccess(response.data.data));
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
      } else {
        yield put(saveCommentRepliesFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(saveCommentRepliesFailure(error));
      // const notificationMessage = getErrorNotificationMessage(error.message);
      // yield put(createNotification(notificationMessage));
    }
  }


  export default function* pageSaga() {
    yield all([yield takeLatest("comments/fetchCommentsStart", fetchCommentsAPI)]);
    yield all([yield takeLatest("comments/fetchCommentRepliesStart", fetchCommentRepliesAPI)]);
    yield all([yield takeLatest("comments/saveCommentStart", saveCommentAPI)]);
    yield all([yield takeLatest("comments/saveCommentRepliesStart", saveCommentReplyAPI)]);
    // yield all([yield takeLatest(DELETE_COMMENT_START, deleteCommentAPI)]);
  }
  