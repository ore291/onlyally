import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  groups: {
    data: {},
    loading: true,
    error: false,
  },
};

export const GroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    fetchGroupsStart: (state, action) => {
      state.groups = {
        data: {},
        loading: true,
        error: false,
      };
    },
    fetchGroupsSuccess: (state, action) => {
      state.groups = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchGroupsFailure: (state, action) => {
      state.groups = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
  },

 
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailure,
} = GroupsSlice.actions;

export default GroupsSlice.reducer;