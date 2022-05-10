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
import { getSelectorsByUserAgent} from 'react-device-detect';
import axios from "axios";

import {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserLoginSuccess,
} from "../store/slices/userSlice";
import { fetchStoriesStart } from "../store/slices/storiesSlice";
import { fetchHomePostsStart } from "../store/slices/homeSlice";
import Sticky from "react-stickynode";
import { fetchConfigurationStart } from "../store/slices/configurationSlice";
// import useInfiniteScroll from "../components/helper/useInfiniteScroll";

export default function Home({userDetails}) {
  const posts = useSelector((state) => state.home.homePost);
  const configData = useSelector((state) => state.config.configData)
  // const userDetails = useSelector((state) => state.user.loginData);
  const dispatch = useDispatch();

  const fetchHomeData = () => {
    setTimeout(() => {
      if (posts.length !== 0) {
        dispatch(fetchHomePostsStart());
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("accessToken", userDetails.token);
    localStorage.setItem("userId", userDetails.user_id);
    localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", userDetails.picture);
        localStorage.setItem("user_cover", userDetails.cover);
        localStorage.setItem("name", userDetails.name);
        localStorage.setItem("username", userDetails.username);
        localStorage.setItem("socket", true);
        localStorage.setItem(
          "user_unique_id",
          userDetails.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          userDetails.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          userDetails.is_verified_badge
            ? userDetails.is_verified_badge
            : 0
        );
        localStorage.setItem(
          "is_content_creator",
          userDetails.is_content_creator
        );
        localStorage.setItem(
          "default_payment_method",
          userDetails.default_payment_method
        );
        localStorage.setItem(
          "is_two_step_auth_enabled",
          userDetails.is_two_step_auth_enabled
        );
        localStorage.setItem("emailId", userDetails.email);
        

  }, []);

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchHomeData);

  const [noMoreData, setNoMoreData] = useState(false);

  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const [isVisible, setIsVisible] = useState(true);

  const [show, toggleShow] = useState(false);

  const handleSearch = (event) => {
    if (event.currentTarget.value === "") {
      toggleShow(false);
    } else {
      toggleShow(true);
      props.dispatch(searchUserStart({ key: event.currentTarget.value }));
    }
  };



 

  return (
    <>
      <Head>
        <title>{configData.site_name}</title>
        <link
          rel="icon"
          type="image/png"
          href={configData.site_icon}
          // sizes="16x16"
        />
      </Head>

      <SideNavLayout>
        <main className=" lg:p-5">
          <Stories />
          <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5">
            <NewsFeed />
            <Sticky>
              <NewsFeedSideBar />
            </Sticky>
          </div>
        </main>
      </SideNavLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const session = await getSession({ req });

      // const dispatch = useDispatch();
      if (session) {
        store.dispatch(fetchUserLoginSuccess(session.user.userDetails));
      }

      // this.setState({ configLoading: false });

      // session && store.dispatch(setUserData(session.user.userDetails))
      // store.dispatch(fetchUserDetailsStart({accessToken: session.accessToken, userId: session.userId}));
      // store.dispatch(END)
      // await store.sagaTask.toPromise();

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      // const detector = new DeviceDetector({ clientVersionTruncate: 0 });

      // const userAgent = req.headers["user-agent"];
      // const result = detector.detect(userAgent);

      // var device_model = "";
      // if (DeviceHelper.isMobile(result)) {
      //   device_model = result.device.model;
      // } else {
      //   device_model = result.client.name + " " + result.client.version;
      //   // device_model = "Chrome" + " " + "100";
      // }

      const userAgent = req.headers['user-agent']; 
      const {  isAndroid,
        isIOS,
        isWindows,
        isMacOs,
        mobileModel,
        browserName,
        osName,
        mobileVendor,
        browserVersion, } = getSelectorsByUserAgent(userAgent)

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
          accessToken: session.accessToken,
          userId: session.userId,
          device_model: device_model,
        })
      );
      store.dispatch(
        fetchStoriesStart({
          accessToken: session.accessToken,
          userId: session.userId,
          device_model: device_model,
        })
      );
      store.dispatch(fetchConfigurationStart());

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {
          userDetails : session.user.userDetails
        },
      };
    }
);
