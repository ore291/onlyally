import { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setLivePaymentModal } from "../../store/slices/NavSlice";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import {
  liveVideosPaymentByPaystackStart,
  liveVideosPaymentByWalletStart,
} from "../../store/slices/liveVideoSlice";

import { usePaystackPayment } from "react-paystack";

import { fetchCardDetailsStart } from "../../store/slices/cardsSlice";
import { fetchWalletDetailsStart } from "../../store/slices/walletSlice";
import { FaTimes } from "react-icons/fa";
import { notify } from "reapop";

import Link from "next/link";

function classNames(...classNamees) {
  return classNamees.filter(Boolean).join(" ");
}

const LivePaymentModal = (props) => {
  const cookies = getCookies();
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState("WALLET");
  const configData = useSelector((state) => state.config.configData);
  const liveVideoDetails = useSelector(
    (state) => state.liveVideo.singleLiveVideo
  );
  const wallet = useSelector((state) => state.wallet.walletData);
  const cards = useSelector((state) => state.cards.cardDetails);
  // const user = useSelector((state) => state.user.profile.data);

  const closeModal = () => dispatch(setLivePaymentModal(false));

  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: cookies.email,
    amount: props.liveVideo.amount * 100,
    publicKey: "pk_test_e6d9a7801826c67298efbedbd115e8c04cf02144",
  });

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setTimeout(() => {
      dispatch(
        liveVideosPaymentByPaystackStart({
          payment_id: reference.reference,
          live_video_id: props.liveVideo.live_video_id,
          pro_balance: true,
        })
      );
    }, 1000);
    props.closePaymentModal();
  };

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
    setConfig({
      ...config,
      amount: props.liveVideo.amount * 100,
      reference: new Date().getTime().toString(),
    });
  }, [props.liveVideo]);

  useEffect(() => {
    if (props.paymentModal === true) {
      setPaymentType(localStorage.getItem("default_payment_method"));
      dispatch(fetchCardDetailsStart());
      dispatch(fetchWalletDetailsStart());
    }
  }, [props.paymentModal]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (paymentType === "WALLET")
      dispatch(
        liveVideosPaymentByWalletStart({
          live_video_id: props.liveVideo.live_video_id,
          pro_balance: true,
        })
      );
    props.closePaymentModal();
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <Transition appear show={props.paymentModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => props.closePaymentModal()}
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
                <div className="flex w-full items-center justify-between p-2 bg-lightPlayRed rounded-t-2xl">
                  <h3 className="text-lg font-medium leading-6 text-white">
                    Live Video Payment
                  </h3>
                  <div
                    className="rounded-full bg-white p-0.5 cursor-pointer"
                    onClick={() => props.closePaymentModal()}
                  >
                    <FaTimes className="w-6 h-6 hover:text-red-600" />
                  </div>
                </div>
                <div className="p-5">
                  <form onSubmit={handleSubmit} className="block mt-0">
                    <div className="mb-[1em]">
                      <input
                        type="text"
                        placeholder="amount"
                        value={props.liveVideo.amount_formatted}
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
                          <p>{wallet.data.user_wallet.remaining_formatted}</p>
                        </div>
                        {props.liveVideo.amount >
                        wallet.data.user_wallet.remaining ? (
                          <div className="py-2">
                            <p className="font-light text-xs text-gray-400">
                              * The wallet balance is low, so please and the
                              money to wallet
                            </p>
                            <div className="flex justify-start w-36 my-0.5  bg-green-400 rounded-md cursor-pointer p-2">
                              <Link
                                href="/payment/wallet"
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

                <div className="payment-bottom-buttons">
                  <button
                    type="button"
                    className="bg-red-600 text-white rounded-md px-3 py-1"
                    onClick={props.closePaymentModal}
                    >
                    Cancel
                  </button>
                    {props.liveVideo.amount != 0 ? (
                      <button
                        className="row-container space-x-0.5 border p-1 h-10  rounded-md shadow-xl bg-white focus:outline-none ring-0"
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
                    className="bg-green-600 text-white rounded-md px-3 py-1"
                    onClick={handleSubmit}
                    disabled={liveVideoDetails.buttonDisable}
                  >
                    {liveVideoDetails.loadingButtonContent !== null
                      ? liveVideoDetails.loadingButtonContent
                      : "Pay Now"}
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

export default LivePaymentModal;
