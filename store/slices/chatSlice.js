import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  sendMessage: {
    data: {},
    loading: false,
    error: false,
    inputData: {},
  },
  saveChatUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  messages: {
    data: {
      messages: [],
      user: {},
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
    skip: 0,
    length: 0,
    fetchMoreFlag: null,
    loadMoreLoading: null,
  },
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchChatUsersStart: (state, action) => {
      state.chatUsers = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchChatUsersSuccess: (state, action) => {
      state.chatUsers = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
      };
    },
    fetchChatUsersFailure: (state, action) => {
      state.chatUsers = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
    sendMessageStart: (state, action) => {
      state.messages = {
        ...state.messages,
        data: {
          messages: [...action.payload, ...state.messages.data.messages, ],
          user: {},
        },
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    sendMessageSuccess: (state, action) => {
      state.sendMessage = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
      };
    },
    sendMessageFailure: (state, action) => {
      state.sendMessage = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
    fetchChatMessageStart: (state, action) => {
      state.messages = {
        ...state.messages,
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
        skip: 0,
        length: 0,
        fetchMoreFlag: null,
      };
    },
    fetchChatMessageSuccess: (state, action) => {

      state.messages = {
        ...state.messages,
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
        skip: action.payload.messages.length + state.messages.skip,
        length: action.payload.messages.length,
        fetchMoreFlag:
          action.payload.messages.length == action.payload.total ? false : true,
      };
    },
    fetchChatMessageFailure: (state, action) => {
      state.messages = {
        ...state.messages,
        data: {},
        loading: false,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
        fetchMoreFlag: action.payload.total > 0 ? true : false,
      };
    },
    addMessageContentStart: (state, action) => {
      state.messages = {
        ...state.messages,
        loading: false,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
        skip: state.messages.skip,
        length: state.messages.length,
        loadMoreLoading: true,
      };
    },
    addMessageContent: (state, action) => {
      state.messages = {
        ...state.messages,
        data: {
          messages: [...action.payload, ...state.messages.data.messages, ],
          user: {},
        },
        loading: false,
        error: false,
        inputData: action.payload[0],
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    addMessageContentSuccess: (state, action) => {
      state.messages = {
        ...state.messages,
        // data: {
        //   messages: [
        //     ...action.payload.messages,
        //     ...state.messages.data.messages,
        //   ],
        //   user: { ...state.messages.data.user },
        // },
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
        skip: action.payload.messages.length + state.messages.skip,
        length: action.payload.messages.length + state.messages.length,
        fetchMoreFlag:
          state.messages.length == action.payload.total ? false : true,
        loadMoreLoading: false,
      };
    },
    saveChatUsersStart: (state, action) => {
      state.saveChatUser = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    saveChatUsersSuccess: (state, action) => {
      state.saveChatUser = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    saveChatUsersFailure: (state, action) => {
      state.saveChatUser = {
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
  sendMessageStart,
  fetchChatUsersStart,
  fetchChatUsersSuccess,
  fetchChatUsersFailure,
  fetchChatMessageStart,
  fetchChatMessageSuccess,
  fetchChatMessageFailure,
  addMessageContent,
  addMessageContentStart,
  addMessageContentSuccess,
  saveChatUsersStart,
  saveChatUsersFailure,
  saveChatUsersSuccess
} = ChatSlice.actions;


export default ChatSlice.reducer;
