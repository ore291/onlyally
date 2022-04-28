import Image from "next/image";
import VerifiedBadge from "../handlers/VerifiedBadge";

const CreatorCard = ({ username, image, main, verified }) => {
  if (main) {
    return (
      <div className="col-container my-3">
        <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-0.5 rounded-2xl">
          <div className="bg-white p-0.5 rounded-2xl">
            <div className=" w-28 h-28 relative rounded-2xl">
              <Image
                src={image}
                layout="fill"
                alt="username"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
        <p className="text-xs font-semibold text-center">{username}</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border flex flex-col items-center justify-center cursor-pointer">
      <div className="px-1 pt-1 w-20 h-20 relative rounded-lg">
        <Image
          src={image}
          layout="fill"
          alt="username"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="row-container space-x-1 py-[1px]">
        <p className="text-xs">{`@${username}`}</p>
        {verified == 1 ? ( <span><VerifiedBadge /></span> ): null}
      </div>
    </div>
  );
};

export default CreatorCard;
