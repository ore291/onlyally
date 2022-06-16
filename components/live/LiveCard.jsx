import {useState} from "react";
import Image from "next/image";
import Button from "../Button";
import { FaRegEye } from "react-icons/fa";
import {saveBookmarkStart} from "../../store/slices/bookmarkSlice";
import {fetchCommentsStart, saveCommentStart} from "../../store/slices/commentsSlice";
import PaymentModal from "../helpers/PaymentModal"

const LiveCard = ({video}) => {
  const [paymentModal, setPaymentModal] = useState(false);

  const openPaymentModal = (event) => {
    event.preventDefault();
    setPaymentModal(true);
};

const closePaymentModal = () => {
    setPaymentModal(false);
};

  return (
    <div className="first:ml-auto last:mr-auto w-[150px] h-[320px] border rounded-xl shadow-md overflow-hidden flex flex-col relative group cursor-pointer flex-shrink-0">
      <div className="relative">
        <img
          className="w-full h-52 object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
          src="https://picsum.photos/200/300?random=3"
          alt="MD. Shibbir Ahmed"
        />

        <div className="absolute overflow-hidden top-2 left-2.5 w-12 h-12">
          <Image src={"/live.png"} layout="fill" objectFit="contain" />
        </div>

        <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-0.5 rounded-full absolute left-2.5 bottom-1">
          <div className="bg-white p-0.5 rounded-full ">
            <div className="h-14 w-14 relative rounded-full">
              <Image
                className="rounded-full"
                layout="fill"
                objectFit="fill"
                src={"/profile_avatar_full.jpg"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="absolute left-1/2  bottom-6 bg-black/60 rounded-md text-white text-xs row-container w-5 h-5">
          <span>0</span>
        </div>
        <div className="absolute right-1  bottom-5 bg-black/80 rounded-md text-white text-xs row-container w-10 h-5">
          <span>1,000</span>
        </div>
        <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
      </div>

      <div className="w-full bg-white  p-2 h-1/3 rounded-b-xl">
        <div className="col-container space-y-1">
          <div className="flex items-center justify-between px-1 w-full bg-gray-50">
            <p className="font-bold text-sm">Akhano</p>
            <div className="row-container space-x-1 text-xs">
              <FaRegEye className="h-4 w-4" />
              <span>204</span>
            </div>
          </div>
          <div className="row-container w-20 h-8 bg-gray-50">
            <p className="text-sm font-semibold truncate">Stream Title</p>
          </div>
          <Button
            text="Pay &amp; Join now"
            active={true}
            extraClasses="w-auto px-3 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default LiveCard;
