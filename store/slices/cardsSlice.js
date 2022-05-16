import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardDetails: {
    data: {},
    loading: true,
    error: false,
  },
  deleteCard: {
    data: {},
    loading: true,
    error: false,
  },
  selectDefaultCard: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

export const CardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchCardDetailsStart: (state, action) => {
      state.cardDetails = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchCardDetailsSuccess: (state, action) => {
      state.cardDetails = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchCardDetailsFailure: (state, action) => {
      state.cardDetails = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    deleteCardStart: (state, action) => {
      state.deleteCard = {
        data: action.payload,
        loading: true,
        error: false,
      };
    },
    deleteCardSuccess: (state, action) => {
      state.deleteCard = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    deleteCardFailure: (state, action) => {
      state.deleteCard = {
        data: {},
        loading: true,
        error: action.payload,
      };
    },
    selectDefaultCardStart: (state, action) => {
      state.selectDefaultCard = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      };
    },
    selectDefaultCardSuccess: (state, action) => {
      state.selectDefaultCard = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
      };
    },
    selectDefaultCardFailure: (state, action) => {
      state.selectDefaultCard = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
      };
    },
  },
});

export const {
  fetchCardDetailsStart,
  fetchCardDetailsSuccess,
  fetchCardDetailsFailure,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFailure,
  selectDefaultCardStart,
  selectDefaultCardSuccess,
  selectDefaultCardFailure
} = CardSlice.actions;

export default CardSlice.reducer;
