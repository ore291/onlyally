import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";
import NewsFeedCard from "../feeds/NewsFeedCard";
import ChannelFeedSideBar from "./ChannelFeedSideBar";
import { BsPlusCircle, BsCameraVideo } from "react-icons/bs";
import { RiMusic2Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import {MdOutlineBolt} from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChannelPageTabs = () => {
  const posts = useSelector(state => state.home.homePost.data.posts)
  return (
    <Tab.Group>
      <div className="bg-white rounded-2xl  pb-5 shadow-md">
        <Tab.List>
          <div className="flex justify-center space-x-3 items-center p-2">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-auto h-8 px-4 text-sm leading-5 font-medium ",
                  "focus:outline-none focus:ring-0 row-container space-x-2 py-1",
                  selected
                    ? "bg-[#FFCFD4] text-textPlayRed rounded-full shadow-lg"
                    : "text-gray-800 bg-white rounded-full shadow-lg"
                )
              }
            >
              <BsPlusCircle className="w-5 h-5" />
              <span>Create</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-auto h-8 px-4 text-sm leading-5 font-medium ",
                  "focus:outline-none focus:ring-0 row-container space-x-2 py-1",
                  selected
                    ? "bg-[#FFCFD4] text-textPlayRed rounded-full shadow-lg"
                    : "text-gray-800 bg-white rounded-full shadow-lg"
                )
              }
            >
              <CgNotes className="w-5 h-5" />
              <span>All</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-auto h-8 px-4 text-sm leading-5 font-medium ",
                  "focus:outline-none focus:ring-0 row-container space-x-2 py-1",
                  selected
                    ? "bg-[#FFCFD4] text-textPlayRed rounded-full shadow-lg"
                    : "text-gray-800 bg-white rounded-full shadow-lg"
                )
              }
            >
              <BsCameraVideo className="w-5 h-5" />
              <span>Videos</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-auto h-8 px-4 text-sm leading-5 font-medium ",
                  "focus:outline-none focus:ring-0 row-container space-x-2 py-1",
                  selected
                    ? "bg-[#FFCFD4] text-textPlayRed rounded-full shadow-lg"
                    : "text-gray-800 bg-white rounded-full shadow-lg"
                )
              }
            >
              <RiMusic2Line className="w-5 h-5" />
              <span>Sounds</span>
            </Tab>
          </div>
        </Tab.List>
        <div className="grid grid-cols-3">
          <Tab.Panels className="mt-2 col-span-2">
            {" "}
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              create tab
            </Tab.Panel>
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              <div className="p-2 grid grid-cols-1 gap-y-3">
                {posts.map((post, index) => (
                  <NewsFeedCard
                    post={post}
                    key={index}
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              <div className="p-2 grid grid-cols-1 gap-y-3">
              {posts.map((post, index) => (
                  <NewsFeedCard
                    post={post}
                    key={index}
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              <div className="p-2 grid grid-cols-1 gap-y-3">
              {posts.map((post, index) => (
                  <NewsFeedCard
                    post={post}
                    key={index}
                  />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
          <div><ChannelFeedSideBar/></div>
        </div>
      </div>
    </Tab.Group>
  );
};

export default ChannelPageTabs;
