"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function ContentBlock({ content }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
  });

  if (!content) return null;

  return (
    <section className="py-5">
      <div
        className="container"
        style={{
          maxWidth: 900,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "40px 34px",
            boxShadow: "0 10px 35px rgba(0,0,0,.06)",
          }}
        >
          <div className="cms-rich-content">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </section>
  );
}
