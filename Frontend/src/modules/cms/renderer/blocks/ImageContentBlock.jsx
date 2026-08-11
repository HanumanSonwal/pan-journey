"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";

export default function ImageContentBlock({ data }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: data?.content,
    immediatelyRender: false,
  });

  if (!data) return null;

  const isRight = data?.layout === "right";

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#fff",
      }}
    >
      <div className="container px-14 py-[-3]">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* IMAGE */}

          <div
            style={{
              order: isRight ? 2 : 1,
            }}
          >
            {data?.image && (
              <img
                src={encodeURI(data.image)}
                alt={data?.title || "section"}
                style={{
                  width: "100%",
                  borderRadius: 24,
                  objectFit: "cover",
                  boxShadow: "0 20px 50px rgba(15,23,42,.12)",
                }}
              />
            )}
          </div>

          {/* CONTENT */}

          <div
            style={{
              order: isRight ? 1 : 2,
            }}
          >
            {data?.title && (
              <h2
                style={{
                  fontSize: "clamp(2rem,2vw,2rem)",
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "#0f172a",
                }}
              >
                {data.title}
              </h2>
            )}

            {data?.content && (
              <div
                style={{
                  color: "#475569",
                  lineHeight: 1.9,
                }}
              >
                <EditorContent editor={editor} />
              </div>
            )}

            {data?.buttonText && (
              <Link
                className="buttion-background-color"
                href={data?.buttonLink || "#"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 170,
                  height: 50,
                  padding: "0 24px",
                  borderRadius: 14,
                  textDecoration: "none",

                  color: "#fff",
                  fontWeight: 600,
                  boxShadow: "0 12px 28px rgba(37,99,235,.24)",
                }}
              >
                {data.buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
