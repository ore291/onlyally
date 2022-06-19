import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  liveVideosViewerUpdateStart,
  liveVideosEndStart,
} from "../../store/slices/liveVideoSlice";
import "../../Loader";

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });


const AgoraLive = (props) => {
  const dispatch = useDispatch();

  const [muteAudioState, setMuteAudioState] = useState(false);
  const [muteVideoState, setMuteVideoState] = useState(false);
  const liveVideo = useSelector((state) => state.liveVideo.singleLiveVideo);

  const toggleAudio = (bool) => {
    setMuteAudioState(bool);
  };
  const toggleVideo = (bool) => {
    setMuteVideoState(bool);
  };

  var rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };

  var localTrackState = {
    videoTrackEnabled: true,
    audioTrackEnabled: true,
  };

  var options = {
    // Pass your app ID here.
    appId: "a18a6a4908fc4aacbbb16f91c4ec9fec",
    // set UID
    uid: 0,

    // Set the channel name.
    channel: liveVideo.data.virtual_id,
    // Pass a token if your project enables the App Certificate.
    token: liveVideo.data.agora_token ? liveVideo.data.agora_token : null,
    // token: liveVideo.data.agora_token ? liveVideo.data.agora_token : null,
    // Set the user role in the channel. // "audience"
    role: props.isOwner ? "host" : "audience",
  };

  var remoteUsers = {};

  async function startBasicCall() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    client.setClientRole(options.role);

    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");

      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;

        remoteVideoTrack.play("agora_local");
        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }

      dispatch(
        liveVideosViewerUpdateStart({
          live_video_id: liveVideo.data.live_video_id,
        })
      );

      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });
    try {
      const uid = await rtc.client.join(
        options.appId,
        options.channel,
        options.token || null,
        options.uid || null
      );
    } catch (error) {
      console.log(error);
    }

    if (options.role === "host") {
      // Create an audio track from the audio sampled by a microphone.
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Create a video track from the video captured by a camera.
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      // Publish the local audio and video tracks to the channel.
      rtc.localVideoTrack.play("agora_local");

      if (rtc.client) {
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
      }
    }
  }

  async function leaveCall() {
    if (options.role === "host") {
      // Destroy the local audio and video tracks.
        
      rtc.localAudioTrack && await rtc.localAudioTrack.close();
      rtc.localVideoTrack &&  await rtc.localVideoTrack.close();
      

      // Traverse all remote users.
      rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV container.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
      });
      dispatch(
        liveVideosEndStart({
          live_video_id: liveVideo.data.live_video_id,
        })
      );
    } else {
      // Leave the channel.
      await rtc.client.leave();
      window.location.assign("/live");
    }
  }

  async function muteAudio() {
    if (!rtc.localAudioTrack) return;
    if(localTrackState.audioTrackEnabled == true) {
      await rtc.localAudioTrack.setEnabled(false);
      localTrackState.audioTrackEnabled = false;
      $("#mute-audio").hide();
      $("#unmute-audio").show();
    } else {
      await rtc.localAudioTrack.setEnabled(true);
      localTrackState.audioTrackEnabled = true;
      $("#mute-audio").show();
      $("#unmute-audio").hide();
    }
  }

  async function muteVideo() {
    if (!rtc.localVideoTrack) return;
    if(localTrackState.videoTrackEnabled == true) {
      await rtc.localVideoTrack.setEnabled(false);
      localTrackState.videoTrackEnabled = false;
      $("#mute-video").hide();
      $("#unmute-video").show();
    } else {
      await rtc.localVideoTrack.setEnabled(true);
      localTrackState.videoTrackEnabled = true;
      $("#mute-video").show();
      $("#unmute-video").hide();
    }
  }

  useEffect(() => {
    startBasicCall();
  }, []);

  return (
    <div className="relative">
      <div id="agora_local" style={{ width: "100%", height: "500px" }} />
      <div className="my-4">
        {props.isOwner ? (
          <>
            <div className="absolute bottom-10 flex justify-center w-full z-[999]">
              <ul className="flex list-none pl-0 items-center mt-0 space-x-2">
                <li className="live-stream-button" onClick={() => leaveCall()}>
                  <img src="/materials/end-stream.png" alt="" />
                </li>

                <li
                  id="unmute-audio"
                  style={{ display: "none" }}
                  className="live-stream-button"
                  onClick={() => muteAudio()}
                >
                  <img src="/materials/no-audio-stream.png" alt="" />
                </li>

                <li
                  id="mute-audio"
                  className="live-stream-button"
                  onClick={() => muteAudio()}
                >
                  <img src="/materials/audio-stream.png" alt="" />
                </li>

                <li
                  id="unmute-video"
                  style={{ display: "none" }}
                  className={`live-stream-button`}
                  onClick={() => muteVideo()}
                >
                  <img src="/materials/mute-video.png" alt="" />
                </li>

                <li
                  id="mute-video"
                  className={`live-stream-button`}
                  onClick={() => muteVideo()}
                >
                  <img src="/materials/video-stream.png" alt="" />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="absolute bottom-10 flex justify-center w-full z-[999]">
            <ul className="flex list-none pl-0 items-center mt-0">
              <li className="live-stream-button" onClick={() => leaveCall()}>
                <img src="/materials/end-stream.png" alt="" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgoraLive;
