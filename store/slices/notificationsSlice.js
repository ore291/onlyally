import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import {HYDRATE} from "next-redux-wrapper"

const initialState = {
  notifications: [],
  position: 'top-right',
  autoHideDuration: 3000,
};

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      const notification = {
        id: nanoid(),
        ...payload,
      };
      state.notifications.push(notification);
    },
      dismissNotification: (
        state,
        { payload }
      ) => {
        const index = state.notifications.findIndex(
          (notification) => notification.id === payload
        )
  
        if (index !== -1) {
          state.notifications.splice(index, 1)
        }
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client
      if (!action.payload.notifications.notifications) {
        return state;
      }
      state.notifications = action.payload.notifications.notifications;
      // state.homePost.posts = action.payload.home.homePost.posts;
      // state.homePost.skip = action.payload.home.homePost.skip;
      // state.homePost.length = action.payload.home.homePost.length;
      // state.homePost.error = action.payload.home.homePost.error;
    },
  },
});

export const {
    addNotification,
    dismissNotification
} = NotificationsSlice.actions;

export default NotificationsSlice.reducer;