import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: {
    data: {},
    loading: true,
    error: false,
  },
  contentCreatorList: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

export const UserCategorySlice = createSlice({
  name: "userCategory",
  initialState,
  reducers: {
    fetchUserCategoryListStart: (state, action) => {
      state.categoryList = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchUserCategoryListSuccess: (state, action) => {
      state.categoryList = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    },
    fetchUserCategoryListFailure: (state, action) => {
      state.categoryList = {
        ata: {},
        loading: false,
        error: action.payload,
      };
    },
    fetchContentCreatorListStart: (state, action) => {
      state.contentCreatorList = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchContentCreatorListSuccess: (state, action) => {
      state.contentCreatorList = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    },
    fetchContentCreatorListFailure: (state, action) => {
      state.contentCreatorList = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  fetchUserCategoryListStart,
  fetchUserCategoryListSuccess,
  fetchUserCategoryListFailure,
  fetchContentCreatorListStart,
  fetchContentCreatorListSuccess,
  fetchContentCreatorListFailure,
} = UserCategorySlice.actions;


export default UserCategorySlice.reducer;