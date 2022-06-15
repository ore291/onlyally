import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import GroupCard from "./GroupCard";
import { useSelector } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";
import GroupCardLoader from "./GroupCardLoader";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GroupTabs = ({ groupsData }) => {
  const user = useSelector((state) => state.user.profile.data);
  const cookies = getCookies();
  // const groupsData = useSelector((state) => state.groups.groups);

  const checkMember = (memberList) => {
    var members = memberList.map((member) => {
      return member.user_id;
    });

    return members.includes(parseInt(cookies.userId));
  };

  const [groupValues, setGroupValues] = useState([]);

  const filtered = groupsData.data.filter((filterchannel) =>
    checkMember(filterchannel.members)
  );

  // useEffect(() => {
  //   // if(groupsData.data.length > 0){
  //   //   setGroupValues(Object.values(groupsData.data));
  //   // }
   
  // }, [groupsData]);

  let [categories] = useState([
    "Joined Groups",
    "Suggested Groups",
    "My Groups",
  ]);

  let [groups] = useState(["Recently added", "Family", "University", "more"]);

  return (
    <Tab.Group>
      <div className="bg-white rounded-2xl p-1 pb-5 shadow-md">
        <h1 className="text-3xl font-semibold pl-2 py-3">Groups</h1>
        <Tab.List>
          <div className="flex items-center space-x-3 py-3 overflow-x-scroll scrollbar-thin flex-shrink-0">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    " whitespace-nowrap p-2 text-sm leading-5 font-medium",
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
            {/* subscribed groups */}

            <div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {groupsData.data.length > 0
                ? groupsData.data
                    .filter((filterchannel) =>
                      checkMember(filterchannel.members)
                    )
                    .map((group, index) => (
                      <GroupCard key={index} group={group} groupsPage={true} />
                    ))
                : null}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            {/* suggested groups */}

            <div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {groupsData.data.length > 0
                ? groupsData.data
                    .filter(
                      (filterchannel) => !checkMember(filterchannel.members)
                    )
                    .map((group, index) => (
                      <GroupCard key={index} group={group} groupsPage={true} />
                    ))
                : null}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            {/* my groups */}

            <div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              <Link href="/create-group" passHref>
                <div className="h-[250px] min-w-[230px] border-2 shadow-md border-dashed row-container group cursor-pointer">
                  <div className="col-container">
                    <BsPlusCircleFill className="w-10 h-10 text-gray-400 group-hover:text-lightPlayRed transition ease-out duration-200" />
                    <p className="font-medium text-sm text-center text-gray-400 group-hover:text-lightPlayRed transition duration-200 ease-out">
                      Create New Group
                    </p>
                  </div>
                </div>
              </Link>

              {groupsData.data.length > 0
                ? groupsData.data
                    .filter(
                      (filterchannel) => filterchannel.user_id === parseInt(cookies.userId)
                    )
                    .map((group, index) => (
                      <GroupCard key={index} group={group} groupsPage={true} />
                    ))
                : null}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default GroupTabs;
