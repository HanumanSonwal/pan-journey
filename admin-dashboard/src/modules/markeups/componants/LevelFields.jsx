"use client";

import { Form, Select } from "antd";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useLocations } from "../hooks/useLocations";

export default function LevelFields({ level }) {
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [cityHotelSearch, setCityHotelSearch] = useState("");
  // ================= DEBOUNCE =================

  const [debouncedCountrySearch] = useDebounce(countrySearch, 500);
  const [debouncedStateSearch] = useDebounce(stateSearch, 500);
  const [debouncedCityHotelSearch] = useDebounce(cityHotelSearch, 500);

  // ================= FORM =================

  const form = Form.useFormInstance();
  const countryCode = Form.useWatch("countryCode", form);

  // ================= COUNTRIES =================

  const { data: countries = [], isLoading: countriesLoading } = useLocations({
    type: "countries",
    search: debouncedCountrySearch,
    enabled: level === "country" || level === "state",
  });

  // ================= STATES =================

  const { data: states = [], isLoading: statesLoading } = useLocations({
    type: "states",
    search: debouncedStateSearch,
    countryCode,
    enabled: !!countryCode && level === "state",
  });

  // ================= CITY / HOTEL =================

  const { data: locations = [], isLoading: locationsLoading } = useLocations({
    type: "cities-hotels",
    search: debouncedCityHotelSearch,
    enabled: level === "city" || level === "hotel",
  });

  // ================= CITY OPTIONS =================

  const cityOptions = useMemo(() => {
    if (!Array.isArray(locations)) return [];
    return locations?.map((item) => ({
      label: `${item?.name} (${item?.type})`,
      value: JSON.stringify({
        cityId: item?.id,
        cityName: item?.name,
        type: item?.type,
      }),
    }));
  }, [locations]);

  // ================= HOTEL OPTIONS =================

  const hotelOptions = useMemo(() => {
    if (!Array.isArray(locations)) return [];
    return locations
      ?.filter((item) => item?.type === "Hotel")
      ?.map((item) => ({
        label: item?.name,
        value: JSON.stringify({
          hotelId: item?.id,
          hotelName: item?.name,
        }),
      }));
  }, [locations]);

  return (
    <>
      {/* ================= COUNTRY ================= */}

      {(level === "country" || level === "state") && (
        <Form.Item
          label="Country"
          name="countryCode"
          rules={[
            {
              required: true,
              message: "Please select country",
            },
          ]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Select Country"
            loading={countriesLoading}
            onSearch={setCountrySearch}
            filterOption={false}
            optionFilterProp="label"
            notFoundContent="No countries found"
            onChange={() => {
              form.setFieldValue("stateName", undefined);
            }}
            options={
              Array.isArray(countries)
                ? countries?.map((item) => ({
                    label: item?.countryName || item?.name,

                    value: item?.countryCode || item?.code,
                  }))
                : []
            }
          />
        </Form.Item>
      )}

      {/* ================= STATE ================= */}

      {level === "state" && (
        <Form.Item
          label="State"
          name="stateName"
          rules={[
            {
              required: true,
              message: "Please select state",
            },
          ]}
        >
          <Select
            showSearch
            allowClear
            placeholder={countryCode ? "Select State" : "Select country first"}
            disabled={!countryCode}
            loading={statesLoading}
            onSearch={setStateSearch}
            filterOption={false}
            optionFilterProp="label"
            notFoundContent="No states found"
            options={
              Array.isArray(states)
                ? states?.map((item) => ({
                    label: item?.stateName || item?.name,

                    value: item?.stateName || item?.name,
                  }))
                : []
            }
          />
        </Form.Item>
      )}

      {/* ================= CITY ================= */}

      {level === "city" && (
        <Form.Item
          label="City"
          name="cityData"
          rules={[
            {
              required: true,
              message: "Please select city",
            },
          ]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Search City"
            loading={locationsLoading}
            onSearch={setCityHotelSearch}
            filterOption={false}
            optionFilterProp="label"
            notFoundContent={
              debouncedCityHotelSearch?.length < 1
                ? "Search city"
                : "No cities found"
            }
            options={cityOptions}
          />
        </Form.Item>
      )}

      {/* ================= HOTEL ================= */}

      {level === "hotel" && (
        <Form.Item
          label="Hotel"
          name="hotelData"
          rules={[
            {
              required: true,
              message: "Please select hotel",
            },
          ]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Search Hotel"
            loading={locationsLoading}
            onSearch={setCityHotelSearch}
            filterOption={false}
            optionFilterProp="label"
            notFoundContent={
              debouncedCityHotelSearch?.length < 1
                ? "Search hotel"
                : "No hotels found"
            }
            options={hotelOptions}
          />
        </Form.Item>
      )}
    </>
  );
}
