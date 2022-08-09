import Button from "../Button";
import Image from "next/image";
import { AiOutlineEye } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";

const UserCardPopup = ({ creator }) => {
  return (
    <div className="flex flex-col w-[320px] space-y-1 rounded-t-lg ">
      <div className="relative w-full">
        <div className="w-full h-24 relative">
          <Image
            src={creator.cover}
            objectFit="cover"
            layout="fill"
            alt=""
            className="w-full h-24 rounded-lg"
          />
        </div>

        <div className="absolute -bottom-20 left-2 p-1 bg-white  rounded-full">
          <div className="relative h-24 w-24 rounded-full">
            <Image
              src={creator.picture}
              className="rounded-full"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start col-container space-y-0.5  pl-28 ">
        <Link href={`/profile/${creator.user_unique_id}`} passHref>
          <p className="text-2xl font-medium">{creator.name}</p>
        </Link>

        <div className=" row-container space-x-1 ">
          <AiOutlineEye />
          <p
            className={`${
              creator.is_user_online == 0 ? "text-green-500" : "text-gray-500"
            } text-xs font-semibold`}
          >
            {creator.is_user_online == 0 ? "Online" : "Offline"}
          </p>
        </div>
        <div className="row-container space-x-1">
          <AiOutlineEye />
          <p className="text-xs font-semibold">{creator.gender}</p>
        </div>
        <div className="row-container space-x-1">
          <MdLocationOn />
          <p className="text-xs font-semibold">Living in {creator.timezone}</p>
        </div>
        <div className="row-container space-x-2">
          <Link href={`/profile/${creator.user_unique_id}`} passHref>
            <div className="w-24 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer">
              <span className="text-sm font-medium">Follow</span>
            </div>
          </Link>

          <Button
            text="Message"
            extraclassNamees="h-[35px] w-24"
            textclassName="text-sm font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCardPopup;
