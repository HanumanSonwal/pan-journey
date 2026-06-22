"use client";

import { Button, Card, Collapse, Form, Input, Select } from "antd";
import CMSImageUpload from "./CMSImageUpload";
import TextEditor from "./editor/joditEditor/TextEditor";

const blockOptions = [
  {
    value: "hero",
    label: "Hero",
  },
  {
    value: "content",
    label: "Content",
  },
  {
    value: "faq",
    label: "FAQ",
  },
  {
    value: "cta",
    label: "CTA",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "imageContent",
    label: "Image Content",
  },
  {
    label: "Links",
    value: "links",
  },
];

function BlockFields({ field, form }) {
  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldValue }) => {
        const type = getFieldValue(["data", "blocks", field.name, "type"]);

        return (
          <>
            {type === "hero" && (
              <>
                <Form.Item
                  name={[field.name, "data", "title"]}
                  label="Hero Title"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "subtitle"]}
                  label="Hero Subtitle"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <CMSImageUpload
                  form={form}
                  label="Hero Image"
                  namePath={["data", "blocks", field.name, "data", "image"]}
                />

                <Form.Item
                  name={[field.name, "data", "buttonText"]}
                  label="Button Text"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "buttonLink"]}
                  label="Button Link"
                >
                  <Input />
                </Form.Item>
              </>
            )}

            {type === "content" && (
              <Form.Item name={[field.name, "data", "content"]} label="Content">
                <TextEditor />
              </Form.Item>
            )}

            {type === "faq" && (
              <>
                <Form.Item
                  name={[field.name, "data", "title"]}
                  label="FAQ Section Title"
                >
                  <Input />
                </Form.Item>

                <Form.List name={[field.name, "data", "items"]}>
                  {(faqFields, { add, remove }) => (
                    <>
                      {faqFields.map((faqField) => (
                        <Card
                          key={faqField.key}
                          size="small"
                          style={{
                            marginBottom: 12,
                          }}
                          extra={
                            <Button
                              danger
                              size="small"
                              onClick={() => remove(faqField.name)}
                            >
                              Remove
                            </Button>
                          }
                        >
                          <Form.Item
                            name={[faqField.name, "question"]}
                            label="Question"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            name={[faqField.name, "answer"]}
                            label="Answer"
                          >
                            <Input.TextArea rows={4} />
                          </Form.Item>
                        </Card>
                      ))}

                      <Button type="dashed" block onClick={() => add()}>
                        + Add FAQ
                      </Button>
                    </>
                  )}
                </Form.List>
              </>
            )}

            {type === "marketing" && (
              <>
                <Form.Item
                  name={[field.name, "data", "heading"]}
                  label="Heading"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "subheading"]}
                  label="Sub Heading"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <CMSImageUpload
                  form={form}
                  label="Marketing Image"
                  namePath={["data", "blocks", field.name, "data", "image"]}
                />

                <Form.List name={[field.name, "data", "items"]}>
                  {(itemFields, { add, remove }) => (
                    <>
                      {itemFields.map((itemField) => (
                        <Card
                          key={itemField.key}
                          size="small"
                          style={{
                            marginBottom: 12,
                          }}
                          extra={
                            <Button
                              danger
                              size="small"
                              onClick={() => remove(itemField.name)}
                            >
                              Remove
                            </Button>
                          }
                        >
                          <Form.Item
                            name={[itemField.name, "title"]}
                            label="Item Title"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            name={[itemField.name, "description"]}
                            label="Description"
                          >
                            <Input.TextArea rows={3} />
                          </Form.Item>
                        </Card>
                      ))}

                      <Button type="dashed" block onClick={() => add()}>
                        + Add Item
                      </Button>
                    </>
                  )}
                </Form.List>
              </>
            )}

            {type === "cta" && (
              <>
                <Form.Item
                  name={[field.name, "data", "title"]}
                  label="CTA Title"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "description"]}
                  label="Description"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <CMSImageUpload
                  form={form}
                  label="CTA Background"
                  namePath={[
                    "data",
                    "blocks",
                    field.name,
                    "data",
                    "background",
                  ]}
                />

                <Form.Item
                  name={[field.name, "data", "buttonText"]}
                  label="Button Text"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "buttonLink"]}
                  label="Button Link"
                >
                  <Input />
                </Form.Item>
              </>
            )}

            {type === "imageContent" && (
              <>
                <Form.Item
                  name={[field.name, "data", "title"]}
                  label="Section Title"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "content"]}
                  label="Content"
                >
                  <TextEditor />
                </Form.Item>

                <CMSImageUpload
                  form={form}
                  label="Section Image"
                  namePath={["data", "blocks", field.name, "data", "image"]}
                />

                <Form.Item
                  name={[field.name, "data", "layout"]}
                  label="Image Position"
                  initialValue="left"
                >
                  <Select
                    options={[
                      {
                        label: "Left Image",
                        value: "left",
                      },
                      {
                        label: "Right Image",
                        value: "right",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "buttonText"]}
                  label="Button Text"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "data", "buttonLink"]}
                  label="Button Link"
                >
                  <Input />
                </Form.Item>
              </>
            )}

            {type === "links" && (
              <Form.List name={[field.name, "data", "groups"]}>
                {(groupFields, { add: addGroup, remove: removeGroup }) => (
                  <>
                    {groupFields.map((groupField) => (
                      <Card
                        key={groupField.key}
                        size="small"
                        style={{
                          marginBottom: 16,
                        }}
                        extra={
                          <Button
                            danger
                            size="small"
                            onClick={() => removeGroup(groupField.name)}
                          >
                            Remove Group
                          </Button>
                        }
                      >
                        <Form.Item
                          name={[groupField.name, "title"]}
                          label="Group Title"
                        >
                          <Input />
                        </Form.Item>

                        <Form.List name={[groupField.name, "links"]}>
                          {(
                            linkFields,
                            { add: addLink, remove: removeLink },
                          ) => (
                            <>
                              {linkFields.map((linkField) => (
                                <Card
                                  key={linkField.key}
                                  size="small"
                                  style={{
                                    marginBottom: 12,
                                  }}
                                  extra={
                                    <Button
                                      danger
                                      size="small"
                                      onClick={() => removeLink(linkField.name)}
                                    >
                                      Remove
                                    </Button>
                                  }
                                >
                                  <Form.Item
                                    name={[linkField.name, "label"]}
                                    label="Label"
                                  >
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    name={[linkField.name, "url"]}
                                    label="URL"
                                  >
                                    <Input />
                                  </Form.Item>
                                </Card>
                              ))}

                              <Button
                                type="dashed"
                                block
                                onClick={() => addLink()}
                              >
                                + Add Link
                              </Button>
                            </>
                          )}
                        </Form.List>
                      </Card>
                    ))}

                    <Button type="dashed" block onClick={() => addGroup()}>
                      + Add Group
                    </Button>
                  </>
                )}
              </Form.List>
            )}
          </>
        );
      }}
    </Form.Item>
  );
}

export default function CMSBlocksBuilder({ form }) {
  return (
    <Form.List name={["data", "blocks"]}>
      {(fields, { add, remove, move }) => (
        <>
          <Collapse
            accordion
            defaultActiveKey={fields.length ? [String(fields[0].key)] : []}
            ghost
            style={{
              marginBottom: 16,
            }}
            items={fields.map((field) => {
              const type =
                form.getFieldValue(["data", "blocks", field.name, "type"]) ||
                "block";

              const icons = {
                hero: "🖼️",
                content: "📝",
                faq: "❓",
                cta: "🚀",
                marketing: "⭐",
                imageContent: "📷",
                links: "🔗",
              };

              return {
                key: String(field.key),

                styles: {
                  header: {
                    background: "#111827",
                    border: "1px solid #2a2a2a",
                    borderRadius: 5,
                    marginBottom: 10,
                  },

                  body: {
                    border: "1px solid #2a2a2a",
                    borderTop: "none",
                    borderRadius: "0 0 12px 12px",
                    background: "#141414",
                    padding: 20,
                  },
                },

                label: (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      <span>
                        {field.name + 1}.{" "}
                        {(
                          form.getFieldValue([
                            "data",
                            "blocks",
                            field.name,
                            "type",
                          ]) || "Block"
                        )
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="small"
                        disabled={field.name === 0}
                        onClick={() => move(field.name, field.name - 1)}
                      >
                        ↑
                      </Button>

                      <Button
                        size="small"
                        disabled={field.name === fields.length - 1}
                        onClick={() => move(field.name, field.name + 1)}
                      >
                        ↓
                      </Button>

                      <Button
                        danger
                        size="small"
                        onClick={() => remove(field.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ),

                children: (
                  <div>
                    <Form.Item
                      name={[field.name, "type"]}
                      label="Block Type"
                      rules={[{ required: true }]}
                    >
                      <Select options={blockOptions} />
                    </Form.Item>

                    <BlockFields field={field} form={form} />
                  </div>
                ),
              };
            })}
          />

          <Button
            type="dashed"
            block
            style={{
              marginTop: 16,
            }}
            onClick={() =>
              add({
                type: "content",
                data: {},
              })
            }
          >
            + Add Block
          </Button>
        </>
      )}
    </Form.List>
  );
}
