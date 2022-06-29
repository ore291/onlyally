 import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  inputData: {
    data: {},
    loading: true,
    error: false,
    success: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};
  

export const ChangePasswordSlice = createSlice({
    name: "changePassword",
    initialState,
  
    reducers: {
        changePasswordStart: (state, action) => {
            state.sessionlist = {
                data: action.payload,
                loading: true,
                error: false,
            },
                state.buttonDisable = true,
                state.loadingButtonContent = 'Loading please wait'
        },
        changePasswordSuccess: (state, action) => {
            state.sessionlist = {
                data: {},
                success: action.payload,
                loading: false,
                error: false,
            },
                state.buttonDisable = false,
                state.loadingButtonContent = null
              
        },
        changePasswordFailure: (state, action) => {
            state.sessionlist = {
                data: {},
                loading: true,
                error: action.payload,
            },
                state.buttonDisable = false,
                state.loadingButtonContent = null
              
        },
        editChangePassword: (state, action) => {
            state.sessionlist = {
                loading: false,
                error: false,
                data: {
                    ...state.inputData.data,
                    [action.payload.name]: action.payload.value,
                },
            }
                 
              
        },
        
    }

});

export const {
    changePasswordStart,
    changePasswordFailure,
    changePasswordSuccess,
    editChangePassword

  } = ChangePasswordSlice.actions;

  export default ChangePasswordSlice.reducer;