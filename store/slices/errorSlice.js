import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    error: null,
    isOpen: false,
  };


  export const ErrorSlice = createSlice({
    name: "errorDetails",
    initialState,

    reducers: {
      errorLogoutCheck: (state, action) => {
        state.error = action.payload
        state.isOpen = true;
    }
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        // handle client
        if (!action.payload.errorDetails.error) {
          return state;
        }
        state.error = action.payload.errorDetails.error;
        state.isOpen = action.payload.errorDetails.isOpen
      },
    },

  });  

  export const {errorLogoutCheck} = ErrorSlice.actions;

  export default ErrorSlice.reducer;