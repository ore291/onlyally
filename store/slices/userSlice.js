import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loginData: {
    
  },
  profile: {
    data: {},
    loading: true,
    error: false,
  },
  profileInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  buttonDisable: false,
  loadingButtonContent: null,
  loginInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  registerInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  forgotPasswordInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  deleteAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  registerVerify: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    buttonLoadingContent: null,
    inputData: {},
  },
  registerVerifyResend: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    buttonLoadingContent: null,
    inputData: {},
  },
  notificationUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  verifyBadgeUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  payments: {
    data: {},
    loading: true,
    error: false,
  },
  blockUsers: {
    data: {},
    loading: true,
    error: false,
  },
  saveBlockUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  validationInputData: {
    data: {},
    loading: true,
    error: false,
    isValid: false,
    isInValid: false,
  },
  referralInputData: {
    data: {},
    loading: true,
    error: false,
  },
  dashboard: {
    data: {},
    loading: true,
    error: false,
  },
  profileSubscriptionInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  twoStepAuthUpdate: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  twoStepAuthLogin: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  twoStepAuthCodeResend: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    fetchUserDetailsStart: (state, action) => {
      state.profile = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchUserDetailsSuccess: (state, action) => {
      state.profile = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchUserLoginSuccess: (state, action) => {
      state.loginData = action.payload;
    },
    fetchUserDetailsFailure: (state, action) => {
      state.profile = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.user.loginData && !action.payload.user.profile) {
        return state;
      }
      state.loginData = action.payload.user.loginData;
      state.profile = action.payload.user.profile;
    },
  },
});

export const {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  fetchUserLoginSuccess
} = UserSlice.actions;



export default UserSlice.reducer;
