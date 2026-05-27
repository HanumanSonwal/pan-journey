"use client";

export default function CMSFormPage({
  id,
}) {
  return (
    <div>
      CMS Form
      {id &&
        ` Edit ${id}`}
    </div>
  );
}