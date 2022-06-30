import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
    fetchSinglePageSuccess,
    fetchSinglePageFailure,
} from "../slices/pageSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* fetchSinglePage() {
  try {
    const inputData = yield select((state) => state.page.pageData.inputData);
    const response = yield api.postMethod({action:"static_pages", object:inputData});
    if (response.data.success) {
      yield put(fetchSinglePageSuccess(response.data.data));
    } else {
      yield put(fetchSinglePageFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchSinglePageFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("page/fetchSinglePageStart", fetchSinglePage)]);
}