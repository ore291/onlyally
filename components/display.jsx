import React from "react";
import Image from "next/image";
import { useState } from "react";
const Display = ({ i, user, handleChatUser }) => {
  const [seeChild, setSeeChild] = useState(false);
  return (
    <div className="relative">
      <div className=" w-fit h-14 relative cursor-pointer " key={i}>
        <Image
          onClick={(event) => {
            console.log(user.to_user_id);
            handleChatUser(event, user.to_user_id);
          }}
          onMouseEnter={() => setSeeChild(true)}
          onMouseLeave={() => setSeeChild(false)}
          src={user.to_userpicture}
          alt="side-img"
          width="50px"
          height="50px"
          className=" rounded-full"
        />
      </div>
      {seeChild && (
        <div className="animate-display w-[150px] h-[60px] py-[5px] px-[30px] absolute cursor-pointer z-50 bg-white grid grid-cols-2 left-[-160px] top-[0] rounded-xl drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]">
          <Image
            src={user.to_userpicture}
            alt="side-img"
            width="50px"
            height="50px"
            objectFit="cover"
            className=" rounded-[50%] "
          />
          <p className="font-bold mt-2 ml-2 ">{user.to_username}</p>
        </div>
      )}
    </div>
  );
};

export default Display;
