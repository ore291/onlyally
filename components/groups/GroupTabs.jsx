import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import GroupCard from "./GroupCard";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GroupTabs = ({ groupsAll, groupsData, categoriesData }) => {
  //   const checkMember = (memberList) =>{
  //     var members =  memberList.map((member)=>{
  //       return member.user_id

  //     })
  //    return members.includes(user.user_id)
  // }

  // const filtered = groupsData.data.filter(filterchannel => checkMember(filterchannel.members));

  // console.log("ore",categoriesData);
  // console.log("ore sort", [...categoriesData].sort((a, b) => b.groups.length - a.groups.length));

  let [categories] = useState([
    "Subscribed Groups",
    "Suggested Groups",
    "My Groups",
  ]);

  const groups = [...categoriesData].sort((a, b) => {
    return b.groups.length - a.groups.length;
  });

  if (groupsAll) {
    return (
      <Tab.Group>
        <Tab.List>
          <div className="flex items-center space-x-3 p-3 overflow-x-scroll scrollbar-thin scroll-smooth scrollbar-hide flex-shrink-0">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-auto h-8 px-3 text-sm leading-5 font-semibold flex items-center space-x-1 ",
                  "focus:outline-none focus:ring-0 pb-3",
                  selected
                    ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                    : "text-gray-500"
                )
              }
            >
              <h2 className="text-sm font-medium whitespace-nowrap">
                All Groups
              </h2>
              <div className="bg-[#FFE2E5] rounded-full p-1 row-container whitespace-nowrap">
                <span className="text-lightPlayRed font-medium text-xs">
                  {groupsData.length}
                </span>
              </div>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-auto h-8 px-3 text-sm leading-5 font-semibold flex items-center space-x-1 ",
                  "focus:outline-none focus:ring-0 pb-3",
                  selected
                    ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                    : "text-gray-500"
                )
              }
            >
              <h2 className="text-sm font-medium whitespace-nowrap">
                Recently added
              </h2>
            </Tab>
            {[...categoriesData]
              .sort((a, b) => b.groups.length - a.groups.length)
              .slice(0, 2)
              .map((group, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      "w-auto h-8 px-3 text-sm leading-5 font-semibold flex items-center space-x-1 ",
                      "focus:outline-none focus:ring-0 pb-3",
                      selected
                        ? "text-lightPlayRed border-b-lightPlayRed border-b-[2px]   font-bold"
                        : "text-gray-500"
                    )
                  }
                >
                  <h2 className="text-sm font-medium whitespace-nowrap">
                    {group.name}
                  </h2>
                </Tab>
              ))}
            <div className="w-auto h-8 px-3  leading-5 font-semibold flex items-center space-x-1 focus:outline-none focus:ring-0 pb-3">
              <Link href="/groups/categories" passHref>
                <h2 className="text-sm font-medium whitespace-nowrap cursor-pointer text-gray-500">
                  More
                </h2>
              </Link>
            </div>
          </div>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[400px] overflow-y-scroll scrollb scrollbar-thin  scroll-smooth">
              {groupsData.map((group, index) => (
                <GroupCard key={index} groupsAll={true} group={group} />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {groupsData
                .slice(0, 10)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((group, index) => (
                  <GroupCard key={index} groupsAll={true} group={group} />
                ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-scroll  scrollbar-thin  scroll-smooth">
              {categoriesData.length > 0 &&
                groupsData
                  .filter(
                    (fgroup) => fgroup.category_id === groups[0].category_id
                  )
                  .map((group, index) => (
                    <GroupCard key={index} groupsAll={true} group={group} />
                  ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-scroll scrollbar-thin  scroll-smooth">
              {categoriesData.length > 0 &&
                groupsData
                  .filter(
                    (fgroup) => fgroup.category_id === groups[1].category_id
                  )
                  .map((group, index) => (
                    <GroupCard key={index} groupsAll={true} group={group} />
                  ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );
  }

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
            {/* {
              groupsData.loading ? (<div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {groupsData.data.filter(filterchannel => checkMember(filterchannel.members)).map((group, index) => (
                <GroupCard key={index} group={group} groupsPage={true} />
              ))}
            </div>) : (
              null
          )
            } */}
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {[...Array(10)].map((_, index) => (
                <GroupCard key={index} groups={true} />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            <div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {[...Array(10)].map((_, index) => (
                <GroupCard key={index} groups={true} />
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default GroupTabs;
