import { useSelector } from "react-redux";
import { useState } from "react";
import NewsFeedCard from "./NewsFeedCard";
const NewsFeed = () => {
  // const feeds = useSelector(state => state.creators.feed)
  const posts = useSelector(state => state.home.homePost.data.posts)
  return (
    // <div className="md:col-span-2 flex flex-col place-content-center space-y-2 mb-10">
    <div className="md:col-span-2 w-full">
      <div className="grid  grid-cols-1 gap-y-2 mb-10 ">
      {posts.map((post, index) => (
        <NewsFeedCard

          // time={feed.time}
          key={index} index={index}
          post = {post}
        />
      ))}
    </div>
    </div>
    
  );
};

export default NewsFeed;
