import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import TransactionHistoryBody from "../../components/TransactionHistoryBody.jsx";
import TransactinHistoryTop from "../../components/TransactinHistoryTop.jsx";
import DeleteAccountBody from "../../components/Profile/DeleteAccountBody.jsx";

function TrasctionHistory() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-[90%] px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded">
          <p className="font-bold text-center">Delete Account</p>
          <DeleteAccountBody className="w-[90%]"/>
        </div>
      </div>
    </div>
  )
}

export default TrasctionHistory;
