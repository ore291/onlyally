import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";


const initialState = {
  addBankAccountInput: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  addBankAccountContentCreatorFlowInput: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  bankAccount: {
    data: {},
    loading: true,
    error: false,
  },
  deleteAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  deleteAccountContentCreatorFlow: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  makeDefault: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  singleAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

  export const BankAccountSlice = createSlice({
    name: "bankAccount",
    initialState,

    reducers: {
      addBankAccountStart: (state, action) => {
            state.addBankAccountInput = {
                data: {},
                loading: true,
                error: false,
                inputData: action.payload,
                loadingButtonContent:"Loading... Please wait",
                buttonDisable:true,
            };
      
      },
      addBankAccountContentCreatorFlowStart: (state, action) => {
        state.addBankAccountContentCreatorFlowInput = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        };
      },
      addBankAccountSuccess: (state, action) => {
        state.addBankAccountInput = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      addBankAccountFailure: (state, action) => {
        state.addBankAccountInput = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      getBankAccountStart: (state, action) => {
        state.bankAccount = {
          data: {},
          loading: true,
          error: false,
        };
      },
      getBankAccountSuccess: (state, action) => {
        state.bankAccount = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      getBankAccountFailure: (state, action) => {
        state.bankAccount = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      deleteBankAccountStart: (state, action) => {
        state.deleteAccount = {
          inputData: action.payload,
          data: {},
          loading: true,
          error: false,
        };
      },
      deleteBankAccountContentCreatorFlowStart: (state, action) => {
        state.deleteAccountContentCreatorFlow = {
          inputData: action.payload,
          data: {},
          loading: true,
          error: false,
        };
      },
      deleteBankAccountSuccess: (state, action) => {
        state.deleteAccount = {
          inputData: action.payload,
          data: {},
          loading: true,
          error: false,
        };
      },
      deleteBankAccountFailure: (state, action) => {
        state.deleteAccount = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      makeDefaultBankAccountStart: (state, action) => {
        state.makeDefault = {
          inputData: action.payload,
          data: {},
          loading: true,
          error: false,
        };
      },
      makeDefaultBankAccountSuccess: (state, action) => {
        state.makeDefault = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      makeDefaultBankAccountFailure: (state, action) => {
        state.makeDefault = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
        };
      },
      fetchSingleBankAccountStart: (state, action) => {
        state.singleAccount = {
          inputData: action.payload,
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchSingleBankAccountSuccess: (state, action) => {
        state.singleAccount = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
        };
      },
      fetchSingleBankAccountFailure: (state, action) => {
        state.singleAccount = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
        };
      },
    },
  });

export const {
  addBankAccountSuccess,
  addBankAccountFailure,
  addBankAccountStart,
  getBankAccountSuccess,
  getBankAccountFailure,
  getBankAccountStart,
  makeDefaultBankAccountSuccess,
  makeDefaultBankAccountStart,
  makeDefaultBankAccountFailure,
  deleteBankAccountSuccess,
  deleteBankAccountStart,
  deleteBankAccountFailure,
  fetchSingleBankAccountSuccess,
  fetchSingleBankAccountStart,
  fetchSingleBankAccountFailure,
  addBankAccountContentCreatorFlowStart,
  deleteBankAccountContentCreatorFlowStart,
} = BankAccountSlice.actions;

  export default BankAccountSlice.reducer;
