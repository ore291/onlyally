import userReducer from "./userSlice";
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
import configReducer from "./configurationSlice";
import followReducer from "./followerSlice";
import alertReducer from "./AlertSlice";
import chatReducer from "./chatSlice";
import chatAssetReducer from "./chatAssetSlice";
import channelsReducer from "./channelsSlice";
import userCategoryReducer from "./userCategory";
import groupsReducer from "./groupsSlice";
import sendTipReducer from "./sendTipSlice";
import { reducer as notificationsReducer } from "reapop";
import { combineReducers } from "redux";

const reducers = combineReducers({
  notifications: notificationsReducer(),
  user: userReducer,
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
  cards: cardReducer,
  config: configReducer,
  follow: followReducer,
  alert: alertReducer,
  chat: chatReducer,
  chatAsset: chatAssetReducer,
  channels : channelsReducer,
  userCategory : userCategoryReducer,
  groups : groupsReducer,
  tips : sendTipReducer
});

export default reducers;
