import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchWalletDetailsStart } from "../store/slices/walletSlice";
import { useSelector, useDispatch } from "react-redux";
import { getCookie, deleteCookie, hasCookie } from "cookies-next";
import Link from "next/link";

import {
  BsDot,
  BsListStars,
  BsShieldFillCheck,
  BsMoonFill,
  BsFillSunFill,
} from "react-icons/bs";
import {
  FaWallet,
  FaShoppingBag,
  FaHistory,
  FaBookmark,
  FaUserCircle,
  FaVideo,
  FaGlobeAfrica,
} from "react-icons/fa";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { MdMail } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const HeaderMenu = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const config = useSelector((state) => state.config);

 

  useEffect(() => {
    setMounted(true);
  }, []);

  const runThemeChanger = (active) => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          onClick={() => setTheme("light")}
          className={`${
            active
              ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
              : "text-[#252525] font-semibold dark:text-gray-100"
          } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm border-y`}
        >
          <div className="flex items-center ">
            <div
              className={`${
                active && "dark:bg-gray-100"
              }   row-container bg-gray-100 dark:text-gray-900 rounded-full p-2 mr-3`}
            >
              <BsFillSunFill className="h-6 w-6" />
            </div>{" "}
            <span>Light Mode</span>
          </div>
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setTheme("dark")}
          className={`${
            active
              ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
              : "text-[#252525] font-semibold dark:text-gray-100"
          } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm border-y`}
        >
          <div className="flex items-center ">
            <div
              className={`${
                active && "dark:bg-gray-100"
              }   row-container bg-gray-100 dark:text-gray-900  rounded-full p-2 mr-3`}
            >
              <BsMoonFill className="h-6 w-6" />
            </div>{" "}
            <span>Night Mode</span>
          </div>
        </button>
      );
    }
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookieWalletData, setCookieWalletData] = useState({
    user_wallet: { remaining_formatted: null },
  });
  const wallet = useSelector((state) => state.wallet.walletData);

  // if (hasCookie("wallet ")) {
  //   cookieWalletData = JSON.parse(decodeURIComponent(getCookie("wallet")));
  // }

  // const user = useSelector((state) => state.user.profile.data);
  const cookieUser = getCookie("user");

  const user = JSON.parse(cookieUser) || {};

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());

    if (hasCookie("wallet")) {
      setCookieWalletData(JSON.parse(decodeURIComponent(getCookie("wallet"))));
    }
  }, []);

  const logout = async () => {
    deleteCookie("userId");
    deleteCookie("accessToken");
    deleteCookie("user_email");
    deleteCookie("username");
    deleteCookie("picture");
    deleteCookie("user");
    deleteCookie("wallet");
    deleteCookie("total_followers");
    deleteCookie("total_followings");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLoginStatus");
    localStorage.removeItem("user_picture");
    localStorage.removeItem("username");
    localStorage.removeItem("socket");
    localStorage.removeItem("user_cover");
    localStorage.removeItem("name");
    localStorage.removeItem("user_unique_id");
    localStorage.removeItem("is_document_verified");
    localStorage.removeItem("is_verified_badge");
    localStorage.removeItem("is_two_step_auth_enabled");
    localStorage.removeItem("is_content_creator");
    localStorage.removeItem("default_payment_method");
    localStorage.removeItem("emailId");
    localStorage.removeItem("total_followers");
    localStorage.removeItem("total_followings");
    localStorage.removeItem("is_subscription_enabled");
    window.location.assign("/login");
    // await signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      {user ? (
        <>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
              <div className="row-container rounded-full bg-[#BA253D] space-x-1 pr-2 cursor-pointer">
                <img
                  alt=""
                  src={user.picture ? user.picture : getCookie("picture")}
                  width={38}
                  height={38}
                  // objectFit="cover"
                  className="rounded-full object-cover w-[38px] h-[38px] "
                />

                <p className=" text-xs font-bold text-white ">
                  {user.name ? user?.name : getCookie("username")}
                </p>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 origin-top-right right-1 tag_scroll py-[3px] px-[10px] overflow-y-scroll overscroll-y-contain rounded-[8px] min-w-[320px] max-h-[90vh]   bg-white dark:bg-gray-900 dark:text-gray-100  divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/profile")}
                        className={`${
                          active
                            ? "bg-gray-100 dark:bg-gray-900 text-[#252525] dark:text-gray-100 font-bold"
                            : "text-[#252525] dark:text-gray-100 font-bold"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div className="relative w-10 h-10 rounded-full mr-5">
                          <Image
                            src={
                              user.picture ? user.picture : getCookie("picture")
                            }
                            layout="fill"
                            className="rounded-full"
                            objectFit="cover"
                            alt=""
                          />
                        </div>
                        {user.name ? user?.name : getCookie("username")}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex items-center justify-start px-1 pb-2  border-b">
                      <p className="font-bold text-sm whitespace-nowrap">
                        {user?.total_followers || getCookie("total_followers")}{" "}
                        Fans
                      </p>
                      <BsDot className="h-5 w-5" />
                      <p className="font-bold text-sm whitespace-nowrap">
                        {user?.total_followings ||
                          getCookie("total_followings")}{" "}
                        Following
                      </p>
                      <button
                        className="row-container bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-full px-2 py-1 ml-2"
                        onClick={() => router.push("/payment/wallet")}
                      >
                        <FaWallet className="h-4 w-4 mr-1" />
                        <p className="text-sm font-bold">
                          {wallet?.data?.user_wallet?.remaining_formatted ||
                            cookieWalletData.user_wallet.remaining_formatted ||
                            "loading..."}
                        </p>
                      </button>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/settings/profile")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525] font-semibold dark:text-gray-900"
                            : "text-[#252525] dark:text-gray-100 font-semibold"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <FaUserCircle className="h-6 w-6 " />
                        </div>
                        My Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/dashboard")}
                        className={`${
                          active
                            ? "bg-gray-100 !text-[#252525]  dark:!text-gray-900 font-semibold"
                            : "text-[#252525] dark:text-gray-100 dark:bg-gray-900  font-semibold"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div
                          className={`${
                            active && " dark:text-gray-100"
                          }   row-container bg-gray-100  dark:bg-gray-900 rounded-full p-2 mr-3`}
                        >
                          <RiBarChartHorizontalFill className="h-6 w-6" />
                        </div>
                        Dashboard
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/go-pro")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525] dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.6743 1.44208C13.3715 1.62761 13.1121 1.88704 12.5933 2.40589L8.95327 6.04587C8.50619 5.72732 8.12946 5.46396 7.79707 5.26246C7.38657 5.0136 6.99799 4.82987 6.56464 4.7426C5.87096 4.60292 5.15193 4.66234 4.4906 4.91401C4.07745 5.07123 3.7243 5.31626 3.36022 5.62912C3.00817 5.93166 2.60823 6.33159 2.11482 6.825L2.09427 6.84555L1.47017 7.46963C1.31427 7.62552 1.23486 7.8421 1.25304 8.06182C1.27122 8.28153 1.38515 8.48212 1.56455 8.61026L4.42496 10.6535C4.1598 10.9821 3.98753 11.2685 3.88862 11.573C3.69284 12.1755 3.69284 12.8245 3.88862 13.4271C4.11118 14.112 4.70521 14.7061 5.89326 15.8941L5.96923 15.9701L8.46952 13.4698C8.76241 13.1769 9.23728 13.1769 9.53018 13.4698C9.82307 13.7627 9.82307 14.2376 9.53018 14.5305L7.02989 17.0307L7.10503 17.1059L7.10504 17.1059C8.29309 18.2939 8.88711 18.888 9.57209 19.1105C10.1746 19.3063 10.8237 19.3063 11.4262 19.1105C11.7308 19.0116 12.0173 18.8392 12.3461 18.5738L14.3905 21.4359C14.5187 21.6153 14.7192 21.7293 14.939 21.7474C15.1587 21.7656 15.3753 21.6862 15.5312 21.5303L16.155 20.9065L16.1756 20.8859C16.669 20.3925 17.069 19.9925 17.3716 19.6404C17.6845 19.2763 17.9295 18.9231 18.0867 18.51C18.3384 17.8486 18.3978 17.1295 18.2581 16.4358C18.1708 16.0024 17.987 15.6138 17.7381 15.2033C17.5364 14.8705 17.2726 14.4933 16.9535 14.0456L20.5933 10.4059C21.1121 9.88704 21.3715 9.62761 21.5571 9.32486C21.7216 9.05644 21.8428 8.76381 21.9163 8.4577C21.9991 8.11244 21.9991 7.74555 21.9991 7.01178L21.9991 4.2C21.9991 3.0799 21.9991 2.51985 21.7812 2.09202C21.5894 1.7157 21.2834 1.40974 20.9071 1.21799C20.4793 1 19.9193 1 18.7991 1L15.9874 1C15.2536 1 14.8867 1 14.5415 1.08289C14.2353 1.15638 13.9427 1.2776 13.6743 1.44208ZM14.0024 7.74951C13.3121 7.74951 12.7524 8.30916 12.7524 8.99951C12.7524 9.68987 13.3121 10.2495 14.0024 10.2495C14.6928 10.2495 15.2524 9.68987 15.2524 8.99951C15.2524 8.30916 14.6928 7.74951 14.0024 7.74951ZM11.2524 8.99951C11.2524 7.48073 12.4837 6.24951 14.0024 6.24951C15.5212 6.24951 16.7524 7.48073 16.7524 8.99951C16.7524 10.5183 15.5212 11.7495 14.0024 11.7495C12.4837 11.7495 11.2524 10.5183 11.2524 8.99951ZM6.26852 6.21309C5.85232 6.12927 5.42089 6.16493 5.02409 6.31593C4.83705 6.38711 4.63467 6.5117 4.33785 6.76677C4.03426 7.02766 3.67464 7.38652 3.15685 7.90429L5.41928 9.52037L7.84181 7.09652C7.5128 6.86426 7.24996 6.68489 7.01947 6.54516C6.6848 6.34228 6.46472 6.25259 6.26852 6.21309ZM13.4803 17.581L15.0965 19.8436C15.6142 19.3259 15.973 18.9663 16.2339 18.6628C16.489 18.3659 16.6136 18.1635 16.6848 17.9765C16.8358 17.5797 16.8715 17.1482 16.7876 16.732C16.7481 16.5358 16.6584 16.3157 16.4555 15.981C16.3155 15.7502 16.1358 15.4869 15.903 15.1572L13.4803 17.581Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        Upgrade to Pro
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div onClick={() => router.push("/market/marketplace")}>
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-[#252525] dark:text-gray-900 dark:bg-gray-100 font-semibold"
                              : "text-[#252525] font-semibold dark:text-gray-100"
                          } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                        >
                          <div
                            className={`${
                              active ? "" : "dark:bg-gray-900"
                            }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                          >
                            <FaShoppingBag className="h-6 w-6 " />
                          </div>
                          Shop
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                  {/* <Menu.Item>
                    {({ active }) => (
                      <div onClick={() => router.push("/stories")}>
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
                              : "text-[#252525] font-semibold dark:text-gray-100"
                          } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                        >
                          <div
                             className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                          >
                            <FaHistory className="h-6 w-6" />
                          </div>
                          Stories
                        </button>
                      </div>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/bookmarks/photos")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <FaBookmark className="h-6 w-6" />
                        </div>
                        Bookmarks
                      </button>
                    )}
                  </Menu.Item>

                  {/* <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/calls/video-call")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div className={`${active && "dark:bg-gray-100"}   row-container bg-gray-100 dark:bg-gray-900 rounded-full p-2 mr-3`}>
                          <FaVideo className="h-6 w-6" />
                        </div>
                        Video Calls
                      </button>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/list/fans")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        {" "}
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <BsListStars className="h-6 w-6" />
                        </div>
                        Lists
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/referrals")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525] dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <MdMail className="h-6 w-6" />
                        </div>
                        Invite Your Friends
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/settings/profile")}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525] dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                      >
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <BsShieldFillCheck className="h-6 w-6" />
                        </div>
                        Privacy Settings
                      </button>
                    )}
                  </Menu.Item>

                  {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gray-100 text-[#252525] dark:bg-gray-900 dark:text-gray-100 font-semibold"
                        : "text-[#252525] font-semibold dark:text-gray-100"
                    } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm`}
                  >
                    <div className={`${active && "dark:bg-gray-100"}   row-container bg-gray-100 dark:bg-gray-900 rounded-full p-2 mr-3`}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.5289 17.1785C3.74701 17.4151 4.04653 17.5815 4.64558 17.9143L10.4456 21.1366C11.0128 21.4517 11.2964 21.6092 11.5967 21.671C11.8626 21.7257 12.1367 21.7257 12.4025 21.671C12.7029 21.6092 12.9865 21.4517 13.5537 21.1366L13.5537 21.1366L19.3537 17.9143C19.9527 17.5815 20.2523 17.4151 20.4704 17.1785C20.6633 16.9691 20.8093 16.7209 20.8987 16.4506C20.9996 16.145 20.9996 15.8023 20.9996 15.117V8.88281C20.9996 8.19753 20.9996 7.85489 20.8987 7.54929C20.8093 7.27894 20.6633 7.03077 20.4704 6.82139C20.2523 6.58472 19.9527 6.41832 19.3537 6.08551L13.5537 2.86329C12.9865 2.54817 12.7029 2.39062 12.4025 2.32884C12.1367 2.27417 11.8626 2.27417 11.5967 2.32884C11.2964 2.39062 11.0128 2.54817 10.4456 2.86329L4.64558 6.08551C4.04653 6.41832 3.747 6.58472 3.5289 6.82139C3.33595 7.03077 3.18993 7.27894 3.1006 7.54929C2.99963 7.85489 2.99963 8.19753 2.99963 8.88281V15.117C2.99963 15.8023 2.99963 16.145 3.1006 16.4506C3.18993 16.7209 3.33595 16.9691 3.5289 17.1785ZM12 9.00005C10.3431 9.00005 9 10.3432 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3432 13.6569 9.00005 12 9.00005Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    General Settings
                  </button>
                )}
              </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => mounted && runThemeChanger(active)}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => logout()}
                        className={`${
                          active
                            ? "bg-gray-100 text-[#252525]  dark:text-gray-900 font-semibold"
                            : "text-[#252525] font-semibold dark:text-gray-100"
                        } group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm `}
                      >
                        <div
                          className={`${
                            active ? "" : "dark:bg-gray-900"
                          }   row-container bg-gray-100  rounded-full p-2 mr-3`}
                        >
                          <IoLogOut className="h-6 w-6" />
                        </div>
                        Log Out
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    <div className="mt-5 text-[#252525] dark:text-gray-100">
                      <div className="flex justify-between items-center">
                        <p className="text-xs ">
                          <span>&copy;</span>2022 Playjor!
                        </p>
                        <div className="flex space-x-1 items-center ">
                          <FaGlobeAfrica className="w-2 h-2" />
                          <p className="text-xs ">Language</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-evenly space-y-1 group space-x-1">
                        {config.loading
                          ? "Loading..."
                          : config.configData.footer_pages1 &&
                            config?.configData?.footer_pages1.map(
                              (static_page, i) => (
                                <Link
                                  key={i}
                                  href={`/page/${static_page.static_page_unique_id}`}
                                  passHref
                                >
                                  <span className="text-xs cursor-pointer hover:text-green-500 ">
                                    {static_page.title}
                                    {/* {page.hidden == null && (
                                <span className=""> &#8226;</span>
                              )} */}
                                  </span>
                                </Link>
                              )
                            )}
                        {config.loading
                          ? "Loading..."
                          : config.configData.footer_pages2 &&
                            config?.configData?.footer_pages2.map(
                              (static_page, i) => (
                                <Link
                                  key={i}
                                  href={`/page/${static_page.static_page_unique_id}`}
                                  passHref
                                >
                                  <span className="text-xs cursor-pointer hover:text-green-500 ">
                                    {static_page.title}
                                    {/* {page.hidden == null && (
                                <span className=""> &#8226;</span>
                              )} */}
                                  </span>
                                </Link>
                              )
                            )}
                        <a
                          href="https://blog.playjor.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="text-xs cursor-pointer hover:text-green-500 ">
                            Blog
                          </span>
                        </a>
                      </div>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderMenu;
