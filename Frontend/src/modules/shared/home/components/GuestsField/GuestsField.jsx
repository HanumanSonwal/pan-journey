"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { Button, Drawer, Popover } from "antd";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

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
  const normalizeRoomGuests = useCallback(
    (adults, children, childAges = [], requestedRooms = 1) => {
      const totalAdults = Math.min(
        MAX_ADULTS,
        Math.max(1, Number(adults) || 1),
      );

      const totalChildren = Math.min(
        MAX_CHILDREN,
        Math.max(0, Number(children) || 0),
      );

      const requiredRooms = Math.max(
        1,
        Math.ceil((totalAdults + totalChildren) / 4),
        Math.ceil(totalChildren / 2),
        Math.ceil(totalAdults / 4),
      );

      const rooms = Math.min(
        MAX_ROOMS,
        Math.max(requiredRooms, Number(requestedRooms) || 1),
      );

      const validRooms = Math.min(rooms, totalAdults);

      const roomAdults = Array.from(
        { length: validRooms },
        (_, index) =>
          Math.floor(totalAdults / validRooms) +
          (index < totalAdults % validRooms ? 1 : 0),
      );

      const roomChildren = Array.from({ length: validRooms }, () => []);
      let remainingChildren = totalChildren;
      for (let roomIndex = 0; roomIndex < validRooms; roomIndex++) {
        const adultCount = roomAdults[roomIndex];
        const capacityByPersons = Math.max(0, 4 - adultCount);
        const roomChildLimit = Math.min(2, capacityByPersons);
        const childCount = Math.min(remainingChildren, roomChildLimit);
        for (let childIndex = 0; childIndex < childCount; childIndex++) {
          const age = childAges[totalChildren - remainingChildren + childIndex];

          roomChildren[roomIndex].push({
            age: age ?? "",
          });
        }

        remainingChildren -= childCount;
      }

      if (remainingChildren > 0) {
        return null;
      }

      return roomAdults.map((roomAdultCount, index) => ({
        adults: roomAdultCount,
        children: roomChildren[index],
      }));
    },
    [],
  );

  const safeValue = useMemo(() => {
    const adults = Number(value?.adults ?? DEFAULT_GUEST_VALUE.adults);
    const children = Number(value?.children ?? DEFAULT_GUEST_VALUE.children);
    const childAges = Array.isArray(value?.childAges) ? value.childAges : [];
    const rooms = Number(value?.rooms ?? DEFAULT_GUEST_VALUE.rooms);
    const roomGuests =
      Array.isArray(value?.roomGuests) && value.roomGuests.length
        ? value.roomGuests
        : normalizeRoomGuests(adults, children, childAges, rooms) ||
          DEFAULT_GUEST_VALUE.roomGuests;

    return {
      ...DEFAULT_GUEST_VALUE,
      ...(value || {}),
      adults,
      children,
      childAges,
      rooms: roomGuests.length,
      roomGuests,
    };
  }, [value, normalizeRoomGuests]);

  const [draftGuests, setDraftGuests] = useState(safeValue);
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/home";

  useEffect(() => {
    if (open) {
      setDraftGuests(safeValue);
    }
  }, [open, safeValue]);

  const update = useCallback((key, val) => {
    setDraftGuests((prev) => ({
      ...prev,
      [key]: val,
    }));
  }, []);

  const updateAdults = (val) => {
    const adults = Math.min(MAX_ADULTS, Math.max(1, Number(val) || 1));

    setDraftGuests((prev) => {
      const children = Number(prev.children) || 0;
      const maxChildrenForAdults = adults * 2;
      const safeChildren = Math.min(
        children,
        maxChildrenForAdults,
        MAX_CHILDREN,
      );

      const childAges = (prev.childAges || []).slice(0, safeChildren);

      const requiredRooms = Math.max(
        1,
        Math.ceil((adults + safeChildren) / 4),
        Math.ceil(safeChildren / 2),
        Math.ceil(adults / 4),
      );

      const rooms = Math.min(
        MAX_ROOMS,
        Math.max(requiredRooms, Number(prev.rooms) || 1),
      );

      const roomGuests = normalizeRoomGuests(
        adults,
        safeChildren,
        childAges,
        rooms,
      );

      return {
        ...prev,
        adults,
        children: safeChildren,
        childAges,
        rooms: roomGuests?.length || rooms,
        roomGuests: roomGuests || [],
      };
    });
  };

  const updateRooms = (val) => {
    setDraftGuests((prev) => {
      const requestedRooms = Math.min(MAX_ROOMS, Math.max(1, Number(val) || 1));

      const adults = Math.max(1, Number(prev.adults) || 1);

      const children = Math.max(0, Number(prev.children) || 0);

      const requiredRooms = Math.max(
        1,
        Math.ceil((adults + children) / 4),
        Math.ceil(children / 2),
        Math.ceil(adults / 4),
      );

      const rooms = Math.min(
        MAX_ROOMS,
        Math.max(requestedRooms, requiredRooms),
      );

      const roomGuests = normalizeRoomGuests(
        adults,
        children,
        prev.childAges || [],
        rooms,
      );

      return {
        ...prev,
        rooms: roomGuests?.length || rooms,
        adults,
        children,
        roomGuests: roomGuests || [],
      };
    });
  };

  const updateChildAge = (index, age) => {
    setDraftGuests((prev) => {
      const newAges = [...(prev.childAges || [])];

      newAges[index] = age;

      const roomGuests = normalizeRoomGuests(
        Number(prev.adults) || 1,
        Number(prev.children) || 0,
        newAges,
        Number(prev.rooms) || 1,
      );

      return {
        ...prev,
        childAges: newAges,
        roomGuests: roomGuests || prev.roomGuests || [],
      };
    });
  };

  const handleChildrenChange = (val) => {
    setDraftGuests((prev) => {
      const adults = Math.max(1, Number(prev.adults) || 1);

      let children = Math.min(MAX_CHILDREN, Math.max(0, Number(val) || 0));

      const maxChildrenForAdults = adults * 2;

      children = Math.min(children, maxChildrenForAdults);

      let childAges = [...(prev.childAges || [])];

      while (childAges.length < children) {
        childAges.push("");
      }

      childAges = childAges.slice(0, children);

      const requiredRooms = Math.max(
        1,
        Math.ceil((adults + children) / 4),
        Math.ceil(children / 2),
        Math.ceil(adults / 4),
      );

      const rooms = Math.min(
        MAX_ROOMS,
        Math.max(requiredRooms, Number(prev.rooms) || 1),
      );

      const roomGuests = normalizeRoomGuests(
        adults,
        children,
        childAges,
        rooms,
      );

      if (isHomePage && children > 0) {
        setTimeout(() => {
          document.getElementById("guest-content")?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 0);
      }

      return {
        ...prev,
        adults,
        children,
        childAges,
        rooms: roomGuests?.length || rooms,
        roomGuests: roomGuests || [],
      };
    });
  };

  const handleApply = () => {
    if (!childAgesValid) {
      return;
    }

    const roomGuests = normalizeRoomGuests(
      Number(draftGuests.adults) || 1,
      Number(draftGuests.children) || 0,
      draftGuests.childAges || [],
      Number(draftGuests.rooms) || 1,
    );

    if (!roomGuests) {
      return;
    }

    const finalGuests = {
      ...draftGuests,
      rooms: roomGuests.length,
      roomGuests,
    };

    onChange?.(finalGuests);

    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setOpen?.(false);
    }
  };

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
      id="guest-content"
      onClick={(e) => e.stopPropagation()}
      className={`rounded-xl bg-white p-4 ${
        mobile ? "w-full max-w-none" : "w-[calc(100vw-32px)] max-w-[340px]"
      }`}
    >
      {/* ROOM */}
      <Counter
        label="Room"
        value={draftGuests.rooms}
        min={1}
        max={MAX_ROOMS}
        onChange={updateRooms}
      />

      {/* ADULTS */}
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
            className={`pr-1 ${
              mobile ? "" : "max-h-[180px] overflow-y-auto sm:max-h-[220px]"
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
                    className={`h-[34px] min-w-[86px] rounded border px-2 text-[12px] transition-all outline-none ${
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
          className="buttion-background-color h-[50px] w-full rounded-lg text-[15px] font-bold tracking-wide !text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          APPLY
        </Button>
      </div>
    </div>
  );

  const triggerUI = (
    <GuestTrigger variant={variant} value={safeValue} icon={icon} />
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
          {renderDropdownContent({
            mobile: true,
          })}
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
        <GuestTrigger variant={variant} value={safeValue} icon={icon} />
      </div>
    </Popover>
  );
}

export default memo(GuestsField);
