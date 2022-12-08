import React from "react";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import MarketButtons from "../../components/MarketButtons.jsx";
import OrderList from "../../components/OrderList.jsx";

function Order() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-full px-1 md:px-5  mx-auto pt-3 ml-2 mt-2 bg-white dark:!bg-gray-900 dark:!text-gray-400 
        rounded space-y-3">
          <MarketButtons className=" mr-4" />
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default Order;
