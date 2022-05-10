import { useState } from "react";
import { Tab } from "@headlessui/react";
import UserCard from "../userProfile/UserCard";
import { FaChevronDown } from "react-icons/fa";
import ChannelFilter from "../channels/ChannelFilter";
import GroupCard from "../groups//GroupCard";
import { useSelector } from "react-redux";
import NewsFeedCard from "../feeds/NewsFeedCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  let [categories] = useState(["Post", "Users", "Channels", "Groups"]);
  const posts = useSelector(state => state.home.homePost.data.posts)

  return (
    <Tab.Group>
      <div className="bg-white rounded-xl p-1 mb-10 md:mb-60">
        <Tab.List className="row-container p-1 space-x-1 ">
          <div className="bg-[#ecf0f5]  rounded-full px-1 py-0.5">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-[70px] p-.5 text-sm leading-5 font-medium text-gray-700 ",
                    "focus:outline-none focus:ring-0 ",
                    selected
                      ? "bg-white rounded-full shadow-md"
                      : "text-gray-800"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </div>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames("bg-white rounded-xl")}>
          <div className="py-2 grid grid-cols-1 md:grid-cols-2  gap-1">
              {posts.map((post, index) => (
                <NewsFeedCard
                  index={index}
                  post={post}
                  key={index}
                />
              ))}
            </div>
            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
                <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
              </div>
              <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
                Load more Posts
              </p>
            </div>
          </Tab.Panel>
          {/* users tab */}
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="grid grid-cols-4 gap-x-2 md:gap-x-3 mb-8 md:mb-14 mt-8">
              <div className="row-container cursor-pointer px-2 py-2 md:w-auto  bg-gray-100 rounded-lg  shadow-lg text-lightPlayRed">
                <p className="text-xs lg:text-sm font-medium">Business &#38; funds</p>
              </div>
              <div className="row-container cursor-pointer px-3 py-1 md:w-auto  bg-gray-100 rounded-lg  shadow-lg text-lightPlayRed">
                <p className="text-xs lg:text-sm font-medium">Celebrity</p>
              </div>
              <div className="row-container cursor-pointer  px-3 py-1  md:w-auto  bg-gray-100 rounded-lg  shadow-lg text-lightPlayRed">
                <p className="text-xs lg:text-sm font-medium">Cooking</p>
              </div>
              <div className="row-container cursor-pointer  px-3 py-1  md:w-auto  bg-gray-100 rounded-lg  shadow-lg text-lightPlayRed">
                <p className="text-xs lg:text-sm font-medium">Gaming</p>
              </div>
             
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(10)].map((_, index) => (
                <UserCard key={index} />
              ))}
            </div>
            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
                <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
              </div>
              <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
                Load more Users
              </p>
            </div>
          </Tab.Panel>
          {/* channels tab */}
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-20 gap-y-4">
              {[...Array(10)].map((_, index) => (
                <ChannelFilter key={index} />
              ))}
            </div>
            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
                <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
              </div>
              <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
                Load more Channels
              </p>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white rounded-xl p-3",
             
            )}
          >
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
              {[...Array(9)].map((_, index) => (
                <GroupCard key={index} filter={true}/>
              ))}
            </div>
            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
                <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
              </div>
              <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
                Load more Groups
              </p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}
