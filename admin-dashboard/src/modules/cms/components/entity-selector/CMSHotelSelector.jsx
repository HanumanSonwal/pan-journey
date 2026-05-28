"use client";

import { useEffect, useState } from "react";

import { Form, Select, Spin } from "antd";

import api from "@/services/api";

export default function CMSHotelSelector({ form }) {
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState([]);

  const cityMeta = Form.useWatch("cityMeta", form);

  /*
  LOAD HOTELS
  AFTER CITY SELECT
  */
  useEffect(() => {
    const loadHotels = async () => {
      if (!cityMeta?.destinationId) {
        setOptions([]);
        return;
      }

      setLoading(true);

      try {
        const res = await api.post(
          "/admin/hotels/search",
          {
            fullName: cityMeta.destination,

            id: cityMeta.destinationId,
          },
          {
            skipToast: true,
          },
        );

        console.log("HOTELS API:", res?.data);

        const hotels = res?.data?.data || [];

        setOptions(
          hotels.map((hotel) => ({
            label: hotel.hotelName,

            value: hotel.hotelId,
          })),
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [cityMeta]);

  return (
    <Form.Item
      label="Select Hotel"
      name="selectedHotel"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        showSearch
        loading={loading}
        disabled={!cityMeta?.destinationId}
        placeholder={
          !cityMeta?.destinationId
            ? "Select city first"
            : loading
              ? "Loading hotels..."
              : "Select hotel"
        }
        options={options}
        virtual
        listHeight={320}
        filterOption={(input, option) =>
          option?.label?.toLowerCase()?.includes(input.toLowerCase())
        }
        notFoundContent={loading ? <Spin size="small" /> : "No hotels found"}
        onChange={(value) => {
          form.setFieldValue("entityId", value);
        }}
      />
    </Form.Item>
  );
}
