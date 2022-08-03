import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  getReferralSuccess,
  getReferralFailure,
  getReferralStart,
} from "../slices/referalSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* getReferralAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "referral_code",
      // accessToken: localStorage.getItem("accessToken"),
    });

    if (response.data.success) {
      yield put(getReferralSuccess(response.data.data));
    } else {
      yield put(getReferralFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(getReferralFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("referal/getReferralStart", getReferralAPI)]);
}
