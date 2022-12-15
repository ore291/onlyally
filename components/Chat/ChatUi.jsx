import React, { useEffect, useState, useRef, Component } from "react";
import Link from "next/link";
import Image from "next/image";
import ChatUserList from "./ChatUserList";
import VerifiedBadge from "../handlers/VerifiedBadge";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { notify } from "reapop";
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
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Constant/axios";

const ChatUi = () => {
  let chatSocket;

  const dispatch = useDispatch();

  const [toggler, setToggler] = useState(false);

  const chatUsers = useSelector((state) => state.chat.chatUsers);
  const chatMessages = useSelector((state) => state.chat.messages);
  const assetUpload = useSelector((state) => state.chatAsset.saveAssetUpload);
  const socketUrl = useSelector(
    (state) => state.config.configData.chat_socket_url
  );
  const [activeChat, setActiveChat] = useState(0);
  const [toUserId, setToUserId] = useState(0);
  const [toLocUserId, setToLocUserId] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const [initialHeight, setInitialHeight] = useState(0);

  const messageRef = useRef();

  const [chatAssetUpload, setChatAssetUpload] = useState(false);
  const [fileType, setFileType] = useState("picture");
  const [chatPayment, setPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    chat_message_id: 0,
    from_user_id: toLocUserId,
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
    setToLocUserId(localStorage.getItem("userId"));
    dispatch(fetchChatUsersStart({ search_key: searchKey }));
    let chatSocketUrl = socketUrl;
    if (chatSocketUrl === "") {
      console.log("here", chatSocketUrl);
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

  // useEffect(() => {
  //   console.log("Number of times called");
  //   if (chatUsers.loading === false && chatUsers.data.users.length > 0) {
  //     console.log("Number of times called true  ");
  //     setToUserId(chatUsers.data.users[0].to_user_id);
  //     chatSocketConnect(chatUsers.data.users[0].to_user_id);
  //   } else {
  //   }
  // }, [!chatUsers.loading, socketUrl]);

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

  // new echo

  const options = {
    broadcaster: "pusher",
    key: 'dfc2bd8513963367dd0e',
    cluster: "eu",
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post("/api/broadcasting/auth", {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((e) => {
              console.log(e);
              callback(false, e.data);
            }).catch(function (error) {
              console.log(error.toJSON());
            });;
        },
      };
    },
  };

  
 
  useEffect(() => {
    const echo = new Echo(options);
    if (chatUsers.loading === false && chatUsers.data.users.length > 0) {
      setToUserId(chatUsers.data.users[0].to_user_id);
      const chatter = echo.private(`chat.${chatUsers.data.users[0].to_user_id}`);
    } else {
    }

    return ()=>echo.leave(`chat.${toUserId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUsers.loading]);

  // const chatSocketConnect = (to_user_id) => {
  //   // check the socket url is configured

  //   let chatSocketUrl = socketUrl;
  //   console.log("chatSocket", chatSocketUrl);
  //   console.log("Input ID", to_user_id);
  //   if (chatSocketUrl) {
  //     chatSocket = io(chatSocketUrl, {
  //       query:
  //         `commonid:'user_id_` +
  //         toLocUserId +
  //         `_to_user_id_` +
  //         to_user_id +
  //         `',myid:` +
  //         toLocUserId,
  //     });
  //     console.log("chatSocket", chatSocket);
  //     chatSocket.emit("update sender", {
  //       commonid: "user_id_" + toLocUserId + "_to_user_id_" + to_user_id,
  //       myid: toLocUserId,
  //     });
  //     let chatContent;
  //     chatSocket.on("message", (newData) => {
  //       let content = [];
  //       content.push(newData);
  //       // chatContent = [...this.state.chatData, ...content];
  //       // this.setState({ chatData: chatContent });
  //       console.log(content);
  //       dispatch(addMessageContent(content));
  //     });
  //   }
  // };

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
      chat.to_user_id == toLocUserId ? chat.from_user_id : chat.to_user_id;
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
      dispatch(notify({ message: " Please type a message", status: "error" }));
    }

    if (chatSocketUrl != undefined && inputMessage) {
      let chatData = [
        {
          from_user_id: toLocUserId,
          to_user_id: toUserId,
          message: inputMessage,
          type: "uu",
          user_picture: localStorage?.getItem("user_picture"),
          loggedin_user_id: toLocUserId,
          created: Date(),
          from_username: localStorage?.getItem("username"),
          from_displayname: localStorage?.getItem("name"),
          from_userpicture: localStorage?.getItem("user_picture"),
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
          from_user_id: toLocUserId,
          to_user_id: toUserId,
          chat_message_id: assetMessage ? assetMessage.chat_message_id : "",
          message: assetMessage ? assetMessage.message : "",
          type: "uu",
          user_picture: localStorage?.getItem("user_picture"),
          loggedin_user_id: toLocUserId,
          created: Date(),
          from_username: localStorage?.getItem("username"),
          from_displayname: localStorage?.getItem("name"),
          from_userpicture: localStorage?.getItem("user_picture"),
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
          from_user_id: toLocUserId,
          to_user_id: toUserId,
          chat_message_id: assetMessage ? assetMessage.chat_message_id : "",
          message: assetMessage ? assetMessage.message : "",
          type: "uu",
          user_picture: localStorage?.getItem("user_picture"),
          loggedin_user_id: toLocUserId,
          created: Date(),
          from_username: localStorage?.getItem("username"),
          from_displayname: localStorage?.getItem("name"),
          from_userpicture: localStorage?.getItem("user_picture"),
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
            <div className="w-full ">
              <Link href={`/${chatMessages.data.user.user_unique_id}`} passHref>
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
              <div className="flex-1 p-2 justify-between flex flex-col h-[80vh]">
                <div
                  id="messages"
                  className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                  ref={messageRef}
                >
                  {chatMessages.data.messages.length > 0
                    ? chatMessages.data.messages.map((chatMessage, index) => (
                        <>
                          {chatMessage.from_user_id ==
                          localStorage.getItem("userId") ? (
                            // main user
                            <div className="chat-message">
                              <div className="flex items-end justify-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 items-end">
                                  {chatMessage.chat_asset_url &&
                                  chatMessage.file_type == "video" ? (
                                    <ReactPlayer
                                      url={chatMessage.chat_asset_url}
                                      controls={true}
                                      className="post-video-size chat-video"
                                      width="450px"
                                      height="450px"
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <div>
                                    {chatMessage.chat_asset_url &&
                                    chatMessage.file_type == "audio" ? (
                                      <ReactAudioPlayer
                                        src={chatMessage.chat_asset_url}
                                        controls={true}
                                        width="450px"
                                        height="450px"
                                        className="chat-room-audio-display"
                                        autoPlay={false}
                                        controlsList={"nodownload"}
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {chatMessage.chat_asset_url &&
                                    chatMessage.file_type == "image" ? (
                                      <div
                                        className="relative w-[300px] h-[250px] max-w-[600px]
                                      
                                      "
                                      >
                                        <Image
                                          src={chatMessage.chat_asset_url}
                                          className="ml-[1em] my-[1em] align-middle rounded-md"
                                          layout="fill"
                                          objectFit="cover"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {chatMessage.is_user_needs_pay === 1 ? (
                                      <div className=" relative  p-[1em] rounded-[5px]  text-center z-[2] bottom-[7em] left[2em] w-[300px]">
                                        <button
                                          className="bg-lightPlayRed text-white font-semibold !py-[0.5em] !px-[2em] text-xs !border-none rounded-full inline-block text-center align-middle"
                                          onClick={(event) =>
                                            handleAssetPayment(
                                              event,
                                              chatMessage.chat_message_id,
                                              chatMessage.amount,
                                              chatMessage.amount_formatted
                                            )
                                          }
                                        >
                                          {chatMessage.payment_text}
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>

                                  {chatMessage.message == "" ? null : (
                                    <>
                                      <p>You, {chatMessage.created}</p>
                                      <div>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                          {chatMessage.message}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>

                                <Image
                                  src={localStorage.getItem("user_picture")}
                                  width="32"
                                  height="32"
                                  alt="My profile"
                                  className="w-6 h-6 rounded-full order-1"
                                />
                              </div>
                            </div>
                          ) : (
                            // other user
                            <div className="chat-message">
                              <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                  {chatMessage.chat_asset_url &&
                                  chatMessage.file_type == "video" ? (
                                    chatMessage.is_user_needs_pay === 1 ? (
                                      <div className="relative w-[300px] h-[250px] max-w-[600px]">
                                        <Image
                                          src={chatMessage.chat_asset_url}
                                          className="ml-[1em] my-[1em] align-middle rounded-md"
                                          layout="fill"
                                          objectFit="cover"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <ReactPlayer
                                        url={chatMessage.chat_asset_url}
                                        controls={true}
                                        className="post-video-size"
                                        width="450px"
                                        height="450px"
                                      />
                                    )
                                  ) : (
                                    ""
                                  )}
                                  <div>
                                    {chatMessage.chat_asset_url &&
                                    chatMessage.file_type == "image" ? (
                                      <div
                                        className="relative w-[300px] h-[250px] max-w-[600px]
                                      
                                      "
                                      >
                                        <Image
                                          src={chatMessage.chat_asset_url}
                                          className="ml-[1em] my-[1em] align-middle rounded-md"
                                          layout="fill"
                                          objectFit="cover"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {chatMessage.chat_asset_url &&
                                    chatMessage.file_type == "audio" ? (
                                      chatMessage.is_user_needs_pay === 1 ? (
                                        <Image
                                          width="300"
                                          height="250"
                                          alt=""
                                          src={chatMessage.chat_asset_url}
                                          className="mt-[1em] ml-[1em]"
                                          objectFit="cover"
                                        ></Image>
                                      ) : (
                                        <ReactAudioPlayer
                                          src={chatMessage.chat_asset_url}
                                          controls={true}
                                          width="450px"
                                          height="450px"
                                          className="chat-room-audio-display"
                                          autoPlay={false}
                                          controlsList={"nodownload"}
                                        />
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {chatMessage.is_user_needs_pay === 1 ? (
                                      <div className=" relative  p-[1em] rounded-[5px]  text-center z-[2] bottom-[7em] left[2em] w-[300px]">
                                        <button
                                          className="bg-lightPlayRed text-white font-semibold !py-[0.5em] !px-[2em] text-xs !border-none rounded-full inline-block text-center align-middle"
                                          onClick={(event) =>
                                            handleAssetPayment(
                                              event,
                                              chatMessage.chat_message_id,
                                              chatMessage.amount,
                                              chatMessage.amount_formatted
                                            )
                                          }
                                        >
                                          {chatMessage.payment_text}
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  {chatMessage.message == "" ? null : (
                                    <>
                                      <p>
                                        {chatMessages.data.user.name},{" "}
                                        {chatMessage.created}
                                      </p>
                                      <div>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                          {chatMessage.message}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <Image
                                  src={chatMessages.data.user.picture}
                                  width="32"
                                  height="32"
                                  alt="My profile"
                                  className="w-6 h-6 rounded-full order-1"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ))
                    : ""}
                </div>
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                  <form onSubmit={handleChatSubmit} className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                      <button
                        type="button"
                        data-can_send="true"
                        className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                        onClick={() => handleAssetUploadModal("audio")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <input
                      type="text"
                      placeholder="Type a message!"
                      aria-label="Type a message"
                      value={inputMessage}
                      onChange={(event) => {
                        chatInputChange(event.currentTarget.value);
                      }}
                      className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                    />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                      <button
                        data-can_send="true"
                        onClick={() => handleAssetUploadModal("image")}
                        type="button"
                        className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                        onClick={() => handleAssetUploadModal("video")}
                        data-can_send="true"
                      >
                        <HiOutlineVideoCamera className="h-6 w-6 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                        onClick={triggerPicker}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={handleChatSubmit}
                        ref={invalidMessageRef}
                        type="button"
                        className="inline-flex items-center justify-center rounded-full p-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-lightPlayRed  mr-1 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6  transform rotate-90"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                  {emojiPickerState && (
                    <div className="emojiWrapper chat-emoji">
                      <Picker
                        title=""
                        emoji="point_up"
                        onSelect={(emoji) => handleEmojiSelect(emoji)}
                      />
                    </div>
                  )}
                </div>
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
