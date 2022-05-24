function MarketBody() {
  return (
    <div className="block lg:flex w-full space-x-5">
      <div className="mt-6 p-2 shadow-md shadow-gray-300 rounded-md w-full lg:w-[48%] lg:ml-3">
        <img
          src="/images/settings/1.jpg"
          alt="Order image"
          className="w-1/5 flex justify-start"
        />
        <div className="mt-4 mb-4">
          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3.5">
              <p className="font-semibold">Order id</p>
              <p className=" m text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5" />
          </div>

          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3">
              <p className="font-semibold ">Product Name :</p>
              <p className=" text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5 " />
          </div>

          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3">
              <p className="font-semibold">Quality :</p>
              <p className=" m text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5" />
          </div>

          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3">
              <p className="font-semibold">Per Quantity Order :</p>
              <p className=" m text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5" />
          </div>
          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3">
              <p className="font-semibold">Sub Total Ammunt :</p>
              <p className=" m text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5" />
          </div>

          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3">
              <p className="font-semibold">Order Date :</p>
              <p className=" m text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5" />
          </div>

          <div>
            <span className="flex text-[10px] justify-between mr-24 py-3">
              <p className="font-semibold">Payment Method :</p>
              <p className=" m text-[10px] ">0-44-87543-145763</p>
            </span>
            <hr className="w-full font-bold mt-1.5" />
          </div>
        </div>
      </div>

      <div className=" shadow-md shadow-gray-300 rounded-md w-full lg:w-[48%]   mt-6 p-2 h-[110%]">
        <div className="">
          <p className="text-gray-400 font-medium mb-4 mt-1.5 ">
            Order Summary
          </p>
          <div className="space-y-1">
            <div className="flex text-[12px] justify-between space-x-1">
              <p className="flex items-center mt-2.5 text-gray-400 font-normal">
                Shiping address
              </p>
              <div className="font-bold ">
                <p>957124687</p>
                <p>Hosur Road</p>
                <p>
                  Kudlu Gate, <br /> Hosur Road, Bangalore, karnataka - 560010{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-[12px]">
              <p>Order id</p>
              <p className="font-bold">0-44-09887457-09</p>
            </div>
            <hr className="w-full mt-2" />
          </div>
        </div>
        <div className="">
          <p className="text-gray-400 font-medium mb-4 mt-1.5 ">
            Price Details
          </p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px]">
              <p>Last Price</p>
              <p className="font-bold">$10.00</p>
            </div>
            <div className="flex justify-between text-[12px]">
              <p>Shiping Fee</p>
              <p className="font-bold">$0.00</p>
            </div>
            <div className="flex justify-between text-[12px]">
              <p>Taxes</p>
              <p className="font-bold">$0.00</p>
            </div>
          </div>
          <hr className="w-full mt-2" />
        </div>
        <div className="flex justify-between text-[15px] my-5 ">
          <p>Total</p>
          <p className="font-bold">$10.00</p>
        </div>
      </div>
    </div>
  );
}

export default MarketBody;
