import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiOutlineDollarCircle } from "react-icons/ai";
import { fetchSingleUserProfileStart } from "../store/slices/OtherUsersSlice";
import Link from "next/link";
import { deleteFavStart, saveFavStart } from "../store/slices/favSlice";
import TipModal from "./tips/TipModal";
import { BsBoxArrowRight, BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "./helpers/PaymentModal";
import { unFollowUserStart } from "../store/slices/followerSlice";
import { saveBlockUserStart } from "../store/slices/userSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "reapop";
import { subscriptionPaymentPaystackStart } from "../store/slices/subscriptionSlice";
const FansCard = ({ user }) => {
  // const userDetails = useSelector((state) => state.otherUser.userDetails);
  const deleteFav = useSelector((state) => state.fav.deleteFav);

  const [openFansCardOption, setOpenFansCardOption] = useState(false);
  const [sendTip, setSendTip] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });
  const [subscribedStatus, setSubscribeStatus] = useState("");
  const [unblockStatus, setUnblockStatus] = useState("");
  const [favStatus, setFavStatus] = useState("");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     fetchSingleUserProfileStart({
  //       user_unique_id: user.username,
  //     })
  //   );
  // }, []);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const removeFav = (status) => {
    setFavStatus(status);
    if (status == "added") {
      dispatch(
        deleteFavStart({
          user_id: user.user_id,
        })
      );
    } else if (status == "removed") {
      dispatch(
        saveFavStart({
          user_id: user.user_id,
        })
      );
    }
  };
  const unFollowUser = (status) => {
    setSubscribeStatus(status);
    dispatch(
      unFollowUserStart({
        user_id: user.user_id,
      })
    );
  };
  const blockUser = (status) => {
    setUnblockStatus(status);
    dispatch(
      saveBlockUserStart({
        user_id: user.user_id,
      })
    );
  };

  const [copied, setCopied] = useState("");

  return (
    <div className="w-full   border-2 border-grey-500 ">
      {user && (
        <TipModal
          sendTip={sendTip}
          closeSendTipModal={closeSendTipModal}
          username={user.username}
          userPicture={user.picture}
          name={user.name}
          post_id={null}
          user_id={user.user_id}
        />
      )}
      <div
        className=" h-32  flex justify-end items-end"
        style={{
          backgroundImage: `url(${user?.cover})`,
          backgroundSize: "cover",
        }}
      >
        {/* <p className="text-white text-3xl">...</p> */}
        <BsThreeDots
          onClick={() => setOpenFansCardOption(!openFansCardOption)}
          size="23"
          className="text-white  mr-3 m-1 cursor-pointer  hover:border-2 p-1 hover:rounded-full"
        />
      </div>

      <section className="flex w-full justify-between relative ">
        {openFansCardOption && (
          <section className="w-4/5 absolute  bg-white ml-2 pl-1 rounded-b-lg">
            <ul className="list-none">
              <CopyToClipboard
                text={`${
                  typeof window !== "undefined" ? window.location.hostname : ""
                }/${user.username}`}
                onCopy={() => {
                  setCopied("copied");
                  setTimeout(() => {
                    setCopied("");
                  }, 2000);
                  dispatch(
                    notify({
                      message: "Link to profile copied",
                      status: "info",
                    })
                  );
                }}
              >
                <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">
                  {copied === "" ? "copy link to profile" : "copied"}
                </li>
              </CopyToClipboard>
              {unblockStatus != "" ? (
                unblockStatus == "unblocked" ? (
                  <li
                    onClick={() => blockUser("blocked")}
                    className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer"
                  >
                    Block the user{" "}
                  </li>
                ) : (
                  <li
                    onClick={() => blockUser("unBlocked")}
                    className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer"
                  >
                    Unblock the user{" "}
                  </li>
                )
              ) : user.is_block_user == 1 ? (
                <li
                  onClick={() => blockUser("unBlocked")}
                  className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer"
                >
                  Unblock the user{" "}
                </li>
              ) : (
                <li
                  onClick={() => blockUser("blocked")}
                  className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer"
                >
                  Block the user{" "}
                </li>
              )}

              {/* {subscribeStatus != "" ? (
                            subscribeStatus == "unsubscribed" ? (
                              <Media as="li">
                                <Link to={`/` + props.user.user_unique_id}>
                                  {t("subscribe")}
                                </Link>
                              </Media>
                            ) : (
                              <Media as="li">
                                <Link
                                  to="#"
                                  onClick={(event) =>
                                    handleUnfollowUser(event, "unsubscribed")
                                  }
                                >
                                  {t("unsubscribe")}
                                </Link>
                              </Media>
                            )
                          ) : props.user.show_follow ? (
                            <Media as="li">
                              <Link to={`/` + props.user.user_unique_id}>
                                {t("subscribe")}
                              </Link>
                            </Media>
                          ) : (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleUnfollowUser(event, "unsubscribed")
                                }
                              >
                                {t("unsubscribe")}
                              </Link>
                            </Media>
                          )} */}

              {subscribedStatus != "" ? (
                subscribedStatus == "unsubscribed" ? (
                  <Link href={`/` + user.user_unique_id} passHref>
                    <li className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer">
                      Subscribe
                    </li>
                  </Link>
                ) : (
                  <li
                    onClick={() => unFollowUser("unsubscribed")}
                    className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer"
                  >
                    Unsubscribe
                  </li>
                )
              ) : user.show_follow ? (
                <Link href={`/` + user.user_unique_id} passHref>
                  <li className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer">
                    Subscribe
                  </li>
                </Link>
              ) : (
                <li
                  onClick={() => unFollowUser("unsubscribed")}
                  className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer"
                >
                  Unsubscribe
                </li>
              )}
            </ul>
          </section>
        )}
        <img
          width="100px"
          height="100px"
          src={user.picture}
          className="rounded-full mx-2 mt-[-50px] object-cover"
          alt="Placeholder"
        />
        <div>
          <h2 className="text-2xl  font-semibold">{user.username}</h2>
          {user.user_unique_id && <p>@{user.user_unique_id}</p>}
          {user.u_unique_id && <p>@{user.u_unique_id}</p>}
        </div>
        <div className=" flex  justify-center items-center flex-1 ">
          <CopyToClipboard
            text={`${
              typeof window !== "undefined" ? window.location.hostname : ""
            }/${user.username}`}
            onCopy={() => {
              setCopied("copied");
              setTimeout(() => {
                setCopied("");
              }, 2000);
              dispatch(
                notify({ message: "Link to profile copied", status: "info" })
              );
              console.log("notification copied");
            }}
          >
            <div className="h-10 w-10 p-1 justify-center items-center flex  border-2 border-gray-400 hover:scale-105 cursor-pointer rounded-full">
              <BsBoxArrowRight className="text-blue-400  " size="20" />
            </div>
          </CopyToClipboard>
        </div>
      </section>

      <div className="pb-4  mx-2">
        {favStatus != "" ? (
          favStatus == "added" ? (
            <section
              onClick={() => removeFav("removed")}
              className="my-4 ml-2  cursor-pointer  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center"
            >
              <AiOutlineStar />
              Remove from Favorites
            </section>
          ) : (
            <section
              onClick={() => removeFav("added")}
              className="my-4 ml-2  cursor-pointer  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center"
            >
              <AiOutlineStar />
              Add to Favorites
            </section>
          )
        ) : user.is_fav_user == 1 ? (
          <section
            onClick={() => removeFav("removed")}
            className="my-4 ml-2  cursor-pointer  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center"
          >
            <AiOutlineStar />
            Remove from Favorites
          </section>
        ) : (
          <section
            onClick={() => removeFav("added")}
            className="my-4 ml-2  cursor-pointer  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center"
          >
            <AiOutlineStar />
            Add to Favorites
          </section>
        )}

        <div className="text-center">
          <button
            onClick={() => setSendTip(!sendTip)}
            className="flex justify-center items-center h-10 bg-red-600 uppercase text-base rounded-full w-full "
          >
            <AiOutlineDollarCircle className="ml-3" size="23" />
            <p className="flex-1 text-white"> TIP</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FansCard;
