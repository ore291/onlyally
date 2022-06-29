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
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchWithDrawalsSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchWithDrawalsFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      sendWithDrawRequestStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        };
      },
      sendWithDrawRequestSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      sendWithDrawRequestFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      cancelWithDrawRequestStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        };
      },
      cancelWithDrawRequestSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      cancelWithDrawRequestFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        };
      },
      searchWithDrawalsStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        };
      },
      searchWithDrawalsSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      searchWithDrawalsFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
        };
      },
      fetchSingleWithDrawalsStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
        };
      },
      fetchSingleWithDrawalsSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      fetchSingleWithDrawalsFailure: (state, action) => {
        state.sessionlist = {
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
