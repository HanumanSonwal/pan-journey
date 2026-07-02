"use client";

import { Input } from "antd";
import { useState } from "react";

export default function CurrencyDropdown({
  currencies,
  setCurrency,
  closeDropdown,
}) {
  const [search, setSearch] = useState("");

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(search.toLowerCase()) ||
        currency.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [currencies, search]);
  return (
    <div
      className="w-[320px] max-w-[calc(100vw-32px)] rounded bg-white p-3 shadow-xl sm:w-[350px]"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <Input
        allowClear
        placeholder="Search Currency"
        value={search}
        className="[&_.ant-input]:!border-0 [&_.ant-input]:!shadow-none [&_.ant-input]:focus:!shadow-none"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Currency List */}
      <div className="mt-3 max-h-[60vh] sm:max-h-80 overflow-y-auto">
        {filteredCurrencies.map((currency) => (
          <div
            key={currency.code}
            onClick={() => {
              setCurrency(currency);
              closeDropdown();
              setSearch("");
            }}
            className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[#F5FBFE]"
          >
            <span>{currency.name}</span>

            <span className="font-semibold text-[#0F6A75]">
              {currency.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
