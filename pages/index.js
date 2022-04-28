import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import Stories from "../components/feeds/Stories";
import NewsFeed from "../components/feeds/NewsFeed";
import NewsFeedSideBar from "../components/feeds/NewsFeedSideBar";
import SideNavLayout from "../components/SideNavLayout";
import { END } from "redux-saga";
import { useSession, getSession } from "next-auth/react";
import { wrapper } from "../store";
import { useSelector, useDispatch } from "react-redux";
const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');

import {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
} from "../store/slices/userSlice";
import {fetchStoriesStart} from "../store/slices/storiesSlice";
import { fetchHomePostsStart , fetchTrendingUsersStart, fetchPostSuggestionsStart} from "../store/slices/homeSlice";
import Script from "next/script";
import Sticky from "react-stickynode";
import { apiConstants } from "../components/Constant/constants";
import configuration from "react-global-configuration";
// import useInfiniteScroll from "../components/helper/useInfiniteScroll";


export default function Home({ configData, session }) {
  console.log(session)
  configuration.set({ config: configData }, { freeze: false });
  const posts = useSelector((state) => state.home.homePost);
  const userDetails = useSelector((state) => state.user.loginData);
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

  // useEffect(() => {
  //   console.log(configuration.get('config.site_name'));
  // }, []);

  // useEffect(() => {
  //   console.log(configData);
  //   configuration.set({ configData: configData }, { freeze: false });
  //   console.log(configuration.get("configData?.site_name?"))
  //   //  console.log(title);
  // },[configData])

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
  (store) => async ({ req, res }) => {
    const session = await getSession({ req });

    // const dispatch = useDispatch();
    if (session) {
      store.dispatch(fetchUserDetailsSuccess(session.user.userDetails));
    }

    const response = await fetch(apiConstants.settingsUrl);
    const configValue = await response.json();

    configuration.set({ configData: configValue.data }, { freeze: false });

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

    const detector = new DeviceDetector({clientVersionTruncate: 0,});

    const userAgent = req.headers['user-agent']; 
    const result = detector.detect(userAgent);
   
    var device_model = "";
    if (DeviceHelper.isMobile(result)) {
      device_model = result.device.model;
    } else {
      device_model = result.client.name + " " + result.client.version;
      // device_model = "Chrome" + " " + "100";
    }
    store.dispatch(
      fetchHomePostsStart({
        accessToken: session.accessToken,
        userId: session.userId,
        device_model: device_model
      })
    );
    store.dispatch(
      fetchTrendingUsersStart({
        accessToken: session.accessToken,
        userId: session.userId,
        device_model: device_model
      })
    );
    store.dispatch(
    fetchStoriesStart({
        accessToken: session.accessToken,
        userId: session.userId,
        device_model: device_model
      })
    );
    store.dispatch(
    fetchPostSuggestionsStart({
        accessToken: session.accessToken,
        userId: session.userId,
        device_model: device_model
      })
    );

    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {
        configData: configValue.data,
      },
    };
  }
);
