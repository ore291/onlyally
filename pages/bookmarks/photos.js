/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Image from "next/image";
//import ProfileNavItem from "../../components/ProfileNavBar";
// import LeftSideBar from "../../components/LeftSideBar";
import NewsFeedCard from "../../components/feeds/NewsFeedCard";
import ProfileNavBar from "../../components/ProfileNavBar";
import { BiChevronDown } from "react-icons/bi";
import { fetchBookmarksPhotoStart } from "../../store/slices/bookmarkSlice";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import BookmarkComponent from "../../components/bookmarks/bookmarkComponent";
export default function Bookmarks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookmarksPhotoStart());
  }, []);
  const Bookmarks = useSelector((state) => state.bookmark.bookmarkPhoto);
  const [number, setNumber] = useState(10);
  const data = Bookmarks.data.posts.slice(1, number);
  console.log(data);
  const incrementArray = () => {
    setNumber((prev) => prev + 10);
  };
  const images = [
    "person2",
    "person5",
    "person6",
    "person7",
    "person8",
    "person2",
    "person3",
    "person8",
  ];
  <MdPhotoSizeSelectActual className="text-white h-5 w-5" />;
  return (
    <div className="flex ">
      <ProfileNavBar className="w-20" />
      <div className="w-full px-1 mx-auto pt-20 mr-16  shadow ">
        <div className=" bg-white p-2 shadow-md">
          <div className="py-1 space-y-2">
            <div className="py-3 mx-2 flex space-x-2 ">
              <div className="side-icon ml-4">
                <MdPhotoSizeSelectActual className="text-white h-5 w-5 " />
              </div>
              <p className=" m-auto font-semibold-sm">Photos</p>
            </div>
            <hr className="w-full py-3 " />
          </div>
          <div className="w-11/12 ml-auto mr-auto rounded">
            {Bookmarks.loading ? (
              <div className="flex">
                <h1 className="italic font-bold">Loading</h1>
                <h1 className="animate-bounce ">.</h1>
                <h1 className="animate-bounce">.</h1>
                <h1 className="animate-bounce">.</h1>
              </div>
            ) : data.length > 0 ? (
              <div className="flex flex-wrap">
                {data.map((post, i) => (
                  <BookmarkComponent
                    className="w-[200px]"
                    post={post}
                    index={post.post_unique_id}
                    key={post.post_unique_id}
                  />
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>

        <div className="flex space-x-2.5 justify-center items-center mt-5 mb-10 cursor-pointer">
          <div className="white-icon ">
            {Bookmarks.data.posts.length > number && (
              <BiChevronDown
                onClick={incrementArray}
                className="text-[#CD0929] h-5 w-5"
              />
            )}
          </div>
          {Bookmarks.data.posts.length > number && (
            <p onClick={incrementArray} className="text-[#CD0929] text-[12px] ">
              Load more photos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
