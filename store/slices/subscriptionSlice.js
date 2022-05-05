import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscription: {
    data: {},
    loading: true,
    error: false,
  },
  mySubscription: {
    data: {},
    loading: true,
    error: false,
  },
  singleSubscription: {
    data: {},
    loading: true,
    error: false,
  },
  subPayPaystack: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subscriptionRenew: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayCCBill: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayCoinPayment: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

export const SubscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,

  reducers: {
    fetchSubscriptionStart: (state, action) => {
      state.subscription = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchSubscriptionSuccess: (state, action) => {
      state.subscription = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSubscriptionFailure: (state, action) => {
      state.subscription = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    fetchMySubscriptionStart: (state, action) => {
      state.mySubscription = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchMySubscriptionSuccess: (state, action) => {
      state.mySubscription = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchMySubscriptionFailure: (state, action) => {
      state.mySubscription = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    fetchSingleSubscriptionStart: (state, action) => {
      (state.singleSubscription = {
        data: {},
        loading: true,
        error: action.payload,
      }),
        (state.singleSubInputData = {
          data: action.payload,
        });
    },
    fetchSingleSubscriptionSuccess: (state, action) => {
      state.singleSubscription = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSingleSubscriptionFailure: (state, action) => {
      state.mySubscription = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    subscriptionPaymentPaystackStart: (state, action) => {
      state.subPayPaystack = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    subscriptionPaymentPaystackSuccess: (state, action) => {
      state.subPayPaystack = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    subscriptionPaymentPaystackFailure: (state, action) => {
      state.subPayPaystack = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    subscriptionPaymentWalletStart: (state, action) => {
      state.subPayWallet = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    subscriptionPaymentWalletSuccess: (state, action) => {
      state.subPayWallet = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    subscriptionPaymentWalletFailure: (state, action) => {
      state.subPayWallet = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    subscriptionAutoRenewalStart: (state, action) => {
      state.subscriptionRenew ={
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    subscriptionAutoRenewalSuccess: (state, action) => {
      state.subscriptionRenew = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    subscriptionAutoRenewalFailure: (state, action) => {
      state.subscriptionRenew = {
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
    fetchSubscriptionStart,
    fetchSubscriptionSuccess,
    fetchSubscriptionFailure,
    fetchMySubscriptionStart,
    fetchMySubscriptionSuccess,
    fetchMySubscriptionFailure,
    fetchSingleSubscriptionStart,
    fetchSingleSubscriptionSuccess,
    fetchSingleSubscriptionFailure,
    subscriptionPaymentPaystackStart,
    subscriptionPaymentPaystackSuccess,
    subscriptionPaymentPaystackFailure,
    subscriptionPaymentWalletStart,
    subscriptionPaymentWalletSuccess,
    subscriptionPaymentWalletFailure,
    subscriptionAutoRenewalStart,
    subscriptionAutoRenewalSuccess,
    subscriptionAutoRenewalFailure,

  } = SubscriptionSlice.actions;
  

export default SubscriptionSlice.reducer