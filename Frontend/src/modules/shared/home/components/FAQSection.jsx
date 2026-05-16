"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const faqData = [
  {
    key: "1",
    question:
      "Is it possible to pay for an order with Visa and MasterCard payment cards?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    key: "2",
    question: "How can I book my travel package online easily?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    key: "3",
    question: "Can I cancel or modify my booking after payment?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    key: "4",
    question: "Do you provide customer support during the journey?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    key: "5",
    question: "Are there any hidden charges in booking packages?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    key: "6",
    question: "Can I use cashback and reward points together?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-[#F5F7F9] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl !mt-[-95]">
        {/* Heading */}
        <SectionHeading
          title="  Questions & Answer"

          description=" We’re committed to offering more than just products we provide exceptional experiences.."
        />

        {/* FAQ */}
        <div >
          <Collapse
            accordion
            defaultActiveKey={["1"]}
            ghost
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-[22px] text-[#222]" />
              ) : (
                <PlusOutlined className="text-[22px] text-[#222]" />
              )
            }
            expandIconPlacement="end"
            items={faqData.map((item) => ({
              key: item.key,
              label: (
                <span className="text-[18px] font-medium text-[#222]">
                  {item.question}
                </span>
              ),
              children: (
                <p className="pr-8 pb-2 text-[15px] leading-9 text-gray-600">
                  {item.answer}
                </p>
              ),
              style: {
                borderBottom: "1px solid #E5E7EB",
                borderRadius: 0,
                paddingTop: "10px",
                paddingBottom: "10px",
              },
            }))}
          />
        </div>
      </div>
    </section>
  );
}
