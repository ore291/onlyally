import React from "react";
import Link from "next/link";
import Image from "next/image";

const ChatUserList = (props) => {
  const { chatUsers } = props;
  return (
    <>
      {chatUsers.contacts.map((chatUser, index) => (
        <a
          key={index}
          className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
          to="#"
          onClick={(event) => props.changeUser(event, chatUser, index)}
        >
          <Image
            objectFit="cover"
            width="40"
            height="40"
            className="rounded-full"
            src={chatUser.picture}
            alt={chatUser.username}
          />

          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-gray-600">
                {chatUser.username}
              </span>
              {/* <span className="block ml-2 text-sm text-gray-600">
                {chatUser.time_formatted}
              </span> */}
            </div>
            <span className="block ml-2 text-sm text-gray-600">
              {/* {chatUser.message} */}...
            </span>
          </div>
        </a>
      ))}
    </>
  );
};

export default ChatUserList;
