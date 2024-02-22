// import React, { useState, useRef } from "react";
// import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js";
// import "../../src/styles/richTextEditor.css";
// import "../../node_modules/draft-js/dist/Draft.css";

// const RichTextEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const editorRef = useRef(null);

//   const focusEditor = () => {
//     if (editorRef.current) {
//       editorRef.current.focus();
//     }
//   };

//   const onChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleKeyCommand = (command) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       onChange(newState);
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const mapKeyToEditorCommand = (e) => {
//     if (e.keyCode === 9 /* TAB */) {
//       const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
//       if (newEditorState !== editorState) {
//         onChange(newEditorState);
//       }
//       return;
//     }
//     return getDefaultKeyBinding(e);
//   };

//   const toggleBlockType = (blockType) => {
//     onChange(RichUtils.toggleBlockType(editorState, blockType));
//   };

//   const toggleInlineStyle = (inlineStyle) => {
//     onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
//   };

//   // Custom overrides for "code" style.
//   const styleMap = {
//     CODE: {
//       backgroundColor: "rgba(0, 0, 0, 0.05)",
//       fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//       fontSize: 16,
//       padding: 2,
//     },
//   };

//   const getBlockStyle = (block) => {
//     switch (block.getType()) {
//       case "blockquote":
//         return "RichEditor-blockquote";
//       default:
//         return null;
//     }
//   };

//   const BlockStyleControls = (props) => {
//     const selection = editorState.getSelection();
//     const blockType = editorState
//       .getCurrentContent()
//       .getBlockForKey(selection.getStartKey())
//       .getType();

//     return (
//       <div className="RichEditor-controls">
//         {BLOCK_TYPES.map((type) => (
//           <StyleButton
//             key={type.label}
//             active={type.style === blockType}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//           />
//         ))}
//       </div>
//     );
//   };

//   const INLINE_STYLES = [
//     { label: "Bold", style: "BOLD" },
//     { label: "Italic", style: "ITALIC" },
//     { label: "Underline", style: "UNDERLINE" },
//     { label: "Monospace", style: "CODE" },
//   ];

//   const InlineStyleControls = (props) => {
//     const currentStyle = editorState.getCurrentInlineStyle();

//     return (
//       <div className="RichEditor-controls">
//         {INLINE_STYLES.map((type) => (
//           <StyleButton
//             key={type.label}
//             active={currentStyle.has(type.style)}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="RichEditor-root">
//       <BlockStyleControls
//         editorState={editorState}
//         onToggle={toggleBlockType}
//       />
//       <InlineStyleControls
//         editorState={editorState}
//         onToggle={toggleInlineStyle}
//       />
//       <div className="RichEditor-editor" onClick={focusEditor}>
//         <Editor
//           blockStyleFn={getBlockStyle}
//           customStyleMap={styleMap}
//           editorState={editorState}
//           handleKeyCommand={handleKeyCommand}
//           keyBindingFn={mapKeyToEditorCommand}
//           onChange={onChange}
//           placeholder="Tell a story..."
//           ref={editorRef}
//           spellCheck={true}
//         />
//       </div>
//     </div>
//   );
// };

// const StyleButton = ({ active, label, onToggle, style }) => {
//   let className = "RichEditor-styleButton";
//   if (active) {
//     className += " RichEditor-activeButton";
//   }

//   const onToggleStyle = (e) => {
//     e.preventDefault();
//     onToggle(style);
//   };

//   return (
//     <span className={className} onMouseDown={onToggleStyle}>
//       {label}
//     </span>
//   );
// };

// const BLOCK_TYPES = [
//   { label: "H1", style: "header-one" },
//   { label: "H2", style: "header-two" },
//   { label: "H3", style: "header-three" },
//   { label: "H4", style: "header-four" },
//   { label: "H5", style: "header-five" },
//   { label: "H6", style: "header-six" },
//   { label: "Blockquote", style: "blockquote" },
//   { label: "UL", style: "unordered-list-item" },
//   { label: "OL", style: "ordered-list-item" },
//   { label: "Code Block", style: "code-block" },
// ];

// export default RichTextEditor;

import "./richTextEditor.css";
// import React, { useState, useEffect } from "react";
// import {
//   Editor,
//   EditorState,
//   getDefaultKeyBinding,
//   Modifier,
//   SelectionState,
//   RichUtils,
//   convertToRaw,
//   convertFromRaw,
// } from "draft-js";
// import "draft-js/dist/Draft.css";

// const styleMap = {
//   BOLD: {
//     fontWeight: "bold",
//   },
//   "RED-LINE": {
//     color: "red",
//   },
// };

// const MyEditor = () => {
//   const [editorState, setEditorState] = useState(() => {
//     // Load saved content from localStorage
//     const savedContent = localStorage.getItem("editorContent");
//     if (savedContent) {
//       const contentState = convertFromRaw(JSON.parse(savedContent));
//       return EditorState.createWithContent(contentState);
//     }
//     return EditorState.createEmpty();
//   });

//   useEffect(() => {
//     const contentState = editorState.getCurrentContent();
//     const rawContentState = convertToRaw(contentState);
//     localStorage.setItem("editorContent", JSON.stringify(rawContentState));
//   }, [editorState]);

//   const onChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleKeyCommand = (command, editorState) => {
//     if (command === "heading") {
//       const contentState = editorState.getCurrentContent();
//       const selectionState = editorState.getSelection();
//       const blockKey = selectionState.getStartKey();
//       const block = contentState.getBlockForKey(blockKey);
//       const blockText = block.getText();

//       if (blockText.startsWith("# ")) {
//         // Toggle heading on
//         const newEditorState = RichUtils.toggleBlockType(
//           editorState,
//           "header-one"
//         );
//         // Remove "#" from the beginning of the line
//         const contentStateWithRemovedHash = Modifier.replaceText(
//           newEditorState.getCurrentContent(),
//           new SelectionState({
//             anchorKey: blockKey,
//             anchorOffset: 0,
//             focusKey: blockKey,
//             focusOffset: 2,
//           }),
//           ""
//         );
//         onChange(
//           EditorState.push(
//             newEditorState,
//             contentStateWithRemovedHash,
//             "remove-hash"
//           )
//         );
//       }
//       return "handled";
//     } else if (command === "bold") {
//       const contentState = editorState.getCurrentContent();
//       const selectionState = editorState.getSelection();
//       const blockKey = selectionState.getStartKey();
//       const block = contentState.getBlockForKey(blockKey);
//       const blockText = block.getText();

//       if (blockText.startsWith("* ")) {
//         // Toggle bold on
//         const newEditorState = RichUtils.toggleInlineStyle(editorState, "BOLD");
//         // Remove "*" from the beginning of the line
//         const contentStateWithRemovedAsterisk = Modifier.replaceText(
//           newEditorState.getCurrentContent(),
//           new SelectionState({
//             anchorKey: blockKey,
//             anchorOffset: 0,
//             focusKey: blockKey,
//             focusOffset: 2,
//           }),
//           ""
//         );
//         onChange(
//           EditorState.push(
//             newEditorState,
//             contentStateWithRemovedAsterisk,
//             "remove-asterisk"
//           )
//         );
//         return "handled";
//       }
//     } else if (command === "red-line") {
//       const contentState = editorState.getCurrentContent();
//       const selectionState = editorState.getSelection();
//       const blockKey = selectionState.getStartKey();
//       const block = contentState.getBlockForKey(blockKey);
//       const blockText = block.getText();

//       if (blockText.startsWith("** ")) {
//         // Toggle red line on
//         const newEditorState = RichUtils.toggleInlineStyle(
//           editorState,
//           "RED-LINE"
//         );
//         // Remove "** " from the beginning of the line
//         const contentStateWithRemovedDoubleAsterisk = Modifier.replaceText(
//           newEditorState.getCurrentContent(),
//           new SelectionState({
//             anchorKey: blockKey,
//             anchorOffset: 0,
//             focusKey: blockKey,
//             focusOffset: 3,
//           }),
//           ""
//         );
//         // Apply red color to the text
//         const contentStateWithRedColor = Modifier.applyInlineStyle(
//           contentStateWithRemovedDoubleAsterisk,
//           selectionState,
//           "RED-LINE"
//         );
//         onChange(
//           EditorState.push(
//             newEditorState,
//             contentStateWithRedColor,
//             "remove-double-asterisk"
//           )
//         );
//         return "handled";
//       }
//     } else if (command === "underline") {
//       const contentState = editorState.getCurrentContent();
//       const selectionState = editorState.getSelection();
//       const blockKey = selectionState.getStartKey();
//       const block = contentState.getBlockForKey(blockKey);
//       const blockText = block.getText();

//       if (blockText.startsWith("*** ")) {
//         // Toggle underline on
//         const newEditorState = RichUtils.toggleInlineStyle(
//           editorState,
//           "UNDERLINE"
//         );
//         // Remove "*** " from the beginning of the line
//         const contentStateWithRemovedTripleAsterisk = Modifier.replaceText(
//           newEditorState.getCurrentContent(),
//           new SelectionState({
//             anchorKey: blockKey,
//             anchorOffset: 0,
//             focusKey: blockKey,
//             focusOffset: 4,
//           }),
//           ""
//         );
//         onChange(
//           EditorState.push(
//             newEditorState,
//             contentStateWithRemovedTripleAsterisk,
//             "remove-triple-asterisk"
//           )
//         );
//         return "handled";
//       }
//     }
//     return "not-handled";
//   };

//   const keyBindingFn = (e) => {
//     if (e.keyCode === 32 /* Space */) {
//       const selectionState = editorState.getSelection();
//       const contentState = editorState.getCurrentContent();
//       const blockKey = selectionState.getStartKey();
//       const block = contentState.getBlockForKey(blockKey);
//       const blockText = block.getText();

//       if (blockText.startsWith("# ")) {
//         return "heading";
//       } else if (blockText.startsWith("* ")) {
//         return "bold";
//       } else if (blockText.startsWith("** ")) {
//         return "red-line";
//       } else if (blockText.startsWith("*** ")) {
//         return "underline";
//       }
//     }
//     return getDefaultKeyBinding(e);
//   };

//   const handleSave = () => {
//     const contentState = editorState.getCurrentContent();
//     const rawContentState = convertToRaw(contentState);
//     localStorage.setItem("editorContent", JSON.stringify(rawContentState));
//   };

//   return (
// <div className="container">
//   <h2 className="title">Demo Editor By (Het Patel)</h2>
//   <button className="save-button" onClick={handleSave}>
//     Save
//   </button>
//       <div className="editor-container">
//         <Editor
//           editorState={editorState}
//           onChange={onChange}
//           handleKeyCommand={handleKeyCommand}
//           keyBindingFn={keyBindingFn}
//           placeholder="Start typing..."
//           customStyleMap={styleMap}
//           className="editor"
//         />
//       </div>
//     </div>
//   );
// };

// export default MyEditor;

import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  // RichUtils,
  convertFromRaw,
  convertToRaw,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./richTextEditor.css";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContentState));
  }, [editorState]);

  const myKeyBindingFn = (e) => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const currentBlock = editorState
      .getCurrentContent()
      .getBlockForKey(startKey);
    const blockText = currentBlock.getText();
    const charsBeforeCursor = blockText.slice(0, startOffset);

    if (charsBeforeCursor.startsWith("#") && e.key === " ") {
      return "header-one";
    } else if (charsBeforeCursor.startsWith("***") && e.key === " ") {
      return "underline";
    } else if (charsBeforeCursor.startsWith("**") && e.key === " ") {
      return "red-line";
    } else if (charsBeforeCursor.startsWith("*") && e.key === " ") {
      return "bold";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKey = (command) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockText = block.getText();

    if (command === "header-one") {
      const newContentState = Modifier.setBlockType(
        contentState,
        selectionState.merge({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: 0,
          focusOffset: blockText.length,
          isBackward: false,
        }),
        "header-one"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-block-type"
      );
      setEditorState(newEditorState);
      return "handled";
    } else if (
      command === "bold" ||
      command === "red-line" ||
      command === "underline"
    ) {
      let blockType, blockClass;
      switch (command) {
        case "bold":
          blockType = "bold";
          blockClass = "bold-block";
          break;
        case "red-line":
          blockType = "red-line";
          blockClass = "red-line-block";
          break;
        case "underline":
          blockType = "underline";
          blockClass = "underline-block";
          break;
        default:
          return "not-handled";
      }

      // Check if * or ** or *** has been removed from the end of the block text
      if (blockText.match(/(?:\*{1,3})$/) !== null) {
        const newContentState = Modifier.setBlockType(
          contentState,
          selectionState.merge({
            anchorKey: blockKey,
            focusKey: blockKey,
            anchorOffset: 0,
            focusOffset: blockText.length,
            isBackward: false,
          }),
          blockType
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "change-block-type"
        );
        setEditorState(newEditorState);

        // Add class to the block
        const blockElement = document.querySelector(
          `[data-offset-key="${blockKey}-0-0"]`
        );
        if (blockElement) {
          blockElement.classList.add(blockClass);
        }

        return "handled";
      }
    }

    return "not-handled";
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContentState));
  };

  const styleMap = {
    BOLD: {
      fontWeight: "bold",
    },
    "RED-LINE": {
      color: "red",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
  };

  return (
    <div className="container">
      <h2 className="title">Demo Editor By (Het Patel)</h2>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          keyBindingFn={myKeyBindingFn}
          handleKeyCommand={handleKey}
          placeholder="Start typing..."
          customStyleMap={styleMap}
          className="editor"
        />
      </div>
    </div>
  );
};

export default MyEditor;
