import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  saveLiveVideo: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  joinliveVideo: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  singleLiveVideo: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveVideos: {
    data: {
      videos: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  liveVideosHistory: {
    data: {
      videos: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  liveWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },

  livePaystack: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveViewerUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveEnd: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const LiveVideoSlice = createSlice({
  name: "liveVideo",
  initialState,
  reducers: {
    videoCallBroadcastStart: (state, action) => {
      state.saveLiveVideo = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    videoCallBroadcastSuccess: (state, action) => {
      state.saveLiveVideo = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    videoCallBroadcastFailure: (state, action) => {
      state.saveLiveVideo = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchLiveVideosStart: (state, action) => {
      state.liveVideos = {
        data: {
          videos: [...state.liveVideos.data.videos],
        },
        loading: true,
        error: false,
        skip: state.liveVideos.skip,
        length: state.liveVideos.length,
      };
    },
    fetchLiveVideosSuccess: (state, action) => {
      state.liveVideos = {
        data: action.payload,
        data: {
          videos: [
            ...state.liveVideos.data.videos,
            ...action.payload.live_videos,
          ],
        },
        loading: false,
        error: false,
        skip: action.payload.live_videos.length + state.liveVideos.skip,
        length: action.payload.live_videos.length,
      };
    },
    fetchLiveVideosFailure: (state, action) => {
      state.liveVideos = {
        data: {},
        loading: false,
        error: action.payload,
        skip: state.liveVideos.skip,
        length: state.liveVideos.length,
      };
    },
    fetchLiveVideosHistoryStart: (state, action) => {
      state.liveVideosHistory = {
        data: {
          videos: [...state.liveVideosHistory.data.videos],
        },
        loading: true,
        error: false,
        skip: state.liveVideosHistory.skip,
        length: state.liveVideosHistory.length,
      };
    },
    fetchLiveVideosHistorySuccess: (state, action) => {
      state.liveVideosHistory = {
        data: action.payload,
        data: {
          videos: [
            ...state.liveVideosHistory.data.videos,
            ...action.payload.live_videos,
          ],
        },
        loading: false,
        error: false,
        skip: action.payload.live_videos.length + state.liveVideosHistory.skip,
        length: action.payload.live_videos.length,
      };
    },
    fetchLiveVideosHistoryStart: (state, action) => {
      state.liveVideosHistory = {
        data: {},
        loading: false,
        error: action.payload,
        skip: state.liveVideosHistory.skip,
        length: state.liveVideosHistory.length,
      };
    },
    fetchSingleLiveVideosStart: (state, action) => {
      state.singleLiveVideo = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    fetchSingleLiveVideosSuccess: (state, action) => {
      state.singleLiveVideo = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    fetchSingleLiveVideosFailure: (state, action) => {
      state.singleLiveVideo = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    joinLiveVideosStart: (state, action) => {
      state.joinliveVideo = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
        buttonDisable: true,
        loadingButtonContent: "Loading... Please wait",
      };
    },
    joinLiveVideosSuccess: (state, action) => {
      state.joinliveVideo = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    joinLiveVideosFailure: (state, action) => {
      state.joinliveVideo = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    liveVideosPaymentByPaystackStart: (state, action) => {
      state.livePaystack = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    liveVideosPaymentByPaystackSuccess: (state, action) => {
      state.livePaystack = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosPaymentByPaystackFailure: (state, action) => {
      state.livePaystack = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosViewerUpdateStart: (state, action) => {
      state.liveViewerUpdate = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    liveVideosViewerUpdateSuccess: (state, action) => {
      state.liveViewerUpdate = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosViewerUpdateFailure: (state, action) => {
      state.liveViewerUpdate = {
        data: {},
        loading: true,
        error: action.error,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosEndStart: (state, action) => {
      state.liveEnd = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },

    liveVideosEndSuccess: (state, action) => {
      state.liveEnd = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosEndFailure: (state, action) => {
      state.liveEnd = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosPaymentByWalletStart: (state, action) => {
      state.liveWallet = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    liveVideosPaymentByWalletSuccess: (state, action) => {
      state.liveWallet = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    liveVideosPaymentByWalletFailure: (state, action) => {
      state.liveWallet = {
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
  videoCallBroadcastStart,
  videoCallBroadcastSuccess,
  videoCallBroadcastFailure,
  fetchLiveVideosStart,
  fetchLiveVideosFailure,
  fetchLiveVideosSuccess,
  fetchLiveVideosHistoryStart,
  fetchLiveVideosHistorySuccess,
  fetchLiveVideosHistoryFailure,
  joinLiveVideosStart,
  joinLiveVideosSuccess,
  joinLiveVideosFailure,
  fetchSingleLiveVideosStart,
  fetchSingleLiveVideosSuccess,
  fetchSingleLiveVideosFailure,
  liveVideosPaymentByPaystackStart,
  liveVideosPaymentByPaystackSuccess,
  liveVideosPaymentByPaystackFailure,
  liveVideosViewerUpdateStart,
  liveVideosViewerUpdateSuccess,
  liveVideosViewerUpdateFailure,
  liveVideosEndStart,
  liveVideosEndSuccess,
  liveVideosEndFailure,
  liveVideosPaymentByWalletStart,
  liveVideosPaymentByWalletSuccess,
  liveVideosPaymentByWalletFailure,
} = LiveVideoSlice.actions;

export default LiveVideoSlice.reducer;
