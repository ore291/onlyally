import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import { EditorState, convertToRaw, Modifier } from "draft-js";
import { useSelector } from "react-redux";
import {
  saveCommentStart,
  fetchCommentsStart,
} from "../../store/slices/commentsSlice";

import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import PostEditor from "./PostEditor";
import { useDispatch } from "react-redux";
import { notify } from "reapop";

const Comments = ({ post, currentIndex }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loginData);
  const [hasText, setHasText] = useState(false);

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [commentActiveIndex, setCommentActiveIndex] = useState(null);

  const [userPicture, setUserPicture] = useState("");

  useEffect(() => {
    setUserPicture(localStorage.getItem("user_picture"));
  }, []);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!hasText) {
      return dispatch(
        notify({
          message: "Please add text or upload content",
          status: "info",
        })
      );
    }
    dispatch(
      saveCommentStart({
        comment: editorHtmlContent,
        post_id: post.post_id,
      })
    );

    // setCommentInputData({});
    setEditorState(EditorState.createEmpty());
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    setEditorState(insertCharacter(emoji.native, editorState));
  };

  const handleCommentActiveIndex = (index) => {
    setCommentActiveIndex(index);
  };

  const insertCharacter = (emoji, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const newContent = Modifier.insertText(
      currentContent,
      currentSelection,
      emoji
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );

    return EditorState.forceSelection(
      newEditorState,
      newContent.getSelectionAfter()
    );
  };

  const focusEditor = () => {
    setCommentActiveIndex(currentIndex);
  };

  return (
    <div
      className="block w-full md:w-[95%] mx-auto px-[3px]  bg-white dark:!bg-[#17212D] border rounded-full mt-2 "
      onFocus={() => focusEditor()}
    >
      <form
        className="w-full flex items-center  mt-0"
        action=""
        onSubmit={handleCommentSubmit}
      >
        <div className="inline-block  clear-both basis-[15%]">
          <a className="title-container-1" href="#">
            <div className="relative w-10 h-10 rounded-full max-w-full">
              <Image
                alt=""
                src={
                  userPicture ||
                  user.picture ||
                  "https://cms.onlyally.com/placeholder.jpeg"
                }
                objectFit="cover"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </a>
        </div>
        {commentActiveIndex == currentIndex ? (
          <div className="inline-block float-left basis-[70%] dark:text-gray-900">
            <PostEditor
              className="PostEditor__input !whitespace-normal"
              placeholder={"Add comments here...."}
              refs={mentionsRef}
              getEditorRawContent={setEditorContentstate}
              getEditorHtmlContent={setEditorHtmlContent}
              getHasText={setHasText}
              dispatch={dispatch}
              editorState={editorState}
              setEditorState={setEditorState}
              // userSelect="none"
              // contentEditable={false}
            />
          </div>
        ) : (
          <div className="empty-comment basis-[70%] my-[2px]  dark:!bg-[#17212D]">
            <input
              className="border-none ring-0 border-0 w-full dark:!bg-[#17212D] placeholder:dark:text-gray-100"
              type="text"
              placeholder="Add comments here ..."
            />
          </div>
        )}
        <div className="!relative pl-0  flex items-center my-0 basis-[15%]">
          <div className="m-0 !mt-0 flex items-start">
            <button type="button" className="p-0 pr-1" onClick={triggerPicker}>
              <HiOutlineEmojiHappy className="w-8 h-8 text-lightPlayRed dark:text-white" />
            </button>
          </div>

          <button
            className="rounded-full h-10 w-[80px] bg-lightPlayRed"
            to="#"
            onClick={() => handleCommentSubmit}
          >
            <span className="text-sm font-semibold text-white">POST</span>
          </button>

          {emojiPickerState && (
            <div className="emojiWrapper">
              <Picker
                title=""
                emoji="point_up"
                onSelect={(emoji) => handleEmojiSelect(emoji)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Comments;
