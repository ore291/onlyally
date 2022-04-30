import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  savePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  posts: {
    data: {},
    inputData: {},
    loading: true,
    error: false,
  },
  singlePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  changePostStatus: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  fileUpload: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  ppvPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  ppvPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  reportPosts: {
    data: {},
    loading: true,
    error: false,
  },
  saveReportPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  ppvPayCCBill: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  ppvPayCoinPayment: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  explorePosts: {
    inputData: {},
    data: {},
    loading: true,
    error: false,
  },
  fileRemove: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postCategories: {
    data: {},
    inputData: {},
    loading: true,
    error: false,
  },
  reportReason: {
    data: {},
    inputData: {},
    loading: true,
    error: false,
  },
};

export const PostSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    savePostStart: (state, action) => {
      state.savePost = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    savePostSuccess: (state, action) => {
      state.savePost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },

    savePostFailure: (state, action) => {
      state.savePost = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
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
    postFileUploadStart: (state, action) => {
      state.fileUpload = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "File Uploading....",
        buttonDisable: true,
      };
    },
    postFileUploadSuccess: (state, action) => {
      state.fileUpload = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    postFileUploadFailure: (state, action) => {
      state.fileUpload = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchSinglePostStart: (state, action) => {
      state.singlePost.inputData = action.payload;
      state.singlePost.loading = true;
      state.singlePost.data = {};
      state.singlePost.error = false;
      state.singlePost.loadingButtonContent = "Loading.... Please wait";
      state.singlePost.buttonDisable = true;
    },
    fetchSinglePostSuccess: (state, action) => {
      state.singlePost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchSinglePostFailure: (state, action) => {
      state.singlePost = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchPostCategoriesStart: (state, action) => {
      state.postCategories = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchPostCategoriesSuccess: (state, action) => {
      state.postCategories = {
        inputData: action.payload,
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchPostCategoriesFailure: (state, action) => {
      state.postCategories = {
        inputData: action.payload,
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    postFileRemoveStart: (state, action) => {
      state.fileRemove = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "File Deleting....",
        buttonDisable: true,
      };
    },
    postFileRemoveSuccess: (state, action) => {
      state.fileRemove = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    postFileRemoveFailure: (state, action) => {
      state.fileRemove = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
  },
});

export const {
  fetchSinglePostStart,
  fetchSinglePostSuccess,
  fetchSinglePostFailure,
  savePostStart,
  savePostSuccess,
  savePostFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  postFileUploadStart,
  postFileUploadSuccess,
  postFileUploadFailure,
  fetchPostCategoriesFailure,
  fetchPostCategoriesSuccess,
  fetchPostCategoriesStart,
  postFileRemoveStart,
  postFileRemoveFailure,
  postFileRemoveSuccess,
} = PostSlice.actions;

export default PostSlice.reducer;
