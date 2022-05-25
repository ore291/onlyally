import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  channels: {
    data: {},
    loading: false,
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

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.channels.channels.data) {
        return state;
      }
      state.data = action.payload.channels.channels.data;
    },
  },
});

export const {
  fetchChannelsStart,
  fetchChannelsSuccess,
  fetchChannelsFailure,
} = ChannelsSlice.actions;

export default ChannelsSlice.reducer;