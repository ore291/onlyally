import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const navSlice = createSlice({
  name: "navbar",
  initialState: {
    open: false,
    mainMobileNav: false,
    uploadModal: false
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

export const { setNavState ,setMainMobileNavState , setUploadModal} = navSlice.actions



export default navSlice.reducer;
