import { useState } from "react";
import { Tab } from "@headlessui/react";

import { FaChevronDown } from "react-icons/fa";
import ChannelFilter from "../channels/ChannelFilter";
import GroupCard from "../groups//GroupCard";
import { useDispatch, useSelector } from "react-redux";
import ExplorePostCard from "./ExplorePostCard";
import ExploreLoader from "./ExploreLoader";
import NoDataFound from "../NoDataFound/NoDataFound";
import CategoryListingIndex from "./CategoryListingIndex";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const dispatch = useDispatch();
  let [categories] = useState(["Post", "Users", "Channels", "Groups"]);
  const posts = useSelector((state) => state.home.homePost.data.posts);
  const explorePosts = useSelector((state) => state.post.explorePosts);
  const channels = useSelector((state) => state.channels.channels);
  const groups = useSelector((state) => state.groups.groups);

  return (
    <Tab.Group>
      <div className="bg-white dark:!bg-gray-900 dark:!text-gray-300 rounded-xl p-1 mb-10 md:mb-60">
        <Tab.List className="row-container p-1 space-x-1 ">
          <div className="bg-[#ecf0f5] dark:bg-gray-500  rounded-full px-1 py-0.5">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-[70px] p-.5 text-sm leading-5 font-medium text-gray-700 ",
                    "focus:outline-none focus:ring-0 ",
                    selected
                      ? "bg-white dark:bg-gray-200 rounded-full shadow-md"
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
          <Tab.Panel
            className={classNames("bg-white dark:bg-gray-900 rounded-xl")}
          >
            {explorePosts.loading ? (
              <ExploreLoader />
            ) : explorePosts.data.posts &&
              explorePosts.data.posts.length > 0 ? (
              <div className="py-2 grid grid-cols-1 md:grid-cols-3  gap-1">
                {explorePosts.data.posts.map((post) => {
                  if (post.postFiles.file_type == "image") {
                    return <ExplorePostCard post={post} key={post.post_id} />;
                  } else if (post.postFiles.file_type == "video") {
                    return (
                      <ExplorePostCard
                        post={post}
                        key={post.post_id}
                        type="video"
                      />
                    );
                  } else if (post.postFiles.file_type == "audio") {
                    return (
                      <ExplorePostCard
                        post={post}
                        key={post.post_id}
                        type="audio"
                      />
                    );
                  }
                })}
              </div>
            ) : (
              <NoDataFound></NoDataFound>
            )}

            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border dark:bg-gray-500 !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
                <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
              </div>
              <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
                Load more Posts
              </p>
            </div>
          </Tab.Panel>
          {/* users tab */}
          <Tab.Panel
            className={classNames("bg-white dark:bg-gray-900  rounded-xl p-1")}
          >
            <CategoryListingIndex />
          </Tab.Panel>
          {/* channels tab */}
          <Tab.Panel
            className={classNames("bg-white dark:bg-gray-900  rounded-xl p-1")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 gap-y-4">
              {channels.data.map((channel, index) => (
                <ChannelFilter key={index} channel={channel} />
              ))}
            </div>
            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border dark:bg-gray-500 !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
                <FaChevronDown className="h-3 w-3 text-lightPlayRed" />
              </div>
              <p className="text-lightPlayRed font-medium text-sm cursor-pointer">
                Load more Channels
              </p>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames("bg-white dark:bg-gray-900  rounded-xl p-3")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
              {groups.data.map((group, index) => (
                <GroupCard key={index} filter={true} group={group} />
              ))}
            </div>
            <div className="w-full row-container space-x-1 py-5">
              <div className="!bg-white border dark:bg-gray-500 !w-8 !h-8 shadow hover:shadow-2xl icon-bg">
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
