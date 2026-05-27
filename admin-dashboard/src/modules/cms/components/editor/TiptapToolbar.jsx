"use client";

import {
  BoldOutlined,
  ColumnWidthOutlined,
  FullscreenOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { Button, Divider, Select, Space } from "antd";

export default function TiptapToolbar({ editor, onFullscreen }) {
  if (!editor) return null;

  return (
    <Space
      wrap
      style={{
        marginBottom: 12,
      }}
    >
      {/* HEADINGS */}

      <Select
        value={
          editor.isActive("heading", {
            level: 1,
          })
            ? "h1"
            : editor.isActive("heading", {
                  level: 2,
                })
              ? "h2"
              : editor.isActive("heading", {
                    level: 3,
                  })
                ? "h3"
                : "p"
        }
        style={{
          width: 100,
        }}
        onChange={(value) => {
          if (value === "p") {
            editor.chain().focus().setParagraph().run();

            return;
          }

          editor
            .chain()
            .focus()
            .toggleHeading({
              level: Number(value.replace("h", "")),
            })
            .run();
        }}
        options={[
          {
            value: "p",
            label: "Paragraph",
          },

          {
            value: "h1",
            label: "H1",
          },

          {
            value: "h2",
            label: "H2",
          },

          {
            value: "h3",
            label: "H3",
          },
        ]}
      />

      <Divider orientation="vertical" />

      <Button
        type={editor.isActive("bold") ? "primary" : "default"}
        icon={<BoldOutlined />}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <Button
        type={editor.isActive("italic") ? "primary" : "default"}
        icon={<ItalicOutlined />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <Button
        type={editor.isActive("underline") ? "primary" : "default"}
        icon={<UnderlineOutlined />}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      <Button
        type={editor.isActive("strike") ? "primary" : "default"}
        icon={<StrikethroughOutlined />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <Divider orientation="vertical" />

      <Button
        icon={<UnorderedListOutlined />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />

      <Button
        icon={<OrderedListOutlined />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <Divider orientation="vertical" />

      <Button
        icon={<ColumnWidthOutlined />}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <Divider orientation="vertical" />

      <Button
        icon={<UndoOutlined />}
        onClick={() => editor.chain().focus().undo().run()}
      />

      <Button
        icon={<RedoOutlined />}
        onClick={() => editor.chain().focus().redo().run()}
      />

      <Divider orientation="vertical" />

      <Button icon={<FullscreenOutlined />} onClick={onFullscreen} />
    </Space>
  );
}
