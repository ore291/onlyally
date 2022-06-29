import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  saveVeriDocFailure,
  saveVeriDocStart,
  saveVeriDocSuccess,
  fetchVeriDocumentsSuccess,
  fetchVeriDocumentsFailure,
  delVeriDocSuccess,
  delVeriDocFailure,
  delVeriDocStart,
  verificationStatusCheckSuccess,
  verificationStatusCheckStart,
  verificationStatusCheckFailure,
} from "../slices/verificationDocumentSlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* fetchVeriDocsAPI(action) {
  try {
    const response = yield api.postMethod({action:'documents_list',object:action.payload});
    if (response.data.success) {
      yield put(fetchVeriDocumentsSuccess(response.data.data));
     
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(fetchVeriDocumentsFailure(response.data.error));
      
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchVeriDocumentsFailure(error));
      yield put(notify({ message:error.message,status:'error'}));
  }
}

function* saveVeriDocsAPI() {
  try {
    const inputData = yield select((state) => state.docs.saveDocs.inputData);
      const response = yield api.postMethod({ action: "documents_save", object: inputData });
    if (response.data.success) {
      yield put(saveVeriDocSuccess(response.data.data));
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(saveVeriDocFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(saveVeriDocFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* delVeriDocsAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
      const response = yield api.postMethod({action: "documents_delete",object: inputData });
    if (response.data.success) {
      yield put(delVeriDocSuccess(response.data.data));
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(delVeriDocFailure(response.data.error));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(delVeriDocFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* checkVeriDocStatusAPI() {
  try {
    const inputData = yield select((state) => state.docs.docStatus.inputData);
      const response = yield api.postMethod({ action: "user_documents_status", object: inputData });
    if (response.data.success) {
      yield put(verificationStatusCheckSuccess(response.data.data));
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(verificationStatusCheckFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        
      );
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(verificationStatusCheckFailure(error));
      yield put(notify({ message: error.message, status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest('verificationDocument/fetchVeriDocumentsStart', fetchVeriDocsAPI)]);
  yield all([yield takeLatest("verificationDocument/saveVeriDocStart", saveVeriDocsAPI)]);
  yield all([yield takeLatest("verificationDocument/delVeriDocStart", delVeriDocsAPI)]);
  yield all([yield takeLatest("verificationDocument/verificationStatusCheckStart", checkVeriDocStatusAPI)]);
}
