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
import Loading from "../../components/Loading";
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
    <div className="lg:flex ">
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
          <div className="w-[95%] ml-auto mr-auto rounded">
            {Bookmarks.loading ? (
              <Loading />
            ) : data.length > 0 ? (
              <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3  gap-1">
                {data.map((post, i) => (
                  <BookmarkComponent post={post} key={i} />
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
