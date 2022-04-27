import { useSelector } from "react-redux";
const Trending = ({creators}) => {
  const trendingUsers = useSelector(state => state.home.trendingUsers)
  return (
    <div className="side-container items-start pl-4">
      <div className="flex items-center justify-center  space-x-1">
        <p className="text-start font-bold">Trending !</p>
      </div>
      <div className="flex flex-col">
            {
                trendingUsers.data.trending_users.map((user) => (
                    <a className="hover:underline text-blue-600 font-semibold" href="#" key={user.user_id}>{`#${user.username}`}</a>
                ))
            }
      </div>
    </div>
  );
};

export default Trending;
