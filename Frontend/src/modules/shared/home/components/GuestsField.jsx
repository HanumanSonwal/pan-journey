// "use client";

// import { Button } from "antd";
// import { useEffect, useRef, useState } from "react";

// const defaultGuestValue = {
//   rooms: 1,
//   adults: 2,
//   children: 0,
//   childAges: [],
//   pets: false,
// };

// export default function GuestsField({ value = defaultGuestValue, onChange }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();
//   // SAFE VALUE
//   const safeValue = {
//     ...defaultGuestValue,
//     ...(value || {}),
//   };
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const update = (key, val) => {
//     onChange?.({
//       ...safeValue,
//       [key]: val,
//     });
//   };

//   const updateAdults = (val) => {
//     const adults = Math.max(1, val);
//     const rooms = Math.ceil(adults / 2);
//     onChange?.({
//       ...safeValue,
//       adults,
//       rooms,
//     });
//   };

//   const updateChildAge = (index, age) => {
//     const newAges = [...(safeValue?.childAges || [])];
//     newAges[index] = age;
//     update("childAges", newAges);
//   };

//   const handleChildrenChange = (val) => {
//     let newAges = [...(safeValue?.childAges || [])];
//     if (val > newAges.length) {
//       newAges.push(1);
//     } else {
//       newAges.pop();
//     }
//     onChange?.({
//       ...safeValue,
//       children: val,
//       childAges: newAges,
//     });
//   };

//   const handleApply = () => {
//     console.log("🚀 GUEST VALUE:", safeValue);

//     setOpen(false);
//   };
//   return (
//     <div
//       ref={ref}
//       onClick={() => setOpen((prev) => !prev)}
//       className="relative h-[82px] cursor-pointer rounded-xl border border-gray-300 px-3 py-2 transition-all hover:border-[#0077b6]"
//     >
//       <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-900 md:text-[15px]">
//         Rooms & Guests
//       </span>

//       <div className="flex min-h-[56px] items-center justify-between px-1 md:px-2">
//         <div className="flex flex-1 flex-col justify-center leading-tight">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-black md:text-3xl">
//               {safeValue.rooms}
//             </span>
//             <span className="text-sm text-gray-600 md:text-base">Room</span>
//           </div>
//         </div>

//         <div className="flex flex-1 flex-col items-center justify-center leading-tight">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-black md:text-3xl">
//               {safeValue.adults}
//             </span>

//             <span className="text-sm text-gray-900 md:text-base">Adults</span>
//           </div>
//         </div>

//         <div className="flex flex-1 flex-col items-end justify-center leading-tight">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-black md:text-3xl">
//               {safeValue.children}
//             </span>

//             <span className="text-sm text-gray-900 md:text-base">Children</span>
//           </div>
//         </div>
//       </div>

//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="absolute !z-250 mt-2 w-[340px] rounded-xl bg-white p-4 shadow-2xl transition-all duration-200"
//         >
//           <Counter
//             label="Room"
//             value={safeValue.rooms}
//             onChange={(v) => update("rooms", Math.max(1, v))}
//           />

//           <Counter
//             label="Adults"
//             value={safeValue.adults}
//             onChange={(v) => updateAdults(v)}
//           />

//           <Counter
//             label="Children"
//             sub="0-17 Years Old"
//             value={safeValue.children}
//             onChange={(v) => handleChildrenChange(Math.max(0, v))}
//           />

//           {safeValue.children > 0 && (
//             <div className="mt-4 border-t pt-4">
//               <p className="mb-3 text-sm font-semibold text-black">
//                 Age of Children
//               </p>

//               <div className="grid grid-cols-2 gap-3">
//                 {(safeValue.childAges || []).map((age, i) => (
//                   <div key={i} className="flex items-center justify-between">
//                     <span className="text-sm text-gray-900">Child {i + 1}</span>

//                     <select
//                       value={age}
//                       onChange={(e) =>
//                         updateChildAge(i, Number(e.target.value))
//                       }
//                       className="rounded-md border border-gray-500 bg-white px-2 py-1 text-sm text-gray-900"
//                     >
//                       {Array.from(
//                         {
//                           length: 17,
//                         },
//                         (_, i) => i + 1,
//                       ).map((a) => (
//                         <option key={a} value={a}>
//                           {a} yrs
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="my-5 border-t pt-4">
//             <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-400 p-3 transition hover:border-[#0077b6]">
//               <input
//                 type="checkbox"
//                 checked={safeValue.pets || false}
//                 onChange={(e) => update("pets", e.target.checked)}
//                 className="mt-1 cursor-pointer"
//               />

//               <div>
//                 <p className="text-sm font-semibold text-black">
//                   Are you travelling with pets?
//                 </p>

//                 <p className="text-xs text-gray-500">
//                   Only pet-friendly properties will be shown.
//                 </p>
//               </div>
//             </label>
//           </div>

//           <Button
//             onClick={handleApply}
//             className="mt-6 w-full rounded-xl py-3 font-semibold text-white! hover:bg-[#005f8f]"
//             style={{
//               background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
//             }}
//           >
//             APPLY
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// function Counter({ label, sub, value = 0, onChange }) {
//   return (
//     <div className="flex items-center justify-between py-3">
//       <div>
//         <p className="text-sm font-semibold text-black">{label}</p>
//         {sub && <p className="text-xs text-gray-500">{sub}</p>}
//       </div>
//       <div className="flex items-center gap-3">
//         <Button
//           onClick={(e) => {
//             e.stopPropagation();
//             onChange?.(value - 1);
//           }}
//           className="h-10 w-10 rounded-lg border-2 border-black text-xl font-bold"
//         >
//           -
//         </Button>
//         <span className="w-6 text-center text-lg font-bold text-gray-900">
//           {value}
//         </span>
//         <Button
//           onClick={(e) => {
//             e.stopPropagation();
//             onChange?.(value + 1);
//           }}
//           className="h-10 w-10 rounded-lg border-2 border-black text-xl font-bold"
//         >
//           +
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button, Popover } from "antd";
import { memo, useCallback, useMemo } from "react";

const defaultGuestValue = {
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
};

function GuestsField({ value = defaultGuestValue, onChange }) {
  // SAFE VALUE
  const safeValue = useMemo(() => {
    return {
      ...defaultGuestValue,
      ...(value || {}),
    };
  }, [value]);

  // COMMON UPDATE
  const update = useCallback(
    (key, val) => {
      onChange?.({
        ...safeValue,
        [key]: val,
      });
    },
    [onChange, safeValue],
  );

  // ADULTS
  const updateAdults = useCallback(
    (val) => {
      const adults = Math.max(1, val);

      const rooms = Math.max(safeValue.rooms, Math.ceil(adults / 2));

      onChange?.({
        ...safeValue,
        adults,
        rooms,
      });
    },
    [onChange, safeValue],
  );

  // CHILD AGE
  const updateChildAge = useCallback(
    (index, age) => {
      const newAges = [...(safeValue?.childAges || [])];

      newAges[index] = age;

      update("childAges", newAges);
    },
    [safeValue?.childAges, update],
  );

  // CHILDREN
  const handleChildrenChange = useCallback(
    (val) => {
      const children = Math.max(0, val);

      let newAges = [...(safeValue?.childAges || [])];

      // ADD
      while (newAges.length < children) {
        newAges.push(1);
      }

      // REMOVE
      while (newAges.length > children) {
        newAges.pop();
      }

      onChange?.({
        ...safeValue,
        children,
        childAges: newAges,
      });
    },
    [onChange, safeValue],
  );

  // DROPDOWN CONTENT
  const dropdownContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[340px] rounded-2xl bg-white"
    >
      {/* ROOM */}
      <Counter
        label="Room"
        value={safeValue.rooms}
        onChange={(v) => update("rooms", Math.max(1, v))}
      />

      {/* ADULT */}
      <Counter
        label="Adults"
        value={safeValue.adults}
        onChange={updateAdults}
      />

      {/* CHILD */}
      <Counter
        label="Children"
        sub="0-17 Years Old"
        value={safeValue.children}
        onChange={handleChildrenChange}
      />

      {/* CHILD AGES */}
      {safeValue.children > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="mb-3 text-sm font-semibold text-black">
            Age of Children
          </p>

          {/* SCROLL */}
          <div className="max-h-[220px] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-2">
              {(safeValue.childAges || []).map((age, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#e3f0f5] bg-[#fafefe] p-2.5"
                >
                  <span className="text-[13px] font-medium text-gray-800">
                    Child {i + 1}
                  </span>

                  <select
                    value={age}
                    onChange={(e) => updateChildAge(i, Number(e.target.value))}
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[12px] text-gray-900 outline-none"
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
        </div>
      )}

      {/* PETS */}
      <div className="my-4 border-t pt-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d8edf5] bg-[#fafdff] p-3.5 transition-all hover:border-[#72C0F0] hover:bg-[#f3fbff]">
          <input
            type="checkbox"
            checked={safeValue.pets || false}
            onChange={(e) => update("pets", e.target.checked)}
            className="mt-1 cursor-pointer"
          />

          <div>
            <p className="text-[15px] font-semibold text-[#0F172A]">
              Are you travelling with pets?
            </p>

            <p className="text-xs leading-[18px] text-gray-500">
              Only pet-friendly properties will be shown.
            </p>
          </div>
        </label>
      </div>

      {/* APPLY */}
      <Button
        className="mt-4 h-[50px] w-full rounded-2xl text-[15px] font-bold tracking-wide !text-white transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: "linear-gradient(135deg, #72C0F0 0%, #0F6A75 100%)",
          boxShadow: "0 8px 24px rgba(15,106,117,0.25)",
        }}
      >
        APPLY
      </Button>
    </div>
  );

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      arrow={false}
      overlayClassName="guest-popover"
      content={dropdownContent}
    >
      <div className="relative h-[82px] cursor-pointer rounded-2xl border border-[#cfe8f3] bg-white px-4 py-2 shadow-[0_2px_12px_rgba(15,106,117,0.06)] transition-all duration-300 hover:border-[#72C0F0] hover:shadow-[0_4px_20px_rgba(15,106,117,0.12)]">
        {/* LABEL */}
        <span className="absolute -top-2.5 left-4 rounded-md bg-white px-2 text-[13px] font-semibold tracking-wide text-[#0F6A75] md:text-[14px]">
          Rooms & Guests
        </span>

        {/* SUMMARY */}
        <div className="flex min-h-[56px] items-center justify-between gap-3">
          {/* ROOM */}
          <SummaryItem value={safeValue.rooms} label="Room" />

          {/* ADULT */}
          <SummaryItem value={safeValue.adults} label="Adults" center />

          {/* CHILD */}
          <SummaryItem value={safeValue.children} label="Children" right />
        </div>
      </div>
    </Popover>
  );
}

// SUMMARY ITEM
const SummaryItem = memo(function SummaryItem({ value, label, center, right }) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col justify-center leading-tight ${
        center ? "items-center" : ""
      } ${right ? "items-end" : ""} `}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-[26px] leading-none font-extrabold text-[#0F172A] md:text-[30px]">
          {value}
        </span>

        <span className="text-[13px] font-medium text-[#5B6B7A] md:text-[14px]">
          {label}
        </span>
      </div>
    </div>
  );
});

// COUNTER
const Counter = memo(function Counter({ label, sub, value = 0, onChange }) {
  return (
    <div className="flex items-center justify-between border-b border-[#eef5f8] py-3 last:border-b-0">
      {/* LEFT */}
      <div>
        <p className="text-sm font-semibold text-black">{label}</p>

        {sub && (
          <p className="mt-0.5 text-[11px] font-medium text-[#7B8A97]">{sub}</p>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* MINUS */}
        <Button
          onClick={(e) => {
            e.stopPropagation();

            onChange?.(value - 1);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d6e9f2] bg-[#f7fcff] p-0 text-[18px] font-bold text-[#0F6A75] shadow-sm transition-all hover:border-[#72C0F0] hover:bg-[#edf7ff]"
        >
          -
        </Button>

        {/* VALUE */}
        <span className="w-5 text-center text-[16px] font-bold text-[#0F172A]">
          {value}
        </span>

        {/* PLUS */}
        <Button
          onClick={(e) => {
            e.stopPropagation();

            onChange?.(value + 1);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d6e9f2] bg-[#f7fcff] p-0 text-[18px] font-bold text-[#0F6A75] shadow-sm transition-all hover:border-[#72C0F0] hover:bg-[#edf7ff]"
        >
          +
        </Button>
      </div>
    </div>
  );
});

export default memo(GuestsField);
