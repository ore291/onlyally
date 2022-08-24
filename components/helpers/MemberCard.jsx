import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Button";
import MakeAdminMenu from "../settings/MakeAdminMenu";
import { deleteGroupMemberStart } from "../../store/slices/groupsSlice";
import { deleteChannelMemberStart } from "../../store/slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";

const MemberCard = ({ member, settings, owner, slug, type }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const unJoin = async () => {
    setLoading(true);
    if (type != null && type === "channel") {
      await dispatch(
        deleteChannelMemberStart({
          slug: slug,
          user_id: member.user_id,
        })
      );
    } else {
      await dispatch(
        deleteGroupMemberStart({
          slug: slug,
          user_id: member.user_id,
        })
      );
    }
  };

  const removeMember = useSelector((state) => state.groups.deleteGroupMember);

  useEffect(() => {
    removeMember.loading === false && setLoading(false);
  }, [removeMember.loading]);

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
        {member.user_id !== owner ? (
          <Button
            onClick={unJoin}
            active={true}
            text={loading ? "Loading..." : "Remove"}
          />
        ) : (
          <p className="text-lg font-semibold text-green-700 ">ADMIN</p>
        )}
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
