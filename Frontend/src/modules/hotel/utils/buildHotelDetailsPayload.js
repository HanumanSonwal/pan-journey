export const buildHotelDetailsPayload = ({ selectedHotel, initialPayload }) => {
  const selectedHotelMeta = selectedHotel?.hotelMeta || {};

  const initialHotelMeta = initialPayload?.hotelMeta || {};

  const hotelId = selectedHotelMeta?.hotelId || initialPayload?.hotelId || "";

  const hotelDetailId =
    selectedHotelMeta?.hotelDetailId ||
    initialPayload?.hotelDetailId ||
    initialHotelMeta?.hotelDetailId ||
    "";

  const payload = {
    hotelDetailId,
    hotelId,
  };

  console.log("BUILD HOTEL DETAILS PAYLOAD:", payload);

  return payload;
};
