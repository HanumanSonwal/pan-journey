"use client";

export default function EditableField({ label, isEdit, value, children }) {
  const displayValue = value || (
    <span className="text-[#4A9BB5]">Add Detail</span>
  );

  return (
    <div>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      {isEdit ? (
        children
      ) : (
        <p className="text-[16px] font-semibold text-gray-900">
          {displayValue}
        </p>
      )}
    </div>
  );
}
