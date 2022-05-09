import SideNavLayout from "../../components/SideNavLayout";
import OtherUserProfileTabs from "../../components/userProfile/OtherUserProfileTabs";
import Button from "../../components/Button";
import Image from "next/image";
import {
  BsFillArrowLeftCircleFill,
  BsGenderAmbiguous,
  BsShare,
  BsEye,
  BsTwitter,
  BsFacebook,
  BsYoutube,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import {
  FaBell,
  FaVideo,
  FaGlobeAfrica,
  FaUnlock,
  FaUserTimes,
} from "react-icons/fa";
import { MdMail, MdOutlineLocationOn } from "react-icons/md";
import { RiUpload2Line, RiInstagramFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { GiPhone } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import ProfileLoader from "../../components/Profile/ProfileLoader";
import VerifiedBadge from "../../components/handlers/VerifiedBadge";

import {
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../store/slices/OtherUsersSlice";
import { useEffect, useState, Fragment } from "react";
import configuration from "react-global-configuration";
import { setPaymentModal, setUnfollowerModal } from "../../store/slices/NavSlice";
import { subscriptionPaymentPaystackStart } from "../../store/slices/subscriptionSlice";

import { Popover, Transition, Dialog } from "@headlessui/react";
import PaymentModal from "../../components/helpers/PaymentModal";
import UnfollowModal from "../../components/helpers/UnfollowModal";

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const toggleVisibility = () => {};
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.comments);
  // const chat = useSelector((state) => state.chat);
  const userDetails = useSelector((state) => state.otherUser.userDetails);
  const userPosts = useSelector((state) => state.otherUser.userPosts);
  const unfollowModal = useSelector((state) => state.navbar.unfollowUserModal)
  // const products = useSelector(
  //   (state) => state.userProducts.otherModelProducts
  // );

  useEffect(() => {
    dispatch(
      fetchSingleUserProfileStart({
        user_unique_id: username,
      })
    );
    dispatch(
      fetchSingleUserPostsStart({
        user_unique_id: username,
        type: "all",
      })
    );
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
    props.dispatch(
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
    props.dispatch(
      saveChatUserStart({
        from_user_id: localStorage.getItem("userId"),
        to_user_id: user_id,
      })
    );
  };

  const subscriptionPayment = (
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

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  return (
    <SideNavLayout>
      <div className="w-full">
        {userDetails.loading ? (
          <ProfileLoader></ProfileLoader>
        ) : (
          <>
            <div className="profile-bg  relative  -mt-20">
              <div className="relative w-full !h-[50vh] md:!h-[70vh]">
                <Image
                  src={userDetails.data.user.cover}
                  alt={userDetails.data.user.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  srcSet=""
                  className="w-full !h-[30vh] md:!h-[70vh] object-cover object-center "
                />
              </div>
              <div
                className="w-8 h-8 rounded-full absolute z-10 top-28 left-8 bg-white cursor-pointer"
                onClick={() => router.back()}
              >
                <BsFillArrowLeftCircleFill className="h-8 w-8  " />
              </div>
              <div className="absolute z-10 top-28 right-12">
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
                              <div className="hover:bg-gray-100 hover:text-lightPlayRed   h-8 p-1 rounded-md cursor-pointer flex items-center justify-start">
                                <p className="font-bold text-xs">Report User</p>
                              </div>

                              <div className="hover:bg-gray-100 hover:text-lightPlayRed  h-10 p-1 rounded-md cursor-pointer flex items-center justify-start">
                                <p className="font-bold text-xs">
                                  I don&apos;t like the user. Add to blocklists.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>

              <div className="row-container  absolute -bottom-16 inset-x-0  md:inset-x-auto md:-bottom-16 md:left-24">
                <div className="p-1 bg-white rounded-3xl">
                  <div className="w-36 h-36 relative rounded-3xl ">
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
            </div>
            <div className="px-4 md:pr-0 md:pl-4 grid grid-cols-1 md:grid-cols-3  bg-white mb-10">
              <div className="space-y-3 mt-16 flex flex-col ">
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

                <div className="row-container space-x-3 ">
                  <div className="row-container  p-3 bg-gray-200 rounded-md">
                    <FaBell className="w-5 h-5" />
                  </div>
                  <div className="row-container  p-3 bg-gray-200 rounded-md">
                    <MdMail className="w-5 h-5" />
                  </div>
                  <div className="row-container  p-3 bg-gray-200 rounded-md">
                    <FaVideo className="w-5 h-5" />
                  </div>
                  <div className="row-container  p-3 bg-gray-200 rounded-md">
                    <GiPhone className="w-5 h-5" />
                  </div>
                  <div className="row-container  p-3 bg-gray-200 rounded-md">
                    <RiUpload2Line className="w-5 h-5" />
                  </div>
                </div>
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
                <div className={`grid ${userDetails.data.payment_info.is_free_account == 0 &&
                    userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? 'grid-cols-1 gap-1' : "grid-cols-2 gap-2" }   justify-items-center place-content-center `}>
                  {userDetails.data.is_block_user == 0 ? (
                    userDetails.data.payment_info.is_user_needs_pay == 1 &&
                    userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? (
                      userDetails.data.payment_info.is_free_account == 0 ? (
                        <>
                          <div className="grid grid-cols-2 gap-x-1">
                            
                              <div
                                className="sub-button"
                                onClick={(event) =>
                                  subscriptionPayment(
                                    "months",
                                    userDetails.data.payment_info
                                      .subscription_info.monthly_amount,
                                    userDetails.data.payment_info
                                      .subscription_info
                                      .monthly_amount_formatted
                                  )
                                }
                              >
                                <span>
                                  <FaUnlock />
                                </span>
                                {`Get access ${userDetails.data.payment_info.subscription_info.monthly_amount_formatted}/mo`}
                              </div>
                        
                          
                              <div
                                className="sub-button"
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
                                  <FaUnlock />
                                </span>

                                {`Get access ${userDetails.data.payment_info.subscription_info.yearly_amount_formatted}/yr`}
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
                                  is_free: 0,
                                })
                              )
                            }
                          >
                            <span>
                              <FaUnlock />
                            </span>
                            {userDetails.data.payment_info.payment_text}
                          </div>
                       
                      )
                    ) : null
                  ) : null}

                  {userDetails.data.payment_info.unsubscribe_btn_status == 1 ? (
                    <>
                      <div
                        className="sub-button row-container space-x-1"
                        onClick={()=>dispatch(setUnfollowerModal(true))}
                      >
                        <span>
                          <FaUserTimes className="h-4 w-4" />
                        </span>
                        <p className="text-sm font-medium text-white">
                          Unfollow
                        </p>
                      </div>
                      {
                        unfollowModal ? ( <UnfollowModal  user_id={userDetails.data.user.user_id}/> ) : null
                      }
                     
                    </>
                  ) : null}
                  <div className="row-container space-x-2  sub-button">
                    <Image
                      src="/materials/tips.png"
                      alt="tips"
                      width="16"
                      height="16"
                      className="h-4 w-4 text-white invert"
                    />
                    <p className="text-sm font-medium text-white">Tip</p>
                  </div>
                </div>
                <div className="row-container bg-gray-50 p-1 rounded-md py-2">
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
        )}
        {userDetails.loading ? (
          "loading"
        ) : localStorage.getItem("userId") !== "" &&
          localStorage.getItem("userId") !== null &&
          localStorage.getItem("userId") !== undefined ? (
          <PaymentModal
            userPicture={userDetails.data.user.picture}
            name={userDetails.data.user.name}
            user_unique_id={userDetails.data.user.user_unique_id}
            subscriptionData={subscriptionData}
            username={userDetails.data.user.username}
          />
        ) : // tips payment will go here
        null}

      </div>
    </SideNavLayout>
  );
};

export default Profile;
