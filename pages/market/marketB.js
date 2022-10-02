import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons.jsx";
import MarketForm from "../../components/MarketForm.jsx";
import {getCookie, hasCookie} from "cookies-next";

function MaeketB() {
  const pro = hasCookie("pro")  ? JSON.parse(getCookie("pro")) :  {};
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar />
        {
          pro &&
          Object.keys(pro).length == 0 ? (null) : (

            <>
            {

            }
            </>
          )
        }
        <div className="w-full lg:w-4/5  lg:ml-6 bg-white px-4 mx-auto m-2 shadow py-4">
          <MarketButtons />
          <p className="font-semibold ml-10 mt-4">Product</p>
          <MarketForm />
        </div>
      </div>
    </div>
  );
}

export default MaeketB;
