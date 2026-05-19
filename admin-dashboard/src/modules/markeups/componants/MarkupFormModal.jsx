"use client";

import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { useMarkups } from "../hooks/useMarkups";
import LevelFields from "./LevelFields";

export default function MarkupFormModal({ open, setOpen, editData }) {
  const [form] = Form.useForm();
  const level = Form.useWatch("level", form);
  const { createMarkup, updateMarkup } = useMarkups();

  // ================= EDIT VALUES =================

  useEffect(() => {
    if (open && editData) {
      form.setFieldsValue({
        level: editData?.level,
        countryCode: editData?.countryCode,
        stateName: editData?.stateName,
        cityData: editData?.cityId
          ? JSON.stringify({
              cityId: editData?.cityId,
              cityName: editData?.cityName,
            })
          : undefined,

        hotelData: editData?.hotelId
          ? JSON.stringify({
              hotelId: editData?.hotelId,
              hotelName: editData?.hotelName,
            })
          : undefined,
        markupType: editData?.markupType,
        markupValue: editData?.markupValue,
      });
    } else {
      form.resetFields();
    }
  }, [editData, open, form]);

  // ================= SUBMIT =================

  const onFinish = async (values) => {
    // ================= CITY =================
    if (values?.cityData) {
      const parsedCity = JSON.parse(values.cityData);
      values.cityId = parsedCity?.cityId;
      values.cityName = parsedCity?.cityName;
      delete values.cityData;
    }

    // ================= HOTEL =================

    if (values?.hotelData) {
      const parsedHotel = JSON.parse(values.hotelData);
      values.hotelId = parsedHotel?.hotelId;
      values.hotelName = parsedHotel?.hotelName;
      delete values.hotelData;
    }

    // ================= UPDATE =================

    if (editData?._id) {
      await updateMarkup.mutateAsync({
        id: editData?._id,
        data: values,
      });
    }

    // ================= CREATE =================
    else {
      await createMarkup.mutateAsync(values);
    }
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={editData ? "Edit Markup" : "Create Markup"}
      open={open}
      footer={null}
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      destroyOnHidden
      width={650}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* LEVEL */}
        <Form.Item
          label="Markup Level"
          name="level"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Level"
            options={[
              {
                label: "Worldwide",
                value: "worldwide",
              },

              {
                label: "Country",
                value: "country",
              },

              {
                label: "State",
                value: "state",
              },

              {
                label: "City",
                value: "city",
              },

              {
                label: "Hotel",
                value: "hotel",
              },
            ]}
          />
        </Form.Item>
        {/* DYNAMIC FIELDS */}
        <LevelFields level={level} />
        {/* MARKUP TYPE */}
        <Form.Item
          label="Markup Type"
          name="markupType"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Type"
            options={[
              {
                label: "Percentage",
                value: "percentage",
              },

              {
                label: "Fixed",
                value: "fixed",
              },
            ]}
          />
        </Form.Item>

        {/* VALUE */}

        <Form.Item
          label="Markup Value"
          name="markupValue"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{
              width: "100%",
            }}
            placeholder="Enter markup"
          />
        </Form.Item>

        {/* SUBMIT */}

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={createMarkup.isPending || updateMarkup.isPending}
        >
          {editData ? "Update Markup" : "Create Markup"}
        </Button>
      </Form>
    </Modal>
  );
}
