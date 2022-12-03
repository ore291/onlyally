import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchTrendingStart, fetchTrendingUsersStart } from "../store/slices/homeSlice";
import Link from "next/link";
import CommonCenterLoader from "./helpers/CommonCenterLoader";

const Trending = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTrendingStart());
  }, []);

  const trendingUsers = useSelector((state) => state.home.homeTrending);
  return (
    <div className="side-container items-start pl-4">
      <div className="flex items-center justify-center  space-x-1">
        <p className="text-start font-bold">Trending !</p>
      </div>
      <div className="flex flex-col">
        {trendingUsers.loading ? (
          <CommonCenterLoader />
        ) : trendingUsers.data.length > 0 ? (
          trendingUsers.data.map((user) => (
            <Link
              passHref
              href={`/trending/${user.hashtag_id}`}
              key={user.user_id}
            >
              <span className="hover:underline text-blue-600 font-semibold cursor-pointer" dangerouslySetInnerHTML={{__html: `#${user.name}`}}/>
            </Link>
          ))
        ) : (
          <p>No Trending Users</p>
        )}
      </div>
    </div>
  );
};

export default Trending;
