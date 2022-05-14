import { useState, useRef, useEffect, useCallback } from "react";
import Story from "./Story";
import { useSelector, useDispatch } from "react-redux";
import StorySliderLoader from "./StorySliderLoader";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { PrevButton, NextButton } from "./EmblaButtons";
import useEmblaCarousel from "embla-carousel-react";
import { fetchStoriesStart } from "../../store/slices/storiesSlice";
import { setUploadModal } from "../../store/slices/NavSlice";
import StoriesSliderModal from "./StoriesSliderModal";
import StoriesUploadModal from "./StoryUploadModal";
import { getCookies } from "cookies-next";

const Stories = () => {
 
  const loginDetails = useSelector((state) => state.user.loginData);
  const dispatch = useDispatch();
  const userStories = useSelector((state) => state.stories.stories);
  const uploadModalState = useSelector((state) => state.navbar.uploadModal);
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  const [renderSliderModal, setRenderSliderModal] = useState(false);

  const [selectedSliderIndex, setSelectedSliderIndex] = useState(0);

  const [sliderData, setSliderData] = useState({});

  const SliderModalToggle = (status, index, story) => {
    setRenderSliderModal(status);
    setSelectedSliderIndex(index);
    setSliderData(story);
  };

  // useEffect(() => {
  //   dispatch(fetchStoriesStart());

  // }, [user]);

  // useEffect(() => {
  //   if (SliderModalToggle) {
  //     $("#storiesSliderModal").modal("show");
  //   } else {
  //     $("#storiesSliderModal").modal("hide");
  //   }
  // }, [renderSliderModal]);

  return (
    <div className=" mt-3 md:mt-0 mb-5 md:p-5 md:border-y md:shadow-md ">
      <>
        {userStories.loading ? (
          <StorySliderLoader />
        ) : (
          <div className="embla">
            <div className="embla__viewport" ref={viewportRef}>
              <div className="embla__container">
                <div
                  className="embla__slide1"
                  onClick={() => dispatch(setUploadModal(true))}
                >
                  <Story
                    username={"Create new story"}
                    img={loginDetails.picture}
                    isYou={true}
                    className="embla__slide1"
                  />
                </div>

                {userStories.data.stories &&
                  userStories.data.stories.length > 0 &&
                  userStories.data.stories.map((story, index) => (
                    <div
                      className="embla__slide1"
                      key={index}
                      onClick={() => SliderModalToggle(true, index, story)}
                    >
                      <Story
                        key={index}
                        username={story.name}
                        img={story.picture}
                        className=""
                      />
                    </div>
                  ))}
              </div>
            </div>
            {userStories.data.stories.length > 5 ? (
              <>
                {" "}
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
              </>
            ) : null}
          </div>
        )}
      </>

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
      {
        uploadModalState ? (<StoriesUploadModal />) : null
      }
      
    </div>
  );
};


export default Stories;

