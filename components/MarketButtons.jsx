import {
  MdProductionQuantityLimits,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";
import { FaScroll } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import Link from "next/link";

function MarketButtons() {
  return (
    <div className="block justify-center lg:flex lg:justify-between items-center">
      <div className="flex space-x-2.5 mt-1 ml-2 text-[11px]">
          <Link href="/market/product-list" >
        <div className=" py-1 px-2 rounded flex items-center text-white justify-between gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <div className="font-semibold">
            <BsFillCartCheckFill className="mt-1" size="16px" />
          </div>

          <p className="text-xs">Products</p>
        </div>
          </Link>

          <Link href="/market/orderList" >
        <div className=" py-1 px-2 rounded flex items-center text-white justify-between gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <div className="font-semibold">
            <FaScroll className="mt-1" size="16px" />
          </div>
            
          <p className="text-xs">Orders</p>
        </div>
            </Link>

          <Link href="/market/transaction" >
        <div className=" py-1 px-2 rounded flex items-center text-white justify-between gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <div className="font-semibold">
            <AiOutlineDollarCircle className="mt-1" size="16px" />
          </div>
            
          <p className="text-xs">Transactions</p>
        </div>
            </Link>
      </div>
      <div className="flex space-x-2.5 mt-3 ml-2 text-[11px]">
       <Link href="/market/marketB">
        <div className=" py-1 px-2 rounded flex items-center text-white justify-between gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <div className="font-semibold">
            <IoBagAdd className="mt-1" size="16px" />
          </div>
          <p className="text-xs">Add Products</p>
        </div>
       </Link>
       <Link href="/market/cart" >
        <div className=" py-1 px-2 rounded flex items-center text-white justify-between gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          <div className="font-semibold">
            <BsFillCartCheckFill className="mt-1" size="16px" />
          </div>
          <p className="text-xs">Carts</p>
        </div>
       </Link>
      </div>
    </div>
  );
}

export default MarketButtons;
