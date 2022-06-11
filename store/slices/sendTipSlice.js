import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  tipPaystack: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  tipWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const SendTipSlice = createSlice({
  name: "tips",
  initialState,

  reducers: {
    sendTipByPaystackStart: (state, action) => {
      state.tipPaystack = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    sendTipBypPaystackSuccess: (state, action) => {
      state.tipPaystack = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    sendTipByPaystackFailure: (state, action) => {
      state.tipPaystack = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    sendTipByWalletStart: (state, action) => {
      state.tipWallet = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    sendTipByWalletSuccess: (state, action) => {
      state.tipWallet = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    sendTipByWalletFailure: (state, action) => {
      state.tipWallet = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.stories.stories) {
        return state;
      }
      state.stories = action.payload.stories.stories;
    },
  },
});

export const {
 sendTipByWalletStart,
 sendTipByWalletSuccess,
 sendTipByWalletFailure,
 sendTipByPaystackStart,
 sendTipByPaystackFailure,
 sendTipBypPaystackSuccess
} = SendTipSlice.actions;

export default SendTipSlice.reducer;
