import { useState } from "react";
import { Tab } from "@headlessui/react";
import ChannelCard from "../channels/ChannelCard";
import NewsFeedCard from "../feeds/NewsFeedCard";
import ShopList from "../shop/ShopList";
import GroupCard from "../groups/GroupCard";
import { useSelector } from "react-redux";
import { MdSmartDisplay, MdPhotoSizeSelectActual} from "react-icons/md";
import {FaVideo} from "react-icons/fa";
import {GiSpeaker} from "react-icons/gi";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileTabs = () => {
  const posts = useSelector(state => state.home.homePost.data.posts)
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
      <Tab.Group>
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
            <div className="grid grid-cols-4 gap-2">
            {images.map((image, i) => (
              <Image
                key={i}
                className="h-48 rounded cursor-pointer"
                src={`/images/${image}.jpg`}
                alt={image}
                height={250}
                width={250}
              />
            ))}
          </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="flex items-center space-x-2 my-5">
              <div className="side-icon">
                <FaVideo className="text-white h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold">Videos</h1>
            </div>
            <div className="grid grid-cols-4 gap-2">
            {images.map((image, i) => (
              <Image
                key={i}
                className="h-48 rounded cursor-pointer"
                src={`/images/${image}.jpg`}
                alt={image}
                height={250}
                width={250}
              />
            ))}
          </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="flex items-center space-x-2 my-5">
              <div className="side-icon">
                <GiSpeaker className="text-white h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold">Audio</h1>
            </div>
            <div className="grid grid-cols-4 gap-2">
            {images.map((image, i) => (
              <Image
                key={i}
                className="h-48 rounded cursor-pointer"
                src={`/images/${image}.jpg`}
                alt={image}
                height={250}
                width={250}
              />
            ))}
          </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <ShopList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProfileTabs;
