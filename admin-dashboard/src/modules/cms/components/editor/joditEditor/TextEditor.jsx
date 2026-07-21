"use client";

import { theme } from "antd";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const TextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  height = 300,
}) => {
  const editor = useRef(null);
  const { token } = theme.useToken();

  const config = useMemo(
    () => ({
      readonly: false,
      height,
      placeholder,

      toolbarAdaptive: false,
      toolbarSticky: false,

      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",

        "paragraph",

        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "|",
        "link",
        "image",
        "table",
        "hr",
        "|",
        "undo",
        "redo",
        "|",
        "copyformat",
        "cut",
        "copy",
        "paste",
        "selectall",
        "|",
        "fullsize",
      ],

      controls: {
        paragraph: {
          list: {
            p: "Paragraph",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            h4: "Heading 4",
            h5: "Heading 5",
            h6: "Heading 6",
            blockquote: "Blockquote",
            pre: "Preformatted",
          },
        },
      },

      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    }),
    [height, placeholder],
  );

  return (
    <div
      style={{
        "--j-bg": token.colorBgContainer,
        "--j-toolbar": token.colorBgElevated,
        "--j-text": token.colorText,
        "--j-border": token.colorBorder,
      }}
    >
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onChange={(newContent) => onChange?.(newContent)}
      />

      <style jsx global>{`
        .jodit-container {
          background: var(--j-bg) !important;
          border-color: var(--j-border) !important;
        }

        .jodit-toolbar__box {
          background: var(--j-toolbar) !important;
          border-color: var(--j-border) !important;
        }

        .jodit-wysiwyg {
          background: var(--j-bg) !important;
          color: var(--j-text) !important;
        }

        .jodit-status-bar {
          background: var(--j-toolbar) !important;
          color: var(--j-text) !important;
          border-color: var(--j-border) !important;
        }

        .jodit-toolbar-button__button {
          color: var(--j-text) !important;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;
