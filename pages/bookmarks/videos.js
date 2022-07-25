/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import ProfileNavBar from "../../components/ProfileNavBar";
import { IoMdVideocam } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineSmile } from "react-icons/ai";
import { useState, useEffect } from "react";
import { fetchBookmarksVideoStart } from "../../store/slices/bookmarkSlice";
import { fetchCommentsStart } from "../../store/slices/commentsSlice";
import { useDispatch, useSelector } from "react-redux";
import NewsFeedCard from "../../components/feeds/NewsFeedCard";


export default function Bookmarks() {
  const videos = ["Will Smith 1.mp4", "Will Smith 2.mp4"];
  const [menu, SetMenu] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookmarksVideoStart());
  }, []);
  const Bookmarks = useSelector((state) => state.bookmark.bookmarkVideo);
  const data = Bookmarks.data.posts;

  return (
    <div className="flex ">
      <ProfileNavBar className="w-20" />
      <div className="w-full px-1 mx-auto pt-20 mr-16  shadow ">
        <div className=" bg-white p-2 shadow-md">
          <div className="py-1 space-y-2">
            <div className="py-3 mx-2 flex space-x-2 ">
              <div className="side-icon ml-4">
                <IoMdVideocam className="text-white h-5 w-5 " />
              </div>
              <p className=" m-auto font-semibold-sm">Videos</p>
            </div>
            <hr className="w-full py-3 " />
          </div>
          <div className="w-11/12 ml-auto mr-auto rounded">
            {Bookmarks.loading ? (
              <h1>Loading</h1>
            ) : data.length > 1 ? (
              data.map((post, i) => (
                <NewsFeedCard
                  post={post}
                  index={post.post_unique_id}
                  key={post.post_unique_id}
                />
              ))
            ) : (
              <p>No data bookmarked video</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2.5 justify-center items-center mt-5">
          <div className="white-icon ">
            <BiChevronDown className="text-[#CD0929] h-5 w-5" />
          </div>
          {data.length > 1 && (
            <p className="text-[#CD0929] text-[12px]">Load more videos</p>
          )}
        </div>
      </div>
    </div>
  );
}
