import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

 const initialState = {
   products: {
     data: {},
     loading: true,
     error: false,
   },
   productSave: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productView: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productDelete: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productVisibility: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productAvailabilityUpdate: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productCategories: {
     data: {},
     loading: true,
     error: false,
   },
   productSubCategories: {
     data: {},
     loading: true,
     error: false,
   },
   cartList: {
     data: {},
     loading: true,
     error: false,
   },
   cartSave: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   cartRemove: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productSearch: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productPictures: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   productPicturesSave: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: null,
     buttonDisable: false,
   },
   productPicturesDelete: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   ecommHome: {
     data: {},
     loading: true,
     error: false,
   },
   productViewForOthers: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   ordersListForOthers: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   ordersViewForOthers: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   userOrderPayments: {
     data: {},
     loading: true,
     error: false,
   },
   deliveryAddress: {
     data: {},
     loading: true,
     error: false,
   },
   ordersPayment: {
     data: {},
     loading: true,
     error: false,
     loadingButtonContent: "",
     buttonDisable: false,
   },
   singleProductOrders: {
     data: {},
     loading: true,
     error: false,
   },
   otherModelProducts: {
     data: {},
     loading: true,
     error: false,
   },
 };

  export const ProductsSlice = createSlice({
    name: "products",
    initialState,

    reducers: {
      fetchUserProductsStart: (state, action) => {
        state.products = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchUserProductsSuccess: (state, action) => {
        state.products = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchUserProductsFailure: (state, action) => {
        state.products = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      userProductsSaveStart: (state, action) => {
        state.productSave = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      userProductsSaveSuccess: (state, action) => {
        state.productSave = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      userProductsSaveFailure: (state, action) => {
        state.productSave = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchUserSingleProductStart: (state, action) => {
        state.productView = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "",
          buttonDisable: true,
        };
      },
      fetchUserSingleProductSuccess: (state, action) => {
        state.productView = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchUserSingleProductFailure: (state, action) => {
        state.productView = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      deleteUserProductStart: (state, action) => {
        state.productDelete = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "",
          buttonDisable: true,
        };
      },
      deleteUserProductSuccess: (state, action) => {
        state.productDelete = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      deleteUserProductFailure: (state, action) => {
        state.productDelete = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      setUserProductVisibilityStart: (state, action) => {
        state.productVisibility = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "",
          buttonDisable: true,
        };
      },
      setUserProductVisibilitySuccess: (state, action) => {
        state.productVisibility = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      setUserProductVisibilityFailure: (state, action) => {
        state.productVisibility = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      updateUserProductAvailabilityStart: (state, action) => {
        state.productAvailabilityUpdate = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "",
          buttonDisable: true,
        };
      },
      updateUserProductAvailabilitySuccess: (state, action) => {
        state.productAvailabilityUpdate = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      updateUserProductAvailabilityFailure: (state, action) => {
        state.productAvailabilityUpdate = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchProductCategoriesStart: (state, action) => {
        state.productCategories = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchProductCategoriesSuccess: (state, action) => {
        state.productCategories = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchProductCategoriesFailure: (state, action) => {
        state.productCategories = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchProductSubCategoriesStart: (state, action) => {
        state.productSubCategories = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchProductSubCategoriesSuccess: (state, action) => {
        state.productSubCategories = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchProductSubCategoriesFailure: (state, action) => {
        state.productSubCategories = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchCartListStart: (state, action) => {
        state.cartList = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchCartListSuccess: (state, action) => {
        state.cartList = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchCartListFailure: (state, action) => {
        state.cartList = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      saveCartDetailsStart: (state, action) => {
        state.cartSave = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      saveCartDetailsSuccess: (state, action) => {
        state.cartSave = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      saveCartDetailsFailure: (state, action) => {
        state.cartSave = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      removeCartDetailsStart: (state, action) => {
        state.cartRemove = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      removeCartDetailsSuccess: (state, action) => {
        state.cartRemove = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      removeCartDetailsFailure: (state, action) => {
        state.cartRemove = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      userProductsSearchStart: (state, action) => {
        state.productSearch = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      userProductsSearchSuccess: (state, action) => {
        state.productSearch = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      userProductsSearchFailure: (state, action) => {
        state.productSearch = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchUserProductPicturesStart: (state, action) => {
        state.productPictures = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      fetchUserProductPicturesSuccess: (state, action) => {
        state.productPictures = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchUserProductPicturesFailure: (state, action) => {
        state.productPictures = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      userProductPicturesSaveStart: (state, action) => {
        state.productPicturesSave = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      userProductPicturesSaveSuccess: (state, action) => {
        state.productPicturesSave = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      userProductPicturesSaveFailure: (state, action) => {
        state.productPicturesSave = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      userProductPicturesDeleteStart: (state, action) => {
        state.productPicturesDelete = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      userProductPicturesDeleteSuccess: (state, action) => {
        state.productPicturesDelete = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      userProductPicturesDeleteFailure: (state, action) => {
        state.productPicturesDelete = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchEcommHomeStart: (state, action) => {
        state.ecommHome = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchEcommHomeSuccess: (state, action) => {
        state.ecommHome = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchEcommHomeFailure: (state, action) => {
        state.ecommHome = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      userProductViewForOthersStart: (state, action) => {
        state.productViewForOthers = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      userProductViewForOthersSuccess: (state, action) => {
        state.productViewForOthers = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      userProductViewForOthersFailure: (state, action) => {
        state.productViewForOthers = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersListForOthersStart: (state, action) => {
        state.ordersListForOthers = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      ordersListForOthersSuccess: (state, action) => {
        state.ordersListForOthers = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersListForOthersFailure: (state, action) => {
        state.ordersListForOthers = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersViewForOthersStart: (state, action) => {
        state.ordersViewForOthers = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      ordersViewForOthersSuccess: (state, action) => {
        state.ordersViewForOthers = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersViewForOthersFailure: (state, action) => {
        state.ordersViewForOthers = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchUserOrderPaymentsStart: (state, action) => {
        state.userOrderPayments = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchUserOrderPaymentsSuccess: (state, action) => {
        state.userOrderPayments = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchUserOrderPaymentsFailure: (state, action) => {
        state.userOrderPayments = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchDeliveryAddressStart: (state, action) => {
        state.deliveryAddress = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchDeliveryAddressSuccess: (state, action) => {
        state.deliveryAddress = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchDeliveryAddressFailure: (state, action) => {
        state.deliveryAddress = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      ordersPaymentByWalletStart: (state, action) => {
        state.ordersPayment = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      ordersPaymentByWalletSuccess: (state, action) => {
        state.ordersPayment = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersPaymentByWalletFailure: (state, action) => {
        state.ordersPayment = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersPaymentByCardStart: (state, action) => {
        state.ordersPayment = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      ordersPaymentByCardSuccess: (state, action) => {
        state.ordersPayment = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersPaymentByCardFailure: (state, action) => {
        state.ordersPayment = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersPaymentByPaypalStart: (state, action) => {
        state.ordersPayment = {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Uploading....",
          buttonDisable: true,
        };
      },
      ordersPaymentByPaypalSuccess: (state, action) => {
        state.ordersPayment = {
          data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      ordersPaymentByPaypalFailure: (state, action) => {
        state.ordersPayment = {
          data: {},
          loading: true,
          error: action.payload,
          loadingButtonContent: "",
          buttonDisable: false,
        };
      },
      fetchSingleProductOrdersStart: (state, action) => {
        state.singleProductOrders = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchSingleProductOrdersSuccess: (state, action) => {
        state.singleProductOrders = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchSingleProductOrdersFailure: (state, action) => {
        state.singleProductOrders = {
          data: {},
          loading: false,
          error: action.payload,
        };
      },
      fetchOtherModelProductListStart: (state, action) => {
        state.otherModelProducts = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchOtherModelProductListSuccess: (state, action) => {
        state.otherModelProducts = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchOtherModelProductListFailure: (state, action) => {
        state.otherModelProducts = {
          data: {},
          loading: false,
          error: action.payload,
        };
      },
    },
  });

export const {
  fetchUserProductsSuccess,
  fetchUserProductsFailure,
  fetchUserProductsStart,
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
} = ProductsSlice.actions;

  export default ProductsSlice.reducer;
