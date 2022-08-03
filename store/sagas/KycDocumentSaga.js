import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  addKycDocumentSuccess,
  addKycDocumentFailure,
  addKycDocumentStart,
  getKycDocumentSuccess,
  getKycDocumentFailure,
  getKycDocumentStart,
} from "../slices/kycDocumentSlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* addKycDocumentAPI() {
  try {
    const inputData = yield select(
      (state) => state.kycDocument.addKycDocInput.inputData
    );
    if (inputData.document_id && inputData.document_file) {
        const response = yield api.postMethod({
            action: "documents_save",
            object: inputData
        });
        console.log(response.data);
      yield put(addKycDocumentSuccess(response.data.data));
      if (response.data.success) {
        yield put(notify({message: response.data.message,status:'success'}));
      } else {
        yield put(addKycDocumentFailure(response.data.error));
       
        yield put(errorLogoutCheck(response.data));
        yield put(notify({message: response.data.error,status:'error'}));
      }
    } else {
      let errorMessage = "Please upload the file and choose document";
      yield put(addKycDocumentFailure(errorMessage));
      yield put(notify({message:errorMessage ,status:'error'}));
    }
  } catch (error) {
    yield put(addKycDocumentFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* getKycDocumentAPI() {
  try {
    const response = yield api.postMethod({action:"documents_list"});
   
      if (response.data.success) {
          yield put(getKycDocumentSuccess(response.data.data));
    } else {
      yield put(getKycDocumentFailure(response.data.error));
      
      yield put(checkLogoutStatus(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(getKycDocumentFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest("kycDocument/addKycDocumentStart", addKycDocumentAPI)]);
  yield all([yield takeLatest("kycDocument/getKycDocumentStart", getKycDocumentAPI)]);
}

