import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  fav: {
    data: {
      favs: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  saveFav: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteFav: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

export const FavSlice = createSlice({
  name: "fav",
  initialState,

  reducers: {
    fetchFavStart: (state, action) => {
      state.fav = {
        inputData: action.payload,
        data: {
          favs: [...state.fav.data.favs],
        },
        loading: true,
        error: false,
        skip: state.fav.skip,
        length: state.fav.length,
      };
    },
    fetchFavSuccess: (state, action) => {
      state.fav = {
        data: {
          favs: [...state.fav.data.favs, ...action.payload.fav_users],
        },
        loading: false,
        error: false,
        inputData: {},
        skip: action.payload.fav_users.length + state.fav.skip,
        length: action.payload.fav_users.length,
      };
    },
    fetchFavFailure: (state, action) => {
      state.fav = {
        data: {},
        loading: true,
        error: action.payload,
        skip: state.fav.skip,
        length: state.fav.length,
      };
    },
    saveFavStart: (state, action) => {
      state.saveFav = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading... Please wait.",
        buttonDisable: true,
      };
    },
    saveFavSuccess: (state, action) => {
      state.saveFav = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    saveFavFailure: (state, action) => {
      state.saveFav = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    deleteFavStart: (state, action) => {
      state.deleteFav = {
        data: {},
        loading: true,
        error: false,
        inputData: action.payload,
        loadingButtonContent: "Loading...",
        buttonDisable: true,
      };
    },
    deleteFavSuccess: (state, action) => {
      state.deleteFav = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
    deleteFavFailure: (state, action) => {
      state.deleteFav = {
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
    fetchFavStart,
    fetchFavSuccess,
    fetchFavFailure,
    saveFavStart,
    saveFavFailure,
    saveFavSuccess,
    deleteFavFailure,
    deleteFavStart,
    deleteFavSuccess,

} = FavSlice.actions;

export default FavSlice.reducer;
