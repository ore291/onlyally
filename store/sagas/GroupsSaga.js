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
  createGroupFailure,
  fetchSingleGroupSuccess,
  fetchSingleGroupFailure,
  fetchSingleGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
  fetchUserGroupsSuccess,
  fetchUserGroupsFailure,
  fetchOtherUserGroupsSuccess,
  fetchOtherUserGroupsFailure,
  updateGroupInfoFailure,
  updateGroupInfoSuccess,
  updateGroupPhotosFailure,
  updateGroupPhotosSuccess,
  updateGroupPrivacyFailure,
  updateGroupPrivacySuccess,
  deleteGroupMemberFailure,
  deleteGroupMemberSuccess,
  updateGroupMemberSuccess,
  updateGroupMemberFailure,
} from "../slices/groupsSlice";

function* saveGroupPostAPI(action) {
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

        yield put(fetchSingleGroupStart({ group_slug: inputData.group_slug }));

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
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "groups",
      accessToken: accessToken,
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

function* fetchUserGroupsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "groups/if_member",
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchUserGroupsSuccess(response.data.data));
    } else {
      yield put(fetchUserGroupsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchUserGroupsFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}
function* fetchOtherUserGroupsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var id = action.payload.user_id;
  }
  try {
    const response = yield api.getMethod({
      action: `groups/if_member/${id}`,
      accessToken: accessToken,
    });
    if (response.data.success) {
      yield put(fetchOtherUserGroupsSuccess(response.data.data));
    } else {
      yield put(fetchOtherUserGroupsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchOtherUserGroupsFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserGroupInfoAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `groups/${action.payload.slug}/info`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateGroupInfoSuccess(response.data.data));
      yield put(
        fetchSingleGroupStart({
          group_slug: action.payload.slug,
        })
      );
      yield put(
        notify({ message: "Group Updated Successfully", status: "success" })
      );
    } else {
      yield put(updateGroupInfoFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateGroupInfoFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserGroupPhotosAPI(action) {
  try {
    const response = yield api.postMethod({
      action: `groups/${action.payload.slug}/photos`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateGroupPhotosSuccess(response.data.data));
      yield put(
        fetchSingleGroupStart({
          group_slug: action.payload.slug,
        })
      );
      yield put(
        notify({ message: "Group Updated Successfully", status: "success" })
      );
    } else {
      yield put(updateGroupPhotosFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateGroupPhotosFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserGroupPrivacyAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `groups/${action.payload.slug}/privacy`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateGroupPrivacySuccess(response.data.data));
      yield put(
        fetchSingleGroupStart({
          group_slug: action.payload.slug,
        })
      );
      yield put(
        notify({ message: "Group Updated Successfully", status: "success" })
      );
    } else {
      yield put(updateGroupPrivacyFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateGroupPrivacyFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* updateUserGroupMemberAPI(action) {
  try {
    const response = yield api.putMethod({
      action: `groups/${action.payload.slug}/member`,
      object: action.payload,
    });
    if (response.data.success) {
      yield put(updateGroupMemberSuccess(response.data.data));
      yield put(
        fetchSingleGroupStart({
          group_slug: action.payload.slug,
        })
      );
    } else {
      yield put(updateGroupMemberFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateGroupMemberFailure(error.message));
    yield put(notify(error.message, "error"));
  }
}

function* fetchGroupsCategoriesAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
  }
  try {
    const response = yield api.getMethod({
      action: "groups/categories",
      accessToken: accessToken,
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

    if (response.data != null && response.data.success != null) {
      yield put(joinGroupSuccess(response.data.data));
      yield put(fetchGroupsStart());
      yield put(notify({ message: "Group joined", status: "success" }));
    } else {
      yield put(joinGroupFailure(response));
      yield put(notify({ message: response.error.message, status: "error" }));
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
      yield put(
        fetchSingleGroupMemberSuccess(Object.values(response.data.data))
      );
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

    console.log(response);

    if (response.status && response.status === 201) {
      yield put(createGroupSuccess(response.data));
      yield put(
        notify({ message: "Group created successfully", status: "success" })
      );
      window.location.assign("/groups/" + response.data.data.slug);
    } else {
      yield put(createGroupFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
      setTimeout(function () {
        window.location.assign("/go-pro/");
      }, 4000);
    }
  } catch (error) {
    yield put(deleteGrcreateGroupFailureoupFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteGroupAPI(action) {
  try {
    const response = yield api.deleteMethod({
      action: `groups/${action.payload}`,
    });
    console.log(response);
    if (response.status && response.status === 204) {
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

function* deleteGroupMemberAPI(action) {
  try {
    const response = yield api.deleteMethod({
      action: `groups/${action.payload.slug}/member`,
      object: {
        user_id: action.payload.user_id,
      },
    });

    if (response.status && response.status === 204) {
      yield put(deleteGroupMemberSuccess(response.data));
      yield put(
        notify({
          message: "Membership cancelled successfully",
          status: "success",
        })
      );
      yield put(fetchSingleGroupStart({ group_slug: action.payload.slug }));
    } else {
      yield put(deleteGroupMemberFailure(response.data.message));
      yield put(notify({ message: response.data.message, status: "error" }));
    }
  } catch (error) {
    yield put(deleteGroupMemberFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("groups/saveGroupPostStart", saveGroupPostAPI)]);
  yield all([yield takeLatest("groups/deleteGroupStart", deleteGroupAPI)]);
  yield all([
    yield takeLatest("groups/deleteGroupMemberStart", deleteGroupMemberAPI),
  ]);
  yield all([yield takeLatest("groups/fetchGroupsStart", fetchGroupsAPI)]);
  yield all([
    yield takeLatest("groups/fetchUserGroupsStart", fetchUserGroupsAPI),
  ]);
  yield all([
    yield takeLatest(
      "groups/fetchOtherUserGroupsStart",
      fetchOtherUserGroupsAPI
    ),
  ]);
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
  yield all([
    yield takeLatest("groups/updateGroupInfoStart", updateUserGroupInfoAPI),
  ]);
  yield all([
    yield takeLatest("groups/updateGroupMemberStart", updateUserGroupMemberAPI),
  ]);
  yield all([
    yield takeLatest("groups/updateGroupPhotosStart", updateUserGroupPhotosAPI),
  ]);
  yield all([
    yield takeLatest(
      "groups/updateGroupPrivacyStart",
      updateUserGroupPrivacyAPI
    ),
  ]);
}
