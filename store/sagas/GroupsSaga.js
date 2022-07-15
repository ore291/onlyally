import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { notify } from "reapop";

import {
  fetchSingleGroupMemberSuccess,
  fetchSingleGroupMemberFailure,
  saveGroupPostStart,
  saveGroupPostSuccess,
  saveGroupPostFailure,
  fetchGroupsFailure,
  fetchGroupsSuccess,
  fetchGroupsStart,
  joinGroupSuccess,
  joinGroupFailure,
  fetchGroupsCategoriesSuccess,
  fetchGroupsCategoriesFailure,
  createGroupSuccess,
  fetchSingleGroupSuccess,
  fetchSingleGroupFailure,
  fetchSingleGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure
} from "../slices/groupsSlice";

function* saveGroupPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.groups.saveGroupPost.inputData
    );

    if (!inputData.content && !inputData.post_files) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(saveGroupPostFailure("Please fill the content"));
      yield put(
        notify({ message: "Please fill the content", status: "error" })
      );
    } else {
      const response = yield api.postMethod({
        action: `groups/${inputData.group_slug}/posts_save_for_owner`,
        object: inputData,
      });
      if (response.data.success) {
        yield put(saveGroupPostSuccess(response.data.data));
        yield put(
          notify({ message: response.data.message, status: "success" })
        );

        yield put(fetchSingleGroupStart(inputData.group_slug));

        // window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(saveGroupPostFailure(response.data.error));
        yield put(errorLogoutCheck(response.data));
        yield put(notify({ message: response.data.error, status: "error" }));
      }
    }
  } catch (error) {
    yield put(saveGroupPostFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchGroupsAPI(action) {
  try {
    const response = yield api.getMethod({
      action: "groups",
    });
    if (response.data.success) {
      yield put(fetchGroupsSuccess(response.data.data));
    } else {
      yield put(fetchGroupsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchGroupsFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchGroupsCategoriesAPI(action) {
  try {
    const response = yield api.getMethod({
      action: "groups/categories",
    });

    if (response.status === 200) {
      yield put(fetchGroupsCategoriesSuccess(response.data));
    } else {
      yield put(fetchGroupsCategoriesFailure(response.error));
      yield put(notify({ message: response.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchGroupsCategoriesFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* groupJoinAPI(action) {
  const inputData = yield select((state) => state.groups.joinGroup.inputData);
  try {
    const response = yield api.putMethod({
      action: `groups/${inputData}/member`,
    });
    if (response.data.success) {
      yield put(joinGroupSuccess(response.data.data));
      yield put(fetchGroupsStart());
      yield put(notify({ message: "Group joined", status: "success" }));
    } else {
      yield put(joinGroupFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(joinGroupFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchSingleGroupAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var userId = action.payload.userId;
    var dev_model = action.payload.device_model;
    var slug = action.payload.group_slug;
  }
  // const inputData = yield select((state) => state.groups.groupData.inputData);
  try {
    const response = yield api.getMethod({
      action: `groups/${slug}`,
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchSingleGroupSuccess(response.data.data));
    } else {
      yield put(fetchSingleGroupFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleGroupFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}


function* fetchSingleGroupMembersAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var slug = action.payload.group_slug;
  }

 
  try {
    const response = yield api.getMethod({
      action: `groups/${slug}/members`,
      accessToken: accessToken,
    });
    if (response.data.success) {

      yield put(fetchSingleGroupMemberSuccess(Object.values(response.data.data)));
    } else {
      yield put(fetchSingleGroupMemberFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchSingleGroupMemberFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* groupCreateAPI(action) {
  const inputData = yield select((state) => state.groups.createGroup.inputData);
  try {
    const response = yield api.postMethod({
      action: "groups",
      object: inputData,
    });

    if (response.status && response.status === 201) {
      yield put(createGroupSuccess(response.data));
      yield put(
        notify({ message: "Group created successfully", status: "success" })
      );
      window.location.assign("/groups/" + response.data.data.slug);
    } else {
      yield put(deleteGroupFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
      window.location.assign("/gopro/");
    }
  } catch (error) {
    yield put(deleteGroupFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteGroupAPI(action) {
  try {
    const response = yield api.deleteMethod({
      action: `groups/${action.payload}`,
    });

    if (response.status && response.status === 201) {
      yield put(deleteGroupSuccess(response.data));
      yield put(
        notify({ message: "Group deleted successfully", status: "success" })
      );
      window.location.assign("/groups");
    } else {
      yield put(deleteGroupFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
    }
  } catch (error) {
    yield put(deleteGroupFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("groups/saveGroupPostStart", saveGroupPostAPI)]);
  yield all([yield takeLatest("groups/deleteGroupStart", deleteGroupAPI)]);
  yield all([yield takeLatest("groups/fetchGroupsStart", fetchGroupsAPI)]);
  yield all([
    yield takeLatest(
      "groups/fetchGroupsCategoriesStart",
      fetchGroupsCategoriesAPI
    ),
  ]);
  yield all([yield takeLatest("groups/joinGroupStart", groupJoinAPI)]);
  yield all([yield takeLatest("groups/createGroupStart", groupCreateAPI)]);
  yield all([
    yield takeLatest("groups/fetchSingleGroupStart", fetchSingleGroupAPI),
  ]);
  yield all([
    yield takeLatest(
      "groups/fetchSingleGroupMemberStart",
      fetchSingleGroupMembersAPI
    ),
  ]);
}
