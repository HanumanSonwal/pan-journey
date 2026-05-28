"use client";

import { Collapse } from "antd";

export default function FAQBlock({ faq }) {
  if (!faq?.length) return null;

  const items = faq.map((item, index) => ({
    key: index,
    label: item.question,
    children: <p>{item.answer}</p>,
  }));

  return (
    <section className="cms-faq">
      <div className="container">
        <h2>FAQs</h2>

        <Collapse
          items={items}
          accordion
        />
      </div>
    </section>
  );
}