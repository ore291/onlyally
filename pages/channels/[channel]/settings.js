import React, { useEffect, useState } from "react";
import SideNavLayout from "../../../components/SideNavLayout";
import ChannelPageHeader from "../../../components/channels/ChannelPageHeader";
import { fetchSingleChannelStart, fetchChannelsCategoriesStart } from "../../../store/slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProfileLoader from "../../../components/Profile/ProfileLoader";
import AdminSettings from "../../../components/channelSettings/AdminSettings";
import {
  getSelectorsByUserAgent,
  isMobileOnly,
  isMobile,
} from "react-device-detect";
import { getCookies } from "cookies-next";

import { END } from "redux-saga";
import { wrapper } from "../../../store";

const Settings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: channel, loading } = useSelector(
    (state) => state.channels.channelData
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
        channel !== null && (
          <>
            <ChannelPageHeader channel={channel} />
            <div className="max-w-4xl mx-auto">
              <AdminSettings data={channel} />
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
      const { channel } = params;

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
        fetchSingleChannelStart({
          accessToken: cookies.accessToken,
          channel_slug: channel,
        })
      );
      store.dispatch(
        fetchChannelsCategoriesStart({
          accessToken: cookies.accessToken,     
          channel_slug: channel,
        })
      );

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
      };
    }
);
