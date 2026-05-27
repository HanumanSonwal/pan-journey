"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, message, Upload } from "antd";
import { uploadMediaApi } from "../api/cms.service";


export default function CMSImageUpload({ form }) {
  const image = Form.useWatch(["data", "heroImage"], form);
  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cms");
    try {
      const res = await uploadMediaApi(formData);
      const url = res?.data?.url;
      form.setFieldValue(["data", "heroImage"], url);
      message.success("Image uploaded");
      onSuccess("ok");
    } catch (err) {
      message.error("Upload failed");
      onError(err);
    }
  };

  return (
    <Form.Item label="Hero Image">
      <Upload
        customRequest={handleUpload}
        showUploadList={false}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      {image && (
        <div
          style={{
            marginTop: 16,
          }}
        >
          <Image
            src={image}
            alt="preview"
            width={220}
            style={{
              borderRadius: 8,
            }}
          />
        </div>
      )}
    </Form.Item>
  );
}
