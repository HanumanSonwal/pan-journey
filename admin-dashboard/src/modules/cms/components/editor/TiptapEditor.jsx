"use client";

import { useEffect, useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import { theme } from "antd";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Modal } from "antd";
import TiptapToolbar from "./TiptapToolbar";

export default function TiptapEditor({ value, onChange }) {
  const [fullscreen, setFullscreen] = useState(false);
  const {
    token: { colorBgContainer, colorBorder, colorFillAlter, colorText },
  } = theme.useToken();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Start writing content...",
      }),

      Underline,
      TextStyle,
      Color,
      Highlight,
      HorizontalRule,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value || "",

    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const EditorUI = (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 10,
        overflow: "hidden",
        background: colorBgContainer,
        border: `1px solid ${colorBorder}`,
      }}
    >
      {/* TOOLBAR */}

      <div
        style={{
          borderBottom: "1px solid #eee",
          padding: 12,
          background: colorFillAlter,
        }}
      >
        <TiptapToolbar
          editor={editor}
          onFullscreen={() => setFullscreen(true)}
        />
      </div>

      {/* EDITOR */}

      <EditorContent
        editor={editor}
        style={{
          minHeight: fullscreen ? "70vh" : 320,
          padding: 20,
          fontSize: 16,
          lineHeight: 1.8,
          outline: "none",
        }}
      />
    </div>
  );

  return (
    <>
      {EditorUI}

      {/* FULLSCREEN */}

      <Modal
        open={fullscreen}
        footer={null}
        onCancel={() => setFullscreen(false)}
        width="95vw"
        style={{
          top: 20,
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div
          style={{
            height: "85vh",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #eee",
              padding: 12,
              background: colorFillAlter,
            }}
          >
            <TiptapToolbar editor={editor} />
          </div>

          <EditorContent
            editor={editor}
            style={{
              height: "calc(85vh - 60px)",

              overflowY: "auto",

              padding: 28,

              fontSize: 18,

              lineHeight: 1.9,
            }}
          />
        </div>
      </Modal>
    </>
  );
}
