import { DatePicker, Input, Select } from "antd";

export default function HotelSearchForm() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Select Your Hotels</h3>

      <div className="grid md:grid-cols-4 gap-4">
        <Input size="large" placeholder="City / Hotel" />

        <DatePicker className="w-full h-[60px]" />

        <DatePicker className="w-full h-[60px]" />

        <Select
          size="large"
          className="w-full"
          options={[
            { label: "1 Room • 2 Adults", value: 1 },
            { label: "2 Rooms • 4 Adults", value: 2 },
          ]}
        />
      </div>
    </div>
  );
}
