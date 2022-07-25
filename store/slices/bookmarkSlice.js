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
    fetchBookmarksPhotoStart: (state, action) => {
      state.bookmarkPhoto = {
        //inputData: action.payload,
        data: {
          posts: [state.bookmarkPhoto.data.posts],
        },
        loading: true,
        error: false,
        skip: state.bookmarkPhoto.skip,
        length: state.bookmarkPhoto.length,
      };
    },
    fetchBookmarksPhotoSuccess: (state, action) => {
      state.bookmarkPhoto = {
        data: {
          posts: [...state.bookmarkPhoto.data.posts, ...action.payload.posts],
        },
        loading: false,
        error: false,
        inputData: {},
        skip: action.payload.posts.length + state.bookmarkPhoto.skip,
        length: action.payload.posts.length,
      };
    },
    fetchBookmarksPhotoFailure: (state, action) => {
      state.bookmarkPhoto = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        skip: state.bookmarkPhoto.skip,
        length: state.bookmarkPhoto.length,
      };
    },
    fetchBookmarksVideoStart: (state, action) => {
      state.bookmarkVideo = {
        inputData: action.payload,
        data: {
          posts: [...state.bookmarkVideo.data.posts],
        },
        loading: true,
        error: false,
        skip: state.bookmarkVideo.skip,
        length: state.bookmarkVideo.length,
      };
    },
    fetchBookmarksVideoSuccess: (state, action) => {
      state.bookmarkVideo = {
        data: {
          posts: [...state.bookmarkVideo.data.posts, ...action.payload.posts],
        },
        loading: false,
        error: false,
        inputData: {},
        skip: action.payload.posts.length + state.bookmarkVideo.skip,
        length: action.payload.posts.length,
      };
    },
    fetchBookmarksVideoFailure: (state, action) => {
      state.bookmarkVideo = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        skip: state.bookmarkVideo.skip,
        length: state.bookmarkVideo.length,
      };
    },
    deleteBookmarkStart: (state, action) => {
      state.deleteBookmark = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading...",
        buttonDisable: true,
      };
    },
    deleteBookmarkSuccess: (state, action) => {
      state.deleteBookmark = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      }
    },
    deleteBookmarkFailure : (state, action) => {
      state.deleteBookmark = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      }
    },
    
    fetchBookmarksAudioStart : (state, action) => {
      state.bookmarkAudio = {
        inputData: action.payload,
        data: {
          posts: [...state.bookmarkAudio.data.posts],
        },
        loading: true,
        error: false,
        skip: state.bookmarkAudio.skip,
        length: state.bookmarkAudio.length,
      };
    },

    fetchBookmarksAudioSuccess: (state, action) => {
      state.bookmarkAudio = {
        data: {
          posts: [...state.bookmarkAudio.data.posts, ...action.payload.posts],
        },
        loading: false,
        error: false,
        inputData: {},
        skip: action.payload.posts.length + state.bookmarkAudio.skip,
        length: action.payload.posts.length,
      };
    },
    fetchBookmarksAudioFailure: (state, action) => {
      state.bookmarkAudio = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        skip: state.bookmarkAudio.skip,
        length: state.bookmarkAudio.length,
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
  saveBookmarkSuccess,
  fetchBookmarksAudioStart,
  fetchBookmarksAudioSuccess,
  fetchBookmarksAudioFailure,
  fetchBookmarksPhotoStart,
  fetchBookmarksPhotoSuccess,
  fetchBookmarksPhotoFailure,
  fetchBookmarksVideoStart,
  fetchBookmarksVideoSuccess,
  fetchBookmarksVideoFailure,
  deleteBookmarkStart,
  deleteBookmarkSuccess,
  deleteBookmarkFailure,
} = BookmarkSlice.actions;

export default BookmarkSlice.reducer;
