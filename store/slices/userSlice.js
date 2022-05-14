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
    editUserDetails: (state, action) => {
      state.profile = {
        loading: false,
        error: false,
        data: {
          ...state.profile.data,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    updateUserDetailsStart: (state, action) => {
      state.profileInputData = {
        data: {
          first_name: state.profile.data.first_name,
          last_name: state.profile.data.last_name,
          email: state.profile.data.email,
          name: state.profile.data.name,
          username: state.profile.data.username,
          video_call_amount: state.profile.data.video_call_amount,
          audio_call_amount: state.profile.data.audio_call_amount,
          about: state.profile.data.about,
          is_online_status: state.profile.data.is_online_status,
          default_payment_method: state.profile.data.default_payment_method,
          gender: state.profile.data.gender,
          eyes_color: state.profile.data.eyes_color,
          height:
            state.profile.data.height == null ? 0 : state.profile.data.height,
          weight:
            state.profile.data.weight == null ? 0 : state.profile.data.weight,
          address: state.profile.data.address,
          website: state.profile.data.website,
          u_category_id: state.profile.data.u_category_id,
          amazon_wishlist: state.profile.data.amazon_wishlist,
          instagram_link: state.profile.data.instagram_link,
          facebook_link: state.profile.data.facebook_link,
          twitter_link: state.profile.data.twitter_link,
          snapchat_link: state.profile.data.snapchat_link,
          linkedin_link: state.profile.data.linkedin_link,
          pinterest_link: state.profile.data.pinterest_link,
          youtube_link: state.profile.data.youtube_link,
          twitch_link: state.profile.data.twitch_link,
          latitude: state.profile.data.latitude,
          longitude: state.profile.data.longitude,
          monthly_amount:
            state.profile.data.monthly_amount != undefined
              ? state.profile.data.monthly_amount
              : 0,
          yearly_amount:
            state.profile.data.yearly_amount != undefined
              ? state.profile.data.yearly_amount
              : 0,
          mobile:
            state.profile.data.mobile != null ? state.profile.data.mobile : "",
          picture: action.payload
            ? action.payload.picture != undefined
              ? action.payload.picture
              : ""
            : "",
          cover: action.payload
            ? action.payload.cover != undefined
              ? action.payload.cover
              : ""
            : "",
        },
        buttonDisable: true,
        loadingButtonContent: "Loading...please wait",
      };
    },
    updateUserSubscriptionDetailsStart: (state, action) => {
      state.profileSubscriptionInputData = {
        data: {
          monthly_amount:
            state.profile.data.monthly_amount != undefined
              ? state.profile.data.monthly_amount
              : 0,
          yearly_amount:
            state.profile.data.yearly_amount != undefined
              ? state.profile.data.yearly_amount
              : 0,
        },
        buttonDisable: true,
        loadingButtonContent: "Loading...please wait",
      };
    },
    updateUserDetailsSuccess: (state, action) => {
      state.profile = {
        data: action.payload.data,
        buttonDisable: false,
        loadingButtonContent: null,
        loading: false,
      };
    },
    updateUserDetailsFailure: (state, action) => {
      state.profile = {
        data: state.profile.data,
        loading: false,
        error: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    getRegisterDetails: (state, action) => {
      state.registerInputData = {
        loading: false,
        error: false,
        data: {
          ...state.registerInputData.data,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    registerStart: (state, action) => {
      state.registerInputData = {
        data: {
          ...action.payload,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        loading: true,
        error: false,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    },
    registerSuccess: (state, action) => {
      state.profile = {
        data: action.payload.data,
      };
      state.registerInputData = {
        data: {},
        loading: false,
        error: false,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    registerFailure: (state, action) => {
      state.registerInputData = {
        data: {},
        loading: false,
        error: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    getForgotPasswordDetails: (state, action) => {
      state.forgotPasswordInputData = {
        loading: false,
        error: false,
        data: {
          ...state.forgotPasswordInputData.data,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    forgotPasswordStart: (state, action) => {
      state.forgotPasswordInputData = {
        data: action.payload,
        loading: false,
        error: false,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPasswordInputData = {
        data: {},
        loading: true,
        error: false,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    forgotPasswordFailure: (state, action) => {
      state.forgotPasswordInputData = {
        data: {},
        loading: true,
        error: action.payload,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    deleteAccountStart: (state, action) => {
      state.deleteAccount = {
        data: {},
        loading: true,
        error: {},
        inputData: action.payload,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    },
    deleteAccountSuccess: (state, action) => {
      state.deleteAccount = {
        data: action.payload,
        loading: true,
        error: {},
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    deleteAccountFailure: (state, action) => {
      state.deleteAccount = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    regiserVerifyStart: (state, action) => {
      state.registerVerify = {
        inputData: action.payload,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
        data: {},
        loading: true,
      };
    },
    regiserVerifySuccess: (state, action) => {
      state.registerVerify = {
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
        data: action.payload,
        loading: false,
      };
    },
    regiserVerifyFailure: (state, action) => {
      state.registerVerify = {
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
        data: {},
        error: action.payload,
        loading: true,
      };
    },
    registerVerifyResendStart: (state, action) => {
      state.registerVerifyResend = {
        inputData: action.payload,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
        data: {},
        loading: true,
      };
    },
    registerVerifyResendSuccess: (state, action) => {
      state.registerVerifyResend = {
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
        data: action.payload,
        loading: false,
      };
    },
    registerVerifyResendFailure: (state, action) => {
      state.registerVerifyResend = {
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
        data: {},
        error: action.payload,
        loading: true,
      };
    },
    notificationStatusUpdateStart: (state, action) => {
      state.notificationUpdate = {
        inputData: action.payload,
        data: {},
        loading: true,
      };
    },
    notificationStatusUpdateSuccess: (state, action) => {
      state.notificationUpdate = {
        inputData: {},
        data: action.payload,
        loading: false,
        error: false,
      };
      state.profile = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    },
    notificationStatusUpdateFailure: (state, action) => {
      state.notificationUpdate = {
        inputData: {},
        data: {},
        error: action.payload,
        loading: true,
      };
    },
    fetchPaymentsStart: (state, action) => {
      state.payments = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchPaymentsSuccess: (state, action) => {
      state.payments = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    },
    fetchPaymentsFailure: (state, action) => {
      state.payments = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    fetchBlockUsersStart: (state, action) => {
      state.blockUsers = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchBlockUsersSuccess: (state, action) => {
      state.blockUsers = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchBlockUsersFailure: (state, action) => {
      state.blockUsers = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    saveBlockUserStart: (state, action) => {
      state.saveBlockUser = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    saveBlockUserSuccess: (state, action) => {
      state.saveBlockUser = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    saveBlockUserFailure: (state, action) => {
      state.saveBlockUser = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    userVerifyBadgeStatusStart: (state, action) => {
      state.verifyBadgeUpdate = {
        inputData: action.payload,
        data: {},
        loading: true,
      };
    },
    userVerifyBadgeStatusSuccess: (state, action) => {
      state.verifyBadgeUpdate = {
        inputData: {},
        data: action.payload,
        loading: false,
        error: false,
      };
      state.profile = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    },
    userVerifyBadgeStatusFailure: (state, action) => {
      state.verifyBadgeUpdate = {
        inputData: {},
        data: {},
        error: action.payload,
        loading: true,
      };
    },
    resetPasswordStart: (state, action) => {
      state.resetPasswordInputData = {
        inputData: action.payload,
      };
      state.buttonDisable = true;
      state.loadingButtonContent = "Loading please wait";
    },
    resetPasswordSuccess: (state, action) => {
      state.profile = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
      state.inputData = {
        data: {},
        loading: true,
        error: false,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
    resetPasswordFailure: (state, action) => {
      state.buttonDisable = false;
      state.loadingButtonContent = null;
    },
    userNameValidationStart: (state, action) => {
      state.validationInputData = {
        data: {
          ...action.payload,
        },
        loading: true,
        error: false,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    },
    userNameValidationSuccess: (state, action) => {
      state.validationInputData = {
        data: {},
        loading: false,
        error: false,
        isValid: true,
        isInValid: false,
      };
    },
    userNameValidationFailure: (state, action) => {
      state.validationInputData = {
        data: {},
        loading: false,
        error: action.payload,
        isInValid: true,
        isValid: false,
      };
    },
    referralValidationStart: (state, action) => {
      state.referralInputData = {
        data: {
          ...action.payload,
        },
        loading: true,
        error: false,
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    },
    referralValidationSuccess: (state, action) => {
      state.referralInputData = {
        data: {},
        loading: false,
        error: false,
      };
    },
    referralValidationFailure: (state, action) => {
      state.referralInputData = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    getLoginDetails: (state, action) => {
      state.loginInputData = {
        loading: false,
        error: false,
        data: {
          ...state.loginInputData.data,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    loginStart: (state, action) => {
      state.loginInputData = {
        data: {
          ...action.payload,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    },
    loginSuccess: (state, action) => {
      state.loginInputData = {
        data: {},
        loading: true,
        error: false,
        buttonDisable: false,
        loadingButtonContent: null,
      };
      state.profile = {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    },
    loginFailure: (state, action) => {
      state.loginInputData = {
        data: {},
        loading: true,
        error: false,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.user.loginData) {
        return state;
      }
      state.loginData = action.payload.user.loginData;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  getLoginDetails,
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  fetchUserLoginSuccess,
  editUserDetails,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
  updateUserDetailsFailure,
  updateUserSubscriptionDetailsStart,
  registerStart,
  registerSuccess,
  registerFailure,
  getRegisterDetails,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
  regiserVerifyStart,
  regiserVerifySuccess,
  regiserVerifyFailure,
  registerVerifyResendStart,
  registerVerifyResendSuccess,
  registerVerifyResendFailure,
  notificationStatusUpdateStart,
  notificationStatusUpdateSuccess,
  notificationStatusUpdateFailure,
  getForgotPasswordDetails,
  fetchPaymentsStart,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  fetchBlockUsersStart,
  fetchBlockUsersFailure,
  fetchBlockUsersSuccess,
  saveBlockUserStart,
  saveBlockUserSuccess,
  saveBlockUserFailure,
  userVerifyBadgeStatusStart,
  userVerifyBadgeStatusSuccess,
  userVerifyBadgeStatusFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  userNameValidationStart,
  userNameValidationSuccess,
  userNameValidationFailure,
  referralValidationStart,
  referralValidationSuccess,
  referralValidationFailure,
} = UserSlice.actions;

export default UserSlice.reducer;
