import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import MarketButtons from "../../components/MarketButtons.jsx";
import TransactionComponent from "../../components/TransactionComponent.jsx";

function Transaction() {
  return (
    <div>
      <div className="flex p-2 rounded shadow">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-9/12 px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded space-y-3">
          <MarketButtons className=" mr-4"/>
          <TransactionComponent />
        </div>
      </div>
    </div>
  );
}

export default Transaction;
