import React, { useState, useEffect } from "react";
import SideNavLayout from "../../components/SideNavLayout";
import { fetchSingleLiveVideosStart } from "../../store/slices/liveVideoSlice";
import dynamic from "next/dynamic";
// import AgoraLive from "../../components/live/AgoraLive";
import { useDispatch, useSelector } from "react-redux";
import { getCookies, setCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";

const LiveVideoFree = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const ClientSideControls = dynamic(
    () => {
      return import("../../components/live/AgoraLive");
    },
    { ssr: false }
  );

  const cookies = getCookies();
  const liveVideo = useSelector((state) => state.liveVideo.singleLiveVideo);

  const [username, setUsername] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);

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
    <div>
      <div className="max-w-5xl mx-auto py-5">
        <h4 className="text-3xl text-center">Live Video</h4>
        <div className="grid grid-cols-1">
          {liveVideo.loading ? (
            "Loading..."
          ) : liveVideo.data ? (
            <ClientSideControls
              liveVideoDetails={liveVideo.data}
              isOwner={liveVideo.data.is_owner}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveVideoFree;
