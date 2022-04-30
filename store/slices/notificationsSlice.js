import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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
});

export const {
    addNotification,
    dismissNotification
} = NotificationsSlice.actions;

export default NotificationsSlice.reducer;