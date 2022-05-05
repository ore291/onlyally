import { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentModal } from "../../store/slices/NavSlice";
// import {
//     subscriptionPaymentStripeStart,
//     subscriptionPaymentPaypalStart,
//     subscriptionPaymentCCBillStart,
//     subscriptionPaymentWalletStart,
//     subscriptionPaymentCoinPaymentStart,
//   } from "../../store/actions/SubscriptionAction";

// import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
// import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import configuration from "react-global-configuration";

import Link from "next/link";

const PaymentModal = ({
    userPicture,
    name,
    user_unique_id,
    subscriptionData,
    username

}) => {
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState("WALLET");
  const subscriptionPayment = useSelector(
    (state) => state.navbar.paymentSubscriptionModal
  );
  const subPayPaystack= useSelector((state) => state.subscriptions.subPayPaystack);
  const wallet = useSelector((state) => state.wallet.walletData);
  const cards = useSelector((state) => state.cards.cardDetails);

  const closeModal = () => dispatch(setPaymentModal(false));

  const [showPayPal, payPal] = useState(false);

  useEffect(() => {
    setPaymentType(localStorage.getItem("default_payment_method"));
    // props.dispatch(fetchCardDetailsStart());
    // props.dispatch(fetchWalletDetailsStart());
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
      props.dispatch(
        subscriptionPaymentStripeStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "PAYPAL") showPayPal(true);

    if (paymentType === "WALLET")
      props.dispatch(
        subscriptionPaymentWalletStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );

    if (paymentType === "CCBILL")
      props.dispatch(
        subscriptionPaymentCCBillStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
        })
      );
    if (paymentType === "coinpayment")
      props.dispatch(
        subscriptionPaymentCoinPaymentStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
        })
      );
    // props.closePaymentModal();
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setPaymentModal(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentModal;
