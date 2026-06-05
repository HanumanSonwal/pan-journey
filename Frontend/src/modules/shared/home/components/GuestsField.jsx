"use client";

import { Button, Popover } from "antd";
import { memo, useEffect, useState } from "react";

const defaultGuestValue = {
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
};

const CHILD_AGES = Array.from({ length: 17 }, (_, i) => i + 1);
function GuestsField({
  value = defaultGuestValue,
  onChange,
  open,
  setOpen,
  variant = "default", // default | compact
}) {
  const safeValue = {
    ...defaultGuestValue,
    ...(value || {}),
  };
  const [draftGuests, setDraftGuests] = useState(safeValue);
  useEffect(() => {
    if (open) {
      setDraftGuests(safeValue);
    }
  }, [open]);

  const update = (key, val) => {
    setDraftGuests((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const updateAdults = (val) => {
    const adults = Math.min(40, Math.max(1, val));
    const rooms = Math.min(
      20,
      Math.max(Math.ceil(adults / 2), draftGuests.rooms),
    );

    setDraftGuests((prev) => ({
      ...prev,
      adults,
      rooms,
    }));
  };

  const updateRooms = (val) => {
    const rooms = Math.min(20, Math.max(1, val));
    let adults = draftGuests.adults;
    if (adults < rooms) {
      adults = rooms;
    }
    if (adults > rooms * 2) {
      adults = rooms * 2;
    }
    setDraftGuests((prev) => ({
      ...prev,
      rooms,
      adults,
    }));
  };
  // CHILD AGE
  const updateChildAge = (index, age) => {
    const newAges = [...(draftGuests?.childAges || [])];
    newAges[index] = age;
    update("childAges", newAges);
  };
  const handleChildrenChange = (val) => {
    const children = Math.min(40, Math.max(0, val));
    let newAges = [...(draftGuests?.childAges || [])];
    while (newAges.length < children) {
      newAges.push("");
    }
    while (newAges.length > children) {
      newAges.pop();
    }
    setDraftGuests((prev) => ({
      ...prev,
      children,
      childAges: newAges,
    }));
  };
  const handleApply = () => {
    onChange?.(draftGuests);
    setOpen?.(false);
  };
  const childAgesValid =
    draftGuests.children === 0 ||
    draftGuests.childAges.every(
      (age) => age !== "" && age !== null && age !== undefined,
    );

  const dropdownContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[340px] rounded bg-white"
    >
      <Counter label="Room" value={draftGuests.rooms} onChange={updateRooms} />
      <Counter
        label="Adults"
        value={draftGuests.adults}
        onChange={updateAdults}
      />

      {/* CHILDREN */}
      <Counter
        label="Children"
        sub="0-17 Years Old"
        value={draftGuests.children}
        onChange={handleChildrenChange}
      />
      {/* CHILD AGES */}
      {draftGuests.children > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="mb-3 text-sm font-semibold text-black">
            Age of Children
          </p>
          {!childAgesValid && (
            <p className="mb-3 text-xs font-medium text-red-500">
              Please select age for all children
            </p>
          )}
          <div className="max-h-[220px] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-1.5">
              {(draftGuests.childAges || []).map((age, i) => (
                <div
                  key={i}
                  className="flex min-w-0 items-center justify-between gap-2 rounded border border-[#e3f0f5] bg-[#fafefe] px-2.5 py-2"
                >
                  <span className="shrink-0 text-[12px] font-medium text-gray-800">
                    Child {i + 1}
                  </span>

                  <select
                    value={age || ""}
                    onChange={(e) => updateChildAge(i, Number(e.target.value))}
                    className={`h-[34px] min-w-[96px] rounded border px-2 text-[12px] transition-all outline-none ${
                      !age
                        ? "border-red-300 bg-red-50 text-red-500"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  >
                    <option value="" disabled>
                      Select Age
                    </option>

                    {CHILD_AGES.map((a) => (
                      <option key={a} value={a}>
                        {a} yrs
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PETS */}
      <div className="my-4 border-t pt-4">
        <label className="flex cursor-pointer items-start gap-3 rounded border border-[#d8edf5] bg-[#fafdff] p-3.5">
          <input
            type="checkbox"
            checked={draftGuests.pets || false}
            onChange={(e) => update("pets", e.target.checked)}
            className="mt-1 cursor-pointer"
          />

          <div>
            <p className="text-[15px] font-semibold text-[#0F172A]">
              Are you travelling with pets?
            </p>

            <p className="text-xs text-gray-500">
              Only pet-friendly properties will be shown.
            </p>
          </div>
        </label>
      </div>

      {/* APPLY */}
      <Button
        disabled={!childAgesValid}
        onClick={handleApply}
        className="mt-4 h-[50px] w-full rounded text-[15px] font-bold tracking-wide !text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #72C0F0 0%, #0F6A75 100%)",
        }}
      >
        APPLY
      </Button>
    </div>
  );

  // =====================================
  // UI CONTENT
  // =====================================

  const triggerUI =
    variant === "compact" ? (
      <div className="relative h-[50px] cursor-pointer rounded border border-gray-300 bg-white px-3 transition-all hover:border-[#0077b6]">
        <div className="flex h-full items-center justify-between gap-2">
          <CompactItem value={safeValue.rooms} label="Room" />
          <CompactItem value={safeValue.adults} label="Adults" center />
          <CompactItem value={safeValue.children} label="Children" right />
        </div>
      </div>
    ) : (
      <div
        className={`relative min-w-0 rounded border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6]`}
      >
        <span className="absolute -top-2.5 left-4 rounded bg-white px-2 text-[14px] font-semibold tracking-wide text-[#0F6A75]">
          Rooms & Guests
        </span>

        <div className="flex min-h-[56px] items-center justify-between gap-3">
          <SummaryItem value={safeValue.rooms} label="Room" />
          <SummaryItem value={safeValue.adults} label="Adults" center />
          <SummaryItem value={safeValue.children} label="Children" right />
        </div>
      </div>
    );

  // =====================================
  // FINAL
  // =====================================

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      arrow={false}
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen?.(nextOpen);
      }}
      overlayClassName="guest-popover"
      content={dropdownContent}
    >
      {triggerUI}
    </Popover>
  );
}

// =====================================
// DEFAULT ITEM
// =====================================

const SummaryItem = memo(function SummaryItem({ value, label, center, right }) {
  return (
    <div
      className={`flex flex-1 flex-col justify-center leading-tight ${
        center ? "items-center" : ""
      } ${right ? "items-end" : ""}`}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-[26px] font-extrabold text-[#0F172A]">
          {value}
        </span>

        <span className="text-[13px] text-[#5B6B7A]">{label}</span>
      </div>
    </div>
  );
});

// =====================================
// COMPACT ITEM
// =====================================

const CompactItem = memo(function CompactItem({ value, label, center, right }) {
  return (
    <div
      className={`flex flex-1 flex-col justify-center leading-tight ${
        center ? "items-center" : ""
      } ${right ? "items-end" : ""}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-black md:text-xl">{value}</span>

        <span className="text-xs text-gray-700">{label}</span>
      </div>
    </div>
  );
});

// =====================================
// COUNTER
// =====================================

const Counter = memo(function Counter({ label, sub, value = 0, onChange }) {
  return (
    <div className="flex items-center justify-between border-b border-[#eef5f8] py-1">
      <div>
        <p className="m-0! text-sm font-semibold text-black">{label}</p>

        {sub && <p className="m-0 text-[11px] text-[#7B8A97]">{sub}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(value - 1);
          }}
          className="flex h-9 w-9 items-center justify-center rounded border border-[#d6e9f2]"
        >
          -
        </Button>

        <span className="w-5 text-center text-[16px] font-bold">{value}</span>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(value + 1);
          }}
          className="flex h-9 w-9 items-center justify-center rounded border border-[#d6e9f2]"
        >
          +
        </Button>
      </div>
    </div>
  );
});

export default memo(GuestsField);
