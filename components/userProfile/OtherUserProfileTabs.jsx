import { useState } from "react";
import { Tab } from "@headlessui/react";
import ChannelCard from "../channels/ChannelCard";
import NewsFeedCard from "../feeds/NewsFeedCard";
import ShopList from "../shop/ShopList";
import GroupCard from "../groups/GroupCard";
import { MdSmartDisplay, MdPhotoSizeSelectActual } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {fetchSingleUserPostsStart} from "../../store/slices/OtherUsersSlice";
import NoDataFound from "../NoDataFound/NoDataFound";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
import ReactAudioPlayer from "react-audio-player";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OtherUserProfileTabs = ({other_user_username : username}) => {
  const posts = useSelector((state) => state.otherUser.userPosts);
  const dispatch = useDispatch();
    
  const setActiveSection = (key) => {
    if (key === 0)
      dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: username,
          type: "all",
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
    // else if (key === "store")
    //   dispatch(
    //     fetchOtherModelProductListStart({
    //       user_unique_id: username,
    //     })
    //   );
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
          <div className="flex justify-center space-x-0 md:space-x-1 items-center  border rounded-b-lg shadow-md py-3 bg-slate-50">
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
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
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
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 bg-white rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2 my-5">
                <div className="side-icon">
                  <MdSmartDisplay className="text-white h-6 w-6" />
                </div>
                <h1 className="text-3xl font-semibold">Ore&apos;s Channels</h1>
              </div>
              <div className="p-2 grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, index) => (
                  <ChannelCard key={index} profile={true} channel={index} />
                ))}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-lg mt-16 border">
              <div className="flex items-center space-x-2 my-5">
                <div className="side-icon">
                  <MdSmartDisplay className="text-white h-6 w-6" />
                </div>
                <h1 className="text-3xl font-semibold">
                  Channels joined by Ore
                </h1>
              </div>
              <div className="p-2 grid grid-cols-3 gap-3">
                {[...Array(4)].map((_, index) => (
                  <ChannelCard key={index} profile={true} channel={index} />
                ))}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 bg-white rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2 my-5">
                <div className="side-icon">
                  <MdSmartDisplay className="text-white h-6 w-6" />
                </div>
                <h1 className="text-3xl font-semibold">Ore&apos;s Groups</h1>
              </div>
              <div className="p-2 grid grid-cols-2 gap-3">
                {[...Array(3)].map((_, index) => (
                  <GroupCard key={index} profile={true} />
                ))}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-lg mt-16 border">
              <div className="flex items-center space-x-2 my-5">
                <div className="side-icon">
                  <MdSmartDisplay className="text-white h-6 w-6" />
                </div>
                <h1 className="text-3xl font-semibold">Groups joined by Ore</h1>
              </div>
              <div className="p-2 grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, index) => (
                  <GroupCard key={index} profile={true} />
                ))}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="flex items-center space-x-2 my-5">
              <div className="side-icon">
                <MdPhotoSizeSelectActual className="text-white h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold">Photos</h1>
            </div>

            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3  gap-2">
                {posts.data.posts.map((post) =>
                  post.postFiles.length > 0
                    ? post.postFiles.map((p_file, i) => (
                        <div key={i}>
                          <div className="inner list-none">
                            <Link
                              href={"/post/" + post.post_unique_id}
                              className="list-none"
                              passHref
                            >
                              <Image
                                className="rounded cursor-pointer list-none"
                                src={p_file.post_file}
                                alt={post.post_unique_id}
                                objectFit="cover"
                                height={350}
                                width={300}
                              />
                            </Link>
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
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="flex items-center space-x-2 my-5">
              <div className="side-icon">
                <FaVideo className="text-white h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold">Videos</h1>
            </div>

            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3  gap-2">
                {posts.data.posts.map((post) =>
                  post.postFiles.length > 0
                    ? post.postFiles.map((p_file, i) => (
                        <ul
                          className="list-unstyled list-none"
                          key={i}
                        >
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
            )}
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="flex items-center space-x-2 my-5">
              <div className="side-icon">
                <GiSpeaker className="text-white h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold">Audio</h1>
            </div>

            {posts.loading ? (
              "Loading..."
            ) : posts.data.posts.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {posts.data.posts.map((post) =>
                  post.postFiles.length > 0
                    ? post.postFiles.map((p_file, i) => (
                        <ul className="list-none" key={i}>
                          <li className="w-full list-none">
                            <div className="p-[1px] w-full h-auto object-cover relative">
                              <ReactAudioPlayer
                                src={p_file.post_file}
                                controls={true}
                                width="100%"
                                height="100%"
                                autoPlay={false}
                                className="post-video-size !w-full min-h-[30em] !h-[30em] object-cover"
                                controlsList={"nodownload"}
                              />
                            </div>
                          </li>
                        </ul>
                      ))
                    : ""
                )}{" "}
              </div>
            ) : (
              <NoDataFound />
            )}
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <ShopList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default OtherUserProfileTabs;
