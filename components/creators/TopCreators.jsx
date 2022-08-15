import CreatorCard from "./CreatorCard.jsx";
import { RiVipCrownFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostSuggestionsStart } from "../../store/slices/homeSlice";
import CommonCenterLoader from "../helpers/CommonCenterLoader.jsx";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const TopCreators = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(fetchPostSuggestionsStart());
  }, [session]);

  const postSug = useSelector((state) => state.home.postSug);
  return (
    <div className="side-container items-start">
      <div className="flex items-center justify-center  space-x-1">
        <div className="flex rounded-full bg-orange-400 items-center justify-center w-6 h-6">
          <RiVipCrownFill className=" text-white" />
        </div>
        <p className="text-start">Top Content Creators</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {postSug.loading ? (
          <CommonCenterLoader />
        ) : (
          postSug.data.users.map((user, index) =>
            postSug.data.users.length > 0 ? (
              <CreatorCard
                username={user.username}
                verified={user.is_verified_badge}
                image={user.picture}
                key={index}
              />
            ) : (
              <p>No Top Creator</p>
            )
          )
        )}
      </div>
    </div>
  );
};

export default TopCreators;
