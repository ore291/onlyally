import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchChatUsersStart, saveChatUsersStart } from "../store/slices/chatSlice";


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
    <aside className="hidden lg:block col-span-1 border-solid border-black-50  h-screen border-l-[1px] pt-20 sticky top-0">
      <div className="p-2 flex flex-col justify-center items-center space-y-4">
      {chatUsers.loading ? null : chatUsers.data &&
                chatUsers.data.users.length > 0 ? (
                  chatUsers.data.users.map((user, i) => (
                    <div className=" w-14 h-14 relative cursor-pointer" key={i}  onClick={(event) =>
                      handleChatUser(
                        event,
                        user.to_user_id
                      )
                    }>
                      <Image
                        src={user.to_userpicture}
                        alt="side-img"
                        layout="fill"
                        objectFit="cover"
                        className="relative rounded-full"
                      />
                    </div>
                  ))
              ) : (
                null
              )}
       
      </div>
    </aside>
  );
};

export default RightSideBar;
