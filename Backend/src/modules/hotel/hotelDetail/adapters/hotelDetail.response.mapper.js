export const mapHotelDetailResponse = (
  supplierResponse
) => {

  return {
    hotel: supplierResponse?.HotelDetails
      || supplierResponse?.HotelDetail
      || supplierResponse?.data
      || supplierResponse,

    supplier: "flyshop",
  };
};