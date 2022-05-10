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
import otherUserReducer from "./OtherUsersSlice";
import subscriptionReducer from "./subscriptionSlice";
import walletReducer from "./walletSlice";
import cardReducer from "./cardsSlice";
import configReducer from './configurationSlice';
import followReducer from "./followerSlice";
import alertReducer from "./AlertSlice";
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
  otherUser: otherUserReducer,
  subscriptions: subscriptionReducer,
  wallet: walletReducer,
  cards : cardReducer,
  config : configReducer,
  follow : followReducer,
  alert : alertReducer
});

export default reducers;
