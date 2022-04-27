import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  homePost: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  searchUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  singlePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postSug: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postPaymentStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postPaymentWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  lists: {
    data: {},
    loading: true,
    error: false,
  },
  trendingUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,

  reducers: {
    fetchHomePostsStart: (state, action) => {
      state.homePost.data.posts = [...state.homePost.data.posts];
      state.homePost.loading = true;
      state.homePost.error = false;
      state.homePost.skip = state.homePost.skip;
      state.homePost.length = state.homePost.length;
    },
    fetchHomePostsSuccess: (state, action) => {
      state.homePost.data.posts = [
        ...state.homePost.data.posts,
        ...action.payload.posts,
      ];
      state.homePost.loading = false;
      state.homePost.error = false;
      state.homePost.skip = action.payload.posts.length + state.homePost.skip;
      state.homePost.length = action.payload.posts.length;
    },
    fetchHomePostsFailure: (state, action) => {
      state.homePost.data.posts = [];
      state.homePost.loading = false;
      state.homePost.error = action.payload;
      state.homePost.skip = state.homePost.skip;
      state.homePost.length = state.homePost.length;
    },
    searchUserStart: (state, action) => {
      state.searchUser = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading...",
        buttonDisable: true,
      };
    },
    searchUserSuccess: (state, action) => {
      state.searchUser = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    searchUserFailure: (state, action) => {
      state.searchUser = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchTrendingUsersStart: (state, action) => {
      state.trendingUsers = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    fetchTrendingUsersSuccess: (state, action) => {
      state.trendingUsers = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchTrendingUsersFailure: (state, action) => {
      state.trendingUsers = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.home.homePost) {
        return state;
      }
      state.homePost = action.payload.home.homePost;
      state.trendingUsers = action.payload.home.trendingUsers;
      // state.homePost.posts = action.payload.home.homePost.posts;
      // state.homePost.skip = action.payload.home.homePost.skip;
      // state.homePost.length = action.payload.home.homePost.length;
      // state.homePost.error = action.payload.home.homePost.error;
    },
  },
});

export const {
  fetchHomePostsStart,
  fetchHomePostsSuccess,
  fetchHomePostsFailure,
  searchUserFailure,
  searchUserStart,
  searchUserSuccess,
  fetchTrendingUsersFailure,
  fetchTrendingUsersSuccess,
  fetchTrendingUsersStart
} = HomeSlice.actions;

export default HomeSlice.reducer;
