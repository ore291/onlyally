import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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

  export const NotificationSlice = createSlice({
    name: "notification",
    initialState,

    reducers: {
      fetchNotificationsStart: (state, action) => {
        state.notification = {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
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

export const {
    fetchNotificationsStart,
    fetchNotificationsSuccess,
    fetchNotificationsFailure

  } = NotificationSlice.actions;

  export default NotificationSlice.reducer;
