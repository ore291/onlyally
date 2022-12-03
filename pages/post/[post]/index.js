import SideNavLayout from "../../../components/SideNavLayout";
import { fetchSinglePostStart } from "../../../store/slices/postSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NewsFeedCard from "../../../components/feeds/NewsFeedCard";

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state.post.singlePost);
  const { post } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    dispatch(
      fetchSinglePostStart({
        post_unique_id: post,
      })
    );
  }, [router.isReady, post]);

  return (
    <SideNavLayout>
      <div className="max-w-2xl mx-auto my-10 px-1 md:px-0">
        {singlePost.loading ? (
          ""
        ) : (
          <NewsFeedCard
            post={singlePost.data.post}
            index={singlePost.data.post.post_unique_id}
            key={singlePost.data.post.post_unique_id}
          />
        )}
      </div>
    </SideNavLayout>
  );
};

export default Post;
