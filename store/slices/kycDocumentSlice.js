import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  addKycDocInput: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  kycDocDetails: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

  export const KycDocumentSlice = createSlice({
    name: "kycDocument",
    initialState,

    reducers: {
      addKycDocumentStart: (state, action) => {
        state.addKycDocInput = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        };
      },
      addKycDocumentSuccess: (state, action) => {
        state.addKycDocInput = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: "Send for Approval",
        };
      },
      addKycDocumentFailure: (state, action) => {
        state.addKycDocInput = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: "Send for Approval",
        };
      },
      getKycDocumentStart: (state, action) => {
        state.kycDocDetails = {
          data: {},
          loading: true,
          error: false,
        };
      },
      getKycDocumentSuccess: (state, action) => {
        state.kycDocDetails = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      getKycDocumentFailure: (state, action) => {
        state.kycDocDetails = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
    },
  });

export const {
  addKycDocumentSuccess,
  addKycDocumentFailure,
  addKycDocumentStart,
  getKycDocumentSuccess,
  getKycDocumentFailure,
  getKycDocumentStart,
} = KycDocumentSlice.actions;

  export default KycDocumentSlice.reducer;
