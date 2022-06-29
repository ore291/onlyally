import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  docs: {
    data: {},
    loading: true,
    error: false,
  },
  saveDocs: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delDocs: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  docStatus: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

  export const VerificationDocumentSlice = createSlice({
    name: "verificationDocument",
    initialState,

    reducers: {
      fetchVeriDocumentsStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchVeriDocumentsSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchVeriDocumentsFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      saveVeriDocStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        };
      },
      saveVeriDocSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      saveVeriDocFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      delVeriDocStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        };
      },
      delVeriDocSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      delVeriDocFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      verifictionStatusCheckStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      verificationStatusCheckSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: true,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      verificationStatusCheckFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
    },
  });

export const {
   
    saveVeriDocFailure,
    saveVeriDocStart,
  saveVeriDocSuccess,
  fetchVeriDocumentsSuccess,
    fetchVeriDocumentsFailure,
  fetchVeriDocumentsStart,
  delVeriDocSuccess,
    delVeriDocFailure,
  delVeriDocStart,
    verificationStatusCheckSuccess,
  verificationStatusCheckStart,
  verificationStatusCheckFailure,
      
  } = VerificationDocumentSlice.actions;

  export default VerificationDocumentSlice.reducer;
