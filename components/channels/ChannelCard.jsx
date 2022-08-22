import Image from "next/image";
import Button from "../Button";
import { BsHeartFill, BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { channelSubscribeStart } from "../../store/slices/channelsSlice";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";

import Link from "next/link";

const ChannelCard = ({ main, channel, profile }) => {
  const cookies = getCookies();

  const handleChannelSubscribe = (slug) => {
    dispatch(channelSubscribeStart(slug));
  };

  const checkMember = (memberList) => {
    var members = memberList.map((member) => {
      return member.user_id;
    });

    return members.includes(parseInt(cookies.userId));
  };
  if (main) {
    return (
      <div className="w-full  h-[230px]  border rounded-xl shadow-md overflow-hidden flex flex-col relative group cursor-pointer flex-shrink-0 ">
        <div className="relative w-full h-40 rounded-t-lg ">
          <Image
            src={"https://picsum.photos/200/200?random=7"}
            objectFit="cover"
            layout="fill"
            className="rounded-t-lg"
            alt=""
          />
          <div className="w-10 h-6 bg-[#D43D7D]/90 rounded-sm row-container p-1 absolute top-2 left-2">
            <span className="text-xs text-white">Hot</span>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items center justify-start">
            <div className="col-container space-y-1">
              <span className="text-lg text-gray-700 font-bold">
                Best place
              </span>
              <span className="text-xs font-semibold text-gray-400">
                Bessie howard
              </span>
            </div>
          </div>
          <div className="flex items center justify-end space-x-1">
            <div className="row-container space-x-1">
              <BsHeartFill className="w-3 h-3 text-gray-300" />
              <span className="text-sm text-gray-300">42</span>
            </div>
            <div className="row-container space-x-1">
              <BsEyeFill className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">114</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (profile) {
    return (
      <div className="h-[300px] w-full md:h-[300px] mb-5 border rounded-xl shadow-md overflow-hidden flex flex-col items-center relative group cursor-pointer flex-shrink-0 space-y-3">
        <Link href={`/channels/${channel.slug}`} passHref>
          <div className="relative w-full h-[100px] rounded-t-lg mb-8 md:mb-16">
            <Image
              src={
                channel.cover ||
                "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
              }
              objectFit="cover"
              layout="fill"
              className="rounded-t-lg"
              alt=""
            />
            <div className="absolute -bottom-8 md:-bottom-16 max-w-[100px] md:max-w-[116px] inset-x-0 mx-auto ">
              <div className="w-24 h-24 md:w-28 md:h-28 relative rounded-2xl  ">
                <Image
                  src={"https://dummyimage.com/300"}
                  alt="side-img"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </Link>

        <div className=" w-full ">
          <p className="font-semibold text-center text-lg">{channel.name}</p>
          <div className="flex items-center justify-center space-x-2 divide-x">
            <div className="col-container">
              <span className="  font-bold text-sm">4</span>
              <span className=" font-semibold text-gray-400">Posts</span>
            </div>
            <div className="col-container pl-2">
              <span className="  font-bold text-sm">
                {channel.members.length}
              </span>
              <span className=" font-semibold text-gray-400">Subscribers</span>
            </div>
          </div>
        </div>

        <Link href={`/channels/${channel.slug}`} passHref>
          <div className="w-full px-3">
            <Button
              text="View"
              textclassName="text-sm text-gray-100 font-semibold"
              extraclassNamees="w-full h-8  "
              active={true}
            />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="last:mr-auto w-56 h-[300px] mb-5 border rounded-xl shadow-md overflow-hidden flex flex-col relative group cursor-pointer flex-shrink-0 space-y-3">
      <Link href={`/channels/${channel.slug}`} passHref>
        <div className="relative w-full h-[90px] rounded-t-lg mb-16">
          <Image
            src={channel.cover}
            objectFit="cover"
            layout="fill"
            className="rounded-t-lg"
            alt=""
          />
          <div className="absolute -bottom-16 left-[50px]">
            <div className="row-container bg-white p-1 rounded-3xl">
              <div className="w-28 h-28 relative rounded-3xl">
                <Image
                  src={channel.avatar}
                  alt="side-img"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 place-content-center w-full ">
        <p className="font-semibold text-center text-lg">{channel.name}</p>
        <div className=" grid grid-cols-2 place-content-center">
          <div className="flex flex-col items-center w-full">
            <span className="    font-bold text-sm">
              {/* {channel.posts.length} */}4
            </span>
            <span className=" font-semibold text-gray-400 ">Posts</span>
          </div>

          <div className="col-container">
            <span className=" font-bold text-sm ">
              {channel.members.length}
            </span>
            <span className=" font-semibold text-gray-400 ">Subscribers</span>
          </div>
        </div>
      </div>
      <div className="row-container px-3">
        {/* <Button
          text="Subscribe N2,000"
          textclassName="text-sm text-gray-100 font-semibold"
          extraclassNamees="w-full h-8"
          active={true}
        /> */}

        {channel.user_id === parseInt(cookies.userId) ? (
          <Button
            text="Edit"
            active={true}
            extraclassNamees="w-full h-8"
            textclassName="text-sm text-gray-100 font-semibold"
          />
        ) : channel.is_member ? (
          <Button
            text="view"
            active={true}
            extraclassNamees="w-full h-8"
            textclassName="text-sm text-gray-100 font-semibold"
          />
        ) : (
          <Button
            text="Subscribe"
            active={true}
            extraclassNamees="w-full h-8"
            textclassName="text-sm text-gray-100 font-semibold"
            onClick={(e) => handleChannelSubscribe(channel.slug)}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelCard;
