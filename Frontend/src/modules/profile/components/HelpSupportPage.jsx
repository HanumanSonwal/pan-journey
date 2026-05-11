"use client";

import { RightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const helpSupportData = [
  {
    key: "1",
    title: "Booking confirmation",
    description:
      "Check your emails for a confirmation from the booking site – it might take up to 72 hours.",
  },

  {
    key: "2",
    title: "Modify booking",
    description:
      "Changes to your booking depend on the property and booking partner policies.",
  },

  {
    key: "3",
    title: "Cancellation support",
    description:
      "Need to cancel your booking? Review cancellation charges before proceeding.",
  },

  {
    key: "4",
    title: "Payment issues",
    description:
      "Facing payment failures or duplicate charges? Our support team can help.",
  },

  {
    key: "5",
    title: "Need more help?",
    description:
      "Contact customer support for any additional booking or travel assistance.",
  },
];

export default function HelpSupportPage() {
  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 text-gray-900">
        <h2 className="mb-0! text-[24px] font-bold text-gray-900">
          {" "}
          Help & Support
        </h2>
      </div>
      <div className="mx-auto max-w-4xl py-4">
        {/* FAQ SECTION */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* COLLAPSE */}
          <Collapse
            accordion
            bordered={false}
            expandIconPlacement="end"
            expandIcon={({ isActive }) => (
              <RightOutlined
                rotate={isActive ? 90 : 0}
                className="text-[16px] text-gray-700"
              />
            )}
            items={helpSupportData.map((item) => ({
              key: item.key,

              label: (
                <p className="mb-0! text-[16px] font-bold text-gray-900 md:text-[17px]">
                  {item.title}
                </p>
              ),

              children: (
                <p className="mb-0! text-[14px] leading-[24px] text-gray-600 md:text-[15px]">
                  {item.description}
                </p>
              ),

              className: "!border-b !border-gray-200 last:!border-b-0",
            }))}
            className="help-support-collapse bg-transparent [&_.ant-collapse-content-box]:!px-5 [&_.ant-collapse-content-box]:!pt-0 [&_.ant-collapse-content-box]:!pb-5 md:[&_.ant-collapse-content-box]:!px-6 [&_.ant-collapse-header]:!items-center [&_.ant-collapse-header]:!px-5 [&_.ant-collapse-header]:!py-5 md:[&_.ant-collapse-header]:!px-6"
          />
        </div>

        {/* CONTACT SECTION */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-[1px_4px_4px_4px_#00000014] md:p-6">
          <h2 className="mb-4 text-[20px] font-bold text-gray-900">
            Contact Support
          </h2>

          <div className="space-y-4">
            <div>
              <p className="mb-1 text-[14px] font-semibold text-gray-800">
                Customer Care
              </p>

              <p className="text-[14px] text-gray-600">+91 98765 43210</p>
            </div>

            <div>
              <p className="mb-1 text-[14px] font-semibold text-gray-800">
                Email Support
              </p>

              <p className="text-[14px] text-gray-600">
                support@panjourney.com
              </p>
            </div>

            <div>
              <p className="mb-1 text-[14px] font-semibold text-gray-800">
                Working Hours
              </p>

              <p className="text-[14px] text-gray-600">
                Monday - Sunday • 24×7 Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
