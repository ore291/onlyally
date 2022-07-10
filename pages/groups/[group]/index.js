import { useState, useEffect } from "react";
import SideNavLayout from "../../../components/SideNavLayout";
import GroupPageTabs from "../../../components/groups/GroupPageTabs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill, BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import Image from "next/image";
import Button from "../../../components/Button";
import { getSelectorsByUserAgent ,isMobileOnly, isMobile} from "react-device-detect";
import {
  fetchSingleGroupStart,
  joinGroupStart,
} from "../../../store/slices/groupsSlice";
import ProfileLoader from "../../../components/Profile/ProfileLoader";
import { getCookies } from "cookies-next";
import GroupPageHeader from "../../../components/groups/GroupPageHeader";

import { END } from "redux-saga";
import { wrapper } from "../../../store";

const Group = () => {
  const dispatch = useDispatch();
  const { data: group, loading } = useSelector(
    (state) => state.groups.groupData
  );

  const router = useRouter();



  const [subscribed, setSubscribed] = useState(false);

  const handleJoinGroup = async (slug) => {
    dispatch(joinGroupStart(slug));
  };

  return (
    <SideNavLayout>
      {loading ? (
        <div className="row-container">
          <ProfileLoader />
        </div>
      ) : group.members && group.members.length > 0 ? (
        <div>
          <GroupPageHeader group={group} />

          {group.is_member ? (
            <div className="max-w-4xl mx-auto mt-24">
              <GroupPageTabs />
            </div>
          ) : (
            <div
              className={`row-container my-16  ${
                group.is_member ? "hidden" : ""
              }`}
            >
              <div className="bg-white w-[500px] rounded-lg shadow-lg p-5">
                <div className="flex flex-col items-start space-y-2 mb-5">
                  <div className="flex items-center space-x-2">
                    <MdLockOutline className="w-5 h-5 text-gray-500" />
                    <p className="font-semibold text-lg">Private</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BsPeople className="w-5 h-5 text-gray-500" />
                    <p className="font-semibold text-lg">
                      {group.members.length} Members
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RiPriceTag3Line className="w-5 h-5 text-gray-500" />
                    <p className="font-semibold text-lg">Cars and Vehicles</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CgNotes className="w-5 h-5 text-gray-500" />
                    <p className="font-semibold text-lg">
                      {group.posts.length} Posts
                    </p>
                  </div>
                </div>
                <div className="col-container space-y-3">
                  <h2 className="text-4xl font-bold text-center">
                    Sorry, Private Group!
                  </h2>
                  <p className="font-bold text-sm text-gray-500 text-center w-[370px]">
                    This page is a private group and content is only availaible
                    on subscription.
                  </p>
                  <div className="row-container space-x-4">
                    <div onClick={() => setSubscribed(true)}>
                      <Button
                        text="Join"
                        extraClasses="w-36 h-9"
                        active={true}
                      />
                    </div>

                    {/* <button onClick={() => router.back()}> */}
                    <Button
                      onClick={() => router.back()}
                      text="Go Back"
                      extraClasses="w-36 h-9 bg-[#FFD0D8] hover:bg-[#FF1534] hover:text-white text-lightPlayRed"
                      textClass="group-hover:text-white hover:text-white  font-semibold"
                    />
                    {/* </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </SideNavLayout>
  );
};

export default Group;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {

      const { group } = params;

      const userAgent = req.headers["user-agent"];
      const {
        isAndroid,
        isIOS,
        isWindows,
        isMacOs,
        mobileModel,
        browserName,
        osName,
        mobileVendor,
        browserVersion,
      } = getSelectorsByUserAgent(userAgent);

      var device_model = "";
      if (isAndroid == true) {
        device_model = mobileModel;
      } else if (isIOS == true) {
        device_model = mobileModel;
      } else {
        device_model = browserName + " " + browserVersion;
        // device_model = "Chrome" + " " + "100";
      }

      const cookies = getCookies({ req, res });

      store.dispatch(
        fetchSingleGroupStart({
          accessToken: cookies.accessToken,
          userId: cookies.userId,
          device_model: device_model,
          group_slug: group
        })
      );

    

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
      };
    }
);
