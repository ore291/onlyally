import Image from "next/image";
import Button from "../Button";
import { IoMdThumbsUp } from "react-icons/io";
import { BsTagFill } from "react-icons/bs";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { channelSubscribeStart } from "../../store/slices/channelsSlice";
import { useState } from "react";
import { getCookies } from "cookies-next";
import ChannelPaymentModal from "./ChannelPaymentModal";

const ChannelFilter = ({ channel }) => {
  const dispatch = useDispatch();
  const cookies = getCookies();

  const [show, setShow] = useState(false);
  const toggleShow = (bool) => setShow(bool);

  const handleJoinChannel = async () => {
    dispatch(channelSubscribeStart(channel.slug));
  };

  const handleSubscription = () => {
    if (channel.is_private && channel.configuration?.billing?.amount > 0) {
      toggleShow(true);
    } else if (
      channel.is_private &&
      channel.configuration?.billing?.amount < 1
    ) {
      handleJoinChannel();
    } else {
      handleJoinChannel();
    }
  };
  return (
    <div className="flex md:w-full mx-2  px-2  items-center  justify-center content-center">
      <div className="rounded-full relative cursor-pointer">
        <Link href={`/channels/${channel.slug}`} passHref>
          <Image
            src={
              "https://dummyimage.com/80x80/000/fff.png&text=Playjor" ||
              channel.avatar
            }
            alt="side-img"
            width={80}
            height={80}
            objectFit="cover"
            className=" rounded-full  "
          />
        </Link>
      </div>
      <Link href={`/channels/${channel.slug}`} passHref>
        <div className="flex-1  px-3 md:px-1 w-full">
          <div className="flex-col flex space-y-1">
            <p className="font-bold text-xl md:text-2xl truncate cursor-pointer capitalize max-w-[220px]">
              {channel.name}
            </p>

            {/* <div className=" flex space-x-1">
            <IoMdThumbsUp className="h-4 w-4 text-black" />

            <p className="text-sm text-gray-600">4 people like this</p>
          </div> */}
            <div className=" flex space-x-1">
              <BsTagFill className="h-4 w-4 text-black" />
              <p className="text-sm text-gray-600">
                {`${channel.members.length} ${
                  channel.members.length > 1 ? "Members" : "Member"
                }`}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {/* <Button
        extraclassNamees="h-[35px] w-20 px-2 py-1"
        textClass="text-xs md:text-sm font-semibold"
        active={true}
        text="Subscribe"
      /> */}
      {channel.user_id === parseInt(cookies.userId) ? (
        <Link href={`/channels/${channel.slug}/settings`} passHref>
          <Button
            text="Edit"
            active={true}
            extraclassNamees="h-[35px] w-20 !bg-gray-400"
            textclassName="text-sm text-gray-100 font-semibold"
          />
        </Link>
      ) : channel.is_member ? (
        <Link href={`/channels/${channel.slug}`} passHref>
          <Button
            text="view"
            active={true}
            extraclassNamees="h-[35px] w-20 "
            textclassName="text-sm text-gray-100 font-semibold"
          />
        </Link>
      ) : (
        <Button
          text="Subscribe"
          active={true}
          extraclassNamees="h-[35px] w-20"
          textclassName="text-sm text-gray-100 font-semibold"
          onClick={(e) => handleSubscription()}
        />
      )}

      {show ? (
        <ChannelPaymentModal
          show={show}
          toggleShow={toggleShow}
          channel_slug={channel.slug}
        />
      ) : null}
    </div>
  );
};

export default ChannelFilter;
