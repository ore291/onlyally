import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    fetchPostLikedFailure,
    fetchPostLikedSuccess,
    savePostLikedFailure,
    savePostLikedSuccess,
    savePostLikedStart
  } from "../slices/postLikeSlice";


  function* savePostLikesAPI() {
    try {
      const inputData = yield select(
        (state) => state.postlikes.saveLike.inputData
      );
      const response = yield api.postMethod({action:"post_likes_save",object : inputData});

      if (response.data.success) {
        yield put(savePostLikedSuccess(response.data.data));
      } else {
     
        yield put(savePostLikedFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogo1utStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
    
      yield put(savePostLikedFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  function* fetchPostLikesAPI() {
    try {
      const inputData = yield select(
        (state) => state.postLikes.saveLike.inputData
      );
      const response = yield api.postMethod({action:"post_likes",object:inputData});
      if (response.data.success) {
        yield put(fetchPostLikedSuccess(response.data.data));
      } else {
        yield put(fetchPostLikedFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(checkLogoutStatus(response.data));
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchPostLikedFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  export default function* pageSaga() {
    yield all([yield takeLatest('postlikes/savePostLikedStart', savePostLikesAPI)]);
    // yield all([yield takeLatest('postlikes/fetchPostLikedStart', fetchPostLikesAPI)]);
  }