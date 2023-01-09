import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  posts: {
    data: {},
    inputData: {},
    loading: true,
    error: false,
  },
  timelines:{
    data: {},
    loading: true,
    error: false,
  },
  channels: {
    data: [],
    loading: false,
    error: false,
  },
  channelPayment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  finishPayment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  userChannels: {
    data: [],
    loading: false,
    error: false,
  },
  otherUserChannels: {
    data: [],
    loading: false,
    error: false,
  },
  channelSubscribe: {
    inputData: null,
    loading: false,
    error: false,
    data: {},
  },
  channelData: {
    inputData: "",
    data: [],
    loading: false,
    error: false,
  },
  createChannel: {
    inputData: null,
    data: {},
    loading: false,
    error: false,
  },
  categories: {
    data: [],
    loading: false,
    error: false,
  },

  saveChannelPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },

  updateChannel: {
    data: {},
    loading: false,
    error: false,
  },
  updateChannelPhotos: {
    data: {},
    loading: false,
    error: false,
  },
  updateChannelPrivacy: {
    data: {},
    loading: false,
    error: false,
  },
  updateMemberStatus: {
    data: {},
    loading: false,
    error: false,
  },
  deleteChannel: {
    data: [],
    loading: false,
    buttonDisable: false,
    error: false,
  },
  deleteChannelMember: {
    data: [],
    loading: false,
    buttonDisable: false,
    error: false,
  },
};

export const ChannelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    fetchTimelinePostsStart: (state, action) => {
      state.timelines = {
        
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchTimelinePostsSuccess: (state, action) => {
      state.timelines = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchTimelinePostsFailure: (state, action) => {
      state.timelines = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    fetchPostsStart: (state, action) => {
      state.posts = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = {
        inputData: action.payload,
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchPostsFailure: (state, action) => {
      state.posts = {
        inputData: action.payload,
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    updateChannelMemberStart: (state, action) => {
      state.updateMemberStatus = {
        data: {},
        loading: true,
        error: false,
      };
    },
    updateChannelMemberSuccess: (state, action) => {
      state.updateMemberStatus = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    updateChannelMemberFailure: (state, action) => {
      state.updateMemberStatus = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    deleteChannelStart: (state, action) => {
      state.deleteChannel = {
        data: [],
        loading: true,
        buttonDisable: true,
        error: false,
      };
    },
    deleteChannelSuccess: (state, action) => {
      state.deleteChannel = {
        data: action.payload,
        loading: false,
        buttonDisable: false,
        error: false,
      };
    },
    deleteChannelFailure: (state, action) => {
      state.deleteChannel = {
        data: [],
        loading: false,
        buttonDisable: false,
        error: action.payload,
      };
    },
    deleteChannelMemberStart: (state, action) => {
      state.deleteChannelMember = {
        data: [],
        loading: true,
        buttonDisable: true,
        error: false,
      };
    },
    deleteChannelMemberSuccess: (state, action) => {
      state.deleteChannelMember = {
        data: action.payload,
        loading: false,
        buttonDisable: false,
        error: false,
      };
    },
    deleteChannelMemberFailure: (state, action) => {
      state.deleteChannelMember = {
        data: [],
        loading: false,
        buttonDisable: false,
        error: action.payload,
      };
    },
    updateChannelInfoStart: (state, action) => {
      state.updateChannel = {
        data: {},
        loading: true,
        error: false,
      };
    },
    updateChannelInfoSuccess: (state, action) => {
      state.updateChannel = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    updateChannelInfoFailure: (state, action) => {
      state.updateChannel = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    updateChannelPrivacyStart: (state, action) => {
      state.updateChannelPrivacy = {
        data: {},
        loading: true,
        error: false,
      };
    },
    updateChannelPrivacySuccess: (state, action) => {
      state.updateChannelPrivacy = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    updateChannelPrivacyFailure: (state, action) => {
      state.updateChannelPrivacy = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    updateChannelPhotosStart: (state, action) => {
      state.updateChannelPhotos = {
        data: {},
        loading: true,
        error: false,
      };
    },
    updateChannelPhotosSuccess: (state, action) => {
      state.updateChannelPhotos = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    updateChannelPhotosFailure: (state, action) => {
      state.updateChannelPhotos = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    saveChannelPostStart: (state, action) => {
      state.saveChannelPost = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    saveChannelPostSuccess: (state, action) => {
      state.saveChannelPost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },

    saveChannelPostFailure: (state, action) => {
      state.saveChannelPost = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchChannelsStart: (state, action) => {
      state.channels = {
        data: [],
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
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    fetchUserChannelsStart: (state, action) => {
      state.userChannels = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchUserChannelsSuccess: (state, action) => {
      state.userChannels = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchUserChannelsFailure: (state, action) => {
      state.userChannels = {
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    fetchOtherUserChannelsStart: (state, action) => {
      state.otherUserChannels = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchOtherUserChannelsSuccess: (state, action) => {
      state.otherUserChannels = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchOtherUserChannelsFailure: (state, action) => {
      state.otherUserChannels = {
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    channelSubscribeStart: (state, action) => {
      state.channelSubscribe = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      };
    },
    channelSubscribeSuccess: (state, action) => {
      state.channelSubscribe = {
        inputData: null,
        loading: false,
        error: false,
        data: action.payload,
      };
    },
    channelSubscribeFailure: (state, action) => {
      state.channelSubscribe = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      };
    },
    fetchSingleChannelStart: (state, action) => {
      state.channelData = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchSingleChannelSuccess: (state, action) => {
      state.channelData = {
        inputData: "",
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSingleChannelFailure: (state, action) => {
      state.channelData = {
        inputData: "",
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    createChannelStart: (state, action) => {
      state.createChannel = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      };
    },
    createChannelSuccess: (state, action) => {
      state.createChannel = {
        inputData: null,
        loading: false,
        error: false,
        data: action.payload,
      };
    },
    createChannelFailure: (state, action) => {
      state.createChannel = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      };
    },
    fetchChannelsCategoriesStart: (state, action) => {
      state.categories = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchChannelsCategoriesSuccess: (state, action) => {
      state.categories = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchChannelsCategoriesFailure: (state, action) => {
      state.categories = {
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    channelPaymentStart: (state, action) => {
      state.channelPayment = {
        data: {},
        inputData: action.payload,
        loading: true,
        buttonDisable: false,
        error: false,
      };
    },
    channelPaymentSuccess: (state, action) => {
      state.channelPayment = {
        data: action.payload,
        inputData: {},
        loading: false,
        buttonDisable: false,
        error: false,
      };
    },
    channelPaymentFailure: (state, action) => {
      state.channelPayment = {
        data: {},
        inputData: {},
        loading: false,
        buttonDisable: false,
        error: action.payload,
      };
    },
    finishPaymentStart: (state, action) => {
      state.finishPayment = {
        data: {},
        inputData: action.payload,
        loading: true,
        buttonDisable: false,
        error: false,
      };
    },
    finishPaymentSuccess: (state, action) => {
      state.finishPayment = {
        data: action.payload,
        inputData: {},
        loading: false,
        buttonDisable: false,
        error: false,
      };
    },
    finishPaymentFailure: (state, action) => {
      state.finishPayment = {
        data: {},
        inputData: {},
        loading: false,
        buttonDisable: false,
        error: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (
        !action.payload.channels.channels ||
        !action.payload.channels.channelData ||
        !action.payload.channels.categories
      ) {
        return state;
      }
      state.channels = action.payload.channels.channels;
      state.userChannels = action.payload.channels.userChannels;
      // state.otherUserChannels = action.payload.channels.otherUserChannels;
      state.channelData = action.payload.channels.channelData;
      state.categories = action.payload.channels.categories;
    },
  },
});

export const {
  fetchTimelinePostsStart,
  fetchTimelinePostsSuccess,
  fetchTimelinePostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  finishPaymentStart,
  finishPaymentSuccess,
  finishPaymentFailure,
  channelPaymentStart,
  channelPaymentSuccess,
  channelPaymentFailure,
  fetchOtherUserChannelsSuccess,
  fetchOtherUserChannelsFailure,
  fetchOtherUserChannelsStart,
  updateChannelMemberStart,
  updateChannelMemberSuccess,
  updateChannelMemberFailure,
  deleteChannelMemberStart,
  deleteChannelMemberFailure,
  deleteChannelMemberSuccess,
  deleteChannelStart,
  deleteChannelSuccess,
  deleteChannelFailure,
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
  fetchUserChannelsStart,
  fetchUserChannelsSuccess,
  fetchUserChannelsFailure,
  updateChannelInfoStart,
  updateChannelInfoFailure,
  updateChannelInfoSuccess,
  updateChannelPhotosStart,
  updateChannelPhotosFailure,
  updateChannelPhotosSuccess,
  updateChannelPrivacyStart,
  updateChannelPrivacyFailure,
  updateChannelPrivacySuccess,
  saveChannelPostStart,
  saveChannelPostSuccess,
  saveChannelPostFailure,
} = ChannelsSlice.actions;

export default ChannelsSlice.reducer;
