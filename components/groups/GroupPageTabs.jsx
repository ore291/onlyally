import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";
import NewsFeedCard from "../feeds/NewsFeedCard";
import GroupFeedSideBar from "./GroupFeedSideBar";
import { BsPlusCircle, BsCameraVideo } from "react-icons/bs";
import { RiMusic2Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import GroupPostModal from "./GroupPostModal";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import NoDataFound from "../NoDataFound/NoDataFound";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const GroupPageTabs = () => {
  const posts = useSelector((state) => state.home.homePost.data.posts);
  const group = useSelector((state) => state.groups.groupData.data);
  const [categoryPost, setCategoryPost] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setCategoryPost(false);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
        <div className="col-span-2  my-5">
          <Tab.Group>
            <div className="bg-white rounded-2xl  pb-5 shadow-md">
              <Tab.List>
                <div className="flex justify-center space-x-3 items-center p-2 overflow-hidden overflow-x-auto">
                  <div
                    onClick={() => setCategoryPost(true)}
                    className="w-20 md:w-auto h-8 px-1 md:px-4 text-xs md:text-sm leading-5 font-medium focus:outline-none focus:ring-0 row-container space-x-2 py-1 text-gray-800 bg-white rounded-full shadow-lg cursor-pointer border hover:text-white hover:bg-lightPlayRed"
                  >
                    <BsPlusCircle className="w-5 h-5" />
                    <span>Create</span>
                  </div>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-20 md:w-auto h-8 px-1 md:px-4 text-xs md:text-sm leading-5 font-medium ",
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
                        "w-20 md:w-auto h-8 px-1 md:px-4 text-xs md:text-sm leading-5 font-medium ",
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
                        "w-20 md:w-auto h-8 px-1 md:px-4 text-xs md:text-sm leading-5 font-medium ",
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

              <Tab.Panels className="mt-2 ">
                <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                  <div className="p-2 grid grid-cols-1 gap-y-5">
                    {group.posts.length > 0 ? (
                      group.posts.map((post, index) => (
                        <NewsFeedCard post={post} key={index} />
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                  <div className="p-2 grid grid-cols-1 gap-y-3">
                    {posts.map((post, index) => (
                      <NewsFeedCard post={post} key={index} />
                    ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
                  <div className="p-2 grid grid-cols-1 gap-y-3">
                    {posts.map((post, index) => (
                      <NewsFeedCard post={post} key={index} />
                    ))}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>

        <div className="order-first md:order-last">
          <GroupFeedSideBar group={group} />
        </div>

        {getCookie("userId") !== null &&
        getCookie("userId") !== "" &&
        categoryPost === true ? (
          <GroupPostModal
            categoryPost={categoryPost}
            closeModal={closeModal}
            group_slug={router.query.group}
          />
        ) : null}
      </div>
    </div>
  );
};

export default GroupPageTabs;
