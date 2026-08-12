"use client";

import "./ContentBlock.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function ContentBlock({ content }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <section className="cms-content-block ">
      <div className="cms-content-wrapper">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
}
