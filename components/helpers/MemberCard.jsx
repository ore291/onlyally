import React from "react";
import Image from "next/image";
import Button from "../Button";

const MemberCard = ({ member }) => {
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
