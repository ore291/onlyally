import { useState } from "react";
import { useSelector } from "react-redux";
import TopCreators from "../creators/TopCreators.jsx";
import Trending from "../Trending.jsx";
import LikedChannels from "../channels/LikedChannels.jsx";
import LikedGroups from "../groups/LikedGroups.jsx";

const NewsFeedSideBar = () => {

  return (
    <div className="hidden lg:block  w-full  mb-10">
      <div className="flex flex-col space-y-2  ">
        <TopCreators  />
        <Trending  />
        <LikedChannels />
        <LikedGroups />
      </div>
    </div>
  );
};

export default NewsFeedSideBar;
