import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { savePostLikedStart } from "../../store/slices/postLikeSlice";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "reapop";
import Image from "../helpers/CustomImage";
import { BsHeartFill, BsHeart, BsThreeDots } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import ReactAudioPlayer from "react-audio-player";
import useEmblaCarousel from "embla-carousel-react";
import EmblaSlideChannel from "./EmblaSlideChannel";
import {
  FaBookmark,
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaRegPlayCircle,
} from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { useCallback } from "react";
import EmblaSlide from "../feeds/EmblaSlide";

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
    if (typeof window !== "undefined") {
      if (playing === false) {
        togglePlaying;
        audio.current.audioEl.current.play();
      } else {
        audio.current.audioEl.current.pause();
        togglePlaying;
      }
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

  if (type === "video") {
    return (
      <div className="exploreCard">
        <Link href={`/channels/${post.postable.slug}`} passHref>
          {post.payment_info.is_user_needs_pay == 1 ? (
            <div className="relative w-full h-[230px] cursor-pointer rounded-md border shadow-md">
              <Image
                layout="fill"
                objectFit="cover"
                alt=""
                fallbackSrc="/images/no-image-found.png"
                src={
                  post.post_files
                    ? post.post_files.blur_file
                    : post.postFiles
                    ? post.postFiles.blur_file
                    : "/images/no-image-found.png"
                }
                className={`postViewImg blur-[20px] rounded-sm object-cover`}
              />
              <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
            </div>
          ) : (
            <div className="relative w-full h-[230px] cursor-pointer rounded-sm">
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  post.post_files
                    ? post.post_files.preview_file
                    : post.postFiles
                    ? post.postFiles.preview_file
                    : "/images/live/live-stream-post-1.jpg"
                }
                fallbackSrc="/images/live/live-stream-post-1.jpg"
                alt=""
                className="rounded-sm object-cover"
              />
              <FaPlay className="h-8 w-8 text-lightPlayRed centered-axis-xy" />
            </div>
          )}
        </Link>
        <div className="p-2">
          <div className="flex items center justify-start">
            <div className="flex flex-col space-y-1">
              <span className="text-lg text-gray-700 font-bold truncate max-w-full">
                {post?.postable?.name}
              </span>
              <span className="text-xs font-semibold text-gray-400 ">
                {post?.postable.category.name}
              </span>
            </div>
          </div>
          <div className="flex items center justify-end space-x-1">
            <div className="row-container space-x-1">
              <BsHeartFill className="w-3 h-3 text-gray-300" />
              <span className="text-sm text-gray-300">
                {post?.post_likes_count}
              </span>
            </div>
            <div className="row-container space-x-1">
              <BiCommentDetail className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">
                {post?.post_comments_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "audio" && typeof window !== "undefined") {
    return (
      <div className="exploreCard">
        {post.payment_info.is_user_needs_pay == 1 ? (
          <Link href={`/channels/${post.postable.slug}`} passHref>
            <div className="relative w-full h-[230px] cursor-pointer rounded-md border shadow-md">
              <Image
                layout="fill"
                objectFit="cover"
                alt=""
                src={
                  post.post_files
                    ? post.post_files.blur_file
                    : post.postFiles
                    ? post.postFiles.blur_file
                    : "/images/no-image-found.png"
                }
                className={`postViewImg blur-[20px] rounded-sm`}
              />
              <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
            </div>
          </Link>
        ) : (
          <div
            className="p-2 w-full h-[230px] relative"
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
              src={
                post.post_files
                  ? post.post_files.file || post.post_files[0]?.file
                  : post.postFiles.file
                  ? post.postFiles.file
                  : post.postFiles[0]?.file
              }
              // file="forceAudio"
              controls={true}
              width="90%"
              height="100%"
              autoPlay={false}
              className="absolute mx-auto bottom-3 inset-x-0 min-w-full "
              controlsList={"nodownload"}
              ref={audio}
              onPause={togglePlaying}
              onPlay={togglePlaying}
            />
          </div>
        )}

        <div className="p-2">
          <div className="flex items center justify-start">
            <div className="flex flex-col space-y-1">
              <span className="text-lg text-gray-700 font-bold truncate max-w-full">
                {post?.postable?.name}
              </span>
              <span className="text-xs font-semibold text-gray-400 ">
                {post?.postable.category.name}
              </span>
            </div>
          </div>
          <div className="flex items center justify-end space-x-1">
            <div className="row-container space-x-1">
              <BsHeartFill className="w-3 h-3 text-gray-300" />
              <span className="text-sm text-gray-300">
                {post?.post_likes_count}
              </span>
            </div>
            <div className="row-container space-x-1">
              <BiCommentDetail className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">
                {post?.post_comments_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "image") {
    return (
      <div className="exploreCard">
        <Link href={`/channels/${post.postable.slug}`} passHref>
          {post.payment_info.is_user_needs_pay == 1 ? (
            <div className="relative w-full h-[230px] cursor-pointer rounded-md border shadow-md">
              <Image
                layout="fill"
                objectFit="cover"
                alt=""
                src={
                  post.post_files
                    ? post.post_files.blur_file
                    : post.postFiles
                    ? post.postFiles.blur_file
                    : "/images/no-image-found.png"
                }
                className={`postViewImg blur-[20px] rounded-sm`}
              />
              <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
            </div>
          ) : (
            <div className="relative w-full h-[230px] cursor-pointer rounded-sm">
              {post.post_files.length > 0 ? (
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  src={post.post_files[0].file}
                />
              ) : (
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  src={
                    post.post_files
                      ? post.post_files.blur_file
                      : post.postFiles
                      ? post.postFiles.blur_file
                      : "/images/no-image-found.png"
                  }
                  className={`postViewImg blur-[20px] rounded-sm`}
                />
              )}
            </div>
          )}
        </Link>
        <div className="p-2">
          <div className="flex items center justify-start">
            <div className="flex flex-col space-y-1">
              <span className="text-lg text-gray-700 font-bold truncate max-w-full">
                {post?.postable?.name}
              </span>
              <span className="text-xs font-semibold text-gray-400 ">
                {post?.postable.category.name}
              </span>
            </div>
          </div>
          <div className="flex items center justify-end space-x-1">
            <div className="row-container space-x-1">
              <BsHeartFill className="w-3 h-3 text-gray-300" />
              <span className="text-sm text-gray-300">
                {post?.post_likes_count}
              </span>
            </div>
            <div className="row-container space-x-1">
              <BiCommentDetail className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">
                {post?.post_comments_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exploreCard">
      <Link href={`/post/${post.post_unique_id}`} passHref>
        {post.payment_info.is_user_needs_pay == 1 ? (
          <div className="relative w-full h-[230px] cursor-pointer rounded-md border shadow-md">
            <Image
              layout="fill"
              objectFit="cover"
              alt=""
              src={
                post.post_files
                  ? post.post_files.blur_file
                  : post.postFiles
                  ? post.postFiles.blur_file
                  : "/images/no-image-found.png"
              }
              className={`postViewImg blur-[20px] rounded-sm`}
            />
            <MdLockOutline className="h-8 w-8 text-white centered-axis-xy " />
          </div>
        ) : (
          <div className="relative w-full h-[230px] cursor-pointer rounded-sm">
            <Image
              layout="fill"
              objectFit="cover"
              src={
                post.post_files
                  ? post.post_files
                  : post.postFiles.file || "/images/live/live-stream-post-1.jpg"
              }
              alt=""
              className="rounded-sm"
            />
          </div>
        )}
      </Link>
      <div className="p-2">
        <div className="flex items center justify-start">
          <div className="flex flex-col space-y-1">
            <span className="text-lg text-gray-700 font-bold truncate max-w-full">
              {post?.postable?.name}
            </span>
            <span className="text-xs font-semibold text-gray-400 ">
              {post?.postable.category.name}
            </span>
          </div>
        </div>
        <div className="flex items center justify-end space-x-1">
          <div className="row-container space-x-1">
            <BsHeartFill className="w-3 h-3 text-gray-300" />
            <span className="text-sm text-gray-300">
              {post?.post_likes_count}
            </span>
          </div>
          <div className="row-container space-x-1">
            <BiCommentDetail className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300">
              {post?.post_comments_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePostCard;
