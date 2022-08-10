import Image from "next/image";
import Button from "../Button";
import { IoMdThumbsUp } from "react-icons/io";
import { BsTagFill } from "react-icons/bs";

const ChannelFilter = ({ channel }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-1 justify-center content-center">
      <div className="rounded-full relative cursor-pointer">
        <Image
          src={channel.avatar}
          alt="side-img"
          width={80}
          height={80}
          objectFit="cover"
          className=" rounded-full  "
        />
      </div>
      <div className="col-span-2 flex space-y-1 lg:flex-row lg:items-center lg:justify-between w-full">
        <div className="flex-col flex space-y-1">
          <p className="font-bold text-sm md:text-2xl truncate cursor-pointer capitalize">
            {channel.name}
          </p>
          <div className="justify-start row-container space-x-1">
            <IoMdThumbsUp className="h-4 wa-4 text-black" />
            <div className="justify-start flex space-x-1">
              <IoMdThumbsUp className="h-4 w-4 text-black" />

              <p className="text-sm text-gray-600">4 people like this</p>
            </div>
            <div className="justify-start flex space-x-1">
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
        <Button
          extraClasses="h-[35px] w-20 px-2 py-1"
          textClass="text-xs md:text-sm font-semibold"
          active={true}
          text="Subscribe"
        />
      </div>
    </div>
  );
};

export default ChannelFilter;
