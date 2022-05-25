import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
 fetchGroupsFailure,
  fetchGroupsSuccess,
  joinGroupSuccess,
  joinGroupFailure
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

  function* groupJoinAPI(action) {
    const inputData = yield select((state) => state.groups.joinGroup.inputData);
      try {
        const response = yield api.putMethod({
          action: `groups/${inputData}/member`
        });
        if (response.data.success) {
          yield put(joinGroupSuccess(response.data.data));
          yield put(notify({message : "Group joined", status :'success'}));
        } else {
          yield put(joinGroupFailure( response.data.error));
          yield put(notify({message : response.data.error, status :'error'}));
        }
      } catch (error) {
        yield put(joinGroupFailure(error.message));
        yield put(notify(error.message, 'error'));
      }
    }
  


  export default function* pageSaga() {
    yield all([yield takeLatest("groups/fetchGroupsStart", fetchGroupsAPI)]);
    yield all([yield takeLatest("groups/joinGroupStart", groupJoinAPI)]);
  }