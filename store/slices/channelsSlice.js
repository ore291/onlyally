import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  channels: {
    data: {},
    loading: false,
    error: false,
  },
  channelSubscribe:{
    inputData: null,
    loading: false,
    error: false,
    data: {},
  }
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
    channelSubscribeStart: (state, action)=>{
      state.channelSubscribe = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      }
    },
    channelSubscribeSuccess: (state, action)=>{
      state.channelSubscribe = {
        inputData:null,
        loading: false,
        error: false,
        data: action.payload,
      }
    },
    channelSubscribeFailure: (state, action)=>{
      state.channelSubscribe = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      }
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
  channelSubscribeStart,
  channelSubscribeSuccess,
  channelSubscribeFailure
} = ChannelsSlice.actions;

export default ChannelsSlice.reducer;