import React from "react";
import MemberCard from "../helpers/MemberCard";

const MembersSettings = ({ channel }) => {
  return (
    <div className="max-w-4xl mx-auto  ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  rounded-sm shadow-lg gap-1 md:gap-3 p-2 md:p-5">
        {channel.members.map((member, i) => (
          <MemberCard
            member={member}
            key={i}
            settings={true}
            owner={channel.user_id}
            slug={channel.slug}
            type="channel"
          />
        ))}
      </div>
    </div>
  );
};

export default MembersSettings;
