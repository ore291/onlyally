import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const NoDataFound = () => {
  const configData = useSelector((state) => state.config.configData);
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        {/* <div className="mx-auto text-center py-[2rem]"> */}
        <div className="relative max-w-[30em] mb-[2em] ">
          <img
            // layout="fill"
            alt="not-found"
            src={
              configData.frontend_no_data_image
                ? configData.frontend_no_data_image
                : "/materials/no-data-found.svg"
            }
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
