/* eslint-disable react-hooks/exhaustive-deps */
import SideNavLayout from "../../components/SideNavLayout";
import ProfileTabs from "../../components/userProfile/ProfileTabs";
import Button from "../../components/Button";
import Image from "next/image";
import ProfileLoader from "../../components/Profile/ProfileLoader";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";

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
import { useEffect, useState } from "react";
import VerifiedBadge from "../../components/handlers/VerifiedBadge";
import configuration from "react-global-configuration";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const profile = useSelector((state) => state.user.profile);
  const posts = useSelector((state) => state.post.posts);

  const [badgeStatus, setBadgeStatus] = useState(0);

  const [activeSec, setActiveSec] = useState("post");

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (posts.loading) dispatch(fetchPostsStart({ type: "all" }));
    if (profile.loading) {
      dispatch(fetchUserDetailsStart());
      setBadgeStatus(localStorage.getItem("is_verified_badge"));
    }
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

  return (
    <SideNavLayout>
      {profile.loading ? (
        <ProfileLoader></ProfileLoader>
      ) : (
        <>
          <div className="profile-bg  relative  -mt-20 ">
            <div className="relative w-full !h-[50vh] md:!h-[70vh]">
              <Image
                src={profile.data.cover}
                alt={profile.data.name}
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

            <div className="row-container  absolute -bottom-16 inset-x-0  md:inset-x-auto md:-bottom-16 md:left-24">
              <div className="p-1 bg-white rounded-3xl">
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
            </div>
          </div>
          <div className="px-4 md:pr-0 md:pl-4 grid grid-cols-1 md:grid-cols-3  bg-white mb-10">
            <div className="space-y-3 mt-16 flex flex-col ">
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
                  <p className="text-lg font-semibold">{posts.data.total}</p>
                  <span>Posts</span>
                </div>
                <div className="col-container space-y-0.5">
                  <p className="text-lg font-semibold">
                    {localStorage.getItem("total_followings")
                      ? localStorage.getItem("total_followings")
                      : 0}{" "}
                  </p>
                  <span>Following</span>
                </div>
                <div className="col-container space-y-0.5">
                  <p className="text-lg font-semibold">
                    {localStorage.getItem("total_followers")
                      ? localStorage.getItem("total_followers")
                      : 0}
                  </p>
                  <span>Fans</span>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-2 ">
                <Button
                  text="Edit profile"
                  active={true}
                  extraClasses="w-32 h-9"
                />

                <div className="row-container w-28 h-9 rounded-md bg-[#FF1534] cursor-pointer">
                  <p className="text-xs font-medium text-white">Dashboard</p>
                </div>
              </div>
              <div className="row-container bg-gray-50 p-1 rounded-md py-2">
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
    </SideNavLayout>
  );
};

export default Profile;
