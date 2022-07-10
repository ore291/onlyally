import React, { useEffect, useState } from "react";
import SideNavLayout from "../../../components/SideNavLayout";
import GroupPageHeader from "../../../components/groups/GroupPageHeader";
import { fetchSingleGroupStart } from "../../../store/slices/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProfileLoader from "../../../components/Profile/ProfileLoader";
import AdminSettings from "../../../components/settings/AdminSettings";
import { getSelectorsByUserAgent ,isMobileOnly, isMobile} from "react-device-detect";
import { getCookies } from "cookies-next";


import { END } from "redux-saga";
import { wrapper } from "../../../store";

const Settings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: group, loading } = useSelector(
    (state) => state.groups.groupData
  );

  // useEffect(() => {
  //   router.isReady &&
  //     dispatch(fetchSingleGroupStart({ group_slug: router.query.group }));
  // }, [router.isReady]);


  return (
    <SideNavLayout>
      {loading ? (
        <div className="w-full h-screen  row-container">
          <ProfileLoader />
        </div>
      ) : (
        group !== null && (
          <>
            <GroupPageHeader group={group} />
            <div className="max-w-4xl mx-auto">
              <AdminSettings data={group} />
            </div>
          </>
        )
      )}
    </SideNavLayout>
  );
};

export default Settings;

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

