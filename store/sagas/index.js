import { all, fork } from "redux-saga/effects";

import UserSaga from "./UserSaga";
import HomeSaga from "./HomeSaga";
import PostSaga from "./PostSaga";
import PostLikesSaga from "./PostLikesSaga";
import CommentsSaga from "./CommentsSaga";
import BookmarkSaga from "./BookmarkSaga";
import StoriesSaga from "./StoriesSaga";
import ErrorSaga from "./ErrorSaga";
import OtherUserSaga from "./OtherUsersSaga";
import WalletSaga from "./WalletSaga";
import SubscriptionSaga from "./SubscriptionSaga";
import CardSaga from "./CardSaga";
import ConfigSaga from "./ConfigSaga";
import FollowSaga from "./FollowSaga";
import AlertSaga from "./AlertSaga";
import ChatSaga from "./ChatSaga";
import ChannelsSaga from "./ChannelsSaga";
import ChatAssetSaga from "./ChatAssetSaga";
import UserCategorySaga from "./UserCategorySaga";
import GroupsSaga from "./GroupsSaga";
import SendTipSaga from "./SendTipSaga";
import LiveVideosSaga from "./LiveVideosSaga";
import VideoCallSaga from "./VideoCallSaga";
import PrivateCallSaga from "./PrivateCallSaga";
import SessionSaga from "./SessionSaga";
import ChangePasswordSaga from "./ChangePasswordSaga"
import FavSaga from './FavSaga';
import VerificationDocumentSaga from './VerificationDocumentSaga';
import TransactionSaga from './TransactionSaga';
import ReferalSaga from './ReferalSaga';
import ProductsSaga from './ProductsSaga';
import PageSaga from './PageSaga';
import NotificationSaga from './NotificationSaga';
import KycDocumentSaga from './KycDocumentSaga';
import CategorySaga from './CategorySaga';
import BankAccountSaga from './BankAccountSaga';
import ProductOwnerSaga from './ProductOwnerSaga';
import WithdrawSaga from './WithdrawSaga';

export default function* rootSaga() {
  yield all([fork(UserSaga)]);
  yield all([fork(HomeSaga)]);
  yield all([fork(PostSaga)]);
  yield all([fork(PostLikesSaga)]);
  yield all([fork(CommentsSaga)]);
  yield all([fork(BookmarkSaga)]);
  yield all([fork(StoriesSaga)]);
  yield all([fork(ErrorSaga)]);
  yield all([fork(OtherUserSaga)]);
  yield all([fork(WalletSaga)]);
  yield all([fork(SubscriptionSaga)]);
  yield all([fork(CardSaga)]);
  yield all([fork(ConfigSaga)]);
  yield all([fork(FollowSaga)]);
  yield all([fork(AlertSaga)]);
  yield all([fork(ChatSaga)]);
  yield all([fork(ChatAssetSaga)]);
  yield all([fork(ChannelsSaga)]);
  yield all([fork(UserCategorySaga)]);
  yield all([fork(GroupsSaga)]);
  yield all([fork(SendTipSaga)]);
  yield all([fork(LiveVideosSaga)]);
  yield all([fork(VideoCallSaga)]);
  yield all([fork(PrivateCallSaga)]);
  yield all([fork(SessionSaga)]);
  yield all([fork(ChangePasswordSaga)]);
  yield all([fork(FavSaga)]);
  yield all([fork(VerificationDocumentSaga)]);
  yield all([fork(TransactionSaga)]);
  yield all([fork(ReferalSaga)]);
  yield all([fork(ProductsSaga)]);
  yield all([fork(PageSaga)]);
  yield all([fork(NotificationSaga)]);
  yield all([fork(KycDocumentSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(BankAccountSaga)]);
  yield all([fork(ProductOwnerSaga)]);
  yield all([fork(WithdrawSaga)]);
}

