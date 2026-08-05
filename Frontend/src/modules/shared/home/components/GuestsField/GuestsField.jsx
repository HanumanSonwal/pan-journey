"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { Button, Drawer, Popover } from "antd";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CHILD_AGES,
  DEFAULT_GUEST_VALUE,
  MAX_ADULTS,
  MAX_CHILDREN,
  MAX_ROOMS,
} from "./constants";
import Counter from "./Counter";
import GuestTrigger from "./GuestTrigger";

function GuestsField({
  value = DEFAULT_GUEST_VALUE,
  onChange,
  open,
  setOpen,
  variant = "default",
  icon,
}) {
  const safeValue = useMemo(
    () => ({
      ...DEFAULT_GUEST_VALUE,
      ...(value || {}),
    }),
    [value],
  );

  const [draftGuests, setDraftGuests] = useState(safeValue);

  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setDraftGuests(safeValue);
    }
  }, [open]);

  const update = useCallback((key, val) => {
    setDraftGuests((prev) => ({
      ...prev,
      [key]: val,
    }));
  }, []);
  const updateAdults = (val) => {
    const adults = Math.min(MAX_ADULTS, Math.max(1, val));
    const rooms = Math.min(
      MAX_ROOMS,
      Math.max(Math.ceil(adults / 2), draftGuests.rooms),
    );

    setDraftGuests((prev) => ({
      ...prev,
      adults,
      rooms,
    }));
  };
  const guestContentRef = useRef(null);
  const updateRooms = (val) => {
    const rooms = Math.min(MAX_ROOMS, Math.max(1, val));
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
    const children = Math.min(MAX_CHILDREN, Math.max(0, val));
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

    requestAnimationFrame(() => {
      guestContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }; // ✅ Ye missing tha

  const handleApply = useCallback(() => {
    onChange?.(draftGuests);

    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setOpen?.(false);
    }
  }, [draftGuests, isMobile, onChange, setOpen]);

  const childAgesValid = useMemo(() => {
    return (

      draftGuests.children === 0 ||
      draftGuests.childAges.every(
        (age) => age !== "" && age !== null && age !== undefined,
      )
    );
  }, [draftGuests.children, draftGuests.childAges]);
  const renderDropdownContent = ({ mobile = false } = {}) => (

    <div
      ref={guestContentRef}
      onClick={(e) => e.stopPropagation()}
      className={`rounded-xl bg-white p-4 ${mobile ? "w-full max-w-none" : "w-[calc(100vw-32px)] max-w-[340px]"
        }`}
    >

      <Counter
        label="Room"
        value={draftGuests.rooms}
        min={1}
        max={MAX_ROOMS}
        onChange={updateRooms}
      />

      <Counter
        label="Adults"
        value={draftGuests.adults}
        min={1}
        max={MAX_ADULTS}
        onChange={updateAdults}
      />

      {/* CHILDREN */}
      <Counter
        label="Children"
        sub="0-17 Years Old"
        value={draftGuests.children}
        min={0}
        max={MAX_CHILDREN}
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
          <div
            className={`pr-1 ${mobile ? "" : "max-h-[180px] overflow-y-auto sm:max-h-[220px]"
              }`}
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(draftGuests.childAges || []).map((age, i) => (
                <div
                  key={i}
                  className="flex min-w-0 items-center justify-between gap-1 rounded border border-[#e3f0f5] bg-[#fafefe] px-0 py-2"
                >
                  <span className="shrink-0 text-[12px] font-medium text-gray-800">
                    Child {i + 1}
                  </span>

                  <select
                    value={age || ""}
                    onChange={(e) => updateChildAge(i, Number(e.target.value))}
                    className={`h-[34px] min-w-[86px] rounded border px-2 text-[12px] transition-all outline-none ${!age
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
      <div className="my-4 pt-4">
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

      <div className="sticky bottom-0 -mx-4 mt-4 -mb-4 bg-white p-4">
        <Button
          disabled={!childAgesValid}
          onClick={handleApply}
          className="h-[50px] w-full rounded-lg text-[15px] font-bold tracking-wide !text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 buttion-background-color"

        >
          APPLY
        </Button>
      </div>
    </div>
  );

  const triggerUI = (
    <GuestTrigger
      variant={variant}
      value={safeValue}
      icon={icon}
    />
  );

  if (isMobile) {
    return (
      <>

        <div onClick={() => setDrawerOpen(true)} className="cursor-pointer">
          {triggerUI}
        </div>

        <Drawer
          placement="bottom"
          size="90%"
          open={drawerOpen}
          destroyOnHidden
          onClose={() => setDrawerOpen(false)}
          styles={{
            body: {
              padding: 0,
              overflowY: "auto",
            },
          }}
          title={
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-0! text-[20px] font-bold text-[#0F172A]">
                  Rooms & Guests
                </h3>

                <p className="text-[13px] text-gray-500">
                  Select rooms and travellers
                </p>
              </div>
            </div>
          }
        >
          {renderDropdownContent({ mobile: true })}
        </Drawer>
      </>
    );
  }
  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      arrow={false}
      open={open}
      onOpenChange={setOpen}
      overlayClassName="guest-popover"
      content={renderDropdownContent()}
    >
      <div className="cursor-pointer">
        <GuestTrigger
          variant={variant}
          value={safeValue}
          icon={icon}
        />
      </div>
    </Popover>
  );
}

export default memo(GuestsField);
