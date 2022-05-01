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

import { notify} from "reapop";

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
      yield put(fetchUserStoriesFailure( response.data.error.error));
      yield put(notify( response.data.error.error, 'error'));
    }
  } catch (error) {
    yield put(fetchUserStoriesFailure(error));
    yield put(notify(error.message, 'error'));
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
      yield put(fetchStoriesFailure( response.data.error.error.error));
      yield put(notify({message:  response.data.error.error, status:"error"}))
    }
  } catch (error) {
    yield put(fetchStoriesFailure(error));
    yield put(notify({message: error.message, status:"error"}))
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
      yield put(notify({ message: response.data.message, status: 'success' }))
    } else {
      yield put(storyFileUploadFailure( response.data.error.error));
      yield put(notify({message:  response.data.error.error, status:"error"}))
    }
  } catch (error) {
    yield put(storyFileUploadFailure(error));
    yield put(notify({message: error.message, status:"error"}))
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
      yield put(notify({ message: response.data.message, status: 'success' }))
    } else {
      yield put(storyFileDeleteFailure( response.data.error.error));
      yield put(notify({message:  response.data.error.error, status:"error"}))
    }
  } catch (error) {
    yield put(storyFileDeleteFailure(error));
    yield put(notify({message: error.message, status:"error"}))
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
