import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Stories from "react-insta-stories";

const StoriesCard = ({ sliderData, handleNext }) => {
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const dataArray = [];

    sliderData.storyFiles.map((data) => {
      dataArray.push({
        url: data.file,
        type: data.file_type,
        header: {
          heading: sliderData.name,
          subheading: data.updated,
          profileImage: sliderData.picture,
        },
      });
    });
    console.log("data", dataArray);
    setModalData(dataArray);
  }, [sliderData]);

  return (
    <div className="flex items-center justify-center cursor-grab">
      {modalData.length > 0 && (
        <Stories
          // currentIndex={selectedSliderIndex == 0 ? null : selectedSliderIndex}
          stories={modalData}
          defaultInterval={5000}
          onAllStoriesEnd={handleNext}
          loop={true}
          storyContainerStyles={{
            borderRadius: 8,
            overflow: "hidden",
            verticalAlign: "middle",
          }}
          width={isMobile ? "100%" : 360}
          height={isMobile ? window.innerHeight - 120 : 550}
          //   height={window.innerHeight - 100}
        />
      )}
    </div>
  );
};

export default StoriesCard;
