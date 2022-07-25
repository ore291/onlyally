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

import { errorLogoutCheck } from "../slices/errorSlice";
import { notify } from "reapop";

function* fetchBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmark.inputData
    );
    const response = yield api.postMethod({
      action: "post_bookmarks",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchBookmarksSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksFailure(response.data.error));

      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchBookmarksFailure(error));

    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchBookmarkPhotoAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkPhoto.inputData
    );
    const response = yield api.postMethod({
      action: "post_bookmarks_photos",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchBookmarksPhotoSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksPhotoFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchBookmarksPhotoFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchBookmarkVideoAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkVideo.inputData
    );
    const response = yield api.postMethod({
      action: "post_bookmarks_videos",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchBookmarksVideoSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksVideoFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchBookmarksVideoFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

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
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(saveBookmarkFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(saveBookmarkFailure(error.message));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.verificationDocument.delDocs.inputData
    );
    const response = yield api.postMethod({
      action: "post_bookmarks_delete",
      object: inputData,
    });
    if (response.data.success) {
      yield put(deleteBookmarkSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
    } else {
      yield put(deleteBookmarkFailure(response.data.error.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(deleteBookmarkFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchBookmarkAudioAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkAudio.inputData
    );
    const response = yield api.postMethod({
      action: "post_bookmarks_audio",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchBookmarksAudioSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksAudioFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchBookmarksAudioFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("bookmark/fetchBookmarksStart", fetchBookmarkAPI),
  ]);
  yield all([
    yield takeLatest(
      "bookmark/fetchBookmarksPhotoStart",
      fetchBookmarkPhotoAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "bookmark/fetchBookmarksVideoStart",
      fetchBookmarkVideoAPI
    ),
  ]);
  yield all([yield takeLatest("bookmark/saveBookmarkStart", saveBookmarkAPI)]);
  yield all([
    yield takeLatest("bookmarkDeleteBookmarkStart", deleteBookmarkAPI),
  ]);
  yield all([
    yield takeLatest(
      "bookmark/fetchBookmarksAudioStart",
      fetchBookmarkAudioAPI
    ),
  ]);
}
