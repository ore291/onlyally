import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  readyFund : {
    payment_id: "",
    start_fund: false,
  },
  fundWallet: {
    data: {},
    loading: false,
    error: false,
    
  },
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
    addMoneyViaPaystackStart: (state, action) => {
      state.addMoneyInput = {
        data: action.payload,
        loading: true,
        error: false,
        buttonDisable: true,
        loadingButtonContent: "Processing...",
        successData: {},
      };
    },
    addMoneyViaPaystackSuccess: (state, action) => {
      state.addMoneyInput = {
        data: {},
        loading: false,
        error: false,
        buttonDisable: false,
        loadingButtonContent: null,
        successData: action.payload,
      };
    },
    addMoneyViaPaystackFailure: (state, action) => {
      state.addMoneyInput = {
        data: {},
        loading: true,
        error: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
        successData: {},
      };
    },
    initializePaystackStart: (state, action) => {
      state.fundWallet = {
        data: {},
        loading: true,
        error: false,
        start_fund: true,
      };
    },
    initializePaystackSuccess: (state, action) => {
      state.fundWallet = {
        data: action.payload,
        loading: false,
        error: false,
        start_fund: true,
      };
    },
    initializePaystackFailure: (state, action) => {
      state.fundWallet = {
        data: {},
        loading: false,
        error: action.payload,
        start_fund: true,
      };
    },
    setPaystackInfo: (state, action) => {
      state.readyFund = {
        start_fund: true,
        payment_id: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.wallet.walletData) {
        return state;
      }
      state.walletData = action.payload.wallet.walletData;
    },
  },
});

export const {
  addMoneyViaPaystackFailure,
  addMoneyViaPaystackSuccess,
  addMoneyViaPaystackStart,
  fetchWalletDetailsStart,
  fetchWalletDetailsSuccess,
  fetchWalletDetailsFailure,
  initializePaystackStart,
  initializePaystackSuccess,
  initializePaystackFailure,
  setPaystackInfo,
} = WalletSlice.actions;

export default WalletSlice.reducer;
