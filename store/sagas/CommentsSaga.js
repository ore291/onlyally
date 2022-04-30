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

  import { addNotification } from "../slices/notificationsSlice";


  function* fetchCommentsAPI() {
    try {
      const inputData = yield select((state) => state.comments.comments.inputData);
      const response = yield api.postMethod({action:"post_comments", object: inputData});
      if (response.data.success) {
        
        yield put(fetchCommentsSuccess(response.data.data));
      } else {
        yield put(fetchCommentsFailure(response.data.error));
        
        // yield put(checkLogoutStatus(response.data));
        yield put(addNotification({message: response.data.error, type:"error"}));
      }
    } catch (error) {
      yield put(fetchCommentsFailure(error));
    yield put(addNotification({message: error.message, type:"error"}));
    }
  }

  function* saveCommentAPI() {
    try {
      const inputData = yield select(
        (state) => state.comments.saveComment.inputData
      );
      const response = yield api.postMethod({action:"post_comments_save",object: inputData});
      if (response.data.success) {
        yield put(saveCommentSuccess(response.data.data));
        yield put(fetchCommentsStart(inputData))
        yield put(addNotification({message: response.data.message}))
      } else {
        yield put(saveCommentFailure(response.data.error));
        // yield put(checkLogoutStatus(response.data));
        yield put(addNotification({message: response.data.error, type:"error"}));
      }
    } catch (error) {
      yield put(saveCommentFailure(error));
      yield put(addNotification({message: error.message, type:"error"}));
    }
  }

  function* fetchCommentRepliesAPI() {
    try {
      const inputData = yield select((state) => state.comments.commentReplies.inputData);
      const response = yield api.postMethod({action:"post_comment_replies",object:inputData });
      if (response.data.success) {
        yield put(fetchCommentRepliesSuccess(response.data.data));
      } else {
        yield put(fetchCommentRepliesFailure(response.data.error));
        // yield put(checkLogoutStatus(response.data));
        yield put(addNotification({message: response.data.error, type:"error"}));
      }
    } catch (error) {
      yield put(fetchCommentRepliesFailure(error));
      yield put(addNotification({message: error.message, type:"error"}));
    }
  }
  
  function* saveCommentReplyAPI() {
    try {
      const inputData = yield select(
        (state) => state.comment.saveCommentReply.inputData
      );
      const response = yield api.postMethod({action:"post_comments_replies_save",object:inputData});
      if (response.data.success) {
        yield put(saveCommentRepliesSuccess(response.data.data));
        yield put(addNotification({message: response.data.message}));
        
      } else {
        yield put(saveCommentRepliesFailure(response.data.error));
        // yield put(checkLogoutStatus(response.data));
        yield put(addNotification({message: response.data.error, type:"error"}));
      }
    } catch (error) {
      yield put(saveCommentRepliesFailure(error));
      yield put(addNotification({message: error.message, type:"error"}));
    }
  }


  export default function* pageSaga() {
    yield all([yield takeLatest("comments/fetchCommentsStart", fetchCommentsAPI)]);
    yield all([yield takeLatest("comments/fetchCommentRepliesStart", fetchCommentRepliesAPI)]);
    yield all([yield takeLatest("comments/saveCommentStart", saveCommentAPI)]);
    yield all([yield takeLatest("comments/saveCommentRepliesStart", saveCommentReplyAPI)]);
    // yield all([yield takeLatest(DELETE_COMMENT_START, deleteCommentAPI)]);
  }
  