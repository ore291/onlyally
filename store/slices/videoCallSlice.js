import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoCallRequests: {
    data: {},
    loading: true,
    error: false,
  },
  saveVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },

  acceptVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  rejectVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  joinVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },

  videoCallRequestPayPaystack: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  saveVideoCallAmount: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

export const VideoCallSlice = createSlice({
  name: "videoCall",
  initialState,

  reducers: {
    fetchVideoCallRequestsStart: (state, action) => {
      state.videoCallRequests = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchVideoCallRequestsSuccess: (state, action) => {
      state.videoCallRequests = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchVideoCallRequestsFailure: (state, action) => {
      state.videoCallRequests = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    saveVideoCallRequestStart: (state, action) => {
      state.saveVideoCallRequest = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    saveVideoCallRequestSuccess: (state, action) => {
      state.saveVideoCallRequest = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    saveVideoCallRequestFailure: (state, action) => {
      state.saveVideoCallRequest = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsAcceptStart: (state, action) => {
      state.acceptVideoCallRequest = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    videoCallRequestsAcceptSuccess: (state, action) => {
      state.acceptVideoCallRequest = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsAcceptFailure: (state, action) => {
      state.acceptVideoCallRequest = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsRejectStart: (state, action) => {
      state.rejectVideoCallRequest = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    videoCallRequestsRejectSuccess: (state, action) => {
      state.rejectVideoCallRequest = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsRejectFailure: (state, action) => {
      state.rejectVideoCallRequest = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsJoinStart: (state, action) => {
      state.joinVideoCallRequest = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    videoCallRequestsJoinSuccess: (state, action) => {
      state.joinVideoCallRequest = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsJoinFailure: (state, action) => {
      state.joinVideoCallRequest = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallRequestsPaymentPaystackStart: (state, action) => {
      state.videoCallRequestPayPaystack = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    videoCallRequestsPaymentPaystackSuccess: (state, action) => {
      state.videoCallRequestPayPaystack = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    videoCallRequestsPaymentPaystackFailure: (state, action) => {
      state.videoCallRequestPayPaystack = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    saveVideoCallAmountStart: (state, action)=> {
        state.saveVideoCallAmount = {
            inputData: action.payload,
            loading: true,
            error: false,
            success: {},
            buttonDisable: true,
            loadingButtonContent: "Processing.. Please wait...",
        }
    },
    saveVideoCallAmountSuccess: (state, action)=> {
        state.saveVideoCallAmount = {
            loading: false,
            error: false,
            success: action.payload,
            buttonDisable: false,
            loadingButtonContent: null,
        }
    },
    saveVideoCallAmountFaiure: (state, action)=> {
        state.saveVideoCallAmount = {
            loading: true,
            error: action.payload,
            success: {},
            buttonDisable: false,
            loadingButtonContent: null,
        }
    },
  },
});


export const {
    fetchVideoCallRequestsStart,
    fetchVideoCallRequestsSuccess,
    fetchVideoCallRequestsFailure,
    saveVideoCallAmountStart,
    saveVideoCallAmountSuccess,
    saveVideoCallAmountFaiure,
    saveVideoCallRequestStart,
    saveVideoCallRequestSuccess,
    saveVideoCallRequestFailure,
    videoCallRequestsAcceptStart,
    videoCallRequestsAcceptSuccess,
    videoCallRequestsAcceptFailure,
    videoCallRequestsJoinStart,
    videoCallRequestsJoinSuccess,
    videoCallRequestsJoinFailure,
    videoCallRequestsPaymentPaystackStart,
    videoCallRequestsPaymentPaystackSuccess,
    videoCallRequestsPaymentPaystackFailure,
    videoCallRequestsRejectStart,
    videoCallRequestsRejectSuccess,
    videoCallRequestsRejectFailure
} = VideoCallSlice.actions;

export default VideoCallSlice.reducer;
