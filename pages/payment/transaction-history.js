import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import TransactionHistoryBody from "../../components/TransactionHistoryBidy.jsx";
import TransactinHistoryTop from "../../components/TransactinHistoryTop.jsx";

function TrasctionHistory() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-[90%] px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded">
          <TransactinHistoryTop />
          <p className="text-gray-400">TRANSACTION</p>
          <TransactionHistoryBody className="w-[90%]"/>
        </div>
      </div>
    </div>
  )
}

export default TrasctionHistory;
