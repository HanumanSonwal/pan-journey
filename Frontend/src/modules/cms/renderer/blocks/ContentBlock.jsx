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
    <section className="py-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded">
          <div className="cms-rich-content">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </section>
  );
}
