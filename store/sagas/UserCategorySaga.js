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
    console.log("ore here:",action.payload)
    try {
      const response = yield api.postMethod({action : "content_creators_list" ,object : action.payload.category_id});
  
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
  
  