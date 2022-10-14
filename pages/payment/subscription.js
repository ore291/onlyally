import { BsPersonCheck } from "react-icons/bs";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import SubscribeBody from "../../components/SubscribeBody.jsx";

function Subscription() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" bg-white dark:!bg-gray-900 dark:!text-gray-400 w-full  mx-auto mt-10 mr-0 md:mr-16 ml-0 md:ml-6 shadow py-4 px-8 block ">
          <div>
            <span className="flex space-x-2 justify-center items-center">
              <BsPersonCheck className="mt-1.5" />
              <p className=" font-bold text-[24px]">My Subscribers</p>
            </span>
            <p className="text-[14px] text-gray-500 flex justify-center items-center">
              Users that have subscribed to your content
            </p>
          </div>
          {/* <hr /> */}
          <SubscribeBody />
        </div>
      </div>
    </div>
  );
}

export default Subscription;
