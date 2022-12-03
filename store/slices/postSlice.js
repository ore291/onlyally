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
  editPost: {
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
  ppvPayPaystack: {
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
    editPostStart: (state, action) => {
      state.editPost = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    editPostSuccess: (state, action) => {
      state.editPost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },

    editPostFailure: (state, action) => {
      state.editPost = {
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
    fetchExploreStart: (state, action) => {
      state.explorePosts = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchExploreSuccess: (state, action) => {
      state.explorePosts = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchExploreFailure: (state, action) => {
      state.explorePosts = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    ppvPaymentPaystackStart: (state, action) => {
      state.ppvPayPaystack = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    ppvPaymentPaystackSuccess: (state, action) => {
      state.ppvPayPaystack = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    ppvPaymentPaystackFailure: (state, action) => {
      state.ppvPayPaystack = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    ppvPaymentWalletStart: (state, action) => {
      state.ppvPayWallet = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    ppvPaymentWalletSuccess: (state, action) => {
      state.ppvPayWallet = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    ppvPaymentWalletFailure: (state, action) => {
      state.ppvPayWallet = {
        loading: false,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    fetchReportPostsStart: (state, action) => {
      state.reportPosts = {
        data: {},
        loading: true,
        error: false,
      };
    },

    fetchReportPostsSuccess: (state, action) => {
      state.reportPosts = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchReportPostsFailure: (state, action) => {
      state.reportPosts = {
        data: {},
        loading: false,
        error: action.error,
      };
    },
    fetchReportReasonStart: (state, action) => {
      state.reportReason = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },

    fetchReportReasonSuccess: (state, action) => {
      state.reportReason = {
        inputData: action.payload,
        data: action.data,
        loading: false,
        error: false,
      };
    },

    fetchReportReasonFailure: (state, action) => {
      state.reportReason = {
        inputData: action.payload,
        data: {},
        loading: false,
        error: action.error,
      };
    },
    saveReportPostStart: (state, action) => {
      state.saveReportPost = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },

    saveReportPostSuccess: (state, action) => {
      state.saveReportPost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },

    saveReportPostFailure: (state, action) => {
      state.saveReportPost = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    deletePostStart: (state, action) => {
      state.delPost = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },

    deletePostSuccess: (state, action) => {
      state.delPost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },

    deletePostFailure: (state, action) => {
      state.delPost = {
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
      if (!action.payload.post.explorePosts || !action.payload.post.posts) {
        return state;
      }
      state.explorePosts = action.payload.post.explorePosts;
      state.posts = action.payload.post.posts;
    },
  },
});

export const {
  editPostStart,
  editPostSuccess,
  editPostFailure,
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
  fetchExploreStart,
  fetchExploreSuccess,
  fetchExploreFailure,
  ppvPaymentWalletStart,
  ppvPaymentWalletSuccess,
  ppvPaymentWalletFailure,
  ppvPaymentPaystackStart,
  ppvPaymentPaystackSuccess,
  ppvPaymentPaystackFailure,
  fetchReportPostsStart,
  fetchReportPostsFailure,
  fetchReportPostsSuccess,
  fetchReportReasonStart,
  fetchReportReasonFailure,
  fetchReportReasonSuccess,
  saveReportPostStart,
  saveReportPostFailure,
  saveReportPostSuccess,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} = PostSlice.actions;

export default PostSlice.reducer;
