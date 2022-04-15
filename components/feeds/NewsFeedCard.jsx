import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import {
  BsThreeDots,
  BsHeart,
  BsHeartFill,
  BsChat,
  BsHexagon,
} from "react-icons/bs";
import { HiOutlineEmojiHappy, HiPaperAirplane } from "react-icons/hi";
import ReadMoreReact from "read-more-react";
import { useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Comments from "./Comments";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

const NewsFeedCard = ({
  image,
  user,
  likeCount,
  commentCount,
  description,
  popularComments,
  time,
  main,
}) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="sm:rounded-2xl bg-white sm:border shadow-md ">
      <div className="flex flex-1 p-1 px-2 sm:px-4 sm:p-4 border-b">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <img
            src={user.image}
            alt=""
            className="object-cover object-center w-12 h-12   rounded-full shadow-sm bg-gray-500 border-gray-700"
          />
          <div className="flex space-x-1 text-sm md:text-lg  items-center justify-center">
            <h2 className=" font-semibold leading-none">{user.username}</h2>
            <FaCheckCircle className="w-3 h-3 text-playRed" />

            <span className="inline-block  text-xs leading-none text-gray-600">
              @afamdman
            </span>
          </div>
        </div>
        <div className="row-container space-x-1  ml-auto">
          <span className="text-xs sm:text-sm text-gray-600 font-light ">
            {time}
          </span>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group  hover:text-opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <BsThreeDots className="h-6 w-6 font-semibold rotate-90 lg:rotate-0" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-[250px] lg:w-[20vw]  mt-3 transform shadow-md right-4 lg:translate-x-1/2 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg ">
                      <div className="relative grid gap-y-2 bg-white p-1 grid-cols-1">
                        <div className="hover:bg-gray-100 hover:text-red-500  border-b h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                          <p className="font-bold text-xs">Copy link to post</p>
                        </div>
                        <div className="hover:bg-gray-100 hover:text-red-500  h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                          <p className="font-bold text-xs">Report</p>
                        </div>
                        <div className="hover:bg-gray-100 hover:text-red-500  h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                          <p className="font-bold text-xs">
                            Add to blocklists.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      <div className=" p-1 sm:p-2 text-lg">
        <ReadMoreReact
          min={100}
          max={200}
          readMoreText="Read more..."
          text={description}
        />
      </div>
      <div>
        {" "}
        <div>
          <div className="flex  rounded object-center bg-transparent cursor-pointer">
            <div className="object-center p-0 lg:p-1 h-full w-[100%] my-0 mx-auto">
              {/* <div className="h-full w-full relative">
                <Image src={image} layout="fill" priority objectFit="cover"  className="block mx-auto h-full w-full max-w-[800px]"/>
              </div> */}
              <img
                src={image}
                height="100%"
                width="100%"
                alt="image attached to post"
                className="block mx-auto w-full max-w-[800px]"
              ></img>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
                      {" "}
                      <div>
                        <div className="flex border border-solid border-grey rounded object-center bg-gray-200">
                          <div className="player-wrapper">
                            <ReactPlayer
                              className="react-player"
                              url={media}
                              width="100%"
                              height="100%"
                              controls
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
      <div className="p-3 px-7">
        <div className="flex items-center justify-between px-2">
          <button
            type="button"
            title="Like post"
            className="flex items-center justify-center space-x-1"
          >
            <BsHeart className="news-feed-card-icon" />
            <span className="text-xs">{likeCount}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            type="button"
            title="Add a comment"
            className="flex items-center justify-center space-x-1"
          >
            <div className="relative news-feed-card-icon">
              <Image src="/materials/icons8-speech-48.png" layout="fill" alt="" />
            </div>
            <span className="text-xs">{commentCount}</span>
          </button>
          <button
            type="button"
            title="Donate to post"
            className="flex items-center justify-center space-x-1"
          >
            <div className="relative w-5 h-5">
              <Image src="/tips.png" layout="fill" objectFit="cover" alt="" />
            </div>
            <span className="text-xs">Tip</span>
          </button>

          <button
            type="button"
            title="Bookmark post"
            className="flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="news-feed-card-icon"
            >
              <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
            </svg>
          </button>
        </div>
        <div className="">
          {showComments ? (
            <div className="border-t border-gray-600 mt-4">
              <p
                onClick={() => setShowComments(false)}
                className="w-full py-1 bg-transparent border-none rounded text-sm pl-4 text-playRed cursor-pointer"
              >
                Hide Comments
              </p>
              <Comments comments={popularComments} />
              <div className="flex items-center mt-2">
                <div className="w-10 h-10 relative rounded-full mr-2">
                  <Image
                    src={"/profile_avatar_full.jpg"}
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
                <form className="bg-gray-100 flex items-center px-2 rounded-2xl flex-1">
                  <TextareaAutosize
                    maxLength="1280"
                    rows={1}
                    maxRows={4}
                    placeholder="Add a comment"
                    className="rounded-2xl flex-1 resize-none outline-0 border-none bg-gray-100 text-sm focus:outline-0 ring-0 focus:ring-0"
                  />
                  <div className="flex space-x-1 items-center justify-center ">
                    <HiOutlineEmojiHappy className="commentBtn" />
                    <div className="relative w-9 h-9 cursor-pointer lg:commentBtn">
                      <Image src="/comment.png" layout="fill" alt="" />
                    </div>
                    {/* <HiPaperAirplane className="commentBtn rotate-90" /> */}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <p
              onClick={() => setShowComments(true)}
              className="w-full py-1 bg-transparent border-none rounded text-sm pl-4 text-playRed cursor-pointer"
            >
              View {commentCount} Comments
            </p>
          )}
        </div>
      </div>
      <div />
    </div>
  );
};

export default NewsFeedCard;
