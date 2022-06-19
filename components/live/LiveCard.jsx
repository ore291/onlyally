import { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { FaRegEye } from "react-icons/fa";
import { saveBookmarkStart } from "../../store/slices/bookmarkSlice";
import {
  fetchCommentsStart,
  saveCommentStart,
} from "../../store/slices/commentsSlice";
import LivePaymentModal from "./LivePaymentModal";
import Link from "next/link";

const LiveCard = ({ video }) => {
  const [paymentModal, setPaymentModal] = useState(false);

  const openPaymentModal = (event) => {
    event.preventDefault();
    setPaymentModal(true);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  return (
    <div className=" w-[160px] h-[320px] mb-2 border rounded-xl shadow-md overflow-hidden flex flex-col relative group cursor-pointer flex-shrink-0">
      <Link href={`/live/${video.live_video_unique_id}`} passHref>
        <div className="relative">
          <img
            className="w-full h-52 object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
            src={video.user_picture}
            alt="Video-owner"
          />

          <div className="absolute overflow-hidden top-2 left-2.5 w-12 h-12">
            <Image src={"/live.png"} layout="fill" objectFit="contain" />
          </div>

          <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-0.5 rounded-full absolute left-2.5 bottom-1">
            <div className="bg-white p-0.5 rounded-full ">
              <div className="h-10 w-10 relative rounded-full">
                <Image
                  className="rounded-full"
                  layout="fill"
                  objectFit="cover"
                  src={video.user_picture}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="absolute left-[40%]  bottom-7 bg-black/60 rounded-md text-white text-xs row-container w-5 h-5">
            <span>{video.viewer_cnt}</span>
          </div>
          {video.amount > 0 ? (
            <div className="absolute right-2  bottom-5 bg-black/80 rounded-md text-white text-xs row-container w-10 h-5">
              <span>{video.amount_formatted}</span>
            </div>
          ) : (
            ""
          )}
          <div className="group-hover:scale-105 absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
        </div>
      </Link>

      <div className="w-full bg-white  p-2 h-1/3 rounded-b-xl">
        <div className="col-container space-y-1">
          <div className="flex items-center justify-between px-1 w-full bg-gray-50">
            <p className="font-semibold text-xs whitespace-nowrap">
              @{video.user_displayname}
            </p>
            <div className="row-container space-x-1 text-xs">
              <FaRegEye className="h-4 w-4" />
              <span>{video.viewer_cnt}</span>
            </div>
          </div>
          <div className="row-container w-20 h-4 bg-gray-50">
            <p className="text-sm font-semibold truncate">{video.title}</p>
          </div>

          {/* <h4 className="text-xs font-light text-gray-400 truncate">
            {video.description}
          </h4> */}
          <h4 className="text-xs font-light text-gray-400 truncate my-1">
            {video.created_at_formatted}
          </h4>
          {video.is_user_needs_to_pay == 1 ? (
            <Button
              type="submit"
              text="Pay &amp; Join now"
              active={true}
              extraClasses="w-auto px-3 h-8"
              disabled={video.buttonDisable}
              onClick={(event) => openPaymentModal(event)}
            />
          ) : (
            ""
          )}
          {video.is_user_needs_to_pay == 0 ? (
            <Link
              href={`/join/${video.live_video_unique_id}`}
              target="_blank"
              passHref
            >
              <span className="w-auto px-3 h-8 rounded-md bg-lightPlayRed text-white row-container text-sm font-medium">
                Join now
              </span>
            </Link>
          ) : (
            ""
          )}

          <LivePaymentModal
            paymentModal={paymentModal}
            closePaymentModal={closePaymentModal}
            liveVideo={video}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveCard;
