"use client";

import { Col, Row, Select } from "antd";

import { DESTINATION_TYPE_OPTIONS } from "../constants/destination.constants";

export default function DestinationFilters({ type, setType }) {
  return (
    <Row
      gutter={[16, 16]}
      style={{
        marginBottom: 20,
      }}
    >
      <Col xs={24} sm={10} md={8} lg={6}>
        <Select
          value={type}
          onChange={setType}
          size="large"
          style={{
            width: "100%",
          }}
          options={[
            {
              label: "All Types",
              value: "all",
            },
            ...DESTINATION_TYPE_OPTIONS,
          ]}
        />
      </Col>
    </Row>
  );
}
