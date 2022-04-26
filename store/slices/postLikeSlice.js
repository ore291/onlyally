import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  saveLike: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  likes: {
    data: {},
    loading: true,
    error: false,
  },
};

export const PostLikesSlice = createSlice({
  name: "postlikes",
  initialState,

  reducers: {
    savePostLikedStart: (state, action) => {
      state.saveLike = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    savePostLikedSuccess: (state, action) => {
      state.saveLike = {
        inputData: {},
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    savePostLikedFailure: (state, action) => {
      state.saveLike = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
    fetchPostLikedStart: (state, action) => {
      state.likes = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchPostLikedSuccess: (state, action) => {
      state.likes = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchPostLikedFailure: (state, action) => {
      state.saveLike = {
        data: {},
        loading: true,
        error: action.payload.error,
      };
    },
  },
});

export const {
  savePostLikedStart,
  savePostLikedSuccess,
  savePostLikedFailure,
  fetchPostLikedFailure,
  fetchPostLikedStart,
  fetchPostLikedSuccess,
} = PostLikesSlice.actions;

export default PostLikesSlice.reducer;
