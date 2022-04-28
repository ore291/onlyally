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

function* fetchUserStoriesAPI(action) {
  try {
    const skipCount = yield select((state) => state.stories.userStories.skip);
    const response = yield api.postMethod({
      action: "fetchstories_list",
      accessToken,
      userId,
      dev_model,
      object: { skip: skipCount },
    });

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

function* fetchStoriesAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var userId = action.payload.userId;
    var dev_model = action.payload.device_model;
  }

  try {
    const response = yield api.postMethod({
      action: "stories_home",
      accessToken,
      userId,
      dev_model,
    });
    if (response.data.success) {
      yield put(fetchStoriesSuccess(response.data.data));
    } else {
      yield put(fetchStoriesFailure(response.data.error.error));
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
    const response = yield api.postMethod({
      action: "story_files_upload",
      object: action.payload,
    });

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
    const response = yield api.postMethod({
      action: "stories_delete",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(storyFileDeleteSuccess(response.data.data));
      yield put(fetchUserStoriesStart());
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
  yield all([
    yield takeLatest("stories/storyFileUploadStart", storyFileUploadAPI),
  ]);
  yield all([
    yield takeLatest("stories/fetchUserStoriesStart", fetchUserStoriesAPI),
  ]);
  yield all([
    yield takeLatest("stories/storyFileDeleteStart", storyFileDeleteAPI),
  ]);
}
