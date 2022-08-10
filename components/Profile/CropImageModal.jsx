import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import React, { useState, useEffect, Fragment, useCallback } from "react";
import Cropper from "react-easy-crop";
import { FaTimes } from "react-icons/fa";
import {
  editUserDetails,
  userNameValidationStart,
  updateUserDetailsStart,
} from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

import getCroppedImg from "./CropImageHelper";

const CropImageModal = (props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   alert(props.cropModalFlag.type);
  // }, []);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const getCroppedImage = useCallback(async () => {
    const croppedImage = await getCroppedImg(
      props.image,
      croppedAreaPixels,
      0,
      props.cropModalFlag.fileType
    );

    var myFile = dataURLtoFile(croppedImage, props.cropModalFlag.fileName);

    if (props.cropModalFlag.type == "picture") {
      props.setImage({ ...props.imageState, picture: croppedImage });
      props.setProfileInputData({
        ...props.profileInputData,
        picture: myFile,
      });
    } else {
      props.setImage({ ...props.imageState, cover: croppedImage });
      props.setProfileInputData({
        ...props.profileInputData,
        cover: myFile,
      });
    }

    props.closeModal();
  }, [croppedAreaPixels]);

  return (
    <>
      {props.cropModalFlag.type == "picture" ? (
        <Transition
          appear
          show={
            props.cropModalFlag.type == "picture" ||
            props.cropModalFlag.type == "cover"
              ? props.modalFlag
              : false
          }
          as={Fragment}
        >
          <Dialog
            as="div"
            className="relative z-10"
            onClose={
              props.cropModalFlag.type == "picture" ||
              props.cropModalFlag.type == "cover"
                ? props.closeModal
                : false
            }
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
                  <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-1 text-left align-middle shadow-xl transition-all">
                    <div className="flex w-full items-center justify-between p-2 bg-lightPlayRed rounded-t-2xl">
                      <h3 className="text-lg font-medium leading-6 text-white">
                        {props.modalFlag == true ? "Yes" : "NO"}{" "}
                        {props.cropModalFlag.type}
                      </h3>
                      <div
                        className="rounded-full bg-white p-0.5 cursor-pointer"
                        onClick={() => props.closePaymentModal()}
                      >
                        <FaTimes className="w-6 h-6 hover:text-red-600" />
                      </div>
                    </div>
                    {props.cropModalFlag.type == "picture" ? (
                      <>
                        <div className="mb-3">
                          <h4 className="text-muted">
                            <span className="text-danger">Note : </span>Image
                            size of 300 * 300 is recommended{" "}
                          </h4>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3">
                          <h4 className="text-muted">
                            <span className="text-danger">Note : </span>Image
                            size of 1920 * 500 is recommended{" "}
                          </h4>
                        </div>
                      </>
                    )}
                    <div
                      className={`${
                        props.cropModalFlag.type == "picture"
                          ? "image-profile-cropper"
                          : "image-cover-cropper"
                      }`}
                    >
                      <div className="h-[300px] p-10 relative ">
                        <Cropper
                          image={props.image}
                          crop={crop}
                          zoom={zoom}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          cropShape={props.cropModalFlag.shape}
                          aspect={
                            props.cropModalFlag.width /
                            props.cropModalFlag.height
                          }
                          // cropSize={{ width: props.width, height: props.height }}
                          objectFit="contain"
                        />
                        <div className="crop-info-text">
                          <p>
                            <i className="fas fa-arrows-alt mr-2"></i>Drag to
                            Reposition
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <button
                        className="save-btn btn btn-primary"
                        onClick={() => getCroppedImage()}
                      >
                        Crop
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        ""
      )}

      {props.cropModalFlag.type == "cover" ? (
        <Transition
          appear
          show={
            props.cropModalFlag.type == "picture" ||
            props.cropModalFlag.type == "cover"
              ? props.modalFlag
              : false
          }
          as={Fragment}
        >
          <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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
                  <Dialog.Panel className="w-full max-w-3xl  transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                    <div className="flex w-full items-center  justify-between p-2 bg-lightPlayRed rounded-t-2xl">
                      <h3 className="text-lg font-medium leading-6 text-white">
                        {props.modalFlag == true ? "Yes" : "NO"}{" "}
                        {props.cropModalFlag.type}
                      </h3>
                      <div
                        className="rounded-full bg-white p-0.5 cursor-pointer"
                        onClick={props.closeModal}
                      >
                        <FaTimes className="w-6 h-6 hover:text-red-600" />
                      </div>
                    </div>
                    {props.cropModalFlag.type == "picture" ? (
                      <>
                        <div className="mb-3 p-2">
                          <h4 className="text-muted">
                            <span className="text-danger">Note : </span>Image
                            size of 300 * 300 is recommended{" "}
                          </h4>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3 p-2">
                          <h4 className="text-muted">
                            <span className="text-danger">Note : </span>Image
                            size of 1920 * 500 is recommended{" "}
                          </h4>
                        </div>
                      </>
                    )}
                    <div className="h-[300px] p-10 relative ">
                      <div
                        className={`${
                          props.cropModalFlag.type == "picture"
                            ? "image-profile-cropper"
                            : "image-cover-cropper"
                        }`}
                      >
                        <Cropper
                          image={props.image}
                          crop={crop}
                          zoom={zoom}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          cropShape={props.cropModalFlag.shape}
                          aspect={
                            props.cropModalFlag.width /
                            props.cropModalFlag.height
                          }
                          // cropSize={{ width: props.width, height: props.height }}
                          objectFit="contain"
                        />
                        <div className="crop-info-text">
                          <p>
                            <i className="fas fa-arrows-alt mr-2"></i>Drag to
                            Reposition
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 text-center">
                      <button
                        className="save-btn btn btn-primary"
                        onClick={() => getCroppedImage()}
                      >
                        Crop
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        ""
      )}
    </>
  );
};

export default CropImageModal;
