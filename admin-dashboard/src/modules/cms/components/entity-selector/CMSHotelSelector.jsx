"use client";

import api from "@/services/api";
import { Form, Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";

export default function CMSHotelSelector({ form }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const cityMeta = Form.useWatch("cityMeta", form);
  const selectedHotelId = Form.useWatch("selectedHotel", form);

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

        const mappedHotels = hotels.map((hotel) => ({
          label: hotel.hotelName,
          value: hotel.hotelId,
          hotel,
        }));

        setOptions(mappedHotels);

        /*
          EDIT PREFILL
          */
        if (selectedHotelId) {
          const existingHotel = mappedHotels.find(
            (item) => item.value === selectedHotelId,
          );

          if (existingHotel) {
            form.setFieldValue(["data", "hotelMeta"], {
              hotelId: existingHotel?.hotel?.hotelId,

              hotelName: existingHotel?.hotel?.hotelName,
            });
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [cityMeta, selectedHotelId, form]);

  return (
    <>
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
            const selectedHotel = options.find((item) => item.value === value);

            console.log("SELECTED HOTEL:", selectedHotel);

            form.setFieldValue("entityId", value);

            form.setFieldValue(["data", "hotelMeta"], {
              hotelId: selectedHotel?.hotel?.hotelId,

              hotelName: selectedHotel?.hotel?.hotelName,
            });

            console.log(
              "FORM HOTEL META:",
              form.getFieldValue(["data", "hotelMeta"]),
            );
          }}
        />
      </Form.Item>

      {/* hidden nested field */}
      <Form.Item name={["data", "hotelMeta"]} hidden>
        <Input />
      </Form.Item>
    </>
  );
}
