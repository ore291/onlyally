import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";

var localStorage = require("localStorage");

import {
  fetchHomePostsStart,
  fetchHomePostsSuccess,
  fetchHomePostsFailure,
  searchUserFailure,
  searchUserStart,
  searchUserSuccess,
  fetchTrendingUsersFailure,
  fetchTrendingUsersSuccess,
  fetchPostSuggestionsSuccess,
  fetchPostSuggestionsFailure,
} from "../slices/homeSlice";

import {notify} from 'reapop';

function* fetchHomePostAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var userId = action.payload.userId;
    var dev_model = action.payload.device_model;
  }

  try {
    const skipCount = yield select((state) => state.home.homePost.skip);

    const response = yield api.postMethod({
      action: "home",
      accessToken: accessToken,
      userId: userId,
      object: {
        skip: skipCount,
      },
      dev_model: dev_model,
    });
    if (response.data.success) {
      yield put(fetchHomePostsSuccess(response.data.data));
      if (response.data.data.user) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "total_followers",
            response.data.data.user.total_followers
              ? response.data.data.user.total_followers
              : 0
          );
          localStorage.setItem(
            "total_followings",
            response.data.data.user.total_followings
              ? response.data.data.user.total_followings
              : 0
          );
          localStorage.setItem(
            "is_subscription_enabled",
            response.data.data.user.is_subscription_enabled
          );
          localStorage.setItem("user_picture", response.data.data.user.picture);
          localStorage.setItem("user_cover", response.data.data.user.cover);
          localStorage.setItem("name", response.data.data.user.name);
          localStorage.setItem("username", response.data.data.user.username);
          localStorage.setItem(
            "user_unique_id",
            response.data.data.user.user_unique_id
          );
          localStorage.setItem(
            "is_document_verified",
            response.data.data.user.is_document_verified
          );
        }
      }
    } else {
      yield put(fetchHomePostsFailure(response.data.error));
      //   yield put(checkLogoutStatus(response.data));
        yield put(notify({message: response.data.error, status:"error"}));
    }
  } catch (error) {
    yield put(fetchHomePostsFailure(error.message));
    yield put(notify({message: error.message, status:"error"}));
  }
}

function* searchUserAPI() {
  try {
    const inputData = yield select((state) => state.home.searchUser.inputData);
    const response = yield api.postMethod({
      action: "users_search",
      object: inputData,
    });
    if (response.data.success) {
      yield put(searchUserSuccess(response.data.data));
    } else {
      yield put(searchUserFailure(response.data.error));
      // yield put(checkLogoutStatus(response.data));
      yield put(notify({message: response.data.error, status:"error"}))
    }
  } catch (error) {
    yield put(searchUserFailure(error));
    yield put(notify({message: error.message, status:"error"}))
  }
}

function* fetchTrendingUsersAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var userId = action.payload.userId;
    var dev_model = action.payload.device_model;
  }

  try {
    const inputData = yield select(
      (state) => state.home.trendingUsers.inputData
    );
    const response = yield api.postMethod({
      action: "trending_users",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchTrendingUsersSuccess(response.data.data));
    } else {
      yield put(fetchTrendingUsersFailure(response.data.error.error));
      // yield put(checkLogoutStatus(response.data));
      yield put(notify({message: response.data.error.error, status:"error"}))
    }
  } catch (error) {
    yield put(fetchTrendingUsersFailure(error));
    yield put(notify({message: error.message, status:"error"}))
  }
}

function* fetchPostSuggestionAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var userId = action.payload.userId;
    var dev_model = action.payload.device_model;
  }
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod({
      action: "user_suggestions",
      object: inputData,
    });
    if (response.data.success) {
      yield put(fetchPostSuggestionsSuccess(response.data.data));
    } else {
      yield put(fetchPostSuggestionsFailure(response.data.error.error));
      // yield put(checkLogoutStatus(response.data));
      yield put(notify({message: response.data.error.error, status:"error"}));
    }
  } catch (error) {
    yield put(fetchPostSuggestionsFailure(error));
    yield put(notify({message: error.message, status:"error"}))
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("home/fetchHomePostsStart", fetchHomePostAPI)]);
  yield all([yield takeLatest("home/searchUserStart", searchUserAPI)]);
  yield all([
    yield takeLatest("home/fetchTrendingUsersStart", fetchTrendingUsersAPI),
  ]);
  yield all([
    yield takeLatest("home/fetchPostSuggestionsStart", fetchPostSuggestionAPI),
  ]);
}
