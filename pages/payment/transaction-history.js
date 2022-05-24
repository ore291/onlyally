import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import TransactionHistoryBody from "../../components/TransactionHistoryBody.jsx";
import TransactinHistoryTop from "../../components/TransactinHistoryTop.jsx";

function TrasctionHistory() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" bg-white  w-full mx-auto mt-10 mr-0 md:mr-16 ml-0 md:ml-6 shadow py-4 px-8 block ">
          <TransactinHistoryTop />
          <p className="text-gray-400">TRANSACTION</p>
          <TransactionHistoryBody />
        </div>
      </div>
    </div>
  );
}

export default TrasctionHistory;
