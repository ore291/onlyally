import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
 fetchChannelsFailure,
  fetchChannelsSuccess,
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


  export default function* pageSaga() {
    yield all([yield takeLatest("channels/fetchChannelsStart", fetchChannelsAPI)]);
  }