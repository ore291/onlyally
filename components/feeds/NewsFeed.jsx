import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import NewsFeedCard from "./NewsFeedCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";
import PostsLoader from "../helpers/PostsLoader";
import { fetchHomePostsStart } from "../../store/slices/homeSlice";

const NewsFeed = () => {
  // const feeds = useSelector(state => state.creators.feed)
  const posts = useSelector((state) => state.home.homePost);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const fetchHomeData = () => {
    if (posts.length !== 0) {
      dispatch(fetchHomePostsStart());
    } else {
      setHasMore(false);
    }
  };

  return (
    // <div className="md:col-span-2 flex flex-col place-content-center space-y-2 mb-10">
    <div className="md:col-span-2 w-full">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchHomeData}
        hasMore={hasMore}
        loader={<PostsLoader/>}
        endMessage={
          <h4 className="font-medium text-center">No more posts to show</h4>
        }
      >
        {posts.loading ? (
          <PostsLoader />
        ) : (
          <div className="grid  grid-cols-1 gap-y-2 mb-10 ">
            {posts.data.posts.length > 0 ? (
              posts.data.posts.map((post, index) => (
                <NewsFeedCard
                  // time={feed.time}
                  key={index}
                  index={index}
                  post={post}
                />
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </InfiniteScroll>

      {/* <div className="grid  grid-cols-1 gap-y-2 mb-10 ">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <NewsFeedCard
              // time={feed.time}
              key={index}
              index={index}
              post={post}
            />
          ))
        ) : (
          <NoDataFound />
        )}
        {noMoreData !== true ? (
          <>{isFetching && "Fetching more list items..."}</>
        ) : (
          "no more data"
        )}
      </div> */}
    </div>
  );
};

export default NewsFeed;
