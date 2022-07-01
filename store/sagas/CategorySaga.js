import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
    fetchCategoriesFailure,
    fetchCategoriesSuccess,
    fetchCategoriesStart,
    fetchCategoryUsersFailure,
    fetchCategoryUsersSuccess,
    fetchCategoryUsersStart,
    followCategoryFailure,
    followCategorySuccess,
    followCategoryStart,
    updateCategoryFailure,
    updateCategorySuccess,
    updateCategoryStart,
} from "../slices/categorySlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* fetchCategoriesAPI() {
  try {
    const response = yield api.postMethod({action:'u_categories_list'});
    if (response.data.success) {
      yield put(fetchCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchCategoriesFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}
function* updateCategoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.updateCategory.inputData
    );

    const response = yield api.postMethod({action:"posts_save_for_owner",object: inputData});
    if (response.data.success) {
      yield put(updateCategorySuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
       
      );
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(updateCategoryFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(updateCategoryFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchCategoryUsersAPI() {
  try {
    const inputData = yield select(
      (state) => state.category.categoryUsers.inputData
    );
      const response = yield api.postMethod({ action: "u_categories_view", object:inputData });
    if (response.data.success) {
      yield put(fetchCategoryUsersSuccess(response.data.data));
    } else {
      yield put(fetchCategoryUsersFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchCategoryUsersFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* followCategoryAPI() {
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
      const response = yield api.postMethod({ action: "posts_delete_for_owner", object: inputData });
    if (response.data.success) {
      yield put(followCategorySuccess(response.data.data));
      yield put(notify({message: response.data.message,status:'success'}));
      window.location.assign("/profile");
    } else {
      yield put(followCategoryFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(followCategoryFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest('category/fetchCategoriesStart', fetchCategoriesAPI)]);
  yield all([yield takeLatest('category/updateCategoryStart', updateCategoryAPI)]);
  yield all([
    yield takeLatest('category/fetchCategoryUsersStart', fetchCategoryUsersAPI),
  ]);
  yield all([yield takeLatest('category/followCategoryStart', followCategoryAPI)]);
}
