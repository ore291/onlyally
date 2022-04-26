import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    deleteBookmarkFailure,
    deleteBookmarkSuccess,
    fetchBookmarksFailure,
    fetchBookmarksPhotoFailure,
    fetchBookmarksPhotoSuccess,
    fetchBookmarksSuccess,
    fetchBookmarksVideoFailure,
    fetchBookmarksVideoSuccess,
    saveBookmarkFailure,
    saveBookmarkSuccess,
    fetchBookmarksAudioFailure,
    fetchBookmarksAudioSuccess,
  } from "../slices/bookmarkSlice";

  function* saveBookmarkAPI() {
    try {
      const inputData = yield select(
        (state) => state.bookmark.saveBookmark.inputData
      );
      const response = yield api.postMethod("post_bookmarks_save",null, null, inputData);
      if (response.data.success) {
        yield put(saveBookmarkSuccess(response.data.data));
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
      } else {
        yield put(saveBookmarkFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(saveBookmarkFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  function* deleteBookmarkAPI() {
    try {
      const inputData = yield select((state) => state.docs.delDocs.inputData);
      const response = yield api.postMethod("post_bookmarks_delete", inputData);
      if (response.data.success) {
        yield put(deleteBookmarkSuccess(response.data.data));
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
      } else {
        yield put(deleteBookmarkFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(deleteBookmarkFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }

  export default function* pageSaga() {
    // yield all([yield takeLatest(FETCH_BOOKMARKS_START, fetchBookmarkAPI)]);
    // yield all([
    //   yield takeLatest(FETCH_BOOKMARKS_PHOTO_START, fetchBookmarkPhotoAPI),
    // ]);
    // yield all([
    //   yield takeLatest(FETCH_BOOKMARKS_VIDEO_START, fetchBookmarkVideoAPI),
    // ]);
    yield all([yield takeLatest("bookmark/saveBookmarkStart", saveBookmarkAPI)]);
    // yield all([yield takeLatest(DELETE_BOOKMARK_START, deleteBookmarkAPI)]);
    // yield all([
    //   yield takeLatest(FETCH_BOOKMARKS_AUDIO_START, fetchBookmarkAudioAPI),
    // ]);
  }