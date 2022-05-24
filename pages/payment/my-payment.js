import { BsFillCreditCard2BackFill } from "react-icons/bs";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import MyPaymentBody from "../../components/MyPaymentBody.jsx";

function MyPayment() {
  return (
    <div>
      <div className="flex flex-col justify-center  lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" bg-white w-full mx-auto mt-10 mr-0 md:mr-16 ml-0 md:ml-6 shadow py-4 px-8 block text-center">
          <span className="flex space-x-2 justify-center">
            <BsFillCreditCard2BackFill className="mt-1.5" />
            <p className=" font-bold">My Payment</p>
          </span>
          <p className="text-[12px] text-gray-500">
            History of all payment you made
          </p>
          <MyPaymentBody />
        </div>
      </div>
    </div>
  );
}

export default MyPayment;
