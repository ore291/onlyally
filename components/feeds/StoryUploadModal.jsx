import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storyFileUploadStart } from "../../store/slices/storiesSlice";
import { MdClose } from "react-icons/md";


const StoryUploadModal = (props) => {
  const dispatch = useDispatch();
  const storyUpload = useSelector((state) => state.stories.storyUpload);

  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    props.SliderModalToggle(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [fileData, setFileData] = useState({
    previewImage: "",
    file: "",
    file_type: "",
  });

//   useEffect(() => {
//     if (!storyUpload.loading) {
//       $("#addStoryModal").modal("hide");
//       setFileData({
//         previewImage: "",
//         file: "",
//         file_type: "",
//       });
//     }
//   }, [storyUpload.data]);

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
              <div className="inline-block w-full max-w-2xl p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                          <source
                            src={fileData.previewImage}
                            type="video/mp4"
                          />
                        </video>
                      )
                    ) : null}
                  </div>
                  {fileData.previewImage != "" ? (
                    <div className="upload-button-wrapper">
                      <button
                        className="btn gradient-btn gradientcolor addBank btn btn-primary story-upload file-upload-button"
                        disabled={
                          !storyUpload.loading &&
                          storyUpload.buttonDisable
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
                        disabled={storyUpload.buttonDisable}
                        onClick={handleFileUpload}
                      >
                        {storyUpload.loadingButtonContent != ""
                          ? storyUpload.loadingButtonContent
                          : "upload_image_video"}
                      </button>
                    </div>
                  ) : (
                    <button className="btn gradient-btn gradientcolor addBank btn btn-primary story-upload file-upload-button">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(event) => handleChangeImage(event)}
                      />
                      select_image_video
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
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
