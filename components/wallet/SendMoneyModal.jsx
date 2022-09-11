/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import { searchUserStart } from "../../store/slices/homeSlice";
import CommonCenterLoader from "../helpers/CommonCenterLoader";
import { sendMoneyStart } from "../../store/slices/walletSlice";

import { notify } from "reapop";

import { FaTimes } from "react-icons/fa";

import Link from "next/link";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const SendMoneyModal = (props) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);

  const searchUser = useSelector((state) => state.home.searchUser);
  const sendMoney = useSelector((state) => state.wallet.sendMoney)

  const [show, toggleShow] = useState(false);

  const [receipient, setReceipient] = useState(null);

  const inputRef = useRef();
  const recRef = useRef();

  const selectRec = (rec) => {
    setReceipient(rec.user_id);
    recRef.current.value = rec.name;
    toggleShow(false);
  };

  const inputWidth = (event) => {
    setAmount(event.currentTarget.value);

    var inputVal = inputRef.current;

    if (inputVal.value.length > 0) {
      inputVal.style.width = (inputVal.value.length + 1) * 20 + "px";
    } else {
      inputVal.style.width = "175px";
    }
  };

  const handleSearch = (event) => {
    if (event.currentTarget.value === "") {
      toggleShow(false);
    } else if (event.currentTarget.value.length > 2) {
      toggleShow(true);
      dispatch(searchUserStart({ key: event.currentTarget.value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      sendMoneyStart({
        id: receipient,
        amount,
      })
    );
  };

  return (
    <>
      <Transition appear show={props.SendMoneyModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => props.closeSendMoneyModal()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <div className="flex w-full items-center justify-between ">
                    <h3 className="text-xl font-medium leading-6 ">
                      Send money to friends
                    </h3>

                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => props.closeSendMoneyModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>
                  <p className="text-xs mt-3">
                    You can send money to your friends, acquaintances or anyone.
                  </p>

                  {/* <h3 className="text-center text-lg font-medium">Amount</h3> */}
                  <form onSubmit={event => handleSubmit(event)} className="flex flex-col space-y-8 justify-center items-center">
                    <div className="row-container mt-5 mx-0 border-b  break-words filter-search">
                      <sup>₦</sup>
                      <input
                        ref={inputRef}
                        onChange={(event) => inputWidth(event)}
                        type="number"
                        className=" appearance-none  text-center placeholder:text-gray-400 placeholder:font-semibold placeholder:text-2xl lg:placeholder:text-4xl px-2 w-[175px] text-lg md:text-3xl  !max-w-[250px] lg:!max-w-[700px]  break-words overflow-visible m-0 !outline-none focus:ring-0 outline-offset-0"
                        name="query"
                        id="query"
                        placeholder="Amount"
                        autoComplete="off"
                        required
                      />
                    </div>

                    <div className="mt-2 relative">
                      <div className="w-full relative z-[1] border-b border-black  bg-gray-100 focus-within:border-lightPlayRed my-1 bg-transparent">
                        <input
                          type="text"
                          name="name"
                          placeholder=" "
                          onChange={handleSearch}
                          ref={recRef}
                          required
                          className="relative mt-1 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                        />
                        <label
                          htmlFor="name"
                          className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
                        >
                          To whom you want to send?
                        </label>
                      </div>
                      <span className="help-block text-xs text-gray-400 ">
                        Search by username 
                      </span>
                      {show && (
                        <div className=" border search-dropdown-sec  bg-white  text-black p-2 rounded-md z-20">
                          <ul className="list-unstyled search-dropdown-list-sec flex flex-col space-y-1 divide-y">
                            {searchUser.loading ? (
                              <CommonCenterLoader />
                            ) : searchUser.data.users.length > 0 ? (
                              searchUser.data.users.map((user) => (
                                <li
                                  onClick={() => selectRec(user)}
                                  className="py-1"
                                  key={user.user_unique_id}
                                >
                                  <div className="search-body flex items-center space-x-2 cursor-pointer">
                                    <div className="search-content text-sm ">
                                      <h5 className="flex items-center space-x-1">
                                        {user.name}{" "}
                                      </h5>
                                      <p className="text-muted text-xs text-gray-400 f-12">
                                        @{user.username}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <p>No User Found</p>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="mt-3 flex items-center justify-center w-20 h-8 bg-textPlayRed rounded-md text-white"
                    >
                      <span className="text-sm font-medium">{
                        sendMoney.loading ? "Loading..." : "Continue"
                      }</span>
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SendMoneyModal;
