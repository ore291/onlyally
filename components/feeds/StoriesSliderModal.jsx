import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Stories from "react-insta-stories";
import { MdClose } from "react-icons/md";

const StoriesSliderModal = (props) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    props.SliderModalToggle(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const dataArray = [];

    props.sliderData.storyFiles.map((data) => {
      dataArray.push({
        url: data.file,
        type: data.file_type,
        header: {
          heading: props.sliderData.name,
          subheading: data.updated,
          profileImage: props.sliderData.picture,
        },
      });
    });
    setModalData(dataArray);
  }, [props.sliderData]);

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-0.5 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-2 my-8 md:my-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* <Dialog.Title
                  as="div"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title> */}
                <div className="w-full flex justify-end items-center ">
                  <button
                    onClick={() => closeModal()}
                    className="p-1 mb-5 bg-white rounded-full shadow-md border mr-2"
                  >
                    <MdClose className="text-black h-6 w-6 cursor-pointer" />
                  </button>
                </div>

                {modalData.length > 0 && (
                  <Stories
                    // currentIndex={props.selectedSliderIndex == 0 ? null : props.selectedSliderIndex}
                    stories={modalData}
                    defaultInterval={3000}
                    width={"100%"}
                    // height={window.innerHeight - 100}
                    height={"100%"}
                  />
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default StoriesSliderModal;
