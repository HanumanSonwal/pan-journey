"use client";

import { invalidateCurrencyQueries } from "@/utils/queryInvalidation";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "antd";
import { useMemo, useState } from "react";

export default function CurrencyDropdown({
  currencies,
  setCurrency,
  closeDropdown,
}) {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(search.toLowerCase()) ||
        currency.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [currencies, search]);

  const handleCurrencyChange = async (currency) => {
    setCurrency(currency);

    await invalidateCurrencyQueries(queryClient);

    closeDropdown();
    setSearch("");
  };

  return (
    <div className="w-[350px] rounded bg-white p-3 shadow-xl">
      <Input
        allowClear
        placeholder="Search Currency"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-3 max-h-80 overflow-y-auto">
        {filteredCurrencies.map((currency) => (
          <div
            key={currency.code}
            onClick={() => handleCurrencyChange(currency)}
            className="flex cursor-pointer justify-between rounded-lg px-3 py-2 hover:bg-[#F5FBFE]"
          >
            <span>{currency.name}</span>

            <span>{currency.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
