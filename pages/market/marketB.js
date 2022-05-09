import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons.jsx";
import MarketForm from "../../components/MarketForm.jsx";

function MaeketB() {
  return (
    <div>
      <div className="flex">
        <ProfileNavBar />
        <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
          <MarketButtons />
          <p className="font-semibold ml-10 mt-4">Product</p>
          <MarketForm />
        </div>
      </div>
    </div>
  );
}

export default MaeketB;
