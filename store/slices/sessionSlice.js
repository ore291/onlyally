import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  sessionList: {
    data: {},
    loading: true,
    error: false,
  },
  sessionDelete: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const SessionSlice = createSlice({
  name: "session",
  initialState,

  reducers: {
    fetchSessionManagementListStart: (state, action) => {
      state.sessionList = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchSessionManagementListSuccess: (state, action) => {
      state.sessionList = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSessionManagementListFailure: (state, action) => {
      state.sessionList = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    deleteSingleLoginSessionStart : (state, action) => {
        state.sessionDelete = {
            data: {},
            loading: true,
            error: false,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
        }
    },
    deleteSingleLoginSessionSuccess : (state, action) => {
        state.sessionDelete = {
            data: action.payload,
            loading: false,
            error: false,
            loadingButtonContent: null,
            buttonDisable: false,
        }
    },
    deleteSingleLoginSessionFailure: (state, action) => {
        state.sessionDelete = {
            data: {},
            loading: true,
            error: action.payload,
            loadingButtonContent: null,
            buttonDisable: false,
        }
    },
    deleteAllLoginSessionStart: (state, action) => {
        state.sessionDelete = {
            data: {},
            loading: true,
            error: false,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
        }
    },
    deleteAllLoginSessionSuccess: (state, action) => {
        state.sessionDelete = {
            data: action.payload,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        }
    },
    deleteAllLoginSessionFailure: (state, action) => {
        state.sessionDelete = {
            data: {},
            loading: true,
            error: action.payload,
            loadingButtonContent: null,
            buttonDisable: false,
        }
    },
  },
});

export const {
    fetchSessionManagementListStart,
    fetchSessionManagementListSuccess,
    fetchSessionManagementListFailure,
    deleteAllLoginSessionStart,
    deleteAllLoginSessionSuccess,
    deleteAllLoginSessionFailure,
    deleteSingleLoginSessionStart,
    deleteSingleLoginSessionSuccess,
    deleteSingleLoginSessionFailure
} = SessionSlice.actions;

export default SessionSlice.reducer;
