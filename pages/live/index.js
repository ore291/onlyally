import { useEffect, useState } from "react";
import LiveCard from "../../components/live/LiveCard";
import SideNavLayout from "../../components/SideNavLayout";
import Button from "../../components/Button";
import {
  fetchLiveVideosStart,
  fetchLiveVideosHistoryStart,
} from "../../store/slices/liveVideoSlice";
import { fetchUserDetailsStart } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import UserLiveVideoLoader from "../../components/live/UserLiveVideoLoader";
import { getCookies } from "cookies-next";

import { useMemo } from "react";
import GoLiveModal from "../../components/live/GoLiveModal";
import BillingAccountLoader from "../../components/live/BillingAccountLoader.jsx";

const Live = () => {
  const dispatch = useDispatch();
  const cookies = getCookies();
  const userDetails = useSelector((state) => state.user.profile);
  const liveVideos = useSelector((state) => state.liveVideo.liveVideos);
  const liveHistory = useSelector((state) => state.liveVideo.liveVideosHistory);
  const [goLive, setGoLive] = useState(false);

  useEffect(() => {
    if (userDetails.loading) dispatch(fetchUserDetailsStart());
    dispatch(fetchLiveVideosStart());
    dispatch(fetchLiveVideosHistoryStart());
  }, []);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  return (
    <SideNavLayout title={"Playjor | Live"}>
      <div className="lg:max-w-[980px] xl:max-w-6xl mx-auto my-8 bg-white p-5">
        {/* {[...Array(10)].map((_, index) => (
            <LiveCard key={index} />
          ))} */}

        {liveVideos.loading ? (
          <div className="row-container w-full">
            <UserLiveVideoLoader />
          </div>
        ) : liveVideos.data?.videos.filter(
            (liveVideo) => liveVideo.user_id != localStorage.getItem("userId")
          ).length > 0 ? (
          <div className="flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white ">
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

        <div className="bg-white p-5">
          <div className="row-container w-full space-x-2">
            <Button
              text="Go Live"
              active={true}
              textclassName="text-xl font-semibold"
              extraclassNamees="w-40 h-12"
              onClick={() => setGoLive(true)}
            />
            <Button
              text="Live History"
              extraclassNamees="w-40 h-12 !bg-[#FFC7C6]"
              textclassName="text-textPlayRed text-xl font-semibold"
            />
          </div>
          <div className="max-w-5xl mx-auto">
            {liveHistory.loading ? (
              <BillingAccountLoader />
            ) : liveHistory.data.videos &&
              liveHistory.data.videos.length > 0 ? (
              <div className="flex flex-col my-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              Username
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              Streamed Date
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              View Count
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              Revenue
                            </th>
                            {/* <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {liveHistory.data.videos.map((videos) => (
                            <tr key={videos.user_billing_account_id}>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.title}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.user_displayname}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.created_at_formatted}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.viewer_cnt}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.payment_type_text}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.amount_formatted}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                {videos.user_amount_formatted}
                              </td>
                            </tr>
                          ))}
                          {/* {people.map(person => (
                            <tr key={person.email}>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                    <div className="text-sm text-gray-500">{person.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{person.title}</div>
                                <div className="text-sm text-gray-500">{person.department}</div>
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap">
                                <span
                                  className="px-2 inline-flex text-xs leading-5
                                font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                  Active
                                </span>
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap text-sm text-gray-500">
                                {person.role}
                              </td>
                              <td className="px-2 text-sm md:text-xs font-medium py-2 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NoDataFound />
            )}
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
