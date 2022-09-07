import React from "react";
import ProfileNavBar from "../../components/ProfileNavBar.jsx";
import MarketButtons from "../../components/MarketButtons.jsx";
import ProductList from "../../components/market/ProductList.jsx";

function UserProduct() {
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavBar className="w-24 mb-8" />
        <div className=" w-full px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded space-y-3">
          <MarketButtons className=" mr-4" />
          <ProductList/>
        </div>
      </div>
    </div>
  );
}

export default UserProduct;
