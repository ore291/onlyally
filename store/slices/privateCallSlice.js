import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  acceptCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  rejectCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payByPaystack: {
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
  joinVideoCall: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  endVideoCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  callRequestSent: {
    data: {},
    loading: true,
    error: false,
  },
  callHistoryUser: {
    data: {},
    loading: true,
    error: false,
  },
  callHistoryModel: {
    data: {},
    loading: true,
    error: false,
  },
  callRequestReceivedModel: {
    data: {},
    loading: true,
    error: false,
  },
  singleVideoCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  acceptAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  audioCallHistoryUser: {
    data: {},
    loading: true,
    error: false,
  },
  rejectAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  requestAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payAudioCallByStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payAudioCallByPaystack: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  singleAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  endAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  joinAudioCall: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  videoCallPayByWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  audioCallPayByWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const PrivateCallSlice = createSlice({
  name: "privateCall",
  initialState,

  reducers: {
    requestCallStart: (state, action) => {
      state.requestCall = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    requestCallSuccess: (state, action) => {
      state.requestCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    requestCallFailure: (state, action) => {
      state.requestCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    acceptCallStart: (state, action) => {
      state.acceptCall = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    acceptCallSuccess: (state, action) => {
      state.acceptCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    acceptCallFailure: (state, action) => {
      state.acceptCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    rejectCallStart: (state, action) => {
      state.rejectCall = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    rejectCallSuccess: (state, action) => {
      state.rejectCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    rejectCallFailure: (state, action) => {
      state.rejectCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    payByPaystackStart: (state, action) => {
      state.payByPaystack = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "File Uploading....",
        buttonDisable: true,
      };
    },
    payByPaystackSuccess: (state, action) => {
      state.payByPaystack = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    payByPaystackFailure: (state, action) => {
      state.payByPaystack = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    joinVideoCallStart: (state, action) => {
      state.joinVideoCall = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    joinVideoCallSuccess: (state, action) => {
      state.joinVideoCall = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    joinVideoCallFailure: (state, action) => {
      state.joinVideoCall = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    endVideoCallStart: (state, action) => {
      state.endVideoCall = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    endVideoCallSuccess: (state, action) => {
      state.endVideoCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    endVideoCallFailure: (state, action) => {
      state.endVideoCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    callRequestSentUserStart: (state, action) => {
      state.callRequestSent = {
        data: {},
        loading: true,
        error: false,
      };
    },
    callRequestSentUserSuccess: (state, action) => {
      state.callRequestSent = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    callRequestSentUserFailure: (state, action) => {
      state.callRequestSent = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    callHistoryUserStart: (state, action) => {
      state.callHistoryUser = {
        data: {},
        loading: true,
        error: false,
      };
    },
    callHistoryUserSuccess: (state, action) => {
      state.callHistoryUser = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    callHistoryUserFailure: (state, action) => {
      state.callHistoryUser = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    callHistoryModelStart: (state, action) => {
      state.callHistoryModel = {
        data: {},
        loading: true,
        error: false,
      };
    },
    callHistoryModelSuccess: (state, action) => {
      state.callHistoryModel = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    callHistoryModelFailure: (state, action) => {
      state.callHistoryModel = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    callRequestReceivedModelStart: (state, action) => {
      state.callRequestReceivedModel = {
        data: {},
        loading: true,
        error: false,
      };
    },
    callRequestReceivedModelSuccess: (state, action) => {
      state.callRequestReceivedModel = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    callRequestReceivedModelFailure: (state, action) => {
      state.callRequestReceivedModel = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    fetchSingleVideoCallStart: (state, action) => {
      state.singleVideoCall = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
      };
    },
    fetchSingleVideoCallSuccess: (state, action) => {
      state.singleVideoCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
      };
    },
    fetchSingleVideoCallFailure: (state, action) => {
      state.singleVideoCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
    acceptAudioCallStart: (state, action) => {
      state.acceptAudioCall = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    acceptAudioCallSuccess: (state, action) => {
      state.acceptAudioCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    acceptAudioCallFailure: (state, action) => {
      state.acceptAudioCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    audioCallHistoryUserStart: (state, action) => {
      state.audioCallHistoryUser = {
        data: {},
        loading: true,
        error: false,
      };
    },
    audioCallHistoryUserSuccess: (state, action) => {
      state.audioCallHistoryUser = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    audioCallHistoryUserFailure: (state, action) => {
      state.audioCallHistoryUser = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    rejectAudioCallStart: (state, action) => {
      state.rejectAudioCall = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    rejectAudioCallSuccess: (state, action) => {
      state.rejectAudioCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    rejectAudioCallFailure: (state, action) => {
      state.rejectAudioCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    requestAudioCallStart: (state, action) => {
      state.requestAudioCall = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    requestAudioCallSuccess: (state, action) => {
      state.requestAudioCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    requestAudioCallFailure: (state, action) => {
      state.requestAudioCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    payAudioCallByPaystackStart: (state, action) => {
      state.payAudioCallByPaystack = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "File Uploading....",
        buttonDisable: true,
      };
    },
    payAudioCallByPaystackSuccess: (state, action) => {
      state.payAudioCallByPaystack = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    payAudioCallByPaystackFailure: (state, action) => {
      state.payAudioCallByPaystack = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchSingleAudioCallStart: (state, action) => {
      state.singleAudioCall = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
      };
    },
    fetchSingleAudioCallSuccess: (state, action) => {
      state.singleAudioCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
      };
    },
    fetchSingleAudioCallFailure: (state, action) => {
      state.singleAudioCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
    endAudioCallStart: (state, action) => {
      state.endAudioCall = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    endAudioCallSuccess: (state, action) => {
      state.endAudioCall = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    endAudioCallFailure: (state, action) => {
      state.endAudioCall = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    jonAudioCallStart: (state, action) => {
      state.joinAudioCall = {
        inputData: action.payload,
        loading: true,
        error: false,
        success: {},
        buttonDisable: true,
        loadingButtonContent: "Processing.. Please wait...",
      };
    },
    jonAudioCallSuccess: (state, action) => {
      state.joinAudioCall = {
        loading: false,
        error: false,
        success: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    jonAudioCallFailure: (state, action) => {
      state.joinAudioCall = {
        loading: true,
        error: action.payload,
        success: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    videoCallPaymentByWalletStart: (state, action) => {
      state.videoCallPayByWallet = {
        inputData: action.payload,
              data: {},
              loading: true,
              error: false,
              loadingButtonContent: "Loading... Please wait",
              buttonDisable: true,
      }
    },
    videoCallPaymentByWalletSuccess: (state, action) => {
      state.videoCallPayByWallet = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      }
    },
    videoCallPaymentByWalletFailure: (state, action) => {
      state.videoCallPayByWallet = {
        data: {},
              loading: true,
              error: action.payload,
              inputData: {},
              loadingButtonContent: null,
              buttonDisable: false,
      }
    },
    audioCallPaymentByWalletStart: (state, action) => {
      state.audioCallPayByWallet = {
        inputData: action.payload,
              data: {},
              loading: true,
              error: false,
              loadingButtonContent: "Loading... Please wait",
              buttonDisable: true,
      }
    },
    audioCallPaymentByWalletSuccess: (state, action) => {
      state.audioCallPayByWallet = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      }
    },
    audioCallPaymentByWalletFailure: (state, action) => {
      state.audioCallPayByWallet = {
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
  requestCallStart,
  requestCallSuccess,
  requestCallFailure,
  acceptCallStart,
  acceptCallSuccess,
  acceptCallFailure,
  rejectCallStart,
  rejectCallSuccess,
  rejectCallFailure,
  endVideoCallStart,
  endVideoCallSuccess,
  endVideoCallFailure,
  callRequestSentUserStart,
  callRequestSentUserSuccess,
  callRequestSentUserFailure,
  callHistoryUserStart,
  callHistoryUserSuccess,
  callHistoryUserFailure,
  callHistoryModelStart,
  callHistoryModelSuccess,
  callHistoryModelFailure,
  callRequestReceivedModelStart,
  callRequestReceivedModelFailure,
  callRequestReceivedModelSuccess,
  fetchSingleVideoCallFailure,
  fetchSingleVideoCallSuccess,
  fetchSingleVideoCallStart,
  acceptAudioCallStart,
  acceptAudioCallFailure,
  acceptAudioCallSuccess,
  audioCallHistoryUserStart,
  audioCallHistoryUserSuccess,
  audioCallHistoryUserFailure,
  rejectAudioCallStart,
  rejectAudioCallFailure,
  rejectAudioCallSuccess,
  requestAudioCallStart,
  requestAudioCallSuccess,
  requestAudioCallFailure,
  payAudioCallByPaystackStart,
  payAudioCallByPaystackSuccess,
  payAudioCallByPaystackFailure,
  fetchSingleAudioCallStart,
  fetchSingleAudioCallSuccess,
  fetchSingleAudioCallFailure,
  endAudioCallStart,
  endAudioCallSuccess,
  endAudioCallFailure,
  jonAudioCallStart,
  joinAudioCallSuccess,
  joinAudioCallFailure,
  joinVideoCallStart,
  joinVideoCallFailure,
  joinVideoCallSuccess,
  videoCallPaymentByWalletStart,
  videoCallPaymentByWalletSuccess,
  videoCallPaymentByWalletFailure,
  audioCallPaymentByWalletStart,
  audioCallPaymentByWalletFailure,
  audioCallPaymentByWalletSuccess,
} = PrivateCallSlice.actions;

export default PrivateCallSlice.reducer;
