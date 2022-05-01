import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    fetchPostLikedFailure,
    fetchPostLikedSuccess,
    savePostLikedFailure,
    savePostLikedSuccess,
    savePostLikedStart
  } from "../slices/postLikeSlice";

  import {notify} from "reapop";


  function* savePostLikesAPI() {
    try {
      const inputData = yield select(
        (state) => state.postlikes.saveLike.inputData
      );
      const response = yield api.postMethod({action:"post_likes_save",object : inputData});

      if (response.data.success) {
        yield put(savePostLikedSuccess(response.data.data));
        yield put(notify({ message: response.data.message, status: 'success' }))
      } else {
     
        yield put(savePostLikedFailure( response.data.error.error));
        // yield put(checkLogo1utStatus(response.data));
        yield put(notify({message:  response.data.error.error, status:"error"}))
      }
    } catch (error) {
    
      yield put(savePostLikedFailure(error));
      yield put(notify({message: error.message, status:"error"}))
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
        yield put(fetchPostLikedFailure( response.data.error.error));
        // yield put(checkLogoutStatus(response.data));
        yield put(notify({message:  response.data.error.error, status:"error"}))
      }
    } catch (error) {
      yield put(fetchPostLikedFailure(error));
      yield put(notify({message: error.message, status:"error"}))
    }
  }
  
  export default function* pageSaga() {
    yield all([yield takeLatest('postlikes/savePostLikedStart', savePostLikesAPI)]);
    // yield all([yield takeLatest('postlikes/fetchPostLikedStart', fetchPostLikesAPI)]);
  }