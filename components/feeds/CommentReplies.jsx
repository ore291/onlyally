import { useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
// import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import {
  fetchCommentRepliesStart,
  saveCommentReplyStart,
} from "../../store/slices/commentsSlice";

import "react-image-lightbox/style.css";
import PostEditor from "./PostEditor.jsx";
import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { EditorState, convertToRaw, Modifier } from "draft-js";

const CommentReplies = (props) => {
  const dispatch = useDispatch();
  const commentReplies = useSelector(state => state.comments.commentReplies)
  const { comment, commentActiveIndex } = props;

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
    dispatch(
      saveCommentReplyStart({
        reply: editorHtmlContent,
        post_id: comment.post_id,
        post_comment_id: comment.post_comment_id,
      })
    );
    setCommentReplyInputData({});
    dispatch(
      fetchCommentRepliesStart({
        post_id: comment.post_id,
        post_comment_id: comment.post_comment_id,
      })
    );
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
      {commentActiveIndex == props.currentIndex &&
        (commentReplies.loading ? (
          "Loading..."
        ) : commentReplies.data.post_comment_replies.length > 0 ? (
          <>
            {commentReplies.data.post_comment_replies.map(
              (comment_reply, index) => (
                <>
                  <div className="reply-box" key={index}>
                    <div className="reply-user-img-sec">
                      {/* <Image

                        src={window.location.origin + "/assets/images/user.png"}
                        alt=""
                        className="reply-user-img"
                      /> */}
                    </div>
                    <div className="reply-user-info">
                      <a to="#">
                        <h4 className="reply-user-name">
                          {comment_reply.user_displayname}
                        </h4>
                      </a>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            comment_reply.reply != undefined
                              ? comment_reply.reply
                              : "",
                        }}
                        className="reply-message"
                      ></p>
                      <div className="reply-info-sec">
                        <ul className="list-unstyled reply-info-link">
                          <li>
                            <p>{comment_reply.created}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}{" "}
            <div className="reply-text-field">
              <div className="reply-user-img-sec">
                {/* <Image
                  src={window.location.origin + "/assets/images/user.png"}
                  alt=""
                  className="reply-user-img"
                /> */}
              </div>

              <form
                className="form-inline"
                action=""
                onSubmit={handleCommentReplySubmit}
              >
                <div className="form-reply">
                  {/* <Form.Control
							type="text"
							placeholder="Write a reply"
							id="reply"
							name="reply"
							value={commentReplyInputData.reply}
							onChange={(event) =>
								setCommentReplyInputData({
									...commentReplyInputData,
									reply: event.currentTarget.value,
									post_id: comment.post_id,
									post_comment_id: comment.post_comment_id,
								})
							}
						/> */}
                  <PostEditor
                    className="PostEditor__input"
                    placeholder="Write a reply"
                    ref={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent={setEditorHtmlContent}
                    dispatch={dispatch}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>
              </form>
              <div className="form-reply-right-icons">
                <ul className="list-unstyled reply-action-icons">
                  <li>
                    <a
                      to="#"
                      onClick={(event) =>
                        handleCommentReplySubmit(event, comment)
                      }
                    >
                      {/* <i className="fas fa-paper-plane"></i> */}
                      {/* <Image
                      alt=""
                        className="comment-send-icon"
                        src={
                          window.location.origin +
                          "/assets/images/icons/comment-send-icon.png"
                        }
                      /> */}
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="g-btn m-rounded emojiButtoon p-0 pr-2"
                      onClick={triggerPicker}
                    >
                      <i className="far fa-smile"></i>
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
                  {/* <Media as="li">
										<Link to="#">
											<i className="far fa-smile"></i>
										</Link>
									</Media> */}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="reply-text-field">
              <div className="reply-user-img-sec">
                {/* <Image
                  src={window.location.origin + "/assets/images/user.png"}
                  alt=""
                  className="reply-user-img"
                /> */}
              </div>
              <form
                className="form-inline"
                action=""
                onSubmit={handleCommentReplySubmit}
              >
                <div className="form-reply">
                  <PostEditor
                    className="PostEditor__input"
                    placeholder="Write a reply"
                    ref={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent={setEditorHtmlContent}
                    dispatch={props.dispatch}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>
              </form>
              <div className="form-reply-right-icons">
                <ul className="list-unstyled reply-action-icons">
                  <li>
                    <a
                      to="#"
                      onClick={(event) =>
                        handleCommentReplySubmit(event, comment)
                      }
                    >
                      <i className="fas fa-paper-plane"></i>
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="g-btn m-rounded emojiButtoon p-0 pr-2"
                      onClick={triggerPicker}
                    >
                      <i className="far fa-smile"></i>
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
                  {/* <Media as="li">
													<Link to="#">
														<i className="far fa-smile"></i>
													</Link>
												</Media> */}
                </ul>
              </div>
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
