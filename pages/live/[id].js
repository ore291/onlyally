import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleLiveVideosStart } from "../../store/slices/liveVideoSlice";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import LivePaymentModal from "../../components/live/LivePaymentModal";
import Link from "next/link";
import { useRouter } from "next/router";

const LiveStream = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = getCookies();
  const [paymentModal, setPaymentModal] = useState(false);
  const [username, setUsername] = useState("");
  const liveVideo = useSelector((state) => state.liveVideo.singleLiveVideo);

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  useEffect(() => {
    if (!router.query.id) return;
    if (cookies.username != null) {
      setUsername(cookies.username);
    }
    dispatch(
      fetchSingleLiveVideosStart({
        live_video_unique_id: router.query.id,
      })
    );
  }, [router.query]);

  const openPaymentModal = (event) => {
    event.preventDefault();
    setPaymentModal(true);
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <div className="pt-20 font-semibold w-full row-container border-b ">
        <h4 className="text-2xl">Live Video Info</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-3 mb-20 px-1 md:px-0">
        {liveVideo.loading ? (
          "Loading..."
        ) : liveVideo.data ? (
          <div className="w-full p-6 rounded-lg shadow-lg border bg-white">
            <img
              className="block w-full rounded-lg object-cover"
              src={liveVideo.data.user_picture}
              alt={liveVideo.data.title}
            />
            <div className="flex flex-col items-start my-2  space-y-1 justify-center">
              <h5 className="text-lg font-semibold">{liveVideo.data.title}</h5>
              <p className=" text-xs text-gray-400 font-medium">
                {liveVideo.data.start_date}
              </p>
              <p className="text-sm text-gray-400 font-medium">
                {liveVideo.data.viewer_cnt} views
              </p>
            </div>

            {liveVideo.data.is_user_needs_to_pay == 1 ? (
              <>
                <hr />
                <button
                  type="submit"
                  onClick={(event) => openPaymentModal(event)}
                  disabled={liveVideo.buttonDisable}
                  className="w-24 h-8 rounded-full font-medium mt-1 row-container bg-lightPlayRed text-white cursor-pointer "
                >
                  {liveVideo.loadingButtonContent !== null
                    ? liveVideo.loadingButtonContent
                    : "Pay and join"}
                </button>
              </>
            ) : (
              ""
            )}

            {liveVideo.data.is_user_needs_to_pay == 0 ? (
              <>
                <hr />
                <Link
                  href={`/join/${liveVideo.data.live_video_unique_id}`}
                  target="_blank"
                >
                  <button
                    className="w-24 h-8 rounded-full font-medium mt-1 row-container bg-lightPlayRed text-white cursor-pointer "
                    type="button"
                  >
                    Join now
                  </button>
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {liveVideo.loading ? (
          "Loading..."
        ) : liveVideo.data ? (
          <div className="px-4 py-8 rounded-lg text-left bg-white border shadow-lg">
            <table className="table-fixed w-full">
              <tbody>
                <tr className="w-full">
                  <td className="!p-0">
                    <h5 className="font-medium ">Live Video ID</h5>
                  </td>

                  <td className="text-right">
                    <h5>{liveVideo.data.live_video_unique_id}</h5>
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="!p-0">
                    <h5 className="font-medium ">Amount</h5>
                  </td>

                  <td className="text-right">
                    <h5>{liveVideo.data.amount_formatted}</h5>
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="!p-0">
                    <h5 className="font-medium ">Start date</h5>
                  </td>

                  <td className="text-right">
                    <h5>{liveVideo.data.start_date}</h5>
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="!p-0">
                    <h5 className="font-medium ">Payment Status</h5>
                  </td>

                  <td className="text-right">
                    <h5>{liveVideo.data.payment_type_text}</h5>
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="!p-0">
                    <h5 className="font-medium ">Status</h5>
                  </td>

                  <td className="text-right">
                    <h5>{liveVideo.data.status_formatted}</h5>
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="!p-0">
                    <h5 className="font-medium ">Description</h5>
                  </td>

                  <td className="text-right">
                    <h5>
                      {liveVideo.data.description
                        ? liveVideo.data.description
                        : "N/A"}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
      {liveVideo.loading ? (
        "Loading..."
      ) : liveVideo.data ? (
        <LivePaymentModal
          paymentModal={paymentModal}
          closePaymentModal={closePaymentModal}
          liveVideo={liveVideo.data}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default LiveStream;
