import userReducer from "./userSlice";
import creatorReducer from "./creatorSlice";
import navReducer from "./NavSlice";
import homeReducer from "./homeSlice";
import postReducer from "./postSlice";
import postLikesReducer from "./postLikeSlice";
import commentsReducer from "./commentsSlice";
import bookmarkReducer from "./bookmarkSlice";
import storiesReducer from "./storiesSlice";
import errorReducer from "./errorSlice";
import { reducer as notificationsReducer } from "reapop";
import { combineReducers } from "redux";

const reducers = combineReducers({
  notifications: notificationsReducer(),
  user: userReducer,
  creators: creatorReducer,
  navbar: navReducer,
  home: homeReducer,
  post: postReducer,
  postlikes: postLikesReducer,
  comments: commentsReducer,
  bookmark: bookmarkReducer,
  stories: storiesReducer,
  errorDetails: errorReducer,
});

export default reducers;
