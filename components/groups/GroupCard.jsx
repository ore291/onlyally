import Image from "next/image";
import Button from "../Button.jsx";
import { BsFillPlusCircleFill } from "react-icons/bs";
const GroupCard = ({
  filter,
  profile,
  groups,
  groupsAll,
  groupsSuggestion,
}) => {
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
          className="fle
        x flex-col justify-center items-start basis-3/5"
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
  if (groups) {
    return (
      <div className="flex flex-col w-[230px] flex-shrink-0 flex-grow-0   rounded-t-lg border shadow-md ">
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
          <div className="flex flex-col items-start pb-1 space-y-2 ">
            <p className="font-bold text-gray-500 text-lg truncate">
              Wedding Ideas
            </p>
            <p className="font-medium text-sm text-gray-400 truncate">
              234k Members 1.7k Post A Day
            </p>
            <div className="flex items-center space-x-8 ">
              <div className="row-container relative ">
                <div className=" w-7 h-7 relative">
                  <Image
                    src="/profile_avatar_full.jpg"
                    alt="side-img"
                    layout="fill"
                    objectFit="cover"
                    className="relative rounded-full w-12 h-12"
                  />
                </div>
                <div className="bg-white p-[2px] rounded-full row-container absolute left-5">
                  <div className=" w-8 h-8 relative">
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
              <div className="">
                <p className="text-sm font-medium text-gray-500">
                  <span className="font-semibold">Alex </span>and 4 friends are
                  members
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between ">
            <Button text="Joined" extraClasses="w-[100px] h-8" active={true} />
            <Button text="View" extraClasses="w-[100px] h-8 bg-gray-100" />
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
          src="https://stackdiary.com/140x100.png"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          alt=""
        />
      </div>

      <div className="absolute bottom-1 left-1 p-1 bg-white   rounded-full">
        <div className="relative w-[75px] h-[75px] rounded-full">
          <Image
            src="/profile_avatar_full.jpg"
            className="rounded-full"
            objectFit="cover"
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-between ml-20 items-center space-x-6">
        <p className="text-sm font-bold">thesidegist</p>
        <Button text="JOIN" active={true} />
      </div>
    </div>
  );
};

export default GroupCard;
