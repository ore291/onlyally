import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchChannelsFailure,
  fetchChannelsSuccess,
  fetchChannelsStart,
  channelSubscribeSuccess,
  channelSubscribeFailure,
  fetchSingleChannelStart,
  fetchSingleChannelSuccess,
  fetchSingleChannelFailure,
  createChannelSuccess,
  createChannelFailure,
  fetchChannelsCategoriesSuccess,
  fetchChannelsCategoriesFailure,
  fetchUserChannelsSuccess,
  fetchUserChannelsFailure,
  updateChannelInfoFailure,
  updateChannelInfoSuccess,
  updateChannelPhotosFailure,
  updateChannelPhotosSuccess,
  updateChannelPrivacyFailure,
  updateChannelPrivacySuccess,
  saveChannelPostSuccess,
  saveChannelPostFailure,
} from "../slices/channelsSlice";
// import { fetchChannelsCategoriesSuccess } from "../slices/channelsSlice";



function* updateUserChannelInfoAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `channels/${action.payload.slug}/info`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateChannelInfoSuccess(response.data.data));
      yield put(fetchSingleChannelStart({
        channel_slug : action.payload.slug
      }));
      yield put(notify({ message: "Channel Updated Successfully", status: "success" }));

    } else {
      yield put(updateChannelInfoFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateChannelInfoFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserChannelPhotosAPI(action) {
  try {
    const response = yield api.postMethod({
      action: `channels/${action.payload.slug}/photos`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateChannelPhotosSuccess(response.data.data));
      yield put(fetchSingleChannelStart({
        channel_slug : action.payload.slug
      }));
      yield put(notify({ message: "Channel Updated Successfully", status: "success" }));

    } else {
      yield put(updateChannelPhotosFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateChannelPhotosFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserChannelPrivacyAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `channels/${action.payload.slug}/privacy`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateChannelPrivacySuccess(response.data.data));
      yield put(fetchSingleChannelStart({
        channel_slug : action.payload.slug
      }));
      yield put(notify({ message: "Channel Updated Successfully", status: "success" }));

    } else {
      yield put(updateChannelPrivacyFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateChannelPrivacyFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* saveChannelPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.channels.saveChannelPost.inputData
    );

    if (!inputData.content && !inputData.post_files) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(saveChannelPostFailure("Please fill the content"));
      yield put(
        notify({ message: "Please fill the content", status: "error" })
      );
    } else {
      const response = yield api.postMethod({
        action: `channels/${inputData.channel_slug}/posts_save_for_owner`,
        object: inputData,
      });
      if (response.data.success) {
        yield put(saveChannelPostSuccess(response.data.data));
        yield put(
          notify({ message: response.data.message, status: "success" })
        );

        yield put(fetchSingleChannelStart({channel_slug : inputData.channel_slug}));

        // window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(saveChannelPostFailure(response.data.error));
        yield put(errorLogoutCheck(response.data));
        yield put(notify({ message: response.data.error, status: "error" }));
      }
    }
  } catch (error) {
    yield put(saveChannelPostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchChannelsAPI(action) {
  if(action.payload){
    var accessToken =  action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "channels",
      accessToken : accessToken
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

function* fetchUserChannelsAPI(action) {
  if(action.payload){
    var accessToken =  action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "channels/if_member",
      accessToken : accessToken
    });
    if (response.data.success) {
      yield put(fetchUserChannelsSuccess(response.data.data));
    } else {
      yield put(fetchUserChannelsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchUserChannelsFailure(error.message));
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
      yield put(fetchChannelsStart());
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
  if(action.payload){
    var accessToken =  action.payload.accessToken;
    var slug = action.payload.channel_slug;

  }
  // const inputData = yield select(
  //   (state) => state.channels.channelData.inputData
  // );
  try {
    const response = yield api.getMethod({
      action: `channels/${slug}`,
      accessToken: accessToken,
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
      window.location.assign("/gopro/" );
    }
  } catch (error) {
    yield put(createChannelFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchChannelsCategoriesAPI(action) {
  if(action.payload){
    var accessToken =  action.payload.accessToken;

  }
  try {
    const response = yield api.getMethod({
      action: "channels/categories",
      accessToken : accessToken
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
  yield all([yield takeLatest("channels/saveChannelPostStart", saveChannelPostAPI)]);
  yield all([
    yield takeLatest("channels/fetchChannelsStart", fetchChannelsAPI),
  ]);
  yield all([
    yield takeLatest("channels/fetchUserChannelsStart", fetchUserChannelsAPI),
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
  yield all([
    yield takeLatest(
      "channels/updateChannelInfoStart",
      updateUserChannelInfoAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "channels/updateChannelPhotosStart",
      updateUserChannelPhotosAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "channels/updateChannelPrivacyStart",
      updateUserChannelPrivacyAPI
    ),
  ]);
}
