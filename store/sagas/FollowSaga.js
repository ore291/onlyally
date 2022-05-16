import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";
import { errorLogoutCheck } from "../slices/errorSlice";

import {
  fetchFollowersFailure,
  fetchFollowersSuccess,
  fetchActiveFollowersFailure,
  fetchActiveFollowersSuccess,
  fetchExpiredFollowersFailure,
  fetchExpiredFollowersSuccess,
  fetchFollowingFailure,
  fetchFollowingSuccess,
  followUserFailure,
  followUserSuccess,
  unFollowUserFailure,
  unFollowUserSuccess,
  fetchActiveFollowingSuccess,
  fetchActiveFollowingFailure,
  fetchExpiredFollowingSuccess,
  fetchExpiredFollowingFailure,
} from "../slices/followerSlice";

function* followUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.follow.followUser.inputData
    );
    const response = yield api.postMethod({
      action: "follow_users",
      object: inputData,
    });
    if (response.data.success) {
      yield put(followUserSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
    } else {
      yield put(followUserFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(followUserFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* unFollowUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.follow.unFollowUser.inputData
    );
    const response = yield api.postMethod({
      action: "unfollow_users",
      object: inputData,
    });
    if (response.data.success) {
      yield put(unFollowUserSuccess(response.data.data));
      yield put(notify({ message: response.data.message, status: "success" }));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      window.location.reload();
    } else {
      yield put(unFollowUserFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify(response.data.error));
    }
  } catch (error) {
    yield put(unFollowUserFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchFollowersAPI() {
  try {
    const response = yield api.postMethod({ action: "followers" });
    if (response.data.success) {
      yield put(fetchFollowersSuccess(response.data.data));
    } else {
      yield put(fetchFollowersFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchFollowersFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchActiveFollowersAPI() {
  try {
    const response = yield api.postMethod({ action: "active_followers" });
    if (response.data.success) {
      yield put(fetchActiveFollowersSuccess(response.data.data));
    } else {
      yield put(fetchActiveFollowersFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchActiveFollowersFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchExpiredFollowersAPI() {
  try {
    const response = yield api.postMethod({ action: "expired_followers" });
    if (response.data.success) {
      yield put(fetchExpiredFollowersSuccess(response.data.data));
    } else {
      yield put(fetchExpiredFollowersFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchExpiredFollowersFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchFollowingAPI() {
  try {
    const response = yield api.postMethod({ action: "followings" });
    if (response.data.success) {
      yield put(fetchFollowingSuccess(response.data.data));
    } else {
      yield put(fetchFollowingFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchFollowingFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchActiveFollowingAPI() {
  try {
    const response = yield api.postMethod({ action: "active_followings" });
    if (response.data.success) {
      yield put(fetchActiveFollowingSuccess(response.data.data));
    } else {
      yield put(fetchActiveFollowingFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchActiveFollowingFailure(error.message));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchExpiredFollowingAPI() {
  try {
    const response = yield api.postMethod({ action: "expired_followings" });
    if (response.data.success) {
      yield put(fetchExpiredFollowingSuccess(response.data.data));
    } else {
      yield put(fetchExpiredFollowingFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchExpiredFollowingFailure(error.message));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("follow/followUserStart", followUserAPI)]);
  yield all([yield takeLatest("follow/unFollowUserStart", unFollowUserAPI)]);
  yield all([yield takeLatest("follow/fetchFollowersStart", fetchFollowersAPI)]);
  yield all([
    yield takeLatest("follow/fetchActiveFollowersStart", fetchActiveFollowersAPI),
  ]);
  yield all([
    yield takeLatest("follow/fetchExpiredFollowersStart", fetchExpiredFollowersAPI),
  ]);
  yield all([yield takeLatest("follow/fetchFollowingStart", fetchFollowingAPI)]);
  yield all([
    yield takeLatest("follow/fetchActiveFollowingStart", fetchActiveFollowingAPI),
  ]);
  yield all([
    yield takeLatest("follow/fetchExpiredFollowingStart", fetchExpiredFollowingAPI),
  ]);
}
