/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBankAccountStart } from "../../store/slices/bankAccountSlice";

function AddBankBody() {
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addBankAccountStart(inputData));
  };

  return (
    <div className="px-8  h-fit border shadow-lg rounded-md ">
      <form action="" className="w-full" onSubmit={handleSubmit}>
        <div className="space-y-5 rounded  mt-8">
          <div className="block lg:flex items-center gap-8 ">
            <input
              type="text"
              name="bankname"
              required
              list="banknames"
              placeholder="Bank Name"
              value={inputData.route_number}
              onChange={(event) => {
                setInputData({
                  ...inputData,
                  route_number: event.currentTarget.value,
                });
              }}
              className="flex flex-row space-y-2 w-full my-4 rounded border-b-2 border-0 bg-gray-100"
            />
            <datalist id="banknames" className="bg-gray-300">
              <option value="UBA" />
              <option value="Ecobank" />
              <option value="Wema Bank" />
              <option value="GT Bank" />
              <option value="Access Bank" />
              <option value="First Bank" />
              <option value="Sterling Bank" />
              <option value="Polaris Bank" />
              <option value="FCMB" />
              <option value="Union Bank" />
              <option value="Kuda Bank" />
            </datalist>
            <input
              required
              type="number"
              value={inputData.account_number}
              min="0"
              name="account_number"
              onChange={(event) => {
                setInputData({
                  ...inputData,
                  account_number: event.currentTarget.value,
                });
              }}
              placeholder="Account Number"
              className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
            />
          </div>
          <select
            required
            name="bank_type"
            onChange={(event) => {
              setInputData({
                ...inputData,
                bank_type: event.currentTarget.value,
              });
            }}
            placeholder="Account Type"
            className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
          >
            <option value="savings">savings</option>
            <option value="current">current</option>
          </select>
          <div className="block lg:flex items-center gap-8 ">
            <input
              type="text"
              name="first_name"
              value={inputData.first_name}
              onChange={(event) => {
                setInputData({
                  ...inputData,
                  first_name: event.currentTarget.value,
                });
              }}
              required
              placeholder="First Name"
              className="flex flex-row space-y-2 w-full my-4 rounded border-b-2 border-0 bg-gray-100"
            />

            <input
              type="text"
              value={inputData.last_name}
              name="last_name"
              required
              onChange={(event) => {
                setInputData({
                  ...inputData,
                  last_name: event.currentTarget.value,
                });
              }}
              placeholder="Last Name"
              className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
            />
          </div>
        </div>
        <div className="block ">
          <span className=" text-[14px] text-lightPlayRed space-x-2 font-medium block">
            <input
              required
              type="checkbox"
              className="w-3.5 h-3.5 my-7 items-center border-lightPlayRed"
            />
            <label htmlFor="" className="m-10">
              I agree to terms and conditions
            </label>
          </span>
          <button
            type="submit"
            className="bg-red-400 my-8 text-lg font-medium hover:bg-red-500 text-white shadow-sm rounded-md w-full lg:w-fit px-4 py-2 transition duration-100 ease-linear"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBankBody;
