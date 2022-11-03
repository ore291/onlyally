/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import { cancelWithDrawRequestStart } from "../../store/slices/withdrawSlice";

import { FaTimes } from "react-icons/fa";

import Link from "next/link";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const CancelWithdrawModal = (props) => {
  const [cancelWithdrawInputData, setCancelWithdrawInputData] = useState({});

  const cancelWithDraw = useSelector((state) => state.withdraw.cancelWithDraw);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Testin...");
    setCancelWithdrawInputData({
      ...cancelWithdrawInputData,
      user_withdrawal_id: props.data.user_withdrawal_id,
    });
  }, [props.loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(cancelWithDrawRequestStart(cancelWithdrawInputData));
    props.closeCancelWithdrawModal();
  };

  return (
    <>
      <Transition appear show={props.cancelWithdrawModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => props.closeCancelWithdrawModal()}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-1 text-left align-middle shadow-xl transition-all">
                  <div className="flex w-full items-center justify-between p-2 bg-playRed rounded-t-2xl">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Send Reqest to Admin
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => props.closeCancelWithdrawModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>
                  <div className="w-full">
                    <form
                      action=""
                      className="max-w-lg mx-auto"
                      onSubmit={handleSubmit}
                    >
                      <input
                        value={cancelWithdrawInputData.cancel_reason}
                        name="cancel_reason"
                        onChange={(event) =>
                          setCancelWithdrawInputData({
                            ...cancelWithdrawInputData,
                            cancel_reason: event.currentTarget.value,
                          })
                        }
                        type="text"
                        placeholder="Cancel Reason"
                        className="w-full py-2 ring-0 mt-2 focus:ring-0 outline-none focus:outline-none"
                      />
                    </form>
                  </div>

                  <div className="payment-bottom-buttons">
                    <button
                      type="button"
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                      onClick={() => props.closeCancelWithdrawModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 text-white rounded-md px-3 py-1"
                      onClick={handleSubmit}
                      disabled={cancelWithDraw.buttonDisable}
                    >
                      {cancelWithDraw.loadingButtonContent !== null
                        ? cancelWithDraw.loadingButtonContent
                        : "Cancel Withdraw"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CancelWithdrawModal;
