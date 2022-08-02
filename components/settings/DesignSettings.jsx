import React, { useState } from "react";
import Image from "next/image";

const DesignSettings = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedCover, setSelectedCover] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const coverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedCover(e.target.files[0]);
    }
  };

  return (
    <>
      <form className="w-full ">
        <div className="w-full relative mb-10">
          <div className="flex flex-wrap gap-2">
            <label
              id="add-img-label"
              className="flex justify-center items-center text-[150%] cursor-pointer w-full bg-[#f3f3f3] h-[250px]  rounded-lg object-cover"
              htmlFor="add-cover-img"
            >
              {!selectedCover && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z"
                  ></path>
                </svg>
              )}
              {selectedCover && (
                <div className="w-full relative h-[250px]">
                  <Image
                    src={URL.createObjectURL(selectedCover)}
                    objectFit="cover"
                    layout="fill"
                    className="object-cover rounded-lg"
                    alt="Thumb"
                  />
                </div>
              )}
            </label>
            <input
              onChange={coverChange}
              type="file"
              id="add-cover-img"
              className="opacity-0 h-0"
            />
          </div>
          <div className="flex flex-wrap gap-2 centered-axis-xyz p-1 bg-white w-[150px] h-[150px] rounded-full">
            <label
              id="add-img-label"
              className="flex justify-center items-center  text-[150%] cursor-pointer w-full h-full bg-[#f3f3f3]  rounded-full object-cover"
              htmlFor="add-single-img"
            >
              {!selectedImage && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
                  />
                </svg>
              )}
              {selectedImage && (
                <div className="w-full relative h-full rounded-full">
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    objectFit="cover"
                    layout="fill"
                    className="object-cover rounded-full"
                    alt="Thumb"
                  />
                </div>
              )}
            </label>
            <input
              onChange={imageChange}
              type="file"
              id="add-single-img"
              className="opacity-0 h-0"
            />
          </div>
        </div>
        <br />
        <div className="w-full row-container mt-12 ">
          <button
            type="submit"
            className="w-32 h-9 rounded-md  bg-lightPlayRed text-white font-medium text-sm row-container"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default DesignSettings;
