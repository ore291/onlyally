import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUnfollowerModal } from "../../store/slices/NavSlice";
import {unFollowUserStart} from "../../store/slices/followerSlice";
import { FaTimes } from "react-icons/fa";

const UnfollowModal = ({user_id}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.navbar.unfollowUserModal);
  const unfollowButton = useSelector(state => state.follow.unFollowUser.loadingButtonContent)
  const closeModal = () => {
    dispatch(setUnfollowerModal(false));
  };

  const handleUnfollow = () => {
    dispatch(
      unFollowUserStart({
        user_id: user_id,
      })
    );
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <div
                    className="flex w-full items-center justify-between p-2 "
                  >
                    <h3 className="text-lg font-medium leading-6 ">
                      Unsubscribe
                    </h3>
                    <div
                      className="rounded-full bg-white p-0.5 cursor-pointer"
                      onClick={() => closeModal()}
                    >
                      <FaTimes className="w-6 h-6 hover:text-red-600" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    Are you sure you want to cancel subscription?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className=" mr-2inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleUnfollow}
                    >
                      {
                          unfollowButton ? unfollowButton : "Yes"
                      }
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

export default UnfollowModal;
