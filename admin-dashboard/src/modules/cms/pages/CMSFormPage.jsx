"use client";

import { Card } from "antd";

import CMSForm from "../components/CMSForm";

export default function CMSFormPage({ id }) {
  return (
    <Card title={id ? "Edit CMS Page" : "Create CMS Page"}>
      <CMSForm id={id} />
    </Card>
  );
}
