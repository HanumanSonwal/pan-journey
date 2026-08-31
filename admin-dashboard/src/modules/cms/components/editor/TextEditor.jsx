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

      /*
       * TABLE
       */
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

    /*
     * Existing CMS content
     */
    content: value || "",

    /*
     * Required for Next.js
     */
    immediatelyRender: false,

    editable: true,

    /*
     * Save content
     */
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  /*
   * ==========================================
   * CMS VALUE -> EDITOR
   * ==========================================
   */

  useEffect(() => {
    if (!editor) {
      return;
    }

    const incomingValue = value || "";
    const currentValue = editor.getHTML();

    if (incomingValue === currentValue) {
      return;
    }

    /*
     * Don't overwrite while user is editing.
     */
    if (editor.isFocused) {
      return;
    }

    editor.commands.setContent(incomingValue, false);
  }, [value, editor]);

  /*
   * ==========================================
   * EDITOR NOT READY
   * ==========================================
   */

  if (!editor) {
    return (
      <div
        style={{
          minHeight: 320,
          border: `1px solid ${token.colorBorder}`,
          borderRadius: 6,
          background: token.colorBgContainer,
        }}
      />
    );
  }

  /*
   * ==========================================
   * THEME
   * ==========================================
   */

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

  /*
   * ==========================================
   * TOOLBAR
   * ==========================================
   */

  const Toolbar = (
    <div className="tiptap-editor-toolbar">
      <TiptapToolbar editor={editor} onFullscreen={() => setFullscreen(true)} />
    </div>
  );

  /*
   * ==========================================
   * EDITOR CONTENT
   *
   * IMPORTANT:
   *
   * We NEVER render two EditorContent
   * instances using the same editor.
   * ==========================================
   */

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
      {/* ==================================================
          NORMAL MODE
          
          EditorContent exists ONLY when fullscreen=false
      ================================================== */}

      {!fullscreen && (
        <div className="tiptap-editor-wrapper" style={editorTheme}>
          {Toolbar}

          <EditorView />
        </div>
      )}

      {/* ==================================================
          FULLSCREEN MODE
          
          Normal EditorContent is removed first.
          Then fullscreen EditorContent is mounted.
      ================================================== */}

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

      {/* ==================================================
          GLOBAL EDITOR CSS
      ================================================== */}

      <style jsx global>{`
        .tiptap-editor-wrapper {
          width: 100%;
          background: var(--editor-bg);
          color: var(--editor-text);

          border: 1px solid var(--editor-border);

          border-radius: 6px;

          overflow: hidden;

          transition:
            background-color 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        /* ==========================================
           TOOLBAR
        ========================================== */

        .tiptap-editor-toolbar {
          background: var(--editor-toolbar-bg);

          border-bottom: 1px solid var(--editor-toolbar-border);

          padding: 10px 12px;
        }

        .tiptap-editor-toolbar .ant-btn {
          color: var(--editor-text);

          background: transparent;

          border-color: var(--editor-border);
        }

        .tiptap-editor-toolbar .ant-btn:hover {
          color: var(--editor-primary);

          border-color: var(--editor-primary);
        }

        .tiptap-editor-toolbar .ant-btn-primary {
          color: #fff;

          background: var(--editor-primary);

          border-color: var(--editor-primary);
        }

        .tiptap-editor-toolbar .ant-select-selector {
          background: var(--editor-bg) !important;

          border-color: var(--editor-border) !important;
        }

        .tiptap-editor-toolbar .ant-select-selection-item {
          color: var(--editor-text) !important;
        }

        /* ==========================================
           EDITOR CONTENT
        ========================================== */

        .tiptap-editor-content {
          min-height: 320px;

          padding: 20px;

          background: var(--editor-bg);

          color: var(--editor-text);
        }

        .tiptap-editor-content .tiptap {
          min-height: 280px;

          outline: none;

          color: var(--editor-text);

          font-size: 16px;

          line-height: 1.8;

          caret-color: var(--editor-text);
        }

        /* ==========================================
           TEXT
        ========================================== */

        .tiptap-editor-content .tiptap p {
          color: var(--editor-text);

          margin: 0 0 12px;
        }

        /* ==========================================
           HEADINGS
        ========================================== */

        .tiptap-editor-content .tiptap h1,
        .tiptap-editor-content .tiptap h2,
        .tiptap-editor-content .tiptap h3,
        .tiptap-editor-content .tiptap h4,
        .tiptap-editor-content .tiptap h5,
        .tiptap-editor-content .tiptap h6 {
          color: var(--editor-text);

          font-weight: 600;

          margin-top: 20px;

          margin-bottom: 10px;
        }

        .tiptap-editor-content .tiptap h1 {
          font-size: 32px;
        }

        .tiptap-editor-content .tiptap h2 {
          font-size: 28px;
        }

        .tiptap-editor-content .tiptap h3 {
          font-size: 24px;
        }

        .tiptap-editor-content .tiptap h4 {
          font-size: 20px;
        }

        .tiptap-editor-content .tiptap h5 {
          font-size: 18px;
        }

        .tiptap-editor-content .tiptap h6 {
          font-size: 16px;
        }

        /* ==========================================
           LIST
        ========================================== */

        .tiptap-editor-content .tiptap ul,
        .tiptap-editor-content .tiptap ol {
          color: var(--editor-text);

          padding-left: 28px;

          margin: 10px 0 16px;
        }

        /* ==========================================
           LINK
        ========================================== */

        .tiptap-editor-content .tiptap a {
          color: var(--editor-link);

          text-decoration: underline;

          cursor: pointer;
        }

        /* ==========================================
           BLOCKQUOTE
        ========================================== */

        .tiptap-editor-content .tiptap blockquote {
          border-left: 4px solid var(--editor-border);

          padding-left: 16px;

          margin: 16px 0;

          color: var(--editor-muted);
        }

        /* ==========================================
           CODE
        ========================================== */

        .tiptap-editor-content .tiptap code {
          background: var(--editor-code-bg);

          color: var(--editor-text);

          padding: 2px 6px;

          border-radius: 4px;
        }

        .tiptap-editor-content .tiptap pre {
          background: var(--editor-code-bg);

          color: var(--editor-text);

          padding: 16px;

          border-radius: 6px;

          overflow-x: auto;
        }

        /* ==========================================
           IMAGE
        ========================================== */

        .tiptap-editor-content .tiptap img {
          display: block;

          max-width: 100%;

          height: auto;

          margin: 12px 0;

          border-radius: 6px;
        }

        /* ==========================================
           TABLE
        ========================================== */

        .tiptap-editor-content .tiptap .tableWrapper {
          overflow-x: auto;

          margin: 18px 0;

          padding-bottom: 4px;
        }

        .tiptap-editor-content .tiptap table {
          width: 100%;

          border-collapse: collapse;

          table-layout: fixed;

          overflow: hidden;
        }

        .tiptap-editor-content .tiptap th,
        .tiptap-editor-content .tiptap td {
          position: relative;

          min-width: 80px;

          border: 1px solid var(--editor-border);

          padding: 9px 12px;

          color: var(--editor-text);

          background: var(--editor-bg);

          text-align: left;

          vertical-align: top;
        }

        .tiptap-editor-content .tiptap th {
          background: var(--editor-code-bg);

          font-weight: 600;
        }

        /* ==========================================
           SELECTED TABLE CELL
        ========================================== */

        .tiptap-editor-content .tiptap .selectedCell {
          background: var(--editor-selection) !important;
        }

        .tiptap-editor-content .tiptap .selectedCell:after {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background: var(--editor-selection);

          opacity: 0.45;
        }

        /* ==========================================
           TABLE RESIZE
        ========================================== */

        .tiptap-editor-content .tiptap .column-resize-handle {
          position: absolute;

          top: 0;

          right: -2px;

          bottom: 0;

          width: 4px;

          pointer-events: none;
        }

        .tiptap-editor-content .tiptap .resize-cursor {
          cursor: col-resize;
        }

        /* ==========================================
           HR
        ========================================== */

        .tiptap-editor-content .tiptap hr {
          border: 0;

          border-top: 1px solid var(--editor-border);

          margin: 24px 0;
        }

        /* ==========================================
           PLACEHOLDER
        ========================================== */

        .tiptap-editor-content .tiptap p.is-editor-empty:first-child::before {
          color: var(--editor-muted);

          content: attr(data-placeholder);

          float: left;

          height: 0;

          pointer-events: none;
        }

        /* ==========================================
           SELECTION
        ========================================== */

        .tiptap-editor-content .tiptap ::selection {
          background: var(--editor-selection);
        }

        /* ==========================================
           FOCUS
        ========================================== */

        .tiptap-editor-wrapper:focus-within {
          border-color: var(--editor-primary);
        }

        /* ==========================================
           FULLSCREEN
        ========================================== */

        .tiptap-editor-content-fullscreen {
          height: calc(85vh - 60px);

          overflow-y: auto;

          padding: 28px;
        }

        .tiptap-editor-content-fullscreen .tiptap {
          min-height: calc(85vh - 120px);

          font-size: 18px;

          line-height: 1.9;
        }
      `}</style>
    </>
  );
}
