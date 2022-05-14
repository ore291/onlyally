import { RiPriceTag3Line } from "react-icons/ri";
import GroupCard from "../groups/GroupCard"
import CreatorCard from "../creators/CreatorCard";
import Button from "../Button";
import { CgNotes } from "react-icons/cg";
import { MdOutlineBolt } from "react-icons/md";

import { FiThumbsUp } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";
import Image from "next/image";
import { useSelector } from "react-redux";

const ChannelFeedSideBar = () => {
 
  return (
    <div className="grid grid-cols-1 space-y-5 pr-1 mt-3  sticky -top-96 ">
      <div className="flex flex-col w-full space-y-2  bg-white rounded-md shadow-md p-2 pb-4 border">
        <div className="py-2  text-gray-600">
          <input
            className="border border-gray-100 bg-gray-200 h-8 flex-1 w-full rounded-full text-sm focus:ring-0 focus:border-gray-100 focus:outline-none"
            type="search"
            name="search"
            placeholder="Search for posts"
          />
        </div>
        <div className="flex items-center space-x-2">
          <MdOutlineBolt className="w-5 h-5 text-gray-400" />
          <p className="font-medium text-sm">Boost Page</p>
        </div>
        <div className="flex items-center space-x-2">
          <FiThumbsUp className="w-4 h-4 text-gray-400" />
          <div className="flex flex-col justify-center">
            <p className="font-medium text-sm">2 People like this</p>
            <span className="text-xs font-medium text-green-500">
              +0 This week
            </span>
          </div>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <CgNotes className="w-4 h-4 text-gray-400" />
          <p className="font-medium text-sm">3 post</p>
        </div>
        <div className="flex items-center space-x-2">
          <RiPriceTag3Line className="w-4 h-4 text-gray-400" />
          <p className="font-medium text-sm">Entertainment</p>
        </div>
        <div className="flex items-center space-x-2">
          <MdInfoOutline className="w-4 h-4 text-gray-400" />
          <p className="font-medium text-sm">We are the fans of afam</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={"/profile_avatar_full.jpg"}
              className="rounded-full"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="font-medium text-sm">
            This channel is owned by @afamdman
          </p>
        </div>
      </div>
      <div className="flex flex-col pt-2 pb-5 space-y-2 bg-white rounded-md shadow-lg border">
        <div className="flex items-center justify-start py-2 px-2 space-x-2 ">
          <div className="p-1 rounded-full bg-[#FF7043]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                fill="currentColor"
                d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"
              ></path>
            </svg>
          </div>{" "}
          <h1 className="text-lg font-medium">Pro members</h1>
        </div>
        <div className="rounded-md grid grid-cols-3 mx-2 bg-[#FFD5C8] overflow-hidden relative p-2">
          <div className="absolute -right-3 -bottom-2 z-10">
            <div className="h-32 w-28 relative">
              <Image src={"/pro-me.png"} layout="fill" />
            </div>
          </div>
          <div className="flex-flex-col col-span-2 ">
            <h2 className="text-lg font-semibold">
              Upgrade To Pro &amp; Put Me Here
            </h2>
            <div className="w-20 p-1 py-2 mt-5 rounded-md row-container bg-[#FF6F45] cursor-pointer">
              <span className="text-white text-sm font-semibold">Upgrade</span>
            </div>
          </div>
        </div>{" "}
        <div className="grid grid-cols-3 gap-2 px-2">
          {/* {creators.map((creator) => (
            <CreatorCard
              username={creator.username}
              image={creator.image}
              key={creator.username}
            />
          ))} */}
        </div>
      </div>{" "}
      <div className="p-2 rounded-md border shadow-lg bg-white">
        <div className="flex items-center justify-between w-full border-b pb-3">
          <h3 className="text-lg font-semibold">Top Pages</h3>
          <p className="text-sm font-medium text-blue-400 cursor-pointer">See All</p>
        </div>
        <div className="grid grid-cols-1 space-y-2 py-2">
            {
              [...Array(6)].map((_, i)=> (
                <div className="flex justify-between items-center space-x-6" key={i}>
                <div className=" w-12 h-12 relative">
                  <Image
                    src="/profile_avatar_full.jpg"
                    alt="side-img"
                    layout="fill"
                    objectFit="cover"
                    className="relative rounded-full w-12 h-12"
                  />
                </div>
                <div className="flex flex-col space-y-.5">
                  <p className="font-bold  text-gray-600">Graphic Design</p>
                  <span className="text-sm font-semibold">345k Following</span>
                </div>
                <Button text="Subscribe" active={true} />
              </div>
              ))
            }
        </div>
      </div>
    </div>
  );
};

export default ChannelFeedSideBar;
