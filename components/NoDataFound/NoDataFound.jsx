import React from "react";
import Image from "next/image";
import configuration from "react-global-configuration";

const NoDataFound = () => {
  return (
    <>
      <div className="mx-auto text-center py-[2rem]">
        <div className="relative max-w-[30em] h-full w-full mb-[2em]">
          <img
            layout="fill"
            alt="not-found"
            src={
              configuration.get("configData.frontend_no_data_image")
                ? configuration.get("configData.frontend_no_data_image")
                : "/materials/no-data-found.svg"
            }
          />
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
