import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";


import {
  fetchFavStart,
  fetchFavSuccess,
  fetchFavFailure,
  saveFavFailure,
  saveFavSuccess,
  deleteFavFailure,
  deleteFavSuccess,
} from "../slices/favSlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* fetchFavAPI() {
  try {
    const inputData = yield select((state) => state.fav.fav.inputData);
      const response = yield api.postMethod({ action: "fav_users",object: inputData });
    if (response.data.success) {
      yield put(fetchFavSuccess(response.data.data));
    } else {
        yield put(fetchFavFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify(response.data.error));
    }
  } catch (error) {
    yield put(fetchFavFailure(error));
    yield put(notify({ message: error.message, status:"error" }));
  }
}

function* saveFavAPI() {
  try {
    const inputData = yield select((state) => state.fav.saveFav.inputData);
      const response = yield api.postMethod({ action: "fav_users_save", object: inputData });
    if (response.data.success) {
      yield put(saveFavSuccess(response.data.data));
        yield put(notify({ message: response.data.message, status:"success"}));
    } else {
      yield put(saveFavFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:"error"}));
    }
  } catch (error) {
    yield put(saveFavFailure(error));
    yield put(notify({message:error.message,status:"error"}));
  }
}

function* deleteFavAPI() {
  try {
    const inputData = yield select((state) => state.fav.deleteFav.inputData);
      const response = yield api.postMethod({ action: "fav_users_delete",object: inputData });
    if (response.data.success) {
      yield put(deleteFavSuccess(response.data.data));
      
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(deleteFavFailure(response.data.error));
     
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(deleteFavFailure(error));
      yield put(notify({ message: error.message, status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("fav/fetchFavStart", fetchFavAPI)]);
  yield all([yield takeLatest("fav/saveFavStart", saveFavAPI)]);
  yield all([yield takeLatest("fav/deleteFavStart", deleteFavAPI)]);
}
