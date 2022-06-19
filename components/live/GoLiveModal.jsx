import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { videoCallBroadcastStart } from "../../store/slices/liveVideoSlice";
import VerifiedBadge from "../handlers/VerifiedBadge";
import { FaTimes } from "react-icons/fa";

import Link from "next/link";

const GoLiveModal = (props) => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(0);
  const videoCall = useSelector(
    (state) => state.videoCall.saveVideoCallRequest
  );

  const paymentStatusOnchange = (event) => {
    setInputData({
      ...inputData,
      payment_status: event,
    });
    setPaymentStatus(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(videoCallBroadcastStart(inputData));
    props.closeGoLiveModal();
  };
  return (
    <>
      <Transition appear show={props.goLive} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => props.closeGoLiveModal()}
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

          <div className="fixed top-3 md:top-10 inset-0 overflow-y-auto">
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
                      Go Live
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => props.closeGoLiveModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>
                  {/* modal body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-5">
                    <div className="go-live-img-sec hidden md:block">
                      <img
                        className="w-full align-middle border-none"
                        src={"materials/go-live-img.svg"}
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center space-x-2 relative min-h-[51px] pt-0 mb-[15px]">
                        <div className="rounded-full block relative ">
                          <img
                            src={props.userPicture}
                            alt={props.name}
                            className="tips__user__img rounded-full w-[4em] h-[4em] object-cover align"
                          />
                        </div>
                        <div className="col-container space-y-1">
                          <div className="popup-username-row">
                            <div className="pop-username">
                              <div className="text-lg font-semibold">
                                {props.name}{" "}
                                {props.is_verified_badge == 1 ? (
                                  <VerifiedBadge />
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="popup-username-row">
                            <span className="pop-username popuser-realname">
                              <div className="pop-user-username text-xs text-gray-300">
                                @{props.username}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <form
                        onSubmit={handleSubmit}
                        className="max-w-[800px] w-full overflow-hidden mx-auto space-y-1 "
                      >
                        <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-1 bg-transparent">
                          <input
                            type="text"
                            name="name"
                            placeholder=" "
                            value={inputData.title ? inputData.title : null}
                            onChange={(event) =>
                              setInputData({
                                ...inputData,
                                title: event.currentTarget.value,
                              })
                            }
                            required
                            className="relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                          />
                          <label
                            htmlFor="name"
                            className="origin-0 absolute top-3 left-3 font-medium text-xs z-[2] text-gray-500 duration-300"
                          >
                            Title
                          </label>
                        </div>
                        <div className="w-full relative z-[1]  bg-gray-100  my-4 bg-transparent">
                          <span className="text-gray-700 text-xs font-semibold">
                            Choose Streaming Mode
                          </span>
                          <div className="mt-2 ml-1">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio"
                                name="streaming-mode"
                                value="public"
                                onChange={(event) =>
                                  setInputData({
                                    ...inputData,
                                    type: "public",
                                  })
                                }
                              />
                              <span className="ml-2">Public</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                              <input
                                type="radio"
                                className="form-radio"
                                name="streaming-mode"
                                value="private"
                                onChange={(event) =>
                                  setInputData({
                                    ...inputData,
                                    type: "private",
                                  })
                                }
                              />
                              <span className="ml-2">Private</span>
                            </label>
                          </div>
                        </div>
                        <div className="w-full relative z-[1]  bg-gray-100  my-4 bg-transparent">
                          <span className="text-gray-700 text-xs font-semibold">
                            Payment Status
                          </span>
                          <div className="mt-2 ml-1">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio"
                                name="payment_status"
                                value="0"
                                onChange={(event) => {
                                  paymentStatusOnchange(
                                    event.currentTarget.value
                                  );
                                }}
                              />
                              <span className="ml-2">Free</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                              <input
                                type="radio"
                                className="form-radio"
                                name="payment_status"
                                value="1"
                                onChange={(event) => {
                                  paymentStatusOnchange(
                                    event.currentTarget.value
                                  );
                                }}
                              />
                              <span className="ml-2">Paid</span>
                            </label>
                          </div>
                        </div>

                        {paymentStatus == 1 ? (
                          <label className="block">
                            <span className="text-gray-700">Amount</span>
                            <input
                              type="number"
                              required
                              className="form-input mt-1 block w-full focus:ring-0 focus:outline-none border-0 outline-none shadow-md rounded-md "
                              min="0"
                              step="any"
                              value={inputData.amount ? inputData.amount : null}
                              onChange={(event) =>
                                setInputData({
                                  ...inputData,
                                  amount: event.currentTarget.value,
                                })
                              }
                            />
                          </label>
                        ) : (
                          ""
                        )}
                        <div className="w-full relative z-[1] border-b-2 border-black  bg-gray-100 focus-within:border-lightPlayRed my-1 bg-transparent">
                          <textarea
                            rows="2"
                            type="text"
                            name="description"
                            placeholder=" "
                            
                            className="form-textarea resize-none min-h-[56px] overflow-auto relative my-2 z-[3] block w-full  appearance-none  bg-transparent  outline-none focus:ring-0 focus:outline-none ring-0 border-0"
                            value={inputData.description ? inputData.description : null}
                            onChange={(event) =>
                              setInputData({
                                ...inputData,
                                description: event.currentTarget.value,
                              })
                            }
                       
                            
                          />
                          <label
                            htmlFor="description"
                            className="origin-0 absolute top-3 left-3 font-medium text-xs z-[2] text-gray-500 duration-300"
                          >
                            Description (optional)
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* end */}

                  <div className="flex justify-between md:justify-end items-center px-5 py-2 md:space-x-3">
                    <button
                      type="button"
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                      onClick={() => props.closeGoLiveModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 text-white rounded-md px-3 py-1"
                      onClick={handleSubmit}
                      disabled={videoCall.buttonDisable}
                    >
                      {videoCall.loadingButtonContent !== null
                        ? videoCall.loadingButtonContent
                        : "Go Live"}
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

export default GoLiveModal;
