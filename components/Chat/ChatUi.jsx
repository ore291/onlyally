import React, { useEffect, useState, useRef , Component} from "react";
import Link from "next/link";
import Image from "next/image";
import ChatUserList from "./ChatUserList";
import VerifiedBadge from "../handlers/VerifiedBadge";

import {
  addMessageContent,
  fetchChatMessageStart,
  fetchChatUsersStart,
} from "../../store/slices/chatSlice";

import { saveBlockUserStart } from "../../store/slices/userSlice";
import ReactPlayer from "react-player/lazy";
import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import ReactAudioPlayer from "react-audio-player";
import { isMobile } from "react-device-detect";
// import ReactFancyBox from 'react-fancybox'
// import 'react-fancybox/lib/fancybox.css'
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";

const $ = window.$;

let chatSocket;

const ChatUi = () => {
  const dispatch = useDispatch();
  const chatUsers = useSelector((state) => state.chat.chatUsers);
  const chatMessages = useSelector((state) => state.chat.messages);
  const assetUpload = useSelector((state) => state.chatAsset.saveAssetUpload);
  const socketUrl = useSelector(
    (state) => state.config.configData.chat_socket_url
  );
  const [activeChat, setActiveChat] = useState(0);
  const [toUserId, setToUserId] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const [initialHeight, setInitialHeight] = useState(0);

  const messageRef = useRef();

  const [chatAssetUpload, setChatAssetUpload] = useState(false);
  const [fileType, setFileType] = useState("picture");
  const [chatPayment, setPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    chat_message_id: 0,
    from_user_id: localStorage.getItem("userId"),
    to_user_id: toUserId,
    amount_formatted: 0,
    amount: 0,
  });

  const closeChatAssetUploadModal = () => {
    setChatAssetUpload(false);
  };

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const invalidMessageRef = useRef(null);

  const [emptyMessageCheck, setEmptyMessageCheck] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    dispatch(fetchChatUsersStart({ search_key: searchKey }));
    let chatSocketUrl = socketUrl;
    if (chatSocketUrl === "") {
      // const notificationMessage = getErrorNotificationMessage(
      //   "Socket URL is not configured. Chat wil not work..."
      // );
      // props.dispatch(createNotification(notificationMessage));
      // window.location.assign("/home");
    }
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  useEffect(() => {
    console.log("Number of times called");
    if (chatUsers.loading === false && chatUsers.data.users.length > 0) {
      console.log("Number of times called true  ");
      setToUserId(chatUsers.data.users[0].to_user_id);
      chatSocketConnect(chatUsers.data.users[0].to_user_id);
    } else {
    }
  }, [!chatUsers.loading]);

  // Scroll down function..
  useEffect(() => {
    console.log("Scroll down..");
    const objDiv = document.getElementById("options-holder");
    if (objDiv != null) {
      let differenceNumber =
        objDiv.offsetHeight > objDiv.scrollHeight
          ? objDiv.offsetHeight - objDiv.scrollHeight
          : objDiv.scrollHeight - objDiv.offsetHeight;

      if (differenceNumber > 280) {
        objDiv.scrollTop = objDiv.scrollHeight;
      } else {
        objDiv.scrollTop = initialHeight;
        setInitialHeight(initialHeight + 20);
      }
    }
  }, [chatMessages.data.messages]);

  const chatSocketConnect = (to_user_id) => {
    // check the socket url is configured
    let chatSocketUrl = socketUrl;
    console.log("chatSocket", chatSocketUrl);
    console.log("Input ID", to_user_id);
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          localStorage.getItem("userId") +
          `_to_user_id_` +
          to_user_id +
          `',myid:` +
          localStorage.getItem("userId"),
      });
      console.log("chatSocket", chatSocket);
      chatSocket.emit("update sender", {
        commonid:
          "user_id_" +
          localStorage.getItem("userId") +
          "_to_user_id_" +
          to_user_id,
        myid: localStorage.getItem("userId"),
      });
      let chatContent;
      chatSocket.on("message", (newData) => {
        let content = [];
        content.push(newData);
        // chatContent = [...this.state.chatData, ...content];
        // this.setState({ chatData: chatContent });
        console.log(content);
        dispatch(addMessageContent(content));
      });
    }
  };

  const changeUser = (event, chat, index) => {
    chatSocket.disconnect();
    if (isMobile) {
      window.location.assign(
        "/user-chat-room/" + chat.from_user_id + "/" + chat.to_user_id
      );
    }
    event.preventDefault();
    setActiveChat(index);
    let to_user_id =
      chat.to_user_id == localStorage.getItem("userId")
        ? chat.from_user_id
        : chat.to_user_id;
    setToUserId(to_user_id);

    dispatch(
      fetchChatMessageStart({
        to_user_id: chat.to_user_id,
        from_user_id: chat.from_user_id,
      })
    );
    chatSocketConnect(to_user_id);
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    let chatSocketUrl = socketUrl;

    if (inputMessage.length == 0) {
      setEmptyMessageCheck(true);
    }

    if (chatSocketUrl != undefined && inputMessage) {
      let chatData = [
        {
          from_user_id: localStorage.getItem("userId"),
          to_user_id: toUserId,
          message: inputMessage,
          type: "uu",
          user_picture: localStorage.getItem("user_picture"),
          loggedin_user_id: localStorage.getItem("userId"),
          created: Date(),
          from_username: localStorage.getItem("username"),
          from_displayname: localStorage.getItem("name"),
          from_userpicture: localStorage.getItem("user_picture"),
          from_user_unique_id: "",
          to_username: "",
          to_displayname: "",
          to_userpicture: "",
          to_user_unique_id: "",
        },
      ];
      chatSocket.emit("message", chatData[0]);
      let messages;
      if (chatMessages.data.messages != null) {
        messages = [...chatMessages.data.messages, ...chatData];
      } else {
        messages = [...chatData];
      }

      setInputMessage("");
      dispatch(addMessageContent(chatData));
    }
  };

  useEffect(() => {
    assetUpload.loading || handleMediaSubmit();
  }, [assetUpload.loading]);

  const handleMediaSubmit = () => {
    const assetData = assetUpload.data.chat_asset;
    const assetMessage = assetUpload.data.chat_message;
    let chatSocketUrl = socketUrl;
    if (chatSocketUrl != undefined && assetData && assetMessage) {
      let chatData = [
        {
          from_user_id: localStorage.getItem("userId"),
          to_user_id: toUserId,
          chat_message_id: assetMessage ? assetMessage.chat_message_id : "",
          message: assetMessage ? assetMessage.message : "",
          type: "uu",
          user_picture: localStorage.getItem("user_picture"),
          loggedin_user_id: localStorage.getItem("userId"),
          created: Date(),
          from_username: localStorage.getItem("username"),
          from_displayname: localStorage.getItem("name"),
          from_userpicture: localStorage.getItem("user_picture"),
          from_user_unique_id: "",
          to_username: "",
          to_displayname: "",
          to_userpicture: "",
          to_user_unique_id: "",
          chat_asset_id: assetData ? assetData.chat_asset_id : "",
          chat_asset_url:
            assetMessage.amount > 0 ? assetData.blur_file : assetData.file,
          file_type: assetData.file_type,
          is_user_needs_pay: assetMessage.amount > 0 ? 1 : 0,
          amount: assetMessage.amount > 0 ? assetMessage.amount : 0,
          amount_formatted:
            assetMessage.amount > 0 ? assetMessage.amount_formatted : 0,
          payment_text:
            assetMessage.amount > 0
              ? "UNLOCK MESSAGE FOR " + assetMessage.amount_formatted
              : "",
        },
      ];

      let chatMessageData = [
        {
          from_user_id: localStorage.getItem("userId"),
          to_user_id: toUserId,
          chat_message_id: assetMessage ? assetMessage.chat_message_id : "",
          message: assetMessage ? assetMessage.message : "",
          type: "uu",
          user_picture: localStorage.getItem("user_picture"),
          loggedin_user_id: localStorage.getItem("userId"),
          created: Date(),
          from_username: localStorage.getItem("username"),
          from_displayname: localStorage.getItem("name"),
          from_userpicture: localStorage.getItem("user_picture"),
          from_user_unique_id: "",
          to_username: "",
          to_displayname: "",
          to_userpicture: "",
          to_user_unique_id: "",
          chat_asset_id: assetData ? assetData.chat_asset_id : "",
          chat_asset_url: assetData.file,
          file_type: assetData.file_type,
          amount: assetMessage.amount > 0 ? assetMessage.amount : 0,
          amount_formatted:
            assetMessage.amount > 0 ? assetMessage.amount_formatted : 0,
          is_user_needs_pay: 0,
          payment_text: "",
        },
      ];
      chatSocket.emit("message", chatData[0]);
      let messages;
      if (chatMessages.data.messages != null) {
        messages = [...chatMessages.data.messages, ...chatMessageData];
      } else {
        messages = [...chatMessageData];
      }
      if (assetData) {
        closeChatAssetUploadModal();
      }
      setInputMessage("");
      dispatch(addMessageContent(chatMessageData));
    }
  };

  const chatInputChange = (value) => {
    setInputMessage(value);
    if (inputMessage.length > 0) {
      setEmptyMessageCheck(false);
    }
  };

  const handleAssetUploadModal = (fileType) => {
    setChatAssetUpload(true);
    setFileType(fileType);
  };

  const handleAssetPayment = (
    event,
    chat_message_id,
    amount_formatted,
    amount
  ) => {
    event.preventDefault();
    setPaymentData({
      ...paymentData,
      chat_message_id: chat_message_id,
      amount: amount,
      amount_formatted: amount_formatted,
    });
    setPaymentModal(true);
  };
  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    setInputMessage(inputMessage + emoji.native);
  };

  const handleBlockUser = (event, status, user_id) => {
    event.preventDefault();
    dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const searchUser = (value) => {
    setSearchKey(value);
    dispatch(fetchChatUsersStart({ search_key: value }));
  };
  return (
    <div className="container mx-auto">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search by username"
                onChange={(event) => searchUser(event.target.value)}
                required
                value={searchKey}
              />
            </div>
          </div>

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              {chatUsers.loading ? null : chatUsers.data &&
                chatUsers.data.users.length > 0 ? (
                <ChatUserList
                  chatUsers={chatUsers.data}
                  activeChat={activeChat}
                  setActiveChat={setActiveChat}
                  changeUser={changeUser}
                />
              ) : (
                <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <h6>No user found</h6>
                </a>
              )}
            </li>
          </ul>
        </div>
        {chatUsers.loading || chatMessages.loading ? (
          ""
        ) : chatMessages.data.user && chatMessages.data.user.user_unique_id ? (
          <div className="hidden lg:col-span-2 lg:block">
            <div className="w-full">
              <Link
                href={`/profile/${chatMessages.data.user.user_unique_id}`}
                passHref
              >
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <Image
                    objectFit="cover"
                    width="40"
                    height="40"
                    className="rounded-full cursor-pointer"
                    src={chatMessages.data.user.picture}
                    alt={chatMessages.data.user.username}
                  />

                  <span className="block ml-2 font-bold text-gray-600 cursor-pointer hover:text-lightPlayRed">
                    {chatMessages.data.user.name}
                  </span>
                  {chatMessages.data.user.is_verified_badge == 1 ? (
                    <VerifiedBadge />
                  ) : null}
                  {chatMessages.data.user.is_online_status == 1 ? (
                    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                  ) : (
                    ""
                  )}
                  <span className="ml-1 text-lightPlayRed text-xs font-light">
                  @{chatMessages.data.user.username}
                  </span>
                </div>
              </Link>

              <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">Hi</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">Hiiii</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">how are you?</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <button type="submit">
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h4>No data Found</h4>
        )}
      </div>
    </div>
  );
};

export default ChatUi;
