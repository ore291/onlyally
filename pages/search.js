import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CreatorCard from "../components/creators/CreatorCard";
import CategoryListingLoader from "../components/explore/CategoryListingLoader";
import VerifiedBadge from "../components/handlers/VerifiedBadge";
import CommonCenterLoader from "../components/helpers/CommonCenterLoader";
import { searchUserStart } from "../store/slices/homeSlice";
import { fetchUserCategoryListStart } from "../store/slices/userCategory";
import Trending from "../components/Trending";
import LikedChannels from "../components/channels/LikedChannels.jsx";
import LikedGroups from "../components/groups/LikedGroups.jsx";


const Search = () => {

    const search = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const [show, toggleShow] = useState(false);
    const searchUser = useSelector((state) => state.home.searchUser);
    const userCategory = useSelector((state) => state.userCategory);

    useEffect(() => {
        dispatch(fetchUserCategoryListStart());
    },[])

    const handleSearch = (event) => {
        if (event.currentTarget.value === "") {
          toggleShow(false);
        } else if (event.currentTarget.value.length > 2) {
          toggleShow(true);
          dispatch(searchUserStart({ key: event.currentTarget.value }));
        }
      };
    
   
    
      const searchRedirect = (user) => {
        search.current.value = "";
        toggleShow(false);
        router.push(`/${user}`);


      };
  return (
    <div className="py-2 px-1">
      <div className="w-full  h-12 flex items-center space-x-1 mx-auto bg-white border-lightPlayRed border-2  rounded-full">
        <input
          ref={search}
          type="text"
          name=""
          placeholder="Search playjor"
          className="placeholder-gray-400 bg-white rounded-full basis-[89%] outline-none focus:ring-0 border-0 focus:outline-none w-full bg-transparent h-full"
          id=""
          onChange={handleSearch}
        />
        <div className="bg-lightPlayRed rounded-full row-container p-1">
             <MdSearch className="h-7 w-7 text-white" />
        </div>
       
      </div>
      {show && (
          <div className=" w-full mx-auto border search-dropdown-sec mt-3 bg-white shadow-2xl text-black p-2 rounded-md z-20">
            <ul className="list-unstyled search-dropdown-list-sec flex flex-col space-y-1 divide-y">
              {searchUser.loading ? (
                <CommonCenterLoader />
              ) : searchUser.data.users.length > 0 ? (
                searchUser.data.users.map((user) => (
                  <li className="py-1" key={user.user_unique_id}>
                    <div
                      onClick={() => searchRedirect(user.user_unique_id)}
                      className="search-body flex items-center space-x-2 cursor-pointer"
                    >
                      <div className="user-img-sec">
                        <img
                          alt="#"
                          src={user.picture}
                          className="user-img w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="search-content text-sm ">
                        <h5 className="flex items-center space-x-1">
                          {user.name}{" "}
                          {user.is_verified_badge == 1 ? (
                            <div className="pl-2">
                              <VerifiedBadge />
                            </div>
                          ) : null}
                        </h5>
                        <p className="text-muted text-xs text-gray-400 f-12">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No User Found</p>
              )}
            </ul>
          </div>
        )}
         <div className="my-5">
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
          <div className="grid grid-cols-1 gap-y-3">
             <Trending />
        <LikedChannels />
        <LikedGroups />
          </div>
         
    </div>
  );
};

export default Search;
