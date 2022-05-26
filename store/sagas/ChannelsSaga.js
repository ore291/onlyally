import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
 fetchChannelsFailure,
  fetchChannelsSuccess,
  channelSubscribeSuccess,
  channelSubscribeFailure,
  fetchSingleChannelSuccess,
  fetchSingleChannelFailure
} from "../slices/channelsSlice";



function* fetchChannelsAPI(action) {
    try {
      const response = yield api.getMethod({
        action: "channels"
      });
      if (response.data.success) {
        yield put(fetchChannelsSuccess(response.data.data));

      } else {
        yield put(fetchChannelsFailure( response.data.error));
        yield put(notify({message : response.data.error, status :'error'}));
      }
    } catch (error) {
      yield put(fetchChannelsFailure(error.message));
      yield put(notify(error.message, 'error'));
    }
  }

function* channelSubscribeAPI(action) {
  const inputData = yield select((state) => state.channels.channelSubscribe.inputData);
    try {
      const response = yield api.putMethod({
        action: `channels/${inputData}/member`
      });
      if (response.data.success) {
        yield put(channelSubscribeSuccess(response.data.data));
        yield put(notify({message : "Channel Subscribed", status :'success'}));
      } else {
        yield put(channelSubscribeFailure( response.data.error));
        yield put(notify({message : response.data.error, status :'error'}));
      }
    } catch (error) {
      yield put(channelSubscribeFailure(error.message));
      yield put(notify(error.message, 'error'));
    }
  }

function* fetchSingleChannelAPI(action) {
  const inputData = yield select((state) => state.channels.channelData.inputData);
    try {
      const response = yield api.getMethod({
        action: `channels/${inputData}`
      });
      if (response.data.success) {
        yield put(fetchSingleChannelSuccess(response.data.data));
       
      } else {
        yield put(fetchSingleChannelFailure( response.data.error));
        yield put(notify({message : response.data.error, status :'error'}));
      }
    } catch (error) {
      yield put(fetchSingleChannelFailure(error.message));
      yield put(notify(error.message, 'error'));
    }
  }


  export default function* pageSaga() {
    yield all([yield takeLatest("channels/fetchChannelsStart", fetchChannelsAPI)]);
    yield all([yield takeLatest("channels/channelSubscribeStart", channelSubscribeAPI)]);
    yield all([yield takeLatest("channels/fetchSingleChannelStart", fetchSingleChannelAPI)]); 
  }