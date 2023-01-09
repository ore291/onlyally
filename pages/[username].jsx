import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import {
  BsEye,
  BsFacebook,
  BsFillArrowLeftCircleFill,
  BsGenderAmbiguous,
  BsShare,
  BsThreeDotsVertical,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "next-share";
import {
  FaBell,
  FaGlobeAfrica,
  FaUnlock,
  FaUserTimes,
  FaVideo,
} from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { MdMail, MdOutlineLocationOn } from "react-icons/md";
import { RiInstagramFill, RiUpload2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import VerifiedBadge from "../components/handlers/VerifiedBadge";
import PaymentModal from "../components/helpers/PaymentModal";
import UnfollowModal from "../components/helpers/UnfollowModal";
import ProfileLoader from "../components/Profile/ProfileLoader";
import PrivateCallModal from "../components/Profile/PrivateCallModal";
import PrivateAudioCallModal from "../components/Profile/PrivateAudioCallModal";
import SideNavLayout from "../components/SideNavLayout";
import TipModal from "../components/tips/TipModal";
import OtherUserProfileTabs from "../components/userProfile/OtherUserProfileTabs";
import { saveChatUsersStart } from "../store/slices/chatSlice";
import { setPaymentModal, setUnfollowerModal } from "../store/slices/NavSlice";
import {
  fetchSingleUserPostsStart,
  fetchSingleUserProfileStart,
} from "../store/slices/OtherUsersSlice";

import { subscriptionPaymentPaystackStart } from "../store/slices/subscriptionSlice";

import { getCookies, getCookie } from "cookies-next";

import { END } from "redux-saga";
import { wrapper } from "../store";
import ReportModeModal from "../components/feeds/ReportModeModal";
import { saveBlockUserStart } from "../store/slices/userSlice";
const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const toggleVisibility = () => {};
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.comments);
  // const chat = useSelector((state) => state.chat);
  const userDetails = useSelector((state) => state.otherUser.userDetails);
  const userPosts = useSelector((state) => state.otherUser.userPosts);
  const unfollowModal = useSelector((state) => state.navbar.unfollowUserModal);
  // const products = useSelector(
  //   (state) => state.userProducts.otherModelProducts
  // );

  useEffect(() => {
    // dispatch(
    //   fetchSingleUserProfileStart({
    //     user_unique_id: username,
    //   })
    // );
    // dispatch(
    //   fetchSingleUserPostsStart({
    //     user_unique_id: username,
    //     type: "all",
    //   })
    // );
    // props.dispatch(
    //   fetchOtherModelProductListStart({
    //     user_unique_id: props.match.params.username,
    //   })
    // );

    window.addEventListener("scroll", toggleVisibility);
  }, [username]);

  const [activeSec, setActiveSec] = useState("post");
  const [sendTip, setSendTip] = useState(false);
  const [starStatus, setStarStatus] = useState("");
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [blockUserStatus, setBlockUserStatus] = useState("");

  const [requestVideoCall, setRequestVideoCall] = useState(false);
  const [requestAudioCall, setRequestAudioCall] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockUser, setShowBlockUser] = useState(false);
  const [reportMode, setReportMode] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const blockStatusUpdate = () => {
    if (props.loading == false) {
      setBlockUserStatus(
        props.data.is_block_user == 1 ? "blocked" : "unblocked"
      );
    }
  };

  const handleBlockUser = (event, status, user_id) => {
    event.preventDefault();
    setBlockUserStatus(status);
    dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const handleStar = (event, user_id, status) => {
    event.preventDefault();
    setStarStatus(status);
    props.dispatch(
      saveFavStart({
        user_id: user_id,
      })
    );
  };

  const handleChatUser = (event, user_id) => {
    event.preventDefault();
    dispatch(
      saveChatUsersStart({
        from_user_id: getCookie("userId"),
        to_user_id: user_id,
      })
    );
  };

  const subscriptionPayment = (
    event,
    plan_type,
    amount,
    amount_formatted,
    is_free = 0
  ) => {
    setSubscriptionData({
      ...subscriptionData,
      is_free: is_free,
      plan_type: plan_type,
      amount: amount,
      amount_formatted: amount_formatted,
    });
    dispatch(setPaymentModal(true));
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const scrollToTop = () => {
    console.log("adadasdas");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Private Video call

  const closePrivateCallModal = () => {
    setRequestVideoCall(false);
    setRequestAudioCall(false);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeReportModeModal = () => {
    setReportMode(false);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  console.log(userDetails.data.user);
  return (
    <SideNavLayout>
      <div className="w-full">
        {userDetails.loading ? (
          <ProfileLoader></ProfileLoader>
        ) : userDetails.data.user ? (
          <>
            <div className="profile-bg  relative -mt-10 ">
              <div className="relative w-full min-h-[30vh] md:min-h-[50vh] ">
                {userDetails.data.user.cover !== undefined ? (
                  <Image
                    src={userDetails.data.user.cover}
                    alt={userDetails.data.user.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    srcSet=""
                    className="w-full  !h-[40vh] md:!h-[70vh] object-cover object-center "
                  />
                ) : (
                  <Image
                    src={
                      "https://playjor.ams3.digitaloceanspaces.com/upload/photos/2022/01/kNogtdMLlZ6rWxL8GGCy_05_1321914ca6fc245f7bfa01dbc5760943_cover.jpg?cache=1631343744"
                    }
                    alt={`cover-image`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    srcSet=""
                    className="w-full !h-[40vh] md:!h-[70vh] object-cover object-center "
                  />
                )}
              </div>
              <div
                className="w-8 h-8 rounded-full absolute z-10 top-16  left-8 bg-white dark:!bg-gray-900 dark:!text-gray-400 cursor-pointer"
                onClick={() => router.back()}
              >
                <BsFillArrowLeftCircleFill className="h-8 w-8  " />
              </div>
              <div className="absolute z-10 top-16  right-12">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                ${open ? "" : "text-opacity-90"}
                group  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <div className="w-8 h-8 rounded-full  bg-black cursor-pointer row-container">
                          <BsThreeDotsVertical className="h-5 w-5 text-white " />
                        </div>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 w-[150px] lg:w-[15vw]  px-4 mt-3 transform shadow-md -translate-x-1/2 -left-20 sm:px-0 lg:max-w-3xl">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-y-1 bg-white p-1 grid-cols-1">
                              <div
                                onClick={() => {
                                  setShowReportModal(true);
                                }}
                                className="hover:bg-gray-100 hover:text-lightPlayRed   h-8 p-1 rounded-md cursor-pointer flex items-center justify-start"
                              >
                                <p className="font-bold text-xs">Report User</p>
                              </div>

                              {/* <div
                                onClick={() => {
                                  setShowBlockUser(true);
                                }}
                                className="hover:bg-gray-100 hover:text-lightPlayRed  h-10 p-1 rounded-md cursor-pointer flex items-center justify-start"
                              >
                                <p className="font-bold text-xs">
                                  I don&apos;t like the user. Add to blocklists.
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>

              {showReportModal && (
                <div
                  style={{ boxShadow: "0 3px 6px rgb(0 0 0 / 16%)" }}
                  className=" z-[9999999999999] absolute top-[40%] bg-white dark:!bg-gray-900 dark:!text-gray-400 opacity-[5] right-[30%]  w-[50%] translate-x-[50%] inline-block  rounded-lg "
                >
                  <p className="text-white text-center  bg-red-700 hover:bg-[#CF0A08]  rounded-t-lg">
                    Are You sure you want to report this user ?
                  </p>
                  <code className="text-center m-4">
                    Note: Report will be investigated on no ones favour.
                  </code>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        setShowReportModal((prev) => !prev);
                      }}
                      className="bg-red-700 hover:bg-[#CF0A08] text-white p-1 w-[30%] rounded-lg m-4"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(event) => {
                        setReportMode(true);
                        setShowReportModal(false);
                      }}
                      className="bg-red-700 hover:bg-[#CF0A08] text-white p-1 w-[30%] rounded-lg m-4"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              )}
              {showBlockUser && (
                <div
                  style={{ boxShadow: "0 3px 6px rgb(0 0 0 / 16%)" }}
                  className=" z-[9999999999999] absolute top-[40%] bg-white dark:!bg-gray-900 dark:!text-gray-400 opacity-[5] right-[30%]  w-[50%] translate-x-[50%] inline-block  rounded-lg "
                >
                  <p className="text-white text-center  bg-red-700 hover:bg-[#CF0A08]  rounded-t-lg">
                    Are You sure you want to block this user ?
                  </p>
                  <code className="text-center m-4">
                    Note: users posts won&apos;t be visible to you any longer
                  </code>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        setShowBlockUser((prev) => !prev);
                      }}
                      className="bg-red-700 hover:bg-[#CF0A08] text-white p-1 w-[30%] rounded-lg m-4"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(event) =>
                        handleBlockUser(
                          event,
                          blockUserStatus,
                          userDetails.data.user.user_id
                        )
                      }
                      className="bg-red-700 hover:bg-[#CF0A08] text-white p-1 w-[30%] rounded-lg m-4"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              )}
              <ReportModeModal
                reportMode={reportMode}
                closeReportModeModal={closeReportModeModal}
                post={userDetails.data.user}
              />
              {/* <div className="row-container  absolute -bottom-16 inset-x-0  md:inset-x-auto md:-bottom-16 md:left-24 lg:left-24  2xl:left-40">
                <div className="p-1 bg-white rounded-3xl">
                  <div className="w-36 h-36 2xl:w-52 2xl:h-52 relative rounded-3xl ">
                    <Image
                      src={userDetails.data.user.picture}
                      alt={userDetails.data.user.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                </div>
              </div> */}
            </div>
            <div className="px-4 md:pr-0 md:pl-4 grid grid-cols-1 md:grid-cols-3  bg-white dark:!bg-gray-900 dark:!text-gray-400  mb-10">
              <div className="space-y-3 mt-16 2xl:mt-12 flex flex-col relative">
                <div className="row-container  absolute  inset-x-0 mx-auto -top-[130px] md:-top-36 2xl:-top-40 ">
                  <div className="p-1 bg-white rounded-3xl">
                    <div className="w-36 h-36 2xl:w-52 2xl:h-52 relative rounded-3xl ">
                      <Image
                        src={userDetails.data.user.picture}
                        alt={userDetails.data.user.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-container ">
                  <div className="flex items-center justify-center space-x-2 ">
                    <p className="text-2xl font-bold leading-[40px]">
                      {userDetails.data.user.name}
                    </p>
                    <small>
                      {userDetails.data.user.is_verified_badge == 1 ? (
                        <VerifiedBadge />
                      ) : null}
                    </small>
                  </div>
                  <p className="text-lg font-semibold mb-1">{`@${userDetails.data.user.username}`}</p>
                </div>

                <div className="flex justify-center space-x-3 ">
                  <div className="profile-buttons">
                    <FaBell className="w-5 h-5" />
                  </div>
                  <div
                    className="profile-buttons "
                    // onClick={(event) =>
                    //   handleChatUser(event, userDetails.data.user.user_id)
                    // }
                  >
                    <MdMail className="w-5 h-5" />
                  </div>
                  {/* <div className="profile-buttons">
                    <FaVideo className="w-5 h-5" />
                  </div>
                  <div
                    className="profile-buttons "
                    onClick={() => setRequestVideoCall(true)}
                  >
                    <GiPhone className="w-5 h-5" />
                  </div> */}
                  <div
                    onClick={() => setShowShare((prev) => !prev)}
                    className="profile-buttons"
                  >
                    <RiUpload2Line className="w-5 h-5" />
                  </div>
                </div>
                {showShare && (
                  <div
                    //style={{ boxShadow: "10px 10px 10px 10px  rgba(0,0,0,0.5", }}
                    className="drop-shadow-[10px_10px_10px_rgba(0,0,0,0.5)] hover:drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)]  w-[200px] cursor-pointer h-fit bg-white dark:!bg-gray-900 dark:!text-gray-400 rounded-xl sm:ml-8  ml-20 lg:ml-12 flex flex-wrap"
                  >
                    <FacebookShareButton
                      url={userDetails.data.user.share_link}
                      hashtag={"#playjor"}
                      className=""
                    >
                      <FacebookIcon className="w-[50px] hover:scale-[1.1]  h-[50px] rounded-full m-2" />
                    </FacebookShareButton>
                    <TwitterShareButton url={userDetails.data.user.share_link}>
                      <TwitterIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />{" "}
                    </TwitterShareButton>
                    <WhatsappShareButton url={userDetails.data.user.share_link}>
                      <WhatsappIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                    </WhatsappShareButton>
                    <EmailShareButton
                      className=""
                      url={userDetails.data.user.share_link}
                      subject={"Playjor user profile"}
                      body={`check out ${userDetails.data.user.name}'s profile`}
                    >
                      <EmailIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                    </EmailShareButton>
                    <RedditShareButton
                      url={userDetails.data.user.share_link}
                      title={`${userDetails.data.user.name}'s profile`}
                    >
                      <RedditIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                    </RedditShareButton>
                    <TelegramShareButton
                      url={userDetails.data.user.share_link}
                      title={`check out ${userDetails.data.user.name}'s profile`}
                    >
                      <TelegramIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                    </TelegramShareButton>
                  </div>
                )}
                <div className="flex justify-between px-8">
                  <div className="col-container space-y-0.5">
                    <p className="text-lg font-semibold">{userPosts.length}</p>
                    <span>Posts</span>
                  </div>
                  <div className="col-container space-y-0.5">
                    <p className="text-lg font-semibold">
                      {userDetails.data.total_followings}
                    </p>
                    <span>Following</span>
                  </div>
                  <div className="col-container space-y-0.5">
                    <p className="text-lg font-semibold">
                      {userDetails.data.total_followers}
                    </p>
                    <span>Fans</span>
                  </div>
                </div>
                <div
                  className={`grid ${
                    userDetails.data.payment_info.is_free_account == 0 &&
                    userDetails.data.payment_info.unsubscribe_btn_status == 0
                      ? "grid-cols-1 gap-1"
                      : "grid-cols-1 gap-2"
                  }   justify-items-center place-content-center `}
                >
                  {userDetails.data.is_block_user == 0 ? (
                    userDetails.data.payment_info.is_user_needs_pay == 1 &&
                    userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? (
                      userDetails.data.payment_info.is_free_account == 0 ? (
                        <>
                          <div className="grid grid-cols-2 gap-x-1">
                            <div
                              className="sub-button truncate"
                              onClick={(event) =>
                                subscriptionPayment(
                                  event,
                                  "months",
                                  userDetails.data.payment_info
                                    .subscription_info.monthly_amount,
                                  userDetails.data.payment_info
                                    .subscription_info.monthly_amount_formatted
                                )
                              }
                            >
                              <span>
                                <FaUnlock className="w-3 h-3" />
                              </span>
                              {`Follow ${userDetails.data.payment_info.subscription_info.monthly_amount_formatted}/mo`}
                            </div>

                            <div
                              className="sub-button "
                              onClick={(event) =>
                                subscriptionPayment(
                                  event,
                                  "years",
                                  userDetails.data.payment_info
                                    .subscription_info.yearly_amount,
                                  userDetails.data.payment_info
                                    .subscription_info.yearly_amount_formatted
                                )
                              }
                            >
                              <span>
                                <FaUnlock className="w-3 h-3" />
                              </span>

                              {`Follow ${userDetails.data.payment_info.subscription_info.yearly_amount_formatted}/yr`}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className="sub-button"
                          onClick={(event) =>
                            dispatch(
                              subscriptionPaymentPaystackStart({
                                user_unique_id:
                                  userDetails.data.user.user_unique_id,
                                plan_type: "months",
                                is_free: 1,
                                payment_id: "free",
                              })
                            )
                          }
                        >
                          <span>
                            <FaUnlock />
                          </span>
                          Follow
                          {/* {userDetails.data.payment_info.payment_text} */}
                        </div>
                      )
                    ) : null
                  ) : null}

                  {userDetails.data.payment_info.unsubscribe_btn_status == 1 ? (
                    <>
                      <div
                        className="!bg-gray-300 !text-gray-900 sub-button flex-1 row-container space-x-1"
                        onClick={() => dispatch(setUnfollowerModal(true))}
                      >
                        <span>
                          <FaUserTimes className="h-4 w-4 text-white dark:text-gray-300" />
                        </span>
                        <p className="text-sm font-medium text-white dark:text-gray-300">
                          Unfollow
                        </p>
                      </div>
                      {unfollowModal ? (
                        <UnfollowModal
                          user_id={userDetails.data.user.user_id}
                        />
                      ) : null}
                    </>
                  ) : null}
                  {userDetails.data.user?.pro_package_config !== [] &&
                    userDetails.data.user.user_account_type !== 0 && (
                      <div
                        className="flex-1 row-container space-x-2  sub-button"
                        onClick={() => setSendTip(true)}
                      >
                        <Image
                          src="/materials/tips.png"
                          alt="tips"
                          width="16"
                          height="16"
                          className="h-4 w-4 text-white invert"
                        />
                        <p className="text-sm font-medium text-white">Tip</p>
                      </div>
                    )}
                </div>
                <div className="row-container bg-gray-50  dark:!bg-gray-900 dark:!text-gray-400 p-1 rounded-md py-2">
                  <div className="bg-gray-100 p-1 rounded-md">
                    <p className="text-sm font-semibold"> About Me</p>
                  </div>
                </div>
                <p className=" text-sm font-semibold text-justify">
                  {userDetails.data.user.about_formatted
                    ? userDetails.data.user.about_formatted
                    : "N/A"}
                </p>
                <div className="flex flex-col">
                  <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                    <BsEye className="w-4 h-4" />
                    <div className="row-container">
                      <span className="text-sm text-lightPlayRed">
                        {userDetails.data.user.is_user_online == 1
                          ? "online"
                          : "offline"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                    <AiOutlineLink className="w-4 h-4" />
                    <span className="text-sm">
                      {userDetails.data.user.categories.name
                        ? userDetails.data.user.categories.name
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                    <BsGenderAmbiguous className="w-4 h-4" />
                    <span className="text-sm">
                      {userDetails.data.user.gender
                        ? userDetails.data.user.gender
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                    <FaGlobeAfrica className="w-4 h-4" />
                    <span className="text-sm">
                      {userDetails.data.user.timezone
                        ? userDetails.data.user.timezone
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                    <MdOutlineLocationOn className="w-4 h-4" />
                    <span className="text-sm">
                      {userDetails.data.user.address
                        ? userDetails.data.user.address
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                    <BsShare className="w-4 h-4" />
                    <div className="row-container space-x-2">
                      {userDetails.data.user.twitter_link ? (
                        <a
                          href={userDetails.data.user.twitter_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsTwitter className="w-4 h-4 text-[#1DA1F2]  cursor-pointer" />
                        </a>
                      ) : null}

                      {userDetails.data.user.facebook_link ? (
                        <a
                          href={userDetails.data.user.facebook_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsFacebook className="w-4 h-4 text-[#4267B2] cursor-pointer" />
                        </a>
                      ) : null}

                      {userDetails.data.user.youtube_link ? (
                        <a
                          href={userDetails.data.user.youtube_link}
                          target="_blank"
                          rel=" noreferrer"
                        >
                          <BsYoutube className="w-4 h-4 text-[#FF0000] cursor-pointer" />
                        </a>
                      ) : null}
                      {userDetails.data.user.instagram_link ? (
                        <a
                          href={userDetails.data.user.instagram_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <RiInstagramFill className="w-4 h-4 text-[#C13584] cursor-pointer" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <OtherUserProfileTabs
                  other_user_username={userDetails.data.user.username}
                />
              </div>
            </div>
          </>
        ) : null}
        {userDetails.loading ? (
          "loading...."
        ) : getCookie("userId") !== "" &&
          getCookie("userId") !== null &&
          getCookie("userId") !== undefined ? (
          <>
            {userDetails.data.user && (
              <>
                <PaymentModal
                  userPicture={userDetails.data.user.picture}
                  name={userDetails.data.user.name}
                  user_unique_id={userDetails.data.user.user_unique_id}
                  subscriptionData={subscriptionData}
                  username={userDetails.data.user.username}
                  email={userDetails.data.user.email}
                />

                <TipModal
                  sendTip={sendTip}
                  closeSendTipModal={closeSendTipModal}
                  username={userDetails.data.user.username}
                  userPicture={userDetails.data.user.picture}
                  name={userDetails.data.user.name}
                  post_id={null}
                  user_id={userDetails.data.user.user_id}
                />
              </>
            )}
          </>
        ) : null}

        {/* {userDetails.loading ? (
          "Loading..."
        ) : getCookie("userId") !== "" &&
          getCookie("userId") !== null &&
          getCookie("userId") !== undefined ? (
          <>
            <PrivateCallModal
              requestVideoCall={requestVideoCall}
              closePrivateCallModal={closePrivateCallModal}
              username={userDetails.data.user.username}
              userPicture={userDetails.data.user.picture}
              videoAmount={userDetails.data.user.video_call_amount_formatted}
              name={userDetails.data.user.name}
              post_id={null}
              user_id={userDetails.data.user.user_id}
            />
            <PrivateAudioCallModal
              requestAudioCall={requestAudioCall}
              closePrivateCallModal={closePrivateCallModal}
              username={userDetails.data.user.username}
              userPicture={userDetails.data.user.picture}
              AudioAmount={userDetails.data.user.audio_call_amount_formatted}
              name={userDetails.data.user.name}
              post_id={null}
              user_id={userDetails.data.user.user_id}
            />
          </>
        ) : null} */}
      </div>
    </SideNavLayout>
  );
};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const cookies = getCookies({ req, res });

      const { username } = params;

      if (username == cookies.username) {
        return {
          redirect: {
            destination: "/profile",
          },
        };
      } else {
      }

      store.dispatch(
        fetchSingleUserProfileStart({
          accessToken: cookies.accessToken,
          user_unique_id: username,
          user_id: cookies.username,
        })
      );

      store.dispatch(
        fetchSingleUserPostsStart({
          accessToken: cookies.accessToken,
          user_unique_id: username,
          user_id: cookies.username,
          type: "all",
        })
      );

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
      };
    }
);
