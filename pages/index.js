import Head from "next/head";
import { useEffect, useState } from "react";
import Stories from "../components/feeds/Stories";
import NewsFeed from "../components/feeds/NewsFeed";
import NewsFeedSideBar from "../components/feeds/NewsFeedSideBar";
import SideNavLayout from "../components/SideNavLayout";
import { END } from "redux-saga";
import { useSession, getSession } from "next-auth/react";
import { wrapper } from "../store";

import { useSelector, useDispatch } from "react-redux";
// const DeviceDetector = require("node-device-detector");
// const DeviceHelper = require("node-device-detector/helper");
import { getSelectorsByUserAgent } from "react-device-detect";
import axios from "axios";
import { getCookies, hasCookie } from "cookies-next";
import {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserLoginSuccess,
} from "../store/slices/userSlice";
import { fetchChannelsStart } from "../store/slices/channelsSlice";
import { fetchStoriesStart } from "../store/slices/storiesSlice";
import { fetchHomePostsStart } from "../store/slices/homeSlice";
import Sticky from "react-stickynode";
import { fetchConfigurationStart } from "../store/slices/configurationSlice";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default function Home() {
  const configData = useSelector((state) => state.config.configData);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchHomePostsStart());
  // }, []);

  const [isVisible, setIsVisible] = useState(true);

  const [show, toggleShow] = useState(false);

  return (
    <>
      <SideNavLayout title={configData.site_name}>
        <main className=" lg:p-5">
          <Stories />

          <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5">
            <NewsFeed />

            <BrowserView>
              <Sticky>
                <NewsFeedSideBar />
              </Sticky>
            </BrowserView>
          </div>
        </main>
      </SideNavLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      //       // const session = await getSession({ req });

      const cookies = getCookies({ req, res });

      //       // const dispatch = useDispatch();
      //       if (cookies.accessToken) {
      //         store.dispatch(fetchUserLoginSuccess(JSON.parse(cookies.user)));
      //       }

      if (cookies.accessToken === null) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

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
      store.dispatch(
        fetchHomePostsStart({
          accessToken: cookies.accessToken,
          userId: cookies.userId,
          device_model: device_model,
        })
      );

      //       var user = JSON.parse(cookies.user);

      //       // store.dispatch(
      //       //   fetchHomePostsStart({
      //       //     accessToken: cookies.accessToken,
      //       //     userId: cookies.userId,
      //       //     device_model: device_model,
      //       //   })
      //       // );
      //       // store.dispatch(
      //       //   fetchStoriesStart({
      //       //     accessToken: cookies.accessToken,
      //       //     userId: cookies.userId,
      //       //     device_model: device_model,
      //       //   })
      //       // );

      //       // store.dispatch(
      //       //   fetchUserDetailsStart({ accessToken: cookies.accessToken })
      //       // );

      //       // store.dispatch(fetchConfigurationStart());

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
      };
    }
);
