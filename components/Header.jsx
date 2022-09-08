import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useSession, getSession } from "next-auth/react";
import { MdMenu, MdClose, MdSearch, MdOutlineSearch } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";
import { AiFillBell } from "react-icons/ai";
import HeaderCreateMenu from "./HeaderCreateMenu";
import HeaderMenu from "./HeaderMenu";
import { useRouter } from "next/router";
import { setMainMobileNavState } from "../store/slices/NavSlice";
import {searchUserStart} from "../store/slices/homeSlice";
import CommonCenterLoader from "./helpers/CommonCenterLoader";
import VerifiedBadge from "./handlers/VerifiedBadge";
import {
  getCookies,
  setCookie,
  removeCookies,
  checkCookies,
} from "cookies-next";

const Header = () => {
  const dispatch = useDispatch();
  const [show, toggleShow] = useState(false);
  const router = useRouter();
  const mainNavOpen = useSelector((state) => state.navbar.mainMobileNav);
  const searchUser = useSelector((state) => state.home.searchUser)
  const { data: session, status } = useSession();
  const toggleMobileNav = () => {
    dispatch(setMainMobileNavState(!mainNavOpen));
  };

  const handleSearch = (event) => {
    if (event.currentTarget.value === "") {
      toggleShow(false);
    } else {
      toggleShow(true);
      dispatch(searchUserStart({ key: event.currentTarget.value }));
    }
  };

  return (
    <nav className="bg-[#B30D28] sticky top-0 z-50">
      <div className="lg:max-w-7xl  2xl:max-w-screen-2xl mx-auto  sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {" "}
            <button onClick={() => toggleMobileNav()}>
              <MdMenu className="text-white h-8 w-8 cursor-pointer mr-2" />
            </button>
            <div className="flex-shrink-0">
              <Link href="/" passHref>
                <div className="relative w-32 h-10 lg:inline-grid cursor-pointer">
                  <Image
                    src="/logo.png"
                    objectFit="contain"
                    layout="fill"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
          {/* search */}
          <div className="hidden md:block relative">
            <div className="flex relative mt-1 p-1 pl-2 rounded-full md:text-sm  bg-[#C51834]  w-full  justify-center items-center shadow-md">
              <MdSearch className="h-5 w-5 text-gray-200" />
              <input
                type="text"
                placeholder="Search for people, Channels, Groups and #hashtags"
                name=""
                className="text-white placeholder-[#E08B93] rounded-full placeholder:text-sm w-96 h-5 pl-1 py-4 bg-[#C51834] outline-0 border-0 focus:outline-none focus:ring-0 ring-0"
                id=""
                onChange={handleSearch}
              />
            </div>
            {show && (
              <div className="absolute top-12 border search-dropdown-sec w-[415px] bg-white shadow-2xl text-black p-2 rounded-md z-20">
                <ul className="list-unstyled search-dropdown-list-sec flex flex-col space-y-1 divide-y">
                  {searchUser.loading
                    ? <CommonCenterLoader />
                    : searchUser.data.users.length > 0
                    ? searchUser.data.users.map((user) => (
                        <li className="py-1" key={user.user_unique_id}>
                          <Link href={`/${user.user_unique_id}`} passHref>
                            <div className="search-body flex items-center space-x-2 cursor-pointer">
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
                          </Link>
                        </li>
                      ))
                    : t("no_user_found")}
                </ul>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="items-center justify-end space-x-2 hidden lg:flex  col-span-2">
              <HeaderCreateMenu user={session?.user?.userDetails} />
              <Link href="/messages" passHref>
                <div className="icon-bg">
                  <SiGooglechat className="h-5 w-5 text-white" />
                </div>
              </Link>

              <Link href="/notifications" passHref>
                <div className="icon-bg">
                  <AiFillBell className="h-5 w-5 text-white" />
                </div>
              </Link>

              <HeaderMenu user={session?.user?.userDetails} />
            </div>
          </div>

          <div className=" md:hidden rounded-full bg-[#C51834] flex items-center justify-center p-1 ">
            <MdOutlineSearch className="h-8 w-8 text-white" />
          </div>
        </div>
        {/* end search */}
      </div>
    </nav>

    // <div className="bg-[#B30D28] w-full fixed z-40 shadow-sm border-b">
    //   <div className="grid grid-cols-2 md:grid-cols-9 max-w-6xl p-2  items-center  mx-auto ">
    //     <div className="flex  justify-between md:justify-start items-center space-x-2  col-span-2 ">
    //       <div className="flex items-center justify-center">
    //         <button onClick={() => toggleMobileNav()}>
    //           <MdMenu className="text-white h-8 w-8 cursor-pointer mr-2" />
    //         </button>
    //         <Link href="/" passHref>
    //           <div className="relative w-32 h-10 lg:inline-grid cursor-pointer">
    //             <Image
    //               src="/logo.png"
    //               objectFit="contain"
    //               layout="fill"
    //               alt=""
    //             />
    //           </div>
    //         </Link>
    //       </div>
    //     </div>
    //     <section className="hidden md:flex col-span-5 justify-center">
    //       <div className="flex relative mt-1 p-1 pl-2 rounded-full md:text-sm  bg-[#C51834] w-full  justify-center items-center">
    //         <MdSearch className="h-5 w-5 text-gray-200" />
    //         <input
    //           type="text"
    //           placeholder="Search for people, Channels, Groups and #hashtags"
    //           name=""
    //           className="placeholder-[#E08B93] rounded-full placeholder:text-sm w-full h-5 pl-1 py-4 bg-[#C51834] outline-0 border-0 focus:outline-none focus:ring-0 ring-0"
    //           id=""
    //         />
    //       </div>
    //     </section>
    //     <section className="block md:hidden">
    //        <div className=" rounded-full bg-[#C51834] flex items-center justify-center p-1 col-span-5">
    //       <MdOutlineSearch className="h-8 w-8 text-white" />
    //     </div>
    //     </section>

    //     <div className="items-center justify-end space-x-2 hidden lg:flex  col-span-2">
    //     <HeaderCreateMenu user={session?.user?.userDetails} />
    //       <Link href="/messages" passHref>
    //         <div className="icon-bg">
    //           <SiGooglechat className="h-5 w-5 text-white" />
    //         </div>
    //       </Link>

    //       <Link href="/notifications" passHref>
    //         <div className="icon-bg">
    //           <AiFillBell className="h-5 w-5 text-white" />
    //         </div>
    //       </Link>

    //      <HeaderMenu user={session?.user?.userDetails} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
