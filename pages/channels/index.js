import SideNavLayout from "../../components/SideNavLayout";
import ChannelTrend from "../../components/channels/ChannelTrend";
import ChannelTabs from "../../components/channels/ChannelTabs";
import ChannelCard from "../../components/channels/ChannelCard";
import CreatorCard from "../../components/creators/CreatorCard";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserCategoryListStart,
  fetchContentCreatorListStart,
} from "../../store/slices/userCategory";
import {
  fetchChannelsStart,
  fetchTimelinePostsStart,
} from "../../store/slices/channelsSlice";
import { useState, useEffect } from "react";
import CategoryListingLoader from "../../components/explore/CategoryListingLoader";
import GroupCardLoader from "../../components/groups/GroupCardLoader";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";

const Channels = () => {
  const userCategory = useSelector((state) => state.userCategory);
  const channels = useSelector((state) => state.channels.channels);
  const timeline = useSelector((state) => state.channels.timelines);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCategoryListStart());
    dispatch(fetchContentCreatorListStart());
    dispatch(fetchChannelsStart());
    dispatch(fetchTimelinePostsStart());
  }, []);

  return (
    <SideNavLayout title={"Playjor | Channels"}>
      <div className="max-w-[950px] px-1 mx-auto">
        <div className="p-5 my-3 lg:my-6  bg-white dark:!bg-gray-900 dark:!text-gray-300 rounded-xl shadow-lg  outline-none">
          <h1 className="text-3xl font-semibold mb-2">Channels</h1>
          {channels.loading ? (
            <GroupCardLoader />
          ) : (
            <ChannelTabs channels={channels} />
          )}
        </div>
        <div className="p-5 mt-3 lg:mt-6 mb-40 bg-white dark:!bg-gray-900 dark:!text-gray-300 rounded-xl shadow-lg  outline-none ">
          {timeline.loading ? (
            <div className="w-full h-20 row-container">
              <CommonCenterLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {timeline.data.total > 0
                ? timeline.data.posts
                    .slice(0, 8)
                    .map((post, index) => (
                      <ChannelTrend
                        post={post}
                        key={post.post_id}
                        type={
                          post.post_files[0] && post.post_files[0].file_type
                        }
                      />
                    ))
                : null}
            </div>
          )}

          <div className="my-4">
            <h2 className="text-2xl font-semibold mb-2 ml-3">
              Top Content Creators
            </h2>
            <div className="p-2 mt-2 flex overflow-x-scroll space-x-4 py-1  scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
              {userCategory.contentCreatorList.loading ? (
                <CategoryListingLoader />
              ) : userCategory.contentCreatorList.data.content_creators.length >
                0 ? (
                <>
                  {userCategory.contentCreatorList.data.content_creators.map(
                    (creator, index) => (
                      <CreatorCard
                        key={index}
                        main={true}
                        username={creator.username}
                        image={creator.picture}
                        creator={creator}
                      />
                    )
                  )}
                </>
              ) : (
                <div>
                  <h4>No creator Found</h4>
                </div>
              )}
            </div>
          </div>
          
          {timeline.loading ? (
            <div className="w-full h-20 row-container">
              <CommonCenterLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {timeline.data.total > 0
                ? timeline.data.posts
                    .slice(8, timeline.data.posts.length - 1)
                    .map((post, index) => (
                      <ChannelTrend
                        post={post}
                        key={post.post_id}
                        type={
                          post.post_files[0] && post.post_files[0].file_type
                        }
                      />
                    ))
                : null}
            </div>
          )}
        
        </div>
      </div>
    </SideNavLayout>
  );
};

export default Channels;
