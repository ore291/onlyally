import Image from "next/image";

const CommonCenterLoader = () => (
  <div className="text-center w-full h-full row-container">
    <div className="relative ">
      <Image
        alt=""
        objectFit="contain"
        width={20}
        height={20}
        className=" w-[5em] h-[5em]"
        src="/materials/small-loader.svg"
      />
    </div>
  </div>
);

export default CommonCenterLoader;
