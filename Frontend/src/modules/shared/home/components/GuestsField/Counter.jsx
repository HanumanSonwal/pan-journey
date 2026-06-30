"use client";

import { Button } from "antd";
import { memo } from "react";

const buttonClass =
  "flex h-10 w-10 items-center justify-center rounded-lg border border-[#d6e9f2]";

function Counter({ label, sub, value = 0, onChange, min = 0, max = Infinity }) {
  const decrease = (e) => {
    e.stopPropagation();
    onChange?.(value - 1);
  };

  const increase = (e) => {
    e.stopPropagation();
    onChange?.(value + 1);
  };

  return (
    <div className="flex items-center justify-between border-b border-[#eef5f8] py-1">
      <div>
        <p className="m-0! text-sm font-semibold text-black">{label}</p>

        {sub && <p className="m-0 text-[11px] text-[#7B8A97]">{sub}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="default"
          aria-label={`Decrease ${label}`}
          onClick={decrease}
          disabled={value <= min}
          className={buttonClass}
        >
          −
        </Button>

        <span className="w-8 text-center text-[17px] font-bold">{value}</span>

        <Button
          type="default"
          aria-label={`Increase ${label}`}
          onClick={increase}
          disabled={value >= max}
          className={buttonClass}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default memo(Counter);
