import Image from "next/image";
import Button from "../Button";
import UserCardPopup from "./UserCardPopup";
import { IoMdPersonAdd } from "react-icons/io";
import Link from "next/link";

const UserCard = ({ creator }) => {
  return (
    <>
      <div className="bg-white border shadow-lg rounded-lg max-w-3xl p-3 px-5 flex items-center justify-between md:!hidden">
        <div className="row-container space-x-2">
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image
              src={creator.picture}
              alt="side-img"
              layout="fill"
              objectFit="cover"
              className="relative rounded-full"
            />
          </div>
          <p className="text-center font-medium text-lg truncate text-[rgba(0,0,0,.9);] cursor-pointer">
            {creator.name}
          </p>
        </div>
        <div className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer">
          <Link href={`/profile/${creator.user_unique_id}`} passHref>
            <a href="#">
              <IoMdPersonAdd className="text-white h-6 w-6" />
            </a>
          </Link>
        </div>
      </div>
      <div className="hidden md:inline-block !p-0 !items-center side-container relative rounded-lg">
        <div className="relative w-full h-[90px] rounded-t-lg mb-16">
          <Image
            src={creator.cover}
            objectFit="cover"
            layout="fill"
            className="rounded-t-lg"
          />
          <div className="absolute -bottom-[65%] left-1/3">
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              <Image
                src={creator.picture}
                alt="side-img"
                layout="fill"
                objectFit="cover"
                className="relative rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="col-container pb-5 space-y-2">
          <div className="relative hover-trigger">
            <p className="text-center font-medium text-lg truncate text-[rgba(0,0,0,.9);] cursor-pointer">
              {creator.name}
            </p>
            <div className="absolute bg-white border border-grey-100 p-2 shadow-2xl rounded-lg hover-target z-10 transition-all duration-300 ease-in">
              <UserCardPopup creator={creator} name={creator.name} />
            </div>
          </div>
          <Link href={`/profile/${creator.user_unique_id}`} passHref>
            <div className="w-16 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer">
              <span className="text-sm font-medium">Follow</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserCard;
