/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

import {
  ppvPaymentPaystackStart,
  ppvPaymentWalletStart,
} from "../../store/slices/postSlice";

import {notify} from "reapop"



import { fetchCardDetailsStart } from "../../store/slices/cardsSlice";
import { fetchWalletDetailsStart } from "../../store/slices/walletSlice";
import { FaTimes } from "react-icons/fa";


import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PPVPaymentModal = (props) => {
  const dispatch = useDispatch();
  const cookies = getCookies();
  const [amount, setAmount] = useState(1);
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );

 

  const wallet = useSelector((state) => state.wallet.walletData);
  const user = useSelector((state) => state.user.profile.data);
  const ppvPaystack = useSelector((state) => state.post.ppvPayPaystack);
  const PPVPaymentModal = useSelector((state) => state.navbar.ppvPaymentModal);
 



  const [config, setConfig] = useState({
    reference: (new Date()).getTime().toString(),
    email:  user?.email,
    amount: props.amount * 100,
    publicKey: "pk_test_2c18b11cc02303cf5ae0cdf359ae6408208dfedd",
  });

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setTimeout(() => {
      dispatch(
        ppvPaymentPaystackStart({
          payment_id: reference.reference,
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
    }, 1000);
    props.closePPVPaymentModal();
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
   dispatch(notify({ message : "Payment cancelled please try again..", status : "error"}))
  };

  useEffect(() => {
    if (props.PPVPayment === true) {
      setPaymentType(localStorage.getItem("default_payment_method"));
      setConfig({
        ...config,
        email : user.email
      })
      dispatch(fetchCardDetailsStart());
      dispatch(fetchWalletDetailsStart());
    }
  }, [props.PPVPayment]);

 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "WALLET")
      dispatch(
        ppvPaymentWalletStart({
          post_id: props.post_id != undefined || props.post_id != null ? props.post_id : "", 
          user_id: props.user_id,
        })
      );

    props.closePPVPaymentModal();
  };


  const initializePayment = usePaystackPayment(config);

  

  return (
    <>
      <Transition appear show={props.PPVPayment} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => props.closePPVPaymentModal()}
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-1 text-left align-middle shadow-xl transition-all">
                  <div className="flex w-full items-center justify-between p-2 bg-playRed rounded-t-2xl">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Pay and see the Post
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => props.closePPVPaymentModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 md:gap-x-2 p-3">
                    <div className="hidden md:block">
                      <div className="text-center row-container bg-playRed h-10 rounded-lg">
                        <h2 className="text-white font-semibold text-sm">
                          WALLET
                        </h2>
                      </div>
                    </div>

                    <div className="col-span-5">
                      <form onSubmit={handleSubmit} className="block mt-0">
                        <div className="mb-[1em]">
                          <input
                            type="text"
                            placeholder="pay amount"
                            value={props.post.amount_formatted}

                            disabled
                            className="bg-white font-semibold border-none focus:ring-0 !outline-none  ring-0  rounded-lg pl-[1em] w-full shadow-xl cursor-not-allowed"
                          />
                        </div>
                        {wallet.loading ? (
                          ""
                        ) : (
                          <div className="block ">
                            <div className="bg-white p-[1em] ring-0 border !outline-none shadow-lg font-semibold flex justify-between rounded-lg items-center">
                              <h4>Available</h4>
                              <p>
                                {wallet.data.user_wallet.remaining_formatted}
                              </p>
                            </div>
                            {amount > wallet.data.user_wallet.remaining ? (
                              <div className="py-2">
                                <p className="font-light text-xs text-gray-400">
                                  * The wallet balance is low, so please and the
                                  money to wallet
                                </p>
                                <div className="flex justify-start w-36 my-0.5  bg-green-400 rounded-md cursor-pointer p-2">
                                  <Link
                                    href="/wallet"
                                    className="withdraw-money-btn"
                                    passHref
                                  >
                                    <div className="font-medium text-sm text-white">
                                      Add Wallet Amount
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )}

                        
                      </form>
                    </div>
                  </div>
                  <div className="flex justify-between md:justify-end items-center px-5 py-2 md:space-x-3">
                    {amount != 0 ? (
                      <button
                        className="row-container space-x-0.5 border p-1 h-10  rounded-md shadow-xl bg-white focus:outline-none"
                        onClick={() => {
                          initializePayment(onSuccess, onClose);
                        }}
                      >
                        <span className="font-semibold text-sm">Pay with</span>

                        <img
                          className="h-24"
                          src="/materials/paystack-logo-vector.svg"
                          alt="Paystack"
                        />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                      onClick={() => props.closePPVPaymentModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 text-white rounded-md px-3 py-1"
                      onClick={handleSubmit}
                      disabled={ppvPaystack.buttonDisable}
                    >
                      {ppvPaystack.loadingButtonContent !== null
                        ? ppvPaystack.loadingButtonContent
                        : "Pay Now"}
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

export default PPVPaymentModal;

