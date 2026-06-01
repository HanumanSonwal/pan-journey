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
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded border border-[#e8eef3] bg-white p-6 md:p-8">
          <div className="cms-rich-content">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </section>
  );
}
