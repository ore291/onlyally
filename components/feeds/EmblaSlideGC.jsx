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
    // router.push("/" + post.user.unique_id);
    // if (paymentStatus == 0) {
    //   // setModalStatus(status);
    //   router.push("/" + post.user.unique_id);
    // }
  };

  const toggleModal = () => {
    setSubscribeModal(!subscribeModal);
  };

  return (
    <div className={`embla__slide }`}>
      <div className="embla__slide__inner">
        <a
        
        >
          <div className="postImage" key={index}>
            <div className="">
              <div className="gallery js-gallery">
             
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
                    
                    />
                  </div>
             
              </div>
           
             
            </div>
            
          </div>
        </a>
      </div>
      
    </div>
  );
};

export default EmblaSlide;
