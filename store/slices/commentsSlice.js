import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: {
      data: {},
      loading: true,
      error: false,
      inputData: {},
      loadingButtonContent: null,
    },
    saveComment: {
      data: {},
      loading: true,
      error: false,
      inputData: {},
      loadingButtonContent: null,
      buttonDisable: false,
    },
    delComment: {
      data: {},
      loading: true,
      error: false,
      inputData: {},
      loadingButtonContent: null,
      buttonDisable: false,
    },
    commentReplies: {
      data: {},
      loading: true,
      error: false,
      inputData: {},
      loadingButtonContent: null,
    },
    saveCommentReply: {
      data: {},
      loading: true,
      error: false,
      inputData: {},
      loadingButtonContent: null,
      buttonDisable: false,
    },
  };


  export const CommentsSlice = createSlice({
    name: "comments",
    initialState,
  
    reducers: {
      fetchCommentsStart: (state, action) => {
        state.comments = {
            data: {},
            loading: true,
            error: false,
            inputData: action.payload,
            loadingButtonContent: "Loading...",
        };
      },
      fetchCommentsSuccess: (state, action) => {
        state.comments = {
            data: action.payload,
            loading: false,
            error: false,
            inputData: state.comments.inputData,
            loadingButtonContent: null,
        };
      },
      fetchCommentsFailure: (state, action) => {
        state.comments = {
            data: {},
            loading: true,
            error: action.payload,
            inputData: {},
            loadingButtonContent: null,
        };
      },
      saveCommentStart: (state, action) => {
        state.saveComment = {
            data: {},
            loading: true,
            error: false,
            inputData: action.payload,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
          }
      },
      saveCommentSuccess: (state, action) => {
        state.saveComment = {
            data: action.payload,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          }
      },
      saveCommentFailure: (state, action) => {
        state.saveComment = {
            data: {},
          loading: true,
          error: action.payload,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
          }
      },
      deleteCommentStart: (state, action) => {
        state.delComment = {
            data: {},
            loading: true,
            error: false,
            inputData: action.payload,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
          }
      },
      deleteCommentSuccess: (state, action) => {
        state.delComment = {
            data: action.payload,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          }
      },
      deleteCommentFailure: (state, action) => {
        state.delComment = {
            data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
          }
      },
      fetchCommentRepliesStart: (state, action) =>  {
        state.commentReplies = {
            data: {},
              loading: true,
              error: false,
              inputData: action.payload,
              loadingButtonContent: "Loading...",
        };
      },
      fetchCommentRepliesSuccess: (state, action) =>  {
        state.commentReplies = {
            data: action.payload,
              loading: false,
              error: false,
              inputData: {},
              loadingButtonContent: null,
        };
      },
      fetchCommentRepliesFailure: (state, action) => {
        state.commentReplies = {
            data: {},
            loading: true,
            error: action.payload,
            inputData: {},
            loadingButtonContent: null,
        };
      },
      saveCommentRepliesStart: (state, action) => {
        state.saveCommentReply = {
            data: {},
            loading: true,
            error: false,
            inputData: action.payload,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
          }
      },
      saveCommentRepliesSuccess: (state, action) => {
        state.saveCommentReply = {
            data: action.payload,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          }
      },
      saveCommentRepliesFailure: (state, action) => {
        state.saveCommentReply = {
            data: {},
            loading: true,
            error: action.payload,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          }
      },
    },
  });
  
  export const {
    saveCommentStart,
    saveCommentSuccess,
    saveCommentFailure,
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    saveCommentRepliesStart,
    saveCommentRepliesSuccess,
    saveCommentRepliesFailure,
    fetchCommentRepliesStart,
    fetchCommentRepliesSuccess,
    fetchCommentRepliesFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailure
  } = CommentsSlice.actions;
  
  export default CommentsSlice.reducer;