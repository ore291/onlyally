/* eslint-disable @next/next/no-img-element */
import ProfileNavBar from "../../components/ProfileNavBar";
import MarketButtons from "../../components/MarketButtons";
import OrderBody from "../../components/market/OrderBody";
import { useRouter } from "next/router";

function OrderView() {
    const router = useRouter();
 
  const { order_id } = router.query;
  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <ProfileNavBar className="w-24 mb-8" />
      <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
        <p className="font-semibold mt1.5 mb-3.5 pl-2">Order View</p>
        <MarketButtons />
    <OrderBody order_id={order_id}/>
      </div>
    </div>
  );
}

export default OrderView;
