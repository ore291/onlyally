import React from "react";
import SideNavLayout from "../../../components/SideNavLayout";
import { Dialog } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { MdClose, MdCheck } from "react-icons/md";

import { Multiselect } from "multiselect-react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "reapop";
import {
  fetchPostCategoriesStart,
  editPostStart,
  fetchSinglePostStart,
} from "../../../store/slices/postSlice";
import PostEditor from "../../../components/feeds/PostEditor";
import { getCookie, hasCookie } from "cookies-next";
import { stateFromHTML } from "draft-js-import-html";

import { BsArrowLeft, BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import CommonCenterLoader from "../../../components/helpers/CommonCenterLoader";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";

const EditPost = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state.post.singlePost);
  const { post } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    dispatch(
      fetchSinglePostStart({
        post_unique_id: post,
      })
    );
  }, [router.isReady, post]);

  const savePost = useSelector((state) => state.post.savePost);
  const fileUpload = useSelector((state) => state.post.fileUpload);

  const postCategories = useSelector((state) => state.post.postCategories);
  const [hasText, setHasText] = useState(false);

  // new addditions

  const [inputData, setInputData] = useState({});

  const [image, setImage] = useState({ previewImage: "" });
  const [paidPost, setPaidPost] = useState(false);

  const [contentState, setContentState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (!singlePost.data.post) return;

    setContentState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(singlePost.data.post.content)
        )
      )
    );

    setInputData({ ...inputData, amount: singlePost.data.post.amount });
  }, [singlePost.data]);

  const [fileUploadStatus, setFileUploadStatus] = useState(false);

  const [videoThumbnail, setVideoThumbnail] = useState(false);

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [disableImage, setDisableImage] = useState(false);

  const [videoPreview, setVideoPreview] = useState({ videoPreviewImage: "" });

  useEffect(() => {
    dispatch(fetchPostCategoriesStart());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      editPostStart({
        post_id: singlePost.data.post.post_id,
        content: editorHtmlContent,
        amount: inputData.amount ? inputData.amount : "",
        post_category_ids: inputData.post_category_ids
          ? inputData.post_category_ids
          : [],
      })
    );
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

  if (!router.isReady) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <CommonCenterLoader />
      </div>
    );
  }

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
            {singlePost.loading ? (
              <p>Loading....</p>
            ) : (
              <div className="bg-white rounded-md shadow-sm pl-[1em] border">
                <div className="PostEditor">
                  {contentState !== null && (
                    <PostEditor
                      editorState={contentState}
                      className="PostEditor__input"
                      placeholder="Compose New Post ..."
                      refs={mentionsRef}
                      setEditorState={setContentState}
                      getEditorRawContent={setEditorContentstate}
                      getEditorHtmlContent={setEditorHtmlContent}
                      getHasText={setHasText}
                      dispatch={dispatch}
                      // searchUser={props.searchUser}
                    />
                  )}
                </div>{" "}
              </div>
            )}
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
            {singlePost.data.post ? (
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
                  defaultValue={singlePost.data.post.amount > 0 ? singlePost.data.post.amount : ""}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 ">
              {singlePost.data.post &&
                singlePost.data.post?.postFiles.map((image, i) => (
                  <div
                    key={i}
                    className="relative row-container  w-full p-2 rounded-[4px]"
                  >
                    {image.file_type === "image" ? (
                      <img
                        alt="#"
                        src={image.post_file}
                        className="border-[rgba(0,0,0,0.1)] border-[5px] align-middle w-full"
                      />
                    ) : image.file_type === "video" ? (
                      <video width="320" height="240" controls>
                        <source src={image.post_file} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </SideNavLayout>
  );
};

export default EditPost;
