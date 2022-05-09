import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  configData: {},
  loading: false,
  error: false,
};

export const ConfigSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    fetchConfigurationStart: (state, action) => {
      state.configData = {};
      state.loading = true;
      state.error = false;
    },
    fetchConfigurationSuccess: (state, action) => {
      state.configData = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchConfigurationFailure: (state, action) => {
      state.configData = {};
      state.loading = false;
      state.error = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.config.configData) {
        return state;
      }
      state.configData = action.payload.config.configData;
    },
  },
});


export const {
    fetchConfigurationStart,
    fetchConfigurationSuccess,
    fetchConfigurationFailure,
} = ConfigSlice.actions;

export default ConfigSlice.reducer;