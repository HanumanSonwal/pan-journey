"use client";

import { PercentageOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

import { useEffect } from "react";
import { LEVEL_OPTIONS } from "../data/MarkupsData";
import { useMarkups } from "../hooks/useMarkups";
import LevelFields from "./LevelFields";
const { Text, Title } = Typography;

export default function MarkupFormModal({ open, setOpen, editData }) {
  const [form] = Form.useForm();
  const level = Form.useWatch("level", form);
  const markupType = Form.useWatch("markupType", form);
  const markupValue = Form.useWatch("markupValue", form);
  const { createMarkup, updateMarkup } = useMarkups();

  // ================= EDIT =================

  useEffect(() => {
    if (open && editData) {
      form.setFieldsValue({
        level: editData?.level,
        countryCode: editData?.countryCode,
        stateName: editData?.stateName,
        cityData: editData?.cityId
          ? {
              label: editData?.cityName,
              value: JSON.stringify({
                cityId: editData?.cityId,
                cityName: editData?.cityName,
              }),
            }
          : undefined,
        hotelData: editData?.hotelId
          ? {
              label: editData?.hotelName,
              value: JSON.stringify({
                hotelId: editData?.hotelId,
                hotelName: editData?.hotelName,
              }),
            }
          : undefined,

        addDateRange: !!editData?.startDate && !!editData?.endDate,
        dateRange:
          editData?.startDate && editData?.endDate
            ? [dayjs(editData?.startDate), dayjs(editData?.endDate)]
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
    // CITY

    if (values?.cityData) {
      const parsedCity = JSON.parse(values.cityData.value);
      values.cityId = parsedCity?.cityId;
      values.cityName = parsedCity?.cityName;
      delete values.cityData;
    }

    // HOTEL

    if (values?.hotelData) {
      const parsedHotel = JSON.parse(values.hotelData.value);
      values.hotelId = parsedHotel?.hotelId;
      values.hotelName = parsedHotel?.hotelName;
      delete values.hotelData;
    }
    if (values?.dateRange) {
      values.startDate = values.dateRange[0]?.toISOString();
      values.endDate = values.dateRange[1]?.toISOString();
      delete values.dateRange;
    }

    if (!values?.addDateRange) {
      values.startDate = null;
      values.endDate = null;
    }

    // UPDATE

    if (editData?._id) {
      await updateMarkup.mutateAsync({
        id: editData?._id,
        data: values,
      });
    }

    // CREATE
    else {
      await createMarkup.mutateAsync(values);
    }
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={760}
      destroyOnHidden
      onCancel={() => {
        form.resetFields();

        setOpen(false);
      }}
      styles={{
        body: {
          paddingTop: 10,
        },
      }}
      title={
        <div>
          <Title
            level={4}
            style={{
              marginBottom: 0,
              fontSize: 18,
            }}
          >
            {editData ? "Edit Markup" : "Create Markup"}
          </Title>
          <Text type="secondary">Configure pricing rules</Text>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* ================= LEVEL ================= */}

        <div
          style={{
            marginBottom: 18,
          }}
        >
          <Text
            strong
            style={{
              display: "block",
              marginBottom: 10,
            }}
          >
            Select Scope
          </Text>

          <Form.Item
            name="level"
            style={{
              marginBottom: 0,
            }}
            rules={[
              {
                required: true,
                message: "Please select level",
              },
            ]}
          >
            <Row gutter={[10, 10]}>
              {LEVEL_OPTIONS?.map((item) => {
                const active = level === item?.value;

                return (
                  <Col xs={12} sm={8} md={4} key={item?.value}>
                    <Card
                      hoverable
                      size="small"
                      onClick={() => form.setFieldValue("level", item?.value)}
                      styles={{
                        body: {
                          padding: 10,
                        },
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                        border: active
                          ? `1.5px solid ${item.color}`
                          : undefined,

                        background: active ? `${item.color}10` : undefined,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 18,
                            color: item.color,
                          }}
                        >
                          {item.icon}
                        </div>

                        <Text
                          style={{
                            fontSize: 12,
                          }}
                          strong
                        >
                          {item.label}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Form.Item>
        </div>

        {/* ================= LOCATION ================= */}

        {["country", "state", "city", "hotel"]?.includes(level) && (
          <div
            style={{
              marginBottom: 18,
            }}
          >
            <Text
              strong
              style={{
                display: "block",
                marginBottom: 12,
              }}
            >
              Location Details
            </Text>

            <LevelFields level={level} />
          </div>
        )}

        {/* ================= MARKUP CONFIG ================= */}

        <div
          style={{
            marginBottom: 18,
          }}
        >
          <Text
            strong
            style={{
              display: "block",
              marginBottom: 12,
            }}
          >
            Pricing Configuration
          </Text>

          <Row gutter={16}>
            {/* TYPE */}

            <Col xs={24} md={12}>
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
                  size="large"
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
            </Col>

            {/* VALUE */}

            <Col xs={24} md={12}>
              <Form.Item
                label="Markup Value"
                name="markupValue"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space.Compact
                  style={{
                    width: "100%",
                  }}
                >
                  <InputNumber
                    value={markupValue}
                    size="large"
                    min={0}
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter markup"
                  />

                  <Button size="large" disabled>
                    {markupType === "percentage" ? "%" : "₹"}
                  </Button>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* ================= ACTIONS ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",

            gap: 10,
          }}
        >
          <Button
            onClick={() => {
              form.resetFields();

              setOpen(false);
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            icon={<PercentageOutlined />}
            loading={createMarkup.isPending || updateMarkup.isPending}
          >
            {editData ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
