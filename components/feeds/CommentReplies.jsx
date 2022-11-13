import { useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { notify } from "reapop";

import Link from "next/link";
// import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import {
  fetchCommentRepliesStart,
  saveCommentRepliesStart,
} from "../../store/slices/commentsSlice";

import PostEditor from "./PostEditor.jsx";
import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { EditorState, convertToRaw, Modifier } from "draft-js";
import { getCookie } from "cookies-next";

const CommentReplies = (props) => {
  const dispatch = useDispatch();
  const commentReplies = useSelector((state) => state.comments.commentReplies);
  const [hasText, setHasText] = useState(false);

  const { comment, commentActiveIndex } = props;
  const avatar = getCookie("picture");

  const [commentReplyInputData, setCommentReplyInputData] = useState({});

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleCommentReplySubmit = (event, comment) => {
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
      saveCommentRepliesStart({
        reply: editorHtmlContent,
        post_id: comment.post_id,
        post_comment_id: comment.post_comment_id,
      })
    );
    setCommentReplyInputData({});
    // dispatch(
    //   fetchCommentRepliesStart({
    //     post_id: comment.post_id,
    //     post_comment_id: comment.post_comment_id,
    //   })
    // );

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

  return (
    <>
      {commentActiveIndex === props.currentIndex &&
        (commentReplies.loading ? (
          "Loading..."
        ) : commentReplies.data.post_comment_replies.length > 0 ? (
          <>
            {commentReplies.data.post_comment_replies.map(
              (comment_reply, index) => (
                <>
                  <div
                    className="reply-box grid grid-cols-8 gap-0 ml-10"
                    key={index}
                  >
                    <div className="relative w-12 h-12 rounded-full ">
                      <Image
                        alt=""
                        src={
                          comment_reply.user_picture !== ""
                            ? comment_reply.user_picture
                            : "https://cms.onlyally.com/placeholder.jpeg"
                        }
                        objectFit="cover"
                        layout="fill"
                        className="rounded-full w-20 h-20"
                      />
                    </div>
                    <div className="reply-user-info col-span-7">
                      <a to={`/${comment_reply.user_displayname}`}>
                        <h5 className="reply-user-name text-gray-900 dark:text-gray-100">
                          {comment_reply.user_displayname}
                        </h5>
                      </a>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            comment_reply.reply != undefined
                              ? comment_reply.reply
                              : "",
                        }}
                        className="reply-message text-xs "
                      ></p>
                      <div className="reply-info-sec">
                        <ul className="list-unstyled reply-info-link">
                          <li>
                            <p className="text-xs text-gray-400 font-medium">
                              {comment_reply.created}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}{" "}
            <div className="clear-both w-full md:w-[80%]  ml-8 md:ml-[15%] !border rounded-full px-0.5">
              <form
                className="w-full flex items-center  mt-0"
                action=""
                onSubmit={handleCommentReplySubmit}
              >
                <div className="inline-block float-left clear-both basis-[10%]">
                  <a className="title-container-1" href="#">
                    <div className="relative w-10 h-10 rounded-full max-w-full">
                      <Image
                        alt=""
                        src={avatar}
                        objectFit="cover"
                        layout="fill"
                        className="rounded-full"
                      />
                    </div>
                  </a>
                </div>

                <div className=" float-left basis-[75%] overflow-hidden !w-[75%] px-1">
                  <PostEditor
                    className="PostEditor__input !whitespace-normal"
                    placeholder={"Write a reply...."}
                    refs={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent={setEditorHtmlContent}
                    getHasText={setHasText}
                    dispatch={dispatch}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>

                <ul className="!relative pl-0 list-none flex items-center my-0 basis-[15%]">
                  <li className="m-0 !mt-0 flex items-start">
                    <button
                      type="button"
                      className="p-0 pr-1"
                      onClick={triggerPicker}
                    >
                      <HiOutlineEmojiHappy className="w-8 h-8 text-lightPlayRed dark:text-white" />
                    </button>
                  </li>
                  <li className="mt-0  flex items-start">
                    <button
                      to="#"
                      onClick={(event) =>
                        handleCommentReplySubmit(event, comment)
                      }
                      className="rounded-full h-10 w-[80px] bg-lightPlayRed"
                    >
                      {/* <i className="fas fa-paper-plane"></i> */}
                      <span className="text-sm font-semibold text-white">
                        POST
                      </span>
                    </button>
                  </li>
                  {emojiPickerState && (
                    <div className="emojiWrapper">
                      <Picker
                        title=""
                        emoji="point_up"
                        onSelect={(emoji) => handleEmojiSelect(emoji)}
                      />
                    </div>
                  )}
                </ul>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="clear-both md:w-[80%]  ml-8 md:ml-[15%] !border rounded-full px-0.5">
              <form
                className="w-full flex items-center  mt-0"
                action=""
                onSubmit={handleCommentReplySubmit}
              >
                <div className="inline-block float-left clear-both basis-[15%]">
                  <a className="title-container-1" href="#">
                    <div className="relative w-10 h-10 rounded-full max-w-full">
                      <Image
                        alt=""
                        src={avatar}
                        objectFit="cover"
                        layout="fill"
                        className="rounded-full"
                      />
                    </div>
                  </a>
                </div>

                <div className="inline-block float-left basis-[65%]">
                  <PostEditor
                    className="PostEditor__input"
                    placeholder={"Write a reply...."}
                    refs={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent={setEditorHtmlContent}
                    dispatch={dispatch}
                    getHasText={setHasText}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>

                <div className="!relative pl-0 list-none flex items-center my-0 basis-[15%]">
                  <div className="m-0 !mt-0 flex items-start">
                    <button
                      type="button"
                      className="p-0 pr-1"
                      onClick={triggerPicker}
                    >
                      <HiOutlineEmojiHappy className="w-8 h-8 text-lightPlayRed dark:text-white" />
                    </button>
                  </div>
                  <div className="mt-0  flex items-start">
                    <button
                      to="#"
                      onClick={(event) =>
                        handleCommentReplySubmit(event, comment)
                      }
                      className="rounded-full h-10 w-[80px] bg-lightPlayRed"
                    >
                      {/* <i className="fas fa-paper-plane"></i> */}
                      <span className="text-sm font-semibold text-white">
                        POST
                      </span>
                    </button>
                  </div>
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
          </>
        ))}
    </>
  );
};

// const mapStateToPros = (state) => ({
//   commentReplies: state.comment.commentReplies,
// });

// function mapDispatchToProps(dispatch) {
//   return { dispatch };
// }

export default CommentReplies;
