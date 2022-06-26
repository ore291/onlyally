import Image from "next/image";
import Button from "../Button.jsx";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { joinGroupStart } from "../../store/slices/groupsSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const GroupCard = ({
  filter,
  profile,
  groupsPage,
  groupsAll,
  groupsSuggestion,
  group,
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.loginData);

  const router = useRouter();

  const checkMember = (memberList) => {
    var members = memberList.map((member) => {
      return member.user_id;
    });

    return members.includes(user.user_id);
  };

  const handleJoinGroup = async (slug) => {
    dispatch(joinGroupStart(slug));
  };

  if (groupsSuggestion) {
    return (
      <div className="row-container space-x-1">
        <div className="  relative basis-1/5 rounded-md">
          <Image
            src={group.avatar}
            alt="side-img"
            width={60}
            height={60}
            objectFit="cover"
            className="relative rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center items-start space-y-1 basis-3/5">
          <h2 className="font-medium text-lg">{group.name}</h2>
          <p className="text-sm text-gray-400 font-medium">
            {group.members.length} members &middot; 12 posts a week
          </p>
          <div className="flex items-center space-x-2 ">
           
            <div className="flex -space-x-4">
              {group.members.slice(0, 3).map((member, i) => (
                <img
                  key={i}
                  className="relative z-10 inline object-cover h-7 w-7 md:w-8 md:h-8 border-2 border-white rounded-full"
                  src={member.picture}
                  alt="Profile image"
                />
              ))}
            </div>

            <p className="text-sm font-medium text-gray-400">
              <span className="font-semibold whitespace-nowrap">2 friends are members</span>
            </p>
          </div>
        </div>
        <div className="basis-1/5">
          {group.is_member ? (
            group.user_id == getCookie("userId") ? (
              <Button text="Edit" extraClasses="w-[100px] h-8" active={true} />
            ) : (
              <Button
                text="Joined"
                extraClasses="w-[100px] h-8"
                active={true}
              />
            )
          ) : (
            <div
              className="p-2 row-container space-x-1 bg-[#FFE2E5] rounded-md cursor-pointer"
              onClick={(e) => handleJoinGroup(group.slug)}
            >
              <BsFillPlusCircleFill className="w-4 h-4 text-lightPlayRed" />
              <span className="text-sm font-semibold text-textPlayRed">
                Follow
              </span>
            </div>
          )}
          {/* <div className="p-2 row-container space-x-1 bg-[#FFE2E5] rounded-md cursor-pointer" onClick={(e) => handleJoinGroup(group.slug)}>
            <BsFillPlusCircleFill className="w-4 h-4 text-lightPlayRed" />
            <span className="text-sm font-semibold text-textPlayRed">
              Follow
            </span>
          </div> */}
        </div>
      </div>
    );
  }
  if (groupsAll) {
    return (
      <div className="row-container space-x-1">
        <div className="  relative basis-1/5 rounded-md">
          <Link href={`/groups/${group.slug}`} passHref>
            <Image
              src={group.avatar}
              alt="side-img"
              width={50}
              height={50}
              objectFit="contain"
              className="relative rounded-md cursor-pointer"
            />
          </Link>
        </div>
        <Link href={`/groups/${group.slug}`} passHref>
          <div className="flex flex-col justify-center items-start basis-3/5 cursor-pointer">
            <h2 className="font-medium text-lg ">{group.name}</h2>
            <p className="text-sm text-gray-400 font-medium">
              {group.members.length} members
            </p>
          </div>
        </Link>

        <div className="basis-1/5">
          {group.is_member ? (
            group.user_id == getCookie("userId") ? (
              <Button text="Edit" extraClasses="w-16 h-8" active={true} />
            ) : (
              <Button text="Joined" extraClasses="w-16 h-8" active={true} />
            )
          ) : (
            <Button
              text="Join"
              extraClasses="hover:bg-lightPlayRed hover:text-white w-16 h-8"
              onClick={(e) => handleJoinGroup(group.slug)}
            />
          )}
        </div>
      </div>
    );
  }
  if (groupsPage) {
    return (
      <div className="flex flex-col w-[230px] flex-shrink-0 flex-grow-0   rounded-t-lg border shadow-md ">
        <div className="relative h-24 w-full rounded-t-lg">
          <Image
            src={group.cover || "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"}
            alt="fh"
            layout="fill"
            objectFit="cover"
            className=" rounded-t-lg"
          />
        </div>

        <div className="p-2">
          <div className="flex flex-col items-start pb-1 space-y-2 ">
            <p className="font-bold text-gray-500 text-lg truncate">
              {group.name}
            </p>
            <p className="font-medium text-sm text-gray-400 truncate">
              {group.members.length} Members 1.7k Post A Day
            </p>
            <div className="flex items-center space-x-2 ">
              <div className="row-container relative ">
                {group.members && group.members.length > 0
                  ? group.members.slice(0, 2).map((member, i) => {
                      if (i === 1) {
                        return (
                          <div className=" w-7 h-7 relative z-[5]" key={i}>
                            <Image
                              src={member.picture}
                              alt="side-img"
                              layout="fill"
                              objectFit="cover"
                              className="relative rounded-full w-12 h-12"
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className={`bg-white p-[2px] rounded-full row-container z-[10] absolute ${
                              group.members.length > 1 ? "left-5" : "left-2"
                            }`}
                            key={i}
                          >
                            <div className=" w-8 h-8 relative">
                              <Image
                                src={member.picture}
                                alt="side-img"
                                layout="fill"
                                objectFit="cover"
                                className="relative rounded-full w-12 h-12"
                              />
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
              {group.members[0] && (
                <div className="ml-2 pl-6 tracking-tight">
                  <p className="text-xs font-medium text-gray-500">
                    <span className="font-semibold">
                      {group?.members[0]?.name}{" "}
                    </span>
                    and{" "}
                    {group.members.length > 1 ? group.members.length - 1 : ""}{" "}
                    friends are members
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-between ">
            {/* <Button text="Joined" extraClasses="w-[100px] h-8" active={true} />
            <Button text="View" extraClasses="w-[100px] h-8 bg-gray-100" /> */}
            {group.is_member ? (
              group.user_id == getCookie("userId") ? (
                <Button
                  text="Edit"
                  extraClasses="w-[100px] h-8"
                  active={true}
                />
              ) : (
                <Button
                  text="Joined"
                  extraClasses="w-[100px] h-8"
                  active={true}
                />
              )
            ) : (
              <Button
                text="Join"
                active={true}
                onClick={(e) => handleJoinGroup(group.slug)}
              />
            )}
            <Link href={`/groups/${group.slug}`} passHref>
              <Button text="View" extraClasses="w-[100px] h-8 bg-gray-100" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (filter) {
    return (
      <div className="flex flex-col w-full rounded-2xl border shadow-lg ">
        <img src={group.cover || "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"} alt="" className="w-full h-24 rounded-t-lg object-cover" />
        <div className="p-2 py-3">
          <div className="flex flex-col items-start pb-2">
            <p className="font-medium text-sm md:text-xl">{group.name}</p>
            <p className="font-medium text-xs md:text-sm text-gray-400">
              {group.members.length} members
            </p>
          </div>

          <div className="w-full row-container">
            <Button
              text="Join"
              extraClasses="w-full h-8"
              active={true}
              onClick={(e) => handleJoinGroup(group.slug)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (profile) {
    return (
      <div className="flex flex-col w-full  rounded-t-lg border shadow-md ">
        <div className="relative h-24 w-full rounded-t-lg">
          <Image
            src={"https://stackdiary.com/140x100.png"}
            alt="fh"
            layout="fill"
            objectFit="cover"
            className=" rounded-t-lg"
          />
        </div>

        <div className="p-2">
          <div className="flex flex-col items-start pb-1 ">
            <p className="font-bold text-lg">fans of Davido</p>
            <p className="font-medium text-sm text-gray-400">4 Members</p>
          </div>

          <div className="w-full flex items-center justify-between ">
            <Button text="Joined" extraClasses="w-[120px] h-8" active={true} />
            <Button text="View" extraClasses="w-[120px] h-8 bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full relative space-y-1 rounded-t-lg ">
      <div className="w-full h-24 rounded-lg relative">
        <Image
          src={group.cover || "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          alt=""
        />
      </div>

      <div className="absolute bottom-1 left-1 p-1 bg-white   rounded-full">
        <div className="relative w-[75px] h-[75px] rounded-full">
          <Image
            src={group.avatar}
            className="rounded-full"
            objectFit="cover"
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-between ml-20 items-center space-x-6">
        <p className="text-sm font-bold whitespace-nowrap">{group.name}</p>
        {group.is_member ? (
          <Link href={`/groups/${group.slug}`} passHref>
            <Button text="view" active={true} />
          </Link>
        ) : (
          <Button
            text="Join"
            active={true}
            onClick={(e) => handleJoinGroup(group.slug)}
          />
        )}
      </div>
    </div>
  );
};

export default GroupCard;
