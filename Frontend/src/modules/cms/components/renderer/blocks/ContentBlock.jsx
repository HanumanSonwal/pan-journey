"use client";

import { useEditor, EditorContent } from "@tiptap/react";
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
    <section className="cms-content">
      <div className="container">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
}