import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmark: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
  bookmarkPhoto: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
  bookmarkVideo: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
  saveBookmark: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteBookmark: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  bookmarkAudio: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
};

export const BookmarkSlice = createSlice({
  name: "bookmark",
  initialState,

  reducers: {
    fetchBookmarksStart: (state, action) => {
      state.bookmark = {
        inputData: action.payload,
        data: {
          posts: [...state.bookmark.data.posts],
        },
        loading: true,
        error: false,
        skip: state.bookmark.skip,
        length: state.bookmark.length,
      };
    },
    fetchBookmarksSuccess: (state, action) => {
      state.bookmark = {
        data: {
          posts: [...state.bookmark.data.posts, ...action.payload.posts],
        },
        loading: false,
        error: false,
        inputData: {},
        skip: action.payload.posts.length + state.bookmark.skip,
        length: action.payload.posts.length,
      };
    },
    fetchBookmarksFailure: (state, action) => {
      state.bookmark = {
        data: {},
        loading: false,
        error: action.payload,
        inputData: {},
        skip: state.bookmark.skip,
        length: state.bookmark.length,
      };
    },
    saveBookmarkStart: (state, action) => {
      state.saveBookmark = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    saveBookmarkSuccess: (state, action) => {
      state.saveBookmark = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    saveBookmarkFailure: (state, action) => {
      state.saveBookmark = {
        data: {},
        loading: true,
        error: action.error,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
   
  },
});

export const {
   fetchBookmarksFailure,
   fetchBookmarksSuccess,
   fetchBookmarksStart,
   saveBookmarkStart,
   saveBookmarkFailure,
   saveBookmarkSuccess
  } = BookmarkSlice.actions;

  export default BookmarkSlice.reducer;



