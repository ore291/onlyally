import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsFeedCard from "../../components/feeds/OtherFeedCard";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
import SideNavLayout from "../../components/SideNavLayout";
import { fetchSingleTrendingStart } from "../../store/slices/homeSlice";

const TrendingUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.home.singleTrending);
  const { name } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    dispatch(
      fetchSingleTrendingStart({
        name: name,
      })
    );
  }, [router.isReady, name]);

  return (
    <SideNavLayout>
      <div className="max-w-2xl mx-auto my-10 px-1 md:px-0">
        {posts.loading ? (
          <div className="h-screen w-full row-container">
            <CommonCenterLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 w-full gap-y-2">
            {posts.data.length > 0 &&
              posts.data.map((post, id) => (
                <NewsFeedCard
                  post={post}
                  index={post.post_unique_id}
                  key={post.post_unique_id}
                />
              ))}
          </div>
        )}
      </div>
    </SideNavLayout>
  );
};

export default TrendingUser;
