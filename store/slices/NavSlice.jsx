import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const navSlice = createSlice({
  name: "navbar",
  initialState: {
    open: false,
    mainMobileNav: false,
    uploadModal: false,
    createPostModal: false,
    paymentSubscriptionModal : false,
    unfollowUserModal : false,
    ppvPaymentModal : false,
  },

  reducers: {
    setNavState: (state, action) => {
      state.open = action.payload;
    },
    setMainMobileNavState: (state, action) => {
      state.mainMobileNav = action.payload;
    },
    setUploadModal: (state, action) => {
      state.uploadModal = action.payload;
    },
    setCreatePostModal: (state, action) => {
      state.createPostModal = action.payload;
    },
    setPaymentModal: (state, action)=>{
      state.paymentSubscriptionModal = action.payload;
    },
    setUnfollowerModal: (state, action)=>{
      state.unfollowUserModal = action.payload;
    },
    setPPVPaymentModal: (state, action) => { 
      state.ppvPaymentModal = action.payload;
    }
  },

  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     // handle client
  //     if (!action.payload.navbar.uploadModal) {
  //       return state
  //     }
  //     state.uploadModal = action.payload.navbar.uploadModal;
  //   },
  // },
});

export const { setNavState ,setMainMobileNavState ,setPPVPaymentModal, setUploadModal, setCreatePostModal, setPaymentModal, setUnfollowerModal} = navSlice.actions



export default navSlice.reducer;
