import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  saveProduct: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  singlePro: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  setVisible: {
    inputData: {},
    data: {},
    loading: true,
    error: false,
  },
  updateAva: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  products: {
    loading: true,
    error: false,
    data: {},
  },
  proCategory: {
    loading: true,
    error: false,
    success: {},
  },
  proSubCategory: {
    loading: true,
    error: false,
    success: {},
    inputData: {},
  },
  proSearch: {
    loading: true,
    error: false,
    success: {},
    inputData: {},
  },
  proImage: {
    loading: true,
    error: false,
    success: {},
    inputData: {},
  },
  saveProImage: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  delProImage: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

export const ProductOwnerSlice = createSlice({
  name: "productOwner",
  initialState,

  reducers: {
    saveProOwnerStart: (state, action) => {
      state.saveProduct = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        buttonDisable: true,
        loadingButtonContent: "Loading... Please wait",
      };
    },
    saveProOwnerSuccess: (state, action) => {
      state.saveProduct = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    saveProOwnerFailure: (state, action) => {
      state.saveProduct = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    fetchSingleProOwnerStart: (state, action) => {
      state.singlePro = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchSingleProOwnerSuccess: (state, action) => {
      state.singlePro = {
        inputData: {},
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSingleProOwnerFailure: (state, action) => {
      state.singlePro = {
        inputData: {},
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    setVisibilityProOwnerStart: (state, action) => {
      state.setVisible = {
        data: {},
        inputData: action.payload,
        loading: true,
        error: false,
      };
    },
    setVisibilityProOwnerSuccess: (state, action) => {
      state.setVisible = {
        inputData: {},
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    setVisibilityProOwnerFailure: (state, action) => {
      state.setVisible = {
        inputData: {},
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    updateAvailabiltyProOwnerStart: (state, action) => {
      state.updateAva = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    updateAvailabiltyProOwnerSuccess: (state, action) => {
      state.updateAva = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    updateAvailabiltyProOwnerFailure: (state, action) => {
      state.updateAva = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    fetchProductsProOwnerStart: (state, action) => {
      state.products = {
        loading: true,
        error: false,
        data: {},
      };
    },
    fetchProductsProOwnerSuccess: (state, action) => {
      state.products = {
        loading: false,
        error: false,
        data: action.payload,
      };
    },
    fetchProductsProOwnerFailure: (state, action) => {
      state.products = {
        loading: true,
        error: action.payload,
        data: {},
      };
    },
    fetchProCateProOwnerStart: (state, action) => {
      state.proCategory = {
        loading: true,
        error: false,
        success: {},
      };
    },
    fetchProCateProOwnerSuccess: (state, action) => {
      state.proCategory = {
        loading: false,
        error: false,
        success: action.payload,
      };
    },
    fetchProCateProOwnerFailure: (state, action) => {
      state.proCategory = {
        loading: true,
        error: action.payload,
        success: {},
      };
    },
    fetchProSubCateProOwnerStart: (state, action) => {
      state.proSubCategory = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
      };
    },
    fetchProSubCateProOwnerSuccess: (state, action) => {
      state.proSubCategory = {
        inputData: {},
        loading: false,
        error: false,
        success: action.payload,
      };
    },
    fetchProSubCateProOwnerFailure: (state, action) => {
      state.proSubCategory = {
        inputData: {},
        loading: true,
        error: action.payload,
        success: {},
      };
    },
    proSearchProOwnerStart: (state, action) => {
      state.proSearch = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
      };
    },
    proSearchProOwnerSuccess: (state, action) => {
      state.proSearch = {
        inputData: {},
        loading: false,
        error: false,
        success: action.payload,
      };
    },
    proSearchProOwnerFailure: (state, action) => {
      state.proSearch = {
        inputData: {},
        loading: true,
        error: action.payload,
        success: {},
      };
    },
    fetchProImageProOwnerStart: (state, action) => {
      state.proImage = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
      };
    },
    fetchProImageProOwnerSuccess: (state, action) => {
      state.proImage = {
        inputData: {},
        loading: false,
        error: false,
        success: action.payload,
      };
    },
    fetchProImageProOwnerFailure: (state, action) => {
      state.proImage = {
        inputData: {},
        loading: true,
        error: action.payload,
        success: {},
      };
    },
    saveProImageProOwnerStart: (state, action) => {
      state.saveProImage = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    saveProImageProOwnerSuccess: (state, action) => {
      state.saveProImage = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    saveProImageProOwnerFailure: (state, action) => {
      state.saveProImage = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    deleteProImageProOwnerStart: (state, action) => {
      state.delProImage = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    deleteProImageProOwnerSuccess: (state, action) => {
      state.delProImage = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    deleteProImageProOwnerFailure: (state, action) => {
      state.delProImage = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
  },
});

export const {
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
} = ProductOwnerSlice.actions;

export default ProductOwnerSlice.reducer;
