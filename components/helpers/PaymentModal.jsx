import { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentModal } from "../../store/slices/NavSlice";
import {
  subscriptionPaymentPaystackStart,
  subscriptionPaymentWalletStart,
} from "../../store/slices/subscriptionSlice";

import { fetchCardDetailsStart } from "../../store/slices/cardsSlice";
import { fetchWalletDetailsStart } from "../../store/slices/walletSlice";
import { FaTimes } from "react-icons/fa";
import configuration from "react-global-configuration";

import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PaymentModal = ({
  userPicture,
  name,
  user_unique_id,
  subscriptionData,
  username,
}) => {
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState("WALLET");
  const configData = useSelector((state) => state.config.configData);
  const subscriptionPayment = useSelector(
    (state) => state.navbar.paymentSubscriptionModal
  );
  const subPayPaystack = useSelector(
    (state) => state.subscriptions.subPayPaystack
  );
  const wallet = useSelector((state) => state.wallet.walletData);
  const cards = useSelector((state) => state.cards.cardDetails);

  const closeModal = () => dispatch(setPaymentModal(false));

  const [showPayPal, payPal] = useState(false);

  useEffect(() => {
    setPaymentType(localStorage.getItem("default_payment_method"));
    dispatch(fetchCardDetailsStart());
    dispatch(fetchWalletDetailsStart());
  }, []);

  //   let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  //   const client = {
  //     sandbox: configuration.get("configData.PAYPAL_ID"),
  //     production: configuration.get("configData.PAYPAL_ID"),
  //   };

  const choosePaymentOption = (event) => {
    setPaymentType(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "CARD")
      dispatch(
        subscriptionPaymentPaystackStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "PAYPAL") showPayPal(true);

    if (paymentType === "WALLET")
      dispatch(
        subscriptionPaymentWalletStart({
          user_unique_id: user_unique_id,
          plan_type: subscriptionData.plan_type,
          is_free: subscriptionData.is_free,
        })
      );
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        subscriptionPaymentPaypalStart({
          payment_id: payment.paymentID,
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    }, 1000);
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      "Payment cancelled please try again.."
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  return (
    <Transition appear show={subscriptionPayment} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
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
                <div className="flex w-full items-center justify-between p-2 bg-lightPlayRed rounded-t-2xl">
                  <h3 className="text-lg font-medium leading-6 text-white">
                    Subscribe
                  </h3>
                  <div
                    className="rounded-full bg-white p-0.5 cursor-pointer"
                    onClick={() => closeModal()}
                  >
                    <FaTimes className="w-6 h-6 hover:text-red-600" />
                  </div>
                </div>
                <Tab.Group defaultIndex={1}>
                  <Tab.List className="flex space-x-1 rounded-b-xl bg-blue-900/20 p-1">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-lg font-semibold leading-5 text-lightPlayRed",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-lightPlayRed focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-gray-400 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      Card (Paystack)
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-lg font-semibold leading-5 text-lightPlayRed",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-lightPlayRed focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-gray-400 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      Wallet
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2 p-5 bg-slate-50">
                    <Tab.Panel>
                      <h1>coming soon</h1>
                    </Tab.Panel>

                    <Tab.Panel
                      className={classNames("rounded-xl bg-white p-3")}
                    >
                      <form onSubmit={handleSubmit} className="block mt-0">
                        <div className="mb-[1em]">
                          <input
                            type="text"
                            placeholder="amount"
                            value={subscriptionData.amount_formatted}
                            disabled
                            className="bg-white font-semibold cursor-not-allowed focus:ring-0 !outline-none border-0.5 ring-0  rounded-lg pl-[1em] w-full shadow-md"
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
                            {subscriptionData.amount >
                            wallet.data.user_wallet.remaining ? (
                              <div className="">
                                <p className="conv-desc desc">Low Balance</p>
                                <div className="d-flex">
                                  <Link
                                    href="/wallet"
                                    className="withdraw-money-btn"
                                  >
                                    add amount
                                  </Link>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </form>
                    </Tab.Panel>
                  </Tab.Panels>
                  <div className="flex justify-between md:justify-end items-center px-5 py-2 md:space-x-3">
                    <button
                      type="button"
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 text-white rounded-md px-3 py-1"
                      onClick={handleSubmit}
                      disabled={subPayPaystack.buttonDisable}
                    >
                      {subPayPaystack.loadingButtonContent !== null
                        ? subPayPaystack.loadingButtonContent
                        : "Pay Now"}
                    </button>
                  </div>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentModal;
