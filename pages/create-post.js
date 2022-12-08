import React from "react";
import SideNavLayout from "../components/SideNavLayout";
import { Dialog } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { MdClose, MdCheck } from "react-icons/md";

import { BiImageAdd } from "react-icons/bi";

import { FaMusic, FaVideo, FaRegTimesCircle } from "react-icons/fa";
import { Multiselect } from "multiselect-react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "reapop";
import {
  fetchPostCategoriesStart,
  savePostStart,
  postFileUploadStart,
  postFileRemoveStart,
} from "../store/slices/postSlice";
import PostEditor from "../components/feeds/PostEditor";
import { getCookie, hasCookie } from "cookies-next";
import { fetchUserDetailsStart } from "../store/slices/userSlice";
import { BsArrowLeft, BsArrowLeftCircle } from "react-icons/bs";
import { Router, useRouter } from "next/router";

const CreatePost = () => {
  const dispatch = useDispatch();

  const savePost = useSelector((state) => state.post.savePost);
  const fileUpload = useSelector((state) => state.post.fileUpload);

  const postCategories = useSelector((state) => state.post.postCategories);
  const [hasText, setHasText] = useState(false);

  const user = useSelector((state) => state.user.profile.data);

  useEffect(() => {
    dispatch(fetchUserDetailsStart());
  }, []);

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


  const [newImages,setNewImages] = useState(null)
 
  const [fileType, setFileType] = useState('image')

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
        
        setNewImages(images)
        setFileType(fileType);
        // dispatch(
        //   postFileUploadStart({
        //     ...files,
        //     file_type: fileType,
        //   })
        // );



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
      if (!event.currentTarget.files[0]) {
        dispatch(notify("file field is required", "error"));
      } else {
        let videos = Array.from(event.currentTarget.files);
       
        setNewImages(videos)
        setFileType(fileType);
      }

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

      let audios = Array.from(event.currentTarget.files);
      // dispatch(
      //   postFileUploadStart({
      //     file: event.currentTarget.files[0],
      //     file_type: fileType,
      //   })
      // );
      setNewImages(audios)
      setFileType(fileType);
      setPaidPost(true);
      setAudioThumbnail(true);
      setDisableImage(true);
      setDisableVideo(true);
    }
  };

  const imageClose = (event, i, file) => {
    event.preventDefault();
    // console.log(fileUpload?.data?.post_file[i]);
    // var file = fileUpload?.data?.post_file[i];
    // var files = fileUpload?.data?.file.split(",");

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
          file: file,
          file_type: "image",
          blur_file: fileUpload?.data.blur_file,
          post_file_id: fileUpload?.data.post_file_id,
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
      if (disableImage && disableAudio && !inputData.preview_file) {
        return dispatch(
          notify({ message: "Please select a video thumbnail", status: "info" })
        );
      }
      dispatch(
        savePostStart({
          content: editorHtmlContent,
          amount: inputData.amount ? inputData.amount : "",
          // post_file_id: fileUpload.data.post_file_id,
          files : newImages,
          preview_file: inputData.preview_file ? inputData.preview_file : "",
          post_category_ids: inputData.post_category_ids
            ? inputData.post_category_ids
            : [],
        })
      );
    } else {
      if (!hasText) {
        return dispatch(  
          notify({
            message: "Please add text or upload content",
            status: "info",
          })
        );
      }
      dispatch(
        savePostStart({
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

  // const [uploadedImages, setUploadedImages] = useState([]);

  // useEffect(() => {
  //   fileUpload.data.file && setUploadedImages(fileUpload.data.file.split(","));
  // }, [fileUpload.data.file]);

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

  const router = useRouter();

  return (
    <SideNavLayout>
      <div className="max-w-4xl mx-auto">
        <div className="inline-block w-full  p-2 md:p-6  my-3 md:my-10 h-auto  md:border text-left align-middle  bg-white md:shadow-2xl md:rounded-2xl">
          <div className="flex justify-between text-lg font-medium leading-6 text-gray-900 mb-2">
            <div onClick={() => router.back()}>
              <BsArrowLeftCircle className="h-7 w-7 cursor-pointer" />
            </div>
            <button
              type="submit"
              className="px-3 py-1 text-white rounded-lg bg-gradient-to-r  from-lightPlayRed to-playRed hover:from-pink-500 hover:to-yellow-500"
              onClick={handleSubmit}
              disabled={fileUpload.buttonDisable || savePost.buttonDisable}
            >
              {fileUpload.loadingButtonContent !== null
                ? fileUpload.loadingButtonContent
                : savePost.loadingButtonContent !== null
                ? savePost.loadingButtonContent
                : "POST"}
            </button>
            {/* <Button text="POST" active={true} extraclassNamees="w-24 h-8" /> */}
          </div>
          <div className="mt-2">
            <div className="bg-white rounded-md shadow-sm pl-[1em] border">
              <div className="PostEditor">
                <PostEditor
                  className="PostEditor__input"
                  placeholder="Compose New Post ..."
                  refs={mentionsRef}
                  getEditorRawContent={setEditorContentstate}
                  getEditorHtmlContent={setEditorHtmlContent}
                  getHasText={setHasText}
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
            {user?.user_account_type &&
            user.user_account_type == 1 &&
            paidPost ? (
              <form className="mt-2">
                <label htmlFor="amount" className="font-light m-1 mb-3 lg:mb-3">
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
                    Upload Video Thumbnail (Required)
                  </label>
                  <input
                    required
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
                  <div className="flex items-center justify-center mb-3 mb-lg-2">
                    <div className="h-[200px] w-[200px] m-0">
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
          <div className="justify-between row-container space-x-1 md:space-x-3  my-4">
            <button className="row-container space-x-1 bg-gray-100 h-8  rounded-md relative">
              <input
                id="fileupload_photo"
                type="file"
                multiple="multiple"
                disabled={disableImage}
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
                <div className="row-container space-x-1 px-2">
                  <BiImageAdd className="w-4 h-4" />
                  <span className="text-xs whitespace-nowrap">
                    Upload Images
                  </span>
                </div>
              </label>
            </button>

            <button className="row-container space-x-1 bg-gray-100 h-8 md:w-[130px] rounded-md relative">
              <label
                id="attach_file_video"
                htmlFor="fileupload_video"
                className="chat-attach_file"
                data-original-title="null"
              >
                <div className="row-container space-x-1 px-2">
                  <FaVideo className="w-3 h-3" />
                  <span className="text-xs whitespace-nowrap">
                    Upload Video
                  </span>
                </div>
              </label>

              <input
                id="fileupload_video"
                type="file"
                // multiple="multiple"
                disabled={disableVideo}
                accept="video/mp4,video/x-m4v,video/*"
                onChange={(event) => handleChangeVideo(event, "video")}
                name="post_files"
                className="opacity-0 absolute top-0 right-0 w-full h-full text-right bg-white block placeholder:opacity-100"
              />
            </button>

            <button className="row-container space-x-1 bg-gray-100 h-8 md:w-[130px] rounded-md relative">
              <label
                id="attach_file_audio"
                htmlFor="fileupload_audio"
                className="chat-attach_file"
                data-original-title="null"
              >
                <div className="row-container space-x-1 px-2">
                  <FaMusic className="w-3 h-3" />
                  <span className="text-xs whitespace-nowrap">
                    Audio Upload
                  </span>
                </div>
              </label>

              <input
                id="fileupload_audio"
                type="file"
                // multiple="multiple"
                disabled={disableAudio}
                accept="audio/mp3,audio/*"
                onChange={(event) => handleChangeAudio(event, "audio")}
                name="post_files"
                className="opacity-0 absolute top-0 right-0 w-full h-full text-right bg-white block placeholder:opacity-100"
              />
            </button>
          </div>
          {audioTitle !== "" ? (
            <div className="post-title-content create-post-video-title">
              <h4>{audioTitle}</h4>
            </div>
          ) : null}
          <div>
            {disableAudio &&
            disableVideo &&
            fileUpload.data.file &&
            fileUpload.data.file.split(",").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                {images.map((image, i) => (
                  <div
                    key={i}
                    className="relative row-container  w-full p-2 rounded-[4px]"
                  >
                    {/* <a
                          to="#"
                          onClick={(event) => imageClose(event, i, image)}
                        >
                          <FaRegTimesCircle className="absolute right-[20px] top-[25px] text-[#f32013] text-[1.3em] font-normal cursor-pointer" />
                        </a> */}
                    <img
                      alt="#"
                      src={image}
                      className="border-[rgba(0,0,0,0.1)] border-[5px] align-middle w-full"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {/* {image.previewImage !== "" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <div className="relative row-container my-4 p-4 w-full rounded-[4px]">
                      <a to="#" onClick={imageClose}>
                        <FaRegTimesCircle className="absolute right-[20px] top-[25px] text-[#f32013] text-[1.3em] font-normal cursor-pointer" />
                      </a>
                      <img
                        alt="#"
                        src={image.previewImage}
                        className="border border-[rgba(0,0,0,0.1)] border-[5px] align-middle w-full"
                      />
                    </div>
                  </div>
                ) : null} */}
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
      </div>
    </SideNavLayout>
  );
};

export default CreatePost;
