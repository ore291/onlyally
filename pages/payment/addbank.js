import { AiOutlineArrowLeft } from "react-icons/ai";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import AddBankBody from "../../components/AddBankBody.jsx";

function MyPayment() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className="w-full lg:w-4/5 bg-white px-4 mx-auto mt-20 lg:mr-16 lg:ml-6 rounded-md shadow py-4 space-y-12">
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
