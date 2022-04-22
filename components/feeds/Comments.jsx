import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {HiOutlineEmojiHappy} from 'react-icons/hi';

import { EditorState, convertToRaw, Modifier } from "draft-js";
import { useSession, getSession } from "next-auth/react";
// import {
//     saveCommentStart,
// } from "../../store/actions/CommentsAction";

import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import PostEditor from "../Post/postMentions/PostEditor";
import { useDispatch } from "react-redux";
const Comments = (props) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [commentActiveIndex, setCommentActiveIndex] = useState(null);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(
      saveCommentStart({
        comment: editorHtmlContent,
        post_id: props.post.post_id,
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
    console.log("one");
    setCommentActiveIndex(props.currentIndex);
  };

  return (
    <div
      className="block w-full px-[10px] py-[10px] bg-white border rounded-2xl mt-8 "
      onFocus={() => focusEditor()}
    >
      <div className="clear-both">
        {/* <div className="flex items-center mt-2">
              <div className="w-10 h-10 relative rounded-full mr-2">
                <Image
                  layout="fill"
                  src={"/profile_avatar_full.jpg"}
                  className="rounded-full"
                  objectFit="cover"
                  alt=""
                />
              </div>
              <form className="bg-gray-100 flex items-center px-2 rounded-2xl flex-1">
                <TextareaAutosize
                  maxLength="1280"
                  rows={1}
                  maxRows={4}
                  placeholder="Add a comment"
                  className="rounded-2xl flex-1 resize-none outline-0 border-none bg-gray-100 text-sm focus:outline-0 ring-0 focus:ring-0"
                />
                <div className="flex space-x-1 items-center justify-center ">
                  <HiOutlineEmojiHappy className="commentBtn" />
                  <div className="relative w-9 h-9 cursor-pointer lg:commentBtn">
                    <Image layout="fill" src="/comment.png" alt="" />
                  </div>
                  <HiPaperAirplane className="commentBtn rotate-90" />
                </div>
              </form>
            </div> */}
        <form className="block w-full" action="" onSubmit={handleCommentSubmit}>
          <div className="inline-block float-left clear-both ">
            <Link className="title-container-1" href={"#"} passHref>
              <div className="relative w-10 h-10 rounded-full max-w-[50px]">
                <Image
                  alt=""
                  src={session.user.userDetails.picture}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </Link>
          </div>
          {commentActiveIndex == props.currentIndex ? (
            <div className="inline-block float-left width-[75%]">
              <PostEditor
                className="PostEditor__input"
                placeholder={t("new_comment_placeholder")}
                ref={mentionsRef}
                getEditorRawContent={setEditorContentstate}
                getEditorHtmlContent={setEditorHtmlContent}
                dispatch={dispatch}
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </div>
          ) : (
            <div className="empty-comment">
              <input
                className="w-full min-w-[505px] border-0 placeholder:text-[1.5em] placeholder:font-normal placeholder:text-[#8a96a3]"
                type="text"
                placeholder="Add comments here ..."
              />
            </div>
          )}
          <ul className="list-unstyled reply-action-icons position-relative">
            <li>
              <button to="#" onClick={handleCommentSubmit}>
                {/* <i className="fas fa-paper-plane"></i> */}
                <div className="relative w-9 h-9 cursor-pointer lg:commentBtn">
                  <Image layout="fill" src="/comment.png" alt="" />
                </div>
              </button>
            </li>
            <li className="m-0">
              <button
                type="button"
                className="g-btn m-rounded emojiButtoon p-0 pr-2"
                onClick={triggerPicker}
              >
               <HiOutlineEmojiHappy className="commentBtn" />
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
    </div>
  );
};

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(Comments));
