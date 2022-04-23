import React, { useState, useRef } from "react";
import { EditorState, convertToRaw, Modifier } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import { connect } from "react-redux";
// import { searchUserStart } from "../../../store/actions/HomeAction";
import { stateToHTML } from "draft-js-export-html";
import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect } from "react";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/linkify/lib/plugin.css";
import draftToHtml from "draftjs-to-html";
import {useDispatch} from 'react-redux';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin, linkifyPlugin, hashtagPlugin];

const PostEditor = (props) => {

  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);

  const [mentions, setMentions] = useState([]);

  const [focusStyle, setFocusStyle] = useState(false);

  // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (props.editorState) {
      const content = convertToRaw(
        props.editorState.getCurrentContent()
      ).blocks;
      props.getEditorRawContent(
        content
          .map((block) => (!block.text.trim() && "\n") || block.text)
          .join("\n")
      );
      props.getEditorHtmlContent(tohtml());
    }
  }, []);

  const editor = useRef(null);

  const tohtml = () => {
    const contentState = props.editorState
      ? props.editorState.getCurrentContent()
      : editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    var host = window.location.origin;


    const hashConfig = {
      trigger: "#",
      separator: " ",
    };

    const customEntityTransform = (entity, text) => {
      if (entity.type !== "mention") return;
      return `<a href="${host}/${entity.data.mention.link}">${text}</a>`;
    };

    const rawContentState = raw;

    return draftToHtml(
      rawContentState,
      hashConfig,
      false,
      customEntityTransform
    );

  };

  // Check editor text for mentions
  const onSearchChange = ({ value }) => {
    dispatch(searchUserStart({ key: value }));
    console.log(value);

    let fetchedData = props.searchUser.data.users;

    var newData = [];

    fetchedData &&
      fetchedData.map((user) =>
        newData.push({
          id: user.user_id,
          name: `@${user.name}`,
          link: user.user_unique_id,
          avatar: user.picture,
        })
      );

    // console.log(newData)

    props.searchUser.data.users && setMentions(newData);

    setSuggestions(defaultSuggestionsFilter(value, mentions));
  };

  const onAddMention = () => {};

  // Focus on editor window
  const focusEditor = () => {
    // editor.current.focus();
    setFocusStyle(true);
  };

  //blur handler
  const blurEditor = () => {
    setFocusStyle(false);
  };

  const handleChange = (editorState) => {
    props.setEditorState != undefined
      ? props.setEditorState(editorState)
      : setEditorState(editorState);
    props.getEditorHtmlContent(tohtml());
  };

  return (
    <div
      onFocus={() => focusEditor()}
      onBlur={() => blurEditor()}
      className={focusStyle ? "hasFocus active" : "hasFocus"}
    >
      <Editor
        ref={editor}
        editorState={
          props.editorState != undefined ? props.editorState : editorState
        }
        plugins={plugins}
        onChange={(editorState) => handleChange(editorState)}
        placeholder={
          props.placeholder ? props.placeholder : t("new_post_placeholder")
        }
      ></Editor>
      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={mentions}
        onAddMention={onAddMention}
      />
    </div>
  );
};

// const mapStateToPros = (state) => ({
//   searchUser: state.home.searchUser,
// });
// const mapDispatchToProps = (dispatch) => {
//   return { dispatch };
// };

export default PostEditor;
