import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saveAssetUpload: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  chatAssetInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  chatAssetPayPaystack: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  chatAssetPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  chatAssetPayPaypal: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

export const ChatAssetSlice = createSlice({
  name: "chatAsset",
  initialState,
  reducers: {
    chatAssetFileUploadStart: (state, action) => {
      state.chatAssetInputData = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
      state.saveAssetUpload = {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    chatAssetFileUploadSuccess: (state, action) => {
      state.saveAssetUpload = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    chatAssetFileUploadFailure: (state, action) => {
      state.saveAssetUpload = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    chatAssetPaymentPaystackStart: (state, action) => {
      state.chatAssetPayPaystack = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    chatAssetPaymentPaystackSuccess: (state, action) => {
      state.chatAssetPayPaystack = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    chatAssetPaymentPaystackFailure: (state, action) => {
      state.chatAssetPayPaystack = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    chatAssetPaymentWalletStart: (state, action) => {
      state.chatAssetPayWallet = {
        inputData: action.data,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    chatAssetPaymentWalletSuccess: (state, action) => {
      state.chatAssetPayWallet = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    chatAssetPaymentWalletFailure: (state, action) => {
      state.chatAssetPayWallet = {
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
    chatAssetPaymentPaystackStart,
    chatAssetPaymentPaystackSuccess,
    chatAssetPaymentPaystackFailure,
    chatAssetPaymentWalletStart,
    chatAssetPaymentWalletSuccess,
    chatAssetPaymentWalletFailure,
    chatAssetFileUploadStart,
    chatAssetFileUploadSuccess,
    chatAssetFileUploadFailure,

} = ChatAssetSlice.actions;

export default ChatAssetSlice.reducer;