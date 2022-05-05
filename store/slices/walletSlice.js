import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletData: {
    data: {},
    loading: true,
    error: false,
  },
  addMoneyInput: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
    successData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

export const WalletSlice = createSlice({
  name: "wallet",
  initialState,

  reducers: {
    fetchWalletDetailsStart: (state, action) => {
      state.walletData = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchWalletDetailsSuccess: (state, action) => {
      state.walletData = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchWalletDetailsFailure: (state, action) => {
      state.walletData = {
        data: {},
          loading: true,
          error: action.payload,
      };
    },
    addMoneyViaCardStart: (state, action)=> {
        state.addMoneyInput = {
            data: action.payload,
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Processing...",
          successData: {},
        }
    },
    addMoneyViaCardSuccess: (state, action)=> {
        state.addMoneyInput = {
            data: {},
            loading: false,
            error: false,
            buttonDisable: false,
            loadingButtonContent: null,
            successData: action.payload,
        }
    },
    addMoneyViaCardFailure: (state, action)=> {
        state.addMoneyInput = {
            data: {},
            loading: true,
            error: action.payload,
            buttonDisable: false,
            loadingButtonContent: null,
            successData: {},
        }
    },
  },
});

export const {
    addMoneyViaCardFailure, 
    addMoneyViaCardSuccess,
    addMoneyViaCardStart,
    fetchWalletDetailsStart,
    fetchWalletDetailsSuccess,
    fetchWalletDetailsFailure



} = WalletSlice.actions;

export default WalletSlice.reducer;

