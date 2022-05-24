import { GiWhiteBook } from "react-icons/gi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

function TransactinHistoryTop() {
  return (
    <div className="  p-10  bg-red-200 flex flex-col justify-center items-center ">
      <div className="block lg:flex justify-center gap-4 items-center	text-[13px] space-y-4">
        <div className="flex bg-white p-4 w-full lg:w-1/2 rounded-lg shadow-lg space-x-2 h-fit">
          <GiWhiteBook className="text-red-500 text-[28px] mt-1" />
          <dev>
            <p className="font-bold text-[14px]">TOTAL BALANCE</p>
            <p className="text-gray-400 text-[12px ]">$148,067.87</p>
          </dev>
        </div>

        <div className="flex bg-white p-4 w-full lg:w-1/2 rounded-lg shadow-lg space-x-2 h-fit">
          <HiOutlineCurrencyDollar className="text-red-500 text-[28px] mt-1" />
          <dev>
            <p className="font-bold text-[14px]">TOTAL BALANCE</p>
            <p className="text-gray-400 text-[12px ]">$148,067.87</p>
          </dev>
        </div>

        <div className="flex bg-white p-4 w-full lg:w-1/2 rounded-lg shadow-lg space-x-2 h-fit">
          <HiOutlineCurrencyDollar className="text-red-500 text-[28px] mt-1" />
          <dev>
            <p className="font-bold text-[14px]">TOTAL BALANCE</p>
            <p className="text-gray-400 text-[12px ]">$148,067.87</p>
          </dev>
        </div>

        <div className="flex flex-col items-center justify-center space-y-3 p-4  h-16">
          <p className=" bg-white w-56 h-full rounded-full shadow-lg text-center ">
            Add Wallet Amount
          </p>
          <p className="bg-white w-56 h-full rounded-full shadow-lg text-center ">
            WithDraw
          </p>
        </div>
      </div>
    </div>
  );
}
7;

export default TransactinHistoryTop;
