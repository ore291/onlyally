import SideNavLayout from "../../components/SideNavLayout";
import ChannelPageTabs from "../../components/channels/ChannelPageTabs";
import Image from "next/image";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchSingleChannelStart } from "../../store/slices/channelsSlice";
import ProfileLoader from "../../components/Profile/ProfileLoader";
import Button from "../../components/Button";
import { fetchUserDetailsStart } from "../../store/slices/userSlice";
import { getCookies } from "cookies-next";

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

  useEffect(() => {
    if (router.isReady) {
      // Code using query

      dispatch(fetchSingleChannelStart(router.query.channel));
    }
  }, [router.isReady]);

  return (
    <SideNavLayout>
      {loading ? (
        <ProfileLoader />
      ) : (
        channel && (
          <div>
            <div className=" w-full mx-auto relative ">
              <img
                src={channel?.cover}
                alt=""
                srcSet=""
                className="object-contain   w-full blur-[20px] -mt-16 md:-mt-36"
              />
              <div className="w-full h-[107%] absolute inset-x-0 top-1 bg-gradient-to-b from-transparent to-[#f9f9f9] z-5"></div>

              <div className=" max-w-[900px] mx-auto absolute inset-0 -bottom-8">
                <div className="w-full  rounded-2xl  relative z-10">
                  <img
                    src={channel?.cover}
                    alt=""
                    srcSet=""
                    className="object-cover w-full "
                  />
                  <div className="absolute -bottom-14 left-5 p-1 rounded-full bg-white">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full">
                      <Image
                        src={channel?.avatar || "/profile_avatar_full" }
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                      <div className="absolute bottom-0 -right-2 bg-blend-lighten bg-gray-500 p-2 rounded-full cursor-pointer">
                        <FaCamera className="h-3 w-3 text-gray-200" />
                      </div>
                    </div>
                  </div>
                  <div />
                </div>
                <div className="flex justify-between p-2 px-4 items-center w-full bg-white rounded-b-lg shadow-lg ">
                  <div className=" ml-24 md:ml-32">
                    <div className="flex flex-col justify-center space-y-.5 md:space-y-2">
                      <div className="row-container space-x-1">
                        <h2 className="text-xl md:text-3xl font-semibold leading-7">
                          {channel.name}
                        </h2>
                      </div>
                      <p className="text-xs font-semibold">@{channel.name}</p>
                    </div>
                  </div>
                  {channel && channel.is_member ? (
                    <Button
                      text="Unsubscribe"
                      active={true}
                      extraClasses="w-20 md:w-28 h-9  rounded-md bg-red-500"
                    />
                  ) : (
                    <Button
                      text="subscribe"
                      extraClasses="w-20 md:w-28 h-9 bg-gray-200 rounded-md"
                    />
                  )}
                </div>
              </div>

              <div
                className="w-8 h-8 rounded-full absolute z-10 top-20  left-2 md:top-40 md:left-10 bg-white cursor-pointer"
                onClick={() => router.back()}
              >
                <BsFillArrowLeftCircleFill className="h-8 w-8  " />
              </div>
            </div>
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
                        extraClasses="w-36 h-9"
                        active={true}
                      />
                    </div>

                    {/* <button onClick={() => router.back()}> */}
                    <Button
                      text="Go Back"
                      extraClasses="w-36 h-9 bg-[#FFD0D8] hover:bg-[#FF1534] hover:text-white text-lightPlayRed"
                      textClass="group-hover:text-white hover:text-white  font-semibold"
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
