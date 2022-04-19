/* eslint-disable react/no-unknown-property */
import React from "react";

function AddBankBody() {
  return (
    <div>
      <div className="w-[100%] h-72 border shadow-lg rounded-md ">
        <form action="" className="w-full">
          <div className="space-y-5  w-[75%] rounded ml-[5%] mt-8">
            <div className="flex flex-row space-x-5">
              <input
                type="text"
                name="bankname"
                list="banknames"
                placeholder="Bank Name"
                className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
              />
              <datalist id="banknames" className="bg-gray-300">
                <option value="UBA" />
                <option value="GT Bank" />
                <option value="Access Bank" />
                <option value="Sky Bank" />
                <option value="Union Bank" />
              </datalist>

              <input
                type="text"
                placeholder="Account Number"
                className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
              />
            </div>
            <input
              type="text"
              placeholder="Account Name"
              className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
            />
            <span className=" text-[14px] text-lightPlayRed space-x-2 font-medium">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 my-7 items-center border-lightPlayRed"
              />
              <label htmlFor="" className="m-10">
                {" "}
                I agree to terms and conditions
              </label>
            </span>
          </div>
          <button className="text-white bg-lightPlayRed px-5 py-2 rounded-full ml-9 ">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddBankBody;
