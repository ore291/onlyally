import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import ChannelCard from "../channels/ChannelCard";
import NewsFeedCard from "../feeds/NewsFeedCard";
import ShopList from "../shop/ShopList";
import GroupCard from "../groups/GroupCard";
import { MdSmartDisplay, MdPhotoSizeSelectActual } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";
import Image from "../helpers/CustomImage";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUserPostsStart } from "../../store/slices/OtherUsersSlice";
import NoDataFound from "../NoDataFound/NoDataFound";
import Link from "next/link";
import ExplorePostCard from "../explore/ExplorePostCard";
import { fetchOtherUserGroupsStart } from "../../store/slices/groupsSlice";
import { fetchOtherUserChannelsStart } from "../../store/slices/channelsSlice";
import { fetchOtherModelProductListStart } from "../../store/slices/productsSlice";
import { BsGrid } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const OtherUserProfileTabs = ({ other_user_username: username }) => {
  const posts = useSelector((state) => state.otherUser.userPosts);
  const user = useSelector((state) => state.otherUser.userDetails.data.user);
  const router = useRouter();

  const groups = useSelector((state) => state.groups.otherUserGroups);
  const channels = useSelector((state) => state.channels.otherUserChannels);
  const dispatch = useDispatch();

  const [list, setList] = useState(getCookie("list"));

  const toggleList = (bool) => {
    setCookie("list", bool);
    setList(bool);
  };

  useEffect(() => {
    if (!hasCookie("list")) {
      setCookie("list", false);
    }
  }, []);

  const setActiveSection = (key) => {
    if (key === 0)
      dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: username,
          type: "all",
        })
      );
    else if (key === 1)
      dispatch(
        fetchOtherUserChannelsStart({
          user_id: user.user_id,
        })
      );
    else if (key === 2)
      dispatch(
        fetchOtherUserGroupsStart({
          user_id: user.user_id,
        })
      );
    else if (key === 3)
      dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: username,
          type: "image",
        })
      );
    else if (key === 4)
      dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: username,
          type: "video",
        })
      );
    else if (key === 5)
      dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: username,
          type: "audio",
        })
      );
    else if (key === 6)
      dispatch(
        fetchOtherModelProductListStart({
          user_unique_id: username,
        })
      );
  };

  let [categories] = useState([
    "Timeline",
    "Channel",
    "Groups",
    "Photos",
    "Videos",
    "Audios",
    "Shop",
  ]);
  const images = [
    "person2",
    "person5",
    "person6",
    "person7",
    "person8",
    "person2",
    "person3",
    "person8",
  ];

  return (
    <div>
      <Tab.Group
        onChange={(index) => {
          setActiveSection(index);
        }}
      >
        <Tab.List>
          <div className="flex justify-center space-x-0 md:space-x-1 items-center  border dark:!border-gray-700 rounded-b-lg shadow-md py-3 bg-slate-50 dark:!bg-gray-900 dark:text-gray-400">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-auto h-8 px-1 md:px-4 text-xs md:text-sm leading-5 font-semibold ",
                    "focus:outline-none focus:ring-0 ",
                    selected
                      ? "text-lightPlayRed underline decoration-lightPlayRed underline-offset-8 decoration-[3px] font-bold"
                      : ""
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
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1"
            )}
          >
            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div className="p-2 grid grid-cols-1 gap-y-3">
                {posts.data.posts.map((post) => (
                  <NewsFeedCard post={post} key={post.post_id} />
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
            {/* {posts.data.posts.map((post, index) => (
                <NewsFeedCard post={post} key={index} />
              ))} */}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1  flex flex-col space-y-3"
            )}
          >
            {channels.loading ? (
              "Loading..."
            ) : (
              <div className="p-2 bg-white dark:!bg-gray-900 dark:text-gray-400 dark:!border-gray-700 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-2 my-5">
                  <div className="side-icon">
                    <MdSmartDisplay className="text-white h-6 w-6" />
                  </div>
                  <h1 className="text-xl md:text-3xl font-semibold">
                    {user.name}&apos;s Channels
                  </h1>
                </div>
                {channels.data.filter(
                  (channel) => channel.user_id === user.user_id
                ).length > 0 ? (
                  <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {channels.data
                      .filter((channel) => channel.user_id === user.user_id)
                      .map((channel, index) => (
                        <ChannelCard
                          key={channel.id}
                          profile={true}
                          channel={channel}
                        />
                      ))}
                  </div>
                ) : (
                  <NoDataFound />
                )}
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1"
            )}
          >
            {groups.loading ? (
              "Loading..."
            ) : (
              <div className="p-2 bg-white dark:!bg-gray-900 dark:text-gray-400 dark:!border-gray-700 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-2 my-5">
                  <div className="side-icon">
                    <MdSmartDisplay className="text-white h-6 w-6" />
                  </div>
                  <h1 className="text-xl md:text-3xl font-semibold">
                    {user.name}&apos;s Groups
                  </h1>
                </div>
                {groups.data.filter((group) => group.user_id === user.user_id)
                  .length > 0 ? (
                  <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {groups.data
                      .filter((group) => group.user_id === user.user_id)
                      .map((group, index) => (
                        <GroupCard
                          key={group.id}
                          profile={true}
                          group={group}
                        />
                      ))}
                  </div>
                ) : (
                  <NoDataFound />
                )}
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1"
            )}
          >
            <div className="flex items-center justify-between  my-5 px-2">
              <div className="flex items-center space-x-2">
                <div className="side-icon">
                  <MdPhotoSizeSelectActual className="text-white h-6 w-6" />
                </div>
                <h1 className="text-2xl font-semibold">Photos</h1>
              </div>
              <div className="flex items-center space-x-2">
                <BsGrid
                  onClick={() => toggleList(false)}
                  className={`${
                    !list ? "!text-lightPlayRed" : "!text-lightPlayRed/30"
                  } dark:text-white h-6 w-6 cursor-pointer`}
                />
                <AiOutlineMenu
                  onClick={() => toggleList(true)}
                  className={`${
                    list ? "!text-lightPlayRed" : "!text-lightPlayRed/30"
                  } dark:text-white h-6 w-6 cursor-pointer`}
                />
              </div>
            </div>

            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div
                className={`grid ${
                  list ? "grid-cols-1" : "grid-cols-3 md:grid-cols-4"
                }  gap-1`}
              >
                {posts.data.posts.map((post) =>
                  post.postFiles.length > 0
                    ? post.postFiles.map((p_file, i) => (
                        <div key={post.post_id}>
                          <div
                            onClick={() =>
                              router.push("/post/" + post.post_unique_id)
                            }
                            className={`inner list-none relative ${
                              list ? "h-[250px] md:h-[350px]" : "h-[150px]"
                            } w-full cursor-pointer`}
                          >
                            {post.payment_info.is_user_needs_pay == 1 ? (
                              <Image
                                className="rounded cursor-pointer blur-[20px]"
                                src={p_file.blur_file}
                                alt={post.post_unique_id}
                                objectFit="cover"
                                objectPosition="center center"
                                layout="fill"
                              />
                            ) : (
                              <Image
                                className="rounded cursor-pointer "
                                src={p_file.file}
                                alt={post.post_unique_id}
                                objectFit="cover"
                                objectPosition="center center"
                                layout="fill"
                              />
                            )}
                          </div>
                        </div>
                      ))
                    : ""
                )}
              </div>
            ) : (
              <NoDataFound></NoDataFound>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1"
            )}
          >
            <div className="flex items-center justify-between  my-5 px-2">
              <div className="flex items-center space-x-2">
                <div className="side-icon">
                  <FaVideo className="text-white h-6 w-6" />
                </div>
                <h1 className="text-2xl font-semibold">Videos</h1>
              </div>
              <div className="flex items-center space-x-2">
                <BsGrid
                  onClick={() => toggleList(false)}
                  className={`${
                    !list ? "!text-lightPlayRed" : "!text-lightPlayRed/30"
                  } dark:text-white h-6 w-6 cursor-pointer`}
                />
                <AiOutlineMenu
                  onClick={() => toggleList(true)}
                  className={`${
                    list ? "!text-lightPlayRed" : "!text-lightPlayRed/30"
                  } dark:text-white h-6 w-6 cursor-pointer`}
                />
              </div>
            </div>

            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div
                className={`grid ${
                  list ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                }  gap-1 gap-y-3`}
              >
                {posts.data.posts.map((post) => (
                  <ExplorePostCard
                    post={post}
                    key={post.post_id}
                    type="video"
                  />
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
            {/* {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2  gap-1">
                {posts.data.posts.map((post) =>
                  post.postFiles.length > 0
                    ? post.postFiles.map((p_file, i) => (
                        <ul className="list-unstyled list-none" key={i}>
                          <li className="box">
                            <div className="p-[1px] w-full h-auto object-cover relative">
                              <ReactPlayer
                                light={p_file.preview_file}
                                url={p_file.post_file}
                                controls={true}
                                width="100%"
                                height="100%"
                                className="post-video-size !w-full min-h-[30em] !h-[30em] object-cover"
                              />
                            </div>
                          </li>
                        </ul>
                      ))
                    : ""
                )}
              </div>
            ) : (
              <NoDataFound />
            )} */}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1"
            )}
          >
            <div className="flex items-center justify-between  my-5 px-2">
              <div className="flex items-center space-x-2">
                <div className="side-icon">
                  <GiSpeaker className="text-white h-6 w-6" />
                </div>
                <h1 className="text-2xl font-semibold">Audio</h1>
              </div>
              <div className="flex items-center space-x-2">
                <BsGrid
                  onClick={() => toggleList(false)}
                  className={`${
                    !list ? "!text-lightPlayRed" : "!text-lightPlayRed/30"
                  } dark:text-white h-6 w-6 cursor-pointer`}
                />
                <AiOutlineMenu
                  onClick={() => toggleList(true)}
                  className={`${
                    list ? "!text-lightPlayRed" : "!text-lightPlayRed/30"
                  } dark:text-white h-6 w-6 cursor-pointer`}
                />
              </div>
            </div>

            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div
                className={`grid ${
                  list ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                }  gap-2`}
              >
                {posts.data.posts.map((post) => (
                  <ExplorePostCard
                    post={post}
                    key={post.post_id}
                    type="audio"
                  />
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white dark:!bg-gray-900 dark:text-gray-400 rounded-xl p-1"
            )}
          >
            <ShopList otherUser={true} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default OtherUserProfileTabs;
