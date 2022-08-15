import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { notify } from "reapop";

import {
  fetchUserProductsSuccess,
  fetchUserProductsFailure,
  fetchUserProductsStart,
  fetchOtherUserProductsSuccess,
  fetchOtherUserProductsFailure,
  fetchOtherUserProductsStart,
  userProductsSaveSuccess,
  userProductsSaveFailure,
  userProductsSaveStart,
  fetchUserSingleProductSuccess,
  fetchUserSingleProductFailure,
  fetchUserSingleProductStart,
  deleteUserProductSuccess,
  deleteUserProductFailure,
  deleteUserProductStart,
  setUserProductVisibilitySuccess,
  setUserProductVisibilityFailure,
  setUserProductVisibilityStart,
  updateUserProductAvailabilitySuccess,
  updateUserProductAvailabilityFailure,
  updateUserProductAvailabilityStart,
  fetchProductCategoriesSuccess,
  fetchProductCategoriesFailure,
  fetchProductCategoriesStart,
  fetchProductSubCategoriesSuccess,
  fetchProductSubCategoriesFailure,
  fetchProductSubCategoriesStart,
  fetchCartListSuccess,
  fetchCartListFailure,
  saveCartDetailsSuccess,
  saveCartDetailsFailure,
  saveCartDetailsStart,
  removeCartDetailsSuccess,
  removeCartDetailsFailure,
  removeCartDetailsStart,
  userProductsSearchSuccess,
  userProductsSearchFailure,
  userProductsSearchStart,
  fetchUserProductPicturesSuccess,
  fetchUserProductPicturesFailure,
  fetchUserProductPicturesStart,
  userProductPicturesSaveSuccess,
  userProductPicturesSaveFailure,
  userProductPicturesSaveStart,
  userProductPicturesDeleteSuccess,
  userProductPicturesDeleteFailure,
  userProductPicturesDeleteStart,
  fetchEcommHomeStart,
  fetchEcommHomeSuccess,
  fetchEcommHomeFailure,
  userProductViewForOthersSuccess,
  userProductViewForOthersFailure,
  userProductViewForOthersStart,
  ordersListForOthersSuccess,
  ordersListForOthersFailure,
  ordersListForOthersStart,
  ordersViewForOthersSuccess,
  ordersViewForOthersFailure,
  ordersViewForOthersStart,
  fetchUserOrderPaymentsSuccess,
  fetchUserOrderPaymentsFailure,
  fetchUserOrderPaymentsStart,
  fetchDeliveryAddressSuccess,
  fetchDeliveryAddressFailure,
  fetchDeliveryAddressStart,
  fetchCartListStart,
  ordersPaymentByWalletSuccess,
  ordersPaymentByWalletFailure,
  ordersPaymentByWalletStart,
  ordersPaymentByCardSuccess,
  ordersPaymentByCardFailure,
  ordersPaymentByCardStart,
  ordersPaymentByPaypalSuccess,
  ordersPaymentByPaypalFailure,
  ordersPaymentByPaypalStart,
  fetchSingleProductOrdersSuccess,
  fetchSingleProductOrdersFailure,
  fetchSingleProductOrdersStart,
  fetchOtherModelProductListStart,
  fetchOtherModelProductListSuccess,
  fetchOtherModelProductListFailure,
} from "../slices/productsSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* fetchUserProductsAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products",
    });

    if (response.data.success) {
      yield put(fetchUserProductsSuccess(response.data.data));
    } else {
      yield put(fetchUserProductsFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchUserProductsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}


function* fetchOtherUserProductsAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "other_user_products",
    });

    if (response.data.success) {
      yield put(fetchOtherUserProductsSuccess(response.data.data));
    } else {
      yield put(fetchOtherUserProductsFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchOtherUserProductsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}





function* userProductsSaveAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products_save",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(userProductsSaveSuccess(response.data.data));
      window.location.assign("/single-product/" + response.data.data.unique_id);
    } else {
      yield put(userProductsSaveFailure(response.data.error));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(userProductsSaveFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchUserSingleProductAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products_view",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(fetchUserSingleProductSuccess(response.data.data));
    } else {
      yield put(fetchUserSingleProductFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchUserSingleProductFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* deleteUserProductAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products_delete",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(deleteUserProductSuccess(response.data.data));
      //   yield put(fetchProductsProOwnerStart());
    } else {
      yield put(deleteUserProductFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(deleteUserProductFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* setUserProductVisibilityAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products_set_visibility",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(setUserProductVisibilitySuccess(response.data.data));
    } else {
      yield put(setUserProductVisibilityFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(setUserProductVisibilityFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* updateUserProductAvailabilityAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products_update_availability",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(updateUserProductAvailabilitySuccess(response.data.data));
    } else {
      yield put(updateUserProductAvailabilityFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(updateUserProductAvailabilityFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchProductCategoriesAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "product_categories",
      
    });

    if (response.data.success) {
      yield put(fetchProductCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchProductCategoriesFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchProductCategoriesFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchProductSubCategoriesAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "product_sub_categories",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(fetchProductSubCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchProductSubCategoriesFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchProductSubCategoriesFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchCartListAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "carts_list",
     
    });

    if (response.data.success) {
      yield put(fetchCartListSuccess(response.data.data));
    } else {
      yield put(fetchCartListFailure(response.data.error));

      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(fetchCartListFailure(error));
    yield put(notify({ messsage: error.message, status: "error" }));
  }
}

function* saveCartDetailsAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "carts_save",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(saveCartDetailsSuccess(response.data.data));

      yield put(notify({ message: response.data.message, status: "success" }));
      if (action.payload.type == "userProfile")
        yield put(
          fetchOtherModelProductListStart({
            user_unique_id: action.payload.otherUserUniquId,
          })
        );
      else yield put(fetchEcommHomeStart());
      yield put(fetchCartListStart());
    } else {
      yield put(saveCartDetailsFailure(response.data.error));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(saveCartDetailsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* removeCartDetailsAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "carts_remove",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(removeCartDetailsSuccess(response.data.data));
      yield put(fetchCartListStart());
    } else {
      yield put(removeCartDetailsFailure(response.data.error));

      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(removeCartDetailsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* userProductsSearchAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_products_search",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(userProductsSearchSuccess(response.data.data));
    } else {
      yield put(userProductsSearchFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({ message: response.data.error, status: "error" }));
    }
  } catch (error) {
    yield put(userProductsSearchFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* fetchUserProductPicturesAPI(action) {
  try {
    const response = yield api.postMethod({
      action: "user_product_pictures",
      object: action.payload,
    });

    if (response.data.success) {
      yield put(fetchUserProductPicturesSuccess(response.data.data));
    } else {
      yield put(fetchUserProductPicturesFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchUserProductPicturesFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* userProductPicturesSaveAPI(action) {
  try {
      const response = yield api.postMethod({
        action:  "user_product_pictures_save",
        object:  action.payload
      }
    );

    if (response.data.success) {
      yield put(userProductPicturesSaveSuccess(response.data));
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(userProductPicturesSaveFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(userProductPicturesSaveFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* userProductPicturesDeleteAPI(action) {
  try {
    const response = yield api.postMethod({
    action:  "user_product_pictures_delete",
    object:  action.payload}
    );

    if (response.data.success) {
      yield put(userProductPicturesDeleteSuccess(response.data.data));
      yield put(notify({message:response.data.message,status:'success'}));
    } else {
      yield put(userProductPicturesDeleteFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(userProductPicturesDeleteFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchEcommHomeAPI(action) {
  try {
      const response = yield api.postMethod({
          action: "ecommerce_home",
    });

    if (response.data.success) {
      yield put(fetchEcommHomeSuccess(response.data.data));
    } else {
      yield put(fetchEcommHomeFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchEcommHomeFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* userProductViewForOthersAPI(action) {
  try {
      const response = yield api.postMethod({
          action: "user_products_view_for_others",
          object: action.payload
      }
    );

    if (response.data.success) {
      yield put(userProductViewForOthersSuccess(response.data.data));
    } else {
      yield put(userProductViewForOthersFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(userProductViewForOthersFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* ordersListForOthersAPI(action) {
  try {
    const response = yield api.postMethod(
     {action: "orders_list_for_others",
     object: action.payload}
    );

    if (response.data.success) {
      yield put(ordersListForOthersSuccess(response.data.data));
    } else {
      yield put(ordersListForOthersFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(ordersListForOthersFailure(error));
      yield put(notify({ message: error.message, status: 'error' }));
  }
}

function* ordersViewForOthersAPI(action) {
  try {
    const response = yield api.postMethod(
     {action: "orders_view_for_others",
      object:action.payload
    }
    );

    if (response.data.success) {
      yield put(ordersViewForOthersSuccess(response.data.data));
    } else {
      yield put(ordersViewForOthersFailure(response.data.error));
      
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(ordersViewForOthersFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchUserOrderPaymentsAPI() {
  try {
      const response = yield api.postMethod({ action: "order_payments_list" });

    if (response.data.success) {
      yield put(fetchUserOrderPaymentsSuccess(response.data.data));
    } else {
      yield put(fetchUserOrderPaymentsFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchUserOrderPaymentsFailure(error));
   
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchDeliveryAddressAPI() {
  try {
      const response = yield api.postMethod({ action: "delivery_addresses_list" });

    if (response.data.success) {
      yield put(fetchDeliveryAddressSuccess(response.data.data));
    } else {
      yield put(fetchDeliveryAddressFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchDeliveryAddressFailure(error));
    yield put(notify({meassage:error.message,status:'error'}));
  }
}

function* orderWalletPaymentAPI(action) {
  try {
    const response = yield api.postMethod(
     { action:"orders_payment_by_wallet",
      object:action.payload}
    );

    if (response.data.success) {
      yield put(ordersPaymentByWalletSuccess(response.data.data));
     
      yield put(notify({message: response.data.message,status:'success'}));
      window.location.assign(`/order-view/${response.data.data.unique_id}`);
    } else {
      yield put(ordersPaymentByWalletFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(ordersPaymentByWalletFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* ordercardPaymentAPI(action) {
  try {
    const response = yield api.postMethod(
     {action: "orders_payment_by_stripe",
      object:action.payload}
    );

    if (response.data.success) {
      yield put(ordersPaymentByCardSuccess(response.data.data));
     
      yield put(notify({message: response.data.message,status:'success'}));
      window.location.assign(`/order-view/${response.data.data.unique_id}`);
    } else {
      yield put(ordersPaymentByPaypalFailure(response.data.error));
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(ordersPaymentByPaypalFailure(error));
   
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* orderPaypalPaymentAPI(action) {
  try {
    const response = yield api.postMethod(
     {action: "orders_payment_by_paypal",
      object:action.payload}
    );

    if (response.data.success) {
      yield put(ordersPaymentByPaypalSuccess(response.data.data));
     
      yield put(notify({message: response.data.message,status:'success'}));
      window.location.assign(`/order-view/${response.data.data.unique_id}`);
    } else {
      yield put(ordersPaymentByCardFailure(response.data.error));
     
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(ordersPaymentByCardFailure(error));
      yield put(notify({message:error.message,status:'error'
}));
  }
}

function* fetchSingleProductOrdersAPI(action) {
  try {
    const response = yield api.postMethod(
    { action: "user_products_orders_list",
      object:action.data}
    );

    if (response.data.success) {
      yield put(fetchSingleProductOrdersSuccess(response.data.data));
    } else {
      yield put(fetchSingleProductOrdersFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message:response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchSingleProductOrdersFailure(error));
    yield put(notify({message:error.message,status:'error'}));
  }
}

function* fetchOtherModelProductListAPI(action) {
  try {
    const response = yield api.postMethod(
        {
            action: "other_model_product_list",
          
      object:action.payload}
    );

    if (response.data.success) {
      yield put(fetchOtherModelProductListSuccess(response.data.data));
    } else {
      yield put(fetchOtherModelProductListFailure(response.data.error));
     
      yield put(errorLogoutCheck(response.data));
      yield put(notify({message: response.data.error,status:'error'}));
    }
  } catch (error) {
    yield put(fetchOtherModelProductListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(notify({message:error.data,status:'error'}));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("products/fetchUserProductsStart", fetchUserProductsAPI),
  ]);
  yield all([
    yield takeLatest("products/fetchOtherUserProductsStart", fetchOtherUserProductsAPI),
  ]);
  yield all([yield takeLatest("products/userProductsSaveStart", userProductsSaveAPI)]);
  yield all([
    yield takeLatest(
      "products/fetchUserSingleProductStart",
      fetchUserSingleProductAPI
    ),
  ]);
  yield all([
    yield takeLatest("products/deleteUserProductStart", deleteUserProductAPI),
  ]);
  yield all([
    yield takeLatest(
      "products/setUserProductVisibilityStart",
      setUserProductVisibilityAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "products/updateUserProductAvailabilityStart",
      updateUserProductAvailabilityAPI
    ),
  ]);
  yield all([
    yield takeLatest("products/fetchProductCategoriesStart", fetchProductCategoriesAPI),
  ]);
  yield all([
    yield takeLatest(
      "products/fetchProductSubCategoriesStart",
      fetchProductSubCategoriesAPI
    ),
  ]);
  yield all([yield takeLatest("products/fetchCartListStart", fetchCartListAPI)]);
  yield all([yield takeLatest("products/saveCartDetailsStart", saveCartDetailsAPI)]);
  yield all([
    yield takeLatest("products/removeCartDetailsStart", removeCartDetailsAPI),
  ]);
  yield all([
    yield takeLatest("products/userProductsSearchStart", userProductsSearchAPI),
  ]);
  yield all([
    yield takeLatest(
      "products/fetchUserProductPicturesStart",
      fetchUserProductPicturesAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "products/userProductPicturesSaveStart",
      userProductPicturesSaveAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "products/userProductPicturesDeleteStart",
      userProductPicturesDeleteAPI
    ),
  ]);
  yield all([yield takeLatest("products/fetchEcommHomeStart", fetchEcommHomeAPI)]);
  yield all([
    yield takeLatest(
      "products/userProductViewForOthersStart",
      userProductViewForOthersAPI
    ),
  ]);
  yield all([
    yield takeLatest("products/ordersListForOthersStart", ordersListForOthersAPI),
  ]);
  yield all([
    yield takeLatest("products/ordersViewForOthersStart", ordersViewForOthersAPI),
  ]);
  yield all([
    yield takeLatest(
      "products/fetchUserOrderPaymentsStart",
      fetchUserOrderPaymentsAPI
    ),
  ]);
  yield all([
    yield takeLatest("products/fetchDeliveryAddressStart", fetchDeliveryAddressAPI),
  ]);
  yield all([
    yield takeLatest("products/ordersPaymentByWalletStart", orderWalletPaymentAPI),
  ]);
  yield all([
    yield takeLatest("products/ordersPaymentByCardStart", ordercardPaymentAPI),
  ]);
  yield all([
    yield takeLatest("products/ordersPaymentByPaypalStart", orderPaypalPaymentAPI),
  ]);
  yield all([
    yield takeLatest(
      "products/fetchSingleProductOrdersStart",
      fetchSingleProductOrdersAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      "products/fetchOtherModelProductListStart",
      fetchOtherModelProductListAPI
    ),
  ]);
}
