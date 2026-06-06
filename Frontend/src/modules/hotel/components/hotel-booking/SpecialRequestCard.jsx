"use client";

import { Card, Checkbox, Input, Typography } from "antd";

const { Title, Text } = Typography;

const requests = [
  "Smoking room",
  "Late check-in",
  "Early check-in",
  "Room on a high floor",
  "Large bed",
  "Twin beds",
  "Airport transfer",
];

export default function SpecialRequestCard({ value = {}, onChange }) {
  return (
    <Card className="!mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm font-roboto!">
      <Title level={4} className="font-roboto! !mb-5 !text-[20px] font-bold!">
        Special Request
      </Title>

      <Text className="text-[#666]">
        Requests depend on hotel availability and are not guaranteed.
      </Text>

      <div className="mt-5 flex flex-wrap gap-3">
        <Checkbox.Group
          value={value?.common}
          onChange={(list) =>
            onChange({
              ...value,
              common: list,
            })
          }
        >
          <div className="flex flex-wrap gap-4">
            {requests.map((item) => (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
      </div>

      <div className="mt-5">
        <Input.TextArea
          rows={4}
          value={value?.other}
          placeholder="Any other request?"
          onChange={(e) =>
            onChange({
              ...value,
              other: e.target.value,
            })
          }
        />
      </div>
    </Card>
  );
}
