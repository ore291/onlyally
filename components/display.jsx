import React from "react";
import Image from "next/image";
import { useState } from "react";
const Display = ({ i, user, handleChatUser }) => {
  const [seeChild, setSeeChild] = useState(false);
  return (
    <div className="relative">
      <div className=" w-fit h-14 relative cursor-pointer " key={user.id}>
        <Image
          onClick={(event) => {
            handleChatUser(event, user.id);
          }}
          onMouseEnter={() => setSeeChild(true)}
          onMouseLeave={() => setSeeChild(false)}
          src={user.picture}
          alt="side-img"
          width="50px"
          height="50px"
          className=" rounded-full"
        />
      </div>
      {seeChild && (
        <div className="animate-display w-[150px] h-[60px] py-[5px] absolute cursor-pointer z-50 bg-white dark:bg-gray-900 row-container left-[-160px] top-[0] rounded-xl drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]">
          <div className="rounded-full relative w-[50px] h-[50px]">
            <Image
              src={user.picture}
              alt="side-img"
              layout="fill"
              objectFit="cover"
              className=" rounded-full object-cover"
            />
          </div>

          <p className="font-medium text-sm  ml-2 capitalize">{user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Display;
