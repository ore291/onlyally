import { useState, useRef, useEffect, useCallback } from "react";
import Story from "./Story";
import { useSelector , useDispatch} from "react-redux";
import StorySliderLoader from "./StorySliderLoader";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { PrevButton, NextButton } from "./EmblaButtons";
import useEmblaCarousel from "embla-carousel-react";
import { fetchStoriesStart } from "../../store/slices/storiesSlice";

const Stories = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchStoriesStart());
  }, []);

  // useEffect(() => {
  //   if (SliderModalToggle) {
  //     $("#storiesSliderModal").modal("show");
  //   } else {
  //     $("#storiesSliderModal").modal("hide");
  //   }
  // }, [renderSliderModal]);

  // my own start

  const stories = useSelector((state) => state.creators.creators);
  const storiesRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const onScroll = () => {
    if (storiesRef.current.scrollLeft > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
    if (
      storiesRef.current.scrollLeft ==
      storiesRef.current.scrollWidth - storiesRef.current.clientWidth
    ) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }
  };
  return (
    <div className=" mt-3 md:mt-0 mb-5 p-1">
      {/* <div
        onScroll={onScroll}
        ref={storiesRef}
        className="flex items-baseline space-x-1 md:space-x-2 py-4 px-1 md:p-4 shadow-md bg-white border-gray-300 
        border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-playRed scroll-smooth scrollbar-track-white"
      >
        <Story
          username={"Create new story"}
          img={"/profile_avatar_full.jpg"}
          isYou={true}
        />
        {stories.map((story) => (
          <Story
            key={story.username}
            username={story.username}
            img={story.image}
          />
        ))}
      </div> */}
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            <Story
              username={"Create new story"}
              img={"/profile_avatar_full.jpg"}
              isYou={true}
              className="embla__slide1"
            />
            {stories.map((story, index) => (
              <div className="embla__slide1" key={index}>
                <Story
                  key={index}
                  username={story.username}
                  img={story.image}
                  className=""
                />
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </div>
  );
};

export default Stories;
