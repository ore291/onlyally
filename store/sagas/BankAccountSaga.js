import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
    addBankAccountSuccess,
    addBankAccountFailure,
    addBankAccountStart,
    getBankAccountSuccess,
    getBankAccountFailure,
    getBankAccountStart,
    makeDefaultBankAccountSuccess,
    makeDefaultBankAccountStart,
    makeDefaultBankAccountFailure,
    deleteBankAccountSuccess,
    deleteBankAccountStart,
    deleteBankAccountFailure,
    fetchSingleBankAccountSuccess,
    fetchSingleBankAccountStart,
    fetchSingleBankAccountFailure,
    addBankAccountContentCreatorFlowStart,
    deleteBankAccountContentCreatorFlowStart,
} from "../slices/bankAccountSlice";

import { errorLogoutCheck } from "../slices/errorSlice";


function* addBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.addBankAccountInput.inputData
    );
      const response = yield api.postMethod({
          action: "billing_accounts_save",
          object: inputData
      });

    if (response.data.success) {
      yield put(addBankAccountSuccess(response.data));
      
      yield put(notify({message:response.data.message,status:'success'}));
      window.location.assign("/billing-accounts");
    } else {
      yield put(addBankAccountFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(addBankAccountFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* getBankAccountAPI() {
  try {
      const response = yield api.postMethod({ action: "billing_accounts_list" });

    if (response.data.success) {
      yield put(getBankAccountSuccess(response.data.data));
    } else {
      yield put(getBankAccountFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(getBankAccountFailure(error));
      yield put(notify({ message: error.message, status: 'error' }));
  }
}

function* makeDefaultBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.makeDefault.inputData
    );
      const response = yield api.postMethod({
        action:  "billing_accounts_default",
        object:  inputData
      }
    );

    if (response.data.success) {
      yield put(makeDefaultBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(makeDefaultBankAccountFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(makeDefaultBankAccountFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* deleteAccountBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.deleteAccount.inputData
    );
    const response = yield api.postMethod({action:"billing_accounts_delete",object: inputData});

    if (response.data.success) {
      yield put(deleteBankAccountSuccess(response.data));
      yield put(notify({message: response.data.message,status:'success'}));
      window.location.assign("/billing-accounts");
    } else {
      yield put(deleteBankAccountFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(deleteBankAccountFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchSingleBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.singleAccount.inputData
    );
    const response = yield api.postMethod({action:"users_accounts_save",object: inputData});

    if (response.data.success) {
      yield put(fetchSingleBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(fetchSingleBankAccountFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchSingleBankAccountFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* addBankAccountContentCreatorFlowAPI() {
  try {
    const inputData = yield select(
      (state) =>
        state.bankAccount.addBankAccountContentCreatorFlowInput.inputData
    );
    const response = yield api.postMethod({action:"billing_accounts_save",object: inputData});

    if (response.data.success) {
      yield put(addBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(addBankAccountFailure(response.data.error));
      
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(addBankAccountFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* deleteBankAccountContentCreatorFlowAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.deleteAccountContentCreatorFlow.inputData
    );
    const response = yield api.postMethod({action:"billing_accounts_delete",object: inputData});

    if (response.data.success) {
      yield put(deleteBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(deleteBankAccountFailure(response.data.error));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(deleteBankAccountFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest('bankAccount/addBankAccountStart', addBankAccountAPI)]);
  yield all([
    yield takeLatest(
      'bankAccount/addBankAccountContentCreatorFlowStart',
      addBankAccountContentCreatorFlowAPI
    ),
  ]);
  yield all([yield takeLatest('bankAccount/getBankAccountStart', getBankAccountAPI)]);
  yield all([
    yield takeLatest(
      'bankAccount/makeDefaultBankAccountStart',
      makeDefaultBankAccountAPI
    ),
  ]);
  yield all([
    yield takeLatest('bankAccount/deleteBankAccountStart', deleteAccountBankAccountAPI),
  ]);
  yield all([
    yield takeLatest(
      'bankAccount/deleteBankAccountContentCreatorFlowStart',
      deleteBankAccountContentCreatorFlowAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      'bankAccount/fetchSingleBankAccountStart',
      fetchSingleBankAccountAPI
    ),
  ]);
}
