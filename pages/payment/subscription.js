import { BsPersonCheck } from "react-icons/bs";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
// import AddBankBody from "../../components/AddBankBody.jsx";

function Subscription() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-full px-1 text-[20px] mb-10 space-y-4 mx-auto pt-3 mr-24  mt-12 bg-white rounded justify-start">
          <div>
            <span className="flex space-x-2 justify-center items-center">
              <BsPersonCheck className="mt-1.5" />
              <p className=" font-bold text-[24px]">My Sbscribers</p>
            </span>
            <p className="text-[14px] text-gray-500 flex justify-center items-center">
              Users that have subscribed to your content
            </p>
          </div>
          {/* <hr /> */}
          {/* <AddBankBody /> */}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
