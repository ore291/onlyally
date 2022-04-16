import Button from "../Button";
import Image from "next/image";
import GroupCard from "./GroupCard";

const LikedGroups = () => {
  return (
    <div className="side-container">
      <div className="flex items-center justify-between px-2">
        <p className="text-start font-bold">Groups you may like</p>
        <span className="text-blue-500 text-xs cursor-pointer">Refresh</span>
      </div>

      <div className="flex flex-col items-center space-y-2 px-2 pb-4">
        {[...Array(4)].map((_, i) => (
          <GroupCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default LikedGroups;
