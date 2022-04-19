import { Popover, Transition } from "@headlessui/react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsHeart, BsThreeDots } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Lightbox from "react-image-lightbox";
import ReactPlayer from "react-player/lazy";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../Button";
import scrollToTop from "../helpers/ScrollToTop";
import EmblaSlide from "./EmblaSlide";

const NewsFeedCard = ({
  // image,
  // user,
  // // likeCount,
  // commentCount,
  post,
  // description,
  // popularComments,
  // time,
  // main,
}) => {
  const dispatch = useDispatch();

  let totalLikes = post.total_likes ? post.total_likes : 0;

  const [comments, setComments] = useState([]);
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

  // useEffect(() => {
  //   if (initialRender) {
  //     dispatch(
  //       fetchSinglePostStart({ post_unique_id: post.post_unique_id })
  //     );
  //   }
  //   setInitialRender(true);
  // }, [likeStatus]);

  // useEffect(() => {
  //   setLikeFormatted(
  //     props.singlePost.data.post
  //       ? props.singlePost.data.post.liked_by_formatted
  //       : post.liked_by_formatted
  //   );

  // }, [props.singlePost.data]);

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

  const showCommentSection = (event, post_id) => {
    setCommentInputData({ post_id: post_id });
    setIsVisible(true);
    props.dispatch(fetchCommentsStart({ post_id: post_id }));
  };

  const showCommentReplySection = (event, post_id, post_comment_id) => {
    props.dispatch(
      fetchCommentRepliesStart({
        post_id: post_id,
        post_comment_id: post_comment_id,
      })
    );
  };

  // const handleLike = (event, status) => {
  //   event.preventDefault();
  //   setLikeStatus(status);
  //   props.dispatch(savePostLikeStart({ post_id: post.post_id }));
  //   if (status == "added") {
  //     let currentLikeCount = likeCount + 1;
  //     setLikeCount(currentLikeCount);
  //   } else {
  //     let currentLikeCount = likeCount - 1;
  //     setLikeCount(currentLikeCount);
  //   }
  // };

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
    props.dispatch(saveBookmarkStart({ post_id: post.post_id }));
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
    setIsVisible(false);
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

  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla,
  ]);

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
        <div className="sm:rounded-2xl bg-white sm:border shadow-md w-full ">
          <div className="flex flex-1 justify-between items-center p-1 px-2 sm:px-4 sm:p-4 border-b">
            <Link passHref href={`/${post.user_unique_id}`}>
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
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterhref="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leavehref="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 w-[250px] lg:w-[20vw]  mt-3 transform shadow-md right-4 lg:translate-x-1/2 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg ">
                          <div className="relative grid gap-y-2 bg-white p-1 grid-cols-1">
                            <CopyToClipboard
                              text={post.share_link}
                              onCopy={() => console.log("notification copied")}
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
              dangerouslySetInnerHTML={{
                __html: post.content != undefined ? post.content : "",
              }}
            ></div>

            <div className="embla">
              <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                  {post.postFiles
                    ? post.postFiles.length > 0
                      ? post.postFiles.map((postFile, index) =>
                          postFile.file_type === "image" ? (
                            <EmblaSlide
                              post={post}
                              postFile={postFile}
                              key={index}
                              index={index}
                              inView={slidesInView.indexOf(index) > -1}
                            />
                          ) : // <div className="embla__slide" key={index}>
                          //   <Link
                          //     href="#"
                          //     passHref
                          //     onClick={(event) =>
                          //       post.payment_info.post_payment_type ===
                          //         "ppv" &&
                          //       post.payment_info.is_user_needs_pay === 1
                          //         ? handlePPVPayment(
                          //             event,
                          //             post.payment_info.is_user_needs_pay
                          //           )
                          //         : handleImagePreview(
                          //             event,
                          //             1,
                          //             post.payment_info.is_user_needs_pay
                          //           )
                          //     }
                          //   >
                          //     <div className="postImage" key={index}>
                          //       <div className="">
                          //         <div className="gallery js-gallery">
                          //           {post.payment_info.is_user_needs_pay ==
                          //           1 ? (
                          //             <div className="postViewImg relative">
                          //               <Image
                          //                 layout="fill"
                          //                 alt=""
                          //                 src={postFile.post_file}
                          //                 className="postViewImg blur-[20px]"
                          //                 // style={{ filter: "blur(20px)" }}
                          //               />
                          //             </div>
                          //           ) : (
                          //             <div className="relative postViewImg">
                          //               <Image
                          //                 alt=""
                          //                 layout="fill"
                          //                 src={postFile.post_file}
                          //                 className="postViewImg"
                          //                 // onClick={handleImagePreview}
                          //                 // onClick={(event) =>
                          //                 //   handleImagePreview(event, 1)
                          //                 // }
                          //               />
                          //             </div>
                          //           )}
                          //         </div>
                          //         {post.payment_info.is_user_needs_pay ===
                          //           1 &&
                          //         post.payment_info.post_payment_type ===
                          //           "ppv" ? (
                          //           <div className="gallery-pay-button-div">
                          //             <button
                          //               type="button"
                          //               className="gallery-pay-button"
                          //               // onClick={(event) =>
                          //               //   handlePPVPayment(event, 1)
                          //               // }
                          //             >
                          //               {post.payment_info.payment_text}
                          //             </button>
                          //           </div>
                          //         ) : (
                          //           ""
                          //         )}
                          //         {post.payment_info.is_user_needs_pay ===
                          //           1 &&
                          //         post.payment_info.post_payment_type ===
                          //           "subscription" ? (
                          //           scrollToTop ? (
                          //             <div
                          //               className="gallery-pay-button-div"
                          //               // onClick={scrollToTop}
                          //             >
                          //               <button className="gallery-pay-button">
                          //                 {post.payment_info.payment_text}
                          //               </button>
                          //             </div>
                          //           ) : (
                          //             <Link to={`/` + post.user.unique_id}>
                          //               <div className="gallery-pay-button-div">
                          //                 <Button className="gallery-pay-button">
                          //                   {post.payment_info.payment_text}
                          //                 </Button>
                          //               </div>
                          //             </Link>
                          //           )
                          //         ) : (
                          //           ""
                          //         )}
                          //       </div>
                          //       {modalStatus ? (
                          //         <Lightbox
                          //           mainSrc={postFile.post_file}
                          //           // nextSrc={images[(photoIndex + 1) % images.length]}
                          //           // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                          //           onCloseRequest={() => setModalStatus(0)}
                          //         />
                          //       ) : (
                          //         ""
                          //       )}
                          //     </div>
                          //   </Link>
                          // </div>
                          postFile.file_type === "video" ? (
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

          {/* <div>
        <div className="flex  rounded object-center bg-transparent cursor-pointer">
          <div className="object-center p-0 lg:p-1 h-full w-[100%] my-0 mx-auto"> */}
          {/* <div className="h-full w-full relative">
                <Image layout="fill" src={image} layout="fill" priority objectFit="cover"  className="block mx-auto h-full w-full max-w-[800px]"/>
              </div> */}
          {/* <img
                src={image}
                height="100%"
                width="100%"
                alt="image attached to post"
                className="block mx-auto w-full max-w-[800px]"
              ></img> */}
          {/* </div>
        </div>
      </div> */}

          <div className="p-3 px-7">
            <div className="flex items-center justify-between px-2">
              <button
                type="button"
                title="Like post"
                className="flex items-center justify-center space-x-1"
              >
                <BsHeart className="news-feed-card-icon" />
                <span className="text-sm">{likeCount}</span>
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
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
              <button
                type="button"
                title="Donate to post"
                className="flex items-center justify-center space-x-1"
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

              <button
                type="button"
                title="Bookmark post"
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="news-feed-card-icon"
                >
                  <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                </svg>
              </button>
            </div>
            <div className="">
              {showComments ? (
                <div className="border-t border-gray-600 mt-4">
                  <p
                    onClick={() => setShowComments(false)}
                    className="w-full py-1 bg-transparent border-none rounded text-sm pl-4 text-playRed cursor-pointer"
                  >
                    Hide Comments
                  </p>
                  {/* <Comments comments={popularComments} /> */}
                  <div className="flex items-center mt-2">
                    <div className="w-10 h-10 relative rounded-full mr-2">
                      <Image
                        layout="fill"
                        src={"/profile_avatar_full.jpg"}
                        className="rounded-full"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                    <form className="bg-gray-100 flex items-center px-2 rounded-2xl flex-1">
                      <TextareaAutosize
                        maxLength="1280"
                        rows={1}
                        maxRows={4}
                        placeholder="Add a comment"
                        className="rounded-2xl flex-1 resize-none outline-0 border-none bg-gray-100 text-sm focus:outline-0 ring-0 focus:ring-0"
                      />
                      <div className="flex space-x-1 items-center justify-center ">
                        <HiOutlineEmojiHappy className="commentBtn" />
                        <div className="relative w-9 h-9 cursor-pointer lg:commentBtn">
                          <Image layout="fill" src="/comment.png" alt="" />
                        </div>
                        {/* <HiPaperAirplane className="commentBtn rotate-90" /> */}
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <p
                  onClick={() => setShowComments(true)}
                  className="w-full py-1 bg-transparent border-none rounded text-sm pl-4 text-playRed cursor-pointer"
                >
                  {/* View {commentCount} Comments */}
                </p>
              )}
            </div>
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
