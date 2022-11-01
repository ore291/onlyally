import Image from "next/image";
import Button from "../Button";
import UserCardPopup from "./UserCardPopup";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUnlock, FaUserTimes } from "react-icons/fa";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../store/slices/OtherUsersSlice";
import { getCookie } from "cookies-next";
import {
  setPaymentModal,
  setUnfollowerModal,
} from "../../store/slices/NavSlice";
import { subscriptionPaymentPaystackStart } from "../../store/slices/subscriptionSlice";
import { Popover, Transition, Dialog } from "@headlessui/react";
import PaymentModal from "../../components/helpers/QuickFollowPaymentModal";
import UnfollowModal from "../../components/helpers/QuickUnfollowModal";
import { useEffect, useState, Fragment } from "react";
import { RiUserUnfollowFill } from "react-icons/ri";

const UserCard = ({ creator }) => {
  const dispatch = useDispatch();
  const [unfollowModal, setUnfollowerModal] = useState(false);

  const [followed, setFollowed] = useState(null);

  const follow = (str) => {
    setFollowed(str);
  };

  const [paymentMod, setPaymentMod] = useState(false);

  const toggleShow = (bool) => setPaymentMod(bool);

  const toggleUnfollowModal = (bool) => setUnfollowerModal(bool);

  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });
  // console.log(creator);

  const [anchorEl, setAnchorEl] = useState(null);

  const subscriptionPayment = (
    plan_type,
    amount,
    amount_formatted,
    is_free = 0
  ) => {
    setSubscriptionData({
      ...subscriptionData,
      is_free: is_free,
      plan_type: plan_type,
      amount: amount,
      amount_formatted: amount_formatted,
    });
    toggleShow(true);
  };

  return (
    <>
      <div className=" bg-white border shadow-lg rounded-lg max-w-3xl p-3 px-5 flex items-center justify-between md:!hidden">
        <div className="row-container space-x-2">
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image
              src={creator.picture}
              alt="side-img"
              layout="fill"
              objectFit="cover"
              className="relative rounded-full"
            />
          </div>
          <p className="text-center font-medium text-lg truncate text-[rgba(0,0,0,.9);] cursor-pointer">
            {creator.name}
          </p>
        </div>

        {followed !== null ? (
          followed == "followed" ? (
            <>
              <div
                className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer"
                onClick={() => toggleUnfollowModal(true)}
              >
                <span>
                  <RiUserUnfollowFill className="text-white h-6 w-6" />
                </span>
              </div>
            </>
          ) : creator.payment_info.is_free_account == 0 ? (
            <div
              className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer"
              onClick={(event) =>
                subscriptionPayment(
                  event,
                  "months",
                  creator.payment_info.subscription_info.monthly_amount,
                  creator.payment_info.subscription_info
                    .monthly_amount_formatted
                )
              }
            >
              <span>
                <IoMdPersonAdd className="text-white h-6 w-6" />
              </span>
            </div>
          ) : (
            <div
              className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer"
              onClick={(event) => {
                dispatch(
                  subscriptionPaymentPaystackStart({
                    user_unique_id: creator.user_unique_id,
                    plan_type: "months",
                    is_free: 1,
                    payment_id: "free",
                  })
                );
                follow("followed");
              }}
            >
              <span>
                <IoMdPersonAdd className="text-white h-6 w-6" />
              </span>
            </div>
          )
        ) : (
          <>
            {creator.payment_info.is_user_needs_pay == 1 &&
            creator.payment_info.unsubscribe_btn_status == 0 ? (
              creator.payment_info.is_free_account == 0 ? (
                <div
                  className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer"
                  onClick={() =>
                    subscriptionPayment(
                      "months",
                      creator.payment_info.subscription_info.monthly_amount,
                      creator.payment_info.subscription_info
                        .monthly_amount_formatted
                    )
                  }
                >
                  <span>
                    <IoMdPersonAdd className="text-white h-6 w-6" />
                  </span>
                </div>
              ) : (
                <div
                  className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer"
                  onClick={(event) => {
                    dispatch(
                      subscriptionPaymentPaystackStart({
                        user_unique_id: creator.user_unique_id,
                        plan_type: "months",
                        is_free: 1,
                        payment_id: "free",
                      })
                    );
                    follow("followed");
                  }}
                >
                  <span>
                    <IoMdPersonAdd className="text-white h-6 w-6" />
                  </span>
                </div>
              )
            ) : null}
            {creator.payment_info.unsubscribe_btn_status == 1 ? (
              <>
                <div
                  className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer"
                  onClick={() => toggleUnfollowModal(true)}
                >
                  <span>
                    <RiUserUnfollowFill className="text-white h-6 w-6" />
                  </span>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
      <div className="!hidden md:!flex !p-0 !items-center side-container relative rounded-lg">
        <div className="relative w-full h-[90px] rounded-t-lg mb-16">
          <Image
            src={creator?.cover}
            objectFit="cover"
            layout="fill"
            className="rounded-t-lg"
            alt="cover"
          />
          <div className="absolute -bottom-[65%] left-1/3">
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              <Image
                src={creator.picture}
                alt="side-img"
                layout="fill"
                objectFit="cover"
                className="relative rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="col-container pb-5  space-y-2">
          <div className="relative hover-trigger">
            <Link href={`/${creator.user_unique_id}`} passHref>
              <p className="text-center font-medium text-lg truncate text-[rgba(0,0,0,.9);] cursor-pointer">
                {creator.name}
              </p>
            </Link>

            <div className="absolute bg-white border border-grey-100 p-2 shadow-2xl rounded-lg hover-target z-10 transition-all duration-300 ease-in">
              <UserCardPopup creator={creator} name={creator.name} />
            </div>
          </div>

          {followed !== null ? (
            followed == "followed" ? (
              <>
                <div
                  className="sub-button row-container space-x-1 !w-24 h-[35px]"
                  onClick={() => toggleUnfollowModal(true)}
                >
                  <span>
                    <FaUserTimes className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-white">Unfollow</p>
                </div>
              </>
            ) : creator.payment_info.is_free_account == 0 ? (
              <div
                onClick={(event) =>
                  subscriptionPayment(
                    event,
                    "months",
                    creator.payment_info.subscription_info.monthly_amount,
                    creator.payment_info.subscription_info
                      .monthly_amount_formatted
                  )
                }
                className="w-16 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer"
              >
                <span className="text-sm font-medium">Follow</span>
              </div>
            ) : (
              <div
                onClick={(event) => {
                  dispatch(
                    subscriptionPaymentPaystackStart({
                      user_unique_id: creator.user_unique_id,
                      plan_type: "months",
                      is_free: 1,
                      payment_id: "free",
                    })
                  );
                  follow("followed");
                }}
                className="w-16 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer"
              >
                <span className="text-sm font-medium">Follow</span>
              </div>
            )
          ) : (
            <>
              {creator.payment_info.is_user_needs_pay == 1 &&
              creator.payment_info.unsubscribe_btn_status == 0 ? (
                creator.payment_info.is_free_account == 0 ? (
                  <div
                    onClick={() =>
                      subscriptionPayment(
                        "months",
                        creator.payment_info.subscription_info.monthly_amount,
                        creator.payment_info.subscription_info
                          .monthly_amount_formatted
                      )
                    }
                    className="w-16 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer"
                  >
                    <span className="text-sm font-medium">Follow</span>
                  </div>
                ) : (
                  <div
                    onClick={(event) => {
                      dispatch(
                        subscriptionPaymentPaystackStart({
                          user_unique_id: creator.user_unique_id,
                          plan_type: "months",
                          is_free: 1,
                          payment_id: "free",
                        })
                      );
                      follow("followed");
                    }}
                    className="w-16 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer"
                  >
                    <span className="text-sm font-medium">Follow</span>
                  </div>
                )
              ) : null}
              {creator.payment_info.unsubscribe_btn_status == 1 ? (
                <>
                  <div
                    className="sub-button row-container space-x-1 !w-24 h-[35px]"
                    onClick={() => toggleUnfollowModal(true)}
                  >
                    <span>
                      <FaUserTimes className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium text-white">Unfollow</p>
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
      {getCookie("userId") !== "" &&
      getCookie("userId") !== null &&
      getCookie("userId") !== undefined ? (
        <>
          {creator && (
            <>
              <PaymentModal
                userPicture={creator.picture}
                name={creator.name}
                user_unique_id={creator.user_unique_id}
                subscriptionData={subscriptionData}
                username={creator.username}
                email={creator.email}
                show={paymentMod}
                toggleShow={toggleShow}
                setFollowed={follow}
              />
            </>
          )}
          {unfollowModal ? (
            <UnfollowModal
              show={unfollowModal}
              toggleShow={toggleUnfollowModal}
              follow={follow}
              user_id={creator.payment_info.subscription_info.user_id}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default UserCard;
