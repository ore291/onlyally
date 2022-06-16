import { useEffect, useState } from "react";
import LiveCard from "../../components/live/LiveCard";
import SideNavLayout from "../../components/SideNavLayout";
import Button from "../../components/Button";
import { fetchLiveVideosStart } from "../../store/slices/liveVideoSlice";
import { fetchUserDetailsStart } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import UserLiveVideoLoader from "../../components/live/UserLiveVideoLoader";
import { getCookies } from "cookies-next";
import Table from "react-tailwind-table";
import { useMemo } from "react";
import GoLiveModal from "../../components/live/GoLiveModal"

const Live = () => {
  const dispatch = useDispatch();
  const cookies = getCookies();
  const userDetails = useSelector((state) => state.user.profile);
  const liveVideos = useSelector((state) => state.liveVideo.liveVideos);

  const [goLive, setGoLive] = useState(false);

  useEffect(() => {
    if (userDetails.loading) dispatch(fetchUserDetailsStart());
    dispatch(fetchLiveVideosStart());
  }, []);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  return (
    <SideNavLayout>
      <div className="lg:max-w-[980px] xl:max-w-6xl mx-auto my-8 bg-white p-5">
        <div className="flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white ">
          {/* {[...Array(10)].map((_, index) => (
            <LiveCard key={index} />
          ))} */}

          {liveVideos.loading ? (
            <UserLiveVideoLoader />
          ) : liveVideos.data.videos.filter(
              (liveVideo) => liveVideo.user_id != localStorage.getItem("userId")
            ).length > 0 ? (
            <div className="video-list-sec">
              {liveVideos.data.videos
                .filter(
                  (liveVideo) =>
                    localStorage.getItem("userId") != String(liveVideo.user_id)
                )
                .map((video) => (
                  // <LiveDataCard video={video} key={video.live_video_id} />
                  <LiveCard video={video} key={video.live_video_id} />
                ))}
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className="bg-white p-5">
          <div className="row-container w-full space-x-2">
            <Button
              text="Go Live"
              active={true}
              textClass="text-xl font-semibold"
              extraClasses="w-40 h-12"
              onClick={() => setGoLive(true)}
            />
            <Button
              text="Live History"
              extraClasses="w-40 h-12 !bg-[#FFC7C6]"
              textClass="text-textPlayRed text-xl font-semibold"
            />
          </div>
          {/* <div>
            <Table columns={columns} data={data} />
          </div> */}
        </div>

        {userDetails.loading ? (
          "loading"
        ) : (
          <GoLiveModal
            goLive={goLive}
            closeGoLiveModal={closeGoLiveModal}
            username={userDetails.data.username}
            userPicture={userDetails.data.picture}
            name={userDetails.data.name}
            user_id={userDetails.data.user_id}
          />
        )}
      </div>
    </SideNavLayout>
  );
};

export default Live;
