import { createSlice } from "@reduxjs/toolkit";

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
    loading: true,
    error: false,
  },
  activeFollowers: {
    data: {},
    loading: true,
    error: false,
  },
  expiredFollowers: {
    data: {},
    loading: true,
    error: false,
  },
  following: {
    data: {},
    loading: true,
    error: false,
  },
  activeFollowing: {
    data: {},
    loading: true,
    error: false,
  },
  expiredFollowing: {
    data: {},
    loading: true,
    error: false,
  },
};

export const FollowerSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    followUserStart: (state, action) => {
      state.followUser = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    followUserSuccess: (state, action) => {
      state.followUser = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    followUserFailure: (state, action) => {
      state.followUser = {
        data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
      };
    },
    unFollowUserStart: (state, action) => {
        state.unFollowUser = {
            data: {},
          loading: true,
          error: false,
          inputData: action.payload,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        }
    },
    unFollowUserSuccess: (state, action) => {
        state.unFollowUser = {
            data: action.payload,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        }
    },
    unFollowUserFailure: (state, action) => {
        state.unFollowUser = {
            data: {},
            loading: true,
            error: action.payload,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
        }
    },
    fetchFollowersStart: (state, action) => {
        state.followers = {
            data: {},
          loading: true,
          error: false,
        }
    },
    fetchFollowersSuccess: (state, action) => {
        state.followers = {
            data: action.payload,
            loading: false,
            error: false,
        }
    },
    fetchFollowersFailure: (state, action) => {
        state.followers = {
            data: {},
          loading: true,
          error: action.payload,
        }
    },
    fetchActiveFollowersStart: (state, action) => {
        state.activeFollowers = {
            data: {},
          loading: true,
          error: false,
        }
    },
    fetchActiveFollowersSuccess: (state, action) => {
        state.activeFollowers = {
            data: action.payload,
            loading: false,
            error: false,
        }
    },
    fetchActiveFollowersFailure: (state, action) => {
        state.activeFollowers = {
            data: {},
          loading: true,
          error: action.payload,
        }
    },
    fetchExpiredFollowersStart: (state, action) => {
        state.expiredFollowers = {
            data: {},
          loading: true,
          error: false,
        }
    },
    fetchExpiredFollowersSuccess: (state, action) => {
        state.expiredFollowers = {
            data: action.payload,
            loading: false,
            error: false,
        }
    },
    fetchExpiredFollowersFailure: (state, action) => {
        state.expiredFollowers = {
            data: {},
          loading: true,
          error: action.payload,
        }
    },
    fetchFollowingStart: (state, action) => {
        state.following = {
            data: {},
          loading: true,
          error: false,
        }
    },
    fetchFollowingSuccess: (state, action) => {
        state.following = {
            data: action.payload,
            loading: false,
            error: false,
        }
    },
    fetchFollowingFailure: (state, action) => {
        state.following = {
            data: {},
          loading: true,
          error: action.payload,
        }
    },
    fetchActiveFollowingStart: (state, action) => {
        state.activeFollowing = {
            data: {},
          loading: true,
          error: false,
        }
    },
    fetchActiveFollowingSuccess: (state, action) => {
        state.activeFollowing = {
            data: action.payload,
            loading: false,
            error: false,
        }
    },
    fetchActiveFollowingFailure: (state, action) => {
        state.activeFollowing = {
            data: {},
          loading: true,
          error: action.payload,
        }
    },
    fetchExpiredFollowingStart: (state, action) => {
        state.expiredFollowing = {
            data: {},
          loading: true,
          error: false,
        }
    },
    fetchExpiredFollowingSuccess: (state, action) => {
        state.expiredFollowing = {
            data: action.payload,
            loading: false,
            error: false,
        }
    },
    fetchExpiredFollowingFailure: (state, action) => {
        state.expiredFollowing = {
            data: {},
          loading: true,
          error: action.payload,
        }
    },
    
  },
});

export const {
    followUserStart,
    followUserSuccess,
    followUserFailure,
    unFollowUserStart,
    unFollowUserSuccess,
    unFollowUserFailure,
    fetchFollowersStart,
    fetchFollowersSuccess,
    fetchFollowersFailure,
    fetchActiveFollowingStart,
    fetchActiveFollowingSuccess,
    fetchActiveFollowingFailure,
    fetchExpiredFollowingFailure,
    fetchExpiredFollowingStart,
    fetchExpiredFollowingSuccess,
    fetchFollowingStart,
    fetchFollowingSuccess,
    fetchFollowingFailure,
    fetchActiveFollowersStart,
    fetchActiveFollowersSuccess,
    fetchActiveFollowersFailure,
    fetchExpiredFollowersStart,
    fetchExpiredFollowersSuccess,
    fetchExpiredFollowersFailure
    
} = FollowerSlice.actions;

export default FollowerSlice.reducer;
