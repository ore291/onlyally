import { useState, useEffect } from "react";
import { RiPriceTag3Line } from "react-icons/ri";
import GroupCard from "./GroupCard";
import { MdLockOutline } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { fetchGroupsStart } from "../../store/slices/groupsSlice";
import { useSelector, useDispatch } from "react-redux";
import GroupCardLoader from "./GroupCardLoader";
import GroupSuggestionLoader from "./GroupSuggestionLoader";
import Sticky from "react-stickynode";
import {
  isAndroid,
  isMobileOnly,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion,
} from "react-device-detect";

const GroupFeedSideBar = ({ group }) => {
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groups.groups);

  useEffect(() => {
    dispatch(fetchGroupsStart());
  }, []);

  return (
    <Sticky enabled={!isMobileOnly}>
      <div className="grid grid-cols-1 space-y-5 p-1  ">
        <div className="flex flex-col w-full space-y-2 border bg-white rounded-md shadow-md p-2 pb-4">
          <div className="py-2  text-gray-600">
            <input
              className="border border-gray-100 bg-gray-200 h-8 flex-1 w-full rounded-full text-sm focus:ring-0 focus:border-gray-100 focus:outline-none"
              type="search"
              name="search"
              placeholder="Search for posts"
            />
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineUserAdd className="w-4 h-4 text-gray-400" />
            <p className="font-medium text-sm">
              Add your friends to this group
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MdLockOutline className="w-4 h-4 text-gray-400" />
            <p className="font-medium text-sm">Private</p>
          </div>
          <div className="flex items-center space-x-2">
            <BsPeople className="w-4 h-4 text-gray-400" />
            <div className="col-container">
              <p className="font-medium text-sm">2 Members</p>
              <span className="text-xs font-medium text-green-500">
                +0 This week
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RiPriceTag3Line className="w-4 h-4 text-gray-400" />
            <p className="font-medium text-sm">Cars and Vehicles</p>
          </div>
          <div className="flex items-center space-x-2">
            <CgNotes className="w-4 h-4 text-gray-400" />
            <p className="font-medium text-sm">{group.posts.length} post</p>
          </div>
        </div>
        <div className="flex flex-col p-2 pb-5 space-y-2 bg-white rounded-md shadow-lg border">
          <div className="flex items-center justify-start py-2 px-1 space-x-2">
            <div className="side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,17c0,0.55-0.45,1-1,1H7c-0.55,0-1-0.45-1-1l0-0.61 c0-1.18,0.68-2.26,1.76-2.73C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2 C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43L0,17 c0,0.55,0.45,1,1,1l3.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2 C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1 c0.4,0.68,0.63,1.46,0.63,2.29V18l3.5,0c0.55,0,1-0.45,1-1L24,16.43z M12,6c1.66,0,3,1.34,3,3c0,1.66-1.34,3-3,3s-3-1.34-3-3 C9,7.34,10.34,6,12,6z"
                  fill="#fff"
                ></path>
              </svg>
            </div>{" "}
            <h1 className="text-xl font-semibold">Suggested Groups</h1>
          </div>
          {groups.loading ? (
            <GroupSuggestionLoader />
          ) : groups.data.length > 0 ? (
            groups.data
              .filter((fgroup) => fgroup.is_member == false)
              .sort(() => 0.5 - Math.random())
              .slice(0, 2)
              .map((group, index) => (
                <GroupCard filter={true} key={index} group={group} />
              ))
          ) : null}
        </div>
      </div>
    </Sticky>
  );
};

export default GroupFeedSideBar;
