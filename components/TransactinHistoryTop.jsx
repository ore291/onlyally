import { GiWhiteBook } from "react-icons/gi";
import { HiOutlineCurrencyDollar } from 'react-icons/hi'

function TransactinHistoryTop() {
  return (
    <div className=" mt-4 p-10  bg-red-200 h-32 flex flex-col justify-center items-center ">
      <div className="grid grid-cols-4 justify-items-center	text-[13px] ">
        <div className="flex bg-white p-4 w-56 rounded-lg shadow-lg space-x-2 h-16">
          <GiWhiteBook className="text-red-500 text-[28px] mt-1" />
          <dev>
            <p className="font-bold text-[14px]">TOTAL BALANCE</p>
            <p className="text-gray-400 text-[12px ]">$148,067.87</p>
          </dev>
        </div>

        <div className="flex bg-white p-4 w-56 rounded-lg shadow-lg space-x-2 h-16">
          <HiOutlineCurrencyDollar className="text-red-500 text-[28px] mt-1" />
          <dev>
            <p className="font-bold text-[14px]">TOTAL BALANCE</p>
            <p className="text-gray-400 text-[12px ]">$148,067.87</p>
          </dev>
        </div>

        <div className="flex bg-white p-4 w-56 rounded-lg shadow-lg space-x-2 h-16">
          <HiOutlineCurrencyDollar className="text-red-500 text-[28px] mt-1" />
          <dev>
            <p className="font-bold text-[14px]">TOTAL BALANCE</p>
            <p className="text-gray-400 text-[12px ]">$148,067.87</p>
          </dev>
        </div>

        <div className="flex flex-col items-center justify-center space-y-3 p-4  h-16">
            <p className=" bg-white w-56 h-full rounded-full shadow-lg text-center ">Add Wallet Amount</p>
            <p className="bg-white w-56 h-full rounded-full shadow-lg text-center ">WithDraw</p>
        </div>
      </div>
    </div>
  );
}7

export default TransactinHistoryTop;
