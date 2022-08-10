import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storyFileUploadStart } from "../../store/slices/storiesSlice";
import { setUploadModal } from "../../store/slices/NavSlice";
import { MdClose } from "react-icons/md";

const StoryUploadModal = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const storyUpload = useSelector((state) => state.stories.storyUpload);
  const modalState = useSelector((state) => state.navbar.uploadModal);

  function closeModal() {
    props.closeUploadModal();
  }

  const [fileData, setFileData] = useState({
    previewImage: "",
    file: "",
    file_type: "",
  });

  useEffect(() => {
    if (!storyUpload.loading) {
      closeModal();
      setFileData({
        previewImage: "",
        file: "",
        file_type: "",
      });
    }
  }, [storyUpload.data]);

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setFileData({
          ...fileData,
          previewImage: reader.result,
          file: file,
          file_type: file.type.match("image") ? "image" : "video",
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileUpload = () => {
    dispatch(
      storyFileUploadStart({
        file: fileData.file,
        file_type: fileData.file_type,
      })
    );
  };

  return (
    <>
      <Transition appear show={props.uploadStoryModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <div className="fixed inset-0 bg-black bg-opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
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
                  <div className="inline-block w-full max-w-lg p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="div"
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center w-full"
                    >
                      <h3>Add Story</h3>{" "}
                      <button
                        onClick={closeModal}
                        className="p-1  bg-white rounded-full shadow-md border mr-2"
                      >
                        <MdClose className="text-black h-6 w-6 cursor-pointer" />
                      </button>
                    </Dialog.Title>
                    <div className="upload-body py-2">
                      <div className="grid place-items-center mb-[2em]">
                        {fileData.previewImage != "" ? (
                          fileData.file_type == "image" ? (
                            <img
                              src={fileData.previewImage}
                              alt=""
                              className="rounded-md"
                            />
                          ) : (
                            <video
                              autoPlay={false}
                              controls
                              id="myVideo"
                              className="user-profile1 w-full inline-block align-baseline object-contain"
                            >
                              <source
                                src={fileData.previewImage}
                                type="video/mp4"
                              />
                            </video>
                          )
                        ) : null}
                      </div>
                      {fileData.previewImage != "" ? (
                        <div className="flex justify-evenly whitespace-nowrap">
                          <button
                            className="modalButton"
                            disabled={
                              !storyUpload.loading && storyUpload.buttonDisable
                            }
                          >
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(event) => handleChangeImage(event)}
                            />
                            Select Image/Video
                          </button>
                          <button
                            className="modalButton"
                            disabled={storyUpload.buttonDisable}
                            onClick={handleFileUpload}
                          >
                            {storyUpload.loadingButtonContent != ""
                              ? storyUpload.loadingButtonContent
                              : "Upload Image/video"}
                          </button>
                        </div>
                      ) : (
                        <button className="modalButton">
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(event) => handleChangeImage(event)}
                          />
                          Select Image/Video
                        </button>
                      )}
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* <div
        class={`modal custom-modal fade`}
        id="addStoryModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addStoryModal"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h3 className="modal-title">Add Story</h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="story-upload-file">
                {fileData.previewImage != "" ? (
                  fileData.file_type == "image" ? (
                    <img src={fileData.previewImage} alt="" />
                  ) : (
                    <video
                      autoPlay
                      controls
                      id="myVideo"
                      className="user-profile1 w-100"
                    >
                      <source src={fileData.previewImage} type="video/mp4" />
                    </video>
                  )
                ) : null}
              </div>
              {fileData.previewImage != "" ? (
                <div className="upload-button-wrapper">
                  <button
                    className="btn gradient-btn gradientcolor addBank btn btn-primary story-upload file-upload-button"
                    disabled={
                      !props.storyUpload.loading &&
                      props.storyUpload.buttonDisable
                    }
                  >
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(event) => handleChangeImage(event)}
                    />
                    {t("select_image_video")}
                  </button>
                  <button
                    className="btn gradient-btn gradientcolor addBank btn btn-primary file-upload-button"
                    disabled={props.storyUpload.buttonDisable}
                    onClick={handleFileUpload}
                  >
                    {props.storyUpload.loadingButtonContent != ""
                      ? props.storyUpload.loadingButtonContent
                      : `${t("upload_image_video")}`}
                  </button>
                </div>
              ) : (
                <button className="btn gradient-btn gradientcolor addBank btn btn-primary story-upload file-upload-button">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(event) => handleChangeImage(event)}
                  />
                  {t("select_image_video")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default StoryUploadModal;
