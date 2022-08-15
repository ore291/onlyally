import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  followUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  unFollowUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  followers: {
    data: {},
    loading: false,
    error: false,
  },
  activeFollowers: {
    data: {},
    loading: false,
    error: false,
  },
  expiredFollowers: {
    data: {},
    loading: false,
    error: false,
  },
  following: {
    data: {},
    loading: false,
    error: false,
  },
  activeFollowing: {
    data: {},
    loading: false,
    error: false,
  },
  expiredFollowing: {
    data: {},
    loading: false,
    error: false,
  },
};

  export const FollowSlice = createSlice({
    name: "follow",
    initialState,

    reducers: {
      followUserStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        };
      },
      followUserSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      followUserFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      unfollowUserStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        };
      },
      unfollowUserSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      unfollowUserFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        };
      },
      fetchFollowersStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchFollowersSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchFollowersFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchActiveFollowersStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchActiveFollowersSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchActiveFollowersFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchExpiredFollowersStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchExpiredFollowersSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchExpiredFollowersFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchFollowingStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchFollowingSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchFollowingFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchActiveFollowingStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchActiveFollowingSuccess: (state, action) => {
        state.sessionlist = {
          data: action.payload,
          loading: false,
          error: false,
        };
      },
      fetchActiveFollowingFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.payload,
        };
      },
      fetchExpiredFollowingStart: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: false,
        };
      },
      fetchExpiredFollowingSuccess: (state, action) => {
        state.sessionlist = {
          data: action.data,
          loading: false,
          error: false,
        };
      },
      fetchExpiredFollowingFailure: (state, action) => {
        state.sessionlist = {
          data: {},
          loading: true,
          error: action.error,
        };
      },
    },
  });

export const {
    followUserStart,
    followUserSuccess,
    followUserFailure,
    unfollowUserStart,
    unfollowUserSuccess,
    unfollowUserFailure,
    fetchFollowersStart,
    fetchFollowersSuccess,
    fetchFollowersFailure,
    fetchActiveFollowersStart,
    fetchActiveFollowersSuccess,
    fetchActiveFollowersFailure,
    fetchExpiredFollowersStart,
    fetchExpiredFollowersSuccess,
    fetchExpiredFollowersFailure,
    fetchFollowingStart,
    fetchFollowingSuccess,
    fetchFollowingFailure,
    fetchActiveFollowingStart,
    fetchActiveFollowingSuccess,
    fetchActiveFollowingFailure,
    fetchExpiredFollowingStart,
    fetchExpiredFollowingSuccess,
    fetchExpiredFollowingFailure


  } = FollowSlice.actions;

  export default FollowSlice.reducer;
