import { useState } from "react";
import { Tab } from "@headlessui/react";
import ChannelCard from "./ChannelCard";
import {useDispatch, useSelector} from "react-redux";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChannelTabs = () => {
  let [categories] = useState([
    "Subscribed channels",
    "Suggested Channels",
    "My Channel",
  ]);

  const channels = useSelector(state => state.user.profile.data.channels);

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
            <div className="p-2 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {
              
             channels &&  channels.map((channel, index) => (
                <ChannelCard key={index} channel={channel} />
              ))
              
              }
            </div>
          </Tab.Panel>

          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {[...Array(10)].map((_, index) => (
                <ChannelCard key={index}channel={index}/>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {[...Array(10)].map((_, index) => (
                <ChannelCard key={index}channel={index}/>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default ChannelTabs;
