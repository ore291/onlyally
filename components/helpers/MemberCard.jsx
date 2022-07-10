import React from "react";
import Image from "next/image";
import Button from "../Button";
import MakeAdminMenu from "../settings/MakeAdminMenu";

const MemberCard = ({ member, settings, owner }) => {
  if (settings) {
    return (
      <div className="rounded-md h-[200px] border shadow-sm flex flex-col justify-around items-center relative">
        {member.user_id !== owner && (
          <div className="absolute top-1 right-2">
            <MakeAdminMenu />
          </div>
        )}

        <div className="relative w-20 h-20 rounded-full">
          <Image
            src={member.picture}
            className="rounded-full"
            layout="fill"
            objectFit="cover"
            alt={member.name}
          />
        </div>
        <p>{member.name}</p>
        <Button active={true} text="Remove" />
      </div>
    );
  }

  return (
    <div className="rounded-md h-44 border shadow-sm flex flex-col justify-around items-center">
      <div className="relative w-14 h-14 rounded-full">
        <Image
          src={member.picture}
          className="rounded-full"
          layout="fill"
          objectFit="cover"
          alt={member.name}
        />
      </div>
      <p>{member.name}</p>
      <Button active={true} text="Follow" />
    </div>
  );
};

export default MemberCard;
