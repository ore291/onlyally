import { useState } from "react";
import { Tab } from "@headlessui/react";
import ChannelCard from "./ChannelCard";
import { useDispatch, useSelector } from "react-redux";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import Link from "next/link";
import { BsPlusCircleFill } from "react-icons/bs";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const ChannelTabs = ({ channels }) => {

  const dispatch = useDispatch();
  let [categories] = useState([
    "Subscribed channels",
    "Suggested Channels",
    "My Channel",
  ]);

  const cookies = getCookies();

  const checkMember = (memberList) => {
    var members = memberList.map((member) => {
      return member.user_id;
    });

    return members.includes(parseInt(cookies.userId));
  };

  // const channels = useSelector(state => state.user.profile.data.channels);

  return (
    <Tab.Group>
      <div className="bg-white rounded-2xl p-1">
        <Tab.List>
          <div className="flex items-center space-x-3 py-3 overflow-x-scroll scrollbar-thin flex-shrink-0">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    " whitespace-nowrap p-2 text-sm leading-5 font-medium ",
                    "focus:outline-none focus:ring-0 ",
                    selected
                      ? "bg-[#FFCFD4] text-textPlayRed rounded-full shadow-lg"
                      : "text-gray-800 bg-white rounded-full shadow-lg"
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
            <div className="p-2  pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {/* {
              
             channels &&  channels.map((channel, index) => (
                <ChannelCard key={index} channel={channel} />
              ))
              
              } */}
              {channels.data.length > 0
                ? channels.data
                    .filter((filterchannel) => filterchannel.is_member == true)
                    .map((channel, index) => (
                      <ChannelCard key={index} channel={channel} />
                    ))
                : null}
            </div>
          </Tab.Panel>

          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {/* {[...Array(10)].map((_, index) => (
                <ChannelCard key={index} channel={index} />
              ))} */}

              {channels.data.length > 0
                ? channels.data
                    .filter((filterchannel) => filterchannel.is_member == false)
                    .map((channel, index) => (
                      <ChannelCard key={index} channel={channel} />
                    ))
                : null}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              <Link href="/create-channel" passHref>
                <div className="h-[250px] min-w-[230px] border-2 shadow-md border-dashed row-container group cursor-pointer">
                  <div className="col-container">
                    <BsPlusCircleFill className="w-10 h-10 text-gray-400 group-hover:text-lightPlayRed transition ease-out duration-200" />
                    <p className="font-medium text-sm text-center text-gray-400 group-hover:text-lightPlayRed transition duration-200 ease-out">
                      Create New Channel
                    </p>
                  </div>
                </div>
              </Link>

              {channels.data.length > 0
                ? channels.data
                    .filter(
                      (filterchannel) =>
                        filterchannel.user_id === parseInt(cookies.userId)
                    )
                    .map((channel, index) => (
                      <ChannelCard key={index} channel={channel} />
                    ))
                : null}

              {/* {[...Array(10)].map((_, index) => (
                <ChannelCard key={index} channel={index} />
              ))} */}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default ChannelTabs;
