import Image from "next/image";
import { BsPlusCircleFill } from "react-icons/bs";

const Story = ({ username, img, isYou }) => {
  if (isYou) {
    return (
      <div className="col-container cursor-pointer">
        {/* <div className="relative bg-gradient-to-tr from-yellow-400 to-playRed p-0.5 rounded-full"> */}
        <div className="bg-white p-[2px] pb-[3px] rounded-full relative">
          <div className="h-12 w-12 md:h-16 md:w-16 relative rounded-full">
            <Image
              className="rounded-full"
              layout="fill"
              objectFit="cover"
              src={img}
              alt={username}
            />
          </div>
          {/* </div> */}
          <div className="bg-white p-[1px] row-container rounded-full absolute right-1 md:right-2 -bottom-1 md:bottom-1">
            <BsPlusCircleFill className="text-playRed bg-white rounded-full h-4 w-4 md:h-6 md:w-6 " />
          </div>
        </div>
        <p className="text-xs md:text-sm font-semibold truncate text-center tracking-tight">
          {username}
        </p>
      </div>
    );
  } else {
    return (
      <div className="col-container cursor-pointer">
        <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-[2px] rounded-full">
          <div className="bg-white p-[1px] rounded-full transform transition hover:-rotate-6">
            <div className="h-12 w-12 md:h-16 md:w-16  relative rounded-full">
              <Image
                className="rounded-full"
                layout="fill"
                objectFit="fill"
                src={img}
                alt={username}
              />
            </div>
          </div>
        </div>
        <p className="text-xs md:text-sm font-semibold truncate text-center">
          {username}
        </p>
      </div>
    );
  }
};

export default Story;
