import React, { useState } from "react";
import Link from "next/link";
import { savePostLikedStart } from "../../store/slices/postLikeSlice";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "reapop";
import Image from "next/image";
import { BsHeartFill, BsHeart, BsThreeDots } from "react-icons/bs";

const ExplorePostCard = ({ post }) => {
  const dispatch = useDispatch();

  let totalLikes = post.total_likes ? post.total_likes : 0;

  const [likeStatus, setLikeStatus] = useState("");
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [postDisplayStatus, setPostDisplayStatus] = useState(true);
  const [reportMode, setReportMode] = useState(false);

  const closeReportModeModal = () => {
    setReportMode(false);
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

  return (
    <div className="exploreCard">
      <Link href={`/profile/${post.user_unique_id}`} passHref>
        <div className="relative w-full h-[20em] cursor-pointer">
          <Image
            layout="fill"
            objectFit="cover"
            src={
              post.postFiles.post_file ?? "/images/live/live-stream-post-1.jpg"
            }
            alt=""
          />
        </div>
      </Link>
      <div className="flex items-center justify-between p-[1em]">
        <div className="flex items-center">
          <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-[2px] rounded-full">
            <div className="bg-white p-[2px] rounded-full ">
              <div className="h-[40px] w-[40px]  relative rounded-full">
                <Image
                  className="rounded-full"
                  layout="fill"
                  objectFit="fill"
                  src={post.user_picture}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pl-3">
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
            <BsThreeDots className="h-4 w-4"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePostCard;
