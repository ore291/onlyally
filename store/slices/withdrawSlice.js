import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  withDrawals: {
    data: {},
    loading: true,
    error: false,
  },
  sendWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  cancelWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  searchWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  singleWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

  export const WithdrawSlice = createSlice({
    name: "withdraw",
    initialState,

    reducers: {
      fetchWithdrawlsStart: (state, action) => {
        state.withDrawals = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchWithDrawalsSuccess: (state, action) => {
        state.withDrawals = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchWithDrawalsFailure: (state, action) => {
        state.withDrawals = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      sendWithDrawRequestStart: (state, action) => {
        state.sendWithDraw = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        };
      },
      sendWithDrawRequestSuccess: (state, action) => {
        state.sendWithDraw= {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      sendWithDrawRequestFailure: (state, action) => {
        state.sendWithDraw = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      cancelWithDrawRequestStart: (state, action) => {
        state.cancelWithDraw = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        };
      },
      cancelWithDrawRequestSuccess: (state, action) => {
        state.cancelWithDraw = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      cancelWithDrawRequestFailure: (state, action) => {
        state.cancelWithDraw = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      searchWithDrawalsStart: (state, action) => {
        state.searchWithDraw = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
        };
      },
      searchWithDrawalsSuccess: (state, action) => {
        state.searchWithDraw = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      searchWithDrawalsFailure: (state, action) => {
        state.searchWithDraw = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
        };
      },
      fetchSingleWithDrawalsStart: (state, action) => {
        state.singleWithDraw = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
        };
      },
      fetchSingleWithDrawalsSuccess: (state, action) => {
        state.singleWithDraw = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      fetchSingleWithDrawalsFailure: (state, action) => {
        state.singleWithDraw = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
        };
      },
    },
  });

export const {
  fetchWithDrawalsSuccess,
  fetchWithDrawalsFailure,
  sendWithDrawRequestSuccess,
  sendWithDrawRequestFailure,
  cancelWithDrawRequestSuccess,
  cancelWithDrawRequestFailure,
  fetchSingleWithDrawalsSuccess,
  fetchSingleWithDrawalsFailure,
  searchWithDrawalsSuccess,
  searchWithDrawalsFailure,
 fetchWithDrawalsStart,
sendWithDrawRequestStart,
 cancelWithDrawRequestStart,
fetchSingleWithDrawalsStart,
searchWithDrawalsStart
} = WithdrawSlice.actions;

  export default WithdrawSlice.reducer;
