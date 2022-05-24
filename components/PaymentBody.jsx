import React from "react";

function ProfileBody() {
  return (
    <div className="block lg:flex w-full space-x-5">
      <div className="mt-6 p-2 rounded-md w-full lg:w-[48%] lg:ml-3 flex flex-col justify-center space-y-5">
        <div className="flex flex-wrap gap-2">
          <div className="flex justify-center flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>968573087</p>
              <p>Hosur Road</p>
              <p>Kudiu Gati, Hosur Road, Banglone, Kankataka </p>
            </div>
            <div>
              <input
                type="radio"
                checked="checked"
                className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>

          <div className="flex justify-center flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>968573087</p>
              <p>Hosur Road</p>
              <p>Kudiu Gati, Hosur Road, Banglone, Kankataka </p>
            </div>
            <div>
              <input
                type="radio"
                checked=""
                className="checked:bg-none mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>

          <div className="flex justify-center flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>968573087</p>
              <p>Hosur Road</p>
              <p>Kudiu Gati, Hosur Road, Banglone, Kankataka </p>
            </div>
            <div>
              <input
                type="radio"
                checked=""
                className="checked:bg-none mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>

          <div className="flex justify-center flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>968573087</p>
              <p>Hosur Road</p>
              <p>Kudiu Gati, Hosur Road, Banglone, Kankataka </p>
            </div>
            <div>
              <input
                type="radio"
                checked=""
                className="checked:bg-none mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>
        </div>

        {/* input fealds  */}

        <div className="mt-6 p-2 rounded-md w-full ">
          <div className="">
            <p className="mb-2">Shipping address</p>
            <form action="" className="flex flex-col justify-center space-y-6 ">
              <div className="flex flex-col w-full justify-center ">
                <input
                  type="text"
                  name="Name"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Name"
                />
              </div>

              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="Contact Number"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Contact Number"
                />
              </div>

              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="Address"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Address"
                />
              </div>

              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="Landmark"
                  className="w-[100%] h-fit border-white shadow-gray-300 shadow-sm rounded text-[10px] outline-none"
                  placeholder="Landmark"
                />
              </div>

              <div className="flex flex-col w-full justify-center">
                <input
                  type="text"
                  name="Pin Code"
                  className="w-[100%] h-[27px] border-white shadow-gray-300 shadow-md rounded text-[10px] outline-none"
                  placeholder="Pin Code"
                />
              </div>

              <div className="flex flex-row w-full justify-start space-x-2">
                <input
                  type="checkbox"
                  name="save infomation"
                  className=" mt-[3px] h-2.5 w-2.5 font-medium"
                />
                <label className="text-[10px] font-medium">
                  Svae the information for next time{" "}
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="w-auto shadow-sm rounded grid grid-cols-2 gap-x-5 gap-y-2">
          <div className="flex justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>Card</p>
            </div>
            <div>
              <input
                type="radio"
                checked="checked"
                className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>

          <div className="flex justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>Wallet</p>
            </div>
            <div>
              <input
                type="radio"
                checked=""
                className="checked:bg-none mr-3 h-2.5 w-2.5 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
            <div className="text-gray-600 text-[10px] ml-2 font-medium ">
              <p>Paypal</p>
            </div>
            <div>
              <input
                type="radio"
                checked=""
                className="checked:bg-none mr-3 h-2.5 w-2.5"
              />
            </div>
          </div>
        </div>

        <div className="w-auto shadow-md border rounded ">
          <div className="p-2.5 flex space-x-2">
            <p className="font-bold text-[10px]"> Wallat Balance : 812.98</p>
            <p className="bg-blue-600 text-white py-[1px] px-2 text-[8px]">
              Add Wallet Amount
            </p>
          </div>
        </div>
        <div className="space-x-2">
          <button className="text-white bg-red-500 py-1.5 px-3.5 rounded-full">
            Pay Now
          </button>
          <button className="text-red-500 bg-white-500 py-1.5 px-3.5 rounded-full border">
            Pay Now
          </button>
        </div>

        <div className="flex justify-between flex-row items-center text-gray-500 border shadow-md rounded-lg py-2">
          <div className="text-gray-600 text-[10px] ml-2 font-medium ">
            <p>Xavier</p>
            <p>XXXX XXXX XXXX 4242</p>
          </div>
          <input
            type="radio"
            checked="checked"
            className="checked:bg-none text-red-500 mr-3 h-2.5 w-2.5"
          />
        </div>
        <div className="space-x-2">
          <button className="text-white bg-red-500 py-1.5 px-3.5 rounded-full">
            Pay Now
          </button>
          <button className="text-red-500 bg-white-500 py-1.5 px-3.5 rounded-full border">
            Pay Now
          </button>
        </div>
      </div>

      <div className=" shadow-md shadow-gray-300 rounded-md w-full lg:w-[48%] px-3  mt-6 p-2 h-[100%] space-y-4 ">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <img
                src="/images/settings/1.jpg"
                alt="Order image"
                className="w-1/5 flex justify-start rounded-full"
              />
              <p className="text-[10px] flex items-center">Search Band</p>
            </div>
            <p className="font-bold">$10.00</p>
          </div>
        </div>
        <hr className="w-full mt-2 " />

        <div className="">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px]">
              <p>Sub Total </p>
              <p className="font-bold">$0.00</p>
            </div>
            <div className="flex justify-between text-[12px]">
              <p>Shipping</p>
              <p className="font-bold">Calculate at next step</p>
            </div>
          </div>
        </div>
        <hr className="w-full mt-2" />
        <div className="flex justify-between text-[15px] my-5 ">
          <p>Total</p>
          <p className="font-bold">$10.00</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
