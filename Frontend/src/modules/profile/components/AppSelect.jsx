// "use client";

// import { Select } from "antd";

// export default function AppSelect({ error, ...props }) {
//   return (
//     <div>
//       <Select
//         size="large"
//         className={`w-full [&_.ant-select-selection-item]:!leading-[56px] [&_.ant-select-selection-placeholder]:!leading-[56px] [&_.ant-select-selector]:!h-[56px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!px-4 ${
//           error ? "[&_.ant-select-selector]:!border-red-500" : ""
//         } `}
//         {...props}
//       />

//       {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }


"use client";

import { Select } from "antd";

export default function AppSelect({
  error,
  ...props
}) {
  return (
    <div className="w-full">

      <Select
        size="large"

        className={`
          custom-select
          w-full
          ${error ? "select-error" : ""}
        `}

        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}