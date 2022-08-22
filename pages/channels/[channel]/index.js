import SideNavLayout from "../../../components/SideNavLayout";
import ChannelPageTabs from "../../../components/channels/ChannelPageTabs";
import ChannelPageHeader from "../../../components/channels/ChannelPageHeader";
import Image from "next/image";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchChannelsCategoriesStart, fetchSingleChannelStart, joinChannelStart , fetchChannelsStart} from "../../../store/slices/channelsSlice";
import ProfileLoader from "../../../components/Profile/ProfileLoader";
import Button from "../../../components/Button";
import { fetchUserDetailsStart } from "../../../store/slices/userSlice";
import { getCookies } from "cookies-next";
import {
  getSelectorsByUserAgent,
  isMobileOnly,
  isMobile,
} from "react-device-detect";

import { END } from "redux-saga";
import { wrapper } from "../../../store";

const Channel = () => {
  const cookies = getCookies();
  const router = useRouter();
  // const { channel } = router.query;
  const user = useSelector((state) => state.user.profile.data);
  const { data: channel, loading } = useSelector(
    (state) => state.channels.channelData
  );

  const checkMember = () => {
    if (channel.members) {
      var members = channel.members.map((member) => {
        return member.user_id;
      });
      return members.includes(parseInt(cookies.userId));
    } else {
      return false;
    }
  };

  const [subscribed, setSubscribed] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (router.isReady) {
  //     // Code using query

  //     dispatch(fetchSingleChannelStart(router.query.channel));
  //   }
  // }, [router.isReady]);

  return (
    <SideNavLayout>
      {loading ? (
        <ProfileLoader />
      ) : (
        channel && (
          <div>
           {/* header */}
          <ChannelPageHeader channel={channel}/>
           {/* end header */}
            {channel.is_member ? (
              <div className="max-w-[950px] mx-auto mt-14">
                <ChannelPageTabs />
              </div>
            ) : (
              <div className="row-container md:mb-10 mt-16 ">
                <div className="bg-white  md:w-[600px] h-52 rounded-lg shadow-md col-container space-y-3 p-1 md:p-0">
                  <h2 className="text-2xl md:text-4xl font-bold">
                    Sorry, Private Page!
                  </h2>
                  <p className="font-semibold text-sm text-gray-500 text-center w-full md:w-[400px]">
                    This page is a private page and content is only availaible
                    on subscription.
                  </p>
                  <div className="row-container space-x-1">
                    <div onClick={() => setSubscribed(true)}>
                      <Button
                        text="Subscribe"
                        extraclassNamees="w-36 h-9"
                        active={true}
                      />
                    </div>

                    {/* <button onClick={() => router.back()}> */}
                    <Button
                      text="Go Back"
                      extraclassNamees="w-36 h-9 bg-[#FFD0D8] hover:bg-[#FF1534] hover:text-white text-lightPlayRed"
                      textclassName="group-hover:text-white hover:text-white  font-semibold"
                    />
                    {/* </button> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </SideNavLayout>
  );
};

export default Channel;


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

      store.dispatch(
        fetchChannelsStart({
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
