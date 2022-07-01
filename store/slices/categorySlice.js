import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  updateCategory: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  categories: {
    data: {},
    loading: true,
    error: false,
  },
  categoryUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  followCategory: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    updateCategoryStart: (state, action) => {
      state.updateCategory = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    updateCategorySuccess: (state, action) => {
      state.updateCategory = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    updateCategoryFailure: (state, action) => {
      state.updateCategory = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchCategoriesStart: (state, action) => {
      state.categories = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchCategoriesFailure: (state, action) => {
      state.categories = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    fetchCategoryUsersStart: (state, action) => {
      state.categoryUsers = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    fetchCategoryUsersSuccess: (state, action) => {
      state.categoryUsers = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchCategoryUsersFailure: (state, action) => {
      state.categoryUsers = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    followCategoryStart: (state, action) => {
      state.followCategory = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    followCategorySuccess: (state, action) => {
      state.followCategory = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    followCategoryFailure: (state, action) => {
      state.followCategory = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
  },
});

export const {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  fetchCategoriesStart,
  fetchCategoryUsersFailure,
  fetchCategoryUsersSuccess,
  fetchCategoryUsersStart,
  followCategoryFailure,
  followCategorySuccess,
  followCategoryStart,
  updateCategoryFailure,
  updateCategorySuccess,
  updateCategoryStart,
} = CategorySlice.actions;

export default CategorySlice.reducer;
