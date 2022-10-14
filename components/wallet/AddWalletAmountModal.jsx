/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import { addMoneyViaPaystackStart } from "../../store/slices/walletSlice";
import { notify } from "reapop";

import { fetchWalletDetailsStart } from "../../store/slices/walletSlice";
import { FaTimes } from "react-icons/fa";

import Link from "next/link";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const AddWalletAmountModal = (props) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);

  const configData = useSelector((state) => state.config.configData);

  const wallet = useSelector((state) => state.wallet.walletData);
  const user = useSelector((state) => state.user.profile.data);
  const fund = useSelector((state) => state.wallet.readyFund.start_fund);
  const test = useSelector((state) => state.wallet.fundWallet.data);

  //   useEffect(() => {
  //     dispatch(fetchWalletDetailsStart());
  //   }, []);

  const handleChangeAmount = (fee) => {
    setAmount(fee);
    setConfig({
      ...config,
      amount: fee * 100,
    });
  };

  const email = getCookie("user_email");

  const [config, setConfig] = useState({
    reference: null,
    email: email,
    amount: 100,
    publicKey: "pk_test_e6d9a7801826c67298efbedbd115e8c04cf02144",

    // pk_test_2c18b11cc02303cf-5ae0cdf359ae6408208dfedd
  });

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setTimeout(() => {
      dispatch(fetchWalletDetailsStart());
      props.closeAddWalletAmountModal();
      window.location.assign("/payment/wallet");
    }, 3000);
  };

  const fundWallet = () => {
    dispatch(addMoneyViaPaystackStart(amount));
  };

  //   const onSuccess = (reference) => {
  //     // Implementation for whatever you want to do with reference and after success call.
  //     setTimeout(() => {
  //       dispatch(
  //         addMoneyViaPaystackStart({
  //           payment_id: reference.reference,
  //           amount: amount,
  //           status : "success"
  //         })
  //       );
  //     }, 1000);
  //     dispatch(fetchWalletDetailsStart());
  //     props.closeAddWalletAmountModal();
  //   };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    dispatch(
      notify({
        message: "Payment cancelled please try again..",
        status: "error",
      })
    );
  };

  useEffect(() => {
    if (props.addWalletAmountModal === true) {
      dispatch(fetchWalletDetailsStart());
    }
  }, [props.addWalletAmountModal]);

  useEffect(() => {
    setConfig({ ...config, reference: test.user_wallet_payment_unique_id });
    test.user_wallet_payment_unique_id &&
      config.reference != "" &&
      fund &&
      initializePayment(onSuccess, onClose);
  }, [fund, test]);

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Transition appear show={props.addWalletAmountModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => props.closeAddWalletAmountModal()}
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
                      Add Wallet Amount
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => props.closeAddWalletAmountModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>

                  <div className="p-3">
                    {wallet.loading ? (
                      ""
                    ) : (
                      <div className="flex space-x-1 my-2 font-medium">
                        <span> Wallet Balance : </span>{" "}
                        <p>{wallet.data.user_wallet.remaining_formatted}</p>
                      </div>
                    )}

                    <form className="block mt-0">
                      <div className="mb-[1em]">
                        <input
                          type="number"
                          placeholder="amount"
                          min="1"
                          name="amount"
                          step="any"
                          value={amount}
                          onChange={(event) =>
                            handleChangeAmount(event.currentTarget.value)
                          }
                          className="bg-white font-semibold   rounded-lg pl-[1em] w-full shadow-xl"
                        />
                        <label
                          htmlFor="amount"
                          className="text-xs font-medium mt-1"
                        >
                          Enter Amount
                        </label>
                      </div>
                    </form>
                  </div>

                  <div className="flex justify-between md:justify-end items-center px-5 py-2 md:space-x-3">
                    {amount != 0 ? (
                      <button
                        className="row-container space-x-0.5 border p-1 h-10  rounded-md shadow-xl bg-green-500"
                        onClick={() => fundWallet()}
                      >
                        <span className="font-semibold text-sm text-white">
                          Pay Now
                        </span>
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                      onClick={() => props.closeAddWalletAmountModal()}
                    >
                      Cancel
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

export default AddWalletAmountModal;
