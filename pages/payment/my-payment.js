import { BsFillCreditCard2BackFill } from "react-icons/bs";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import MyPaymentBody from "../../components/MyPaymentBody.jsx";

function MyPayment() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-full px-1 text-[20px] mb-10 space-y-2 mx-auto pt-3 mr-24  mt-12 bg-white rounded justify-start">
          <span className="flex space-x-2">
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
