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

// .filter(filterchannel => !checkMember(filterchannel.members)) code for filtering

const LikedChannels = () => {
  const [active, setactive] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels.data);
  const user = useSelector((state) => state.user.loginData);

  const joinChannel = (slug) => {
    dispatch(channelSubscribeStart(slug));
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
                        <div
                          className="grid grid-cols-4 place-content-center items-center justify-center  w-full"
                          key={i}
                        >
                          {" "}
                          <Link href={`/channels/${channel.slug}`} passHref>
                            <div className=" w-12 h-12 relative cursor-pointer">
                              <Image
                                src={channel.avatar}
                                alt="side-img"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                              />
                            </div>
                          </Link>
                          <div className="flex flex-col space-y-.5 col-span-2 ">
                            <Link href={`/channels/${channel.slug}`} passHref>
                              <p className="font-semibold text-xs text-ellipsis capitalize cursor-pointer  text-gray-600 whitespace-nowrap">
                                {channel.name}
                              </p>
                            </Link>
                            <span className="text-xs font-semibold">
                              {channel.members.length} Subscribers
                            </span>
                          </div>
                          <div className=" row-container">
                            {channel.is_member ? (
                              <Button
                                onClick={() =>
                                  router.push(`/channels/${channel.slug}`)
                                }
                                text="view"
                                active={true}
                              />
                            ) : (
                              <Button
                                text="Subscribe"
                                active={true}
                                onClick={(e) => joinChannel(channel.slug)}
                              />
                            )}
                          </div>
                        </div>
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
                        <div
                          className="grid grid-cols-4 place-content-center items-center justify-center  w-full"
                          key={i}
                        >
                          <div className=" w-12 h-12 relative ">
                            <Image
                              src={channel.avatar}
                              alt="side-img"
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex flex-col space-y-.5 col-span-2 ">
                            <p className="font-bold text-sm  text-gray-600 whitespace-nowrap">
                              {channel.name}
                            </p>
                            <span className="text-xs font-semibold">
                              {channel.members.length} Subscribers
                            </span>
                          </div>
                          <div className=" row-container">
                            {checkMember(channel.members) ? (
                              <Button
                                onClick={() =>
                                  router.push(`/channels/${channel.slug}`)
                                }
                                text="view"
                                active={true}
                              />
                            ) : (
                              <Button
                                text="Subscribe"
                                active={true}
                                onClick={(e) => joinChannel(channel.slug)}
                              />
                            )}
                          </div>
                        </div>
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
