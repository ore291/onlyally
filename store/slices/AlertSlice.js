import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  notifications: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    fetchNotificationsStart: (state, action) => {
      state.notification = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
      };
    },
    fetchNotificationsSuccess: (state, action) => {
      state.notification = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
      };
    },
    fetchNotificationsFailure: (state, action) => {
      state.notification = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
  },
});


export const {fetchNotificationsFailure, fetchNotificationsStart, fetchNotificationsSuccess} = AlertSlice.actions;

export default AlertSlice.reducer;