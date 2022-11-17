import React from "react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

const ReactPlayerCard = ({ p_file, list }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  return (
    <div className="border w-full shadow-lg rounded-md relative my-2 ">
      <div className={`relative  w-full  object-cover `}>
        <ReactPlayer
          //   light={p_file.preview_file}
          // url={p_file.post_file}
          // controls={true}
          // width="100%"
          // height="100%"
          className={` absolute inset-0 m-auto object-fill rounded-md`}
          onClick={() => setVideoPlaying(false)}
          volume={0.5}
          // light={postFile.preview_file}
          url={p_file.post_file}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          onContextMenu={(e) => e.preventDefault()}
          loop={false}
          onEnded={() => setVideoPlaying(false)}
          controls={false}
          muted={audioMuted}
          width="100%"
          playsinline
          height="100%"
          playing={videoPlaying}
          // className="post-video-size react-player"
        />
      </div>
      {!videoPlaying ? (
        <button
          className="absolute h-10 w-10 md:h-16 md:w-16 inset-0 m-auto z-20"
          onClick={() => setVideoPlaying(true)}
        >
          <FaPlay className="text-white h-10 w-10 md:h-16 md:w-16" />
        </button>
      ) : null}
    </div>
  );
};

export default ReactPlayerCard;
