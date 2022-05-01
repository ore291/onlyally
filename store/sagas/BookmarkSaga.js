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

import {notify} from 'reapop'

function* saveBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.saveBookmark.inputData
    );
    const response = yield api.postMethod({
      action: "post_bookmarks_save",
      object: inputData,
    });
    if (response.data.success) {
      yield put(saveBookmarkSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: 'success' }));
    } else {
      yield put(saveBookmarkFailure( response.data.error.error));

      // yield put(checkLogoutStatus(response.data));
      yield put(
        notify({ message:  response.data.error.error, status: "error" })
      );
    }
  } catch (error) {
    yield put(saveBookmarkFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
   }
}

function* deleteBookmarkAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod({
      action: "post_bookmarks_delete",
      object: inputData,
    });
    if (response.data.success) {
      yield put(deleteBookmarkSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteBookmarkFailure( response.data.error.error));
      // const notificationMessage = getErrorNotificationMessage(
      //    response.data.error.error
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
