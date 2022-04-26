import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    fetchStoriesSuccess,
    fetchStoriesFailure,
    fetchUserStoriesSuccess,
    fetchUserStoriesFailure,
    storyFileUploadSuccess,
    storyFileUploadFailure,
    fetchStoriesStart,
    storyFileDeleteSuccess,
    storyFileDeleteFailure,
    fetchUserStoriesStart,
  } from "../slices/storiesSlice";


  function* fetchUserStoriesAPI() {
    try {
      const skipCount = yield select((state) => state.stories.userStories.skip);
      const response = yield api.postMethod("stories_list", null, null, { skip: skipCount });
  
      if (response.data.success) {
        yield put(fetchUserStoriesSuccess(response.data.data));
      } else {
        yield put(fetchUserStoriesFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchUserStoriesFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  function* fetchStoriesAPI() {
    try {
      const response = yield api.postMethod("stories_home");
      if (response.data.success) {
        yield put(fetchStoriesSuccess(response.data.data));
      } else {
        yield put(fetchStoriesFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchStoriesFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  function* storyFileUploadAPI(action) {
    try {
      const response = yield api.postMethod("story_files_upload" ,null, null,  action.data);
  
      if (response.data.success) {
        yield put(storyFileUploadSuccess(response.data.data));
        yield put(fetchStoriesStart());
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
      } else {
        yield put(storyFileUploadFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(storyFileUploadFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  function* storyFileDeleteAPI(action) {
    try {
      const response = yield api.postMethod("stories_delete" ,null, null, action.data);
  
      if (response.data.success) {
        yield put(storyFileDeleteSuccess(response.data.data));
        yield put(fetchUserStoriesStart())
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
      } else {
        yield put(storyFileDeleteFailure(response.data.error));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(storyFileDeleteFailure(error));
    //   const notificationMessage = getErrorNotificationMessage(error.message);
    //   yield put(createNotification(notificationMessage));
    }
  }
  
  export default function* pageSaga() {
    yield all([yield takeLatest("stories/fetchStoriesStart", fetchStoriesAPI)]);
    yield all([yield takeLatest("stories/storiesFileUploadStart", storyFileUploadAPI)]);
    yield all([yield takeLatest("stories/fetchUserStoriesStart", fetchUserStoriesAPI)]);
    yield all([yield takeLatest("stories/storiesFileDeleteStart", storyFileDeleteAPI)]);
  }