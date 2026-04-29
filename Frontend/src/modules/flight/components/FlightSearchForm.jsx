import { DatePicker, Input, Select } from "antd";

export default function FlightSearchForm() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Book Flights</h3>

      <div className="grid md:grid-cols-4 gap-4">
        <Input size="large" placeholder="From" />
        <Input size="large" placeholder="To" />

        <DatePicker className="w-full h-[60px]" />

        <Select
          size="large"
          options={[
            { label: "1 Adult", value: 1 },
            { label: "2 Adults", value: 2 },
          ]}
        />
      </div>
    </div>
  );
}
