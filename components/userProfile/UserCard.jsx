import Image from "next/image";
import Button from "../Button";
import UserCardPopup from "./UserCardPopup";
import { IoMdPersonAdd } from "react-icons/io";
import {FaUnlock} from "react-icons/fa";
import Link from "next/link";
import {useSelector, useDispatch} from "react-redux";
import {
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../store/slices/OtherUsersSlice";
import {
  setPaymentModal,
  setUnfollowerModal,
} from "../../store/slices/NavSlice";
import { subscriptionPaymentPaystackStart } from "../../store/slices/subscriptionSlice";
import { Popover, Transition, Dialog } from "@headlessui/react";
import PaymentModal from "../../components/helpers/PaymentModal";
import UnfollowModal from "../../components/helpers/UnfollowModal";
import { useEffect, useState, Fragment } from "react";


const UserCard = ({ creator }) => {
  const dispatch = useDispatch();
  const unfollowModal = useSelector((state) => state.navbar.unfollowUserModal);

  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });

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
    dispatch(setPaymentModal(true));
  };

  return (
    <>
      <div className="bg-white border shadow-lg rounded-lg max-w-3xl p-3 px-5 flex items-center justify-between md:!hidden">
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
        <div className="bg-lightPlayRed w-10 h-10 rounded-md row-container cursor-pointer">
          <Link href={`/profile/${creator.user_unique_id}`} passHref>
            <a href="#">
              <IoMdPersonAdd className="text-white h-6 w-6" />
            </a>
          </Link>
        </div>
      </div>
      <div className="hidden md:inline-block !p-0 !items-center side-container relative rounded-lg">
        <div className="relative w-full h-[90px] rounded-t-lg mb-16">
          <Image
            src={creator.cover}
            objectFit="cover"
            layout="fill"
            className="rounded-t-lg"
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
        <div className="col-container pb-5 space-y-2">
          <div className="relative hover-trigger">
            <Link href={`/profile/${creator.user_unique_id}`} passHref>
            <p className="text-center font-medium text-lg truncate text-[rgba(0,0,0,.9);] cursor-pointer">
              {creator.name}
            </p>
            </Link>
            
            <div className="absolute bg-white border border-grey-100 p-2 shadow-2xl rounded-lg hover-target z-10 transition-all duration-300 ease-in">
              <UserCardPopup creator={creator} name={creator.name} />
            </div>
          </div>
          {/* {
            userDetails.data.is_block_user == 0 ? (
              userDetails.data.payment_info.is_user_needs_pay == 1 &&
                    userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? ( 
                        userDetails.data.payment_info.is_free_account == 0 ? (
                          <div
                              className="sub-button"
                              onClick={(event) =>
                                subscriptionPayment(
                                  "months",
                                  userDetails.data.payment_info
                                    .subscription_info.monthly_amount,
                                  userDetails.data.payment_info
                                    .subscription_info.monthly_amount_formatted
                                )
                              }
                            >
                              <span>
                                <FaUnlock />
                              </span>
                              {`Get access ${userDetails.data.payment_info.subscription_info.monthly_amount_formatted}/mo`}
                            </div>

                        ) : (
                          <div
                          className="sub-button"
                          onClick={(event) =>
                            dispatch(
                              subscriptionPaymentPaystackStart({
                                user_unique_id:
                                  userDetails.data.user.user_unique_id,
                                plan_type: "months",
                                is_free: 0,
                              })
                            )
                          }
                        >
                          <span>
                            <FaUnlock />
                          </span>
                          {userDetails.data.payment_info.payment_text}
                        </div>
                        )
                        // space for paid follow
                          
                      ) : ( 
                        null
                        // space for free follow
                      )

           ) : 
            // space for unblock button
            null
          
          } */}


           <div className="w-16 h-[35px] text-white bg-lightPlayRed row-container rounded-md cursor-pointer">
              <span className="text-sm font-medium">Follow</span>
            </div>
      
        </div>
      </div>
      {/* {userDetails.loading ? (
          "loading"
        ) : localStorage.getItem("userId") !== "" &&
          localStorage.getItem("userId") !== null &&
          localStorage.getItem("userId") !== undefined ? (
          <PaymentModal
            userPicture={userDetails.data.user.picture}
            name={userDetails.data.user.name}
            user_unique_id={userDetails.data.user.user_unique_id}
            subscriptionData={subscriptionData}
            username={userDetails.data.user.username}
          />
        ) : // tips payment will go here
        null} */}
    </>
  );
};

export default UserCard;
