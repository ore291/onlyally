import { AiOutlineArrowLeft } from "react-icons/ai";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import AddBankBody from "../../components/AddBankBody.jsx";

function MyPayment() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-full px-1 text-[20px] mb-10 space-y-4 mx-auto pt-3 mr-24  mt-12 bg-white rounded justify-start">
          <span className="flex space-x-2">
            <AiOutlineArrowLeft className="mt-1.5" />
            <p className=" font-bold">Add Bank</p>
          </span>
          <hr />
          <AddBankBody />
        </div>
      </div>
    </div>
  );
}

export default MyPayment;
