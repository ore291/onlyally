import React, { Fragment, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Button from "../Button";
import { BsFillArrowLeftCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import Image from "../helpers/CustomImage";
import Link from "next/link";
import {
  deleteGroupMemberStart,
  joinGroupStart,
} from "../../store/slices/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupPaymentModal from "./GroupPaymentModal";
import { Popover, Transition } from "@headlessui/react";

const GroupPageHeader = ({ group }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const toggleShow = (bool) => setShowPaymentModal(bool);

  const handleJoinGroup = async () => {
    dispatch(joinGroupStart(group.slug));
  };

  const handleSubscription = () => {
    if (group.is_private && group.configuration?.billing?.amount > 0) {
      toggleShow(true);
    } else if (group.is_private && group.configuration?.billing?.amount < 1) {
      handleJoinGroup();
    } else {
      handleJoinGroup();
    }
  };

  const exitGroup = () => {
    dispatch(
      deleteGroupMemberStart({
        slug: group.slug,
        user_id: getCookie("userId"),
      })
    );
  };

  return (
    <>
      <div className="w-full mx-auto relative pb-10">
        <div className="relative object-cover h-[300px]  md:h-[450px] xxl:h-[500px] w-full blur-[20px]  -mt-16 md:-mt-36">
          <Image
            src={
              // group?.media[1]?.original_url
              //   ? group?.media[1]?.original_url
              //   : group.cover ||
              "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
            }
            layout="fill"
            objectFit="cover"
            alt=""
            srcSet=""
          />
        </div>
        <div className="w-full h-[107%] absolute inset-x-0 top-1 bg-gradient-to-b from-transparent to-[#f9f9f9] z-5"></div>

        <div className=" max-w-[900px] 2xl:max-w-screen-lg mx-auto absolute inset-0 -bottom-8">
          <div className="w-full  rounded-2xl  relative z-10 ">
            <div className="!relative h-[300px] w-full  md:h-[450px]">
              <Image
                src={
                  // group?.media[1]?.original_url
                  //   ? group?.media[1]?.original_url
                  //   : group.cover ||
                  "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
                }
                layout="fill"
                alt=""
                srcSet=""
                className="object-cover w-full max-h-[300px] md:max-h-[450px] "
              />
            </div>
            <div />
          </div>
          <div className="flex justify-between p-2 px-4 items-center shadow-lg w-full bg-white rounded-b-lg">
            <div className="row-container space-x-2">
              <Link href={`/groups/${group.slug}`} passHref>
                <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-xl cursor-pointer">
                  <Image
                    src={
                      // group?.media[0]?.original_url
                      //   ? group?.media[0]?.original_url
                      //   : group.avatar ||
                      "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-avatar.jpg"
                    }
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                    alt=""
                  />
                </div>
              </Link>
              <div className="flex flex-col justify-center space-y-2">
                <Link href={`/groups/${group.slug}`} passHref>
                  <div className="row-container space-x-1 cursor-pointer">
                    <h2 className="text-xl md:text-3xl font-bold leading-7">
                      {group.name}
                    </h2>
                    {/* <MdVerified className="w-4 h-4 text-lightPlayRed" /> */}
                  </div>
                </Link>

                <p className="text-sm font-semibold">
                  {group?.members?.length} members
                </p>
              </div>
            </div>
            <div>
              {group && group.user_id === parseInt(getCookie("userId")) ? (
                <Link href={`/groups/${group.slug}/settings`} passHref>
                  <Button
                    text="Edit"
                    textclassName="text-sm font-medium"
                    extraclassNamees="w-20 md:w-28 h-9  rounded-md bg-gray-500 text-black"
                  />
                </Link>
              ) : group.is_member ? //   text="Exit" // <Button
              //   onClick={() => exitGroup()}
              //   active={true}
              //   extraclassNamees="w-20 md:w-28 h-9  rounded-md bg-red-500"
              // />
              null : (
                <Button
                  onClick={() => handleSubscription()}
                  text="Join"
                  textclassName="text-lg font-semibold"
                  extraclassNamees="w-20 md:w-28 h-8  text-red-400 hover:bg-lightPlayRed hover:text-white rounded-md"
                />
              )}
            </div>
          </div>
        </div>

        <div
          className="w-8 h-8 rounded-full absolute z-10 top-20 md:top-40 left-3 md:left-10 bg-white cursor-pointer"
          onClick={() => router.back()}
        >
          <BsFillArrowLeftCircleFill className="h-8 w-8  " />
        </div>
        <div className="absolute z-10 top-20 md:top-40  right-2 md:right-12">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <div className="w-8 h-8 rounded-full  bg-black cursor-pointer row-container">
                    <BsThreeDotsVertical className="h-5 w-5 text-white " />
                  </div>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-[100px]  px-4 mt-3 transform shadow-md -translate-x-1/2 -left-10 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <Button
                        text="Exit"
                        onClick={() => exitGroup()}
                        active={true}
                        extraclassNamees="w-full  h-9  rounded-md bg-red-500"
                      />
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      {showPaymentModal ? (
        <GroupPaymentModal
          show={showPaymentModal}
          toggleShow={toggleShow}
          group_slug={group.slug}
        />
      ) : null}
    </>
  );
};

export default GroupPageHeader;
