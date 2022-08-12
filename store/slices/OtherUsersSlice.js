import { createSlice } from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
  userDetails: {
    data: {},
    loading: false,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  userPosts: {
    data: {
      posts: [],
    },
    loading: false,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
    skip: 0,
    length: 0,
    loadMore: false,
  },
  searchPosts: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const OtherUserSlice = createSlice({
  name: "otherUser",
  initialState,

  reducers: {
    fetchSingleUserProfileStart: (state, action) => {
      state.userDetails = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    fetchSingleUserProfileSuccess: (state, action) => {
      state.userDetails = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchSingleUserProfileFailure: (state, action) => {
      state.userDetails = {
        data: {},
        loading: false,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchSingleUserPostsStart: (state, action) => {
      state.userPosts = {
        data: {
          posts:
            action.payload.loadMore === "loadMore"
              ? [...state.userPosts.data.posts]
              : [],
        },
        loadMore: action.payload.loadMore === "loadMore" ? true : false,
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
        skip: action.payload.loadMore === "loadMore" ? state.userPosts.skip : 0,
        length:
          action.payload.loadMore === "loadMore" ? state.userPosts.length : 0,
      };
    },
    fetchSingleUserPostsSuccess: (state, action) => {
      state.userPosts = {
        data: {
            posts: state.userPosts.loadMore
              ? [...state.userPosts.data.posts, ...action.payload.posts]
              : [...action.payload.posts],
          },
          loadMore: state.userPosts.loadMore,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
          skip: action.payload.posts.length + state.userPosts.skip,
          length: action.payload.posts.length,
      };
    },
    fetchSingleUserPostsFailure: (state, action) => {
      state.userPosts = {
        data: {
            posts: [],
          },
          loading: true,
          loadMore: false,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
          skip: state.userPosts.skip,
          length: state.userPosts.length,
      };
    },
    searchUserPostStart : (state, action) => {
        state.searchPosts = {
            data: {},
            loading: true,
            error: false,
            inputData: action.payload,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
        }
    },
    searchUserPostSuccess: (state, action) => {
        state.searchPosts = {
            data: action.payload,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
        }
    },
    searchUserPostFailure : (state, action) => {
        state.searchPosts = {
            data: {},
            loading: true,
            error: action.payload,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
        }
    },

    
    
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.otherUser.userDetails || !action.payload.otherUser.userPosts) {
        return state;
      }
      state.userDetails = action.payload.otherUser.userDetails ;
      state.userPosts = action.payload.otherUser.userPosts;
      
    },
  },
});

export const {
 fetchSingleUserPostsStart,
 fetchSingleUserPostsSuccess,
 fetchSingleUserPostsFailure,
 fetchSingleUserProfileStart,
 fetchSingleUserProfileSuccess,
 fetchSingleUserProfileFailure,
 searchUserPostStart,
 searchUserPostSuccess,
 searchUserPostFailure,
} = OtherUserSlice.actions;

export default OtherUserSlice.reducer;
