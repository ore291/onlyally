import React, { Fragment, useCallback, useEffect, useState } from "react";

import { Popover, Transition } from "@headlessui/react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import TipModal from "../tips/TipModal.jsx";
import PPVPaymentModal from "../helpers/PPVPaymentModal";
import ReactAudioPlayer from "react-audio-player";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsHeart, BsHeartFill, BsThreeDots } from "react-icons/bs";
import { FaCheckCircle, FaBookmark } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Lightbox from "react-image-lightbox";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import scrollToTop from "../helpers/ScrollToTop";
import EmblaSlide from "./EmblaSlide";
import { fetchSinglePostStart } from "../../store/slices/postSlice";
import { savePostLikedStart } from "../../store/slices/postLikeSlice";
import { fetchCommentsStart } from "../../store/slices/commentsSlice";
import { saveBookmarkStart } from "../../store/slices/bookmarkSlice";
import { setPPVPaymentModal } from "../../store/slices/NavSlice";
import CommonCenterLoader from "../helpers/CommonCenterLoader";
import Comment from "./Comment";
import Comments from "./Comments";
import ReadMoreMaster from "../helpers/ReadMoreMaster";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

const NewsFeedCard = ({ post, index }) => {
  const dispatch = useDispatch();
  const cookies = getCookies();

  let totalLikes = post.total_likes ? post.total_likes : 0;

  const comments = useSelector((state) => state.comments.comments);
  const [showComments, setShowComments] = useState(false);

  const [PPVPayment, setPPVPayment] = useState(false);
  const [sendTip, setSendTip] = useState(false);
  const [commentInputData, setCommentInputData] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [commentActiveIndex, setCommentActiveIndex] = useState(null);

  const [reportMode, setReportMode] = useState(false);

  const closeReportModeModal = () => {
    setReportMode(false);
  };

  const [bookmarkStatus, setBookmarkStatus] = useState("");
  const [postDisplayStatus, setPostDisplayStatus] = useState(true);
  const [likeStatus, setLikeStatus] = useState("");
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [modalStatus, setModalStatus] = useState(0);
  const [initialRender, setInitialRender] = useState(false);
  const [likeFormatted, setLikeFormatted] = useState(post.liked_by_formatted);
  const singlePost = useSelector((state) => state.post.singlePost);

  useEffect(() => {
    if (initialRender) {
      dispatch(fetchSinglePostStart({ post_unique_id: post.post_unique_id }));
    }
    setInitialRender(true);
  }, [likeStatus]);

  useEffect(() => {
    setLikeFormatted(
      singlePost.data.post
        ? singlePost.data.post.liked_by_formatted
        : post.liked_by_formatted
    );
  }, [singlePost.data]);

  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const closeSendTipModal = () => {
    setSendTip(false);
  };
  const closePPVPaymentModal = () => {
    setPPVPayment(false);
  };

  const handleImagePreview = (event, status, paymentStatus) => {
    event.preventDefault();
    if (paymentStatus == 0) {
      setModalStatus(status);
    }
  };

  const showCommentSection = (post_id) => {
    setCommentInputData({ post_id: post_id });
    setShowComments(true);
    dispatch(fetchCommentsStart({ post_id: post_id }));
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

  const handlePPVPayment = (event, status) => {
    event.preventDefault();
    if (status && status == 1) {
      setModalStatus(0);
      setPPVPayment(true);
    } else {
      setModalStatus(1);
      setPPVPayment(false);
    }
  };

  const handleBookmark = (event, post, status) => {
    event.preventDefault();
    setBookmarkStatus(status);
    dispatch(saveBookmarkStart({ post_id: post.post_id }));
  };

  const handleReportPost = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(saveReportPostStart({ post_id: post.post_id }));
  };
  const handleBlockUser = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(saveBlockUserStart({ user_id: post.user_id }));
  };

  const handleDeletePost = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(deletePostStart({ post_id: post.post_id }));
  };

  const closeCommentSection = (event) => {
    setShowComments(false);
  };
  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleCommentActiveIndex = (index) => {
    setCommentActiveIndex(index);
  };

  const [slidesInView, setSlidesInView] = useState([]);
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const findSlidesInView = useCallback(() => {
    if (!embla) return;

    setSlidesInView((slidesInView) => {
      if (slidesInView.length === embla.slideNodes().length) {
        embla.off("select", findSlidesInView);
      }
      const inView = embla
        .slidesInView(true)
        .filter((index) => slidesInView.indexOf(index) === -1);
      return slidesInView.concat(inView);
    });
  }, [embla, setSlidesInView]);

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    findSlidesInView();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("select", findSlidesInView);
  }, [embla, setScrollSnaps, onSelect, findSlidesInView]);

  return (
    <>
      {postDisplayStatus == true ? (
        <div className="sm:rounded-2xl bg-white sm:border shadow-md w-full cursor-pointer">
          <div className="flex flex-1 justify-between items-center p-1 px-2 sm:px-4 sm:p-4 border-b">
            <Link passHref href={`/profile/${post.user_unique_id}`}>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="relative w-12 h-12 rounded-full shadow-sm bg-gray-500 border-gray-700">
                  <Image
                    layout="fill"
                    src={post.user_picture}
                    objectFit="cover"
                    className="rounded-full"
                    alt=""
                  />
                </div>

                <div className="flex space-x-1 text-sm md:text-lg  items-center justify-center">
                  <h2 className=" font-semibold leading-none">
                    {post.user_displayname}
                  </h2>
                  {post.is_verified_badge == 1 ? (
                    <FaCheckCircle className="w-3 h-3 text-playRed" />
                  ) : null}

                  <span className="inline-block  text-xs leading-none text-textPlayRed">
                    @{post.username}
                  </span>
                </div>
              </div>
            </Link>
            <div className="row-container space-x-1 md:space-x-3">
              <span className="text-xs sm:text-sm text-gray-600 font-light ">
                {post.publish_time_formatted}
              </span>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                ${open ? "" : "text-opacity-90"}
                group  hover:text-opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 align-middle`}
                    >
                      <BsThreeDots className="h-6 w-6 font-semibold rotate-90 lg:rotate-0" />
                    </Popover.Button>
                    {open && (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterhref="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leavehref="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          static
                          className="absolute z-10 w-[250px] lg:w-[20vw]  mt-3 transform shadow-md right-4 lg:translate-x-1/2 sm:px-0 lg:max-w-3xl"
                        >
                          <div className="overflow-hidden rounded-lg ">
                            <div className="relative grid gap-y-2 bg-white p-1 grid-cols-1">
                              <CopyToClipboard
                                text={post.share_link}
                                onCopy={() =>
                                  console.log("notification copied")
                                }
                              >
                                <div className="hover:bg-gray-100 hover:text-red-500  border-b h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                                  <p className="font-bold text-xs">
                                    Copy link to post
                                  </p>
                                </div>
                              </CopyToClipboard>
                              {userId != post.user_id ? (
                                <div className="hover:bg-gray-100 hover:text-red-500  h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                                  {/* onClick={() => setReportMode(true)} */}
                                  <p className="font-bold text-xs">Report</p>
                                </div>
                              ) : null}
                              {userId != post.user_id ? (
                                <div className="hover:bg-gray-100 hover:text-red-500  h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                                  <p className="font-bold text-xs">
                                    {/* onClick={(event) => handleBlockUser(event, post)} */}
                                    Add to blocklists.
                                  </p>
                                </div>
                              ) : null}
                              {post.delete_btn_status == 1 ? (
                                <div className="hover:bg-gray-100 hover:text-red-500  h-8 p-2 rounded-md cursor-pointer flex items-center justify-start">
                                  <p className="font-bold text-xs">
                                    {/* onClick={(event) => handleDeletePost(event, post)} */}
                                    Delete Post.
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    )}
                  </>
                )}
              </Popover>
            </div>
          </div>
          <div>
            <div
              className={`${
                post.content == undefined
                  ? "hidden"
                  : "p-2 break-words text-[14px] font-normal leading-5 tracking-wide"
              }`}
            >
              <ReadMoreMaster byWords={true} length={5} ellipsis="...">
                {post.content}
              </ReadMoreMaster>
            </div>

            <div className="embla">
              <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                  {post.postFiles
                    ? post.postFiles.length > 0
                      ? post.postFiles.map((postFile, index) =>
                          postFile.file_type === "image" ? (
                            PPVPayment ? null : (
                              <EmblaSlide
                                post={post}
                                postFile={postFile}
                                handlePPVPayment={handlePPVPayment}
                                key={index}
                                index={index}
                                inView={slidesInView.indexOf(index) > -1}
                              />
                            )
                          ) : postFile.file_type === "video" ? (
                            <div className="embla__slide" key={index}>
                              <div className="postImage postVideo">
                                <div className="">
                                  <div className="gallery js-gallery">
                                    {post.payment_info.is_user_needs_pay ==
                                    1 ? (
                                      <div className="gallery-img-sec">
                                        <div className="postViewImg relative">
                                          <Image
                                            layout="fill"
                                            alt=""
                                            src={
                                              postFile.preview_file
                                                ? postFile.preview_file
                                                : postFile.post_file
                                            }
                                            className="postViewImg"
                                          />
                                        </div>

                                        <div className="gallery-play-icon"></div>
                                      </div>
                                    ) : (
                                      <ReactPlayer
                                        light={postFile.preview_file}
                                        url={postFile.post_file}
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                        playing
                                        className="post-video-size"
                                      />
                                    )}
                                    {post.payment_info.is_user_needs_pay ===
                                      1 &&
                                    post.payment_info.post_payment_type ===
                                      "ppv" ? (
                                      <div className="gallery-top-btn-sec">
                                        <button
                                          className="gallery-pay-button"
                                          onClick={(event) =>
                                            handlePPVPayment(event, 1)
                                          }
                                        >
                                          {post.payment_info.payment_text}
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {post.payment_info.is_user_needs_pay ===
                                      1 &&
                                    post.payment_info.post_payment_type ===
                                      "subscription" ? (
                                      scrollToTop ? (
                                        <div
                                          className="gallery-top-btn-sec"
                                          // onClick={scrollToTop}
                                        >
                                          <button className="gallery-pay-button">
                                            {post.payment_info.payment_text}
                                          </button>
                                        </div>
                                      ) : (
                                        <Link to={`/` + post.user.unique_id}>
                                          <div className="gallery-top-btn-sec">
                                            <button className="subscribe-post-btn-sec">
                                              {post.payment_info.payment_text}
                                            </button>
                                          </div>
                                        </Link>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : postFile.file_type === "audio" ? (
                            <div className="embla__slide" key={index}>
                              <div className="post-image post-video">
                                <div className="">
                                  <div className="gallery js-gallery">
                                    {post.payment_info.is_user_needs_pay ==
                                    1 ? (
                                      <div className="gallery-img-sec">
                                        <Image
                                          alt=""
                                          layout="fill"
                                          src={
                                            postFile.preview_file
                                              ? postFile.preview_file
                                              : postFile.post_file
                                          }
                                          className="post-view-image"
                                        />
                                        <div className="gallery-play-icon"></div>
                                      </div>
                                    ) : (
                                      <ReactAudioPlayer
                                        // light={postFile.preview_file}
                                        src={postFile.post_file}
                                        // file="forceAudio"
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                        autoPlay={false}
                                        className="post-video-size"
                                        controlsList={"nodownload"}
                                      />
                                    )}
                                    {post.payment_info.is_user_needs_pay ===
                                      1 &&
                                    post.payment_info.post_payment_type ===
                                      "ppv" ? (
                                      <div className="gallery-pay-button-div">
                                        <button
                                          className="gallery-pay-button"
                                          onClick={(event) =>
                                            handlePPVPayment(event, 1)
                                          }
                                        >
                                          {post.payment_info.payment_text}
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {post.payment_info.is_user_needs_pay ===
                                      1 &&
                                    post.payment_info.post_payment_type ===
                                      "subscription" ? (
                                      scrollToTop ? (
                                        <div
                                          className="gallery-pay-button-div"
                                          // onClick={scrollToTop}
                                        >
                                          <button className="gallery-pay-button">
                                            {post.payment_info.payment_text}
                                          </button>
                                        </div>
                                      ) : (
                                        <Link to={`/` + post.user.unique_id}>
                                          <div className="gallery-pay-button-div">
                                            <button className="gallery-pay-button">
                                              {post.payment_info.payment_text}
                                            </button>
                                          </div>
                                        </Link>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )
                        )
                      : null
                    : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                scrollSnaps.length != 1 ? "embla__navigator" : "hidden"
              }`}
            >
              {scrollSnaps.map((_, index) => (
                <div
                  className="embla__dots"
                  key={index}
                  style={{
                    backgroundColor:
                      selectedIndex === index ? "lightblue" : "lightgray",
                  }}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </div>

          <div className="p-1 px-1 md:p-3 md:px-7">
            <div className="flex items-center justify-between px-2">
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

                        <p
                          className={`${
                            likeCount == 0 ? "hidden" : "post-like-text"
                          }`}
                        >{`${likeCount} ${
                          likeCount > 1 ? "likes" : "like"
                        }`}</p>
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

                        <p
                          className={`${
                            likeCount == 0 ? "hidden" : "post-like-text"
                          }`}
                        >{`${likeCount} ${
                          likeCount > 1 ? "likes" : "like"
                        }`}</p>
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

                  <p
                    className={`${
                      likeCount == 0 ? "hidden" : "post-like-text"
                    }`}
                  >{`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}</p>
                </button>
              ) : (
                <button
                  to="#"
                  className=" row-container "
                  onClick={(event) => handleLike(event, "added")}
                >
                  <BsHeart className="news-feed-card-icon " />

                  <p
                    className={`${
                      likeCount == 0 ? "hidden" : "post-like-text"
                    }`}
                  >{`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}</p>
                </button>
              )}

              <button
                onClick={() => showCommentSection(post.post_id)}
                type="button"
                title="Add a comment"
                className="flex items-center justify-center space-x-1"
              >
                <div className="relative news-feed-card-icon">
                  <Image
                    layout="fill"
                    src="/materials/icons8-speech-48.png"
                    alt=""
                  />
                </div>
                <span className="text-sm">{post.total_comments}</span>
              </button>
              {cookies.userId != post.user_id ? (
                <button
                  type="button"
                  title="Donate to post"
                  className="flex items-center justify-center space-x-1"
                  onClick={() => setSendTip(true)}
                >
                  <div className="relative news-feed-card-icon">
                    <Image
                      layout="fill"
                      src="/tips.png"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                  <span className="text-xs">Tip</span>
                </button>
              ) : null}

              {bookmarkStatus !== "" ? (
                <>
                  <>
                    {bookmarkStatus === "added" ? (
                      <button
                        onClick={(event) =>
                          handleBookmark(event, post, "removed")
                        }
                        type="button"
                        title="Bookmark post"
                        className="flex items-center justify-center"
                      >
                        <FaBookmark className="news-feed-card-icon text-lightPlayRed" />
                      </button>
                    ) : null}
                  </>
                  <>
                    {bookmarkStatus === "removed" ? (
                      <button
                        onClick={(event) =>
                          handleBookmark(event, post, "added")
                        }
                        type="button"
                        title="Bookmark post"
                        className="flex items-center justify-center"
                      >
                        <FaBookmark className="news-feed-card-icon " />
                      </button>
                    ) : null}
                  </>
                </>
              ) : post.is_user_bookmarked == 1 ? (
                <button
                  onClick={(event) => handleBookmark(event, post, "removed")}
                  type="button"
                  title="Bookmark post"
                  className="flex items-center justify-center"
                >
                  <FaBookmark className="news-feed-card-icon text-lightPlayRed" />
                </button>
              ) : (
                <button
                  onClick={(event) => handleBookmark(event, post, "added")}
                  type="button"
                  title="Bookmark post"
                  className="flex items-center justify-center"
                >
                  <FaBookmark className="news-feed-card-icon " />
                </button>
              )}
            </div>
            {post.like_count > 0 && (
              <div className="likes py-1">
                <p
                  className={`${likeCount == 0 ? "hidden" : "post-like-text"}`}
                >
                  {likeFormatted}
                </p>
              </div>
            )}
            {showComments && comments.inputData.post_id === post.post_id ? (
              post.total_comments > 0 && (
                <a
                  to="#"
                  className="Show view-comments  d-block pt-3 border-t border-gray-600 mt-4"
                  onClick={() => closeCommentSection()}
                >
                  Hide comments
                </a>
              )
            ) : (
              <>
                {post.total_comments > 0 && (
                  <a
                    to="#"
                    className="Show view-comments text-muted d-block pt-3"
                    onClick={() => showCommentSection(post.post_id)}
                  >
                    View comments
                  </a>
                )}
              </>
            )}
            <div className="">
              {showComments && comments.inputData.post_id === post.post_id ? (
                <div className="grid grid-cols-1 gap-y-5">
                  {comments.loading ? (
                    <CommonCenterLoader />
                  ) : comments.data.post_comments &&
                    comments.data.post_comments.length > 0 ? (
                    comments.data.post_comments.map((comment, index) => (
                      <Comment
                        comment={comment}
                        key={index}
                        index={index}
                        post={post}
                      />
                    ))
                  ) : (
                    ""
                  )}
                </div>
              ) : null}
            </div>
            <Comments key="index" post={post} currentIndex={index} />

            {cookies.userId !== "" &&
            cookies.userId !== null &&
            cookies.userId !== undefined ? (
              <>
                <TipModal
                  sendTip={sendTip}
                  closeSendTipModal={closeSendTipModal}
                  username={post.username}
                  userPicture={post.user_picture}
                  name={post.user_displayname}
                  post_id={post.post_id}
                  user_id={post.user_id}
                ></TipModal>
                <PPVPaymentModal
                  PPVPayment={PPVPayment}
                  closePPVPaymentModal={closePPVPaymentModal}
                  post={post}
                  username={post.username}
                  userPicture={post.user_picture}
                  name={post.user_displayname}
                  post_id={post.post_id}
                  user_id={post.user_id}
                  amount={post.amount}
                />
                {/* <ReportModeModal
                reportMode={reportMode}
                closeReportModeModal={closeReportModeModal}
                post={post}
              />  */}
              </>
            ) : null}
          </div>
          <div />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NewsFeedCard;
