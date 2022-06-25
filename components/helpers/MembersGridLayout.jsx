import React from "react";
import MemberCard from "./MemberCard";
import { useSelector } from "react-redux";

const MembersGridLayout = () => {
    const members = useSelector((state) => state.groups.groupMembersData)

    console.log(members);
  return (
    <div className="max-w-4xl mx-auto my-20 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  rounded-sm shadow-lg gap-1 md:gap-3 p-2 md:p-5">
        {members.data.map((member, i) => (
          <MemberCard member={member} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MembersGridLayout;
