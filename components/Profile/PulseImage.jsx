import Image from "next/image";
import Link from "next/link";
import React from "react";

const PulseImage = ({ image }) => {
  return (
    <Link href="/user-stories" passHref>
      <div className="relative h-36 w-36 2xl:w-52 2xl:h-52 rounded-3xl cursor-pointer">
        <div className="absolute rounded-3xl inset-0 border-red-700 border-[3px] transition delay-1000 animate-pulse" />
        <div className="absolute rounded-3xl inset-[3px] border-red-400 border-4 animate-[pulse_2s_ease-in-out_infinite]" />
        {/* <div
        className="absolute inset-[6px] rounded-3xl  z-20"
        style={{
          backgroundImage: `url(${image || "/user.png"})`,
          backgroundSize: "cover",
        }}
      /> */}
        <div className="absolute inset-[6px] rounded-3xl  z-20">
          <Image
            src={image}
            alt=""
            layout="fill"
            objectFit="contain"
            className="rounded-3xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default PulseImage;
