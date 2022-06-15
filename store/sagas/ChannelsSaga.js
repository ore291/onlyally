import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchChannelsFailure,
  fetchChannelsSuccess,
  channelSubscribeSuccess,
  channelSubscribeFailure,
  fetchSingleChannelSuccess,
  fetchSingleChannelFailure,
  createChannelSuccess,
  createChannelFailure,
  fetchChannelsCategoriesSuccess,
  fetchChannelsCategoriesFailure,
} from "../slices/channelsSlice";
import { fetchGroupsCategoriesSuccess } from "../slices/groupsSlice";

function* fetchChannelsAPI(action) {
  try {
    const response = yield api.getMethod({
      action: "channels",
    });
    if (response.data.success) {
      yield put(fetchChannelsSuccess(response.data.data));
    } else {
      yield put(fetchChannelsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchChannelsFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* channelSubscribeAPI(action) {
  const inputData = yield select(
    (state) => state.channels.channelSubscribe.inputData
  );
  try {
    const response = yield api.putMethod({
      action: `channels/${inputData}/member`,
    });
    if (response.data.success) {
      yield put(channelSubscribeSuccess(response.data.data));
      yield put(notify({ message: "Channel Subscribed", status: "success" }));
    } else {
      yield put(channelSubscribeFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(channelSubscribeFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchSingleChannelAPI(action) {
  const inputData = yield select(
    (state) => state.channels.channelData.inputData
  );
  try {
    const response = yield api.getMethod({
      action: `channels/${inputData}`,
    });
    if (response.data.success) {
      yield put(fetchSingleChannelSuccess(response.data.data));
    } else {
      yield put(fetchSingleChannelFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleChannelFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* channelCreateAPI(action) {
  const inputData = yield select(
    (state) => state.channels.createChannel.inputData
  );
  try {
    const response = yield api.postMethod({
      action: "channels",
      object: inputData,
    });

    if (response.status === 201) {
      yield put(createChannelSuccess(response.data.data));
      yield put(
        notify({ message: "Channel created successfully", status: "success" })
      );
      window.location.assign("/channels/" + response.data.data.slug);
    } else {
      yield put(createChannelFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
    }
  } catch (error) {
    yield put(createChannelFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchChannelsCategoriesAPI(action) {
  try {
    const response = yield api.getMethod({
      action: "channels/categories",
    });

    if (response.status === 200) {
      yield put(fetchChannelsCategoriesSuccess(response.data));
    } else {
      yield put(fetchChannelsCategoriesFailure(response.error));
      yield put(notify({ message: response.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchChannelsCategoriesFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("channels/fetchChannelsStart", fetchChannelsAPI),
  ]);
  yield all([
    yield takeLatest("channels/channelSubscribeStart", channelSubscribeAPI),
  ]);
  yield all([
    yield takeLatest("channels/fetchSingleChannelStart", fetchSingleChannelAPI),
  ]);
  yield all([
    yield takeLatest("channels/createChannelStart", channelCreateAPI),
  ]);
  yield all([
    yield takeLatest(
      "channels/fetchChannelsCategoriesStart",
      fetchChannelsCategoriesAPI
    ),
  ]);
}
