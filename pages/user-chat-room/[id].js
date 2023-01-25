// import Pusher from "pusher-js";
// import Echo from "laravel-echo";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "../../components/Constant/axios";
// import {
//   addMessageContent,
//   fetchChatMessageStart,
//   fetchChatUsersStart,
//   sendMessageStart,
// } from "../../store/slices/chatSlice";
// import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
// import Moment from "react-moment";
// import { Picker, EmojiData } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";

// const UserChat = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const chatMessages = useSelector((state) => state.chat.messages);
//   const [toUserId, setToUserId] = useState(0);
//   const [toLocUserId, setToLocUserId] = useState(0);
//   const [inputMessage, setInputMessage] = useState("");
//   const [initialHeight, setInitialHeight] = useState(0);
//   const [emojiPickerState, SetEmojiPicker] = useState(false);

//   const invalidMessageRef = useRef(null);

//   const [emptyMessageCheck, setEmptyMessageCheck] = useState(false);
//   const [searchKey, setSearchKey] = useState("");

//   const messageRef = useRef();

//   const { id } = router.query;

//   useEffect(() => {
//     if (!router.isReady) return;

//     setToLocUserId(localStorage.getItem("userId"));
//     dispatch(
//       fetchChatMessageStart({
//         user_id: id,
//       })
//     );

//     if (messageRef.current) {
//       messageRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//         inline: "nearest",
//       });
//     }
//   }, [router.isReady]);

//   const options = {
//     broadcaster: "pusher",
//     key: "dfc2bd8513963367dd0e",
//     cluster: "eu",
//     authorizer: (channel, options) => {
//       return {
//         authorize: (socketId, callback) => {
//           axios
//             .post("/api/user/chat/auth", {
//               socket_id: socketId,
//               channel_name: channel.name,
//             })
//             .then((e) => {
//               callback(false, e.data);
//             })
//             .catch(function (error) {
//               console.log(error.toJSON());
//             });
//         },
//       };
//     },
//   };

//   useEffect(() => {
//     const echo = new Echo(options);
//     if (chatUsers.loading === false && chatUsers.data.total > 0) {
//       // setToUserId(chatUsers.data.users[0].to_user_id);
//       const chatter = echo.private(`chat.${getCookie("userId")}`);

//       chatter.listen(".message", (e) => {
//         dispatch(sendMessageStart([e.message]));
//       });
//     }

//     return () => echo.leave(`chat.${getCookie("userId")}`);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chatUsers.loading]);

//   useEffect(() => {
//     const objDiv = document.getElementById("options-holder");
//     if (objDiv != null) {
//       let differenceNumber =
//         objDiv.offsetHeight > objDiv.scrollHeight
//           ? objDiv.offsetHeight - objDiv.scrollHeight
//           : objDiv.scrollHeight - objDiv.offsetHeight;

//       if (differenceNumber > 280) {
//         objDiv.scrollTop = objDiv.scrollHeight;
//       } else {
//         objDiv.scrollTop = initialHeight;
//         setInitialHeight(initialHeight + 20);
//       }
//     }
//     if (messageRef.current) {
//       messageRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//         inline: "nearest",
//       });
//     }
//   }, [chatMessages.data.messages]);

//   return <div>UserChat</div>;
// };

// export default UserChat;
