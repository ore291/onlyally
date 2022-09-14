import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { MdSmartDisplay, MdClose, MdCheck } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { HiSelector } from "react-icons/hi";
import { TiVideo } from "react-icons/ti";
import { FaMusic, FaVideo, FaRegTimesCircle } from "react-icons/fa";
import { Multiselect } from "multiselect-react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "reapop";
import {
  fetchPostCategoriesStart,
  postFileUploadStart,
  postFileRemoveStart,
} from "../../store/slices/postSlice";

import { saveChannelPostStart } from "../../store/slices/channelsSlice";

import PostEditor from "../feeds/PostEditor";

const ChannelPostModal = (props) => {
  const dispatch = useDispatch();
  const saveChannelPost = useSelector(
    (state) => state.channels.saveChannelPost
  );
  const fileUpload = useSelector((state) => state.post.fileUpload);
  const searchUser = useSelector((state) => state.home.searchUser);
  const postCategories = useSelector((state) => state.post.postCategories);

  // new addditions

  const [inputData, setInputData] = useState({});

  const [image, setImage] = useState({ previewImage: "" });
  const [paidPost, setPaidPost] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");

  const [fileUploadStatus, setFileUploadStatus] = useState(false);

  const [videoThumbnail, setVideoThumbnail] = useState(false);

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [disableImage, setDisableImage] = useState(false);

  const [disableVideo, setDisableVideo] = useState(false);

  const [videoPreview, setVideoPreview] = useState({ videoPreviewImage: "" });

  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

  const [imageFiles, setImageFiles] = useState([]);

  const [audioTitle, setAudioTitle] = useState("");

  const [audioThumbnail, setAudioThumbnail] = useState(false);

  const [disableAudio, setDisableAudio] = useState(false);

  const [audioPreviewUrl, setAudioPreviewUrl] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchPostCategoriesStart());
  }, []);

  const getFileArray = async (event) => {
    let ImagesFilesArray = await Object.entries(event.target.files).map(
      (e) => e[1]
    );
    console.log(ImagesFilesArray);
    return ImagesFilesArray;
  };

  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => await resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChangeImage = (event, fileType) => {
    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);

      const validImageFiles = [];
      for (let i = 0; i < event.currentTarget.files.length; i++) {
        const file = event.currentTarget.files[i];
        validImageFiles.push(file);
      }
      if (validImageFiles.length) {
        setImageFiles(validImageFiles);
      }

      var files = {};

      let images = Array.from(event.currentTarget.files);

      images.forEach((file, i) => {
        files[`file[${i}]`] = file;
      });

      // if (file) {
      //   reader.readAsDataURL(file);
      // }

      if (!event.currentTarget.files[0]) {
        dispatch(notify("file field is required", "error"));
      } else {
        dispatch(
          postFileUploadStart({
            ...files,
            file_type: fileType,
          })
        );
        setPaidPost(true);
        setDisableVideo(true);
        setDisableAudio(true);
      }
    }
  };

  const handleChangeVideo = (event, fileType) => {
    if (event.currentTarget.files[0]) {
      setVideoTitle(event.currentTarget.files[0].name);
    }

    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      reader.onloadend = () => {
        setVideoPreviewUrl(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      dispatch(
        postFileUploadStart({
          file: event.currentTarget.files[0],
          file_type: fileType,
        })
      );
      setPaidPost(true);
      setVideoThumbnail(true);
      setDisableImage(true);
      setDisableAudio(true);
    }
  };

  const handleChangeAudio = (event, fileType) => {
    setAudioTitle(event.currentTarget.files[0].name);
    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      reader.onloadend = () => {
        setAudioPreviewUrl(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      dispatch(
        postFileUploadStart({
          file: event.currentTarget.files[0],
          file_type: fileType,
        })
      );
      setPaidPost(true);
      setAudioThumbnail(true);
      setDisableImage(true);
      setDisableVideo(true);
    }
  };

  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const imageClose = (event) => {
    event.preventDefault();
    if (fileUpload.loadingButtonContent !== null) {
      dispatch(
        notify({
          message: "file is being uploaded.. Please wait",
          status: "error",
        })
      );
    } else {
      dispatch(
        postFileRemoveStart({
          file: fileUpload.data.file,
          file_type: fileUpload.data.post_file.file_type,
          blur_file: fileUpload.data.post_file.blur_file,
          post_file_id: fileUpload.data.post_file.post_file_id,
        })
      );
      setImage({ previewImage: "" });
      setFileUploadStatus(false);
      setDisableVideo(false);
      setDisableAudio(false);
      setPaidPost(false);
    }
  };

  const videoClose = (event) => {
    event.preventDefault();
    if (fileUpload.loadingButtonContent !== null) {
      dispatch(
        notify({
          message: "file is being uploaded.. Please wait",
          status: "error",
        })
      );
    } else {
      dispatch(
        postFileRemoveStart({
          file: fileUpload.data.file ? fileUpload.data.file : "",
          file_type: fileUpload.data.post_file
            ? fileUpload.data.post_file.file_type
            : "",
          preview_file: fileUpload.data.post_file
            ? fileUpload.data.post_file.preview_file
            : "",
          post_file_id: fileUpload.data.post_file
            ? fileUpload.data.post_file.post_file_id
            : "",
        })
      );
      setFileUploadStatus(false);
      setVideoTitle("");
      setVideoThumbnail(false);
      setDisableImage(false);
      setDisableAudio(false);
      setPaidPost(false);
      setVideoPreviewUrl("");
    }
  };

  const audioClose = (event) => {
    event.preventDefault();
    if (fileUpload.loadingButtonContent !== null) {
      dispatch(
        notify({
          message: "file is being uploaded.. Please wait",
          status: "error",
        })
      );
    } else {
      dispatch(
        postFileRemoveStart({
          file: fileUpload.data.file ? fileUpload.data.file : "",
          file_type: fileUpload.data.post_file
            ? fileUpload.data.post_file.file_type
            : "",
          preview_file: fileUpload.data.post_file
            ? fileUpload.data.post_file.preview_file
            : "",
          post_file_id: fileUpload.data.post_file
            ? fileUpload.data.post_file.post_file_id
            : "",
        })
      );
      setFileUploadStatus(false);
      setAudioTitle("");
      setAudioThumbnail(false);
      setDisableImage(false);
      setDisableVideo(false);
      setPaidPost(false);
      setAudioPreviewUrl("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileUploadStatus) {
      dispatch(
        saveChannelPostStart({
          channel_slug: props.channel_slug,
          content: editorHtmlContent,
          amount: inputData.amount ? inputData.amount : "",
          post_file_id: fileUpload.data.post_file.post_file_id,
          preview_file: inputData.preview_file ? inputData.preview_file : "",
          post_category_ids: inputData.post_category_ids
            ? inputData.post_category_ids
            : [],
        })
      );
    } else {
      dispatch(
        saveChannelPostStart({
          channel_slug: props.channel_slug,
          content: editorHtmlContent,
          amount: inputData.amount ? inputData.amount : "",
          post_category_ids: inputData.post_category_ids
            ? inputData.post_category_ids
            : [],
        })
      );
    }
  };

  const setValues = (inputValue) => {
    let user_id_arr = [];
    inputValue.map((value, i) => {
      user_id_arr.push(value.post_category_id);
    });
    setInputData({
      ...inputData,
      post_category_ids: user_id_arr,
    });
  };

  const handleVideopreviewImage = (event) => {
    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setVideoPreview({ ...videoPreview, videoPreviewImage: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setInputData({
        ...inputData,
        preview_file: file,
      });
    }
  };

  return (
    <Transition appear show={props.channelPostModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto md:mt-8"
        onClose={() => props.closeModal()}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-25" />
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
            <div className="inline-block w-full max-w-xl p-6 my-10 overflow-hidden min-h-[450px] text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="div"
                className="flex justify-between text-lg font-medium leading-6 text-gray-900"
              >
                <div onClick={() => props.closeModal()}>
                  <MdClose className="h-7 w-7 cursor-pointer" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1 text-white rounded-lg bg-gradient-to-r  from-lightPlayRed to-playRed hover:from-pink-500 hover:to-yellow-500"
                  onClick={handleSubmit}
                  disabled={
                    fileUpload.buttonDisable || saveChannelPost.buttonDisable
                  }
                >
                  {fileUpload.loadingButtonContent !== null
                    ? fileUpload.loadingButtonContent
                    : saveChannelPost.loadingButtonContent !== null
                    ? saveChannelPost.loadingButtonContent
                    : "POST"}
                </button>
                {/* <Button text="POST" active={true} extraclassNamees="w-24 h-8" /> */}
              </Dialog.Title>
              <div className="mt-2">
                <div className="bg-white rounded-md shadow-sm pl-[1em] border">
                  <div className="PostEditor">
                    <PostEditor
                      className="PostEditor__input"
                      placeholder="Compose New Post ..."
                      refs={mentionsRef}
                      getEditorRawContent={setEditorContentstate}
                      getEditorHtmlContent={setEditorHtmlContent}
                      dispatch={dispatch}
                      // searchUser={props.searchUser}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3 lg:my-4">
                {postCategories.data.post_categories &&
                postCategories.data.post_categories.length > 0 ? (
                  <form className="mb-0 create-post without-ring">
                    <label className="!pl-0 mb-3 lg:mb-3">
                      <p className="text-sm font-light">
                        CATEGORY &#40;OPTIONAL&#41;
                      </p>
                    </label>
                    {postCategories.data.post_categories ? (
                      <Multiselect
                        name="post_category_ids"
                        options={postCategories.data.post_categories}
                        displayValue="name"
                        avoidHighlightFirstOption="true"
                        placeholder="choose category"
                        onSelect={(values) => setValues(values)}
                      />
                    ) : null}
                  </form>
                ) : (
                  ""
                )}
              </div>
              <div className="grid grid-cols-1">
                {paidPost == true ? (
                  <form className="mt-2">
                    <label
                      htmlFor="amount"
                      className="font-light m-1 mb-3 lg:mb-3"
                    >
                      Price (Optional)
                    </label>
                    <input
                      type="number"
                      placeholder="Set price for the post"
                      name="amount"
                      pattern="[0-9]*"
                      min="1"
                      inputMode="numeric"
                      value={inputData.amount || ""}
                      width="100%"
                      id="search_input"
                      className="bg-white rounded-md shadow-md block w-full text-[#495057] border-0 focus:shadow-none"
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          amount: event.currentTarget.value,
                        })
                      }
                    />
                  </form>
                ) : (
                  ""
                )}
                {videoThumbnail === true ? (
                  <>
                    <form className="my-2">
                      <label className="text-muted m-1 mt-3 f-12 text-uppercase mb-3 mb-lg-3">
                        Upload Video Thumbnail (Optional)
                      </label>
                      <input
                        style={{ display: "block" }}
                        type="file"
                        placeholder="Upload Video thumbnail"
                        name="preview_file"
                        width="50%"
                        className="form-control"
                        accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
                        onChange={(event) => handleVideopreviewImage(event)}
                      />
                    </form>
                    {videoPreview.videoPreviewImage !== "" ? (
                      <div className="grid grid-cols-1 mb-3 mb-lg-4">
                        <div className="post-img-preview-sec m-0">
                          <img
                            alt="#"
                            src={videoPreview.videoPreviewImage}
                            className="post-video-preview"
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="row-container space-x-4 my-4">
                <button>
                  <form
                    action="
                  "
                  >
                    <div className="row-container space-x-1 bg-gray-100 h-8 w-[130px] rounded-md relative">
                      <input
                        id="fileupload_photo"
                        type="file"
                        multiple="multiple"
                        disabled={disableImage ? true : false}
                        accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
                        onChange={(event) => handleChangeImage(event, "image")}
                        name="post_files"
                        className="opacity-0 absolute top-0 right-0 w-full h-full text-right bg-white block placeholder:opacity-100"
                      />
                      <label
                        id="attach_file_photo"
                        htmlFor="fileupload_photo"
                        className="chat-attach_file"
                        data-original-title="null"
                      >
                        <div className="row-container">
                          <BiImageAdd className="w-4 h-4" />
                          <span className="text-xs">Upload Images</span>
                        </div>
                      </label>
                    </div>
                  </form>
                </button>
                <button>
                  <form>
                    <div className="row-container space-x-1 bg-gray-100 h-8 w-[130px] rounded-md relative">
                      <label
                        id="attach_file_video"
                        htmlFor="fileupload_video"
                        className="chat-attach_file"
                        data-original-title="null"
                      >
                        <div className="row-container space-x-1">
                          <FaVideo className="w-3 h-3" />
                          <span className="text-xs">Upload Video</span>
                        </div>
                      </label>

                      <input
                        id="fileupload_video"
                        type="file"
                        multiple="multiple"
                        disabled={disableVideo ? true : false}
                        accept="video/mp4,video/x-m4v,video/*"
                        onChange={(event) => handleChangeVideo(event, "video")}
                        name="post_files"
                        className="opacity-0 absolute top-0 right-0 w-full h-full text-right bg-white block placeholder:opacity-100"
                      />
                    </div>
                  </form>
                </button>

                <button>
                  <form action="">
                    <div className="row-container space-x-1 bg-gray-100 h-8 w-[130px] rounded-md relative">
                      <label
                        id="attach_file_audio"
                        htmlFor="fileupload_audio"
                        className="chat-attach_file"
                        data-original-title="null"
                      >
                        <div className="row-container space-x-1">
                          <FaMusic className="w-3 h-3" />
                          <span className="text-xs">Audio Upload</span>
                        </div>
                      </label>

                      <input
                        id="fileupload_audio"
                        type="file"
                        multiple="multiple"
                        disabled={disableAudio ? true : false}
                        accept="audio/mp3,audio/*"
                        onChange={(event) => handleChangeAudio(event, "audio")}
                        name="post_files"
                        className="opacity-0 absolute top-0 right-0 w-full h-full text-right bg-white block placeholder:opacity-100"
                      />
                    </div>
                  </form>
                </button>
                {audioTitle !== "" ? (
                  <div className="post-title-content create-post-video-title">
                    <h4>{audioTitle}</h4>
                  </div>
                ) : null}
              </div>{" "}
              <div>
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 ">
                    {images.map((image, i) => (
                      <div
                        key={i}
                        className="relative row-container my-4 p-4 w-full rounded-[4px]"
                      >
                        <a to="#" onClick={imageClose}>
                          <FaRegTimesCircle className="absolute right-[20px] top-[25px] text-[#f32013] text-[1.3em] font-normal cursor-pointer" />
                        </a>
                        <img
                          alt="#"
                          src={image}
                          className="border-[rgba(0,0,0,0.1)] border-[5px] align-middle w-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                {videoTitle !== "" ? (
                  <div className="post-title-content create-post-video-title">
                    <h4>{videoTitle}</h4>
                  </div>
                ) : null}
                {videoPreviewUrl !== "" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative row-container my-4 p-4 w-full rounded-[4px] my-3 my-lg-4">
                      <video
                        autoPlay
                        controls
                        id="myVideo"
                        className="user-profile1 create-post-video"
                      >
                        <source src={videoPreviewUrl} type="video/mp4" />
                      </video>
                      <a to="#" onClick={videoClose} className="close-video">
                        <FaRegTimesCircle className="absolute right-[20px] top-[25px] text-[#f32013] text-[1.3em] font-normal cursor-pointer" />
                      </a>
                    </div>
                  </div>
                ) : null}
                {audioPreviewUrl !== "" ? (
                  <div className="grid-cols-1 grid">
                    <div className="relative row-container my-4 p-4 w-full rounded-[4px]">
                      <audio controls id="myVideo" className="user-profile1">
                        <source src={audioPreviewUrl} type="audio/mp3" />
                      </audio>
                      <a to="#" onClick={audioClose} className="close-audio">
                        <FaRegTimesCircle className="absolute right-[20px] top-[25px] text-[#f32013] text-[1.3em] font-normal cursor-pointer" />
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChannelPostModal;
