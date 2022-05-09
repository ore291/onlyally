import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {notify} from 'reapop';

import {
    fetchSingleUserPostsFailure,
    fetchSingleUserPostsSuccess,
    fetchSingleUserProfileFailure,
    fetchSingleUserProfileSuccess,
    searchUserPostSuccess,
    searchUserPostFailure,
  } from "../slices/OtherUsersSlice";

import {errorLogoutCheck} from "../slices/errorSlice";

function* fetchOtherUserProfileAPI() {
    try {
      const inputData = yield select(
        (state) => state.otherUser.userDetails.inputData
      );
      if (inputData.user_unique_id == localStorage.getItem("user_unique_id")) {
        window.location.assign("/profile");
      }
      const response = yield api.postMethod({action:"other_profile",object: inputData});
      if (response.data.success) {
        yield put(fetchSingleUserProfileSuccess(response.data.data));
      } else {
        yield put(fetchSingleUserProfileFailure(response.data.error));
        yield put(errorLogoutCheck(response.data));
        yield put(notify({message: response.data.error, status: "error"}));
        window.location.assign("/");
      }
    } catch (error) {
      yield put(fetchSingleUserProfileFailure(error.message));
      yield put(notify({message: error.message, status: "error"}));
    }
  }
  
  function* fetchOtherUserPostAPI() {
    try {
      const inputData = yield select(
        (state) => state.otherUser.userPosts.inputData
      );
      const skipCount = yield select((state) => state.otherUser.userPosts.skip);
      const response = yield api.postMethod({action : "other_profile_posts", object : {
        ...inputData,
        skip: skipCount,
      } });
      if (response.data.success) {
        yield put(fetchSingleUserPostsSuccess(response.data.data));
      } else {
        yield put(fetchSingleUserPostsFailure(response.data.error));
        
        yield put(errorLogoutCheck(response.data));
        yield put(notify({message:response.data.error, type:"error"}));
      }
    } catch (error) {
      yield put(fetchSingleUserPostsFailure(error));
      yield put(notify(error.message));
    }
  }
  
  function* searchPostAPI() {
    try {
      const inputData = yield select(
        (state) => state.otherUser.searchPosts.inputData
      );
      const response = yield api.postMethod({action : "posts_search", object: inputData});
      if (response.data.success) {
        yield put(fetchSingleUserPostsSuccess(response.data.data));
      } else {
        yield put(searchUserPostFailure(response.data.error));
        yield put(notify(response.data.error));
      }
    } catch (error) {
      yield put(searchUserPostFailure(error));
      yield put(notify(error.message));
    }
  }
  
  export default function* pageSaga() {
    yield all([
      yield takeLatest("otherUser/fetchSingleUserProfileStart", fetchOtherUserProfileAPI),
    ]);
    yield all([
      yield takeLatest("otherUser/fetchSingleUserPostsStart", fetchOtherUserPostAPI),
    ]);
  
    yield all([yield takeLatest('otherUser/searchUserPostStart', searchPostAPI)]);
  }