import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchChatUsersStart,
  saveChatUsersStart,
} from "../store/slices/chatSlice";
import Display from "./display";

const RightSideBar = () => {
  const dispatch = useDispatch();

  const chatUsers = useSelector((state) => state.chat.chatUsers);

  useEffect(() => {
    dispatch(fetchChatUsersStart({ search_key: "" }));
  }, []);

  const handleChatUser = (event, user_id) => {
    event.preventDefault();
    dispatch(
      saveChatUsersStart({
        from_user_id: localStorage.getItem("userId"),
        to_user_id: user_id,
      })
    );
  };

  return (
    <aside className="hidden lg:block col-span-1 border-solid dark:border-gray-800  border-black-50  h-screen border-l-[1px] sticky top-16  pt-14  self-start">
      <div className="p-2 flex flex-col justify-center items-center space-y-4">
        {chatUsers.loading
          ? null
          : chatUsers.data && chatUsers.data.users.length > 0
          ? chatUsers.data.users.map((user, i) => (
              <>
                {/* <div className="grid grid-cols-2 z-50 w-fit relative left-[-60px] top-[100%]">
                  <Image
                    src={user.to_userpicture}
                    alt="side-img"
                    width="50px"
                    height="50px"
                    objectFit="cover"
                    className=" rounded-full"
                  />
                  <p>okokokokokoko</p>
                </div> */}
                <Display
                  user={user}
                  i={i}
                  key={user.to_user_id}
                  handleChatUser={handleChatUser}
                  onClick={(event) => {
                   
                    handleChatUser(event, user.to_user_id);
                  }}
                />
              </>
            ))
          : null}
      </div>
    </aside>
  );
};

export default RightSideBar;
