import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  allTransaction: {
    data: {},
    loading: true,
    error: false,
  },
  sentPayTrans: {
    data: {},
    loading: true,
    error: false,
  },
  receivedPayTrans: {
    data: {},
    loading: true,
    error: false,
  },
  depositTrans: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

  export const TransactionSlice = createSlice({
    name: "transaction",
    initialState,

    reducers: {
      fetchAllTransactionStart: (state, action) => {
        state.allTransaction = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchAllTransactionSuccess: (state, action) => {
        state.allTransaction = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchAllTransactionFailure: (state, action) => {
        state.allTransaction = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchSentPaymentTransactionStart: (state, action) => {
        state.sentPayTrans = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchSentPaymentTransactionSuccess: (state, action) => {
        state.sentPayTrans = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchSentPaymentTransactionFailure: (state, action) => {
        state.sentPayTrans = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchReceivedPaymentTransactionStart: (state, action) => {
        state.receivedPayTrans = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchReceivedPaymentTransactionSuccess: (state, action) => {
        state.receivedPayTrans = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchReceivedPaymentTransactionFailure: (state, action) => {
        state.receivedPayTrans = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchDepositTransactionStart: (state, action) => {
        state.depositTrans = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchDepositTransactionSuccess: (state, action) => {
        state.depositTrans = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchDepositTransactionFailure: (state, action) => {
        state.depositTrans = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
    },

    
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.transaction.allTransaction) {
        return state;
      }
      state.allTransaction = action.payload.transaction.allTransaction;
     
    },
  },
  });

export const {
  fetchAllTransactionSuccess,
  fetchAllTransactionFailure,
  fetchAllTransactionStart,
  fetchSentPaymentTransactionSuccess,
  fetchSentPaymentTransactionFailure,
  fetchSentPaymentTransactionStart,
  fetchReceivedPaymentTransactionSuccess,
  fetchReceivedPaymentTransactionFailure,
  fetchReceivedPaymentTransactionStart,
  fetchDepositTransactionSuccess,
  fetchDepositTransactionFailure,
  fetchDepositTransactionStart,
} = TransactionSlice.actions;

  export default TransactionSlice.reducer;
