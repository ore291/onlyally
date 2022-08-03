import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  referralDetails: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

export const ReferalSlice = createSlice({
  name: "referal",
  initialState,

  reducers: {
    getReferralStart: (state, action) => {
      state.referralDetails = {
        data: {},
        loading: true,
        error: false,
      };
    },
    getReferralSuccess: (state, action) => {
      state.referralDetails = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    getReferralFailure: (state, action) => {
      state.referralDetails = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { getReferralSuccess, getReferralFailure, getReferralStart } =
  ReferalSlice.actions;

export default ReferalSlice.reducer;
