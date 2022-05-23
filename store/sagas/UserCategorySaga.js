import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";


import {notify} from "reapop";

import {
    fetchUserCategoryListSuccess,
    fetchUserCategoryListFailure,
    fetchContentCreatorListSuccess,
    fetchContentCreatorListFailure
  } from "../slices/userCategory";


  function* fetchUserCategoryListAPI() {
    try {
      const response = yield api.postMethod({action : "u_categories_list"});
  
      if (response.data.success) {
        yield put(fetchUserCategoryListSuccess(response.data));
      } else {
        yield put(fetchUserCategoryListFailure(response.data.error));
        yield put(notify({message: response.data.error, status: "error"}));
      }
    } catch (error) {
      yield put(fetchUserCategoryListFailure(error));
      yield put(notify({message: error.message, status:"error"}));
    }
  }
  
  function* fetchContentCreatorListAPI(action) {
    if (action.payload) {
     var id = action.payload;
    }
  
    try {
      const response = yield api.postMethod({action : "content_creators_list" ,object : id});
  
      if (response.data.success) {
        yield put(fetchContentCreatorListSuccess(response.data));
      } else {
        yield put(fetchContentCreatorListFailure(response.data.error));
        yield put(notify({message: response.data.error, status: "error"}));
      }
    } catch (error) {
      yield put(fetchContentCreatorListFailure(error));
      yield put(notify({message: error.message, status:"error"}));
    }
  }
  
  export default function* pageSaga() {
    yield all([yield takeLatest("userCategory/fetchUserCategoryListStart", fetchUserCategoryListAPI)]);
    yield all([yield takeLatest("userCategory/fetchContentCreatorListStart", fetchContentCreatorListAPI)]);
  }
  
  