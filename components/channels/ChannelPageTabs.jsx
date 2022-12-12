import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";
import NewsFeedCard from "../feeds/OtherFeedCard";
import ChannelFeedSideBar from "./ChannelFeedSideBar";
import { BsPlusCircle, BsCameraVideo } from "react-icons/bs";
import { RiMusic2Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { MdOutlineBolt } from "react-icons/md";
import Sticky from "react-stickynode";
import { useRouter } from "next/router";
import NoDataFound from "../NoDataFound/NoDataFound";
import ChannelPostModal from "./ChannelPostModal";
import { getCookie } from "cookies-next";
import CommonCenterLoader from "../helpers/CommonCenterLoader";
function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const ChannelPageTabs = () => {
  const posts = useSelector((state) => state.channels.posts);
  const channel = useSelector((state) => state.channels.channelData.data);
  const channels = useSelector((state) => state.channels.channels.data);
  const categories = useSelector((state) => state.channels.categories.data);

  const [channelPostModal, setChannelPostModal] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setChannelPostModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <Tab.Group className="col-span-2">
        <div className="bg-white rounded-2xl  pb-5 shadow-md">
          <Tab.List>
            <div className="flex justify-center space-x-3 items-center p-2">
              {channel.is_member && channel.user_id == getCookie("userId") && (
                <div
                  onClick={() => setChannelPostModal(true)}
                  className="w-20 md:w-auto h-8 px-1 md:px-4 text-xs md:text-sm leading-5 font-medium focus:outline-none focus:ring-0 row-container space-x-2 py-1 text-gray-800 bg-white rounded-full shadow-lg cursor-pointer border hover:text-white hover:bg-lightPlayRed"
                >
                  <BsPlusCircle className="w-5 h-5" />
                  <span>Create</span>
                </div>
              )}
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

          <Tab.Panels className="mt-2 col-span-2">
            {" "}
            {/* <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              create tab
            </Tab.Panel> */}
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              <div className="p-2 grid grid-cols-1 gap-y-5">
                {posts.loading ? (
                  <CommonCenterLoader />
                ) : (
                  <div className="p-2 grid grid-cols-1 gap-y-5">
                    {posts.data.posts.length > 0 ? (
                      posts.data.posts.map((post, index) => (
                        <NewsFeedCard post={post} key={index} />
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              <div className="p-2 grid grid-cols-1 gap-y-5">
                {posts.loading ? (
                  <CommonCenterLoader />
                ) : (
                  <div className="p-2 grid grid-cols-1 gap-y-5">
                    {posts.data.posts.length > 0 ? (
                      posts.data.posts.map((post, index) => (
                        <NewsFeedCard post={post} key={index} />
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
              <div className="p-2 grid grid-cols-1 gap-y-5">
                {posts.loading ? (
                  <CommonCenterLoader />
                ) : (
                  <div className="p-2 grid grid-cols-1 gap-y-5">
                    {posts.data.posts.length > 0 ? (
                      posts.data.posts.map((post, index) => (
                        <NewsFeedCard post={post} key={index} />
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>

      <Sticky>
        <ChannelFeedSideBar
          channel={channel}
          categories={categories}
          channels={channels}
        />
      </Sticky>

      {getCookie("userId") !== null &&
      getCookie("userId") !== "" &&
      channelPostModal === true ? (
        <ChannelPostModal
          channelPostModal={channelPostModal}
          closeModal={closeModal}
          channel_slug={router.query.channel}
        />
      ) : null}
    </div>
  );
};

export default ChannelPageTabs;
