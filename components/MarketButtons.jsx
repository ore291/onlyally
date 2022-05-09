import {
  MdProductionQuantityLimits,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";
import { FaScroll } from "react-icons/fa";

function MarketButtons() {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-2.5 mt-1 ml-2 text-[11px]">
        <div className=" py-1 px-1.5 rounded flex items-center justify-end hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <span className="font-semibold text-white flex">
            <MdOutlineProductionQuantityLimits className="mt-1" /> Products
          </span>
        </div>
        <div className=" py-1 px-1.5 rounded flex items-center justify-end hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <span className="font-semibold text-white flex">
            <FaScroll className="mt-1" /> Orders
          </span>
        </div>
        <div className=" py-1 px-1.5 rounded flex items-center justify-end hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <span className="font-semibold text-white flex">
            <AiOutlineDollarCircle className="mt-1" /> Transactions
          </span>
        </div>
      </div>
      <div className="flex space-x-2.5 mt-3 ml-2 text-[11px]">
        <div className=" py-1 px-1.5 rounded flex items-center justify-end hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <span className="font-semibold text-white flex">
            <IoBagAdd className="mt-1" /> Add Products
          </span>
        </div>
        <div className=" py-1 px-2 rounded flex items-center justify-end hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <span className="font-semibold text-white flex">
            <MdProductionQuantityLimits className="mt-1" /> Carts
          </span>
        </div>
      </div>
    </div>
  );
}

export default MarketButtons;
