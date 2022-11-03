/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import { getBankAccountStart } from "../../store/slices/bankAccountSlice";
import { sendWithDrawRequestStart } from "../../store/slices/withdrawSlice";

import { notify } from "reapop";

import { FaTimes } from "react-icons/fa";

import Link from "next/link";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const WithdrawModal = (props) => {
  const dispatch = useDispatch();

  const sendWithDraw = useSelector((state) => state.withdraw.sendWithDraw);

  const bankAccount = useSelector((state) => state.bankAccount.bankAccount);

  useEffect(() => {
    dispatch(getBankAccountStart());
  }, []);

  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendWithDrawRequestStart(inputData));
    props.closeWithdrawModal();
    setInputData({});
  };

  return (
    <>
      <Transition appear show={props.withdrawModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => props.closeWithdrawModal()}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:!bg-gray-900 dark:!text-gray-400 p-1 text-left align-middle shadow-xl transition-all">
                  <div className="flex w-full items-center justify-between p-2 bg-playRed rounded-t-2xl">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Send Reqest to Admin
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => props.closeWithdrawModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5 p-3">
                      <h4 className="mb-2 font-medium">
                        Min Amount Required :
                        <span className="text-muted">
                          {
                            props.payments.data
                              .user_withdrawals_min_amount_formatted
                          }
                        </span>
                      </h4>
                      <h4 className="font-medium">
                        Pro Balance :
                        <span className="text-muted">
                          {props.payments.data.user_wallet
                            ? props.payments.data.user_wallet.pro_balance
                            : ""}
                        </span>
                      </h4>
                    </div>
                    <form
                      action=""
                      className="max-w-lg mx-auto"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed  bg-transparent">
                        <input
                          type="number"
                          name="amount"
                          placeholder=" "
                          value={inputData.requested_amount}
                          onChange={(event) =>
                            setInputData({
                              ...inputData,
                              requested_amount: event.currentTarget.value,
                            })
                          }
                          required
                          className="relative z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                        />
                        <label
                          htmlFor="amount"
                          className="origin-0 absolute top-3 left-3 font-medium text-sm z-[2] text-gray-500 duration-300"
                        >
                          Enter Amount
                        </label>
                      </div>
                      <div className="mt-2 ml-1">
                        {bankAccount.loading ? (
                          <p>Loading....</p>
                        ) : bankAccount.data.billing_accounts.length > 0 ? (
                          bankAccount.data.billing_accounts.map(
                            (account, i) => (
                              <label
                                className="inline-flex items-center space-x-1"
                                key={i}
                              >
                                <input
                                  type="radio"
                                  className="form-radio"
                                  id={account.user_billing_account_id}
                                  value={account.user_billing_account_id}
                                  name="user_billing_account_id"
                                  onChange={(event) =>
                                    setInputData({
                                      ...inputData,
                                      user_billing_account_id:
                                        account.user_billing_account_id,
                                    })
                                  }
                                />
                                <span className="ml-2">
                                  {account.first_name +
                                    " " +
                                    account.account_number}
                                </span>
                              </label>
                            )
                          )
                        ) : (
                          <h4>
                            No Bank accounts added. To add account,
                            <Link href={`/payment/add-bank`}>
                              <span className="text-sm text-blue-500 font-medium pl-1 cursor-pointer">
                                Click here
                              </span>
                            </Link>
                          </h4>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="payment-bottom-buttons">
                    <button
                      type="button"
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                      onClick={() => props.closeWithdrawModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 text-white rounded-md px-3 py-1"
                      onClick={handleSubmit}
                      disabled={
                        sendWithDraw.buttonDisable
                          ? sendWithDraw.buttonDisable
                          : inputData.user_billing_account_id
                          ? false
                          : true
                      }
                    >
                      {sendWithDraw.loadingButtonContent !== null
                        ? sendWithDraw.loadingButtonContent
                        : "Send Request"}
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

export default WithdrawModal;
