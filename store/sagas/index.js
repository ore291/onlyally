import { all, fork } from "redux-saga/effects";

import UserSaga from "./UserSaga";
import HomeSaga from "./HomeSaga";
import PostSaga from "./PostSaga"

export default function* rootSaga() {
    yield all([fork(UserSaga)]);
    yield all([fork(HomeSaga)]);
    yield all([fork(PostSaga)]);
}