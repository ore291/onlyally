import React, {useState} from "react";
import Button from "../Button";
import { FaCamera } from "react-icons/fa";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import {
  channelSubscribeStart,
  deleteChannelMemberStart,
} from "../../store/slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ChannelPaymentModal from "./ChannelPaymentModal"


const ChannelPageHeader = ({ channel }) => {
  const router = useRouter();
  const { loading } = useSelector((state) => state.channels.channelSubscribe);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const toggleShow = (bool) => setShow(bool);

  const handleJoinChannel = async () => {
    dispatch(channelSubscribeStart(channel.slug));

    setTimeout(() => {
      router.reload();
    }, 1500);
  };

  const handleSubscription = () => {
    if (channel.is_private && channel.configuration?.billing?.amount > 0) {
      toggleShow(true);
    } else if (
      channel.is_private &&
      channel.configuration?.billing?.amount < 1
    ) {
      handleJoinChannel();
    }else {
      handleJoinChannel();
    }
  };

  const unsubscribe = () => {
    dispatch(
      deleteChannelMemberStart({
        slug: channel.slug,
        user_id: getCookie("userId"),
      })
    );
  };
  return (
    <>
      <div className="w-full mx-auto relative pb-10">
      <img
        src={
          channel?.media[1]?.original_url
            ? channel?.media[1]?.original_url
            : channel.cover ||
              "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
        }
        alt=""
        srcSet=""
        className="object-cover max-h-[300px] md:max-h-[450px] w-full blur-[20px]  -mt-16 md:-mt-36"
      />
      <div className="w-full h-[107%] absolute inset-x-0 top-1 bg-gradient-to-b from-transparent to-[#f9f9f9] z-5"></div>

      <div className=" lg:max-w-[900px] 2xl:max-w-screen-lg mx-auto absolute inset-0 -bottom-8">
        <div className="w-full  rounded-2xl  relative z-10">
          <img
            src={
              channel?.media[1]?.original_url
                ? channel?.media[1]?.original_url
                : channel.cover ||
                  "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
            }
            alt=""
            srcSet=""
            className="object-cover w-full max-h-[300px] md:max-h-[450px] "
          />
          <Link href={`/channels/${channel.slug}`} passHref>
            <div className="absolute -bottom-14 left-5 p-1 rounded-full bg-white cursor-pointer">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full">
                <Image
                  src={
                    channel?.media[0]?.original_url
                      ? channel?.media[0]?.original_url
                      : channel?.avatar || "/profile_avatar_full.jpg"
                  }
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                {/* <div className="absolute bottom-0 -right-2 bg-blend-lighten bg-gray-500 p-2 rounded-full cursor-pointer">
                <FaCamera className="h-3 w-3 text-gray-200" />
              </div> */}
              </div>
            </div>
          </Link>

          <div />
        </div>
        <div className="flex cursor-pointer justify-between p-2 px-4 items-center w-full bg-white rounded-b-lg shadow-lg ">
          <div className=" ml-24 md:ml-32">
            <Link href={`/channels/${channel.slug}`} passHref>
              <div className="flex flex-col justify-center space-y-.5 md:space-y-2">
                <div className="row-container space-x-1">
                  <h2 className="text-xl md:text-3xl font-semibold leading-7">
                    {channel.name}
                  </h2>
                </div>
                <p className="text-xs font-semibold">@{channel.name}</p>
              </div>
            </Link>
          </div>
          {channel && channel.user_id === parseInt(getCookie("userId")) ? (
            <Link href={`/channels/${channel.slug}/settings`} passHref>
              <Button
                text="Edit"
                textclassName="text-sm font-medium"
                extraclassNamees="w-20 md:w-28 h-9  rounded-md bg-gray-500 text-black"
              />
            </Link>
          ) : channel.is_member ? (
            <Button
              text="Unsubscribe"
              onClick={() => unsubscribe()}
              active={true}
              extraclassNamees="w-20 md:w-28 h-9  rounded-md bg-red-500"
            />
          ) : (
            <Button
              onClick={() => handleSubscription()}
              text={loading ? "subscribing" : "subscribe"}
              extraclassNamees="w-20 md:w-28 h-9 bg-gray-200 rounded-md"
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
    {show ? (
        <ChannelPaymentModal
          show={show}
          toggleShow={toggleShow}
          channel_slug={channel.slug}
        />
      ) : null}
    </>
  
  );
};

export default ChannelPageHeader;
