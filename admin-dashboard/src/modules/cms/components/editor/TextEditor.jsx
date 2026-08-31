"use client";

import { useEffect, useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import { Modal, theme } from "antd";

import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

import Image from "@tiptap/extension-image";

import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";

import TiptapToolbar from "./TiptapToolbar";

export default function TextEditor({ value = "", onChange }) {
  const [fullscreen, setFullscreen] = useState(false);

  const { token } = theme.useToken();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      Placeholder.configure({
        placeholder: "Start writing content...",
      }),

      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      HorizontalRule,

      Image.configure({
        inline: false,
        allowBase64: false,
      }),

      Table.configure({
        resizable: true,
        lastColumnResizable: true,
        allowTableNodeSelection: true,
        cellMinWidth: 80,
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value || "",
    immediatelyRender: false,
    editable: true,

    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    const incomingValue = value || "";
    const currentValue = editor.getHTML();
    if (incomingValue === currentValue) {
      return;
    }

    if (editor.isFocused) {
      return;
    }

    editor.commands.setContent(incomingValue, false);
  }, [value, editor]);

  if (!editor) {
    return (
      <div
        className="tiptap-editor-wrapper"
        style={{
          minHeight: 320,
          "--editor-bg": token.colorBgContainer,
          "--editor-text": token.colorText,
          "--editor-border": token.colorBorder,
        }}
      />
    );
  }

  const editorTheme = {
    "--editor-bg": token.colorBgContainer,
    "--editor-text": token.colorText,
    "--editor-border": token.colorBorder,
    "--editor-toolbar-bg": token.colorFillAlter,
    "--editor-toolbar-border": token.colorBorderSecondary,
    "--editor-muted": token.colorTextSecondary,
    "--editor-link": token.colorLink,
    "--editor-code-bg": token.colorFillQuaternary,
    "--editor-selection": token.colorPrimaryBg,
    "--editor-primary": token.colorPrimary,
  };

  const Toolbar = (
    <div className="tiptap-editor-toolbar">
      <TiptapToolbar editor={editor} onFullscreen={() => setFullscreen(true)} />
    </div>
  );

  const EditorView = ({ fullscreenMode = false }) => (
    <div
      className={
        fullscreenMode
          ? "tiptap-editor-content tiptap-editor-content-fullscreen"
          : "tiptap-editor-content"
      }
    >
      <EditorContent editor={editor} />
    </div>
  );

  return (
    <>
      {!fullscreen && (
        <div className="tiptap-editor-wrapper" style={editorTheme}>
          {Toolbar}

          <EditorView />
        </div>
      )}

      <Modal
        open={fullscreen}
        footer={null}
        closable={true}
        destroyOnHidden={false}
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
        {fullscreen && (
          <div className="tiptap-editor-wrapper" style={editorTheme}>
            <div className="tiptap-editor-toolbar">
              <TiptapToolbar
                editor={editor}
                onFullscreen={() => setFullscreen(false)}
              />
            </div>
            <EditorView fullscreenMode />
          </div>
        )}
      </Modal>
    </>
  );
}
