"use client";

import { useEffect, useState } from "react";

import { Form, Select } from "antd";

import { getCitiesHotelsApi } from "@/modules/markeups/services/markup.service";

export default function CMSCitySelector({ form }) {
  console.log("CMSCitySelector", form);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const selectedCity = Form.useWatch("selectedCity", form);

  useEffect(() => {
    const cityMeta = form.getFieldValue("cityMeta");

    if (
      selectedCity &&
      cityMeta?.destination &&
      !options.some((o) => o.value === selectedCity)
    ) {
      setOptions((prev) => [
        ...prev,
        {
          label: cityMeta.destination,
          value: selectedCity,
          raw: {
            name: cityMeta.destination,
            id: selectedCity,
          },
        },
      ]);
    }
  }, [selectedCity, form]);

  const fetchCities = async (value = "jaipur") => {
    setLoading(true);

    try {
      const data = await getCitiesHotelsApi(value);

      const cities = data.filter((item) => item.type === "City");

      setOptions(
        cities.map((item) => ({
          label: item.name,

          value: item.id,

          raw: item,
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Item
      label="Select City"
      name="selectedCity"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        showSearch
        filterOption={false}
        placeholder="Search city"
        options={options}
        loading={loading}
        onFocus={() => fetchCities()}
        onSearch={fetchCities}
        onChange={(value, option) => {
          form.setFieldValue("entityId", value);

          form.setFieldValue("selectedCity", value);

          form.setFieldValue("cityMeta", {
            destination: option.raw?.name,

            destinationId: option.raw?.id,
          });

          form.setFieldValue("selectedHotel", null);
        }}
      />
    </Form.Item>
  );
}
