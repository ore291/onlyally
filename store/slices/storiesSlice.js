import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: {
    data: {},
    loading: true,
    error: false,
  },
  storyUpload: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: "",
    buttonDisable: false,
  },
  userStories: {
    data: {
      stories: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  storyDelete: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: "",
    buttonDisable: false,
  },
};

export const StoriesSlice = createSlice({
  name: "stories",
  initialState,

  reducers: {
    fetchStoriesStart: (state, action) => {
      state.stories = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchStoriesSuccess: (state, action) => {
      state.stories = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchStoriesFailure: (state, action) => {
      state.stories = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    storyFileUploadStart: (state, action) => {
      state.storyUpload = {
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Uploading....",
        buttonDisable: true,
      };
    },
    storyFileUploadSuccess: (state, action) => {
      state.storyUpload = {
        data: action.payload,
        loading: false,
        error: false,
        loadingButtonContent: "",
        buttonDisable: false,
      };
    },
    storyFileUploadFailure: (state, action) => {
      state.storyUpload = {
        data: {},
        loading: true,
        error: action.payload,
        loadingButtonContent: "",
        buttonDisable: false,
      };
    },
    storyFileDeleteStart: (state, action) => {
      state.storyDelete = {
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Uploading....",
        buttonDisable: true,
      };
    },
    storyFileDeleteSuccess: (state, action) => {
      state.storyDelete = {
        data: action.payload,
        loading: false,
        error: false,
        loadingButtonContent: "",
        buttonDisable: false,
      };
    },
    storyFileDeleteFailure: (state, action) => {
      state.storyDelete = {
        data: {},
        loading: true,
        error: action.payload,
        loadingButtonContent: "",
        buttonDisable: false,
      };
    },
    fetchUserStoriesStart: (state, action) => {
      state.userStories = {
        data: {
          stories: [...state.userStories.data.stories],
        },
        loading: true,
        error: false,
        skip: state.userStories.skip,
        length: state.userStories.length,
      };
    },
    fetchUserStoriesSuccess: (state, action) => {
      state.userStories = {
        data: {
          stories: [...state.userStories.data.stories, ...action.payload.stories],
        },
        loading: false,
        error: false,
        skip: action.payload.stories.length + state.userStories.skip,
        length: action.payload.stories.length,
      };
    },
    fetchUserStoriesFailure: (state, action) => {
      state.userStories = {
        data: {},
        loading: true,
        error: action.payload,
        skip: state.userStories.skip,
        length: state.userStories.length,
      };
    },
  },
});

export const {
  fetchStoriesFailure,
  fetchStoriesSuccess,
  fetchStoriesStart,
  fetchUserStoriesStart,
  fetchUserStoriesSuccess,
  fetchUserStoriesFailure,
  storyFileDeleteFailure,
  storyFileDeleteStart,
  storyFileDeleteSuccess,
  storyFileUploadStart,
  storyFileUploadSuccess,
  storyFileUploadFailure
} = StoriesSlice.actions;

export default StoriesSlice.reducer;
