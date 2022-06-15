import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
 fetchGroupsFailure,
  fetchGroupsSuccess,
  joinGroupSuccess,
  joinGroupFailure,
  fetchGroupsCategoriesSuccess,
  fetchGroupsCategoriesFailure,
  createGroupSuccess,
  createGroupFailure
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

function* fetchGroupsCategoriesAPI(action) {
    try {
      const response = yield api.getMethod({
        action: "groups/categories"
      });
    
      if (response.status === 200) {
        yield put(fetchGroupsCategoriesSuccess(response.data));
      } else {
        yield put(fetchGroupsCategoriesFailure( response.error));
        yield put(notify({message : response.error, status :'error'}));
      }
    } catch (error) {
      yield put(fetchGroupsCategoriesFailure(error.message));
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

  function* groupCreateAPI(action) {
    const inputData = yield select((state) => state.groups.createGroup.inputData);
      try {
        const response = yield api.postMethod({
          action: 'groups', object: inputData
        });
      
        if (response.status && response.status === 201) {
          yield put(createGroupSuccess(response.data));
          yield put(notify({message : "Group created successfully", status :'success'}));
          window.location.assign("/groups/" + response.data.data.slug);
        } else {
          yield put(createGroupFailure(response.data.message));
          yield put(notify({message : response.data.message, status :'error'}));
        }
      } catch (error) {
        yield put(createGroupFailure(error));
        yield put(notify({ message: error.message, status: "error"}));
      }
    }
  


  export default function* pageSaga() {
    yield all([yield takeLatest("groups/fetchGroupsStart", fetchGroupsAPI)]);
    yield all([yield takeLatest("groups/fetchGroupsCategoriesStart", fetchGroupsCategoriesAPI)]);
    yield all([yield takeLatest("groups/joinGroupStart", groupJoinAPI)]);
    yield all([yield takeLatest("groups/createGroupStart", groupCreateAPI)]);
  }