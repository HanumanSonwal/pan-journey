"use client";

import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

export default function GuestsField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

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
    onChange({ ...value, [key]: val });
  };

  const updateAdults = (val) => {
    const adults = Math.max(1, val);
    const rooms = Math.ceil(adults / 2);

    onChange({
      ...value,
      adults,
      rooms,
    });
  };

  const updateChildAge = (index, age) => {
    const newAges = [...(value.childAges || [])];
    newAges[index] = age;
    update("childAges", newAges);
  };

  const handleChildrenChange = (val) => {
    let newAges = [...(value.childAges || [])];

    if (val > newAges.length) newAges.push(1);
    else newAges.pop();

    onChange({
      ...value,
      children: val,
      childAges: newAges,
    });
  };

  const handleApply = () => {
    console.log("🚀 GUEST VALUE:", value);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      onClick={() => setOpen((prev) => !prev)}
      className="relative border border-gray-300 rounded-xl px-3 py-2 cursor-pointer hover:border-[#0077b6] transition-all"
    >
      <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] md:text-[15px] text-gray-900 font-medium ">
        Rooms & Guests
      </span>

      <div className="flex items-center justify-between min-h-[56px] px-1 md:px-2">
        <div className="flex flex-col justify-center flex-1 leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {value.rooms}
            </span>
            <span className="text-sm md:text-base text-gray-600">Room</span>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 items-center leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {value.adults}
            </span>
            <span className="text-sm md:text-base text-gray-900">Adults</span>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 items-end leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {value.children}
            </span>
            <span className="text-sm md:text-base text-gray-900">Children</span>
          </div>
        </div>
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute !z-50 mt-2 w-[340px] bg-white shadow-2xl rounded-xl p-4 transition-all duration-200"
        >
          <Counter
            label="Room"
            value={value.rooms}
            onChange={(v) => update("rooms", Math.max(1, v))}
          />

          <Counter
            label="Adults"
            value={value.adults}
            onChange={(v) => updateAdults(v)}
          />

          <Counter
            label="Children"
            sub="0-17 Years Old"
            value={value.children}
            onChange={(v) => handleChildrenChange(Math.max(0, v))}
          />

          {value.children > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-semibold mb-3 text-black">
                Age of Children
              </p>

              <div className="grid grid-cols-2 gap-3">
                {(value.childAges || []).map((age, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Child {i + 1}</span>

                    <select
                      value={age}
                      onChange={(e) =>
                        updateChildAge(i, Number(e.target.value))
                      }
                      className="border border-gray-500 rounded-md px-2 py-1 text-sm bg-white text-gray-900!"
                    >
                      {Array.from({ length: 17 }, (_, i) => i + 1).map((a) => (
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
          <div className="my-5 border-t pt-4 ">
            <label className="flex items-start gap-3 border border-gray-400 rounded-xl p-3 cursor-pointer hover:border-[#0077b6] transition">
              <input
                type="checkbox"
                checked={value.pets || false}
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
            className="mt-6 w-full  text-white! py-3 rounded-xl font-semibold hover:bg-[#005f8f]"
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

function Counter({ label, sub, value, onChange }) {
  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="text-sm font-semibold text-black">{label}</p>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onChange(value - 1);
          }}
          className="w-10 h-10 border-2 border-black rounded-lg text-xl font-bold"
        >
          -
        </Button>

        <span className="font-bold text-lg w-6 text-center text-gray-900">
          {value}
        </span>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onChange(value + 1);
          }}
          className="w-10 h-10 border-2 border-black rounded-lg text-xl font-bold"
        >
          +
        </Button>
      </div>
    </div>
  );
}
