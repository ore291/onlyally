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
import { getCookies, setCookies, removeCookies , checkCookies} from "cookies-next";
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
// import useInfiniteScroll from "../components/helper/useInfiniteScroll";

export default function Home() {
  const posts = useSelector((state) => state.home.homePost);
  const configData = useSelector((state) => state.config.configData);
  const loginDetails = useSelector((state) => state.user.loginData);
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
    
    localStorage.setItem("userId", loginDetails.user_id);
    localStorage.setItem("token", loginDetails.token);
    localStorage.setItem("userLoginStatus", true);
    localStorage.setItem("user_picture", loginDetails.picture);
    localStorage.setItem("user_cover", loginDetails.cover);
    localStorage.setItem("name", loginDetails.name);
    localStorage.setItem("username", loginDetails.username);
    localStorage.setItem("socket", true);
    localStorage.setItem("user_unique_id", loginDetails.user_unique_id);
    localStorage.setItem(
      "is_document_verified",
      loginDetails.is_document_verified
    );
    localStorage.setItem(
      "is_verified_badge",
      loginDetails.is_verified_badge ? loginDetails.is_verified_badge : 0
    );
    localStorage.setItem("is_content_creator", loginDetails.is_content_creator);
    localStorage.setItem(
      "default_payment_method",
      loginDetails.default_payment_method
    );
    localStorage.setItem(
      "is_two_step_auth_enabled",
      loginDetails.is_two_step_auth_enabled
    );
    localStorage.setItem("emailId", loginDetails.email);
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
      dispatch(searchUserStart({ key: event.currentTarget.value }));
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
          <Stories  />
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

      var user = session.user.userDetails;
      // setCookies("userId", user.user_id, { req, res });
      // setCookies("accessToken", user.token, { req, res });
      // setCookies("user_email", user.email, { req, res });
      // setCookies("username", user.username, {req, res} )
      const cookies = getCookies({ req, res});
      store.dispatch(
        fetchHomePostsStart({
          accessToken: cookies.accessToken,
          userId: cookies.userId,
          device_model: device_model,
        })
      );
      store.dispatch(
        fetchStoriesStart({
          accessToken: cookies.accessToken,
          userId: cookies.userId,
          device_model: device_model,
        })
      );

      store.dispatch(
        fetchUserDetailsStart({accessToken: cookies.accessToken})
      )

      

      // store.dispatch(fetchConfigurationStart());

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {
          user_img: user.picture,
        },
      };
    }
);
