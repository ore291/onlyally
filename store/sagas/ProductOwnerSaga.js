import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
    deleteProImageProOwnerFailure,
    deleteProImageProOwnerSuccess,
    deleteProImageProOwnerStart,
    fetchProCateProOwnerFailure,
    fetchProCateProOwnerSuccess,
    fetchProCateProOwnerStart,
    fetchProductsProOwnerFailure,
    fetchProductsProOwnerSuccess,
    fetchProductsProOwnerStart,
    fetchProImageProOwnerFailure,
    fetchProImageProOwnerSuccess,
    fetchProImageProOwnerStart,
    fetchProSubCateProOwnerFailure,
    fetchProSubCateProOwnerSuccess,
    fetchProSubCateProOwnerStart,
    fetchSingleProOwnerFailure,
    fetchSingleProOwnerSuccess,
    fetchSingleProOwnerStart,
    proSearchProOwnerFailure,
    proSearchProOwnerSuccess,
    proSearchProOwnerStart,
    saveProImageProOwnerFailure,
    saveProImageProOwnerSuccess,
    saveProImageProOwnerStart,
    saveProOwnerFailure,
    saveProOwnerSuccess,
    saveProOwnerStart,
    setVisibilityProOwnerFailure,
    setVisibilityProOwnerSuccess,
    setVisibilityProOwnerStart,
    updateAvailabiltyProOwnerFailure,
    updateAvailabiltyProOwnerSuccess,
    updateAvailabiltyProOwnerStart,
} from '../slices/productOwnerSlice';

import { errorLogoutCheck } from "../slices/errorSlice";



function* saveProOwnerAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.saveProduct.inputData
    );
      const response = yield api.postMethod(
          {
              action: "user_products_save",
              object: inputData
          });
    if (response.data.success) {
      yield put(saveProOwnerSuccess(response.data.data));
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
      yield put(saveProOwnerFailure(response.data.error));
    }
  } catch (error) {
    yield put(saveProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchSingleProProOwnerAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.singlePro.inputData
    );
    const response = yield api.postMethod({action:"user_products_view", object:inputData});
    if (response.data.success) {
      yield put(fetchSingleProOwnerSuccess(response.data.data));
    } else {
      yield put(fetchSingleProOwnerFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchSingleProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* setVisibleAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.setVisible.inputData
    );
    const response = yield api.postMethod(
    {action:  "user_products_set_visibility",
      object: inputData}
    );
    if (response.data.success) {
      yield put(setVisibilityProOwnerSuccess(response.data.data));
    } else {
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
      yield put(setVisibilityProOwnerFailure(response.data.error));
    }
  } catch (error) {
    yield put(setVisibilityProOwnerFailure(error));
      yield put(notify({ message: error.message,status:'error' }));
  }
}

function* updateAvailabiltyAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.updateAva.inputData
    );
    const response = yield api.postMethod(
     {action: "user_products_update_availability",
     object: inputData}
    );
    if (response.data.success) {
      yield put(updateAvailabiltyProOwnerSuccess(response.data.data));
      yield put(notify({message:  response.data.message,status:'success'}));
    } else {
      yield put(updateAvailabiltyProOwnerFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(updateAvailabiltyProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchProductsAPI(action) {
  try {
      const response = yield api.postMethod({
          action: "user_products",
          object: action.data
      });

    if (response.data.success) {
      yield put(fetchProductsProOwnerSuccess(response.data.data));
    } else {
      yield put(fetchProductsProOwnerFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchProductsProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchProCategoryAPI() {
  try {
    const response = yield api.postMethod("product_categories");

    if (response.data.success) {
      yield put(fetchProCateProOwnerSuccess(response.data.data));
     
      yield put(notify({message:response.data.message,status:'success'
}));
    } else {
      yield put(fetchProCateProOwnerFailure(response.data.error));
     
      yield put(checkLogoutStatus(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchProCateProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchProSubCategoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proSubCategory.inputData
    );
    const response = yield api.postMethod({action:"product_sub_categories",object: inputData});
    if (response.data.success) {
      yield put(fetchProSubCateProOwnerSuccess(response.data.data));
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(fetchProSubCateProOwnerFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchProSubCateProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* proSearchAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proSearch.inputData
    );
      const response = yield api.postMethod(
          {
            action:  "user_products_search",
              object: inputData
          });
    if (response.data.success) {
      yield put(proSearchProOwnerSuccess(response.data.data));
      
        yield put(notify({
            message: response.data.message, status: 'success'
        }));
    } else {
      yield put(proSearchProOwnerFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(proSearchProOwnerFailure(error));
  
      yield put(notify({ message: error.message, status:'error' }));
  }
}

function* fetchProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proImage.inputData
    );
      const response = yield api.postMethod({
          action: "user_product_pictures",
          object: inputData
      });
    if (response.data.success) {
      yield put(fetchProImageProOwnerSuccess(response.data.data));
      
      yield put(notify({message:  response.data.message,status:'success'}));
    } else {
      yield put(fetchProImageProOwnerFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchProImageProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* saveProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.saveProImage.inputData
    );
    const response = yield api.postMethod(
     { action: "user_product_pictures_save",
      object: inputData}
    );
    if (response.data.success) {
      yield put(saveProImageProOwnerSuccess(response.data.data));
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(saveProImageProOwnerFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(saveProImageProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* delProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.delProImage.inputData
    );
    const response = yield api.postMethod(
     {action: "user_product_pictures_delete",
      object: inputData}
    );
    if (response.data.success) {
      yield put(deleteProImageProOwnerSuccess(response.data.data));
      
      yield put(notify({message: response.data.message,status:'success'}));
    } else {
      yield put(deleteProImageProOwnerFailure(response.data.error));

      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(deleteProImageProOwnerFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest('productOwner/saveProOwnerStart', saveProOwnerAPI)]);
  yield all([
    yield takeLatest("productOwner/fetchSingleProOwnerStart", fetchSingleProProOwnerAPI),
  ]);
  yield all([yield takeLatest("productOwner/setVisibilityProOwnerStart", setVisibleAPI)]);
  yield all([
    yield takeLatest("productOwner/updateAvailabiltyProOwnerStart", updateAvailabiltyAPI),
  ]);
  yield all([
    yield takeLatest("productOwner/fetchProductsProOwnerStart", fetchProductsAPI),
  ]);
  yield all([
    yield takeLatest("productOwner/fetchProCateProOwnerStart", fetchProCategoryAPI),
  ]);
  yield all([
    yield takeLatest("productOwner/fetchProSubCateProOwnerStart", fetchProSubCategoryAPI),
  ]);
  yield all([yield takeLatest('productOwner/proSearchProOwnerStart', proSearchAPI)]);
  yield all([
    yield takeLatest('productOwner/fetchProImageProOwnerStart', fetchProImageAPI),
  ]);
  yield all([
    yield takeLatest('productOwner/saveProImageProOwnerStart', saveProImageAPI),
  ]);
  yield all([
    yield takeLatest('productOwner/deleteProImageProOwnerStart', delProImageAPI),
  ]);
}