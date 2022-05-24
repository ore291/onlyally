import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons.jsx";
import MarketForm from "../../components/MarketForm.jsx";

function MaeketB() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <MarketButtons />
          <p className="font-semibold ml-10 mt-4">Product</p>
          <MarketForm />
        </div>
      </div>
    </div>
  );
}

export default MaeketB;
