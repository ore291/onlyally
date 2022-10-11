import React,{useState} from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Button from "../Button";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import {
  deleteGroupMemberStart,
  joinGroupStart,
} from "../../store/slices/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupPaymentModal from "./GroupPaymentModal";

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
    <div className="w-full mx-auto relative">
      <img
        src={
          group?.media[1]?.original_url
            ? group?.media[1]?.original_url
            : group.cover ||
              "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
        }
        alt=""
        srcSet=""
        className="object-contain   w-full blur-[20px] -mt-28"
      />
      <div className="w-full h-[107%] absolute inset-x-0 top-1 bg-gradient-to-b from-transparent to-[#f9f9f9] z-5"></div>

      <div className=" max-w-[900px] 2xl:max-w-screen-lg mx-auto absolute inset-0 -bottom-8">
        <div className="w-full  rounded-2xl  relative z-10 ">
          <img
            src={
              group?.media[1]?.original_url
                ? group?.media[1]?.original_url
                : group.cover ||
                  "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
            }
            alt=""
            srcSet=""
            className="object-cover w-full "
          />
          <div />
        </div>
        <div className="flex justify-between p-2 px-4 items-center shadow-lg w-full bg-white rounded-b-lg">
          <div className="row-container space-x-2">
            <Link href={`/groups/${group.slug}`} passHref>
              <div className="relative w-14 h-14 rounded-xl cursor-pointer">
                <Image
                  src={
                    group?.media[0]?.original_url
                      ? group?.media[0]?.original_url
                      : group.avatar ||
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
                  <h2 className="text-3xl font-bold leading-7">{group.name}</h2>
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
            ) : group.is_member ? (
              <Button
                text="Exit"
                onClick={() => exitGroup()}
                active={true}
                extraclassNamees="w-20 md:w-28 h-9  rounded-md bg-red-500"
              />
            ) : (
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
        className="w-8 h-8 rounded-full absolute z-10 top-40 left-10 bg-white cursor-pointer"
        onClick={() => router.back()}
      >
        <BsFillArrowLeftCircleFill className="h-8 w-8  " />
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
