import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  channels: {
    data: {},
    loading: true,
    error: false,
  },
};

export const ChannelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    fetchChannelsStart: (state, action) => {
      state.channels = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchChannelsSuccess: (state, action) => {
      state.channels = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchChannelsFailure: (state, action) => {
      state.channels = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  fetchChannelsStart,
  fetchChannelsSuccess,
  fetchChannelsFailure,
} = ChannelsSlice.actions;

export default ChannelsSlice.reducer;