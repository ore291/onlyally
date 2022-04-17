import { useSelector } from "react-redux";
import { useState } from "react";
import NewsFeedCard from "./NewsFeedCard";
const NewsFeed = () => {
  // const feeds = useSelector(state => state.creators.feed)
  const posts = useSelector(state => state.home.homePost.data.posts)
  return (
    // <div className="md:col-span-2 flex flex-col place-content-center space-y-2 mb-10">
    <div className="col-span-2 ">
      <div className="grid  grid-cols-1 gap-y-2 mb-10 place-content-center">
      {posts.map((post, index) => (
        <NewsFeedCard
          // image={feed.photos[0]}
          // user={feed.user}
          // likeCount={feed.likeCount}
          // commentCount={feed.commentCount}
          // description={feed.description}
          // popularComments={feed.popularComments}
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
