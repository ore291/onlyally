/* eslint-disable react/no-unknown-property */
import React from "react";

function AddBankBody() {
  return (
    <div className="px-8  h-fit border shadow-lg rounded-md ">
      <form action="" className="w-full">
        <div className="space-y-5 rounded  mt-8">
          <div className="block lg:flex items-center gap-8 ">
            <input
              type="text"
              name="bankname"
              list="banknames"
              placeholder="Bank Name"
              className="flex flex-row space-y-2 w-full my-4 rounded border-b-2 border-0 bg-gray-100"
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
        </div>
        <div className="block ">
          <span className=" text-[14px] text-lightPlayRed space-x-2 font-medium block">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 my-7 items-center border-lightPlayRed"
            />
            <label htmlFor="" className="m-10">
              I agree to terms and conditions
            </label>
          </span>
          <button className="bg-red-400 my-8 text-lg font-medium hover:bg-red-500 text-white shadow-sm rounded-md w-full lg:w-fit px-4 py-2 transition duration-100 ease-linear">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBankBody;
