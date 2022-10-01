import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {

  saveGroupPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteGroup: {
    data : [],
    loading: false,
    buttonDisable: false,
    error: false

  },
  deleteGroupMember: {
    data : [],
    loading: false,
    buttonDisable: false,
    error: false

  },
  groups: {
    data: [],
    loading: false,
    error: false,
  },
  userGroups: {
    data: [],
    loading: false,
    error: false,
  },
  otherUserGroups: {
    data: [],
    loading: false,
    error: false,
  },
  joinGroup: {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  },
  categories: {
    data: [],
    loading: false,
    error: false,
  },
  createGroup: {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  },
  groupData: {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  },
  groupMembersData : {
    inputData: null,
    data: [],
    loading: false,
    error: false,
  },
  updateGroup:{
    data: {},
    loading: false,
    error: false,
  },
  updateGroupPhotos:{
    data: {},
    loading: false,
    error: false,
  },
  updateGroupPrivacy:{
    data: {},
    loading: false,
    error: false,
  },
  updateMemberStatus:{
    data: {},
    loading: false,
    error: false,
  },
};

export const GroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    updateGroupMemberStart: (state, action)=>{
        state.updateMemberStatus = {
          data : {},
          loading : true,
          error :  false
        }
    },
    updateGroupMemberSuccess: (state, action)=>{
        state.updateMemberStatus = {
          data : action.payload,
          loading : false,
          error :  false
        }
    },
    updateGroupMemberFailure: (state, action)=>{
        state.updateMemberStatus = {
          data : {},
          loading : false,
          error :  action.payload
        }
    },
    updateGroupInfoStart: (state, action)=>{
        state.updateGroup = {
          data : {},
          loading : true,
          error :  false
        }
    },
    updateGroupInfoSuccess: (state, action)=>{
        state.updateGroup = {
          data : action.payload,
          loading : false,
          error :  false
        }
    },
    updateGroupInfoFailure: (state, action)=>{
        state.updateGroup = {
          data : {},
          loading : false,
          error :  action.payload
        }
    },
    updateGroupPrivacyStart: (state, action)=>{
        state.updateGroupPrivacy = {
          data : {},
          loading : true,
          error :  false
        }
    },
    updateGroupPrivacySuccess: (state, action)=>{
        state.updateGroupPrivacy = {
          data : action.payload,
          loading : false,
          error :  false
        }
    },
    updateGroupPrivacyFailure: (state, action)=>{
        state.updateGroupPrivacy = {
          data : {},
          loading : false,
          error :  action.payload
        }
    },
    updateGroupPhotosStart: (state, action)=>{
        state.updateGroupPhotos = {
          data : {},
          loading : true,
          error :  false
        }
    },
    updateGroupPhotosSuccess: (state, action)=>{
        state.updateGroupPhotos = {
          data : action.payload,
          loading : false,
          error :  false
        }
    },
    updateGroupPhotosFailure: (state, action)=>{
        state.updateGroupPhotos = {
          data : {},
          loading : false,
          error :  action.payload
        }
    },
    saveGroupPostStart: (state, action) => {
      state.saveGroupPost = {
        inputData: action.payload,
        data: {},
        loading: true,
        error: false,
        loadingButtonContent: "Loading... Please wait",
        buttonDisable: true,
      };
    },
    saveGroupPostSuccess: (state, action) => {
      state.saveGroupPost = {
        data: action.payload,
        loading: false,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },

    saveGroupPostFailure: (state, action) => {
      state.saveGroupPost = {
        data: {},
        loading: true,
        error: action.payload,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      };
    },
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
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    fetchUserGroupsStart: (state, action) => {
      state.userGroups = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchUserGroupsSuccess: (state, action) => {
      state.userGroups = {
        data: [...state.userGroups.data, ...action.payload],
        loading: false,
        error: false,
      };
    },
    fetchUserGroupsFailure: (state, action) => {
      state.userGroups = {
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    fetchOtherUserGroupsStart: (state, action) => {
      state.otherUserGroups = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchOtherUserGroupsSuccess: (state, action) => {
      state.otherUserGroups = {
        data: [...state.otherUserGroups.data, ...action.payload],
        loading: false,
        error: false,
      };
    },
    fetchOtherUserGroupsFailure: (state, action) => {
      state.otherUserGroups = {
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    joinGroupStart: (state, action) => {
      state.joinGroup = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      };
    },
    joinGroupSuccess: (state, action) => {
      state.joinGroup = {
        inputData: null,
        loading: false,
        error: false,
        data: action.payload,
      };
    },
    joinGroupFailure: (state, action) => {
      state.joinGroup = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      };
    },
    fetchGroupsCategoriesStart: (state, action) => {
      state.categories = {
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchGroupsCategoriesSuccess: (state, action) => {
      state.categories = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchGroupsCategoriesFailure: (state, action) => {
      state.categories = {
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    createGroupStart: (state, action) => {
      state.createGroup = {
        inputData: action.payload,
        loading: true,
        error: false,
        data: {},
      };
    },
    createGroupSuccess: (state, action) => {
      state.createGroup = {
        inputData: null,
        loading: false,
        error: false,
        data: action.payload,
      };
    },
    createGroupFailure: (state, action) => {
      state.createGroup = {
        inputData: null,
        loading: false,
        error: action.payload,
        data: {},
      };
    },
    fetchSingleGroupStart: (state, action) => {
      state.groupData = {
        inputData: action.payload,
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchSingleGroupSuccess: (state, action) => {
      state.groupData = {
        inputData: "",
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSingleGroupFailure: (state, action) => {
      state.groupData = {
        inputData: "",
        data: {},
        loading: false,
        error: action.payload,
      };
    },
    fetchSingleGroupMemberStart: (state, action) => {
      state.groupMembersData = {
        inputData: action.payload,
        data: [],
        loading: true,
        error: false,
      };
    },
    fetchSingleGroupMemberSuccess: (state, action) => {
      state.groupMembersData = {
        inputData: "",
        data:  action.payload,
        loading: false,
        error: false,
      };
    },
    fetchSingleGroupMemberFailure: (state, action) => {
      state.groupMembersData = {
        inputData: "",
        data: [],
        loading: false,
        error: action.payload,
      };
    },
    deleteGroupStart: (state, action) => {
      state.deleteGroup = {
        data : [],
        loading: true,
        buttonDisable: true,
        error: false
      }
    },
    deleteGroupSuccess: (state, action) => {
      state.deleteGroup = {
        data : action.payload,
        loading: false,
        buttonDisable: false,
        error: false
      }
    },
    deleteGroupFailure: (state, action) => {
      state.deleteGroup = {
        data : [],
        loading: false,
        buttonDisable: false,
        error: action.payload
      }
    },
    deleteGroupMemberStart: (state, action) => {
      state.deleteGroupMember = {
        data : [],
        loading: true,
        buttonDisable: true,
        error: false
      }
    },
    deleteGroupMemberSuccess: (state, action) => {
      state.deleteGroupMember = {
        data : action.payload,
        loading: false,
        buttonDisable: false,
        error: false
      }
    },
    deleteGroupMemberFailure: (state, action) => {
      state.deleteGroupMember = {
        data : [],
        loading: false,
        buttonDisable: false,
        error: action.payload
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.groups.groupData || !action.payload.groups.groups || !action.payload.groups.groupMembersData || !action.payload.groups.categories) {
        return state;
      }
      state.groupData = action.payload.groups.groupData;
      state.groups = action.payload.groups.groups;
      state.groupMembersData = action.payload.groups.groupMembersData;
      state.userGroups = action.payload.groups.userGroups;
      state.otherUserGroups = action.payload.groups.otherUserGroups;
      state.categories = action.payload.groups.categories;
    },
  },
});

export const {
  updateGroupMemberStart,
  updateGroupMemberSuccess,
  updateGroupMemberFailure,
  deleteGroupMemberStart,
  deleteGroupMemberFailure,
  deleteGroupMemberSuccess,
  updateGroupPrivacyStart,
  updateGroupPrivacyFailure,
  updateGroupPrivacySuccess,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
  fetchSingleGroupMemberStart,
  fetchSingleGroupMemberSuccess,
  fetchSingleGroupMemberFailure,
  saveGroupPostStart,
  saveGroupPostSuccess,
  saveGroupPostFailure,
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
  fetchSingleGroupSuccess,
  fetchUserGroupsStart,
  fetchUserGroupsSuccess,
  fetchUserGroupsFailure,
  fetchOtherUserGroupsStart,
  fetchOtherUserGroupsSuccess,
  fetchOtherUserGroupsFailure,
  updateGroupInfoStart,
  updateGroupInfoFailure,
  updateGroupInfoSuccess,
  updateGroupPhotosStart,
  updateGroupPhotosFailure,
  updateGroupPhotosSuccess
} = GroupsSlice.actions;

export default GroupsSlice.reducer;
