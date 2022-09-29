import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  pageData: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
};

  export const PageSlice = createSlice({
    name: "page",
    initialState,

    reducers: {
      fetchSinglePageStart: (state, action) => {
        state.pageData = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
        };
      },
      fetchSinglePageSuccess: (state, action) => {
        state.pageData = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      fetchSinglePageFailure: (state, action) => {
        state.pageData = {
          data: {},
          loading: false,
          error: action.payload,
          inputData: {},
        };
      },
    },
  });

export const { fetchSinglePageSuccess, fetchSinglePageFailure,fetchSinglePageStart } = PageSlice.actions;

  export default PageSlice.reducer;
