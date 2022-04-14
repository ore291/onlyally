import { useState } from "react";
import { useSelector } from "react-redux";
import TopCreators from "../creators/TopCreators.jsx";
import Trending from "../Trending.jsx";
import LikedChannels from "../channels/LikedChannels.jsx";
import LikedGroups from "../groups/LikedGroups.jsx";

const NewsFeedSideBar = () => {
const creators = useSelector(state => state.creators.creators.slice(0,6));
  return (
    <div className="hidden lg:block  w-full  mb-10">
      <div className="flex flex-col space-y-2  ">
        <TopCreators creators={creators} />
        <Trending creators={creators} />
        <LikedChannels />
        <LikedGroups />
      </div>
    </div>
  );
};

export default NewsFeedSideBar;
