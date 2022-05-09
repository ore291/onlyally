import React from "react";
import Image from "next/image";
import {useSelector} from "react-redux";

const NoDataFound = () => {
  const configData = useSelector((state) => state.config.configData)
  return (
    <>
      <div className="mx-auto text-center py-[2rem]">
        <div className="relative max-w-[30em] h-full w-full mb-[2em]">
          <img
            layout="fill"
            alt="not-found"
            src={
              configData.frontend_no_data_image
                ? configData.frontend_no_data_image
                : "/materials/no-data-found.svg"
            }
          />
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
