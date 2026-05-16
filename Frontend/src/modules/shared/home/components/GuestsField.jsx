"use client";

import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

const defaultGuestValue = {
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
};

export default function GuestsField({ value = defaultGuestValue, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  // SAFE VALUE
  const safeValue = {
    ...defaultGuestValue,
    ...(value || {}),
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const update = (key, val) => {
    onChange?.({
      ...safeValue,
      [key]: val,
    });
  };

  const updateAdults = (val) => {
    const adults = Math.max(1, val);
    const rooms = Math.ceil(adults / 2);
    onChange?.({
      ...safeValue,
      adults,
      rooms,
    });
  };

  const updateChildAge = (index, age) => {
    const newAges = [...(safeValue?.childAges || [])];
    newAges[index] = age;
    update("childAges", newAges);
  };

  const handleChildrenChange = (val) => {
    let newAges = [...(safeValue?.childAges || [])];
    if (val > newAges.length) {
      newAges.push(1);
    } else {
      newAges.pop();
    }
    onChange?.({
      ...safeValue,
      children: val,
      childAges: newAges,
    });
  };

  const handleApply = () => {
    console.log("🚀 GUEST VALUE:", safeValue);

    setOpen(false);
  };
  return (
    <div
      ref={ref}
      onClick={() => setOpen((prev) => !prev)}
      className="relative h-[82px] cursor-pointer rounded-xl border border-gray-300 px-3 py-2 transition-all hover:border-[#0077b6]"
    >
      <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-900 md:text-[15px]">
        Rooms & Guests
      </span>

      <div className="flex min-h-[56px] items-center justify-between px-1 md:px-2">
        <div className="flex flex-1 flex-col justify-center leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black md:text-3xl">
              {safeValue.rooms}
            </span>
            <span className="text-sm text-gray-600 md:text-base">Room</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black md:text-3xl">
              {safeValue.adults}
            </span>

            <span className="text-sm text-gray-900 md:text-base">Adults</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-end justify-center leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black md:text-3xl">
              {safeValue.children}
            </span>

            <span className="text-sm text-gray-900 md:text-base">Children</span>
          </div>
        </div>
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute !z-250 mt-2 w-[340px] rounded-xl bg-white p-4 shadow-2xl transition-all duration-200"
        >
          <Counter
            label="Room"
            value={safeValue.rooms}
            onChange={(v) => update("rooms", Math.max(1, v))}
          />

          <Counter
            label="Adults"
            value={safeValue.adults}
            onChange={(v) => updateAdults(v)}
          />

          <Counter
            label="Children"
            sub="0-17 Years Old"
            value={safeValue.children}
            onChange={(v) => handleChildrenChange(Math.max(0, v))}
          />

          {safeValue.children > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="mb-3 text-sm font-semibold text-black">
                Age of Children
              </p>

              <div className="grid grid-cols-2 gap-3">
                {(safeValue.childAges || []).map((age, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Child {i + 1}</span>

                    <select
                      value={age}
                      onChange={(e) =>
                        updateChildAge(i, Number(e.target.value))
                      }
                      className="rounded-md border border-gray-500 bg-white px-2 py-1 text-sm text-gray-900"
                    >
                      {Array.from(
                        {
                          length: 17,
                        },
                        (_, i) => i + 1,
                      ).map((a) => (
                        <option key={a} value={a}>
                          {a} yrs
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="my-5 border-t pt-4">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-400 p-3 transition hover:border-[#0077b6]">
              <input
                type="checkbox"
                checked={safeValue.pets || false}
                onChange={(e) => update("pets", e.target.checked)}
                className="mt-1 cursor-pointer"
              />

              <div>
                <p className="text-sm font-semibold text-black">
                  Are you travelling with pets?
                </p>

                <p className="text-xs text-gray-500">
                  Only pet-friendly properties will be shown.
                </p>
              </div>
            </label>
          </div>

          <Button
            onClick={handleApply}
            className="mt-6 w-full rounded-xl py-3 font-semibold text-white! hover:bg-[#005f8f]"
            style={{
              background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
            }}
          >
            APPLY
          </Button>
        </div>
      )}
    </div>
  );
}

function Counter({ label, sub, value = 0, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-black">{label}</p>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(value - 1);
          }}
          className="h-10 w-10 rounded-lg border-2 border-black text-xl font-bold"
        >
          -
        </Button>
        <span className="w-6 text-center text-lg font-bold text-gray-900">
          {value}
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(value + 1);
          }}
          className="h-10 w-10 rounded-lg border-2 border-black text-xl font-bold"
        >
          +
        </Button>
      </div>
    </div>
  );
}
