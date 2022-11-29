import SideNavLayout from "../components/SideNavLayout";
import CommonCenterLoader from "../components/helpers/CommonCenterLoader";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
  fetchFollowersStart,
  fetchFollowingStart,
} from "../store/slices/followerSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsGrid } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import FansCard from "../components/FansCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Followers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFollowersStart());
    dispatch(fetchFollowingStart());
  }, []);

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

  const followers = useSelector((state) => state.follow.followers);
  const following = useSelector((state) => state.follow.following);


  if (following.loading && followers.loading) {
    return (
      <SideNavLayout>
        <div className="w-full h-screen flex items-center justify-center">
          <CommonCenterLoader />
        </div>
      </SideNavLayout>
    );
  }
  return (
    <SideNavLayout>
      <div className="w-full max-w-4xl mx-auto px-2 py-4 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1  p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-lightPlayRed",

                  selected
                    ? "bg-white shadow"
                    : "text-red-300 hover:bg-white/[0.12] hover:text-lightPlayRed"
                )
              }
            >
              {followers.data?.total} Followers
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-lightPlayRed",

                  selected
                    ? "bg-white shadow"
                    : "text-red-300 hover:bg-white/[0.12] hover:text-lightPlayRed"
                )
              }
            >
              {following.data?.total} Following
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                " bg-white p-3",
              
              )}
            >
              <div className="flex items-center justify-between  my-1 ">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-semibold">Fans</h1>
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
              <div  className={`grid gap-0.5 md:gap-2 ${
                  list ? "grid-cols-1" : "grid-cols-2"
                }  gap-1`}>
                {followers.data.followers && followers.data.followers.map((follower, i) => (
                  
                    <FansCard key={i} user={follower.otherUser} followers_page={true}/>
                 
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                " bg-white p-3",
              
              )}
            >
              <div className="flex items-center justify-between  my-1 ">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-semibold">Following</h1>
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
              <div  className={`grid gap-0.5 md:gap-2 ${
                  list ? "grid-cols-1" : "grid-cols-2"
                }  gap-1`}>
                {following.data.followers && following.data.followers.map((follower, i) => (
                  
                    <FansCard key={i} user={follower.otherUser} followers_page={true}/>
                 
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </SideNavLayout>
  );
};

export default Followers;
