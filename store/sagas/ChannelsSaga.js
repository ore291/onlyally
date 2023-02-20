import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchPostsSuccess,
  fetchPostsFailure,
  finishPaymentSuccess,
  finishPaymentFailure,
  channelPaymentSuccess,
  channelPaymentFailure,
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
  fetchOtherUserChannelsSuccess,
  fetchOtherUserChannelsFailure,
  updateChannelInfoFailure,
  updateChannelInfoSuccess,
  updateChannelPhotosFailure,
  updateChannelPhotosSuccess,
  updateChannelPrivacyFailure,
  updateChannelPrivacySuccess,
  saveChannelPostSuccess,
  saveChannelPostFailure,
  deleteChannelMemberFailure,
  deleteChannelMemberSuccess,
  deleteChannelSuccess,
  deleteChannelFailure,
  updateChannelMemberSuccess,
  updateChannelMemberFailure,
  fetchTimelinePostsSuccess,
  fetchTimelinePostsFailure,
} from "../slices/channelsSlice";
// import { fetchChannelsCategoriesSuccess } from "../slices/channelsSlice";

import {errorLogoutCheck} from "../slices/errorSlice"


function* fetchChannelTimelinePostsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    
    const response = yield api.getMethod({
      action: `channels/timeline`,
      accessToken: accessToken,
    });
    
    if (response.data.success) {
      yield put(fetchTimelinePostsSuccess(response.data.data));
    } else {
      yield put(fetchTimelinePostsFailure(response.data));
      yield put(errorLogoutCheck(response.data));
      // yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchTimelinePostsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}
function* fetchChannelPostsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const inputData = yield select((state) => state.channels.posts.inputData);
    const response = yield api.postMethod({
      action: `channels/${inputData.channel_slug}/posts_for_owner`,
      object: inputData,
      accessToken: accessToken,
    });
    
    if (response.data.success) {
      yield put(fetchPostsSuccess(response.data.data));
    } else {
      yield put(fetchPostsFailure(response.data));
      yield put(errorLogoutCheck(response.data));
      // yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}


function* channelPaymentAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `channels/${action.payload.slug}/member`,
      object: action.payload,
    });
    if (response.status == 402) {
      yield put(channelPaymentSuccess(response.error));
      yield put(notify({ message: response.error.message, status: "info" }));
    } else {
      yield put(channelPaymentFailure(response.error));
      yield put(notify({ message: response.error.message, status: "error" }));
    }
  } catch (error) {
    yield put(channelPaymentFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* privateChannelJoinAPI(action) {
  if (action.payload) {
    var object = action.payload;
  }
  try {
    const response = yield api.putMethod({
      action: `channels/${object.slug}/member`,
      object: object,
    });

    if (response.data != null && response.data.success != null) {
      yield put(finishPaymentSuccess(response.data.data));
      yield put(fetchChannelsStart());
      yield put(notify({ message: "Channel subscribed", status: "success" }));
    } else {
      yield put(finishPaymentFailure(response));
      yield put(notify({ message: response.error.message, status: "error" }));
    }
  } catch (error) {
    yield put(finishPaymentFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserChannelMemberAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `channels/${action.payload.slug}/member`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateChannelMemberSuccess(response.data.data));
      yield put(
        fetchSingleChannelStart({
          channel_slug: action.payload.slug,
        })
      );
    } else {
      yield put(updateChannelMemberFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateChannelMemberFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserChannelInfoAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `channels/${action.payload.slug}/info`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateChannelInfoSuccess(response.data.data));
      yield put(
        fetchSingleChannelStart({
          channel_slug: action.payload.slug,
        })
      );
      yield put(
        notify({ message: "Channel Updated Successfully", status: "success" })
      );
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
      yield put(
        fetchSingleChannelStart({
          channel_slug: action.payload.slug,
        })
      );
      yield put(
        notify({ message: "Channel Updated Successfully", status: "success" })
      );
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
      yield put(
        fetchSingleChannelStart({
          channel_slug: action.payload.slug,
        })
      );
      yield put(
        notify({ message: "Channel Updated Successfully", status: "success" })
      );
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

        yield put(
          fetchSingleChannelStart({ channel_slug: inputData.channel_slug })
        );

        // window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(saveChannelPostFailure(response.data.error));
  
        yield put(notify({ message: response.data.error.code, status: "error" }));
      }
    }
  } catch (error) {
    yield put(saveChannelPostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchChannelsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "channels",
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchChannelsSuccess(response.data.data));
    } else {
      yield put(fetchChannelsFailure(response.data.error));
      // yield put(notify({ message: response.data.error?.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchChannelsFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchUserChannelsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "channels/if_member",
      accessToken: accessToken,
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

function* fetchOtherUserChannelsAPI(action) {
  if (action.payload) {
    var id = action.payload.user_id;
  }
  try {
    const response = yield api.getMethod({
      action: `channels/if_member/${id}`,
    });
    if (response.data.success) {
      yield put(fetchOtherUserChannelsSuccess(response.data.data));
    } else {
      yield put(fetchOtherUserChannelsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchOtherUserChannelsFailure(error.message));
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
  if (action.payload) {
    var accessToken = action.payload.accessToken;
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
      window.location.assign("/go-pro/");
    }
  } catch (error) {
    yield put(createChannelFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchChannelsCategoriesAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "channels/categories",
      accessToken: accessToken,
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

function* deleteChannelAPI(action) {
  try {
    const response = yield api.deleteMethod({
      action: `channels/${action.payload}`,
    });
    console.log(response);
    if (response.status && response.status === 204) {
      yield put(deleteChannelSuccess(response.data));
      yield put(
        notify({ message: "Channel deleted successfully", status: "success" })
      );
      window.location.assign("/channels");
    } else {
      yield put(deleteChannelFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
    }
  } catch (error) {
    yield put(deleteChannelFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteChannelMemberAPI(action) {
  try {
    const response = yield api.deleteMethod({
      action: `channels/${action.payload.slug}/member`,
      object: {
        user_id: action.payload.user_id,
      },
    });
    if (response.status && response.status === 204) {
      yield put(deleteChannelMemberSuccess(response.data));
      yield put(
        notify({
          message: "Subscription cancelled successfully",
          status: "success",
        })
      );
      yield put(fetchSingleChannelStart({ channel_slug: action.payload.slug }));
    } else {
      yield put(deleteChannelMemberFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
    }
  } catch (error) {
    yield put(deleteChannelMemberFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("channels/deleteChannelStart", deleteChannelAPI),
  ]);
  yield all([
    yield takeLatest("channels/fetchPostsStart", fetchChannelPostsAPI),
  ]);
  yield all([
    yield takeLatest("channels/fetchTimelinePostsStart", fetchChannelTimelinePostsAPI),
  ]);
  yield all([
    yield takeLatest(
      "channels/deleteChannelMemberStart",
      deleteChannelMemberAPI
    ),
  ]);
  yield all([
    yield takeLatest("channels/saveChannelPostStart", saveChannelPostAPI),
  ]);
  yield all([
    yield takeLatest("channels/fetchChannelsStart", fetchChannelsAPI),
  ]);
  yield all([
    yield takeLatest("channels/fetchUserChannelsStart", fetchUserChannelsAPI),
  ]);
  yield all([
    yield takeLatest(
      "channels/fetchOtherUserChannelsStart",
      fetchOtherUserChannelsAPI
    ),
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
      "channels/updateChannelMemberStart",
      updateUserChannelMemberAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "channels/updateChannelPrivacyStart",
      updateUserChannelPrivacyAPI
    ),
  ]);
  yield all([
    yield takeLatest("channels/finishPaymentStart", privateChannelJoinAPI),
  ]);
  yield all([
    yield takeLatest("channels/channelPaymentStart", channelPaymentAPI),
  ]);
}
