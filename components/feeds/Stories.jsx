import { useState, useRef } from "react";
import Story from "./Story";
import { useSelector } from "react-redux";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Stories = () => {
  const stories = useSelector(state => state.creators.creators)
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
    <div className=" mb-5">
      <div
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
      </div>
      {/* <div className="hidden lg:flex lg:absolute top-0 p-4 w-full h-full  justify-between z-10 items-center">
        <button
          onClick={() => {
            storiesRef.current.scrollLeft -= 300;
          }}
        >
          <FaChevronCircleLeft
            className={`bg-gray-600 text-white rounded-full w-6 h-6 cursor-pointer drop-shadow-lg filter ${
              showLeft ? "visible" : "invisible"
            }`}
          />
        </button>
        <button
          onClick={() => {
            storiesRef.current.scrollLeft += 300;
          }}
        >
          <FaChevronCircleRight
            className={`bg-gray-600 rounded-full text-white w-6 h-6 cursor-pointer drop-shadow-lg filter ${
              showRight ? "visible" : "invisible"
            }`}
          />
        </button>
      </div> */}
    </div>
  );
};

export default Stories;
