import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchTrendingUsersStart } from "../store/slices/homeSlice";
import Link from "next/link";
import CommonCenterLoader from "./helpers/CommonCenterLoader";

const Trending = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTrendingUsersStart());
  }, []);

  const trendingUsers = useSelector((state) => state.home.trendingUsers);
  return (
    <div className="side-container items-start pl-4">
      <div className="flex items-center justify-center  space-x-1">
        <p className="text-start font-bold">Trending !</p>
      </div>
      <div className="flex flex-col">
        {trendingUsers.loading ? (
          <CommonCenterLoader />
        ) : trendingUsers.data.trending_users.length > 0 ? (
          trendingUsers.data.trending_users.map((user) => (
            <Link
              passHref
              href={`/${user.username}`}
              key={user.user_id}
            >
              <span className="hover:underline text-blue-600 font-semibold cursor-pointer">{`#${user.username}`}</span>
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
