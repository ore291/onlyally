import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  groups: {
    data: [],
    loading: false,
    error: false,
  },
  joinGroup : {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  },
  categories : {
    data: [],
    loading: false,
    error: false
  },
  createGroup : {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  },
  groupData : {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  }
};

export const GroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    fetchGroupsStart: (state, action) => {
      state.groups = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchGroupsSuccess: (state, action) => {
      state.groups = {
        data: [...state.groups.data, ...action.payload],
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
    joinGroupStart: (state, action)=>{
      state.joinGroup = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      }
    },
    joinGroupSuccess: (state, action)=>{
      state.joinGroup = {
        inputData:null,
        loading: false,
        error: false,
        data: action.payload,
      }
    },
    joinGroupFailure: (state, action)=>{
      state.joinGroup = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      }
    },
    fetchGroupsCategoriesStart: (state, action)=>{
        state.categories = {
          data : [],
          loading: true,
          error : false,
        }
    },
    fetchGroupsCategoriesSuccess: (state, action)=>{
        state.categories = {
          data : action.payload,
          loading: false,
          error : false,
        }
    },
    fetchGroupsCategoriesFailure: (state, action)=>{
      state.categories = {
        data : {},
        loading: false,
        error : action.payload,
      }
  },
  createGroupStart: (state, action)=>{
    state.createGroup = {
      inputData: action.payload,
      loading: true,
      error: false,
      data: {},
    }
  },
  createGroupSuccess: (state, action)=>{
    state.createGroup = {
      inputData:null,
      loading: false,
      error: false,
      data: action.payload,
    }
  },
  createGroupFailure: (state, action)=>{
    state.createGroup = {
      inputData: null,
      loading: false,
      error: action.payload,
      data: {},
    }
  },
  fetchSingleGroupStart: (state, action)=>{
    state.groupData = {
      inputData: action.payload,
      data: {},
      loading: true,
      error: false
    }
  },
  fetchSingleGroupSuccess: (state, action)=>{
    state.groupData = {
      inputData : "",
      data: action.payload,
      loading: false,
      error: false
    }
  },
  fetchSingleGroupFailure: (state, action)=>{
    state.groupData = {
      inputData : "",
      data: {},
      loading: false,
      error: action.payload
    }
  },
  },

 
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  joinGroupStart,
  joinGroupSuccess,
  joinGroupFailure,
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
  fetchGroupsCategoriesStart,
  fetchGroupsCategoriesSuccess,
  fetchGroupsCategoriesFailure,
  fetchSingleGroupStart,
  fetchSingleGroupFailure,
  fetchSingleGroupSuccess
} = GroupsSlice.actions;

export default GroupsSlice.reducer;