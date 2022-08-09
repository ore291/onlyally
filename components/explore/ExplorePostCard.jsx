import React, { useState, useRef } from "react";
import Link from "next/link";
import { savePostLikedStart } from "../../store/slices/postLikeSlice";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "reapop";
import Image from "next/image";
import { BsHeartFill, BsHeart, BsThreeDots } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import ReactAudioPlayer from "react-audio-player";
import {
  FaBookmark,
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaRegPlayCircle,
} from "react-icons/fa";

const ExplorePostCard = ({ post, type }) => {
  const dispatch = useDispatch();

  let totalLikes = post.total_likes ? post.total_likes : 0;

  const [likeStatus, setLikeStatus] = useState("");
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [postDisplayStatus, setPostDisplayStatus] = useState(true);
  const [reportMode, setReportMode] = useState(false);

  const closeReportModeModal = () => {
    setReportMode(false);
  };

  const audio = useRef();
  const [playing, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const playAudio = () => {
    if (playing === false) {
      togglePlaying;
      audio.current.audioEl.current.play();
    } else {
      audio.current.audioEl.current.pause();
      togglePlaying;
    }
  };

  const handleLike = (event, status) => {
    event.preventDefault();
    setLikeStatus(status);
    dispatch(savePostLikedStart({ post_id: post.post_id }));
    if (status == "added") {
      let currentLikeCount = likeCount + 1;
      setLikeCount(currentLikeCount);
    } else {
      let currentLikeCount = likeCount - 1;
      setLikeCount(currentLikeCount);
    }
  };

  const onCopy = (event) => {
    dispatch(notify({ message: "profile link copied", status: "info" }));
  };

  const handleReportPost = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(saveReportPostStart({ post_id: post.post_id }));
  };

  if (type === "audio") {
    return (
      <div className="exploreCard">
        {post.is_paid_post == 1 ? (
          <div className="relative w-full h-[20em] cursor-pointer rounded-md border shadow-md">
            <Image
              layout="fill"
              objectFit="cover"
              alt=""
              src={
                post.postFiles.blur_file
                  ? post.postFiles.blur_file
                  : "/images/no-image-found.png"
              }
              className={`postViewImg blur-[20px] rounded-sm`}
            />
            <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
          </div>
        ) : (
          <div
            className="p-2 w-full h-[20em] relative"
            style={{
              backgroundImage: `url(${post.user.cover})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <button
              className="absolute w-10 h-10 inset-0 m-auto z-20"
              onClick={playAudio}
            >
              {playing ? (
                <FaPause className="text-lightPlayRed  stroke-lightPlayRed  h-10 w-10" />
              ) : (
                <FiPlay className="text-lightPlayRed stroke-1 stroke-white fill-lightPlayRed h-10 w-10" />
              )}
            </button>
            <div className="p-0.5 bg-white rounded-full absolute inset-0  m-auto w-[100px] h-[100px]">
              <div className="relative w-full h-full">
                <Image
                  src={post.user_picture}
                  alt="user"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <ReactAudioPlayer
              // light={postFile.preview_file}
              src={post.postFiles.post_file}
              // file="forceAudio"
              controls={true}
              width="80%"
              height="100%"
              autoPlay={false}
              className="post-video-size absolute bottom-3"
              controlsList={"nodownload"}
              ref={audio}
              onPause={togglePlaying}
              onPlay={togglePlaying}
            />
          </div>
        )}

        <div className="flex items-center justify-between p-[1em]">
          <div className="flex items-center">
            <Link href={`/profile/${post.user_unique_id}`} passHref>
              <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-[2px] rounded-full">
                <div className="bg-white p-[2px] rounded-full ">
                  <div className="h-[40px] w-[40px]  relative rounded-full">
                    <Image
                      className="rounded-full cursor-pointer"
                      layout="fill"
                      objectFit="fill"
                      src={post.user_picture}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Link>
            <div className="pl-3 cursor-pointer">
              <Link href={`/profile/${post.user_unique_id}`} passHref>
                <h4 className="font-semibold text-[#6f6f6f] text-sm whitespace-nowrap text-ellipsis my-0 overflow-hidden w-[7em]">
                  {post.user_displayname}
                </h4>
              </Link>
              <p className="text-xs">{post.created}</p>
            </div>
          </div>
          <div>
            <div className="row-container my-0 pl-0 space-x-2">
              <span>{likeCount} likes</span>
              {likeStatus !== "" ? (
                <>
                  <>
                    {likeStatus === "added" ? (
                      <button
                        className=" row-container "
                        to="#"
                        onClick={(event) => handleLike(event, "removed")}
                      >
                        <BsHeartFill className="news-feed-card-icon text-lightPlayRed" />
                      </button>
                    ) : null}
                  </>
                  <>
                    {likeStatus === "removed" ? (
                      <button
                        to="#"
                        className=" row-container "
                        onClick={(event) => handleLike(event, "added")}
                      >
                        <BsHeart className="news-feed-card-icon" />
                      </button>
                    ) : null}
                  </>
                </>
              ) : post.is_user_liked == 1 ? (
                <button
                  to="#"
                  className=" row-container "
                  onClick={(event) => handleLike(event, "removed")}
                >
                  <BsHeartFill className="news-feed-card-icon text-lightPlayRed" />
                </button>
              ) : (
                <button
                  to="#"
                  className=" row-container "
                  onClick={(event) => handleLike(event, "added")}
                >
                  <BsHeart className="news-feed-card-icon " />
                </button>
              )}
              <BsThreeDots className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="exploreCard">
        <Link href={`/post/${post.post_unique_id}`} passHref>
          {post.is_paid_post == 1 ? (
            <div className="relative w-full h-[20em] cursor-pointer rounded-md border shadow-md">
              <Image
                layout="fill"
                objectFit="cover"
                alt=""
                src={
                  post.postFiles.blur_file
                    ? post.postFiles.blur_file
                    : "/images/no-image-found.png"
                }
                className={`postViewImg blur-[20px] rounded-sm`}
              />
              <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
            </div>
          ) : (
            <div className="relative w-full h-[20em] cursor-pointer rounded-sm">
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  post.postFiles.preview_file ?  post.postFiles.preview_file :
                  "/images/live/live-stream-post-1.jpg"
                }
                alt=""
                className="rounded-sm"
              />
              <FiPlay className="h-10 w-10 text-lightPlayRed centered-axis-xy stroke-1 stroke-white fill-lightPlayRed " />
            </div>
          )}
        </Link>
        <div className="flex items-center justify-between p-[1em]">
          <div className="flex items-center">
            <Link href={`/profile/${post.user_unique_id}`} passHref>
              <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-[2px] rounded-full">
                <div className="bg-white p-[2px] rounded-full ">
                  <div className="h-[40px] w-[40px]  relative rounded-full">
                    <Image
                      className="rounded-full cursor-pointer"
                      layout="fill"
                      objectFit="fill"
                      src={post.user_picture}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Link>
            <div className="pl-3 cursor-pointer">
              <Link href={`/profile/${post.user_unique_id}`} passHref>
                <h4 className="font-semibold text-[#6f6f6f] text-sm whitespace-nowrap text-ellipsis my-0 overflow-hidden w-[7em]">
                  {post.user_displayname}
                </h4>
              </Link>
              <p className="text-xs">{post.created}</p>
            </div>
          </div>
          <div>
            <div className="row-container my-0 pl-0 space-x-2">
              <span>{likeCount} likes</span>
              {likeStatus !== "" ? (
                <>
                  <>
                    {likeStatus === "added" ? (
                      <button
                        className=" row-container "
                        to="#"
                        onClick={(event) => handleLike(event, "removed")}
                      >
                        <BsHeartFill className="news-feed-card-icon text-lightPlayRed" />
                      </button>
                    ) : null}
                  </>
                  <>
                    {likeStatus === "removed" ? (
                      <button
                        to="#"
                        className=" row-container "
                        onClick={(event) => handleLike(event, "added")}
                      >
                        <BsHeart className="news-feed-card-icon" />
                      </button>
                    ) : null}
                  </>
                </>
              ) : post.is_user_liked == 1 ? (
                <button
                  to="#"
                  className=" row-container "
                  onClick={(event) => handleLike(event, "removed")}
                >
                  <BsHeartFill className="news-feed-card-icon text-lightPlayRed" />
                </button>
              ) : (
                <button
                  to="#"
                  className=" row-container "
                  onClick={(event) => handleLike(event, "added")}
                >
                  <BsHeart className="news-feed-card-icon " />
                </button>
              )}
              <BsThreeDots className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exploreCard">
      <Link href={`/post/${post.post_unique_id}`} passHref>
        {post.is_paid_post == 1 ? (
          <div className="relative w-full h-[20em] cursor-pointer rounded-md border shadow-md">
            <Image
              layout="fill"
              objectFit="cover"
              alt=""
              src={
                post.postFiles.blur_file
                  ? post.postFiles.blur_file
                  : "/images/no-image-found.png"
              }
              className={`postViewImg blur-[20px] rounded-sm`}
            />
            <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
          </div>
        ) : (
          <div className="relative w-full h-[20em] cursor-pointer rounded-sm">
            <Image
              layout="fill"
              objectFit="cover"
              src={
                post.postFiles.post_file ??
                "/images/live/live-stream-post-1.jpg"
              }
              alt=""
              className="rounded-sm"
            />
          </div>
        )}
      </Link>
      <div className="flex items-center justify-between p-[1em]">
        <div className="flex items-center">
          <Link href={`/profile/${post.user_unique_id}`} passHref>
            <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-[2px] rounded-full">
              <div className="bg-white p-[2px] rounded-full ">
                <div className="h-[40px] w-[40px]  relative rounded-full">
                  <Image
                    className="rounded-full cursor-pointer"
                    layout="fill"
                    objectFit="fill"
                    src={post.user_picture}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>
          <div className="pl-3 cursor-pointer">
            <Link href={`/profile/${post.user_unique_id}`} passHref>
              <h4 className="font-semibold text-[#6f6f6f] text-sm whitespace-nowrap text-ellipsis my-0 overflow-hidden w-[7em]">
                {post.user_displayname}
              </h4>
            </Link>
            <p className="text-xs">{post.created}</p>
          </div>
        </div>
        <div>
          <div className="row-container my-0 pl-0 space-x-2">
            <span>{likeCount} likes</span>
            {likeStatus !== "" ? (
              <>
                <>
                  {likeStatus === "added" ? (
                    <button
                      className=" row-container "
                      to="#"
                      onClick={(event) => handleLike(event, "removed")}
                    >
                      <BsHeartFill className="news-feed-card-icon text-lightPlayRed" />
                    </button>
                  ) : null}
                </>
                <>
                  {likeStatus === "removed" ? (
                    <button
                      to="#"
                      className=" row-container "
                      onClick={(event) => handleLike(event, "added")}
                    >
                      <BsHeart className="news-feed-card-icon" />
                    </button>
                  ) : null}
                </>
              </>
            ) : post.is_user_liked == 1 ? (
              <button
                to="#"
                className=" row-container "
                onClick={(event) => handleLike(event, "removed")}
              >
                <BsHeartFill className="news-feed-card-icon text-lightPlayRed" />
              </button>
            ) : (
              <button
                to="#"
                className=" row-container "
                onClick={(event) => handleLike(event, "added")}
              >
                <BsHeart className="news-feed-card-icon " />
              </button>
            )}
            <BsThreeDots className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePostCard;
