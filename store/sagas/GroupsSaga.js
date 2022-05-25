import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
 fetchGroupsFailure,
  fetchGroupsSuccess,
} from "../slices/groupsSlice";



function* fetchGroupsAPI(action) {
    try {
      const response = yield api.getMethod({
        action: "groups"
      });
      if (response.data.success) {
        yield put(fetchGroupsSuccess(response.data.data));
      } else {
        yield put(fetchGroupsFailure( response.data.error));
        yield put(notify({message : response.data.error, status :'error'}));
      }
    } catch (error) {
      yield put(fetchGroupsFailure(error.message));
      yield put(notify(error.message, 'error'));
    }
  }


  export default function* pageSaga() {
    yield all([yield takeLatest("groups/fetchGroupsStart", fetchGroupsAPI)]);
  }