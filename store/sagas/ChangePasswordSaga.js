import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
    changePasswordFailure,
    changePasswordSuccess,
    editChangePassword
} from "../slices/changePasswordSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* changePasswordAPI() {
  try {
    const inputData = yield select(
      (state) => state.changePassword.inputData.data
    );
      const response = yield api.postMethod({ action: "change_password", object: inputData });
    yield put(changePasswordSuccess(response.data.data));
    if (response.data.success) {
    
      yield put(notify({message:response.data.message, status : "success"}));
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message : response.data.error, status : "error"}));
    }
  } catch (error) {
    yield put(changePasswordFailure(error));
    yield put(notify({message : error.message, status : "error"}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest('changePassword/changePasswordStart', changePasswordAPI)]);
}
