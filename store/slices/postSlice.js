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
    fetchSinglePostStart: (state, action) => {
    state.singlePost.inputData = action.payload;
    state.singlePost.loading = true;
    state.singlePost.data = {};
    state.singlePost.error = false;
    state.singlePost.loadingButtonContent = "Loading.... Please wait";
    state.singlePost.buttonDisable = true
    //   state.singlePost = {
    //     inputData: action.payload,
    //     data: {},
    //     loading: true,
    //     error: false,
    //     loadingButtonContent: "Loading... Please wait",
    //     buttonDisable: true,
    //   };
    },
    fetchSinglePostSuccess: (state, action) => {
        state.singlePost = {
            data: action.payload,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          }
    },
    fetchSinglePostFailure: (state, action) => {
        state.singlePost = {
            data: {},
            loading: true,
            error: action.payload,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          }
    },
    // editUserDetails: ()=>{

    // }
  },

    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //       console.log("hydrate: ", action.payload)
    //     // handle client
    //     if (!action.payload.post) {
    //       return state;
    //     }
    //     state.singlePost = action.payload.post.ho;
    //     // state.homePost.posts = action.payload.home.homePost.posts;
    //     // state.homePost.skip = action.payload.home.homePost.skip;
    //     // state.homePost.length = action.payload.home.homePost.length;
    //     // state.homePost.error = action.payload.home.homePost.error;
    //   },
    // },
});

export const {
  fetchSinglePostStart,
  fetchSinglePostSuccess,
  fetchSinglePostFailure,
} = PostSlice.actions;

export default PostSlice.reducer;
