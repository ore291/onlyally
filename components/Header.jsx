import Image from "next/image";
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

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const mainNavOpen = useSelector((state) => state.navbar.mainMobileNav);
  const { data: session, status } = useSession();
  const toggleMobileNav = () => {
    dispatch(setMainMobileNavState(!mainNavOpen));
  };

  if (!session)
    return (
      <div className="w-full top-0 sticky bg-playRed bg-blend-lighten z-40">
        <div className="max-w-6xl mx-auto p-2 md:py-2 md:px-0 flex items-center justify-between">
          <div className="relative w-32 h-10 cursor-pointer">
            <Image src="/logo.png" objectFit="contain" layout="fill" alt="" />
          </div>

          <div>
            {router.pathname === "/login" ? (
              <div
                onClick={() => router.push("/register")}
                className="  w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer"
              >
                <span className="font-semibold text-white">Register</span>
              </div>
            ) : (
              <div
                onClick={() => router.push("/login")}
                className="w-40 h-10 rounded-3xl flex items-center justify-center bg-lightPlayRed cursor-pointer"
              >
                <span className="font-semibold text-white">Login</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-[#B30D28] w-full fixed z-40 shadow-sm border-b">
      <div className="flex  max-w-full p-2  items-center justify-between mx-auto ">
        <div className="flex  justify-between lg:justify-start items-center space-x-2 basis-2/12 ">
          <div className="flex items-center justify-center">
            <button onClick={() => toggleMobileNav()}>
              <MdMenu className="text-white h-8 w-8 cursor-pointer mr-2" />
            </button>
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
        <div className="hidden sm:flex relative mt-1 p-1 pl-2 rounded-full sm:text-sm  bg-[#C51834]  basis-6/12 items-center">
          <MdSearch className="h-5 w-5 text-gray-200" />
          <input
            type="text"
            placeholder="Search for people, Channels, Groups and #hashtags"
            name=""
            className="placeholder-[#E08B93] rounded-full placeholder:text-sm w-full h-5 pl-1 py-4 bg-[#C51834] outline-0 border-0 focus:outline-none focus:ring-0 ring-0"
            id=""
          />
        </div>
        <div className="lg:hidden rounded-full bg-[#C51834] flex items-center justify-center p-1 col-span-5">
          <MdOutlineSearch className="h-8 w-8 text-white" />
        </div>
        <div className="items-center space-x-2 hidden lg:flex  col-span-4">
          <HeaderCreateMenu user={session.user.userDetails}/>
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
          {/* <div
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="row-container rounded-full bg-[#BA253D] space-x-1 pr-2 cursor-pointer"
          >
            <Image
              src={session.user.userDetails.picture}
              width={35}
              height={35}
              objectFit="contain"
              className="rounded-full"
            />

            <p className=" text-xs font-semibold text-white">
              {session.user.userDetails.name}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
