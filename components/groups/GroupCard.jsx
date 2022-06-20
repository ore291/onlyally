import Image from "next/image";
import Button from "../Button.jsx";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { joinGroupStart } from "../../store/slices/groupsSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

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

  const checkMember = (memberList) => {

    var members = memberList.map((member) => {
      return member.user_id;
    });

    return members.includes(user.user_id);
  };

  const handleJoinGroup = (slug) => {
    dispatch(joinGroupStart(slug));
  };

  if (groupsSuggestion) {
    return (
      <div className="row-container space-x-1">
        <div className="  relative basis-1/5 rounded-md">
          <Image
            src="/profile_avatar_full.jpg"
            alt="side-img"
            width={70}
            height={70}
            objectFit="cover"
            className="relative rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center items-start space-y-1 basis-3/5">
          <h2 className="font-semibold text-lg">Graphic Design</h2>
          <p className="text-sm text-gray-400 font-medium">
            215k members &middot; 12 posts a week
          </p>
          <div className="flex items-center space-x-8 ">
            <div className="row-container relative ">
              <div className=" w-6 h-6 relative">
                <Image
                  src="/profile_avatar_full.jpg"
                  alt="side-img"
                  layout="fill"
                  objectFit="cover"
                  className="relative rounded-full w-12 h-12"
                />
              </div>
              <div className="bg-white p-[2px] rounded-full row-container absolute left-5">
                <div className=" w-7 h-7 relative">
                  <Image
                    src="/profile_avatar_full.jpg"
                    alt="side-img"
                    layout="fill"
                    objectFit="cover"
                    className="relative rounded-full w-12 h-12"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-400">
              <span className="font-semibold">2 friends are members</span>
            </p>
          </div>
        </div>
        <div className="basis-1/5">
          <div className="p-2 row-container space-x-1 bg-[#FFE2E5] rounded-md cursor-pointer">
            <BsFillPlusCircleFill className="w-4 h-4 text-lightPlayRed" />
            <span className="text-sm font-semibold text-textPlayRed">
              Follow
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (groupsAll) {
    return (
      <div className="row-container space-x-1">
        <div className="  relative basis-1/5 rounded-md">
          <Image
            src="/profile_avatar_full.jpg"
            alt="side-img"
            width={50}
            height={50}
            objectFit="contain"
            className="relative rounded-md"
          />
        </div>
        <div
          className="flex flex-col justify-center items-start basis-3/5"
        >
          <h2 className="font-semibold text-lg">Graphic Design</h2>
          <p className="text-sm text-gray-400 font-medium">215k members</p>
        </div>
        <div className="basis-1/5">
          <Button text="Join" />
        </div>
      </div>
    );
  }
  if (groupsPage) {
    return (
      <div className="flex flex-col w-[230px] flex-shrink-0 flex-grow-0   rounded-t-lg border shadow-md ">
        <div className="relative h-24 w-full rounded-t-lg">
          <Image
            src={group.cover}
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
            <div className="flex items-center space-x-6 ">
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
                            className={`bg-white p-[2px] rounded-full row-container z-[10] absolute ${group.members.length > 1 ? 'left-5' : 'left-2'}`}
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
                    {group.members.length > 1
                      ? group.members.length - 1
                      : ""}{" "}
                    friends are members
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-between ">
            {/* <Button text="Joined" extraClasses="w-[100px] h-8" active={true} />
            <Button text="View" extraClasses="w-[100px] h-8 bg-gray-100" /> */}
            {checkMember(group.members) ? (
              <Button
                text="Joined"
                extraClasses="w-[100px] h-8"
                active={true}
              />
            ) : (
              <Button
                text="Join"
                active={true}
                onClick={(e) => handleJoinGroup(group.slug)}
              />
            )}
            <Link href={`/groups/${group.slug}`} passHref>
            <Button text="View" extraClasses="w-[100px] h-8 bg-gray-100"  />
            </Link>
            
          </div>
        </div>
      </div>
    );
  }
  if (filter) {
    return (
      <div className="flex flex-col w-full rounded-2xl border shadow-lg ">
        <img
          src="https://stackdiary.com/140x100.png"
          alt=""
          className="w-full h-24 rounded-t-lg"
        />
        <div className="p-2 py-3">
          <div className="flex flex-col items-start pb-2">
            <p className="font-semibold text-sm md:text-2xl">graphic</p>
            <p className="font-medium text-xs md:text-sm text-gray-400">
              234 members and 1.7k Post A Day
            </p>
          </div>

          <div className="w-full row-container">
            <Button text="Join" extraClasses="w-full h-8" active={true} />
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
          src={group.cover}
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
        {checkMember(group.members) ? (
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
