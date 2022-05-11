import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {notify} from "reapop";

import {
    fetchChatMessageFailure,
    fetchChatMessageStart,
    fetchChatMessageSuccess,
    fetchChatUsersFailure,
    fetchChatUsersSuccess,
    saveChatUsersFailure,
    saveChatUsersSuccess,
} from "../slices/chatSlice";

import { errorLogoutCheck } from "../slices/errorSlice";

function* fetchChatUserAPI() {
    try {
      const inputData = yield select((state) => state.chat.chatUsers.inputData);
      console.log('inputData', inputData  == '', inputData);
      const response = yield api.postMethod({action : "chat_users", object : inputData});
      if (response.data.success) {
        yield put(fetchChatUsersSuccess(response.data.data));
        if (response.data.data.users.length > 0 && inputData.search_key == '')
          yield put(
            fetchChatMessageStart({
              to_user_id: response.data.data.users[0].to_user_id,
              from_user_id: response.data.data.users[0].from_user_id,
            })
          );
      } else {
        yield put(fetchChatUsersFailure(response.data.error));
        yield put(errorLogoutCheck(response.data));
        yield put(notify({message: response.data.error, status: "error"}));
      }
    } catch (error) {
      yield put(fetchChatUsersFailure(error));
      yield put(notify({message: error.message, status:"error"}));
    }
  }
  
  function* fetchChatMessageAPI() {
    try {
      const inputData = yield select((state) => state.chat.messages.inputData);
      const response = yield api.postMethod({action : "chat_messages", object : inputData});
      if (response.data.success) {
        yield put(fetchChatMessageSuccess(response.data.data));
      } else {
        yield put(fetchChatMessageFailure(response.data.error));
        yield put(errorLogoutCheck(response.data));
        yield put(notify({message: response.data.error, status: "error"}));
      }
    } catch (error) {
      yield put(fetchChatMessageFailure(error));
      yield put(notify({message: error.message, status:"error"}));
    }
  }
  
  function* fetchMoreDataStartAPI() {
    try {
      const inputData = yield select((state) => state.chat.messages.inputData);
      const response = yield api.postMethod({action : "chat_messages", object : inputData});
      if (response.data.success) {
        yield put(fetchChatMoreDataSucess(response.data.data));
      }
    } catch (error) {
      yield put(fetchChatMessageFailure(error));
      yield put(notify({message: error.message, status:"error"}));
    }
  }
  
  function* saveChatUserAPI() {
    try {
      const inputData = yield select(
        (state) => state.chat.saveChatUser.inputData
      );
      const response = yield api.postMethod({action :"chat_users_save",object :inputData});
      if (response.data.success) {
        yield put(saveChatUsersSuccess(response.data.data));
        window.location.assign("/messages");
  
      } else {
        yield put(saveChatUsersFailure(response.data.error));
        yield put(errorLogoutCheck(response.data));
        yield put(notify({message: response.data.error, status: "error"}));
      }
    } catch (error) {
      yield put(saveChatUsersFailure(error));
      yield put(notify({message: error.message, status: "error"}));
    }
  }
  
  export default function* pageSaga() {
    yield all([yield takeLatest("chat/fetchChatUsersStart", fetchChatUserAPI)]);
    yield all([yield takeLatest("chat/fetchChatMessageStart", fetchChatMessageAPI)]);
    yield all([yield takeLatest("chat/saveChatUsersStart", saveChatUserAPI)]);
    yield all([yield takeLatest("chat/addMessageContentStart", fetchMoreDataStartAPI)]);
  }
  