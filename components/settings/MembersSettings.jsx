import React from "react";
import MemberCard from "../helpers/MemberCard";

const MembersSettings = ({ group }) => {
  return (
    <div className="max-w-4xl mx-auto  ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  rounded-sm shadow-lg gap-1 md:gap-3 p-2 md:p-5">
        {group.members.map((member, i) => (
          <MemberCard
            member={member}
            key={i}
            settings={true}
            owner={group.user_id}
            slug = {group.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersSettings;
