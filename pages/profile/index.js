/* eslint-disable react-hooks/exhaustive-deps */
import SideNavLayout from "../../components/SideNavLayout";
import ProfileTabs from "../../components/userProfile/ProfileTabs";
import Button from "../../components/Button";
import Image from "next/image";
import ProfileLoader from "../../components/Profile/ProfileLoader";
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
import { FaBell, FaVideo, FaGlobeAfrica } from "react-icons/fa";
import { MdMail, MdOutlineLocationOn } from "react-icons/md";
import { RiUpload2Line, RiInstagramFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { GiPhone } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchUserDetailsStart } from "../../store/slices/userSlice";
import { fetchPostsStart } from "../../store/slices/postSlice";
import { fetchUserGroupsStart } from "../../store/slices/groupsSlice";
import { fetchUserChannelsStart } from "../../store/slices/channelsSlice";

import { useEffect, useState } from "react";
import VerifiedBadge from "../../components/handlers/VerifiedBadge";

import { getCookie, getCookies } from "cookies-next";

import { END } from "redux-saga";
import { wrapper } from "../../store";
import PulseImage from "../../components/Profile/PulseImage";
import { fetchUserStoriesStart } from "../../store/slices/storiesSlice";
import StoriesSliderModal from "../../components/feeds/StoriesSliderModal";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);
  const stories = useSelector((state) => state.stories.userStories);
  const posts = useSelector((state) => state.post.posts);

  const [badgeStatus, setBadgeStatus] = useState(0);

  const [activeSec, setActiveSec] = useState("post");

  const [anchorEl, setAnchorEl] = useState(null);
  const [showShare, setShowShare] = useState(false);

  // stories
  const [renderSliderModal, setRenderSliderModal] = useState(false);

  const [selectedSliderIndex, setSelectedSliderIndex] = useState(0);

  const [sliderData, setSliderData] = useState({});

  const SliderModalToggle = (status, index, story) => {
    setRenderSliderModal(status);
    setSelectedSliderIndex(index);
    setSliderData(story);
  };

  //

  useEffect(() => {
    dispatch(fetchUserChannelsStart());
    dispatch(fetchUserGroupsStart());
    dispatch(fetchUserStoriesStart());
  }, []);
  useEffect(() => {
    // if (posts.loading) dispatch(fetchPostsStart({ type: "all" }));
    // if (profile.loading) {
    //   dispatch(fetchUserDetailsStart());
    //   setBadgeStatus(localStorage.getItem("is_verified_badge"));
    // }
  }, []);

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    dispatch(createNotification(notificationMessage));
  };
  const onVerificationBadgeChange = (event) => {
    props.dispatch(updateVerifyBadgeStatusStart());
    setTimeout(() => {
      setBadgeStatus(localStorage.getItem("is_verified_badge"));
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  console.log(profile);
  return (
    <SideNavLayout
      title={profile.data.name}
      ogType="profile"
      ogImage={profile.data.cover}
    >
      {profile.loading ? (
        <ProfileLoader></ProfileLoader>
      ) : (
        <>
          <div className="profile-bg  relative  -mt-10 ">
            <div className="relative w-full min-h-[30vh] md:min-h-[50vh]  ">
              <Image
                src={profile.data.cover}
                alt={profile.data.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                srcSet=""
                className="w-full   "
              />
            </div>
            <div
              className="w-8 h-8 rounded-full absolute z-10 top-28 left-8 bg-white cursor-pointer"
              onClick={() => router.back()}
            >
              <BsFillArrowLeftCircleFill className="h-8 w-8  " />
            </div>

            {/* <div className="row-container  absolute -bottom-16 inset-x-0  md:inset-x-auto md:-bottom-16 md:left-24">
              <div className="p-1 bg-white dark:bg-gray-700 dark:text-gray-400 rounded-3xl">
                <div className="w-36 h-36 relative rounded-3xl ">
                  <Image
                    src={profile.data.picture}
                    alt={profile.data.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-3xl"
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="px-1 md:px-4 md:pr-0 md:pl-4 grid grid-cols-1 md:grid-cols-3  bg-white dark:bg-gray-900 dark:text-gray-400 mb-10">
            <div className="space-y-3 mt-16 flex flex-col relative">
              <div className="row-container  absolute  inset-x-0 mx-auto -top-[130px] md:-top-36 2xl:-top-40 ">
                {stories && stories.length == 0 ? (
                  <div className="p-1 bg-white rounded-3xl">
                    <div className="w-36 h-36 2xl:w-52 2xl:h-52 relative rounded-3xl ">
                      <Image
                        src={profile.data.picture}
                        alt={profile.data.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl"
                      />
                    </div>
                  </div>
                ) : (
                 
                    <PulseImage image={profile.data.picture} />
                 
                )}
              </div>
              <div className="col-container ">
                <div className="flex items-center justify-center space-x-2 ">
                  <p className="text-2xl font-bold leading-[40px]">
                    {profile.data.name}
                  </p>
                  <small>
                    {profile.data.is_verified_badge == 1 ? (
                      <VerifiedBadge />
                    ) : null}
                  </small>
                </div>
                <p className="text-lg font-semibold mb-1">{`@${profile.data.username}`}</p>
              </div>

              <div className="row-container space-x-3 ">
                <div className="row-container  p-3 bg-gray-200 rounded-md">
                  <FaBell className="w-5 h-5" />
                </div>
                {/* <div className="row-container  p-3 bg-gray-200 rounded-md cursor-pointer">
                  <MdMail
                    className="w-5 h-5"
                    onClick={(event) =>
                      handleChatUser(event, profile.data.user_id)
                    }
                  />
                </div> */}
                {/* <div className="row-container  p-3 bg-gray-200 rounded-md">
                  <FaVideo className="w-5 h-5" />
                </div>
                <div className="row-container  p-3 bg-gray-200 rounded-md">
                  <GiPhone className="w-5 h-5" />
                </div> */}
                <div
                  onClick={() => setShowShare((prev) => !prev)}
                  className="row-container cursor-pointer hover:text-white hover:bg-[#FF1534]  p-3 bg-gray-200 rounded-md"
                >
                  <RiUpload2Line className="w-5 h-5" />
                </div>
              </div>
              {showShare && (
                <div
                  //style={{ boxShadow: "10px 10px 10px 10px  rgba(0,0,0,0.5", }}
                  className="drop-shadow-[10px_10px_10px_rgba(0,0,0,0.5)] hover:drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)]  w-[200px] cursor-pointer h-fit bg-white dark:bg-gray-900 dark:text-gray-400 rounded-xl ml-20 sm:ml-8 lg:ml-12 flex flex-wrap"
                >
                  <FacebookShareButton
                    url={profile.data.share_link}
                    hashtag={"#playjor"}
                    className=""
                  >
                    <FacebookIcon className="w-[50px] hover:scale-[1.1]  h-[50px] rounded-full m-2" />
                  </FacebookShareButton>
                  <TwitterShareButton url={profile.data.share_link}>
                    <TwitterIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />{" "}
                  </TwitterShareButton>
                  <WhatsappShareButton url={profile.data.share_link}>
                    <WhatsappIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                  </WhatsappShareButton>
                  <EmailShareButton
                    className=""
                    url={profile.data.share_link}
                    subject={"Playjor user profile"}
                    body={`check out ${profile.data.name}'s profile`}
                  >
                    <EmailIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                  </EmailShareButton>
                  <RedditShareButton
                    url={profile.data.share_link}
                    title={`${profile.data.name}'s profile`}
                  >
                    <RedditIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                  </RedditShareButton>
                  <TelegramShareButton
                    url={profile.data.share_link}
                    title={`check out ${profile.data.name}'s profile`}
                  >
                    <TelegramIcon className="w-[50px] hover:scale-[1.1] h-[50px] rounded-full m-2" />
                  </TelegramShareButton>
                </div>
              )}
              <div className="flex justify-around px-8">
                <div className="col-container space-y-0.5">
                  <p className="text-lg font-semibold">
                    {profile.data.total_posts}
                  </p>
                  <span>Posts</span>
                </div>
                <div
                  className="col-container space-y-0.5 rounded hover:bg-gray-200 cursor-pointer p-1"
                  onClick={() => router.push("/list/following")}
                >
                  <p className="text-lg font-semibold">
                    {profile.data.total_followings
                      ? profile.data.total_followings
                      : getCookie("total_followings")}{" "}
                  </p>
                  <span>Following</span>
                </div>
                <div
                  className="col-container space-y-0.5 rounded hover:bg-gray-200 cursor-pointer p-1 "
                  onClick={() => router.push("/list/fans")}
                >
                  <p className="text-lg font-semibold">
                    {profile.data.total_followers
                      ? profile.data.total_followers
                      : getCookie("total_followers")}
                  </p>
                  <span className="mx-2">Fans</span>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-2 ">
                <Button
                  text="Edit profile"
                  active={true}
                  onClick={() => router.push("/settings/profile")}
                  extraclassNamees="w-32 h-9"
                />

                <div
                  className="row-container w-28 h-9 rounded-md bg-[#FF1534] cursor-pointer"
                  onClick={() => router.push("/dashboard")}
                >
                  <p className="text-xs font-medium text-white">Dashboard</p>
                </div>
              </div>
              <div className="row-container bg-gray-50 dark:bg-gray-900 dark:text-gray-400 p-1 rounded-md py-2">
                <div className="bg-gray-100 p-1 rounded-md">
                  <p className="text-sm font-semibold"> About Me</p>
                </div>
              </div>
              <p className=" text-sm font-semibold text-justify">
                {profile.data.about_formatted
                  ? profile.data.about_formatted
                  : "N/A"}
              </p>
              <div className="flex flex-col">
                <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                  <BsEye className="w-4 h-4" />
                  <div className="row-container">
                    <span className="text-sm text-lightPlayRed">online</span>
                  </div>
                </div>
                <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                  <AiOutlineLink className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.data.selected_category.name
                      ? profile.data.selected_category.name
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                  <BsGenderAmbiguous className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.data.gender ? profile.data.gender : "N/A"}
                  </span>
                </div>
                <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                  <FaGlobeAfrica className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.data.timezone ? profile.data.timezone : "N/A"}
                  </span>
                </div>
                <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                  <MdOutlineLocationOn className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.data.address ? profile.data.address : "N/A"}
                  </span>
                </div>
                <div className="flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full">
                  <BsShare className="w-4 h-4" />
                  <div className="row-container space-x-2">
                    {profile.data.twitter_link ? (
                      <a
                        href={profile.data.twitter_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsTwitter className="w-4 h-4 text-[#1DA1F2]  cursor-pointer" />
                      </a>
                    ) : null}

                    {profile.data.facebook_link ? (
                      <a
                        href={profile.data.facebook_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsFacebook className="w-4 h-4 text-[#4267B2] cursor-pointer" />
                      </a>
                    ) : null}

                    {profile.data.youtube_link ? (
                      <a
                        href={profile.data.youtube_link}
                        target="_blank"
                        rel=" noreferrer"
                      >
                        <BsYoutube className="w-4 h-4 text-[#FF0000] cursor-pointer" />
                      </a>
                    ) : null}
                    {profile.data.instagram_link ? (
                      <a
                        href={profile.data.instagram_link}
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
              <ProfileTabs otherUserUniqueId={profile.data.username} />
            </div>
          </div>
        </>
      )}
      {renderSliderModal && !userStories.loading && (
        <StoriesSliderModal
          SliderModalToggle={SliderModalToggle}
          selectedSliderIndex={selectedSliderIndex}
          sliderData={sliderData}
          data={userStories.data.stories.filter(
            (files) => files.storyFiles.length > 0
          )}
          renderSliderModal={renderSliderModal}
        />
      )}
    </SideNavLayout>
  );
};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const cookies = getCookies({ req, res });

      store.dispatch(
        fetchUserDetailsStart({
          accessToken: cookies.accessToken,
        })
      );
      // store.dispatch(
      //   fetchUserStoriesStart({
      //     accessToken: cookies.accessToken,
      //   })
      // );

      // store.dispatch(
      //   fetchUserGroupsStart({
      //     accessToken: cookies.accessToken,
      //   })
      // );

      // store.dispatch(
      //   fetchUserChannelsStart({
      //     accessToken: cookies.accessToken,
      //   })
      // );

      store.dispatch(
        fetchPostsStart({
          accessToken: cookies.accessToken,
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
