import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect, useRef } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import StoriesCard from "../components/feeds/StoriesCard";
import SideNavLayout from "../components/SideNavLayout";
import { fetchUserStoriesStart } from "../store/slices/storiesSlice";

const UserStories = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const beforeChange = (prev, next) => {
    setSlideIndex(Math.floor(next));
  };
  const settings = {
    slidesToShow: 1,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    className: "center",
    arrows: false,
    beforeChange: beforeChange,
  };
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.userStories);
  const slider = useRef(null);

  const next = () => {
    if (slideIndex != stories.data?.stories?.length - 1) {
      slider?.current?.slickNext();
    }
  };

  const prev = () => {
    slider?.current?.slickPrev();
  };

  useEffect(() => {
    dispatch(fetchUserStoriesStart());
  }, []);

  const router = useRouter();

  return (
    <div className="w-full h-screen bg-[#1A1A1A] relative">
      <FaTimes
        onClick={() => router.back()}
        className="absolute z-10 right-5 hidden md:block md:right-20 cursor-pointer md:top-5  h-6 w-6 text-white hover:scale-110 transition-all"
      />
      <div className="overflow-hidden max-w-screen-sm mx-auto py-1 md:py-5 relative group">
        {stories.loading ? (
          <p>Loading ...</p>
        ) : (
          <>
            {stories.data.stories.length < 1 ? (
              <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-white text-2xl font-semibold">
                  No Stories Available
                </h1>
              </div>
            ) : (
              <>
                <Slider ref={slider} {...settings}>
                  {stories.data.stories.length > 0 &&
                    stories.data.stories.map((story, i) => (
                      <StoriesCard key={i} sliderData={story} handleNext={next} />
                    ))}
                </Slider>
                {slideIndex != 0 && (
                  <FaChevronCircleLeft
                    onClick={() => prev()}
                    className="text-gray-700 group-hover:text-gray-100 absolute top-1/2 left-10 w-6 h-6 hidden md:block cursor-pointer z-20"
                  />
                )}
                {slideIndex != stories.data?.stories?.length - 1 && (
                  <FaChevronCircleRight
                    onClick={() => next()}
                    className="text-gray-700 group-hover:text-gray-100 absolute top-1/2 right-10 w-6 h-6 hidden md:block cursor-pointer z-20"
                  />
                )}
                )
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserStories;
