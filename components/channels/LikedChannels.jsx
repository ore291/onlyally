import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBarLoader from "../helpers/SideBarLoader";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelsStart,
  channelSubscribeStart,
} from "../../store/slices/channelsSlice";
import CommonCenterLoader from "../helpers/CommonCenterLoader";
import ChannelPaymentModal from "./ChannelPaymentModal";
import ChannelCard from "./ChannelCard"

// .filter(filterchannel => !checkMember(filterchannel.members)) code for filtering

const LikedChannels = () => {
  const [active, setactive] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels.data);
  const user = useSelector((state) => state.user.loginData);

  const [show, setShow] = useState(false);

  const toggleShow = (bool) => setShow(bool);

  const handleJoinChannel = async (channel) => {
    dispatch(channelSubscribeStart(channel.slug));

    setTimeout(() => {
      router.reload();
    }, 2000);
  };

  const handleSubscription = (channel) => {
    if (channel.is_private && channel.configuration?.billing?.amount > 0) {
      toggleShow(true);
    } else if (channel.is_private && channel.configuration?.billing?.amount < 1) {
      handleJoinChannel(channel);
    }
  };

  const checkMember = (memberList) => {
    var members = memberList.map((member) => {
      return member.user_id;
    });

    return members.includes(user.user_id);
  };

  useEffect(() => {
    dispatch(fetchChannelsStart());
  }, []);

  return (
    <div className="side-container">
      <p className="text-start font-bold">Channels you may like</p>
      <div className="flex flex-col space-y-2 items-center pb-4">
        <div className="flex space-x-2  justify-center items-center mb-2">
          <Button
            text="POPULAR"
            active={active === 0 ? true : false}
            onClick={() => {
              setactive(0);
            }}
          />
          <Button
            text="NEWEST"
            active={active === 1 ? true : false}
            onClick={() => {
              setactive(1);
            }}
          />
          <Button
            text="SEE ALL"
            active={false}
            onClick={() => router.push("/channels")}
          />
        </div>
        {channels.loading ? (
          <div className="row-container">
            <SideBarLoader />
          </div>
        ) : (
          <>
            {active === 0 ? (
              <div className="grid grid-cols-1 gap-y-2">
                {channels.length > 0
                  ? [...channels]
                      .sort(() => Math.random() - Math.random())
                      .slice(0, 5)
                      .map((channel, i) => (
                        <ChannelCard key={i} liked={true} channel={channel}/>
                        
                      ))
                  : null}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-2">
                {channels.length > 0
                  ? [...channels]
                      .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
                      .slice(0, 5)
                      .map((channel, i) => (
                        <ChannelCard key={i} liked={true} channel={channel}/>
                      ))
                  : null}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LikedChannels;
