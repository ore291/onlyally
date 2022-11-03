import React, { useState, useRef, useCallback } from "react";
import { searchUserStart } from "../../store/slices/homeSlice";
import {
  EditorState,
  convertToRaw,
  Modifier,
  CompositeDecorator,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";
import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect } from "react";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/linkify/lib/plugin.css";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import createLinkDetectionPlugin from "draft-js-link-detection-plugin";

const linkDetectionPlugin = createLinkDetectionPlugin();

const hashtagPlugin = createHashtagPlugin();

const linkifyPlugin = createLinkifyPlugin();
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [
  mentionPlugin,
  linkifyPlugin,
  hashtagPlugin,
  linkDetectionPlugin,
];

const PostEditor = (props) => {
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.home.searchUser);
  const [suggestions, setSuggestions] = useState([]);

  const [mentions, setMentions] = useState([]);
  const [open, setOpen] = useState(false);

  const [focusStyle, setFocusStyle] = useState(false);

  // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

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
      if (entity.type === "LINK") {
        return `<a   style="color : #3b5998; text-decoration : underline;"  href="${entity.data.url}" target="_blank">${text}</a>`;
      } else if (entity.type === "mention") {
        return `<a style="color : red;" href="${host}/${entity.data.mention.link}">${text}</a>`;
      } else {
        return;
      }
    };

    // const customEntityTransform = (entity, text) => {
    //   if (entity.type !== 'LINK' || entity.type !== 'mention') return;

    //   if (entity.type === "mention") return `<a style="color : red;" href="${host}/${entity.data.mention.link}">${text}</a>`;

    //   if(entity.type === "LINK") return `<a  href="${entity.data.url}" target="_blank">${text}</a>`;
    // };

    // style="color : #3b5998; text-decoration : underline;"

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
    // console.log(value);

    let fetchedData = searchUser.data.users;

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

    searchUser.data.users && setMentions(newData);

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
    const contentState = props.editorState
      ? props.editorState.getCurrentContent()
      : editorState.getCurrentContent();

    props.getHasText != undefined &&
      props.getHasText(
        contentState.hasText() &&
          contentState.getPlainText().trim().length !== 0
      );
    // console.log(contentState.hasText() && contentState.getPlainText().trim().length !== 0)
    props.setEditorState != undefined
      ? props.setEditorState(editorState)
      : setEditorState(editorState);
    props.getEditorHtmlContent(tohtml());
  };

  return (
    <div
      onFocus={() => focusEditor()}
      onBlur={() => blurEditor()}
      className={
        focusStyle
          ? "hasFocus active dark:!text-white"
          : "hasFocus dark:!text-white"
      }
    >
      <Editor
        ref={editor}
        editorState={
          props.editorState != undefined ? props.editorState : editorState
        }
        plugins={plugins}
        onChange={(editorState) => handleChange(editorState)}
        placeholder={props.placeholder ? props.placeholder : "Create New Post"}
      ></Editor>
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        onSearchChange={onSearchChange}
        suggestions={mentions}
        onAddMention={onAddMention}
      />
    </div>
  );
};

export default PostEditor;
