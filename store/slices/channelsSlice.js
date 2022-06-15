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
  },
  channelData: {
    inputData: '',
    data: [],
    loading: false,
    error: false,
  },
  createChannel : {
    inputData: null,
    data: {},
    loading: false,
    error: false,
  },
  categories : {
    data: {},
    loading: false,
    error: false
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
    fetchSingleChannelStart: (state, action)=>{
      state.channelData = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false
      }
    },
    fetchSingleChannelSuccess: (state, action)=>{
      state.channelData = {
        inputData : "",
        data: action.payload,
        loading: false,
        error: false
      }
    },
    fetchSingleChannelFailure: (state, action)=>{
      state.channelData = {
        inputData : "",
        data: {},
        loading: false,
        error: action.payload
      }
    },
    createChannelStart: (state, action)=>{
      state.createChannel = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      }
    },
    createChannelSuccess: (state, action)=>{
      state.createChannel = {
        inputData:null,
        loading: false,
        error: false,
        data: action.payload,
      }
    },
    createChannelFailure: (state, action)=>{
      state.createChannel = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      }
    },
    fetchChannelsCategoriesStart: (state, action)=>{
      state.categories = {
        data : {},
        loading: true,
        error : false,
      }
  },
  fetchChannelsCategoriesSuccess: (state, action)=>{
      state.categories = {
        data : action.payload,
        loading: false,
        error : false,
      }
  },
  fetchChannelsCategoriesFailure: (state, action)=>{
    state.categories = {
      data : {},
      loading: false,
      error : action.payload,
    }
},
  },


});

export const {
  fetchChannelsStart,
  fetchChannelsSuccess,
  fetchChannelsFailure,
  channelSubscribeStart,
  channelSubscribeSuccess,
  channelSubscribeFailure,
  fetchSingleChannelStart,
  fetchSingleChannelSuccess,
  fetchSingleChannelFailure,
  createChannelStart,
  createChannelSuccess,
  createChannelFailure,
  fetchChannelsCategoriesStart,
  fetchChannelsCategoriesSuccess,
  fetchChannelsCategoriesFailure,
} = ChannelsSlice.actions;

export default ChannelsSlice.reducer;