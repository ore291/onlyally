/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import { FaTimes } from "react-icons/fa";
import {
  channelPaymentStart,
  finishPaymentStart,
} from "../../store/slices/channelsSlice";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/router";
import { notify } from "reapop";

const ChannelPaymentModal = ({ channel_slug, show, toggleShow }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const payment = useSelector((state) => state.channels.channelPayment);

  const [payStart, setPaystart] = useState(false);

  const confirmPayment = () => {
    dispatch(
      finishPaymentStart({
        slug: channel_slug,
        reference: payment.data?.data?.reference,
        payement_link: true,
      })
    );
    // setTimeout(() => {
    //   toggleShow(false);
    //   window.location.assign(`/channels/${channel_slug}`);
    // }, 3000);
  };

  const email = getCookie("user_email");

  const [config, setConfig] = useState({
    reference: payment.data?.data?.reference || "",
    email: email,
    amount: payment.data?.data?.amount * 100 || 0,
    publicKey: "pk_test_e6d9a7801826c67298efbedbd115e8c04cf02144",

    // pk_test_2c18b11cc02303cf-5ae0cdf359ae6408208dfedd
  });

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    dispatch(
      finishPaymentStart({
        slug: channel_slug,
        reference: payment.data?.data?.reference || reference.reference,
      })
    );
    setTimeout(() => {
      toggleShow(false);
      window.location.assign(`/channels/${channel_slug}`);
    }, 2000);
  };

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
    dispatch(
      channelPaymentStart({
        slug: channel_slug,
        payment_link: true,
      })
    );
  }, []);

  useEffect(() => {
    if (!payment.data.data) return;

    setConfig({
      ...config,
      reference: payment.data?.data?.reference,
      amount: payment.data?.data?.amount * 100,
    });
  }, payment.data.data);

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => toggleShow(true)}
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
                      Subscribe now to join the group
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => toggleShow(false)}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>

                  {payment.loading ? (
                    <div className="w-full h-40 row-container bg-gray-50-300">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-center ">
                          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* {localStorage.getItem(`paymentStart-${channel_slug}`) ==
                        1 && (
                        <div
                          onClick={() => router.back()}
                          className="h-8 rounded-md cursor-pointer row-container w-[120px] bg-textPlayRed text-white font-medium"
                        >
                          Verify Payment
                        </div>
                      )} */}

                      {payment.data != {} && (
                        <div className="w-full m-2 col-container space-y-1">
                          <h2 className="text-2xl font-bold text-center">
                            Sorry, Private Channel!
                          </h2>
                          <p className="font-bold text-sm text-gray-500 text-center ">
                            This page is private and content is only
                            availaible on subscription.
                          </p>
                          <p className="font-medium text-sm text-red-500">
                            Note : {payment.data.message}
                          </p>

                          <div className="w-full flex my-2 p-3 items-center justify-between">
                            <div
                              // onClick={() => {
                              //   setPaystart(true);
                              //   window.open(
                              //     payment.data?.data?.payment_link || "#",
                              //     "_blank"
                              //   );
                              // }}
                              onClick={() => {
                                initializePayment(onSuccess, onClose);
                              }}
                              className="h-8 row-container cursor-pointer w-[120px] bg-green-500 rounded-md text-white font-medium"
                            >
                              Pay Now
                            </div>
                            <div
                              onClick={() => router.back()}
                              className="h-8 rounded-md cursor-pointer row-container w-[120px] bg-textPlayRed text-white font-medium"
                            >
                              Go Back
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChannelPaymentModal;
