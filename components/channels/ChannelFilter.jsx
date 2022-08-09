import Image from "next/image";
import Button from "../Button";
import { IoMdThumbsUp } from "react-icons/io";
import { BsTagFill } from "react-icons/bs";

const ChannelFilter = () => {
  return (
    <div className="flex items-center justify-center space-x-4 pt-2 pb-5 border-b w-full pl-10 md:pl-0 ">
      <div className="rounded-full relative cursor-pointer">
        <Image
          src="/profile_avatar_full.jpg"
          alt="side-img"
          width={110}
          height={110}
          objectFit="cover"
          className=" rounded-full  "
        />
      </div>
      <div className="flex flex-col space-y-1 lg:flex-row lg:items-center lg:justify-between w-full">
        <div className="flex-col">
          <p className="font-bold text-2xl truncate cursor-pointer">
            Davidofans
          </p>
          <div className="justify-start row-container space-x-1">
            <IoMdThumbsUp className="h-4 wa-4 text-black" />

            <p className="text-sm text-gray-600">4 people like this</p>
          </div>
          <div className="justify-start row-container space-x-1">
            <BsTagFill className="h-4 w-4 text-black" />
            <p className="text-sm text-gray-600">Entertainment</p>
          </div>
        </div>
        <Button
          extraclassNamees="h-[35px] w-28"
          textclassName="text-sm font-semibold"
          active={true}
          text="Subscribe"
        />
      </div>
    </div>
  );
};

export default ChannelFilter;
