/* eslint-disable @next/next/no-img-element */
import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons";
import MarketBody from "../../components/MarketBody";

function Market() {
  return (
    <div className="flex">
      <ProfileNavBar className="w-24 mb-8" />
      <div className="w-4/5 bg-white px-4 mx-auto mt-20 mr-16 ml-6 shadow py-4">
        <p className="font-semibold mt1.5 mb-3.5 pl-2">Order View</p>
        <MarketButtons />
        <MarketBody />
      </div>
    </div>
  );
}

export default Market;
