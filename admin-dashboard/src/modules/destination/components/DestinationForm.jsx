"use client";

import { useEffect } from "react";

import { Button, Drawer, Form, Input, Select, Space } from "antd";

import { DESTINATION_TYPE_OPTIONS } from "../constants/destination.constants";

export default function DestinationForm({
  open,
  onClose,
  editingDestination,
  selectedType,
  createDestination,
  updateDestination,
}) {
  const [form] = Form.useForm();

  /*
  -----------------------------------
  Prefill
  -----------------------------------
  */

  useEffect(() => {
    if (!open) return;

    if (!editingDestination) {
      form.resetFields();

      if (selectedType !== "all") {
        form.setFieldValue("type", selectedType);
      }

      return;
    }

    form.setFieldsValue({
      placeName: editingDestination.placeName,
      type: editingDestination.type,
    });
  }, [open, editingDestination, selectedType, form]);

  /*
-----------------------------------
Submit
-----------------------------------
*/

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        type: selectedType === "all" ? values.type : selectedType,
      };

      if (editingDestination) {
        await updateDestination.mutateAsync({
          id: editingDestination._id,
          data: payload,
        });
      } else {
        await createDestination.mutateAsync(payload);
      }

      form.resetFields();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      // destroyOnHidden
      size={420}
      open={open}
      onClose={onClose}
      title={editingDestination ? "Edit Destination" : "Add Destination"}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Place Name"
          name="placeName"
          rules={[
            {
              required: true,
              message: "Please enter place name",
            },
          ]}
        >
          <Input size="large" placeholder="Enter place name" />
        </Form.Item>

        {selectedType === "all" && !editingDestination && (
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select size="large" options={DESTINATION_TYPE_OPTIONS} />
          </Form.Item>
        )}

        <Space
          style={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={onClose}>Cancel</Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={createDestination.isPending || updateDestination.isPending}
          >
            {editingDestination ? "Update" : "Create"}
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
}
