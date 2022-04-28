import CreatorCard from "./CreatorCard.jsx";
import { RiVipCrownFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const TopCreators = () => {
  const postSug = useSelector(state => state.home.postSug);
  return (
    <div className="side-container items-start">
      <div className="flex items-center justify-center  space-x-1">
        <div className="flex rounded-full bg-orange-400 items-center justify-center w-6 h-6">
          <RiVipCrownFill className=" text-white" />
        </div>
        <p className="text-start">Top Content Creators</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {postSug.data.users.map((user, index) => (
          <CreatorCard
            username={user.username}
            verified={user.is_verified_badge}
            image={user.picture}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
