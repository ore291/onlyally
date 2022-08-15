import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import scrollToTop from "../helpers/ScrollToTop";
const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;
import { useRouter } from "next/router";
import PostSubscribeModal from "../helpers/PostSubscribeModal";

const EmblaSlide = ({ post, postFile, inView, index, handlePPVPayment }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [subscribeModal, setSubscribeModal] = useState(false);

  const router = useRouter();
  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  const handleImagePreview = (event, status, paymentStatus) => {
    event.preventDefault();
    router.push("/profile/" + post.user.unique_id);
    if (paymentStatus == 0) {
      // setModalStatus(status);
      router.push("/profile/" + post.user.unique_id);
    }
  };

  const toggleModal = () => {
    setSubscribeModal(!subscribeModal);
  };

  return (
    <div className={`embla__slide }`}>
      <div className="embla__slide__inner">
        <a
          onClick={(event) =>
            post.payment_info.post_payment_type === "ppv" &&
            post.payment_info.is_user_needs_pay === 1
              ? handlePPVPayment(event, post.payment_info.is_user_needs_pay)
              : handleImagePreview(
                  event,
                  1,
                  post.payment_info.is_user_needs_pay
                )
          }
        >
          <div className="postImage" key={index}>
            <div className="">
              <div className="gallery js-gallery">
                {post.payment_info.is_user_needs_pay == 1 ? (
                  <div className="postViewImg relative">
                    <Image
                      layout="fill"
                      alt=""
                      src={
                        inView
                          ? postFile.post_file
                            ? postFile.post_file
                            : "/images/no-image-found.png"
                          : PLACEHOLDER_SRC
                      }
                      onLoad={setLoaded}
                      className={`postViewImg blur-[20px]  ${
                        hasLoaded ? "opacity-1" : "opacity-0"
                      }`}
                    />
                  </div>
                ) : (
                  <div className="relative postViewImg">
                    <Image
                      alt=""
                      layout="fill"
                      src={
                        inView
                          ? postFile.post_file
                            ? postFile.post_file
                            : "/images/no-image-found.png"
                          : PLACEHOLDER_SRC
                      }
                      className={`postViewImg `}
                      // onClick={handleImagePreview}
                      // onClick={(event) =>
                      //   handleImagePreview(event, 1)
                      // }
                    />
                  </div>
                )}
              </div>
              {post.payment_info.is_user_needs_pay === 1 &&
              post.payment_info.post_payment_type === "ppv" ? (
                <div className="gallery-pay-button-div">
                  <button
                    type="button"
                    className="gallery-pay-button"
                    onClick={(event) => handlePPVPayment(event, 1)}
                  >
                    {post.payment_info.payment_text}
                  </button>
                </div>
              ) : (
                ""
              )}
              {post.payment_info.is_user_needs_pay === 1 &&
              post.payment_info.post_payment_type === "subscription" ? (
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
                  <Link to={`/profile/` + post.user.unique_id}>
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
            {/* {modalStatus
              ? null
              : // <Lightbox
                //   mainSrc={postFile.post_file}
                //   // nextSrc={images[(photoIndex + 1) % images.length]}
                //   // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                //   onCloseRequest={() => setModalStatus(0)}
                // />
                ""} */}
          </div>
        </a>
      </div>
      {/* <PostSubscribeModal
        subscribeModal={subscribeModal}
        setSubscribeModal={toggleModal}
        post={post}
      /> */}
    </div>
  );
};

export default EmblaSlide;
