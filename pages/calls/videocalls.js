import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AudioCallBody from "../../components/AudioCallBody.jsx";

function Payment() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-[90%] px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded">
          <div className=" mt-4 p-10  bg-red-200 h-28 flex flex-col justify-center ">
            <div className="flex space-x-2">
              <AiOutlineArrowLeft className="mt-1" />
              <h2 className="font-bold">VIDEO CALLS HISTORY</h2>
            </div>
            <p>
              The list contais hte request which was made by you, it also
              contains requests which you receved from other.
            </p>
          </div>
          <AudioCallBody className="w-[90%]" />
        </div>
      </div>
    </div>
  );
}

export default Payment;
