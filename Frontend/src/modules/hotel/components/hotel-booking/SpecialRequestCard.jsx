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
    <Card className="rounded-2xl border-0 shadow-sm  !shadow-[0_4px_12px_rgba(0,0,0,0.25)] !mb-2">
      <Title level={4} className="!mb-3">
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
