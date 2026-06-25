"use client";

import { Checkbox, Input, Modal, Select } from "antd";

import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function GuestPopup({ open, onClose }) {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={980}
      styles={{
        body: {
          padding: "28px",
          borderRadius: "18px",
          background: "#F5F5F5",
        },
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#222]">Add Guest 2</h2>

          <p className="mt-3 text-[15px] text-[#333]">
            Name should be as per official govt. ID & travelers below 18 years
            of age cannot travel alone
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3D3D3D] text-white"
        >
          <CloseOutlined />
        </button>
      </div>

      {/* Form */}
      <div className="mt-10 space-y-7">
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[120px_1fr_1fr]">
          {/* Gender */}
          <div className="relative">
            <label className="absolute -top-[11px] left-4 bg-[#F5F5F5] px-1 text-[14px] text-[#222]">
              Gender
            </label>

            <Select defaultValue="Mr" className="h-[72px] w-full" size="large">
              <Option value="Mr">Mr</Option>
              <Option value="Mrs">Mrs</Option>
              <Option value="Miss">Miss</Option>
            </Select>
          </div>

          {/* First Name */}
          <div className="relative">
            <label className="absolute -top-[11px] left-4 z-10 bg-[#F5F5F5] px-1 text-[14px] text-[#222]">
              First Name
            </label>

            <Input
              defaultValue="Tanu"
              className="h-[72px] rounded-xl text-[18px] font-semibold"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <label className="absolute -top-[11px] left-4 z-10 bg-[#F5F5F5] px-1 text-[14px] text-[#222]">
              Last Name
            </label>

            <Input
              defaultValue="Active"
              className="h-[72px] rounded-xl text-[18px] font-semibold"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Mobile */}
          <div className="relative">
            <label className="absolute -top-[11px] left-4 z-10 bg-[#F5F5F5] px-1 text-[14px] text-[#222]">
              Mobile No.
            </label>

            <Input
              prefix={
                <div className="flex items-center gap-1 text-[16px]">+91</div>
              }
              defaultValue="1234567890"
              className="h-[72px] rounded-xl text-[18px] font-semibold"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-[11px] left-4 z-10 bg-[#F5F5F5] px-1 text-[14px] text-[#222]">
              Email
            </label>

            <Input
              defaultValue="example@email.com"
              className="h-[72px] rounded-xl text-[18px] font-semibold"
            />
          </div>
        </div>

        {/* Checkbox */}
        <Checkbox className="text-[16px] text-[#222]">
          Below 12 years of age
        </Checkbox>

        {/* Button */}
        <button
          className="mt-5 h-[58px] w-[220px] rounded-lg text-[18px] font-medium text-white"
          style={{
            background: "linear-gradient(180deg, #7CC6F2 0%, #5CA9D8 100%)",
          }}
        >
          Save Details
        </button>
      </div>
    </Modal>
  );
}
